"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@/components/ui/typography";
import { ProfilePreviewProps } from "./profile-preview";
import Chat from "./chat";

function MockTag() {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="flex h-[30px] w-[80px] flex-row items-center justify-center gap-1 rounded-lg bg-white bg-opacity-50 px-3">
        <FontAwesomeIcon icon={faMusic} className="h-3 w-3 text-white" />
        <Typography variant="body6" className="text-white">
          Music
        </Typography>
      </div>
    </div>
  );
}

export default function Card(props: ProfilePreviewProps) {
  const { name, age, interests, image } = props;
  return (
    <div className="relative flex h-[464px] w-full flex-col gap-0 rounded-2xl shadow-md ">
      <div className="relative h-[388px]">
        <Image
          src={image}
          alt="card"
          objectFit="cover"
          layout="fill"
          className="rounded-t-2xl"
        />
        <div className="absolute bottom-0 flex flex-col gap-2 p-4">
          <div className="flex flex-row gap-1">
            <Typography variant="p" className="text-3xl font-bold text-white">
              {name},
            </Typography>
            <Typography variant="p" className="text-3xl text-white">
              {age}
            </Typography>
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

      <div className="absolute bottom-0 flex h-[76px] w-full items-center justify-center rounded-b-2xl bg-white">
        <Chat />
      </div>
    </div>
  );
}
