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

export function ChatRoom({ withUser }: { withUser: string }) {
  "use client";
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
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      onSuccess: (data)  => {
        const latestPage = data.pages.at(-1)?.messages;
        if (latestPage) {
        const lastMessage: ChatMessage = {
          id: -1,
          createdAt: new Date(),
          senderUserID: "",
          receiverUserID: "",
          contentType: "text",
          content: "",
          sender: {
            id: "",
            firstName: "",
            lastName: "",
            role: "host",
            profileImageURL: null,
            aka: ""
          },
          receiver: {
            id: "",
            firstName: "",
            lastName: "",
            role: "host",
            profileImageURL: null,
            aka: ""
          }
        }
          setMessages((prev: ChatMessage[]) => [...prev.filter((message) => message.id !== -1), lastMessage, ...latestPage]);}
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
        console.log("here");
        await fetchNextPage();
      }
    })().catch((e) => console.log(e));
  }, [entry, fetchNextPage, hasNextPage])

  useEffect(() => {
    if (messages.length)
    chatContainerRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const reversePost = [...messages].reverse();
  return (
    <>
      <div className="w-full px-14 max-lg:px-6 relative overflow-scroll h-full">
        {messages ? (
          <>
            {reversePost.map((message, i) => {
              let isMine = false;
              let isShowTop = false;
              let isShowBot = false;
              if (message.id === -1) return <div ref={ref} />
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
                (i === 0 || reversePost[i - 1]?.sender?.id !== message.sender.id)
              )
                isShowTop = true;
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
  const createPost = api.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({
          content: message,
          toUserID: userID,
        })
      }}
      className="flex flex-row gap-2 bottom-0 w-full bg-white z-10 px-14 max-lg:px-6 items-center justify-center mt-6 mb-14 max-lg:mb-6"
    >
      <input
        type="text"
        placeholder="Write your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-xl px-4 py-2 text-black bg-neutral-50 flex-1"
      />
      {message !== "" &&
        <button
        type="submit"
        className="rounded-full bg-primary-500 font-semibold transition w-10 h-10 flex items-center justify-center text-white hover:bg-primary-600"
        disabled={createPost.isLoading}
        >
        <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4"/>
      </button>
      }
    </form>
  );
}
