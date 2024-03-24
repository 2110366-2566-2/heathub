"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  faCalendar,
  faCheckCircle,
  faEllipsisVertical,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../utils";
import { CancelModal } from "./CancelModal";
import { EventDetail } from "./EventDetail";
import { FinishModal } from "./FinishModal";
import { GivereviewModal } from "./GivereviewModal";
import { StatusTag } from "./StatusTag";
import { ViewreviewModal } from "./ViewreviewModal";

export type EventProps = {
  id: number;
  userID: string;
  participantID: string;
  role: string;
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
  CANCELLED = "Cancelled",
}

export function Card(prop: EventProps) {
  const role = prop.role;
  const CardButton = () => {
    switch (prop.status) {
      case EventStatus.STARTED:
        return (
          role == "participant" && (
            <Button
              variant="default"
              className="z-100 !w-full bg-secondary-500 text-white hover:bg-secondary-600"
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

  const Modal = () => {
    switch (prop.status) {
      case EventStatus.STARTED:
        return (
          <FinishModal id={prop.id}>
            <CardButton />
          </FinishModal>
        );
      case EventStatus.NOTSTARTED:
        return (
          <CancelModal id={prop.id}>
            <CardButton />
          </CancelModal>
        );
      case EventStatus.WAITINGREVIEW:
        return (
          <GivereviewModal
            id={prop.id}
            name={prop.name}
            participantID={prop.participantID}
            hostID={prop.userID}
          >
            <CardButton />
          </GivereviewModal>
        );
      case EventStatus.COMPLETED:
        return (
          <ViewreviewModal
            id={prop.id}
            name={prop.name}
            rating={4}
            review={
              "You did really great. I’m so happy to have a dinner with you"
            }
          >
            <CardButton />
          </ViewreviewModal>
        );
      default:
        return (
          <CancelModal id={prop.id}>
            <CardButton />
          </CancelModal>
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
            <Image
              src={prop.image ?? ""}
              fill
              objectFit="cover"
              alt="logo"
              unoptimized
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row gap-1">
              <div className="flex w-full flex-row gap-2">
                <div className="flex flex-1 items-center gap-2">
                  <h4 className="h4 font-bold">{prop.name}</h4>
                  {prop.isVerified && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-secondary-500"
                      size="1x"
                    />
                  )}
                  <StatusTag status={prop.status} size="sm" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="text-medium lg:hidden"
                      size="1x"
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
                  className="text-primary-500"
                  size="1x"
                />
                <h6 className="h6 line-clamp-1 text-primary-900">
                  {prop.location}
                </h6>
              </div>
              <div className="flex w-fit flex-row items-center gap-1">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-medium"
                  size="1x"
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
        <Modal />
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
