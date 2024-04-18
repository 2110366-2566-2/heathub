import { withdrawalRequest } from "@/server/db/schema";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { beforeEach } from "vitest";

beforeEach(() => {
  mockReset(requsetWithdraw);
});

const requsetWithdraw = mockDeep<typeof withdrawalRequest>();
export { requsetWithdraw };
