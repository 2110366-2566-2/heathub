import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  internalTransaction,
  externalTransaction,
  event,
  user,
} from "@/server/db/schema";

export const transactionRouter = createTRPCRouter({
  getTransactions: publicProcedure
    .input(
      z.object({
        userID: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      //   const transactionWithData = ctx.db
      //     .select({
      //       id: internalTransaction.id,
      //       type: internalTransaction.type,
      //       dateTime: internalTransaction.createdAt,
      //       amount: internalTransaction.amount,
      //       eventDate: event.startTime,
      //     })
      //     .from(int);
      const transactionsWithData = await ctx.db
        .select({
          transactionID: externalTransaction.id,
          typeOfTransaction: externalTransaction.type,
          createdAt: externalTransaction.createdAt,
          amount: externalTransaction.amount,
        })
        .from(externalTransaction)
        .where(eq(externalTransaction.userID, input.userID))
        .unionAll(
          ctx.db
            .select({
              transactionID: internalTransaction.id,
              typeOfTransaction: internalTransaction.type,
              createdAt: internalTransaction.createdAt,
              amount: internalTransaction.amount,
              eventDate: event.startTime,
              otherSideName: user.userName,
            })
            .from(internalTransaction)
            .innerJoin(event, eq(event.id, internalTransaction.eventID))
            .innerJoin(user, eq(user.id, internalTransaction.userID))
            .where(eq(internalTransaction.userID, input.userID)),
        )
        .orderBy(desc(externalTransaction.createdAt));
    }),
});
