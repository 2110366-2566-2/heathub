"use client";
import { Tag } from "@/app/_components/tag";
import {
  DialogProfile,
  DrawerProfile,
} from "@/app/discover/_components/profile-preview";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { tagStyle, type TagList } from "@/utils/icon-mapping";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import EditProfileButton from "./EditProfileButton";
import { type ProfilePreviewProps } from "./profile-container";

type ProfilePreviews = {
  aka: string;
  age: number;
  image: string;
  rating: number;
  reviews: number;
  bio: string;
  interests: TagList;
  id: string;
  verifiedStatus: "verified" | "unverified" | "pending" | "rejected" | null;
};

export default function ProfileDetails(props: ProfilePreviewProps) {
  const {
    image,
    interests,
    name,
    gender,
    about,
    dateOfBirth,
    id,
    role,
    age,
    rating,
    reviews,
    verifiedStatus,
  } = props;
  const genderName = gender == "NotToSay" ? "Prefer not to say" : gender;
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const nPop: ProfilePreviews = {
    aka: name,
    age: age,
    image: image,
    rating: rating,
    reviews: reviews,
    bio: about,
    interests: interests,
    id: props.id,
    verifiedStatus: verifiedStatus,
  };
  const [snap, setSnap] = useState<string | number | null>("322px");

  return (
    <Card className="h-full w-full justify-center rounded-none border-none shadow-none lg:rounded-lg lg:bg-neutral-50 lg:p-5">
      <CardContent className="flex h-full w-full flex-col items-center gap-y-4 p-0 lg:gap-0">
        <div className="h-max-[128px] flex h-fit w-full flex-row gap-x-6 lg:h-[124px]">
          <div className="flex h-full w-full flex-row gap-4">
            <div className="relative h-[100px] w-[100px] flex-none rounded-full">
              <Image
                className="h-full items-center justify-center rounded-full"
                src={image}
                width={100}
                height={100}
                alt="profilePic"
              />
              {isMobile ? (
                <Drawer
                  snapPoints={["322px", "500px"]}
                  activeSnapPoint={snap}
                  setActiveSnapPoint={setSnap}
                  fadeFromIndex={
                    snap === "322px" ? 0 : snap === "500px" ? 1 : undefined
                  }
                >
                  <DrawerTrigger onClick={() => setSnap("322px")}>
                    {props.reviews != -1 && (
                      <div className="z-100 absolute bottom-0 right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-neutral-500 bg-neutral-50 p-1 text-neutral-500">
                        <FontAwesomeIcon icon={faEye} />
                      </div>
                    )}
                  </DrawerTrigger>

                  <DrawerProfile props={nPop} role={role} />
                </Drawer>
              ) : (
                <Dialog>
                  <DialogTrigger>
                    {props.reviews != -1 && (
                      <div className="z-100 absolute bottom-0 right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-neutral-500 bg-neutral-50 p-1 text-neutral-500">
                        <FontAwesomeIcon icon={faEye} />
                      </div>
                    )}
                  </DialogTrigger>
                  <DialogProfile props={nPop} role={role} />
                </Dialog>
              )}
            </div>

            <div className="flex h-fit w-full flex-col gap-y-2">
              <div className="h3 font-bold text-high">{`${props.name}, ${props.age}`}</div>
              <div className="flex h-fit w-full flex-col gap-y-1">
                <div className="h5 flex h-6 flex-row items-center gap-x-1 text-medium">
                  <div className="flex h-[18px] flex-row items-center gap-x-2">
                    <div>{props.firstName}</div>
                    <div>{props.lastName}</div>
                  </div>
                  <div>•</div>
                  <div className="flex h-[18px] flex-row items-center gap-x-2">
                    <div>{genderName}</div>
                  </div>
                </div>
                <div className="h5 line-clamp-3 w-full text-wrap text-placeholder md:line-clamp-2">
                  {props.about}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden h-full w-fit lg:flex">
            <EditProfileButton
              cUsername={name}
              cGender={gender}
              cBio={about}
              cDOB={dateOfBirth}
              cProfileURL={image}
              id={id}
            />
          </div>
        </div>
        {props.reviews != -1 && (
          <div className="flex h-fit min-h-[94px] w-full flex-col gap-y-3">
            <div className="h6 lg:h5 font-bold text-medium lg:font-normal">
              Interest
            </div>
            <div className="flex h-fit w-full flex-row flex-wrap gap-2">
              {interests.map((tag, index) => (
                <Tag
                  key={index}
                  variant="solid"
                  icon={tagStyle[tag].icon}
                  size="md"
                  color={tagStyle[tag].color}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        )}
        <div className="flex h-10 w-full lg:hidden">
          <EditProfileButton
            cUsername={props.name}
            cGender={props.gender}
            cBio={props.about}
            cDOB={props.dateOfBirth}
            cProfileURL={props.image}
            id={id}
          />
        </div>
      </CardContent>
    </Card>
  );
}
