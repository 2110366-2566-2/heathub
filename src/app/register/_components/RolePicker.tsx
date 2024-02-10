"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RolePicker() {
  const router = useRouter();

  const clickHost = () => {
    router.push("host/createAccount");
  };
  const clickParticipant = () => {
    router.push("participant/createAccount");
  };
  return (
    <div className="flex h-[308px] w-[361px] flex-col justify-center gap-y-[34px]">
      <div className="h1-bold text-center text-primary-900">
        {"Choose \n Your Role"}
      </div>
      <div className="gap-y-4">
        <Button
          className="h-12 w-full bg-primary-500"
          onClick={() => {
            clickHost();
          }}
        ></Button>
        <Button
          className="h-12 w-full bg-secondary-200"
          onClick={() => {
            clickParticipant();
          }}
        ></Button>
      </div>
    </div>
  );
}
