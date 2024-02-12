"use client";

import { useState } from "react";
import EmailPasswordBox from "../../../_components/EmailPasswordBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Host, Participant, createHost, isHost } from "@/app/register/interfaces";}

interface ComponentGroundProps {
  setData: (data: object) => void;
  setPage: (page: string) => void;
  data: object;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  const [isPasswordMatch, setPasswordMatch] = useState<boolean>(false);
  const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
  const [isEmailValid, setEmailValid] = useState<boolean>(false);
  const [isEmailAlreadyReg, setEmailAlreadyReg] = useState<boolean>(false);

  const router = useRouter();
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

      // if (isHost(props.data))
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
