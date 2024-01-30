"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import Card from "./card";

export function ProfilePreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card />
      </DialogTrigger>
      <DialogProfile />
    </Dialog>
  );
}

function DialogProfile() {
  return (
    <DialogContent className="hidden gap-2 bg-white p-0 md:flex md:min-h-[520px] md:min-w-[720px] lg:min-w-[845px]">
      <div className="relative w-full">
        <Image
          src="/images/feed/mock-profile/mock-1.jpg"
          alt="card"
          objectFit="cover"
          layout="fill"
          className="rounded-l-3xl"
        />
      </div>
      <div className="flex flex-col gap-2 rounded-r-3xl py-6 pr-6">
        <div className="flex flex-row gap-[10px] py-[10px]">
          <Typography variant="h3" className="text-3xl font-bold text-black">
            Rosy, 23
          </Typography>
        </div>
        <div className="flex flex-col gap-[10px]">
          <Typography variant="h4" className="text-medium">
            About
          </Typography>
          <Typography variant="h4">
            A good listener, I love having a good talk to know each other’s side
          </Typography>
        </div>
        <div className="flex flex-col gap-[10px] py-[10px]">
          <Typography variant="h4" className="text-medium">
            Interests
          </Typography>
          <div className="flex flex-row flex-wrap items-center justify-center gap-[10px] self-stretch">
            <MockTag />
            <MockTag />
            <MockTag />
            <MockTag />
            <MockTag />
            <MockTag />
            <MockTag />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

function MockTag() {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="flex h-[30px] w-[80px] flex-row items-center justify-center gap-1 rounded-lg border border-solid border-primary-500 bg-white bg-opacity-50 px-3">
        <FontAwesomeIcon icon={faMusic} className="h-3 w-3 text-primary-500" />
        <Typography variant="body6" className="text-primary-500">
          Music
        </Typography>
      </div>
    </div>
  );
}
