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
import StarRateOnclick, { StarRate } from "./StarRate";

interface EventModalProps {
  id: number
  name: string;
  children: React.ReactNode;
  rating: number;
  review: string;
}

export function ViewreviewModal(prop: EventModalProps) {

  const { children } = prop;

  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-1">{children}</DialogTrigger>
      <DialogContent className="bg-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="items-begin flex flex-col gap-1">
            <h3 className="md:h3 h4 flex flex-1 font-extrabold text-primary-800">
              Your review to {prop.name}
            </h3>
            <div className="h6 font-normal text-medium">
              This review will show on {prop.name} profile.
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-3 text-medium">
          <StarRate Rating={prop.rating} />
          <Label htmlFor="message" className="h5 text-black">
            Review
          </Label>
          <Textarea id="message" disabled>
            You did really great. I’m so happy to have a dinner with you
          </Textarea>
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
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
