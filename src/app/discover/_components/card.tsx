"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { ProfilePreviewProps } from "./profile-preview";
import Chat from "./chat";

function MockTag() {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="flex h-[30px] w-[80px] flex-row items-center justify-center gap-1 rounded-lg bg-white bg-opacity-50 px-3">
        <FontAwesomeIcon icon={faMusic} className="h-3 w-3 text-white" />
        <div className="body6 text-white">Music</div>
      </div>
    </div>
  );
}

export default function Card(props: ProfilePreviewProps) {
  const { name, age, interests, image } = props;
  return (
    <div className="relative flex h-[464px] w-full flex-col gap-0 rounded-3xl shadow-md ">
      <div className="relative h-[388px]">
        <Image
          src={image}
          alt="card"
          objectFit="cover"
          layout="fill"
          className="rounded-t-3xl"
        />
        <div className="absolute bottom-0 flex flex-col gap-2 p-4">
          <div className="flex flex-row gap-1">
            <div className="p text-3xl font-bold text-white">{name},</div>
            <div className="text-3xl text-white">{age}</div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <MockTag />
            <MockTag />
            <MockTag />
            <MockTag />
            <MockTag />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 flex h-[76px] w-full items-center justify-center rounded-b-3xl bg-white">
        <Chat />
      </div>
    </div>
  );
}
