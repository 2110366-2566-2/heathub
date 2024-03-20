"use client";

import { api } from "@/trpc/react";
import { redirect, useRouter } from "next/navigation";
import { uploadFiles } from "@/components/ui/upload";
import SuccessButton from "@/app/signup/_components/SuccessButton";
import { useEffect, useState } from "react";
import { type Host, type User } from "../interfaces";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import {
  tagList as allInterestList,
  tagStyle,
} from "../../../utils/icon-mapping";

interface ComponentGroundProps {
  setData: (data: User) => void;
  data: User;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  const { setData, data } = props;
  const [isModalPop, setModalPop] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>("");
  const router = useRouter();
  const [selectedInterestList, setSelectedInterestList] = useState<string[]>(
    (data as Host).Interest,
  );

  const signUpHost = api.auth.signupHost.useMutation();

  const { data: userData } = api.auth.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (userData) {
      redirect("/");
    }
  }, [userData]);

  const handleSubmit = async (host: Host) => {
    if (selectedInterestList.length < 3) {
      setNotice("Please select at least 3 Interests.");
      return;
    }
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
        username: host.Username,
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

  const autoSave = () => {
    const host: Host = {
      Bio: (data as Host).Bio,
      Interest: selectedInterestList,
      Email: data.Email,
      Password: data.Password,
      Firstname: data.Firstname,
      Lastname: data.Lastname,
      Username: data.Username,
      DOB: data.DOB,
      Image: data.Image,
      Gender: data.Gender,
    };
    setData(host);
  };
  console.log(selectedInterestList);
  useEffect(() => {
    autoSave();
  }, [selectedInterestList]);

  const handleSelectedInterestList = (handleItem: string) => {
    // add if don't have, remove is have
    const handledList = selectedInterestList;
    const index = handledList.indexOf(handleItem);
    if (index !== -1) {
      handledList.splice(index, 1);
    } else {
      handledList.push(handleItem);
    }
    setSelectedInterestList(handledList);
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="h1 font-bold text-primary-900">Interests</div>
      <Card className="w-full min-w-[256px] max-w-[848px] justify-center overflow-y-auto rounded-3xl border-solid border-primary-500 bg-white p-8">
        <CardContent className="flex w-full justify-center gap-x-4 gap-y-2">
          <ToggleGroup
            className="gap flex w-full flex-wrap gap-2"
            type="multiple"
          >
            {allInterestList.map((interestItem, index) => {
              const isSelected = selectedInterestList.includes(interestItem);
              return (
                <Toggle
                  defaultPressed={isSelected}
                  value={interestItem}
                  key={index}
                  variant="outline"
                  icon={tagStyle[interestItem].icon}
                  size="md"
                  onClick={(e) => {
                    handleSelectedInterestList(e.currentTarget.value);
                  }}
                >
                  {interestItem}
                </Toggle>
              );
            })}
          </ToggleGroup>
        </CardContent>
      </Card>
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
