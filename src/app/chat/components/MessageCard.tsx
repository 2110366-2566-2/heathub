"use client";
import { type MessageCardProps } from "./type";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { getTimeDiff } from "../utils/timediff";
export function MessageCard(props: MessageCardProps) {
  const router = useRouter();
  const duration = getTimeDiff(props.createdAt);

  const onClick = () => {
    router.push(`/chat/${props.anotherUserID}`);
  };

  return (
    <Button
      variant="outline"
      className="h-fit w-[380px] whitespace-normal rounded-lg border-2 border-primary-300 p-0 "
      onClick={onClick}
    >
      <div className="flex h-full w-full flex-1 flex-row content-center items-center justify-between gap-2 p-2">
        <div className="flex w-fit  flex-row gap-2">
          <Avatar className="h-[52px] w-[52px]">
            <AvatarImage src={props.imageUrl} />
            <AvatarFallback>{props.senderName}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start">
            <div className="h5 w-fit">{props.senderName}</div>
            <div className="small line-clamp-1 w-fit text-start  text-medium">
              {props.lastestMessage}
            </div>
          </div>
        </div>
        <div className="flex flex-none flex-col gap-2 text-primary-600">
          <div className="small text-primary-600">{duration}</div>
          <div className="m-0 h-5 w-5 self-end rounded-full bg-primary-900 p-0 text-white">
            {props.messageCount}
          </div>
        </div>
      </div>
    </Button>
  );
}
