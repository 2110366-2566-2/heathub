"use client";

import {
  isHost,
  type Host,
  type Participant,
  type User,
} from "@/app/signup/interfaces";
import { Button } from "@/components/ui/button";
import {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import EmailPasswordBox from "./EmailPasswordBox";
import { api } from "@/trpc/react";

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
  const [emailNotice, setEmailNotice] = useState<string>("");

  const testEmail = api.auth.isEmailAlreadyExist.useMutation();

  const isEmailDup = async (email: string) => {
    return await testEmail.mutateAsync({
      email: email,
    });
  };

  const handleButtonClick = async () => {
    if (!formRef.current || !isValid) {
      return;
    }

    const formData = new FormData(formRef.current);
    const password = formData.get("Password") as string | null;
    const email = formData.get("Email") as string | null;

    try {
      if (!(await isEmailDup(email ? email : ""))) {
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
      } else {
        setEmailNotice("This Email is already exits.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setEmailNotice(error.message);
      } else {
        setEmailNotice("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="h1 font-bold text-primary-900">Create your account</div>
      <EmailPasswordBox
        emailNotice={emailNotice}
        setEmailNotice={setEmailNotice}
        data={data}
        setValid={setIsValid}
        formRef={formRef}
      />
      <Button
        className="absolute bottom-6 h-12 w-[108px] bg-primary-500 text-white sm:static"
        variant="default"
        onClick={handleButtonClick}
      >
        Next
      </Button>
    </div>
  );
}
