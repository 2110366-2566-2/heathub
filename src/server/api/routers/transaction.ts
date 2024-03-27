import { createTRPCRouter, userProcedure } from "../trpc";
import {
  internalTransaction,
  externalTransaction,
  event,
  user,
  hostUser,
  withdrawalRequest,
} from "@/server/db/schema";
import { eq, desc, sql, type SQL, and } from "drizzle-orm";

export const transactionRouter = createTRPCRouter({
  getTransactions: userProcedure.query(async ({ ctx }) => {
    const isHost = !!(await ctx.db.query.hostUser.findFirst({
      where: eq(hostUser.userID, ctx.session?.user.userId),
    }));

    const internalTransactionWithData = await ctx.db
      .select({
        type: sql`${internalTransaction.type}`.mapWith(String) as SQL<
          "pay" | "recieve" | "refund" | "withdraw" | "topup" | "pending"
        >,
        createdAt: sql`${internalTransaction.createdAt}`.mapWith(
          internalTransaction.createdAt,
        ),
        amount: sql`${internalTransaction.amount}`.mapWith(Number),
        aiteiName: sql`${user.aka}`.mapWith(String),
        eventDate: sql`${event.startTime}`.mapWith(event.startTime),
      })
      .from(internalTransaction)
      .innerJoin(event, eq(internalTransaction.eventID, event.id))
      .innerJoin(user, eq(user.id, isHost ? event.participantID : event.hostID))
      .where(eq(internalTransaction.userID, ctx.session?.user.userId))
      .orderBy(desc(internalTransaction.createdAt))
      .execute();

    const externalTransactionWithData = await ctx.db
      .select({
        type: sql`${externalTransaction.type}`.mapWith(String) as SQL<
          "pay" | "recieve" | "refund" | "withdraw" | "topup" | "pending"
        >,
        createdAt: sql`${externalTransaction.createdAt}`.mapWith(
          externalTransaction.createdAt,
        ),
        amount: sql`${externalTransaction.amount}`.mapWith(Number),
        aiteiName: sql`${null}`.mapWith(String),
        eventDate: sql`${null}`.mapWith(externalTransaction.createdAt),
      })
      .from(externalTransaction)
      .where(eq(externalTransaction.userID, ctx.session?.user.userId))
      .orderBy(desc(externalTransaction.createdAt))
      .execute();

    const withdrawReqWithData = await ctx.db
      .select({
        type: sql`${withdrawalRequest.status}`.mapWith(String) as SQL<
          "pay" | "recieve" | "refund" | "withdraw" | "topup" | "pending"
        >,
        createdAt: sql`${withdrawalRequest.createdAt}`.mapWith(
          withdrawalRequest.createdAt,
        ),
        amount: sql`${withdrawalRequest.amount}`.mapWith(Number),
        aiteiName: sql`${null}`.mapWith(String),
        eventDate: sql`${null}`.mapWith(externalTransaction.createdAt),
      })
      .from(withdrawalRequest)
      .where(
        and(
          eq(withdrawalRequest.userID, ctx.session?.user.userId),
          eq(withdrawalRequest.status, "pending"),
        ),
      )
      .orderBy(desc(withdrawalRequest.createdAt))
      .execute();

    const res = internalTransactionWithData
      .concat(externalTransactionWithData)
      .concat(withdrawReqWithData);

    return res;
  }),
});
