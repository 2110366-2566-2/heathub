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
      chatChannel.bind(CHAT_MESSAGE_EVENT, (message: RecentMessage) => {
        if (
          message.myId !== data.userId &&
          message.discourserId !== data.userId
        )
          return;
        setRecentMessages((prev) => {
          const newRecentMessages = prev.filter((e) => {
            e.discourserId !== message.discourserId;
          });
          return [message, ...newRecentMessages];
        });
      });
    },
    refetchOnWindowFocus: false,
  });

  api.chat.recentChats.useQuery(
    { limit: 10 },
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
        "flex h-screen flex-col justify-center bg-purple-100  p-6 md:min-w-[452px]",
        className,
      )}
    >
      <div className="mb-2 flex flex-row items-center gap-2.5 pl-4">
        <FontAwesomeIcon
          icon={faComment}
          className={"h-8 w-7 text-secondary-400"}
        />
        <span className="h2-bold  text-primary-900">Message</span>
      </div>
      <div
        className="scrollbar-hide m-0 flex h-full flex-col items-center gap-4 overflow-y-auto  rounded-lg bg-none
      p-4"
      >
        {user &&
          recentMessages &&
          recentMessages.map((data) => {
            return (
              <MessageCard
                key={data.id}
                discourserId={data.discourserId}
                discourserAka={data.discourserAka}
                lastestMessage={data.lastestContent}
                messageCount={data.unreadCount}
                createdAt={data.createdAt.toString()}
                imageUrl={data.discourserImageURL}
              />
            );
          })}
      </div>
    </div>
  );
}
