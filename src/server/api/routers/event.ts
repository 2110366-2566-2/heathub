import { createTRPCRouter, hostProcedure } from "@/server/api/trpc";
import { RECENT_MESSAGE_EVENT } from "@/constants/pusher-events";
import { event, chatMessage, chatInbox } from "@/server/db/schema";
import { type RecentEventMessage } from "@/types/pusher";
import { z } from "zod";
import { createInbox } from "./chat";
import { and, eq, or } from "drizzle-orm";
export const eventRouter = createTRPCRouter({
  createEvent: hostProcedure
    .input(
      z.object({
        hostUserID: z.string().min(1),
        participantUserID: z.string().min(1),
        eventName: z.string().min(1),
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
});
