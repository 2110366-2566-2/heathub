"use client";
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

import Image from "next/image";
import { StatusTag } from "./StatusTag";
import { type EventStatus } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleInfo,
  faComment,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

interface EventDetailProps {
  name: string;
  location: string;
  date: Date;
  status?: EventStatus;
  image: string;
  detail?: string;
  children: React.ReactNode;
}

export function EventDetail(props: EventDetailProps) {
  const { children } = props;

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
          <div className="flex w-full flex-row items-center gap-3 rounded-md border border-neutral-200 bg-neutral-100 p-2">
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image src={props.image} fill objectFit="cover" alt="logo" />
            </div>
            <h4 className="h4 flex-1 font-bold text-primary-800">Rosy</h4>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 bg-white">
              <FontAwesomeIcon
                icon={faComment}
                className="h-5 w-5 text-primary-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-md border border-neutral-200 p-2">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-1">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="h-3 w-3 text-primary-500"
                />
                <h6 className="h6 font-bold text-primary-900">
                  {props.location}
                </h6>
              </div>
              <div className="flex flex-row items-center gap-1">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="h-3 w-3 text-medium"
                />
                <h6 className="h6 font-normal text-medium">
                  {props.date.toUTCString()}
                </h6>
              </div>
            </div>
            {props.detail != undefined && (
              <div>
                <div className="flex flex-row items-center gap-1">
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
              className="border-primary-500 text-primary-500"
            >
              Back To Event
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
