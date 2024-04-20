"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, type Dispatch, type SetStateAction } from "react";
import { createHost, createParticipant, type User } from "../interfaces";
import SuccessButton from "./SuccessButton";

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

  // function delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  // const [isSuccessed, setSuccessed] = useState(false);
  // const [isPressed, setPressed] = useState(false);

  return (
    <div className="flex h-[308px] w-full min-w-[228px] max-w-[360px] flex-col gap-y-9 md:justify-center">
      <div className="h1 hidden w-full max-w-64 self-center text-center font-extrabold text-primary-900 md:flex">
        {"Choose \n Your Role"}
      </div>
      <div className="flex flex-col gap-y-4">
        <Button
          variant={"default"}
          className="w-full"
          size={"lg"}
          onClick={() => {
            setPage("EmailPassword");
            setData(createHost());
          }}
        >
          {"I'm a Host"}
        </Button>
        <Button
          size={"lg"}
          variant={"secondary"}
          className="w-full"
          onClick={() => {
            setPage("EmailPassword");
            setData(createParticipant());
          }}
        >
          {"I'm a Participant"}
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
      {/* <SuccessButton
        handleClick={async () => {
          setPressed(true);
          await delay(3000);
          setSuccessed(true);
        }}
        isSuccessed={isSuccessed}
        router={router}
        isPressed={isPressed}
      /> */}
    </div>
  );
}
