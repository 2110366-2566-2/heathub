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
  };
};
