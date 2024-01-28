"use client";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "../../action/auth";

export default function SignIn() {
  const { data: user } = api.auth.me.useQuery();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  const signInHandler = async (e: FormData) => {
    setLoading(true);
    const err = await signIn(e);
    if (!err) {
      redirect("/");
    }
    setError(err);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="font-bold">Sign in</h1>

        <form action={signInHandler} className="flex flex-col gap-4 text-black">
          <input
            className="rounded-md p-2"
            type="text"
            name="email"
            placeholder="email"
          />
          <input
            className="rounded-md p-2"
            type="password"
            name="password"
            placeholder="password"
          />

          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="rounded-md bg-violet-500 p-4 text-white"
            disabled={loading}
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
