"use client";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils/tailwind-merge";
import { api } from "@/trpc/react";
import { usePusher } from "../../_context/PusherContext";
import { type RecentMessage } from "@/types/pusher";
import { useState, useEffect, useRef } from "react";
import { type Channel } from "pusher-js";
import { CHAT_MESSAGE_EVENT } from "@/constants/pusher-events";
import { MessageCard } from "./MessageCard";
import { useIntersection } from "@mantine/hooks";
import LoadingSVG from "./LoadingSVG";

export function MessageList({ className }: { className?: string }) {
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
            return e.discourserId !== message.discourserId;
          });
          const newm = [message, ...newRecentMessages];
          return newm;
        });
      });
    },
    refetchOnWindowFocus: false,
  });

  const { hasNextPage, fetchNextPage } = api.chat.recentChats.useInfiniteQuery(
    {
      limit: 1,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      onSuccess: (data) => {
        const lastestPage = data.pages.at(-1)?.messages;
        if (lastestPage) {
          setRecentMessages((prev) => [...prev, ...lastestPage]);
        }
      },

      refetchOnWindowFocus: false,
    },
  );
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    return () => {
      chatChannel?.unbind(CHAT_MESSAGE_EVENT);
    };
  }, [chatChannel]);

  useEffect(() => {
    (async () => {
      if (entry?.isIntersecting) {
        await fetchNextPage();
      }
    })().catch((e) => console.log(e));
  }, [entry, fetchNextPage]);

  const elements = [];
  for (let i = 0; i < 20; i++) {
    // Push JSX elements into the array
    elements.push(<div key={i}>Element {i}</div>);
  }
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
        id="scroll"
        className="scrollbar-hide m-0 flex h-full flex-col items-center gap-4 overflow-y-auto  rounded-lg bg-none
      p-4"
      >
        {user &&
          recentMessages?.map((data) => {
            return (
              <MessageCard
                key={data.id}
                discourserId={data.discourserId}
                discourserAka={data.discourserAka}
                lastestMessage={data.lastestContent}
                createdAt={data.createdAt?.toString()} // Applying optional chaining here
                imageUrl={data.discourserImageURL}
              />
            );
          })}
        {elements.map((e) => e)}
        {hasNextPage && (
          <div ref={ref}>
            <LoadingSVG />
          </div>
        )}
      </div>
    </div>
  );
}
