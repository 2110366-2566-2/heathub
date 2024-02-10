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
import LoadingSVG from "./LoadingSVG";

export function MessageList({ className }: { className?: string }) {
  "use client";
  const pusher = usePusher();
  let chatChannel: Channel | null = null;
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data: user } = api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) return;
      chatChannel = pusher.subscribe(`private-user-${data.userId}`);
      chatChannel.bind(CHAT_MESSAGE_EVENT, (message: RecentMessage) => {
        if (message.myId !== data.userId && message.discourserId !== data.userId) return;
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

  api.chat.recentChats.useQuery(
    { limit: limit, page: page },
    {
      onSuccess: (data) => {
        setRecentMessages((prev) => [...prev, ...data.messages]);
        //TODO uncomment the bottom line when all web done
        // if (data.messages.length < limit) setHasMore(false); 
      },
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    return () => {
      chatChannel?.unbind(CHAT_MESSAGE_EVENT);
    };
  }, [chatChannel]);

  const elementRef = useRef(null);
  function onIntersection(entries: IntersectionObserverEntry[]) {
    const firstEntry = entries[0];
    if (firstEntry?.isIntersecting && hasMore) {
      console.log("fetch more ");
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (observer) observer.disconnect();
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
        <FontAwesomeIcon icon={faComment} className={"h-8 w-7 text-secondary-400"} />
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
                messageCount={data.unreadCount}
                createdAt={data.createdAt?.toString()} // Applying optional chaining here
                imageUrl={data.discourserImageURL}
              />
            );
          })}
        {
          // Using for loop in JSX
          (() => {
            const elements = [];
            for (let i = 0; i < 20; i++) {
              elements.push(<li key={i}>{i}</li>);
            }
            return elements;
          })().map((e) => e)
        }
        {hasMore && (
          <div ref={elementRef} className="text-center">
            <LoadingSVG />
          </div>
        )}
      </div>
    </div>
  );
}
