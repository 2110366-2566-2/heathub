import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Event, Host, Participant } from "./ReportTableColumn";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

interface EventModalProps {
  reportStatus: "pending" | "resolved" | "rejected";
  reportID: number;
  title: string;
  detail: string | null;
  event: Event;
  host: Host;
  participant: Participant;
  children: React.ReactNode;
}

function formatDate(dateTime: Date) {
  const date = new Date(dateTime);
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);
  return `${formattedDate} at ${formattedTime}`;
}

export function SeeMoreModal(props: EventModalProps) {
  const {
    reportStatus,
    reportID,
    title,
    detail,
    event,
    host,
    participant,
    children,
  } = props;
  const refund = api.admin.refundEventReport.useMutation();
  const reject = api.admin.rejectEventReport.useMutation();
  const { toast } = useToast();


  const handleRefund = async () => {
    try {
      await refund.mutateAsync({ reportID });
      toast({
        title: "Successfully refund report id " + reportID,
        description: "Event id " + event.id + " is refunded",
      });
    } catch (error) {
      toast({
        title: "Failed to refund report id " + reportID,
        description: "Event id " + event.id + " is refunded",
        variant: "error",
      });
    }
  };

  const handleReject = async () => {
    try {
      await reject.mutateAsync({ reportID });
      toast({
        title: "Successfully reject report id " + reportID,
        description: "Event id " + event.id + " is rejected",
      });
    } catch (error) {
      toast({
        title: "Failed to reject report id " + reportID,
        description: "Event id " + event.id + " is rejected",
        variant: "error",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-1">{children}</DialogTrigger>
      <DialogContent className="rounded-3xl bg-white">
        <DialogHeader>
          <DialogTitle className="items-begin flex flex-col gap-1">
            <h3 className="h3 flex flex-1 font-extrabold text-primary-800">
              Report Detail
            </h3>
            <div className="h6 text-High flex flex-col gap-2 font-medium">
              <div className="flex flex-col ">
                <div className="font-bold text-medium">Title</div>
                <div>{title}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-medium">Detail</div>
                <div>{detail || "No detail available"}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-medium">Event</div>
                <div className="justify-left flex h-fit w-full rounded-xl border-none bg-neutral-50 p-2">
                  <div className="flex flex-col gap-2 font-bold text-medium">
                    <div>EventID</div>
                    <div>Location</div>
                    <div>Date</div>
                    <div>Detail</div>
                    <div>Price</div>
                  </div>
                  <div className="flex flex-col gap-2 px-4">
                    <div>{event.id}</div>
                    <div>{event.location}</div>
                    <div>{formatDate(event.startTime)}</div>
                    <div>{event.description}</div>
                    <div>{event.price / 100}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-medium">Participant</div>
                <div className="justify-left flex h-fit w-full rounded-xl border-none bg-neutral-50 p-2">
                  <div className="flex flex-col gap-2 font-bold text-medium">
                    <div>Name</div>
                    <div>Username</div>
                    <div>Email</div>
                  </div>
                  <div className="flex flex-col gap-2 px-4">
                    <div>
                      {participant.firstName + " " + participant.lastName}
                    </div>
                    <div>{participant.aka}</div>
                    <div>{participant.email}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-medium">Host</div>
                <div className="justify-left flex h-fit w-full rounded-xl border-none bg-neutral-50 p-2">
                  <div className="flex flex-col gap-2 font-bold text-medium">
                    <div>Name</div>
                    <div>Username</div>
                    <div>Email</div>
                  </div>
                  <div className="flex flex-col gap-2 px-4">
                    <div>{host.firstName + " " + host.lastName}</div>
                    <div>{host.aka}</div>
                    <div>{host.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end">
          {reportStatus === "pending" && (
            <DialogClose asChild>
              <Button
                variant="default"
                className="bg-primary-500 font-normal text-white"
                onClick={handleRefund}
              >
                Refund
              </Button>
            </DialogClose>
          )}
          {reportStatus === "pending" && (
            <DialogClose asChild>
              <Button
                variant="outline"
                className="h5 border-primary-500 font-normal text-primary-500"
                onClick={handleReject}
              >
                Reject
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
