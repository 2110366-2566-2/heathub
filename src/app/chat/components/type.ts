export interface MessageCardProps {
  discourserId: string;
  discourserAka: string;
  lastestMessage: string;
  createdAt: string;
  imageUrl: string | null;
}
export interface ChatMessageProps {
  senderName: string;
  message: MessageType;
  isShowTop: boolean;
  isShowBot: boolean;
  isMine: boolean;
  createdAt: string;
  imageUrl: string | null;
}
export type MessageType = string;
