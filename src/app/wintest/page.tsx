"use client";

import { api } from "@/trpc/react";
import { useRef } from "react";

export default function TestWin() {
  //   const { data: userData } = api.auth.me.useQuery();
  const { data, isSuccess } = api.auth.getHostsByAge.useQuery({
    ageRange: [0, 99],
  });
  // const { data, isSuccess } = api.auth.getHostsByRating.useQuery({ rating: 0 });
  //   const { data, isSuccess } = api.auth.getHostsByInterest.useQuery({
  //     interests: ["swim"],
  //   });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async () => {
    // console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>Test</h1>

        {isSuccess ? (
          data.map((user) => <p key={user.aka}>{JSON.stringify(user)}</p>)
        ) : (
          <p>loading</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-black"
          ref={formRef}
        >
          <button
            type="submit"
            className="rounded-md bg-violet-500 p-4 text-white"
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
