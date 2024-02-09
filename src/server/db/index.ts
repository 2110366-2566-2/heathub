import { env } from "@/env";
import { connect, type Connection } from "@planetscale/database";
import { drizzle as mysqlDrizzle } from "drizzle-orm/mysql2";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";

import mysql from "mysql2/promise";

import { mysql2, planetscale } from "@lucia-auth/adapter-mysql";
import * as schema from "./schema";

let planetscaleConnection: Connection | undefined;

let mysqlConnection: mysql.Pool | undefined;

if (env.USE_LOCAL_DB) {
  mysqlConnection = mysql.createPool(
    `mysql://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}/${env.DATABASE_NAME}`,
  );
} else {
  planetscaleConnection = connect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
  });
}

export const luciaAdapter = env.USE_LOCAL_DB
  ? mysql2(mysqlConnection!, {
      user: "user",
      key: "user_key",
      session: "user_session",
    })
  : planetscale(planetscaleConnection!, {
      user: "user",
      key: "user_key",
      session: "user_session",
    });

export const db = (env.USE_LOCAL_DB
  ? mysqlDrizzle(mysqlConnection!, { schema, mode: "planetscale" })
  : drizzle(planetscaleConnection!, {
      schema,
    })) as unknown as PlanetScaleDatabase<typeof schema>;

export type DB = typeof db;
