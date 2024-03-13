"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
<<<<<<< HEAD:src/app/myevent/components/EventDetail.tsx
import Image from "next/image";
import { StatusTag } from "./StatusTag";
import { type EventStatus } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
||||||| merged common ancestors:src/app/myevent/components/EventDetail.tsx

import Image from "next/image";
import { StatusTag } from "./StatusTag";
import { type EventStatus } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
=======
>>>>>>> f7efe98aeefd92d65e12f97a2f186b9599129674:src/app/myevent/_components/EventDetail.tsx
import {
  faCalendar,
  faCircleInfo,
  faComment,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../utils";
import { type EventStatus } from "./Card";
import { StatusTag } from "./StatusTag";

interface EventDetailProps {
  userID: string;
  name: string;
  location: string;
  date: Date;
  status: EventStatus;
  image: string;
  detail?: string;
  children: React.ReactNode;
}

export function EventDetail(props: EventDetailProps) {
  const { children } = props;

  console.log(props.status);
  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-1">{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center">
            <h3 className="h3 flex flex-1 font-extrabold text-high">
              Event Detail
            </h3>
            <div className="flex flex-row items-center gap-2">
              <h6 className="h6 font-normal text-medium">Status</h6>
              <StatusTag status={props.status} size="md" />
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-3">
          <div className="flex w-full flex-row items-center gap-3 rounded-md bg-neutral-100 p-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image
                src={props.image}
                unoptimized
                fill
                objectFit="cover"
                alt="logo"
              />
            </div>
            <h4 className="h4 flex-1 font-bold text-primary-800">
              {props.name}
            </h4>
            <Link
              href={"/chat/" + props.userID}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-400"
            >
              <FontAwesomeIcon
                icon={faComment}
                className="h-4 w-4 text-invert"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-3 rounded-md border border-neutral-200 p-3">
            <div className="flex flex-col justify-between gap-2">
              <div className="flex flex-1 flex-row gap-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="h-3 w-3 pt-1 text-primary-500"
                />
                <h6 className="h6 font-bold text-primary-900">
                  {props.location}
                </h6>
              </div>
              <div className="flex w-fit flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="h-3 w-3 text-medium"
                />
                <h6 className="h6 font-normal text-medium">
                  {formatDate(props.date)}
                </h6>
              </div>
            </div>
            {props.detail != undefined && (
              <div>
                <div className="flex flex-row items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="h-3 w-3 text-medium"
                  />
                  <h6 className="h6 font-normal text-medium">Detail</h6>
                </div>
                <h6>{props.detail}</h6>
              </div>
            )}
          </div>
        </DialogDescription>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-neutral-300 text-medium"
            >
              Back To Event
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
