"use client";
import { api } from "@/trpc/react";

import { MessageCard } from "../chat/components/MessageCard";
import { usePusher } from "../_context/PusherContext";
import { type RecentMessage } from "@/types/pusher";
import { useState, useEffect } from "react";
import { type Channel } from "pusher-js";
import { CHAT_MESSAGE_EVENT } from "@/constants/pusher-events";

export function CMessage() {
  "use client";
  const pusher = usePusher();
  let chatChannel: Channel | null = null;
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);

  const { data: user } = api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) return;
      chatChannel = pusher.subscribe(`private-user-${data.userId}`);
      chatChannel.bind(CHAT_MESSAGE_EVENT, (data: RecentMessage) => {
        setRecentMessages((prev) => {
          if (prev.some((x) => x.id === data.id)) {
            return prev;
          }
          return [data, ...prev];
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
      className="scrollbar-hide m-0 flex h-full flex-col items-center gap-4 overflow-y-auto  rounded-lg bg-none
      p-4"
    >
      {recentMessages.map((data, i) => {
        return (
          <MessageCard
            key={data.id}
            pairUserId={data.discourserId}
            pairUserName={data.discourserAka}
            lastestMessage={data.lastestContent}
            messageCount={2}
            createdAt={data.createdAt.toString()}
            imageUrl={data.discourserImageURL}
          />
        );
      })}
    </div>
  );
}
