"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import RegisterFormBox from "./HostRegisterFormBox";
import { type Host, type User } from "@/app/register/interfaces";

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
    const BioInput = document.getElementById("Bio");
    const DOBInput = document.getElementById("Date of birth");
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
    (BioInput as HTMLInputElement).value = BioInput
      ? (BioInput as HTMLInputElement).value
      : "";
    const host: Host = {
      Firstname: (firstnameInput as HTMLInputElement).value,
      Lastname: (lastnameInput as HTMLInputElement).value,
      AKA: (AKAInput as HTMLInputElement).value,
      Bio: (BioInput as HTMLInputElement).value,
      DOB: (DOBInput as HTMLInputElement).value,
      Gender: gender,
      Email: props.data.Email,
      Password: props.data.Password,
    };
    props.setData(host);
    props.setPage("HostInterest");
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6">
      <div className="md:h1-bold h2-bold text-primary-900">
        Tell us about yourself
      </div>
      <div className="flex h-[963px] w-full flex-col justify-center md:h-[496px]">
        <RegisterFormBox setGender={setGender} />
        <span
          className="h5 ml-5 h-0 overflow-visible text-red-600"
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
