import { env } from "@/env";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { luciaAdapter } from "../db";

export const auth = lucia({
  adapter: luciaAdapter,
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
