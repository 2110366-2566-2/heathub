"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Dayjs } from "@/utils/dayjs";
import { cn } from "@/utils/tailwind-merge";
import ConfirmEventPayment from "./ConfirmEventPayment";
import EventTag from "./EventTag";
import { type EventDetailCardProps } from "./type";

export interface ChatEventInfoInterface {
  eventID: number;
  location: string;
  price: number;
  startTime: Date;
  endTime: Date;
  isMine: boolean;
  role: "host" | "participant" | "admin";
  status: EventDetailCardProps["status"];
  updateStatus: (
    eventId: number,
    status: "payment-done" | "rejected" | "cancelled",
  ) => void;
  imageUrl: string | null;
  senderName: string;
  description: string | null;
}

export default function ChatEventInfo(info: ChatEventInfoInterface) {
  const {
    isMine,
    status,
    price,
    startTime,
    endTime,
    role,
    eventID,
    updateStatus,
    imageUrl,
    senderName,
    description,
  } = info;
  const justifyPosition = isMine ? "justify-end" : "justify-start";

  const cancelEvent = api.event.cancelEvent.useMutation({
    onSuccess: () => {
      updateStatus(eventID, "cancelled");
    },
  });

  const rejectEvent = api.event.rejectEvent.useMutation({
    onSuccess: () => {
      updateStatus(eventID, "rejected");
    },
  });

  const confirmEvent = api.event.payEvent.useMutation({
    onSuccess: () => {
      updateStatus(eventID, "payment-done");
    },
  });

  return (
    <div className={cn("flex w-full flex-row", justifyPosition)}>
      <div className="mr-2 h-fit w-[52px]">
        <Avatar
          className={cn("h-[52px] w-[52px]", isMine ? "hidden" : "block")}
        >
          {imageUrl && <AvatarImage src={imageUrl} />}
          <AvatarFallback>{senderName}</AvatarFallback>
        </Avatar>
      </div>
      <div className="border-gray sha mb-2 flex h-fit w-full max-w-[460px] flex-col gap-6 rounded-md border-[1px] bg-white p-6">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-row justify-between">
            <div className="h3 flex-1 font-bold text-primary-800">
              Event Details
            </div>
            <EventTag type={status} />
          </div>
          <div className="text-mediumesdium text-sm">
            Please check the details before confirming the event
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <div className="h6  flex-1 text-medium">Location</div>
            <div className="h6 font-high text-bold text-right text-high">
              {info.location}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="h6  flex-1 text-medium">Price</div>
            <div className="h6 font- font-boldold text-high">
              {(price / 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              Baht
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="h6 flex-11 flex text-medium">Start Date</div>
            <div className="h6 text-right font-bold text-high">
              {Dayjs(startTime).format("	dddd, MMMM D, YYYY [ at ] HH:mm")}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="h6  flex-1 text-medium">End Date</div>
            <div className="h6 text-right font-bold text-high">
              {Dayjs(endTime).format("	dddd, MMMM D, YYYY [ at ] HH:mm")}
            </div>
          </div>
          {description && (
            <div className="flex flex-row justify-between">
              <div className="h6  flex-1 text-medium">Description</div>
              <div className="h6 text-right font-bold text-high">
                {description}
              </div>
            </div>
          )}
          {status === "pending" &&
            (role === "participant" ? (
              <div className="flex w-full flex-row justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    rejectEvent.mutate({
                      eventID: eventID,
                    });
                  }}
                >
                  Reject Event
                </Button>
                <ConfirmEventPayment
                  totalPrice={price}
                  confirmEvent={() => {
                    confirmEvent.mutate({
                      eventID: eventID,
                    });
                  }}
                />
              </div>
            ) : (
              <div className="flex w-full flex-row justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    cancelEvent.mutate({
                      eventID: eventID,
                    });
                  }}
                >
                  Cancel Event
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
