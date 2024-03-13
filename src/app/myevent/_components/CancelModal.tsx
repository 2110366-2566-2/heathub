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

export function CancelModal(prop: EventModalProps) {
  const { children } = prop;
<<<<<<< HEAD:src/app/myevent/components/CancelModal.tsx
  const cancelEvent = api.event.cancelEvent.useMutation();
||||||| merged common ancestors:src/app/myevent/components/CancelModal.tsx
  const [error, setError] = useState<string | null>(null);

  const { data: cancelEvent } = eventRouter.cancelEvent.useMutation();

=======
  const cancelEvent = api.event.cancelEvent.useMutation();
  const utils = api.useUtils();

>>>>>>> f7efe98aeefd92d65e12f97a2f186b9599129674:src/app/myevent/_components/CancelModal.tsx
  const handleCancelEvent = async (eventID: number) => {
    try {
<<<<<<< HEAD:src/app/myevent/components/CancelModal.tsx
      await cancelEvent.mutateAsync({ eventID: eventID });
||||||| merged common ancestors:src/app/myevent/components/CancelModal.tsx
      await cancelEvent({ eventID: eventID });
=======
      await cancelEvent.mutateAsync({ eventID: eventID });
      await utils.event.myEvent.invalidate();
>>>>>>> f7efe98aeefd92d65e12f97a2f186b9599129674:src/app/myevent/_components/CancelModal.tsx
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
            <Button
              variant="default"
              className="bg-primary-500 text-white"
              onClick={() => handleCancelEvent(prop.id)}
            >
              Cancel Event
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
