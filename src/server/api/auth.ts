import { env } from "@/env";
import { planetscale } from "@lucia-auth/adapter-mysql";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { connection } from "../db";

export const auth = lucia({
  adapter: planetscale(connection, {
    user: "user",
    key: "user_key",
    session: "user_session",
  }),
  env: env.NODE_ENV == "production" ? "PROD" : "DEV",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },

  getUserAttributes: (userDatabase) => ({
    userName: userDatabase.username,
    email: userDatabase.email,
    firstName: userDatabase.first_name,
    lastName: userDatabase.last_name,
    gender: userDatabase.gender,
  }),
});

export type Auth = typeof auth;
