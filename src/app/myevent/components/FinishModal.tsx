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
import { api } from "@/trpc/react";

interface EventModalProps {
  id: number;
  children: React.ReactNode;
}

export function FinishModal(prop: EventModalProps) {
  const { children } = prop;
  const finishEvent = api.event.finishEvent.useMutation();

  const handleFinishEvent = async (eventID: number) => {
    try {
      await finishEvent.mutateAsync({ eventID: eventID });
      const utils = api.useUtils();
      await utils.event.myEvent.invalidate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-1">{children}</DialogTrigger>
      <DialogContent className="rounded-3xl bg-white">
        <DialogHeader>
          <DialogTitle className="items-begin flex flex-col gap-1">
            <h3 className="h3 flex flex-1 font-extrabold text-primary-800">
              Do you want to finish this event ?
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
            <Button
              variant="default"
              className="bg-primary-500 text-white"
              onClick={() => handleFinishEvent(prop.id)}
            >
              Finish Event
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
