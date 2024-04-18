import { createCaller, createContextInner } from "./trpc-mock/context";
import { vitest, vi, test } from "vitest";
import { mockDeep } from "vitest-mock-extended";
import { db } from "./mock/db";
import { createTRPCContext } from "@/server/api/trpc";
import { request } from "http";
import { mock } from "node:test";

// const mocked = vitest.hoisted(() => {
//   return {
//     profileRouter: {
//       requsetWithdraw: vitest.fn(),
//     },
//   };
// });
vi.mock("@/server/db", async () => {
  const actual = await vi.importActual("./mock/db");
  return {
    ...actual,
  };
});
vi.mock("@/server/pusher/pusher", async () => {
  const actual = await vi.importActual("./mock/db");
  return {
    ...actual,
  };
});
vi.mock("@/server/api/auth", async () => {
  const actual = await vi.importActual("./mock/db");
  return {
    ...actual,
  };
});
// vi.mock("@/server/api/routers/profile", async (importOriginal) => {
//   const actual =
//     await importOriginal<typeof import("@/server/api/routers/profile")>();
//   console.log(actual);
//   return {
//     ...actual,
//     requestWithdraw: mockDeep({
//       mutation: async () => {
//         const userData = mockDeep({
//           balance: 100,
//         });
//         const withdraw_requests_sum = mockDeep({
//           total: 0,
//         });
//       },
//     }),
//   };
// });
// vi.mock("@/server/api/routers/profile", async () => {
//   const actual = await vi.importActual("./mock/requestWithdraw");
//   return {
//     ...actual,
//   };
// });

test("withdraw", async () => {
  // Mocked user data with a balance of 100
  const mockedUserData = { balance: 100 };
  // Mock the findFirst function
  const mockFindFirst = vitest.fn().mockResolvedValue(mockedUserData);
  const ctx = await createTRPCContext({
    headers: new Headers(),
    session: {
      user: {
        userName: "test",
        userId: "1",
        role: "host",
        email: "test@host.com",
        firstName: "test",
        lastName: "test",
        gender: "Male",
      },
      sessionId: "1",
      activePeriodExpiresAt: new Date(),
      fresh: true,
      idlePeriodExpiresAt: new Date(),
      state: "active",
    },
  });

  const input = {
    amountStang: 10,
    bankName: "KTB",
    bankAccount: "1234",
  } as const;

  const caller = createCaller(ctx);
  const result = await caller.profile.requestWithdraw(input);
  console.log(result);
  // expect(result).;
});
