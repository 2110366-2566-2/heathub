"use client";

import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Home() {
  const signUpUser = api.auth.signup.useMutation();
  const { data, isSuccess } = api.auth.getAllUsers.useQuery();

  const { data: userData } = api.auth.me.useQuery();

  useEffect(() => {
    if (userData) {
      redirect("/");
    }
  }, [userData]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    signUpUser.mutate({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      email: formData.get("email") as string,
      firstName: formData.get("firstname") as string,
      lastName: formData.get("lastname") as string,
      gender: formData.get("gender") as string,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>Sign up</h1>

        {isSuccess ? (
          data.map((user) => <p key={user}>{user}</p>)
        ) : (
          <p>loading</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-black"
          ref={formRef}
        >
          <input
            className="rounded-md p-2"
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            className="rounded-md p-2"
            type="password"
            name="password"
            placeholder="password"
          />
          <input
            className="rounded-md p-2"
            type="text"
            name="email"
            placeholder="email"
          />
          <input
            className="rounded-md p-2"
            type="text"
            name="firstname"
            placeholder="first name"
          />
          <input
            className="rounded-md p-2"
            type="text"
            name="lastname"
            placeholder="last name"
          />
          <input
            className="rounded-md p-2"
            type="text"
            name="gender"
            placeholder="gender"
          />
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
