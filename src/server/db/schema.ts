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
    profileImageURL: varchar("profile_image_url", { length: 256 }).default(""),
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

export const chatInbox = mysqlTable(
  "chat_inbix",
  {
    userID1: varchar("user_id_1", {
      length: 64,
    }).notNull(),

    userID2: varchar("user_id_2", {
      length: 64,
    }).notNull(),
  },
  (chatInbox) => ({
    pk: primaryKey({
      columns: [chatInbox.userID1, chatInbox.userID2],
    }),
    userID1Index: index("user_id_1_idx").on(chatInbox.userID1),
    userID2Index: index("user_id_2_idx").on(chatInbox.userID2),
  }),
);

export const chatInboxRelation = relations(chatInbox, ({ one }) => ({
  participant1: one(user, {
    fields: [chatInbox.userID1],
    references: [user.id],
  }),
  participant2: one(user, {
    fields: [chatInbox.userID2],
    references: [user.id],
  }),
}));

export const chatMessage = mysqlTable(
  "chat_message",
  {
    id: bigint("id", {
      mode: "number",
    })
      .primaryKey()
      .autoincrement(),

    senderUserID: varchar("sender_id", { length: 64 }).notNull(),
    receiverUserID: varchar("receiver_id", { length: 64 }).notNull(),
    contentType: varchar("content_type", {
      length: 32,
      enum: ["text", "imageURL"],
    }).notNull(),
    content: varchar("content", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (chatMessage) => ({
    senderUserIDIndex: index("sender_id_idx").on(chatMessage.senderUserID),
    receiverUserIDIndex: index("receiver_id_idx").on(
      chatMessage.receiverUserID,
    ),
    userPairIndex: index("user_pair_idx").on(
      chatMessage.senderUserID,
      chatMessage.receiverUserID,
    ),
  }),
);

export const chatMessageRelation = relations(chatMessage, ({ one }) => ({
  sender: one(user, {
    fields: [chatMessage.senderUserID],
    references: [user.id],
  }),
  receiver: one(user, {
    fields: [chatMessage.receiverUserID],
    references: [user.id],
  }),
}));

export const passwordResetRequest = mysqlTable("password_reset_request", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid())`),
  userID: varchar("user_id", {
    length: 64,
  }).notNull(),
  createAt: timestamp("created_at").defaultNow().notNull(),
  expires: timestamp("expires")
    .notNull()
    .default(sql`(now() + interval 1 hour)`),
});

export const passwordResetRequestRelation = relations(
  passwordResetRequest,
  ({ one }) => ({
    user: one(user, {
      fields: [passwordResetRequest.userID],
      references: [user.id],
    }),
  }),
);
