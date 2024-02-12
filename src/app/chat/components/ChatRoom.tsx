"use client";
import { useEffect, useState } from "react";

import { CHAT_MESSAGE_EVENT } from "@/constants/pusher-events";
import { api } from "@/trpc/react";
import { type ChatMessage } from "@/types/pusher";
import { type Channel } from "pusher-js";
import { usePusher } from "../../_context/PusherContext";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";

export function ChatRoom({ withUser }: { withUser: string }) {
  "use client";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [queryCursor, setQueryCursor] = useState<number | null>(null);

  const pusher = usePusher();
  let chatChannel: Channel | null = null;

  const { data: user } = api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) return;
      chatChannel = pusher.subscribe(`private-user-${data.userId}`);
      chatChannel.bind(CHAT_MESSAGE_EVENT, (message: ChatMessage) => {
        console.log(message)
        setQueryCursor(null); // Reset cursor to fetch latest messages
      });
    },
    refetchOnWindowFocus: false,
  });

  api.chat.infiniteChat.useQuery(
    {
      pairUserID: withUser,
      cursor: queryCursor,
      limit: 20,
    },
    {
      onSuccess: (data) => {
        setMessages((prev) => [...prev, ...data.messages]);
      },

      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    return () => {
      chatChannel?.unbind(CHAT_MESSAGE_EVENT);
    };
  }, [chatChannel]);

  const reversePost = [...messages].reverse();
  return (
    <>
      <div className="w-full px-14 relative overflow-scroll h-[calc(100vh-128px)] ">
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
      </div>
      {user && <ChatMessageBox toUserID={withUser} />}
    </>
  );
}

export function ChatMessageBox(props: { toUserID: string }) {
  const { toUserID: userID } = props;
  const [name, setName] = useState("");
  const createPost = api.chat.sendMessage.useMutation({
    onSuccess: () => {
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({
          content: name,
          toUserID: userID,
        })
      }}
      className="flex flex-row gap-2 bottom-0 w-full bg-white z-10 p-4 items-center"
    >
      <input
        type="text"
        placeholder="Write your message"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg px-4 py-2 text-black bg-neutral-50"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
