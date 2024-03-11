import { EventStatus } from "./Card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StarRateOnclick from "./StarRate";

interface EventModalProps {
  name: string;
  children: React.ReactNode;
}

export function GivereviewModal(prop: EventModalProps) {

  const { children } = prop;

  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-1">{children}</DialogTrigger>
      <DialogContent className="bg-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="items-begin flex flex-col gap-1">
            <h3 className="md:h3 h4 flex flex-1 font-extrabold text-primary-800">
              Give {prop.name} a review
            </h3>
            <div className="h6 font-normal text-medium">
              This review will show on {prop.name} profile.
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-3 text-medium">
          <StarRateOnclick />
          <Label htmlFor="message" className="h5 text-black">
            Review
          </Label>
          <Textarea placeholder="Type your review here" id="message" />
        </DialogDescription>
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
            <Button variant="default" className="bg-primary-500 text-white">
              Sent a Review
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
