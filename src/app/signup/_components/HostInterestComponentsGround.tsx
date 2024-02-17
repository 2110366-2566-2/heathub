"use client";

import { api } from "@/trpc/react";
import { redirect, useRouter } from "next/navigation";
import { uploadFiles } from "@/components/ui/upload";
import SuccessButton from "@/app/signup/_components/SuccessButton";
import { useEffect, useState } from "react";
import { type Host, type User } from "../interfaces";
import InterestPickerBox from "./InterestPickerBox";

interface ComponentGroundProps {
  data: User;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  const { data } = props;
  const [isModalPop, setModalPop] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>("");
  const router = useRouter();
  const [selectedInterestList, setSelectedInterestList] = useState<string[]>(
    [],
  );

  const signUpHost = api.auth.signupHost.useMutation();

  const { data: userData } = api.auth.me.useQuery();

  useEffect(() => {
    if (userData) {
      redirect("/");
    }
  }, [userData]);

  const handleSubmit = async (host: Host) => {
    selectedInterestList.sort();
    if (!host.Image) {
      setNotice("Please upload a profile picture.");
      return;
    }

    const files = [host.Image];
    const res = await uploadFiles("signupProfileUploader", {
      files,
    });
    if (res.length !== 1) {
      setNotice("An error occurred");
      return;
    }
    const imageUrl = res[0]?.url ? res[0].url : "";

    try {
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
        imageUrl: imageUrl,
      });
      console.log(imageUrl);
      setModalPop(true);
    } catch (error) {
      if (error instanceof Error) {
        setNotice(error.message);
        console.error("An error occurred", error.message);
      } else {
        setNotice("An error occurred");
        console.error("An error occurred", error);
      }
    }
  };

  const handleButtonClick = async () => {
    await handleSubmit(data as Host);
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="h1 text-primary-900">Interests</div>
      <InterestPickerBox
        selectedInterestList={selectedInterestList}
        setSelectedInterestList={setSelectedInterestList}
      />
      <div className="absolute bottom-6 sm:static">
        <SuccessButton
          router={router}
          isModalPop={isModalPop}
          setModalPop={setModalPop}
          handleClick={handleButtonClick}
        />
      </div>
      <div className="text-red-500">{notice}</div>
    </div>
  );
}
