"use client";
import { useEffect, useState, useRef } from "react";

import { CHAT_MESSAGE_EVENT } from "@/constants/pusher-events";
import { api } from "@/trpc/react";
import { type ChatMessage } from "@/types/pusher";
import { type Channel } from "pusher-js";
import { usePusher } from "../../_context/PusherContext";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useIntersection } from "@mantine/hooks";
import LoadingSVG from "./LoadingSVG";

export function ChatRoom({ withUser }: { withUser: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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
      chatChannel.bind(CHAT_MESSAGE_EVENT, (data: ChatMessage) => {
        if (data.sender.id !== withUser && data.receiver.id !== withUser)
          return;
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
        const latestPage = data.pages.at(-1)?.messages;
        if (latestPage) {
          setMessages((prev: ChatMessage[]) => [...prev, ...latestPage]);
        }
      },

      refetchOnWindowFocus: false,
    },
  );

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
      if (messages[0]?.senderUserID === user?.userId) {
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
        className="relative h-full w-full overflow-y-scroll px-14 max-lg:px-6"
        ref={containerRef}
      >
        {messages ? (
          <>
            {reversePost.map((message, i) => {
              let isMine = false;
              let isShowTop = false;
              let isShowBot = false;
              if (message.sender.id === user?.userId) {
                isMine = true;
              }
              if (
                i === messages.length - 1 ||
                reversePost[i + 1]?.sender?.id !== message.sender.id
              )
                isShowBot = true;
              if (
                !isMine &&
                (i === 0 ||
                  reversePost[i - 1]?.sender?.id !== message.sender.id)
              )
                isShowTop = true;
              if (i === 5)
                return (
                  <>
                    <div ref={ref} key={message.id} />
                    <ChatMessageComponent
                      key={message.id}
                      senderName={message.sender.firstName}
                      isShowBot={isShowBot}
                      isMine={isMine}
                      isShowTop={isShowTop}
                      message={message.content}
                      createdAt={message.createdAt.toString()}
                      imageUrl={message.sender.profileImageURL}
                    />
                  </>
                );
              return (
                <ChatMessageComponent
                  key={message.id}
                  senderName={message.sender.firstName}
                  isShowBot={isShowBot}
                  isMine={isMine}
                  isShowTop={isShowTop}
                  message={message.content}
                  createdAt={message.createdAt.toString()}
                  imageUrl={message.sender.profileImageURL}
                />
              );
            })}
          </>
        ) : (
          <p>You have no posts yet.</p>
        )}
        <div ref={chatContainerRef} />
      </div>
      {user && <ChatMessageBox toUserID={withUser} />}
    </>
  );
}

export function ChatMessageBox(props: { toUserID: string }) {
  const { toUserID: userID } = props;
  const [message, setMessage] = useState("");
  const sendMessage = api.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage.mutate({
          content: message,
          toUserID: userID,
        });
      }}
      className="bottom-0 z-10 mb-14 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-white px-14 max-lg:mb-6 max-lg:px-6"
    >
      <input
        type="text"
        placeholder="Write your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full flex-1 rounded-xl bg-neutral-50 px-4 py-2 text-black"
      />
      {message !== "" && (
        <button
          type="submit"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 font-semibold text-white transition hover:bg-primary-600"
          disabled={sendMessage.isLoading}
        >
          {!sendMessage.isLoading ? (
            <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
          ) : (
            <LoadingSVG />
          )}
        </button>
      )}
    </form>
  );
}
