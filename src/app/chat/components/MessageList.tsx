"use client";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils/tailwind-merge";
import { api } from "@/trpc/react";
import { usePusher } from "../../_context/PusherContext";
import { type RecentMessage } from "@/types/pusher";
import { useState, useEffect, useRef } from "react";
import { type Channel } from "pusher-js";
import { RECENT_MESSAGE_EVENT } from "@/constants/pusher-events";
import { MessageCard } from "./MessageCard";
import { useIntersection } from "@mantine/hooks";
import LoadingSVG from "./LoadingSVG";

export function MessageList({
  className,
  pagePathName,
}: {
  className?: string;
  pagePathName: string;
}) {
  "use client";
  const pusher = usePusher();
  let chatChannel: Channel | null = null;
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);

  const { data: user } = api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) return;
      chatChannel = pusher.subscribe(`private-user-${data.userId}`);
      chatChannel.bind(RECENT_MESSAGE_EVENT, (message: RecentMessage) => {
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
      limit: 10,
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
      chatChannel?.unbind(RECENT_MESSAGE_EVENT);
    };
  }, [chatChannel]);

  useEffect(() => {
    (async () => {
      if (entry?.isIntersecting) {
        await fetchNextPage();
      }
    })().catch((e) => console.log(e));
  }, [entry, fetchNextPage]);

  return (
    <div
      className={cn(
        "flex h-screen flex-col justify-center p-9 md:min-w-[452px]",
        className,
      )}
    >
      <div className="mb-5 flex flex-row items-center gap-2.5">
        <FontAwesomeIcon
          icon={faComment}
          className={"h-8 w-7 text-secondary-500"}
        />
        <span className="h2 font-bold  text-primary-900">Message</span>
      </div>
      <div
        id="scroll"
        className="scrollbar-hide m-0 flex h-full flex-col items-center gap-4 overflow-y-auto  rounded-lg bg-none"
      >
        {user &&
          recentMessages?.map((data) => {
            if (
              data.contentType === "text" ||
              data.contentType === "imageURL"
            ) {
              return (
                <MessageCard
                  isSelected={pagePathName.includes(data.discourserId)}
                  key={data.id}
                  discourserId={data.discourserId}
                  discourserAka={data.discourserAka}
                  lastestMessage={data.content}
                  createdAt={data.createdAt?.toString()} // Applying optional chaining here
                  imageUrl={data.discourserImageURL}
                />
              );
            } else if (data.contentType === "event") {
              return (
                <MessageCard
                  isSelected={pagePathName.includes(data.discourserId)}
                  key={data.id}
                  discourserId={data.discourserId}
                  discourserAka={data.discourserAka}
                  lastestMessage={"New Event"}
                  createdAt={data.createdAt?.toString()} // Applying optional chaining here
                  imageUrl={data.discourserImageURL}
                />
              );
            }
          })}
        {hasNextPage && (
          <div ref={ref}>
            <LoadingSVG color="#F55B8E" />
          </div>
        )}
      </div>
    </div>
  );
}
