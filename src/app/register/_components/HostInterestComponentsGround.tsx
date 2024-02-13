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
  const [selectedInterestList, setSelectedInterestList] = useState<string[]>(
    [],
  );

  console.log(selectedInterestList);

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
    await signUpHost.mutateAsync({
      email: host.Email,
      password: host.Password,
      username: host.AKA,
      firstName: host.Firstname,
      lastName: host.Lastname,
      gender: host.Gender,
      bio: host.Bio,
      dateOfBirth: host.DOB,
      interests: selectedInterestList,
    });
  };

  const handleButtonClick = () => {
    void handleSubmit(props.data as Host);
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="h1 text-primary-900">Interests</div>
      <InterestPikerBox
        selectedInterestList={selectedInterestList}
        setSelectedInterestList={setSelectedInterestList}
      />
      <div className="absolute bottom-6 sm:static">
        <SuccessButton handleClick={handleButtonClick} />
      </div>
    </div>
  );
}
