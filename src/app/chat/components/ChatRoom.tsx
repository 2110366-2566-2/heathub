"use client";
import { useEffect, useState, useRef } from "react";
import {
  CHAT_MESSAGE_EVENT,
  RECENT_MESSAGE_EVENT,
} from "@/constants/pusher-events";
import { api } from "@/trpc/react";
import { type RecentMessage } from "@/types/pusher";
import { type Channel } from "pusher-js";
import { usePusher } from "../../_context/PusherContext";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { useIntersection } from "@mantine/hooks";
import ChatEventForm from "./ChatEventCreateForm";
import ChatMessageBox from "./ChatMessageBox";
export function ChatRoom({ withUser }: { withUser: string }) {
  const [messages, setMessages] = useState<RecentMessage[]>([]);
  const [isOpenChatEvent, setOpenChatEvent] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const topChatRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: topChatRef.current,
    threshold: 1,
  });

  const pusher = usePusher();
  let chatChannel: Channel | null = null;

  const { data: user } = api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) return;
      chatChannel = pusher.subscribe(`private-user-${data.userId}`);
      chatChannel.bind(RECENT_MESSAGE_EVENT, (data: RecentMessage) => {
        if (data.discourserId !== withUser) return;
        setMessages((prev) => {
          if (prev.some((x) => x.id === data.id)) {
            return prev;
          }
          return [data, ...prev];
        });
      });
    },
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });

  const { hasNextPage, fetchNextPage } = api.chat.infiniteChat.useInfiniteQuery(
    {
      pairUserID: withUser,
      limit: 100,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      onSuccess: (data) => {
        const latestPage = data.pages.at(-1)?.convertedMessage;
        if (latestPage) {
          setMessages((prev: RecentMessage[]) => [...prev, ...latestPage]);
        }
      },

      refetchOnWindowFocus: true,
      cacheTime: 0,
    },
  );
  const setChatEvent = () => {
    setOpenChatEvent((prev) => !prev);
  };
  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [isOpenChatEvent]);

  useEffect(() => {
    return () => {
      chatChannel?.unbind(CHAT_MESSAGE_EVENT);
    };
  }, [chatChannel]);

  useEffect(() => {
    (async () => {
      if (entry?.isIntersecting && hasNextPage) {
        await fetchNextPage();
      }
    })().catch((e) => console.log(e));
  }, [entry, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (messages.length) {
      if (messages[0]?.myId === user?.userId) {
        chatContainerRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [messages, user]);

  const containerRef = useRef<HTMLDivElement>(null);

  const reversePost = [...messages].reverse();
  return (
    <>
      <div
        className="relative flex h-full w-full flex-col overflow-y-scroll px-14 max-lg:px-6"
        ref={containerRef}
      >
        {messages ? (
          <>
            {reversePost.map((message, i) => {
              let isMine = false;
              let isShowTop = false;
              let isShowBot = false;
              if (message.senderId === user?.userId) {
                isMine = true;
              }
              if (
                i === messages.length - 1 ||
                reversePost[i + 1]?.senderId !== message.senderId
              )
                isShowBot = true;
              if (
                !isMine &&
                (i === 0 || reversePost[i - 1]?.senderId !== message.senderId)
              )
                isShowTop = true;

              if (message.contentType === "event") return <div>event</div>;
              if (i === 5) {
                return (
                  <>
                    <div ref={ref} key={message.id + "hot-fix"} />
                    <ChatMessageComponent
                      key={message.id}
                      senderName={message.discourserAka}
                      isShowBot={isShowBot}
                      isMine={isMine}
                      isShowTop={isShowTop}
                      message={message.content}
                      createdAt={message.createdAt.toString()}
                      imageUrl={message.discourserImageURL}
                    />
                  </>
                );
              }
              return (
                <ChatMessageComponent
                  key={message.id}
                  senderName={message.discourserAka}
                  isShowBot={isShowBot}
                  isMine={isMine}
                  isShowTop={isShowTop}
                  message={message.content}
                  createdAt={message.createdAt.toString()}
                  imageUrl={message.discourserImageURL}
                />
              );
            })}
          </>
        ) : (
          <p>You have no posts yet.</p>
        )}
        <ChatEventForm isOpen={isOpenChatEvent} />
        <div ref={chatContainerRef} />
      </div>
      {user && (
        <ChatMessageBox toUserID={withUser} setOpenChatEvent={setChatEvent} />
      )}
    </>
  );
}
