import { removeUploadthingURLPrefix, utapi } from "@/app/api/uploadthing/core";
import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";

import {
  event,
  eventReport,
  externalTransaction,
  hostUser,
  internalTransaction,
  user,
  verifiedRequest,
  withdrawalRequest,
} from "@/server/db/schema";
import { and, eq, type SQL } from "drizzle-orm";
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
      let verifiedReq = await ctx.db.query.verifiedRequest.findFirst({
        where: eq(verifiedRequest.id, input.requestID),
        columns: { id: true, nationalIDCardImageURL: true },
      });
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
      if (
        verifiedReq?.nationalIDCardImageURL &&
        verifiedReq.nationalIDCardImageURL !== ""
      ) {
        await utapi.deleteFiles(
          removeUploadthingURLPrefix(verifiedReq.nationalIDCardImageURL),
        );
      }
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

  getWithdrawalRequest: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        page: z.number().default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const items = await ctx.db.query.withdrawalRequest.findMany({
        limit: limit + 1,
        where: eq(withdrawalRequest.status, "pending"),
        with: {
          hostUser: {
            with: {
              onUser: true,
            },
          },
        },
        offset: limit * input.page,
        orderBy: (withdrawalRequest, { asc }) => [
          asc(withdrawalRequest.createdAt),
        ],
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

  completeWithdrawalRequest: adminProcedure
    .input(
      z.object({
        requestID: z.number(),
      }),
    )

    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const request = await tx.query.withdrawalRequest.findFirst({
          where: eq(withdrawalRequest.id, input.requestID),
        });
        if (!request) {
          throw new Error("Withdrawal request not found");
        }

        const userData = await tx.query.user.findFirst({
          where: eq(user.id, request.userID),
        });

        if (!userData) {
          throw new Error("User not found");
        }

        await tx
          .update(user)
          .set({
            balance: userData.balance - request.amount,
          })
          .where(eq(user.id, request.userID));

        await tx
          .update(withdrawalRequest)
          .set({
            status: "completed",
            completedAt: new Date(),
          })
          .where(and(eq(withdrawalRequest.id, input.requestID)));

        await tx.insert(externalTransaction).values({
          amount: request.amount,
          userID: request.userID,
          type: "withdraw",
          sessionID: "",
        });
      });
    }),

  rejectWithdrawalRequest: adminProcedure
    .input(
      z.object({
        requestID: z.number(),
      }),
    )

    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(withdrawalRequest)
          .set({
            status: "rejected",
          })
          .where(and(eq(withdrawalRequest.id, input.requestID)));
      });
    }),

  getEventReports: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        page: z.number().default(0),
        status: z.enum(["all", "pending", "resolved", "rejected"]).nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { status } = input;
      const limit = input.limit ?? 10;
      let whereClause: SQL<unknown> | undefined;

      if (status && status !== "all") {
        whereClause = eq(eventReport.status, status);
      } else {
        whereClause = undefined;
      }

      const items = await ctx.db.query.eventReport.findMany({
        limit: limit + 1,
        with: {
          host: true,
          event: true,
          participant: true,
        },
        offset: limit * input.page,
        where: whereClause,
        orderBy: (report, { asc }) => [asc(report.createdAt)],
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

  refundEventReport: adminProcedure
    .input(
      z.object({
        reportID: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const report = await tx.query.eventReport.findFirst({
          where: eq(eventReport.id, input.reportID),
        });
        if (!report) {
          throw new Error("Event report not found");
        }

        if (report.status !== "pending") {
          throw new Error("Event report is already resolved");
        }

        const userData = await tx.query.user.findFirst({
          where: eq(user.id, report.participantID),
        });

        if (!userData) {
          throw new Error("User not found");
        }

        const reportedEvent = await tx.query.event.findFirst({
          where: eq(event.id, report.eventID),
        });
        if (!reportedEvent) {
          throw new Error("Event not found");
        }

        await tx
          .update(user)
          .set({
            balance: userData.balance + reportedEvent.price,
          })
          .where(eq(user.id, report.participantID));

        await tx
          .update(eventReport)
          .set({
            status: "resolved",
          })
          .where(and(eq(eventReport.id, input.reportID)));

        await tx
          .update(event)
          .set({
            status: "cancelled",
          })
          .where(eq(event.id, report.eventID));
        await tx.insert(internalTransaction).values({
          eventID: report.eventID,
          userID: report.participantID,
          amount: reportedEvent.price,
          type: "refund",
        });
      });
    }),

  rejectEventReport: adminProcedure
    .input(
      z.object({
        reportID: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const report = await ctx.db.query.eventReport.findFirst({
        where: eq(eventReport.id, input.reportID),
      });

      if (!report) {
        throw new Error("Event report not found");
      }

      if (report.status !== "pending") {
        throw new Error("Event report is already resolved");
      }

      await ctx.db.transaction(async (tx) => {
        await tx
          .update(eventReport)
          .set({
            status: "rejected",
          })
          .where(and(eq(eventReport.id, input.reportID)));
      });
    }),
});
