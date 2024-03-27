export interface MessageCardProps {
  className?: string;
  discourserId: string;
  discourserAka: string;
  lastestMessage: string;
  createdAt: string;
  imageUrl: string;
  isSelected: boolean;
}
export interface ChatMessageProps {
  className?: string;
  senderName: string;
  message: MessageType;
  isShowTop: boolean;
  isShowBot: boolean;
  isMine: boolean;
  createdAt: string;
  imageUrl: string | null;
}
export type MessageType = string;
export interface EventDetailCardProps {
  className?: string;
  status: "pending" | "payment-done" | "completed" | "cancelled" | "rejected";
  date: Date;
  price: number;
}

export type ReviewType = {
  location: string;
  participantName: string;
  participantPic: string | null;
  ratingScore: number;
  reviewDesc: string | null;
  createdAt: Date;
  eventDate: Date;
};

export type HostDetail = {
  image: string | null;
  username: string;
  hostID: string;
  rating: number | null;
  isMobile: boolean;
  isVerified : string;
};

export interface TextProps {
  text: string;
  maxLength: number;
}
