import { mockDeep, mockReset } from "vitest-mock-extended";
import { beforeEach } from "vitest";
beforeEach(() => {
  mockReset(withdraw_requests_sum);
});

const withdraw_requests_sum = mockDeep<Number>();
export { withdraw_requests_sum };
