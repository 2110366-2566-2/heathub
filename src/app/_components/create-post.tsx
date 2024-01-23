"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function CrudShowcase() {
  "use client";
  const { data: latestPost, isSuccess } = api.post.getLatest.useQuery();

  return (
    <div className="w-full max-w-xs">
      {isSuccess && latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}

export function CreatePost() {
  const [name, setName] = useState("");
  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      utils.post.getLatest.invalidate().catch(console.error);
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
