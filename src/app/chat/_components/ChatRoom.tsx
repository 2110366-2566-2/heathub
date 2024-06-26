"use client";
import {
  CHAT_MESSAGE_EVENT,
  RECENT_MESSAGE_EVENT,
} from "@/constants/pusher-events";
import { generateAvatar } from "@/lib/avatar";
import { api } from "@/trpc/react";
import { type RecentMessage } from "@/types/pusher";
import { useIntersection } from "@mantine/hooks";
import { type Channel } from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { usePusher } from "../../_context/PusherContext";
import { type CreateFormInfo } from "./ChatEventCreateForm";
import ChatEventInfo from "./ChatEventInfo";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import ChatMessageBox from "./ChatMessageBox";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
    refetchOnWindowFocus: false,
  });

  const { hasNextPage, fetchNextPage } = api.chat.infiniteChat.useInfiniteQuery(
    {
      pairUserID: withUser,
      limit: 20,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      onSuccess: (data) => {
        const latestPage = data.pages.at(-1)?.convertedMessage;
        if (latestPage) {
          setMessages((prev: RecentMessage[]) => [...prev, ...latestPage]);
        }
      },
      onError: (error) => {
        console.log(error.message);
        router.push("/chat");
      },

      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

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
  const createEvent = api.event.createEvent.useMutation({
    onSuccess: () => {
      setOpenChatEvent(false);
    },
  });

  const updateEventStatus = (
    eventId: number,
    status: "payment-done" | "rejected" | "cancelled" | "cancelled-creation",
  ) => {
    const newMessages = [...messages];
    for (const message of newMessages) {
      if (
        message.contentType === "event" &&
        message.content.eventId === eventId
      ) {
        message.content.status = status;
        break;
      }
    }
    setMessages(newMessages);
  };

  const onEventConfirm = (eventData: CreateFormInfo) => {
    if (!user) return;
    createEvent.mutate({
      hostUserID: user?.userId,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      priceStang: eventData.price * 100,
      location: eventData.location,
      participantUserID: withUser,
      description: eventData.description ?? "",
    });
  };

  const reversePost = [...messages].reverse();
  return (
    <>
      {user && (
        <div
          className="relative flex h-full w-full flex-col overflow-y-scroll px-6"
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

                if (message.contentType === "event")
                  return (
                    <ChatEventInfo
                      key={message.id}
                      isMine={isMine}
                      location={message.content.location}
                      price={message.content.price}
                      startTime={message.content.startTime}
                      endTime={message.content.endTime}
                      status={message.content.status}
                      description={message.content.description}
                      role={user?.role}
                      eventID={message.content.eventId}
                      updateStatus={updateEventStatus}
                      imageUrl={message.discourserImageURL}
                      senderName={message.discourserAka}
                    />
                  );
                if (i === 5) {
                  return (
                    <div key={"hot"}>
                      <div ref={ref} key={"hot-fix" + i} />
                      <ChatMessageComponent
                        key={message.id}
                        senderName={message.discourserAka}
                        isShowBot={isShowBot}
                        isMine={isMine}
                        isShowTop={isShowTop}
                        message={message.content}
                        createdAt={message.createdAt.toString()}
                        imageUrl={
                          message.discourserImageURL ||
                          generateAvatar(message.discourserAka)
                        }
                      />
                    </div>
                  );
                } else {
                  return (
                    <ChatMessageComponent
                      key={message.id}
                      senderName={message.discourserAka}
                      isShowBot={isShowBot}
                      isMine={isMine}
                      isShowTop={isShowTop}
                      message={message.content}
                      createdAt={message.createdAt.toString()}
                      imageUrl={
                        message.discourserImageURL ||
                        generateAvatar(message.discourserAka)
                      }
                    />
                  );
                }
              })}
            </>
          ) : (
            <p>You have no messages yet.</p>
          )}
          <div ref={chatContainerRef} />
        </div>
      )}
      {user && (
        <ChatMessageBox
          onConfirm={onEventConfirm}
          isOpenChatEvent={isOpenChatEvent}
          toUserID={withUser}
          setOpenChatEvent={setOpenChatEvent}
          userRole={user.role}
        />
      )}
    </>
  );
}
