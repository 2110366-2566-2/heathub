"use client";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function SignIn() {
  const { data: user } = api.auth.me.useQuery();
  const [status, setStatus] = useState<"idle" | "loading" | "done">("loading");

  const [url, setUrl] = useState<URL | null>(null);

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    setUrl(new URL(window.location.href));
    setStatus("idle");
  }, []);

  const mutate = api.auth.resetPasswordByEmail.useMutation({});
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    if (!url) {
      setStatus("idle");
      return;
    }
    const email = e.currentTarget.email.value;
    console.log(email);
    try {
      await mutate.mutateAsync({
        email: email,
        url: url.origin,
      });
      setStatus("done");
    } catch (e) {
      setStatus("idle");
    }
  };

  return status === "done"  ? (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="font-bold">Check your email</h1>
      </div>
    </main>
  ) : (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="font-bold">Forget your password? {url?.origin ?? ""}</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-black"
        >
          <input
            className="rounded-md p-2"
            type="text"
            name="email"
            placeholder="email"
          />

          <button
            type="submit"
            className="rounded-md bg-violet-500 p-4 text-white disabled:opacity-50"
            disabled={status === "loading"}
          >
            Send request to reset password
          </button>
        </form>
      </div>
    </main>
  );
}
