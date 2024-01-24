"use client";

import { useEffect, useState } from "react";

import { api } from "@/trpc/react";
import { usePusher } from "../_context/PusherContext";

export function CrudShowcase() {
  "use client";
  const [posts, setPosts] = useState<NonNullable<typeof latestPost>>([]);

  const { data: latestPost, isSuccess } = api.post.getLatest.useQuery();

  const pusher = usePusher();

  useEffect(() => {
    if (isSuccess) {
      setPosts(latestPost);
    }
  }, [latestPost, isSuccess]);

  useEffect(() => {
    const postChannel = pusher.subscribe("global");

    postChannel.bind(
      "add_post",
      (data: NonNullable<typeof latestPost>[number]) => {
        setPosts((prev) => [data, ...prev]);
      },
    );
    return () => {
      postChannel.unbind("add_post");
      pusher.unsubscribe("global");
    };
  }, [pusher]);
  const removePost = api.post.removeAll.useMutation();

  const removeHandler = async () => {
    removePost.mutate();
    setPosts([]);
  };
  return (
    <div className="w-full max-w-xs">
      {isSuccess && latestPost ? (
        posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold">{post.name}</h3>
            <p className="text-lg">{post.postedBy.username}</p>
          </div>
        ))
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        onClick={removeHandler}
      >
        REMOVE ALL
      </button>
    </div>
  );
}

export function CreatePost() {
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
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
