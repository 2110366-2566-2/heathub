"use client";

import { useEffect, useState } from "react";

import { CHAT_MESSAGE_EVENT } from "@/constants/pusher-events";
import { api } from "@/trpc/react";
import { type ChatMessage } from "@/types/pusher";
import { type Channel } from "pusher-js";
import { usePusher } from "../_context/PusherContext";

export function CrudShowcase({ withUser }: { withUser: string }) {
  "use client";
  const [posts, setPosts] = useState<ChatMessage[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [queryCursor, setQueryCursor] = useState<number | null>(null);

  const { data: user } = api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) return;
      chatChannel = pusher.subscribe(`private-user-${data.userId}`);
      chatChannel.bind(CHAT_MESSAGE_EVENT, (data: ChatMessage) => {
        console.log(data);
        if (data.sender.id !== withUser && data.receiver.id !== withUser)
          return;
        setPosts((prev) => {
          if (prev.some((x) => x.id === data.id)) {
            return prev;
          }
          return [data, ...prev];
        });
      });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  let chatChannel: Channel | null = null;

  api.chat.infiniteChat.useQuery(
    {
      pairUserID: withUser,
      cursor: queryCursor,
      limit: 3,
    },
    {
      onSuccess: (data) => {
        setPosts((prev) => [...prev, ...data.messages]);
        setCursor(data.nextCursor);
      },

      refetchOnWindowFocus: false,
    },
  );

  const pusher = usePusher();

  useEffect(() => {
    return () => {
      chatChannel?.unbind(CHAT_MESSAGE_EVENT);
    };
  }, [chatChannel]);

  return (
    <div className="w-full max-w-xs">
      {posts ? (
        posts.map((message) => (
          <div key={message.id} className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold">{message.content}</h3>
            <p className="text-lg">{message.sender.aka}</p>
          </div>
        ))
      ) : (
        <p>You have no posts yet.</p>
      )}

      {user && <CreatePost toUserID={withUser} />}
    </div>
  );
}

export function CreatePost(props: { toUserID: string }) {
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
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
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
