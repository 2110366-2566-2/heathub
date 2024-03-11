import { RECENT_MESSAGE_EVENT } from "@/constants/pusher-events";
import {
  createTRPCRouter,
  hostProcedure,
  participantProcedure,
  userProcedure,
} from "@/server/api/trpc";
import { chatInbox, chatMessage, event } from "@/server/db/schema";
import { type RecentEventMessage } from "@/types/pusher";
import { type SQL, and, eq, or } from "drizzle-orm";
import { z } from "zod";
import { createInbox } from "./chat";
export const eventRouter = createTRPCRouter({
  createEvent: hostProcedure
    .input(
      z.object({
        hostUserID: z.string().min(1),
        participantUserID: z.string().min(1),
        description: z.string().min(1),
        startTime: z.date(),
        endTime: z.date(),
        location: z.string().min(1),
        price: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { lastestMessage, lastestEvent } = await ctx.db.transaction(
        async (tx) => {
          await tx.insert(event).values({
            hostID: input.hostUserID,
            participantID: input.participantUserID,
            startTime: input.startTime,
            endTime: input.endTime,
            location: input.location,
            price: input.price,
          });
          const lastestEvent = await tx.query.event.findFirst({
            where: and(
              eq(event.hostID, input.hostUserID),
              eq(event.participantID, input.participantUserID),
            ),
            orderBy: (event, { desc }) => [desc(event.createdAt)],
          });
          if (!lastestEvent) {
            throw new Error("Failed to send message");
          }

          await createInbox(tx, input.hostUserID, input.participantUserID);
          await tx.insert(chatMessage).values({
            senderUserID: input.hostUserID,
            receiverUserID: input.participantUserID,
            content: lastestEvent.id.toString(),
            contentType: "event",
          });

          const lastestMessage = await tx.query.chatMessage.findFirst({
            where: and(
              eq(chatMessage.senderUserID, input.hostUserID),
              eq(chatMessage.receiverUserID, input.participantUserID),
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
                  eq(chatInbox.userID1, input.hostUserID),
                  eq(chatInbox.userID2, input.participantUserID),
                ),
                and(
                  eq(chatInbox.userID2, input.hostUserID),
                  eq(chatInbox.userID1, input.participantUserID),
                ),
              ),
            );
          return { lastestMessage, lastestEvent };
        },
      );

      const messageForSender: RecentEventMessage = {
        id: lastestMessage.id,
        myId: ctx.session.user.userId,
        discourserId: lastestMessage.receiver.id,
        discourserAka: lastestMessage.receiver.aka,
        discourserImageURL: lastestMessage.receiver.profileImageURL,
        contentType: "event",

        senderId: lastestEvent.hostID,
        content: {
          description: lastestEvent.description ?? "",
          location: lastestEvent.location,
          price: lastestEvent.price,
          startTime: lastestEvent.startTime,
          endTime: lastestEvent.endTime,
        },
        createdAt: lastestMessage.createdAt,
      };
      const messageForReciever: RecentEventMessage = {
        id: lastestMessage.id,
        myId: lastestMessage.receiver.id,
        senderId: lastestEvent.hostID,
        discourserId: ctx.session.user.userId,
        discourserAka: ctx.session.user.userName,
        discourserImageURL: lastestMessage.sender.profileImageURL,
        contentType: "event",
        content: {
          description: lastestEvent.description ?? "",
          location: lastestEvent.location,
          price: lastestEvent.price,
          startTime: lastestEvent.startTime,
          endTime: lastestEvent.endTime,
        },
        createdAt: lastestMessage.createdAt,
      };

      await Promise.all([
        ctx.pusher.trigger(
          `private-user-${input.hostUserID}`,
          RECENT_MESSAGE_EVENT,
          messageForSender,
        ),
        ctx.pusher.trigger(
          `private-user-${input.participantUserID}`,
          RECENT_MESSAGE_EVENT,
          messageForReciever,
        ),
      ]);
    }),

  myEvent: userProcedure
    .input(
      z.object({
        status: z.enum(["upcoming", "completed"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const filter: SQL[] = [
        or(
          eq(event.hostID, ctx.session.user.userId),
          eq(event.participantID, ctx.session.user.userId),
        )!,
      ];
      if (input.status === "upcoming") {
        filter.push(
          or(
            eq(event.status, "payment-await"),
            eq(event.status, "payment-done"),
          )!,
        );
      } else if (input.status === "completed") {
        filter.push(
          or(eq(event.status, "completed"), eq(event.status, "canceled"))!,
        );
      }

      const res = await ctx.db.query.event.findMany({
        where: and(...filter),
        with: {
          host: true,
          participant: true,
        },
      });

      return res;
    }),

  finishEvent: participantProcedure
    .input(
      z.object({
        eventID: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const eventRow = await ctx.db.query.event.findFirst({
        where: eq(event.id, input.eventID),
      });

      if (!eventRow) {
        throw new Error("Event not found");
      }

      if (eventRow.participantID !== ctx.session.user.userId) {
        throw new Error("Unauthorized");
      }

      await ctx.db
        .update(event)
        .set({
          status: "completed",
        })
        .where(eq(event.id, input.eventID));
    }),

  cancelEvent: userProcedure
    .input(
      z.object({
        eventID: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const eventRow = await ctx.db.query.event.findFirst({
        where: eq(event.id, input.eventID),
      });

      if (!eventRow) {
        throw new Error("Event not found");
      }

      if (
        eventRow.participantID !== ctx.session.user.userId &&
        eventRow.hostID !== ctx.session.user.userId
      ) {
        throw new Error("Unauthorized");
      }

      await ctx.db
        .update(event)
        .set({
          status: "canceled",
        })
        .where(eq(event.id, input.eventID));
    }),

  payEvent: participantProcedure
    .input(
      z.object({
        eventID: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const eventRow = await ctx.db.query.event.findFirst({
        where: eq(event.id, input.eventID),
      });

      if (!eventRow) {
        throw new Error("Event not found");
      }

      if (eventRow.participantID !== ctx.session.user.userId) {
        throw new Error("Unauthorized");
      }

      if (eventRow.status !== "payment-await") {
        throw new Error("Invalid status");
      }

      await ctx.db.transaction(async (tx) => {
        await tx
          .update(event)
          .set({
            status: "payment-done",
          })
          .where(eq(event.id, input.eventID));
        // TODO: transfer money and add to transaction history
      });
    }),
});
