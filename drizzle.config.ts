import { type Config } from "drizzle-kit";

import { env } from "@/env";

const param = env.USE_LOCAL_DB ? "" : `?ssl={"rejectUnauthorized":true}`;

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: `mysql://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}/${env.DATABASE_NAME}${param}`,
  },
} satisfies Config;
