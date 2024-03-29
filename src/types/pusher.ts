export type PostMessage = {
  id: string | number;
  name: string;
  authorID: string;
  authorName: string;
  createdAt: Date;
};

export type ChatMessage = {
  id: number;
  createdAt: Date;
  senderUserID: string;
  receiverUserID: string;
  contentType: "text" | "imageURL";
  content: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    role: "host" | "participant";
    profileImageURL: string | null;
    aka: string;
  };
  receiver: {
    id: string;
    firstName: string;
    lastName: string;
    role: "host" | "participant";
    profileImageURL: string | null;
    aka: string;
  };
};
export type RecentNormalMessage = {
  id: number;
  myId: string;
  discourserId: string;
  discourserAka: string;
  senderId: string;
  discourserImageURL: string | null;
  contentType: "text" | "imageURL";
  content: string;
  createdAt: Date;
  isVerified?: boolean;
};

export type RecentEventMessage = {
  id: number;
  myId: string;
  discourserId: string;
  discourserAka: string;
  senderId: string;
  discourserImageURL: string | null;
  contentType: "event";
  content: {
    eventId: number;
    description: string | null;
    location: string;
    price: number;
    status:
      | "pending"
      | "cancelled-creation"
      | "payment-done"
      | "completed"
      | "cancelled"
      | "rejected";
    startTime: Date;
    endTime: Date;
  };
  createdAt: Date;
  isVerified?: boolean;
};

export type RecentMessage = RecentNormalMessage | RecentEventMessage;
