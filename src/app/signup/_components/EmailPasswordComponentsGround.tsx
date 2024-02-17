"use client";

import {
  isHost,
  type Host,
  type Participant,
  type User,
} from "@/app/signup/interfaces";
import { Button } from "@/components/ui/button";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import EmailPasswordBox from "./EmailPasswordBox";

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

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (!formRef.current || !isValid) {
      return;
    }

    const formData = new FormData(formRef.current);
    const password = formData.get("Password") as string | null;
    const email = formData.get("Email") as string | null;

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
        Image: null,
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
        Image: null,
      };
      setData(participant);
      setPage("ParticipantDetails");
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="h1 font-bold text-primary-900">Create your account</div>
      <EmailPasswordBox data={data} setValid={setIsValid} formRef={formRef} />
      <Button
        className="absolute bottom-6 h-12 w-[108px] bg-primary-500 text-white sm:static"
        variant="outline"
        onClick={handleButtonClick}
      >
        Next
      </Button>
    </div>
  );
}
