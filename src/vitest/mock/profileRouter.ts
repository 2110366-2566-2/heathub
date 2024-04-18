import { user, withdrawalRequest } from "@/server/db/schema";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { beforeEach } from "vitest";
import { profileRouter as pRouter } from "@/server/api/routers/profile";
import { mock } from "node:test";

beforeEach(() => {
  mockReset(profileRouter);
});
// requestWithdraw: hostProcedure
//     .input(
//       z.object({
//         amountStang: z.number(),
//         bankName: z.enum(BANK_LIST),
//         bankAccount: z.string(),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const userData = await ctx.db.query.user.findFirst({
//         where: eq(user.id, ctx.session.user.userId),
//         columns: {
//           balance: true,
//         },
//       });

//       const withdraw_requests_sum = await ctx.db
//         .select({
//           total: sql`sum(${withdrawalRequest.amount})`.mapWith(Number),
//         })
//         .from(withdrawalRequest)
//         .where(
//           and(
//             eq(withdrawalRequest.userID, ctx.session.user.userId),
//             eq(withdrawalRequest.status, "pending"),
//           ),
//         )
//         .execute();

//       if (!userData) {
//         throw new Error("User not found");
//       }

//       const withdrawableBalance =
//         userData.balance - (withdraw_requests_sum[0]?.total ?? 0);

//       if (withdrawableBalance < input.amountStang) {
//         throw new Error("Insufficient balance");
//       }

//       await ctx.db.insert(withdrawalRequest).values({
//         userID: ctx.session.user.userId,
//         bankName: input.bankName,
//         bankAccount: input.bankAccount,
//         amount: input.amountStang,
//       });
//     }),
const profileRouter = mockDeep<typeof pRouter>({
  requestWithdraw: mockDeep({
    mutation: async () => {
      const userData = mockDeep({
        fallbackMockImplementation: () => {
          return {
            userid: "1",
          };
        },
      });
      // Rest of the code
    },
  }) as any, // Add 'as any' to bypass type checking
});

export { profileRouter };
