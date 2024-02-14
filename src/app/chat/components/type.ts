import { extend } from "dayjs";

export interface MessageCardProps {
  className?: string;
  discourserId: string;
  discourserAka: string;
  lastestMessage: string;
  createdAt: string;
  imageUrl: string | null;
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
