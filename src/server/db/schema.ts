// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    authorID: varchar("author_id", { length: 64 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const postsRelation = relations(posts, ({ one }) => ({
  postedBy: one(user, {
    fields: [posts.authorID],
    references: [user.id],
  }),
}));

export const user = mysqlTable(
  "user",
  {
    id: varchar("id", {
      length: 64,
    }).primaryKey(),
    username: varchar("username", { length: 128 }).notNull().unique(),
    email: varchar("email", { length: 128 }).notNull().unique(),
    firstName: varchar("first_name", { length: 64 }).notNull(),
    lastName: varchar("last_name", { length: 64 }).notNull(),
    gender: varchar("gender", { length: 32 }).notNull(),
  },
  (user) => ({
    usernameIndex: index("username_idx").on(user.username),
    emailIndex: index("email_idx").on(user.email),
  }),
);

export const key = mysqlTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 64,
  }).notNull(),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});

export const session = mysqlTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});
