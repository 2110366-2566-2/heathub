import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { eventRouter } from '@/server/api/routers/event';
import { api } from "@/trpc/react";
interface EventModalProps {
  children: React.ReactNode;
}

export function CancelModal(prop: EventModalProps) {

  const { children } = prop;
  const [error, setError] = useState<string | null>(null);

  const { data: cancelEvent } = eventRouter.cancelEvent.useMutation();

  const handleCancelEvent = async (eventID: number) => {
    try {
      await cancelEvent({ eventID: eventID });
    } catch (error) {
      setError("Failed to cancel event. Please try again later.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-1">{children}</DialogTrigger>
      <DialogContent className="bg-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="items-begin flex flex-col gap-1">
            <h3 className="h3 flex flex-1 font-extrabold text-primary-800">
              Do you want to cancel this event ?
            </h3>
            <div className="h6 font-normal text-medium">
              This action will permanently delete the event
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="h5 border-primary-500 text-primary-500"
            >
              Back To Event
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="default" className="bg-primary-500 text-white" onClick={handleCancelEvent}>
              Cancel Event
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
