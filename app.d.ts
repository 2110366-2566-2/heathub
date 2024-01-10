/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("@/server/api/auth").Auth;
  type DatabaseUserAttributes = {
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    username: string;
  };
  type DatabaseSessionAttributes = {};
}

type DrizzleUser = import("drizzle-orm").InferSelectModel<
  typeof import("@/server/db/schema.js").user
>;
