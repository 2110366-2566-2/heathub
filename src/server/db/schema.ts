// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  bigint,
  date,
  float,
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
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
    balance: bigint("balance", {
      mode: "number",
    }).default(0),
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
  avgRating: float("rating").default(0),
  reviewCount: int("review_count").default(0),
  verifiedStatus: varchar("verified_status", {
    length: 32,
    enum: ["unverified", "pending", "verified", "rejected"],
  }).default("unverified"),
});

export const hostRelation = relations(hostUser, ({ one, many }) => ({
  onUser: one(user, {
    fields: [hostUser.userID],
    references: [user.id],
  }),
  interests: many(hostInterest),
  reviews: many(ratingAndReview),
  reports: many(eventReport),
}));

export const ratingAndReview = mysqlTable("rating_review", {
  reviewID: varchar("review_id", {
    length: 64,
  }).primaryKey(),
  appointmentID: varchar("appointment_id", {
    length: 64,
  }),
  participantID: varchar("participant_id", {
    length: 64,
  }),
  hostID: varchar("host_id", {
    length: 64,
  }),
  ratingScore: int("rating_score").default(0),
  reviewDesc: text("review_description"),
});

export const ratingAndReviewRelation = relations(
  ratingAndReview,
  ({ one }) => ({
    host: one(hostUser, {
      fields: [ratingAndReview.hostID],
      references: [hostUser.userID],
    }),
  }),
);

export const participantUser = mysqlTable("participant_user", {
  userID: varchar("user_id", {
    length: 64,
  }).primaryKey(),
});

export const participantRelation = relations(
  participantUser,
  ({ one, many }) => ({
    onUser: one(user, {
      fields: [participantUser.userID],
      references: [user.id],
    }),
    reports: many(eventReport),
  }),
);

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

export const hostInterestRelation = relations(hostInterest, ({ one }) => ({
  host: one(hostUser, {
    fields: [hostInterest.userID],
    references: [hostUser.userID],
  }),
}));

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
  "chat_inbox",
  {
    userID1: varchar("user_id_1", {
      length: 64,
    }).notNull(),

    userID2: varchar("user_id_2", {
      length: 64,
    }).notNull(),
    lastestMessageId: bigint("lastest_id", {
      mode: "number",
    }),
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
  lastestMessage: one(chatMessage, {
    fields: [chatInbox.lastestMessageId],
    references: [chatMessage.id],
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
      enum: ["text", "imageURL", "event"],
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

export const unconfirmedUserProfileImage = mysqlTable(
  "unconfirmed_user_profile_image",
  {
    id: bigint("id", {
      mode: "number",
    })
      .primaryKey()
      .autoincrement(),
    userID: varchar("user_id", {
      length: 64,
    }).notNull(),
    imageURL: varchar("image_url", { length: 256 }).notNull(),
  },
  (unconfirmedUserProfileImage) => ({
    userIDIndex: index("user_id_idx").on(unconfirmedUserProfileImage.userID),
  }),
);

export const unconfirmedUserProfileImageRelation = relations(
  unconfirmedUserProfileImage,
  ({ one }) => ({
    user: one(user, {
      fields: [unconfirmedUserProfileImage.userID],
      references: [user.id],
    }),
  }),
);

export const externalTransaction = mysqlTable(
  "external_transaction",
  {
    id: bigint("id", {
      mode: "number",
    })
      .primaryKey()
      .autoincrement(),
    userID: varchar("user_id", {
      length: 64,
    }).notNull(),
    amount: bigint("amount", {
      mode: "number",
    }).notNull(),
    sessionID: varchar("session_id", { length: 128 }).notNull().unique(),
    type: varchar("type", {
      length: 16,
      enum: ["topup", "withdraw"],
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (externalTransaction) => ({
    userIDIndex: index("user_id_idx").on(externalTransaction.userID),
    sessionIDIndex: index("session_id_idx").on(externalTransaction.sessionID),
  }),
);

export const externalTransactionRelation = relations(
  externalTransaction,
  ({ one }) => ({
    user: one(user, {
      fields: [externalTransaction.userID],
      references: [user.id],
    }),
  }),
);

export const tranferTransaction = mysqlTable("tranfer_transaction", {
  id: bigint("id", {
    mode: "number",
  })
    .primaryKey()
    .autoincrement(),
  senderID: varchar("sender_id", {
    length: 64,
  }).notNull(),
  receiverID: varchar("receiver_id", {
    length: 64,
  }).notNull(),
  amount: bigint("amount", {
    mode: "number",
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tranferTransactionRelation = relations(
  tranferTransaction,
  ({ one }) => ({
    sender: one(user, {
      fields: [tranferTransaction.senderID],
      references: [user.id],
    }),
    receiver: one(user, {
      fields: [tranferTransaction.receiverID],
      references: [user.id],
    }),
  }),
);

export const event = mysqlTable("event", {
  id: bigint("id", {
    mode: "number",
  })
    .primaryKey()
    .autoincrement(),
  hostID: varchar("host_id", {
    length: 64,
  }).notNull(),
  participantID: varchar("participant_id", {
    length: 64,
  }).notNull(),
  description: varchar("description", {
    length: 64,
  }),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  price: float("price").notNull(),
  location: varchar("location", {
    length: 128,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: varchar("status", {
    length: 32,
    enum: ["pending", "payment-done", "completed", "cancelled", "rejected"],
  })
    .default("pending")
    .notNull(),
});

export const eventRelation = relations(event, ({ one }) => ({
  host: one(user, {
    fields: [event.hostID],
    references: [user.id],
  }),
  participant: one(user, {
    fields: [event.participantID],
    references: [user.id],
  }),
}));

export const verifiedRequest = mysqlTable("verified_request", {
  id: bigint("id", {
    mode: "number",
  })
    .primaryKey()
    .autoincrement(),
  hostID: varchar("host_id", {
    length: 64,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  nationalIDCardImageURL: varchar("national_id_card_image_url", {
    length: 256,
  }).default(""),
});

export const verifiedRequestRelation = relations(
  verifiedRequest,
  ({ one }) => ({
    host: one(user, {
      fields: [verifiedRequest.hostID],
      references: [user.id],
    }),
  }),
);

export const eventReport = mysqlTable("event_report", {
  id: bigint("id", {
    mode: "number",
  })
    .primaryKey()
    .autoincrement(),
  eventID: bigint("event_id", {
    mode: "number",
  }).notNull(),
  participantID: varchar("participant_id", {
    length: 64,
  }).notNull(),
  hostID: varchar("host_id", {
    length: 64,
  }).notNull(),
  title: varchar("title", {
    length: 64,
  }).notNull(),
  detail: text("detail"),
  status: varchar("status", {
    length: 32,
    enum: ["pending", "resolved", "rejected"],
  })
    .default("pending")
    .notNull(),
});

export const eventReportRelation = relations(eventReport, ({ one }) => ({
  event: one(event, {
    fields: [eventReport.eventID],
    references: [event.id],
  }),
  host: one(hostUser, {
    fields: [eventReport.hostID],
    references: [hostUser.userID],
  }),
  participant: one(participantUser, {
    fields: [eventReport.participantID],
    references: [participantUser.userID],
  }),
}));
