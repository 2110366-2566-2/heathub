import { type Config } from "drizzle-kit";

import { env } from "@/env";

const param = env.USE_LOCAL_DB ? "" : `?ssl={"rejectUnauthorized":true}`;

function getConfig(): Config {
  if (env.USE_LOCAL_DB) {
    return {
      driver: "libsql",
      schema: "./src/server/db/schema.ts",
      dbCredentials: {
        url: "file:libsql/local.db",
      },
    };
  }

  return {
    driver: "turso",
    out: "drizzle/generate",
    schema: "./src/server/db/schema.ts",
    dbCredentials: {
      url: env.DATABASE_HOST,
      authToken: env.DATABASE_PASSWORD,
    },
  };
}

const config = getConfig();

export default config satisfies Config;
