import { z } from "zod";

import { RECENT_MESSAGE_EVENT } from "@/constants/pusher-events";
import {
  createTRPCRouter,
  participantProcedure,
  userProcedure,
} from "@/server/api/trpc";
import type { DB } from "@/server/db";
import { chatInbox, chatMessage, user } from "@/server/db/schema";
import {
  type RecentNormalMessage,
  type RecentMessage,
  type RecentEventMessage,
} from "@/types/pusher";
import { and, desc, eq, lte, or, sql } from "drizzle-orm";
export async function createInbox(
  db: DB,
  userID1: string,
  userID2: string,
): Promise<void> {
  if (userID2 < userID1) {
    const temp = userID1;
    userID1 = userID2;
    userID2 = temp;
  }

  await db
    .insert(chatInbox)
    .values({
      userID1: userID1,
      userID2: userID2,
      lastestMessageId: null,
    })
    .onDuplicateKeyUpdate({
      set: {
        userID1: userID1,
        userID2: userID2,
        lastestMessageId: null,
      },
    });
}
export const chatRouter = createTRPCRouter({
  createInbox: participantProcedure
    .input(
      z.object({
        hostUserID: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await createInbox(ctx.db, ctx.session.user.userId, input.hostUserID);
    }),
  sendMessage: userProcedure
    .input(
      z.object({
        toUserID: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        await createInbox(tx, ctx.session.user.userId, input.toUserID);

        await tx.insert(chatMessage).values({
          senderUserID: ctx.session.user.userId,
          receiverUserID: input.toUserID,
          content: input.content,
          contentType: "text",
        });
        const lastestMessage = await tx.query.chatMessage.findFirst({
          where: or(
            and(
              eq(chatMessage.senderUserID, ctx.session.user.userId),
              eq(chatMessage.receiverUserID, input.toUserID),
            ),
            and(
              eq(chatMessage.receiverUserID, ctx.session.user.userId),
              eq(chatMessage.senderUserID, input.toUserID),
            ),
          ),
          with: {
            receiver: true,
            sender: true,
          },
          orderBy: (chatMessage, { desc }) => [desc(chatMessage.createdAt)],
        });

        if (!lastestMessage) {
          throw new Error("Failed to send message");
        }
        await tx
          .update(chatInbox)
          .set({ lastestMessageId: lastestMessage?.id })
          .where(
            or(
              and(
                eq(chatInbox.userID1, ctx.session.user.userId),
                eq(chatInbox.userID2, input.toUserID),
              ),
              and(
                eq(chatInbox.userID2, ctx.session.user.userId),
                eq(chatInbox.userID1, input.toUserID),
              ),
            ),
          );

        return lastestMessage;
      });
      const messageForSender: RecentNormalMessage = {
        id: result.id,
        myId: ctx.session.user.userId,
        discourserId: result.receiver.id,
        discourserAka: result.receiver.aka,
        senderId: result.senderUserID,
        discourserImageURL: result.receiver.profileImageURL,
        contentType: result.contentType as "text" | "imageURL",
        content: result.content,
        createdAt: result.createdAt,
      };
      const messageForReciever: RecentNormalMessage = {
        id: result.id,
        myId: result.receiver.id,
        discourserId: ctx.session.user.userId,
        discourserAka: ctx.session.user.userName,
        senderId: result.senderUserID,
        discourserImageURL: result.sender.profileImageURL,
        contentType: result.contentType as "text" | "imageURL",
        content: result.content,
        createdAt: result.createdAt,
      };

      await Promise.all([
        ctx.pusher.trigger(
          `private-user-${ctx.session.user.userId}`,
          RECENT_MESSAGE_EVENT,
          messageForSender,
        ),
        ctx.pusher.trigger(
          `private-user-${input.toUserID}`,
          RECENT_MESSAGE_EVENT,
          messageForReciever,
        ),
      ]);
    }),

  infiniteChat: userProcedure
    .input(
      z.object({
        pairUserID: z.string().min(1),
        cursor: z.number().int().nullish(),
        limit: z.number().int().min(1).max(100).nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let { pairUserID, cursor, limit } = input;
      let nextCursor: number | null = null;

      const { eventMap, messages } = await ctx.db.transaction(async (tx) => {
        limit ??= 10;
        const messages = await tx.query.chatMessage.findMany({
          limit: limit + 1,
          orderBy: (posts, { desc }) => [desc(posts.id)],
          where: and(
            lte(chatMessage.id, cursor ?? Number.MAX_SAFE_INTEGER),
            or(
              and(
                eq(chatMessage.senderUserID, ctx.session.user.userId),
                eq(chatMessage.receiverUserID, pairUserID),
              ),
              and(
                eq(chatMessage.senderUserID, pairUserID),
                eq(chatMessage.receiverUserID, ctx.session.user.userId),
              ),
            ),
          ),
          with: {
            sender: {
              columns: {
                id: true,
                firstName: true,
                lastName: true,
                profileImageURL: true,
                role: true,
                aka: true,
              },
            },
            receiver: {
              columns: {
                id: true,
                firstName: true,
                lastName: true,
                profileImageURL: true,
                role: true,
                aka: true,
              },
            },
          },
        });

        if (messages.length > limit && limit > 0) {
          const message = messages.pop();
          if (message) {
            nextCursor = message.id;
          }
        }
        const eventId = messages
          .filter((e) => {
            if (e.contentType === "event") return true;
          })
          .map((e) => parseInt(e.content));

        const eventMap = new Map<number, (typeof eventDetail)[0]>();
        if (eventId.length === 0) return { eventMap, messages };
        const eventDetail = await tx.query.event.findMany({
          where: (event, { inArray }) => inArray(event.id, eventId),
        });
        eventDetail.forEach((e) => {
          eventMap.set(e.id, e);
        });
        return { eventMap, messages };
      });

      let convertedMessage: RecentMessage[] = [];
      for (let i = 0; i <= messages.length; i++) {
        const e = messages[i];
        if (!e) continue;
        if (e.contentType == "event") {
          const content = eventMap.get(parseInt(e.content));
          if (!content) {
            continue;
          }
          convertedMessage.push({
            id: e.id,
            myId: ctx.session.user.userId,
            discourserId:
              ctx.session.user.userId === e.sender.id
                ? e.receiver.id
                : e.sender.id,
            discourserAka:
              ctx.session.user.userId === e.sender.id
                ? e.receiver.aka
                : e.sender.aka,
            discourserImageURL:
              ctx.session.user.userId === e.sender.id
                ? e.receiver.profileImageURL
                : e.sender.profileImageURL,
            senderId: e.sender.id,
            contentType: e.contentType,
            content: {
              description: content.description,
              location: content.location,
              price: content.price,
              startTime: content.startTime,
              endTime: content.endTime,
            },
            createdAt: e.createdAt,
          } satisfies RecentEventMessage);
          continue;
        }
        convertedMessage.push({
          id: e.id,
          myId: ctx.session.user.userId,
          discourserId:
            ctx.session.user.userId === e.sender.id
              ? e.receiver.id
              : e.sender.id,
          discourserAka:
            ctx.session.user.userId === e.sender.id
              ? e.receiver.aka
              : e.sender.aka,
          discourserImageURL:
            ctx.session.user.userId === e.sender.id
              ? e.receiver.profileImageURL
              : e.sender.profileImageURL,
          senderId: e.sender.id,
          contentType: e.contentType,
          content: e.content,
          createdAt: e.createdAt,
        } satisfies RecentNormalMessage);
      }

      return {
        convertedMessage,
        nextCursor,
      };
    }),
  recentChats: userProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(100).nullish(),
        cursor: z.number().int().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let { limit, cursor } = input;
      limit ??= 10;
      const doubleLimit = limit * 2;
      const sq = ctx.db
        .select({
          lastest_message_id:
            sql<number>`max(${chatInbox.lastestMessageId})`.as(
              "lastest_message_id",
            ),
        })
        .from(chatInbox)
        .where(
          and(
            or(
              eq(chatInbox.userID1, ctx.session.user.userId),
              eq(chatInbox.userID2, ctx.session.user.userId),
            ),
            lte(chatInbox.lastestMessageId, cursor ?? Number.MAX_SAFE_INTEGER),
          ),
        )
        .groupBy(chatInbox.userID1, chatInbox.userID2)
        .orderBy(desc(sql`lastest_message_id`))
        .limit(doubleLimit)
        .as("sq");
      const result = await ctx.db
        .select()
        .from(chatMessage)
        .innerJoin(sq, eq(chatMessage.id, sq.lastest_message_id))
        .innerJoin(
          user,
          or(
            and(
              eq(chatMessage.receiverUserID, ctx.session.user.userId),
              eq(chatMessage.senderUserID, user.id),
            ),
            and(
              eq(chatMessage.senderUserID, ctx.session.user.userId),
              eq(chatMessage.receiverUserID, user.id),
            ),
          ),
        );

      const setMatched = new Set<string>();
      const messages: RecentMessage[] = result
        .filter((e) => {
          if (e.chat_message.senderUserID === ctx.session.user.userId) {
            const isMatched = setMatched.has(e.chat_message.receiverUserID);
            if (!isMatched) {
              setMatched.add(e.chat_message.receiverUserID);
            }
            return !isMatched;
          }
          const isMatched = setMatched.has(e.chat_message.senderUserID);
          if (!isMatched) setMatched.add(e.chat_message.senderUserID);
          return !isMatched;
        })
        .map((e) => {
          if (e.chat_message.contentType === "event") {
            return {
              id: e.chat_message.id,
              myId: ctx.session.user.userId,
              discourserId: e.user.id,
              discourserAka: e.user.aka,
              discourserImageURL: e.user.profileImageURL,
              senderId: e.chat_message.senderUserID,
              createdAt: e.chat_message.createdAt,
              contentType: "text",
              content: "New Event",
            };
          }
          return {
            id: e.chat_message.id,
            myId: ctx.session.user.userId,
            discourserId: e.user.id,
            discourserAka: e.user.aka,
            discourserImageURL: e.user.profileImageURL,
            senderId: e.chat_message.senderUserID,
            createdAt: e.chat_message.createdAt,
            contentType: e.chat_message.contentType,
            content: e.chat_message.content,
          };
        });

      let nextCursor: number | null = null;
      if (messages.slice(0, limit + 1).length > limit) {
        const message = messages.slice(limit, limit + 1)[0];
        if (message) {
          nextCursor = message.id;
        }
      }
      return { messages: messages.slice(0, limit), nextCursor };
    }),
});
