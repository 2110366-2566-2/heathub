"use client";

import { useEffect, useRef, useState } from "react";
import RegisterFormBox from "./ParticipantRegisterFormBox";
import { type User, type Participant } from "../interfaces";

import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import SuccessButton from "./SuccessButton";

interface ComponentGroundProps {
  setData: (data: User) => void;
  data: User;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  const { setData, data } = props;
  const [isModalPop, setModalPop] = useState(false);
  const [gender, setGender] = useState<string>();

  const signUpPaticipate = api.auth.signupPaticipate.useMutation();

  const { data: userData } = api.auth.me.useQuery();

  useEffect(() => {
    if (userData) {
      redirect("/");
    }
  }, [userData]);

  const handleSubmit = async (participant: Participant) => {
    await signUpPaticipate.mutateAsync({
      email: participant.Email,
      password: participant.Password,
      aka: participant.AKA,
      firstName: participant.Firstname,
      lastName: participant.Lastname,
      gender: participant.Gender,
      bio: "",
      dateOfBirth: participant.DOB,
    });
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleButtonClick = () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    const firstnameInput = formData.get("Firstname") as string | null;
    const lastnameInput = formData.get("Lastname") as string | null;
    const AKAInput = formData.get("AKA") as string | null;
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
      setModalPop(false);
      return;
    }
    const participant: Participant = {
      Firstname: firstnameInput,
      Lastname: lastnameInput,
      AKA: AKAInput,
      DOB: new Date(DOBInput),
      Gender: gender,
      Email: data.Email,
      Password: data.Password,
    };
    setModalPop(true);
    setData(participant);
    void handleSubmit(participant);
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6">
      <div className="h1 text-primary-900">Tell us about yourself</div>
      <div className="flex h-[844px] w-full flex-col justify-center md:h-[496px]">
        <RegisterFormBox formRef={formRef} setGender={setGender} />
        <span
          className="h5 ml-5 h-0 overflow-visible text-red-600"
          id="Notice"
        ></span>
      </div>
      <SuccessButton
        setModalPop={setModalPop}
        isModalPop={isModalPop}
        handleClick={handleButtonClick}
      />
    </div>
  );
}
