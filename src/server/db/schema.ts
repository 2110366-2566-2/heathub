// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  bigint,
  date,
  index,
  mysqlTable,
  primaryKey,
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
    aka: varchar("aka", { length: 128 }).notNull().unique(),
    email: varchar("email", { length: 128 }).notNull().unique(),
    firstName: varchar("first_name", { length: 64 }).notNull(),
    lastName: varchar("last_name", { length: 64 }).notNull(),
    bio: varchar("bio", { length: 256 }),
    dateOfBirth: date("date_of_birth"),
    gender: varchar("gender", { length: 32 }).notNull(),
    role: varchar("role", {
      length: 32,
      enum: ["host", "participant"],
    })
      .notNull()
      .default("participant"),
  },
  (user) => ({
    akaIndex: index("aka_idx").on(user.aka),
    emailIndex: index("email_idx").on(user.email),
  }),
);

export const hostUser = mysqlTable("host_user", {
  userID: varchar("user_id", {
    length: 64,
  }).primaryKey(),
});

export const hostRelation = relations(hostUser, ({ one }) => ({
  onUser: one(user, {
    fields: [hostUser.userID],
    references: [user.id],
  }),
}));

export const participantUser = mysqlTable("participant_user", {
  userID: varchar("user_id", {
    length: 64,
  }).primaryKey(),
});

export const participantRelation = relations(participantUser, ({ one }) => ({
  onUser: one(user, {
    fields: [participantUser.userID],
    references: [user.id],
  }),
}));

export const hostInterest = mysqlTable(
  "host_interest",
  {
    userID: varchar("user_id", { length: 64 }),
    interest: varchar("interest", { length: 64 }),
  },
  (interest) => ({
    pk: primaryKey({
      columns: [interest.userID, interest.interest],
    }),
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
