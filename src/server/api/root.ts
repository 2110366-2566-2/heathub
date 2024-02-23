import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { chatRouter } from "./routers/chat";
import { profileRouter } from "./routers/profile";
import { userRouter } from "./routers/user";

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
});

// export type definition of API
export type AppRouter = typeof appRouter;
