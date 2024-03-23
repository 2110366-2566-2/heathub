import { createTRPCRouter, userProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { eventReport, event } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const reportRouter = createTRPCRouter({
  createReport: userProcedure
    .input(
      z.object({
        eventID: z.number(),
        title: z.string(),
        details: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const targetEvent = await ctx.db.query.event.findFirst({
        where: eq(event.id, input.eventID),
      });

      if (!targetEvent) {
        throw new Error("Event not found");
      }

      await ctx.db.transaction(async (tx) => {
        await tx.insert(eventReport).values({
          eventID: input.eventID,
          title: input.title,
          details: input.details,
          participantID: targetEvent.participantID,
          hostID: targetEvent.hostID,
        });
      });
    }),
});
