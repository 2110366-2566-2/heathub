"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCheckCircle,
  faEllipsisVertical,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventDetail } from "./EventDetail";
import { EventModal } from "./EventModal";
import { StatusTag } from "./StatusTag";
import { formatDate } from "../utils";
import { useState } from "react";
import Link from "next/link";

export type EventProps = {
  id: number;
  userID: string;
  name: string;
  location: string;
  date: Date;
  status: EventStatus;
  image: string | null;
  detail?: string | null;
  isVerified?: boolean;
};

export enum EventStatus {
  STARTED = "Event Started",
  NOTSTARTED = "Not Started",
  WAITINGREVIEW = "Waiting for Review",
  COMPLETED = "Completed",
}

export function Card(prop: EventProps) {
  const [role, setRole] = useState("host");

  const CardButton = () => {
    switch (prop.status) {
      case EventStatus.STARTED:
        return (
          role == "participant" && (
            <Button
              variant="default"
              className="z-[100 !w-full bg-secondary-500 text-white hover:bg-secondary-600"
            >
              Finish Event
            </Button>
          )
        );
      case EventStatus.NOTSTARTED:
        return (
          <Button
            variant="default"
            className="z-100 !w-full border border-secondary-500 bg-white text-secondary-500 hover:bg-secondary-100"
          >
            Cancel Event
          </Button>
        );
      case EventStatus.WAITINGREVIEW:
        return (
          role == "participant" && (
            <Button
              variant="default"
              className="z-50 !w-full bg-secondary-500 text-white hover:bg-secondary-600"
            >
              Give Review
            </Button>
          )
        );
      case EventStatus.COMPLETED:
        return (
          <Button
            variant="default"
            className="z-50 !w-full bg-secondary-500 text-white hover:bg-secondary-600"
          >
            My Review
          </Button>
        );
      default:
        return (
          <Button
            variant="default"
            className="z-50 !w-full border border-secondary-500 bg-white text-secondary-500 hover:bg-secondary-100"
          >
            Cancel Event
          </Button>
        );
    }
  };

  return (
    <div className="h-18 flex w-full  flex-col items-center gap-4 rounded-xl bg-white p-3 hover:bg-neutral-50 lg:flex-row">
      <EventDetail
        userID={prop.userID}
        name={prop.name}
        location={prop.location}
        date={prop.date}
        image={prop.image ?? ""}
        status={prop.status}
        detail={prop.detail ?? ""}
      >
        <div className="flew-row flex w-full gap-4">
          <div className=" relative h-14 w-14 overflow-hidden rounded-full">
            <Image src={prop.image ?? ""} fill objectFit="cover" alt="logo" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row gap-1">
              <div className="flex w-full flex-row gap-2">
                <div className="flex flex-1 items-center gap-2">
                  <h4 className="h4 font-bold">{prop.name}</h4>
                  {prop.isVerified && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="h-4 w-4 text-secondary-500"
                    />
                  )}
                  <StatusTag status={prop.status} size="sm" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="h-4 w-4 text-medium lg:hidden"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-12 bg-white">
                    <DropdownMenuItem className="hover:bg-neutral-100">
                      Report Event
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-neutral-100">
                      Go To Chat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex flex-col gap-1 lg:flex-row lg:gap-4">
              <div className="flex flex-row items-center gap-1">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="h-3 w-3 text-primary-500"
                />
                <h6 className="h6 line-clamp-1 text-primary-900">
                  {prop.location}
                </h6>
              </div>
              <div className="flex w-fit flex-row items-center gap-1">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="h-3 w-3 text-medium"
                />
                <h6 className="h6 font-normal text-medium">
                  {formatDate(prop.date)}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </EventDetail>
      <div className="flex w-full flex-row items-center gap-1 lg:w-fit">
        <EventModal
          name={prop.name}
          status={prop.status}
          rating={4}
          review={
            "You did really great. I’m so happy to have a dinner with you"
          }
        >
          <CardButton />
        </EventModal>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="h-6 w-6 text-medium max-lg:hidden"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-12 bg-white">
            <DropdownMenuItem className="hover:bg-neutral-100">
              Report Event
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-neutral-100">
              <Link href={"/chat/" + prop.userID}>Go To Chat</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
