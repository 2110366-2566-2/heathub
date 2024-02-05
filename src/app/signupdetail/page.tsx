"use client";

import { detailCheck } from "@/action/auth";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignUp() { // Participant
  const { data, isSuccess } = api.auth.getAllUsers.useQuery();
  const [_,setError] = useState<string|null>(null)
  const { data: userData } = api.auth.me.useQuery();
  const checkAKA = api.auth.isExistAKA.useMutation();
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
    let err = await detailCheck(formData);
    if (!err) {
      const AKA = formData.get("username") as string
      const isAKAExist = await checkAKA.mutateAsync({ aka: AKA });
      if (!isAKAExist){
        // router.push("/signin")
        redirect("/signin")//cant redirect
      }else{
        err = "Already Exist AKA"
      }
    }
    setError(err)
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>Personal Detail</h1>

        {isSuccess ? (
          data.map((user) => <p key={user.id}>{user.aka}</p>)
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
            type="text"
            name="firstName"
            placeholder="first name"
          />
          <input
            className="rounded-md p-2"
            type="text"
            name="lastName"
            placeholder="last name"
          />
          <input
            className="rounded-md p-2"
            type="text"
            name="gender"
            placeholder="gender"
          />

          <input
            className="rounded-md p-2"
            type="text"
            name="bio"
            placeholder="bio"
          />
          <input
            className="rounded-md p-2"
            type="date"
            name="dateOfBirth"
            placeholder="date of birth"
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
