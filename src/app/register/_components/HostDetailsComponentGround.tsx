"use client";

import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import RegisterFormBox from "./HostRegisterFormBox";
import { type Host, type User } from "@/app/register/interfaces";

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

  const [gender, setGender] = useState<string>();

  const formRef = useRef<HTMLFormElement>(null);

  const handleButtonClick = () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    const firstnameInput = formData.get("Firstname") as string | null;
    const lastnameInput = formData.get("Lastname") as string | null;
    const AKAInput = formData.get("AKA") as string | null;
    const BioInput = formData.get("Bio") as string | null;
    const DOBInput = formData.get("Date of birth") as string | null;
    if (
      !gender ||
      !firstnameInput ||
      !lastnameInput ||
      !AKAInput ||
      !DOBInput ||
      gender == "Custom" ||
      gender == ""
    ) {
      (document.getElementById("Notice") as HTMLInputElement).innerHTML =
        "Please fill in your details.";
      return;
    }

    const host: Host = {
      Firstname: firstnameInput,
      Lastname: lastnameInput,
      AKA: AKAInput,
      Bio: BioInput ? BioInput : "",
      DOB: new Date(DOBInput),
      Gender: gender,
      Email: data.Email,
      Password: data.Password,
      Interest: [],
    };
    setData(host);
    setPage("HostInterest");
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6">
      <div className="h1 text-primary-900">Tell us about yourself</div>
      <div className="flex h-[964px] w-full flex-col justify-center md:h-[496px]">
        <RegisterFormBox setGender={setGender} formRef={formRef} />
        <span
          className="h5 ml-5 h-0 w-full min-w-[256px] max-w-[600px] self-center overflow-visible text-red-600 md:max-w-[844px]"
          id="Notice"
        ></span>
      </div>
      <Button
        className="h-12 w-[108px] bg-primary-500 text-white"
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
