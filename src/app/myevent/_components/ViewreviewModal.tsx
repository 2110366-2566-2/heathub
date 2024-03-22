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
import { StarRate } from "./StarRate";
import { api } from "@/trpc/react";

interface EventModalProps {
  id: number;
  name: string;
  children: React.ReactNode;
  rating: number;
  review: string;
}

export function ViewreviewModal(prop: EventModalProps) {
  const { children } = prop;
  const { data } = api.review.getReview.useQuery({
    eventID: prop.id,
  });
  
  if (!data) {
    return;
  }

  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-1">{children}</DialogTrigger>
      <DialogContent className="rounded-3xl bg-white">
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
          <StarRate Rating={data.ratingScore} />
          <Label htmlFor="message" className="h5 text-black">
            Review
          </Label>
          <Textarea id="message" disabled>
            {data.reviewDesc}
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
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
