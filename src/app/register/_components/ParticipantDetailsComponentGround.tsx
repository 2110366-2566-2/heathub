"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import RegisterFormBox from "./ParticipantRegisterFormBox";
import { type User, type Participant } from "../interfaces";

interface ComponentGroundProps {
  setData: (data: User) => void;
  setPage: (page: string) => void;
  data: User;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  const [gender, setGender] = useState<string>();

  const handleButtonClick = () => {
    const firstnameInput = document.getElementById("Firstname");
    const lastnameInput = document.getElementById("Lastname");
    const AKAInput = document.getElementById("AKA");
    const DOBInput = document.getElementById("Date of Birth");
    if (
      !firstnameInput ||
      !lastnameInput ||
      !AKAInput ||
      !gender ||
      (firstnameInput as HTMLInputElement).value == "" ||
      (lastnameInput as HTMLInputElement).value == "" ||
      (AKAInput as HTMLInputElement).value == "" ||
      gender == "custom" ||
      gender == ""
    ) {
      (document.getElementById("Notice") as HTMLInputElement).innerHTML =
        "Please fill in your details.";
      return;
    }
    const participant: Participant = {
      Firstname: (firstnameInput as HTMLInputElement).value,
      Lastname: (lastnameInput as HTMLInputElement).value,
      AKA: (AKAInput as HTMLInputElement).value,
      DOB: (DOBInput as HTMLInputElement).value,
      Gender: gender,
      Email: props.data.Email,
      Password: props.data.Password,
    };
    props.setData(participant);
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6">
      <div className="md:h1-bold h2-bold text-primary-900">
        Tell us about yourself
      </div>
      <div className="flex h-[845px] w-full flex-col justify-center md:h-[496px]">
        <RegisterFormBox setGender={setGender} />
        <span
          className="h5 ml-5 h-0 overflow-visible text-red-600"
          id="Notice"
        ></span>
      </div>
      <Button
        className="h-12 w-[167px] bg-primary-500 text-white"
        variant="outline"
        onClick={() => {
          handleButtonClick();
        }}
      >
        Create Account
      </Button>
    </div>
  );
}
