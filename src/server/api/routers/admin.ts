import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";

import { hostUser, verifiedRequest } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const adminRouter = createTRPCRouter({
  updateVerifiedRequestStatus: adminProcedure
    .input(
      z.object({
        hostID: z.string(),
        updateStatus: z.enum(["verified", "rejected"]),
        requestID: z.number(),
        details: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(hostUser)
          .set({
            verifiedStatus: input.updateStatus,
          })
          .where(eq(hostUser.userID, input.hostID));
        await tx
          .update(verifiedRequest)
          .set({
            status: input.updateStatus,
            requestDetails: input.details ?? "",
            nationalIDCardImageURL: null,
          })
          .where(
            and(
              eq(verifiedRequest.hostID, input.hostID),
              eq(verifiedRequest.id, input.requestID),
            ),
          );
      });
    }),

  getVerifiedRequest: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        page: z.number().default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const items = await ctx.db.query.verifiedRequest.findMany({
        limit: limit + 1,
        with: {
          host: true,
        },
        offset: limit * input.page,
        where: eq(verifiedRequest.status, "pending"),
        orderBy: (verifiedRequest, { asc }) => [asc(verifiedRequest.id)],
      });

      let hasNextPage = false;

      if (items.length > limit) {
        items.pop();
        hasNextPage = true;
      }
      return {
        items,
        hasNextPage,
      };
    }),
});
