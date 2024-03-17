import { env } from "@/env";
import { createClient, type ResultSet } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { libsql } from "@lucia-auth/adapter-sqlite";
import { type ExtractTablesWithRelations } from "drizzle-orm";
import { type BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import * as schema from "./schema";

let tursoClient: ReturnType<typeof createClient> | undefined;

if (env.USE_LOCAL_DB) {
  tursoClient = createClient({
    url: "file:libsql/local.db",
  });
} else {
  tursoClient = createClient({
    url: env.DATABASE_HOST,
    authToken: env.DATABASE_PASSWORD,
  });
}

export const luciaAdapter = libsql(tursoClient, {
  user: "user",
  key: "user_key",
  session: "user_session",
});

export const db = drizzle(tursoClient, {
  schema,
});

export type DB = typeof db;

export type DBQuery = BaseSQLiteDatabase<
  "async",
  ResultSet,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
