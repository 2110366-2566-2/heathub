"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction } from "react";
import { createHost, createParticipant, type User } from "../interfaces";

interface rolePickerProps {
  setData: (data: User) => void;
  setPage: Dispatch<
    SetStateAction<
      | "ChooseRole"
      | "EmailPassword"
      | "HostDetails"
      | "ParticipantDetails"
      | "HostInterest"
    >
  >;
}

export default function RolePicker(props: rolePickerProps) {
  const { setData, setPage } = props;
  const router = useRouter();

  return (
    <div className="flex h-[308px] w-full min-w-[228px] max-w-[360px] flex-col justify-center gap-y-9">
      <div className="h1 w-full max-w-64 self-center text-center font-bold text-primary-900">
        {"Choose \n Your Role"}
      </div>
      <div className="flex flex-col gap-y-4">
        <Button
          className="h-12 w-full rounded-xl px-2 py-4"
          onClick={() => {
            setPage("EmailPassword");
            setData(createHost());
          }}
        >
          <div className="h4-regular text-primary-50">{"I'm a Host"}</div>
        </Button>
        <Button
          className="h-12 w-full rounded-xl bg-secondary-200 px-2 py-4 hover:bg-secondary-300"
          onClick={() => {
            setPage("EmailPassword");
            setData(createParticipant());
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
