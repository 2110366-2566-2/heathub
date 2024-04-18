import { Auth } from "@/server/api/auth";
import { DB } from "@/server/db";
import { mock } from "node:test";
import Pusher from "pusher";
import { beforeEach } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(db);
  mockReset(pusher);
  mockReset(auth);
});

const db = mockDeep<DB>();
const pusher = mockDeep<Pusher>();
const auth = mockDeep<Auth>();
export { db, pusher, auth };
