"use client";

import { useState } from "react";
import EmailPasswordBox from "./EmailPasswordBox";
import { Button } from "@/components/ui/button";
import {
  Host,
  Participant,
  User,
  createHost,
  isHost,
} from "@/app/register/interfaces";

interface ComponentGroundProps {
  setData: (data: User) => void;
  setPage: (page: string) => void;
  data: User;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  const [isPasswordMatch, setPasswordMatch] = useState<boolean>(false);
  const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
  const [isEmailValid, setEmailValid] = useState<boolean>(false);
  const [isEmailAlreadyReg, setEmailAlreadyReg] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (!isEmailValid) {
      (document.getElementById("message") as HTMLInputElement).style.color =
        "red";
      (document.getElementById("message") as HTMLInputElement).innerHTML =
        "Email invalid";
      console.log("invalid email");
    } else if (!isPasswordMatch) {
      console.log("password don't match");
    } else if (!isPasswordValid) {
      (document.getElementById("message") as HTMLInputElement).style.color =
        "red";
      (document.getElementById("message") as HTMLInputElement).innerHTML =
        "password invalid";
      console.log("invalid password");
    } else if (!isEmailAlreadyReg) {
      (document.getElementById("message") as HTMLInputElement).style.color =
        "red";
      (document.getElementById("message") as HTMLInputElement).innerHTML =
        "this email is already have an account";
      console.log("this email is already have an account");
    } else {
      const password = document.getElementById("Password") as HTMLInputElement;
      const email = document.getElementById("Email") as HTMLInputElement;
      console.log(`Email: ${email.value} \n Password: ${password.value}`);
      if (isHost(props.data)) {
        const host: Host = {
          Firstname: "",
          Lastname: "",
          AKA: "",
          Bio: "",
          DOB: "",
          Gender: "",
          Email: email.value,
          Password: password.value,
        };
        props.setData(host);
        props.setPage("HostDetails");
      } else {
        const participant: Participant = {
          Firstname: "",
          Lastname: "",
          AKA: "",
          DOB: "",
          Gender: "",
          Email: email.value,
          Password: password.value,
        };
        props.setData(participant);
        props.setPage("ParticipantDetails");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="sm:h1-bold h2-bold text-primary-900">
        Create your account
      </div>
      <EmailPasswordBox
        setPasswordMatch={setPasswordMatch}
        setPasswordValid={setPasswordValid}
        setEmailValid={setEmailValid}
        setEmailAlreadyReg={setEmailAlreadyReg}
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
