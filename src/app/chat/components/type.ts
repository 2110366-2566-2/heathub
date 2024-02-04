export interface MessageCardProps {
  pairUserId: string;
  pairUserName: string;
  lastestMessage: string;
  messageCount: number;
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
