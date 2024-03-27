"use client";
import { RECENT_MESSAGE_EVENT } from "@/constants/pusher-events";
import { generateAvatar } from "@/lib/avatar";
import { api } from "@/trpc/react";
import { type RecentMessage } from "@/types/pusher";
import { cn } from "@/utils/tailwind-merge";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIntersection } from "@mantine/hooks";
import { type Channel } from "pusher-js";
import { useEffect, useRef } from "react";
import { usePusher } from "../../_context/PusherContext";
import LoadingSVG from "./LoadingSVG";
import { MessageCard } from "./MessageCard";

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
  const utils = api.useUtils();

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

        utils.chat.recentChats.setInfiniteData({ limit: 10 }, (oldData) => {
          if (!oldData) return oldData;
          const pages = oldData.pages;
          if (!pages) {
            return oldData;
          }
          const newPages = pages.map((p) => ({
            ...p,
            messages: p.messages.filter((m) => {
              return m.discourserId !== message.discourserId;
            }),
          }));

          if (newPages.length === 0) {
            return oldData;
          }
          newPages[0]!.messages.unshift(message);
          return {
            ...oldData,
            pages: newPages,
          };
        });
      });
    },
    refetchOnWindowFocus: false,
  });

  const { hasNextPage, fetchNextPage, data } =
    api.chat.recentChats.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,

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
        "flex h-screen flex-col justify-center border-r-2 border-neutral-200 p-9 md:min-w-[452px] md:max-w-[452px]",
        className,
      )}
    >
      <div className="mb-5 flex flex-row items-center gap-2.5">
        <FontAwesomeIcon
          icon={faComment}
          className="text-secondary-500"
          size="2x"
        />
        <span className="h2 font-extrabold  text-primary-900">Message</span>
      </div>
      <div
        id="scroll"
        className="scrollbar-hide m-0 flex h-full flex-col items-center gap-4 overflow-y-auto  rounded-lg bg-none"
      >
        {user &&
          data?.pages.map((page) =>
            page.messages.map((data) => {
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
                    imageUrl={
                      data.discourserImageURL ||
                      generateAvatar(data.discourserAka)
                    }
                    isVerified={data.isVerified}
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
                    imageUrl={
                      data.discourserImageURL ||
                      generateAvatar(data.discourserAka)
                    }
                    isVerified={data.isVerified}
                  />
                );
              }
            }),
          )}
        {hasNextPage && (
          <div ref={ref}>
            <LoadingSVG color="#F55B8E" />
          </div>
        )}
      </div>
    </div>
  );
}
