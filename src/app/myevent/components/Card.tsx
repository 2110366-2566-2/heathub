"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StatusTag } from "./StatusTag";

type EventProps = {
  name: string;
  location: string;
  date: Date;
  status?: EventStatus;
  image: string;
  detail?: string;
};

export enum EventStatus {
  STARTED = "Event Started",
  NOTSTARTED = "Not Started",
  WAITINGREVIEW = "Waiting for Review",
  COMPLETED = "Completed",
}

export function Card(prop: EventProps) {
  const CardButton = () => {
    switch (prop.status) {
      case EventStatus.STARTED:
        return (
          <Button
            variant="default"
            className="z-[100 !w-full bg-primary-500 text-white"
          >
            Finish Event
          </Button>
        );
      case EventStatus.NOTSTARTED:
        return (
          <Button
            variant="default"
            className="z-100 !w-full bg-error-default text-white hover:bg-error-hover"
          >
            Cancel Event
          </Button>
        );
      case EventStatus.WAITINGREVIEW:
        return (
          <Button
            variant="default"
            className="z-50 !w-full bg-primary-500 text-white"
          >
            Give Review
          </Button>
        );
      case EventStatus.COMPLETED:
        return (
          <Button
            variant="default"
            className="z-50 !w-full bg-primary-500 text-white"
          >
            My Review
          </Button>
        );
      default:
        return (
          <Button
            variant="default"
            className="z-50 !w-full bg-primary-500 text-white"
          >
            Cancel Event
          </Button>
        );
    }
  };

  return (
    <div className="h-18 flex w-full  flex-col items-center gap-4 rounded-xl border border-primary-300 bg-white p-3 lg:flex-row">
      <EventDetail name ={prop.name} location={prop.location} date={prop.date} image={prop.image} status={prop.status} detail={prop.detail}>
        <div className="flew-row flex w-full gap-4">
          <div className=" relative h-14 w-14 overflow-hidden rounded-full">
            <Image
              src={prop.image}
              fill
              objectFit="cover"
              alt="logo"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex flex-row gap-1">
              <div className="flex w-full flex-row gap-2">
                <div className="flex flex-1 items-center gap-2">
                  <h4 className="h4 font-bold">{prop.name}</h4>
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
                <h6 className="h6 text-primary-900">{prop.location}</h6>
              </div>
              <div className="flex flex-row items-center gap-1">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="h-3 w-3 text-medium"
                />
                <h6 className="h6 font-normal text-medium">
                  {prop.date.toUTCString()}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </EventDetail>
      <div className="flex w-full flex-row items-center gap-1 lg:w-fit">
        <Dialog>
          <DialogTrigger className="w-full">
            <CardButton />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>This will be replaced with confirmation dialog from Q</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
              Go To Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
