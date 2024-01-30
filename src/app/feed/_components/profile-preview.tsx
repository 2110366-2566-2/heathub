"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faStar } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import Card from "./card";
import { useMediaQuery } from "react-responsive";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Chat from "./chat";

export type ProfilePreviewProps = {
  name: string;
  age: number;
  image: string;
  rating: number;
  reviews: number;
  about: string;
  interests: string[];
};

export function ProfilePreview(props: ProfilePreviewProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger>
          <Card {...props} />
        </DrawerTrigger>
        <DrawerOverlay
          className="bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${props.image})` }}
        />
        <DrawerProfile {...props} />
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Card {...props} />
      </DialogTrigger>
      <DialogProfile {...props} />
    </Dialog>
  );
}

function DialogProfile(props: ProfilePreviewProps) {
  const { image } = props;
  return (
    <DialogContent className="gap-3 bg-white p-0 md:flex md:min-h-[520px] md:min-w-[720px] lg:min-w-[845px]">
      <div className="relative w-full">
        <Image
          src={image}
          alt="card"
          objectFit="cover"
          layout="fill"
          className="rounded-l-3xl"
        />
      </div>
      <div className="flex flex-col gap-2 rounded-r-3xl py-6 pr-6">
        <NameReview {...props} />
        <div className="flex flex-col gap-[10px] py-[10px]">
          <About {...props} />
          <Interests {...props} />
        </div>
      </div>
    </DialogContent>
  );
}

function DrawerProfile(props: ProfilePreviewProps) {
  return (
    <DrawerContent className="flex flex-col gap-2 bg-white p-4">
      <div className="flex flex-col gap-2 rounded-r-3xl">
        <NameReview {...props} />
        <div className="flex flex-col gap-2 py-2">
          <About {...props} />
          <Interests {...props} />
        </div>
      </div>
      <div className=" flex w-full justify-center pt-2">
        <Chat />
      </div>
    </DrawerContent>
  );
}

function NameReview(props: ProfilePreviewProps) {
  const { name, age, rating, reviews } = props;
  return (
    <div className="flex flex-row justify-between py-[10px]">
      <Typography variant="h3" className="text-3xl font-bold text-black">
        {name}, {age}
      </Typography>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-end gap-[10px]">
          <FontAwesomeIcon
            icon={faStar}
            className="h-[26px] w-[26px] text-secondary-400"
          />
          <Typography variant="h3" className="self-end text-black">
            {rating.toFixed(1)}
          </Typography>
        </div>
        <Typography variant="h6" className="text-medium">
          ({reviews} reviews)
        </Typography>
      </div>
    </div>
  );
}

function About(props: ProfilePreviewProps) {
  const { about } = props;
  return (
    <div className="flex flex-col gap-[10px]">
      <Typography variant="h4" className="text-medium">
        About
      </Typography>
      <Typography variant="h4">{about}</Typography>
    </div>
  );
}

function Interests(props: ProfilePreviewProps) {
  const { interests } = props;
  return (
    <div className="flex flex-col gap-[10px]">
      <Typography variant="h4" className="text-medium">
        Interests
      </Typography>
      <div className="flex flex-row flex-wrap items-center justify-center gap-[10px] self-stretch">
        <MockTag />
        <MockTag />
        <MockTag />
        <MockTag />
        <MockTag />
      </div>
    </div>
  );
}
function MockTag() {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="flex h-[30px] w-[80px] flex-row items-center justify-center gap-1 rounded-3xl border border-solid border-primary-500 bg-white bg-opacity-50 px-3">
        <FontAwesomeIcon icon={faMusic} className="h-3 w-3 text-primary-500" />
        <Typography variant="body6" className="text-primary-500">
          Music
        </Typography>
      </div>
    </div>
  );
}
