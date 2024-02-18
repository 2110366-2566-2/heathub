"use client";

import { useEffect, useRef, useState } from "react";
import { type Participant, type User } from "../interfaces";
import RegisterFormBox from "./ParticipantRegisterFormBox";

import { api } from "@/trpc/react";
import { redirect, useRouter } from "next/navigation";
import SuccessButton from "./SuccessButton";
import { uploadFiles } from "@/components/ui/upload";

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
      aka: participant.Username,
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
    const usernameInput = formData.get("Username") as string | null;
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
    }
    if (!imageInput) {
      setNotice("Please upload a profile picture.");
      return;
    }

    const participant: Participant = {
      Firstname: firstnameInput,
      Lastname: lastnameInput,
      Username: usernameInput,
      DOB: new Date(DOBInput),
      Gender: gender,
      Email: data.Email,
      Password: data.Password,
      Image: imageInput ? imageInput : null,
    };
    setData(participant);

    if (!participant.Image) {
      setNotice("Please upload a profile picture.");
      return;
    }

    const files = [participant.Image];
    const res = await uploadFiles("signupProfileUploader", {
      files,
    });
    if (res.length !== 1) {
      setNotice("An error occurred");
      return;
    }
    const imageUrl = res[0]?.url ? res[0].url : "";
    try {
      await signUpPaticipate.mutateAsync({
        email: participant.Email,
        password: participant.Password,
        aka: participant.AKA,
        firstName: participant.Firstname,
        lastName: participant.Lastname,
        gender: participant.Gender,
        bio: "",
        dateOfBirth: participant.DOB,
        imageUrl: imageUrl,
      });
      setModalPop(true);
    } catch (error) {
      if (error instanceof Error) {
        setNotice(error.message);
      } else {
        setNotice("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6">
      <div className="h1 font-bold text-primary-900">
        Tell us about yourself
      </div>

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
