"use client";

import { useEffect, useRef, useState } from "react";
import { type Participant, type User } from "../interfaces";
import RegisterFormBox from "./ParticipantRegisterFormBox";

import { api } from "@/trpc/react";
import { redirect, useRouter } from "next/navigation";
import SuccessButton from "./SuccessButton";

interface ComponentGroundProps {
  setData: (data: User) => void;
  data: User;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  const { setData, data } = props;
  const router = useRouter();
  const [isModalPop, setModalPop] = useState(false);
  const [gender, setGender] = useState<string>();
  const [notice, setNotice] = useState<string>("");

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

  const handleButtonClick = async () => {
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
      setNotice("Please fill in your details.");
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
    setData(participant);
    try {
      await handleSubmit(participant);
      setModalPop(true);
    } catch (error) {
      if (error instanceof Error) {
        setNotice(error.message);
      } else {
        setNotice("Something went wrong. Please try again.");
      }
      setModalPop(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6">
      <div className="h1 text-primary-900">Tell us about yourself</div>

      <RegisterFormBox formRef={formRef} setGender={setGender} />
      <SuccessButton
        router={router}
        setModalPop={setModalPop}
        isModalPop={isModalPop}
        handleClick={handleButtonClick}
      />
      <span className="h5 h-0 overflow-visible text-red-600" id="Notice">
        {notice}
      </span>
    </div>
  );
}