"use client";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils/tailwind-merge";
import { api } from "@/trpc/react";
import { usePusher } from "../../_context/PusherContext";
import { type RecentMessage, type ChatMessage } from "@/types/pusher";
import { useState, useEffect } from "react";
import { type Channel } from "pusher-js";
import { CHAT_MESSAGE_EVENT } from "@/constants/pusher-events";
import { MessageCard } from "./MessageCard";

export function MainMessageComponent({ className }: { className?: string }) {
  "use client";
  const pusher = usePusher();
  let chatChannel: Channel | null = null;
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);

  const { data: user } = api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) return;
      chatChannel = pusher.subscribe(`private-user-${data.userId}`);
      chatChannel.bind(CHAT_MESSAGE_EVENT, (message: ChatMessage) => {
        if (
          message.sender.id !== data.userId &&
          message.receiver.id !== data.userId
        )
          return;
        setRecentMessages((prev) => {
          if (prev.some((x) => x.id === message.id)) {
            return prev;
          }
          let newChannel: RecentMessage[] = prev.filter(
            (e) =>
              e.discourserId !== message.senderUserID &&
              e.discourserId !== message.receiverUserID,
          );
          const newMessage: RecentMessage = {
            id: message.id,
            discourserId:
              message.senderUserID === data.userId
                ? message.receiverUserID
                : message.senderUserID,
            discourserAka:
              message.senderUserID === data.userId
                ? message.receiver.aka
                : message.sender.aka,
            discourserImageURL:
              message.senderUserID === data.userId
                ? message.receiver.profileImageURL
                : message.sender.profileImageURL,
            contentType: message.contentType,
            lastestContent: message.content,
            createdAt: message.createdAt,
          };

          return [newMessage, ...newChannel];
        });
      });
    },
    refetchOnWindowFocus: false,
  });

  api.chat.testRecentChat.useQuery(
    { limit: 20 },
    {
      onSuccess: (data) => {
        setRecentMessages((prev) => [...prev, ...data.messages]);
      },
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    return () => {
      chatChannel?.unbind(CHAT_MESSAGE_EVENT);
    };
  }, [chatChannel]);
  return (
    <div
      className={cn(
        "flex h-screen min-w-[452px] flex-col justify-center  bg-purple-100 p-6",
        className,
      )}
    >
      <div className="mb-4 flex flex-row gap-2.5">
        <FontAwesomeIcon
          icon={faComment}
          className={"h-10 w-10 text-secondary-400"}
        />
        <span className="h2-bold  text-primary-900">Message</span>
      </div>
      <div
        className="scrollbar-hide m-0 flex h-full flex-col items-center gap-4 overflow-y-auto  rounded-lg bg-none
      p-4"
      >
        {recentMessages &&
          recentMessages.map((data) => {
            return (
              <MessageCard
                key={data.id}
                discourserId={data.discourserId}
                discourserAka={data.discourserAka}
                lastestMessage={data.lastestContent}
                messageCount={2}
                createdAt={data.createdAt.toString()}
                imageUrl={data.discourserImageURL}
              />
            );
          })}
      </div>
    </div>
  );
}
