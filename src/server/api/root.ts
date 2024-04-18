import { createTRPCContext, createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { chatRouter } from "./routers/chat";
import { profileRouter } from "./routers/profile";
import { userRouter } from "./routers/user";
import { eventRouter } from "./routers/event";
import { adminRouter } from "./routers/admin";
import { reviewRouter } from "./routers/review";
import { reportRouter } from "./routers/report";
import { transactionRouter } from "./routers/transaction";
import { initTRPC } from "@trpc/server";
import { user, withdrawalRequest } from "../db/schema";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { BANK_LIST } from "@/constants/payment";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chat: chatRouter,
  auth: authRouter,
  profile: profileRouter,
  user: userRouter,
  event: eventRouter,
  admin: adminRouter,
  review: reviewRouter,
  report: reportRouter,
  transaction: transactionRouter,
  me: meRouter,
});

export type AppRouter = typeof appRouter;
