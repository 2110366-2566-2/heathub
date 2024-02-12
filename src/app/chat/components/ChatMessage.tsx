"use client";
import { type ChatMessageProps } from "./type";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/utils/tailwind-merge";
import { Dayjs } from "@/utils/dayjs";

export function ChatMessage(props: ChatMessageProps) {
  const { isMine, isShowTop, isShowBot, imageUrl } = props;

  const messageBg = isMine ? "bg-primary-500" : "bg-neutral-100";
  const messageColor = isMine ? "text-invert" : "text-high";
  const justifyPosition = isMine ? "justify-end" : "justify-start";
  const roundedSide = isMine
    ? "rounded-l-lg rounded-br-lg"
    : "rounded-r-lg rounded-bl-lg";
  const textAlign = isMine ? "text-end" : "text-start";
  return (
    <div className={cn("flex h-fit w-full flex-row gap-2", justifyPosition)}>
      <div className="h-fit w-[52px]">
        <Avatar
          className={cn("h-[52px] w-[52px]", {
            hidden: !isShowTop,
          })}
        >
          {imageUrl && <AvatarImage src={imageUrl} />}
          <AvatarFallback>{props.senderName}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={cn("", {
            hidden: !isShowTop,
          })}
        >
          {props.senderName}
        </div>
        <div className={cn("bg-primary-400  p-2 ", messageBg, messageColor, roundedSide)}>
          {props.message}
        </div>
        <div className={cn("small  min-h-1 text-medium", textAlign)}>
          {isShowBot ? `${Dayjs(props.createdAt).format("HH:mm")}` : ""}
        </div>
      </div>{" "}
    </div>
  );
}
