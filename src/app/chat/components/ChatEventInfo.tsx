"use client";
import { cn } from "@/utils/tailwind-merge";
import { type EventDetailCardProps } from "./type";
import EventTag from "./EventTag";
import { Dayjs } from "@/utils/dayjs";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import ConfirmEventPayment from "./ConfirmEventPayment";

export interface ChatEventInfoInterface {
  eventID: number;
  location: string;
  price: number;
  startTime: Date;
  endTime: Date;
  isMine: boolean;
  role: "host" | "participant";
  status: EventDetailCardProps["status"];
  updateStatus: (
    eventId: number,
    status: "payment-done" | "rejected" | "cancelled",
  ) => void;
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
      <div className="h-fit w-[52px]"></div>
      <div className="border-gray sha mb-2 flex h-fit w-full max-w-[460px] flex-col gap-6 rounded-md border-[1px] bg-white p-6">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-row justify-between">
            <div className="h3 flex-1 font-bold text-primary-800">
              Event Details
            </div>
            <EventTag type={status} />
          </div>
          <div className="text-sm text-medium">
            Please check the details before confirming the event
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <div className="h6 flex-1 text-medium">Location</div>
            <div className="h6 text-right font-bold text-high">
              {info.location}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="h6 flex-1 text-medium">Price</div>
            <div className="h6 font-bold text-high">{price} Baht</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="h6 flex-1 text-medium">Start Date</div>
            <div className="h6 text-right font-bold text-high">
              {Dayjs(startTime).format("	dddd, MMMM D, YYYY [ at ] hh:mm")}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="h6 flex-1 text-medium">End Date</div>
            <div className="h6 text-right font-bold text-high">
              {Dayjs(endTime).format("	dddd, MMMM D, YYYY [ at ] hh:mm")}
            </div>
          </div>
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
