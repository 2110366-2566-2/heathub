import { z } from "zod";

import { CHAT_MESSAGE_EVENT } from "@/constants/pusher-events";
import {
  createTRPCRouter,
  participantProcedure,
  userProcedure,
} from "@/server/api/trpc";
import type { DB } from "@/server/db";
import { chatInbox, chatMessage, user } from "@/server/db/schema";
import { type ChatMessage, type RecentMessage } from "@/types/pusher";
import { and, eq, lte, or } from "drizzle-orm";
import { sql, desc } from "drizzle-orm";
async function createInbox(
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
    })
    .onDuplicateKeyUpdate({
      set: {
        userID1: userID1,
        userID2: userID2,
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
      const result: ChatMessage = await ctx.db.transaction(async (tx) => {
        await createInbox(tx, ctx.session.user.userId, input.toUserID);

        await tx.insert(chatMessage).values({
          senderUserID: ctx.session.user.userId,
          receiverUserID: input.toUserID,
          content: input.content,
          contentType: "text",
        });

        const result = await tx.query.chatMessage.findFirst({
          orderBy: (posts, { desc }) => [desc(posts.createdAt)],
          where: and(
            eq(chatMessage.senderUserID, ctx.session.user.userId),
            eq(chatMessage.receiverUserID, input.toUserID),
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
              },
            },
          },
        });

        if (!result) {
          throw new Error("Failed to send message");
        }

        return result;
      });

      await Promise.all([
        ctx.pusher.trigger(
          `private-user-${ctx.session.user.userId}`,
          CHAT_MESSAGE_EVENT,
          result,
        ),
        ctx.pusher.trigger(
          `private-user-${input.toUserID}`,
          CHAT_MESSAGE_EVENT,
          result,
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
      limit ??= 10;

      const messages: ChatMessage[] = await ctx.db.query.chatMessage.findMany({
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
            },
          },
        },
      });

      let nextCursor: number | null = null;
      if (messages.length > limit) {
        nextCursor = messages.pop()!.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),
  recentChat: userProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(100).nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let { limit } = input;
      limit ??= 10;

      const messages: ChatMessage[] = await ctx.db.query.chatMessage.findMany({
        limit: limit,
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        where: and(
          or(
            eq(chatMessage.senderUserID, ctx.session.user.userId),
            eq(chatMessage.receiverUserID, ctx.session.user.userId),
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
            },
          },
        },
      });

      return {
        messages,
      };
    }),
  testRecentChat: userProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(100).nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let { limit } = input;
      limit ??= 10;
      limit = limit * 2;
      const sq = ctx.db
        .select({
          max_created_at: sql<number>`max(${chatMessage.id})`.as(
            "max_created_at",
          ),
        })
        .from(chatMessage)
        .where(
          or(
            eq(chatMessage.receiverUserID, ctx.session.user.userId),
            eq(chatMessage.senderUserID, ctx.session.user.userId),
          ),
        )
        .groupBy(chatMessage.senderUserID, chatMessage.receiverUserID)
        .orderBy(desc(sql`max_created_at`))
        .limit(limit)
        .as("sq");
      const result = await ctx.db
        .select()
        .from(chatMessage)
        .innerJoin(sq, eq(chatMessage.id, sq.max_created_at))
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
            if (!isMatched) setMatched.add(e.chat_message.receiverUserID);
            return !isMatched;
          }
          const isMatched = setMatched.has(e.chat_message.senderUserID);
          if (!isMatched) setMatched.add(e.chat_message.senderUserID);
          return !isMatched;
        })
        .map((e) => {
          return {
            id: e.chat_message.id,
            discourserId: e.user.id,
            discourserAka: e.user.aka,
            discourserImageURL: e.user.profileImageURL,
            createdAt: e.chat_message.createdAt,
            contentType: e.chat_message.contentType,
            lastestContent: e.chat_message.content,
          };
        });
      console.log(messages.slice(0, 10));
      return { messages: messages };
    }),
});
