"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChangePasswordButton from "./_component/ChangePasswordButton";

export default function ChangePassword() {
  const router = useRouter();

  const mutate = api.auth.changePassword.useMutation({});
  const submitHandler = async (e: FormData) => {
    const password = e.get("password") as string;
    const oldPassword = e.get("oldPassword") as string;
    const confirm_password = e.get("confirm_password") as string;
    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      await mutate.mutateAsync({
        oldPassword: oldPassword,
        newPassword: password,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`Error: ${e.message}`);
      } else {
        setError("Unknown error");
      }
    }
    router.push("/");
  };

  const [error, setError] = useState<string | null>(null);
  const [criticalError, _setCriticalError] = useState<string | null>(null);
  return criticalError ? (
    <h1 className="text-xl font-bold text-red-600">{criticalError}</h1>
  ) : (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="font-bold">Resetting Password</h1>

        <form action={submitHandler} className="flex flex-col gap-4 text-black">
          <input
            className="rounded-md p-2"
            type="password"
            name="oldPassword"
            placeholder="old password"
          />
          <input
            className="rounded-md p-2"
            type="password"
            name="password"
            placeholder="password"
          />
          <input
            className="rounded-md p-2"
            type="password"
            name="confirm_password"
            placeholder="confirm your password"
          />

          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="rounded-md bg-violet-500 p-4 text-white"
          >
            Sign In
          </button>
        </form>
        <ChangePasswordButton />
      </div>
    </main>
  );
}
