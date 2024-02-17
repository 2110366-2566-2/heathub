"use client";

import { type Host, type User } from "@/app/signup/interfaces";
import { Button } from "@/components/ui/button";
import {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import RegisterFormBox from "./HostRegisterFormBox";

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

  const [gender, setGender] = useState<string>((data as Host).Gender);
  const [notice, setNotice] = useState<string>("");

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
      setNotice("Please fill in your details.");
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

      <RegisterFormBox data={data} formRef={formRef} setGender={setGender} />
      <Button
        className="h-12 w-[108px] bg-primary-500 text-white"
        variant="default"
        onClick={() => {
          handleButtonClick();
        }}
      >
        Next
      </Button>
      <span className="h5 h-0 overflow-visible text-red-600" id="Notice">
        {notice}
      </span>
    </div>
  );
}
