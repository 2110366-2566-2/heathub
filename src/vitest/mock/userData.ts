import { user } from "@/server/db/schema";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { beforeEach } from "vitest";
beforeEach(() => {
  mockReset(userData);
});

const userData = mockDeep<typeof user>();
export { userData };
