"use client";

import { api } from "@/trpc/react";
import { redirect } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import InterestPikerBox from "./InterestPickerBox";
import SuccessButton from "@/app/register/_components/SuccessButton";
import { isHost, type Host, type User } from "../interfaces";

interface ComponentGroundProps {
  setData: (data: User) => void;
  setPage: (page: string) => void;
  data: User;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  const signUpHost = api.auth.signupHost.useMutation();
  const { data, isSuccess } = api.auth.getAllUsers.useQuery();

  const { data: userData } = api.auth.me.useQuery();

  useEffect(() => {
    if (userData) {
      redirect("/");
    }
  }, [userData]);

  // const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (host: Host) => {
    // e.preventDefault();

    // if (!formRef.current) {
    //   return;
    // }

    // const formData = new FormData(formRef.current);
    // const err = checkDetail(formData);
    // if (!err) {
    //   redirect("/");
    // };
    await signUpHost.mutateAsync({
      email: host.Email,
      password: host.Password,
      username: host.AKA,
      firstName: host.Firstname,
      lastName: host.Lastname,
      gender: host.Gender,
      bio: host.Bio,
      dateOfBirth: new Date(),
      interests: [],
    });
  };

  const handleButtonClick = () => {
    const host: Host = props.data;
    void handleSubmit(host);
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="sm:h1-bold h2-bold text-primary-900">Interests</div>
      <InterestPikerBox />
      <div className="absolute bottom-6 sm:static">
        <SuccessButton handleClick={handleButtonClick} />
      </div>
    </div>
  );
}
