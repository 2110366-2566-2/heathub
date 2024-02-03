export interface MessageCardProps {
  anotherUserID: string;
  senderName: string;
  lastestMessage: string;
  messageCount: number;
  createdAt: string;
  imageUrl?: string;
}
export interface ChatMessageProps {
  senderName: string;
  message: MessageType;
  isShowTop: boolean;
  isShowBot: boolean;
  isMine: boolean;
  createdAt: string;
  imageUrl?: string | null;
}
export type MessageType = string;
