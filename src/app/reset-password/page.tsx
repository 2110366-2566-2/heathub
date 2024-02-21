"use client";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ForgetPassword() {
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
    let email = (e.currentTarget.email?.value as string) ?? "";
    if (!email) {
      setStatus("idle");
      return;
    }
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

  return status === "done" ? (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="font-bold">Check your email</h1>
      </div>
    </main>
  ) : (
    <main className="flex min-h-screen flex-col gap-2 bg-subtle p-14">
      <Link href="/">
        <button className="flex h-6 w-6 flex-row items-center justify-center">
          <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4 text-high" />
        </button>
      </Link>
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded-4xl flex h-[493px] w-[846px] items-center justify-center border border-solid border-primary-500 bg-neutral-0">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="font-bold">
              Forget your password? {url?.origin ?? ""}
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-black"
            >
              <Input
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
        </div>
      </div>
    </main>
  );
}
