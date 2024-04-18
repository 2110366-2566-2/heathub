/* eslint-disable @typescript-eslint/no-unused-vars */
import { type DB } from "@/server/db";
import type * as trpcNext from "@trpc/server/adapters/next";
import { type Session } from "lucia";
import { createCallerFactory } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  headers: Headers;
  session: Session | null;
  db: DB;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {
    headers: _opts.headers,
    db: _opts.db,
    session: _opts.session,
  };
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

export const createCaller = createCallerFactory(appRouter);
