import { string, z } from "zod";
import { createTRPCRouter, userProcedure } from "../trpc";
import {
  internalTransaction,
  externalTransaction,
  event,
  user,
  hostUser,
} from "@/server/db/schema";
import { eq, desc, sql, type SQL } from "drizzle-orm";

export const transactionRouter = createTRPCRouter({
  getTransactions: userProcedure.query(async ({ ctx }) => {
    const isHost = !!(await ctx.db.query.hostUser.findFirst({
      where: eq(hostUser.userID, ctx.session?.user.userId),
    }));

    const internalTransactionWithData = await ctx.db
      .select({
        id: sql`${internalTransaction.id}`.mapWith(Number),
        type: sql`${internalTransaction.type}`.mapWith(String) as SQL<
          "pay" | "recieve" | "refund" | "withdraw" | "topup"
        >,
        createdAt: sql`${internalTransaction.createdAt}`.mapWith(Date),
        amount: sql`${internalTransaction.amount}`.mapWith(Number),
        aiteiName: sql`${user.id}`.mapWith(String),
        eventDate: sql`${event.startTime}`.mapWith(Date),
      })
      .from(internalTransaction)
      .innerJoin(event, eq(internalTransaction.eventID, event.id))
      .innerJoin(user, eq(user.id, isHost ? event.participantID : event.hostID))
      .where(eq(internalTransaction.userID, ctx.session?.user.userId))
      .orderBy(desc(internalTransaction.createdAt))
      .execute();

    const externalTransactionWithData = await ctx.db
      .select({
        id: sql`${externalTransaction.id}`.mapWith(Number),
        type: sql`${externalTransaction.type}`.mapWith(String) as SQL<
          "pay" | "recieve" | "refund" | "withdraw" | "topup"
        >,
        createdAt: sql`${externalTransaction.createdAt}`.mapWith(Date),
        amount: sql`${externalTransaction.amount}`.mapWith(Number),
        aiteiName: sql`${null}`.mapWith(String),
        eventDate: sql`${null}`.mapWith(Date),
      })
      .from(externalTransaction)
      .where(eq(externalTransaction.userID, ctx.session?.user.userId))
      .orderBy(desc(externalTransaction.createdAt))
      .execute();

    const res = internalTransactionWithData.concat(externalTransactionWithData);

    return res;
  }),
});
