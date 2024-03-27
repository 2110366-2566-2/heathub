// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { BANK_LIST } from "@/constants/payment";
import { relations, sql } from "drizzle-orm";

import {
  index,
  int,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const user = sqliteTable(
  "user",
  {
    id: text("id", {
      length: 64,
    }).primaryKey(),
    aka: text("aka", { length: 128 }).notNull().unique(),
    email: text("email", { length: 128 }).notNull().unique(),
    firstName: text("first_name", { length: 64 }).notNull(),
    lastName: text("last_name", { length: 64 }).notNull(),
    bio: text("bio", { length: 256 }),
    dateOfBirth: int("date_of_birth", {
      mode: "timestamp",
    }),
    gender: text("gender", { length: 32 }).notNull(),
    role: text("role", {
      length: 32,
      enum: ["host", "participant", "admin"],
    })
      .notNull()
      .default("participant"),
    profileImageURL: text("profile_image_url", { length: 256 }).default(""),
    balance: int("balance", {
      mode: "number",
    })
      .default(0)
      .notNull(),
  },
  (user) => ({
    akaIndex: index("aka_idx").on(user.aka),
    emailIndex: index("email_idx").on(user.email),
  }),
);

export const userRelation = relations(user, ({ many }) => ({
  reported: many(eventReport, {
    relationName: "host",
  }),
  report: many(eventReport, {
    relationName: "participant",
  }),
}));

export const hostUser = sqliteTable("host_user", {
  userID: text("user_id", {
    length: 64,
  }).primaryKey(),
  avgRating: real("rating").default(0),
  reviewCount: int("review_count").default(0),
  verifiedStatus: text("verified_status", {
    length: 32,
    enum: ["unverified", "pending", "verified", "rejected"],
  }).default("unverified"),
  defaultPayoutBankAccount: text("default_bank_account"),
  defaultPayoutBankName: text("default_bank_name", {
    enum: BANK_LIST,
  }),
});

export const hostRelation = relations(hostUser, ({ one, many }) => ({
  onUser: one(user, {
    fields: [hostUser.userID],
    references: [user.id],
  }),
  interests: many(hostInterest),
  reviews: many(ratingAndReview),
  withdrawalRequests: many(withdrawalRequest),
}));

export const ratingAndReview = sqliteTable("rating_review", {
  id: int("id", {
    mode: "number",
  }).primaryKey({
    autoIncrement: true,
  }),
  eventID: int("event_id", {
    mode: "number",
  }).notNull(),
  participantID: text("participant_id", {
    length: 64,
  }),
  hostID: text("host_id", {
    length: 64,
  }),
  ratingScore: int("rating_score").default(0).notNull(),
  reviewDesc: text("review_description", { length: 512 }),
  createdAt: int("created_at", {
    mode: "timestamp_ms",
  }).notNull(),
});

export const ratingAndReviewRelation = relations(
  ratingAndReview,
  ({ one }) => ({
    host: one(hostUser, {
      fields: [ratingAndReview.hostID],
      references: [hostUser.userID],
    }),
    participant: one(participantUser, {
      fields: [ratingAndReview.participantID],
      references: [participantUser.userID],
    }),
    event: one(event, {
      fields: [ratingAndReview.eventID],
      references: [event.id],
    }),
  }),
);

export const participantUser = sqliteTable("participant_user", {
  userID: text("user_id", {
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
  }),
);

export const hostInterest = sqliteTable(
  "host_interest",
  {
    userID: text("user_id", { length: 64 }),
    interest: text("interest", { length: 64 }),
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

export const key = sqliteTable("user_key", {
  id: text("id", {
    length: 255,
  }).primaryKey(),
  userId: text("user_id", {
    length: 64,
  }).notNull(),
  hashedPassword: text("hashed_password", {
    length: 255,
  }),
});

export const session = sqliteTable("user_session", {
  id: text("id", {
    length: 128,
  }).primaryKey(),
  userId: text("user_id", {
    length: 15,
  }).notNull(),
  activeExpires: int("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: int("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const chatInbox = sqliteTable(
  "chat_inbox",
  {
    userID1: text("user_id_1", {
      length: 64,
    }).notNull(),

    userID2: text("user_id_2", {
      length: 64,
    }).notNull(),
    lastestMessageId: int("lastest_id", {
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

export const chatMessage = sqliteTable(
  "chat_message",
  {
    id: int("id", {
      mode: "number",
    }).primaryKey({
      autoIncrement: true,
    }),

    senderUserID: text("sender_id", { length: 64 }).notNull(),
    receiverUserID: text("receiver_id", { length: 64 }).notNull(),
    contentType: text("content_type", {
      length: 32,
      enum: ["text", "imageURL", "event"],
    }).notNull(),
    content: text("content", { length: 256 }).notNull(),
    // createdAt: timestamp("created_at").defaultNow().notNull(),
    createdAt: int("created_at", {
      mode: "timestamp_ms",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
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

export const passwordResetRequest = sqliteTable("password_reset_request", {
  id: text("id", { length: 191 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid())`),
  userID: text("user_id", {
    length: 64,
  }).notNull(),
  createAt: int("created_at", {
    mode: "timestamp_ms",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  expires: int("expires", {
    mode: "timestamp_ms",
  })
    .default(sql`(datetime('now', '+1 hours'))`)
    .notNull(),
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

export const unconfirmedUserProfileImage = sqliteTable(
  "unconfirmed_user_profile_image",
  {
    id: int("id", {
      mode: "number",
    }).primaryKey({
      autoIncrement: true,
    }),
    userID: text("user_id", {
      length: 64,
    }).notNull(),
    imageURL: text("image_url", { length: 256 }).notNull(),
  },
  (unconfirmedUserProfileImage) => ({
    userIDIndex: index("unconfirmed_user_id_idx").on(
      unconfirmedUserProfileImage.userID,
    ),
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

export const externalTransaction = sqliteTable(
  "external_transaction",
  {
    id: int("id", {
      mode: "number",
    }).primaryKey({
      autoIncrement: true,
    }),
    userID: text("user_id", {
      length: 64,
    }).notNull(),
    amount: int("amount", {
      mode: "number",
    }).notNull(),
    sessionID: text("session_id", { length: 128 }).notNull().unique(),
    type: text("type", {
      length: 16,
      enum: ["topup", "withdraw"],
    }).notNull(),
    createdAt: int("created_at", {
      mode: "timestamp_ms",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
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

export const internalTransaction = sqliteTable(
  "internal_transaction",
  {
    id: int("id", {
      mode: "number",
    }).primaryKey({
      autoIncrement: true,
    }),
    userID: text("user_id", {
      length: 64,
    }).notNull(),
    eventID: int("event_id", {
      mode: "number",
    }).notNull(),
    type: text("type", {
      enum: ["pay", "recieve", "refund"],
    }).notNull(),
    // amount is in สตางค์, positive for recieve, negative for pay
    amount: int("amount", {
      mode: "number",
    }).notNull(),
    createdAt: int("created_at", {
      mode: "timestamp_ms",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (internalTransaction) => ({
    userIDIndex: index("internal_transaction_user_id_idx").on(
      internalTransaction.userID,
    ),
    eventIDIndex: index("internal_transaction_event_id_idx").on(
      internalTransaction.eventID,
    ),
  }),
);

export const internalTransactionRelation = relations(
  internalTransaction,
  ({ one }) => ({
    user: one(user, {
      fields: [internalTransaction.userID],
      references: [user.id],
    }),
    event: one(user, {
      fields: [internalTransaction.eventID],
      references: [user.id],
    }),
  }),
);

export const event = sqliteTable("event", {
  id: int("id", {
    mode: "number",
  }).primaryKey({
    autoIncrement: true,
  }),
  hostID: text("host_id", {
    length: 64,
  }).notNull(),
  participantID: text("participant_id", {
    length: 64,
  }).notNull(),
  description: text("description", {
    length: 256,
  }),
  startTime: int("start_time", {
    mode: "timestamp_ms",
  }).notNull(),
  endTime: int("end_time", {
    mode: "timestamp_ms",
  }).notNull(),
  price: real("price").notNull(),
  location: text("location", {
    length: 128,
  }).notNull(),
  createdAt: int("created_at", {
    mode: "timestamp_ms",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  status: text("status", {
    length: 32,
    enum: ["pending", "payment-done", "completed", "cancelled", "rejected"],
  })
    .default("pending")
    .notNull(),
});

export const eventRelation = relations(event, ({ one }) => ({
  host: one(hostUser, {
    fields: [event.hostID],
    references: [hostUser.userID],
  }),
  participant: one(user, {
    fields: [event.participantID],
    references: [user.id],
  }),
  ratingAndReview: one(ratingAndReview, {
    fields: [event.id],
    references: [ratingAndReview.eventID],
  }),
}));

export const verifiedRequest = sqliteTable("verified_request", {
  id: int("id", {
    mode: "number",
  }).primaryKey({
    autoIncrement: true,
  }),
  hostID: text("host_id", {
    length: 64,
  }).notNull(),
  createdAt: int("created_at", {
    mode: "timestamp_ms",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  nationalIDCardImageURL: text("national_id_card_image_url", {
    length: 256,
  }),
  status: text("status", {
    length: 32,
    enum: ["pending", "verified", "rejected"],
  })
    .default("pending")
    .notNull(),
  requestDetails: text("request_details", {
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

export const eventReport = sqliteTable("event_report", {
  id: int("id", {
    mode: "number",
  }).primaryKey({
    autoIncrement: true,
  }),
  eventID: int("event_id", {
    mode: "number",
  }).notNull(),
  participantID: text("participant_id", {
    length: 64,
  }).notNull(),
  hostID: text("host_id", {
    length: 64,
  }).notNull(),
  title: text("title", {
    length: 64,
  }).notNull(),
  details: text("detail"),
  status: text("status", {
    length: 32,
    enum: ["pending", "resolved", "rejected"],
  })
    .default("pending")
    .notNull(),
  createdAt: int("created_at", {
    mode: "timestamp_ms",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const eventReportRelation = relations(eventReport, ({ one }) => ({
  event: one(event, {
    fields: [eventReport.eventID],
    references: [event.id],
  }),
  host: one(user, {
    fields: [eventReport.hostID],
    references: [user.id],
    relationName: "host",
  }),
  participant: one(user, {
    fields: [eventReport.participantID],
    references: [user.id],
    relationName: "participant",
  }),
}));

export const withdrawalRequest = sqliteTable(
  "withdrawal_request",
  {
    id: int("id", {
      mode: "number",
    }).primaryKey({
      autoIncrement: true,
    }),
    userID: text("user_id", {
      length: 64,
    }).notNull(),
    amount: int("amount", {
      mode: "number",
    }).notNull(),
    status: text("status", {
      length: 32,
      enum: ["pending", "completed", "rejected"],
    })
      .default("pending")
      .notNull(),
    createdAt: int("created_at", {
      mode: "timestamp_ms",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    completedAt: int("completed_at", {
      mode: "timestamp_ms",
    }),
    bankName: text("bank_name").notNull(),
    bankAccount: text("bank_account").notNull(),
  },
  (withdrawalRequest) => ({
    userIDIndex: index("withdrawal_request_user_id_idx").on(
      withdrawalRequest.userID,
    ),
  }),
);

export const withdrawalRequestRelation = relations(
  withdrawalRequest,
  ({ one }) => ({
    hostUser: one(hostUser, {
      fields: [withdrawalRequest.userID],
      references: [hostUser.userID],
    }),
  }),
);
