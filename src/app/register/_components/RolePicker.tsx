"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RolePicker() {
  const router = useRouter();

  return (
    <div className="flex h-[308px] w-full min-w-[227px] max-w-[361px] flex-col justify-center gap-y-[34px]">
      <div className="h1-bold w-full max-w-64 self-center text-center text-primary-900">
        {"Choose \n Your Role"}
      </div>
      <div className="gap-y-4">
        <Button
          className="h-12 w-full rounded-xl bg-primary-500 px-2 py-4"
          onClick={() => {
            router.push("host/createAccount");
          }}
        >
          <div className="h4-regular text-primary-50">{"I'm a Host"}</div>
        </Button>
        <Button
          className="h-12 w-full rounded-xl bg-secondary-200 px-2 py-4"
          onClick={() => {
            router.push("participant/createAccount");
          }}
        >
          <div className="h4-regular text-primary-50">
            {"I'm a participant"}
          </div>
        </Button>
      </div>
      <div className="flex h-6 flex-row justify-center gap-x-2">
        <div className="h5-regular h-full text-primary-700">
          Already have an account
        </div>
        <div
          className="h-full text-secondary-400 hover:cursor-pointer hover:underline"
          onClick={() => {
            router.push("/signin");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}
