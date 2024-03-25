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
import { Event, Host, Participant } from "./ReportTableColumn";
import { api } from "@/trpc/react";

interface EventModalProps {
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
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);
  return `${formattedDate} at ${formattedTime}`;
}

export function SeeMoreModal(props: EventModalProps) {
  const { reportID, title, detail, event, host, participant, children } = props;

  const refund = api.admin.refundEventReport.useMutation();
  const reject = api.admin.rejectEventReport.useMutation();
  const handleRefund = async () => {
    try {
      await refund.mutateAsync({ reportID });
    } catch (error) {
    }
  };

  const handleReject = async () => {
    try {
      await reject.mutateAsync({ reportID });
    } catch (error) {
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
            <div className="gap-0 flex flex-col h6 text-High font-medium">
              <div className="gap-0 flex flex-col">
                <div className="text-medium font-bold">Title</div>
                <div>{title}</div>
              </div>
              <div className="gap-0 flex flex-col">
                <div className="text-medium font-bold">Detail</div>
                <div >{detail || "No detail available"}</div>
              </div>
              <div className="gap-0 flex flex-col">
                <div className="text-medium font-bold">Event</div>
                <div className="flex h-fit w-full justify-left rounded-xl border-none bg-neutral-50 p-2">
                  <div className="flex flex-col text-medium font-bold">
                    <div>EventID</div>
                    <div>Location</div>
                    <div>Date</div>
                    <div>Detail</div>
                  </div>
                  <div className="flex flex-col px-4">
                    <div>{event.id}</div>
                    <div>{event.location}</div>
                    <div>{formatDate(event.startTime)}</div>
                    <div>{event.description}</div>
                  </div>
                </div>
              </div>
              <div className="gap-0 flex flex-col">
                <div className="text-medium font-bold">Participant</div>
                <div className="flex h-fit w-full justify-left rounded-xl border-none bg-neutral-50 p-2">
                  <div className="flex flex-col text-medium font-bold">
                    <div>Name</div>
                    <div>Username</div>
                    <div>Email</div>
                  </div>
                  <div className="flex flex-col px-4">
                    <div>{participant.firstName+' '+participant.lastName}</div>
                    <div>{participant.aka}</div>
                    <div>{participant.email}</div>
                  </div>
                </div>
              </div>
              <div className="gap-0 flex flex-col">
                <div className="text-medium font-bold">Host</div>
                <div className="flex h-fit w-full justify-left rounded-xl border-none bg-neutral-50 p-2">
                  <div className="flex flex-col text-medium font-bold">
                    <div>Name</div>
                    <div>Username</div>
                    <div>Email</div>
                  </div>
                  <div className="flex flex-col px-4">
                    <div>{host.firstName+' '+host.lastName}</div>
                    <div>{host.aka}</div>
                    <div>{host.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end">
          <DialogClose asChild>
            <Button
              variant="default"
              className="bg-primary-500 font-normal text-white"
              onClick={handleRefund}
            >
              Refund
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="h5 border-primary-500 font-normal text-primary-500"
              onClick={handleReject}
            >
              Reject
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
