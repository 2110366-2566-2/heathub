"use client";

import { type Dispatch, type SetStateAction, useState, useRef } from "react";
import EmailPasswordBox from "./EmailPasswordBox";
import { Button } from "@/components/ui/button";
import {
  type Host,
  type Participant,
  type User,
  isHost,
} from "@/app/register/interfaces";

interface ComponentGroundProps {
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
  data: User;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  const { setData, setPage, data } = props;

  const formRef = useRef<HTMLFormElement>(null);

  const [isPasswordMatch, setPasswordMatch] = useState<boolean>(false);
  const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
  const [isEmailValid, setEmailValid] = useState<boolean>(false);
  const [isEmailAlreadyReg, setEmailAlreadyReg] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (!isEmailValid) {
      (
        document.getElementById("Notice Message") as HTMLInputElement
      ).style.color = "red";
      (
        document.getElementById("Notice Message") as HTMLInputElement
      ).innerHTML = "Email invalid";
      console.log("invalid email");
    } else if (!isPasswordMatch) {
      console.log("password don't match");
    } else if (!isPasswordValid) {
      (
        document.getElementById("Notice Message") as HTMLInputElement
      ).style.color = "red";
      (
        document.getElementById("Notice Message") as HTMLInputElement
      ).innerHTML = "password invalid";
      console.log("invalid password");
    } else if (!isEmailAlreadyReg) {
      (
        document.getElementById("Notice Message") as HTMLInputElement
      ).style.color = "red";
      (
        document.getElementById("Notice Message") as HTMLInputElement
      ).innerHTML = "this email is already have an account";
      console.log("this email is already have an account");
    } else {
      if (!formRef.current) {
        return;
      }

      const formData = new FormData(formRef.current);
      const password = formData.get("Password") as string | null;
      const email = formData.get("Email") as string | null;
      console.log(`Email: ${email} \n Password: ${password}`);
      if (isHost(data)) {
        const host: Host = {
          Firstname: "",
          Lastname: "",
          AKA: "",
          Bio: "",
          DOB: new Date(),
          Gender: "",
          Email: email ? email : "",
          Password: password ? password : "",
          Interest: [],
        };
        setData(host);
        setPage("HostDetails");
      } else {
        const participant: Participant = {
          Firstname: "",
          Lastname: "",
          AKA: "",
          DOB: new Date(),
          Gender: "",
          Email: email ? email : "",
          Password: password ? password : "",
        };
        setData(participant);
        setPage("ParticipantDetails");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="h1 text-primary-900">Create your account</div>
      <EmailPasswordBox
        setPasswordMatch={setPasswordMatch}
        setPasswordValid={setPasswordValid}
        setEmailValid={setEmailValid}
        setEmailAlreadyReg={setEmailAlreadyReg}
        formRef={formRef}
      />
      <Button
        className="absolute bottom-6 h-12 w-[108px] bg-primary-500 text-white sm:static"
        variant="outline"
        onClick={() => {
          handleButtonClick();
        }}
      >
        Next
      </Button>
    </div>
  );
}
