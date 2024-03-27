"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dayjs } from "@/utils/dayjs";
import { cn } from "@/utils/tailwind-merge";
import { useRouter } from "next/navigation";
import { type MessageCardProps } from "./type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export function MessageCard(props: MessageCardProps) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/chat/${props.discourserId}`);
  };

  return (
    <Button
      variant="default"
      className={cn(
        props.isSelected
          ? "bg-secondary-400 text-white transition ease-in-out hover:bg-secondary-400 lg:w-[380px]"
          : "bg-white hover:bg-neutral-50",
        props.className,
        "delay-50 h-fit w-full cursor-pointer whitespace-normal rounded-lg p-0",
      )}
      onClick={onClick}
    >
      <div className="flex h-full w-full flex-1 flex-row content-center items-center justify-between gap-2 p-2">
        <div className="flex w-fit  flex-row gap-2">
          <Avatar className="h-[52px] w-[52px]">
            {<AvatarImage src={props.imageUrl} />}
            <AvatarFallback>{props.discourserAka}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start">
            <div className="flex flex-row items-center gap-1">
              <div
                className={cn(
                  "h5 w-fit",
                  props.isSelected ? "text-white" : "text-black",
                )}
              >
                {props.discourserAka}
              </div>
              {props.isVerified && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={cn(
                    props.isSelected ? "text-white" : "text-secondary-500",
                    "h-3 w-3",
                  )}
                  size="1x"
                />
              )}
            </div>
            <div
              className={cn(
                "small line-clamp-1 w-full break-all text-start",
                props.isSelected ? "text-white" : "text-medium",
              )}
            >
              {props.lastestMessage}
            </div>
          </div>
        </div>
        <div className=" flex flex-none flex-col justify-around gap-2 self-start">
          <div
            className={cn(
              "small group-hover:text-primary-600",
              props.isSelected ? "text-white" : "text-primary-600",
            )}
          >
            {Dayjs(props.createdAt).format("HH:mm")}
          </div>
        </div>
      </div>
    </Button>
  );
}
