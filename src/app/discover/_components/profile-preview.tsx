"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/utils/tailwind-merge";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { tagIcon } from "../../../utils/icon-mapping";
import Card from "./card";
import { ChatDialog } from "./chat";
import { Tag } from "@/app/_components/tag";
import { type ProfilePreviewProps } from "../types";

export function ProfilePreview(props: ProfilePreviewProps) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="m-auto aspect-[0.76] min-h-[424px] max-w-[323px]">
          <Card {...props} />
        </DrawerTrigger>
        <DrawerOverlay
          className="bg-opacity-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${props.image})` }}
        />
        <DrawerProfile {...props} />
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="m-auto aspect-[0.76] min-h-[424px] max-w-[323px]">
        <Card {...props} />
      </DialogTrigger>
      <DialogProfile {...props} />
    </Dialog>
  );
}

function DialogProfile(props: ProfilePreviewProps) {
  const { image } = props;
  return (
    <DialogContent className="flex gap-6 bg-white p-0 md:min-h-[568px] md:min-w-[720px] lg:min-w-[845px]">
      <div className="relative w-[460px]">
        <Image
          src={image}
          alt="card"
          className="rounded-l-3xl object-cover object-top"
          fill
        />
      </div>
      <div className="flex min-w-[336px] flex-col gap-3 rounded-r-3xl py-6">
        <NameReview {...props} />
        <About props={props} />
        <Interests props={props} />
        <div className="absolute bottom-6 self-center">
          <ChatDialog />
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
          <About props={props} isDrawer />
          <Interests props={props} isDrawer />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <ChatDialog />
      </div>
    </DrawerContent>
  );
}

function NameReview(props: ProfilePreviewProps) {
  const { aka, age, rating, reviews } = props;
  return (
    <div className="flex flex-col justify-between py-3">
      <div className="flex flex-row gap-1">
        <div className="flex flex-row items-center gap-1">
          <FontAwesomeIcon
            icon={faStar}
            className="h-5 w-5 text-secondary-400"
          />
          <div className="h4 font-bold">{rating.toFixed(1)}</div>
        </div>
        <div className="h6 self-center font-bold text-medium">
          ({reviews} reviews)
        </div>
      </div>
      <div className="h2 font-bold">
        {aka}, {age}
      </div>
    </div>
  );
}

function About({
  props,
  isDrawer,
}: {
  props: ProfilePreviewProps;
  isDrawer?: boolean;
}) {
  const { bio } = props;
  const maxWidth = isDrawer ? "" : "max-w-[340px]";
  return (
    <div className={cn("flex flex-col gap-3 text-wrap break-words", maxWidth)}>
      <div className="h4 text-medium">About</div>
      <div className="h5 text-high">{bio}</div>
    </div>
  );
}

function Interests({
  props,
  isDrawer,
}: {
  props: ProfilePreviewProps;
  isDrawer?: boolean;
}) {
  const { interests } = props;
  const maxWidth = isDrawer ? "" : "max-w-[340px]";
  return (
    <div className={cn("flex flex-col gap-3 text-wrap break-words", maxWidth)}>
      <div className="h4 text-medium">Interests</div>
      <div className="flex flex-row flex-wrap items-center justify-start gap-2 self-stretch">
        {interests.sort().map((tag, index) => {
          return (
            <Tag key={index} variant="outline" icon={tagIcon[tag]} size="md">
              {tag}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
