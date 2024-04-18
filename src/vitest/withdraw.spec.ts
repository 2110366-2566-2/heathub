// import { BANK_LIST } from "@/constants/payment";
// import { auth } from "@/server/api/auth";
// import { createTRPCContext } from "@/server/api/trpc";
// import { user, withdrawalRequest } from "@/server/db/schema";
// import { initTRPC } from "@trpc/server";
// import { and, eq, sql } from "drizzle-orm";
// import Pusher from "pusher";
// import { vi } from "vitest";
// import { z } from "zod";

// const t = initTRPC.context<typeof createTRPCContext>().create();
// const hostProcedure = t.procedure;
// const { createCallerFactory, router } = t;
// const appRouter = router({
//   requestWithdraw: hostProcedure
//     .input(
//       z.object({
//         amountStang: z.number(),
//         bankName: z.enum(BANK_LIST),
//         bankAccount: z.string(),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const userData = await ctx.db.query.user.findFirst({
//         where: eq(user.id, ctx.session?.user.userId ?? ""),
//         columns: {
//           balance: true,
//         },
//       });
//       const withdrawalUserId = ctx.session?.user.userId ?? ""; // Add null check for ctx.session
//       const withdraw_requests_sum = await ctx.db
//         .select({
//           total: sql`sum(${withdrawalRequest.amount})`.mapWith(Number),
//         })
//         .from(withdrawalRequest)
//         .where(
//           and(
//             eq(withdrawalRequest.userID, withdrawalUserId), // Use the updated withdrawalUserId variable
//             eq(withdrawalRequest.status, "pending"),
//           ),
//         )
//         .execute();

//       if (!userData) {
//         throw new Error("User not found");
//       }

//       const userId = ctx.session?.user.userId ?? ""; // Add null check for ctx.session

//       const withdrawableBalance =
//         userData.balance - (withdraw_requests_sum[0]?.total ?? 0);

//       if (withdrawableBalance < input.amountStang) {
//         throw new Error("Insufficient balance");
//       }

//       await ctx.db.insert(withdrawalRequest).values({
//         userID: userId, // Use the updated userId variable
//         bankName: input.bankName,
//         bankAccount: input.bankAccount,
//         amount: input.amountStang,
//       });
//     }),
// });

// // 1. create a caller-function for your router
// const createCaller = createCallerFactory(appRouter);
// export { appRouter, createCaller };
// 2. create a caller using your `Context`
// const caller = createCaller({
//   session: null,
//   const auth: Auth = {
//     adapter: {
//       user: vi.fn(),
//       session: vi.fn(),
//     },
//     env: "DEV",
//     middleware: vi.fn(),
//     csrfProtection: false,
//     sessionExpiresIn: {
//       activePeriod: 0,
//       idlePeriod: 0,
//     }
//   };
//   }),
//   auth: auth,
//   pusher: new Pusher({
//     appId: process.env.PUSHER_APP_ID || "", // Provide a default value for process.env.PUSHER_APP_ID
//     key: process.env.NEXT_PUBLIC_PUSHER_KEY|| "",
//     secret: process.env.PUSHER_SECRET|| "",
//     cluster: "ap1",
//     useTLS: true,
//   }),
// });
// // 3. use the caller to call your procedures
// const  = await caller.

// });
// const postList = await caller.post.list();
