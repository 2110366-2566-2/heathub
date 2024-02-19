"use client";

import { type Host, type User } from "@/app/signup/interfaces";
import { Button } from "@/components/ui/button";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import RegisterFormBox from "./HostRegisterFormBox";
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

  const [gender, setGender] = useState<string>(data.Gender);
  const [notice, setNotice] = useState<string>("");

  const testUsername = api.auth.isAKAAlreadyExist.useMutation();

  const isUsernameDup = async (username: string) => {
    return await testUsername.mutateAsync({
      aka: username,
    });
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleButtonClick = async () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    const firstnameInput = formData.get("Firstname") as string | null;
    const lastnameInput = formData.get("Lastname") as string | null;
    const usernameInput = formData.get("Username") as string | null;
    const bioInput = formData.get("Bio") as string | null;
    const DOBInput = formData.get("Date of birth") as string | null;
    const imageInput = formData.get("Image") as File | null;
    if (
      !gender ||
      !firstnameInput ||
      !lastnameInput ||
      !usernameInput ||
      !DOBInput ||
      gender == "Custom" ||
      gender == ""
    ) {
      setNotice("Please fill in your details.");
      return;
    } else {
      try {
        if (await isUsernameDup(usernameInput ? usernameInput : "")) {
          setNotice("This username is already exits.");
          return;
        }
      } catch (error) {
        if (error instanceof Error) {
          setNotice(error.message);
        } else {
          setNotice("Something went wrong. Please try again.");
        }
        return;
      }
    }

    const host: Host = {
      Firstname: firstnameInput,
      Lastname: lastnameInput,
      Username: usernameInput,
      Bio: bioInput ? bioInput : "",
      DOB: new Date(DOBInput),
      Gender: gender,
      Email: data.Email,
      Password: data.Password,
      Interest: [],
      Image: imageInput ? imageInput : null,
    };
    setData(host);
    setPage("HostInterest");
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6">
      <div className="h1 font-bold text-primary-900">
        Tell us about yourself
      </div>

      <RegisterFormBox data={data} formRef={formRef} setGender={setGender} />
      <Button
        className="h-12 w-[108px] bg-primary-500 text-white"
        variant="default"
        onClick={() => {
          void handleButtonClick();
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
