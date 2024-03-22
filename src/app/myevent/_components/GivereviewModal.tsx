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
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "@/trpc/react"
interface EventModalProps {
  id: number;
  name: string;
  children: React.ReactNode;
  participantID : string;
  hostID : string;
}

export function GivereviewModal(prop: EventModalProps) {
  const { children } = prop;
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const createReview = api.review.createReview.useMutation();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    console.log(message);
  };

  const handleSubmit = (event: FormEvent) => {
    console.log("Submit");
    createReview.mutateAsync({
      eventID : prop.id,
      participantID : prop.participantID,
      hostID : prop.hostID,
      ratingScore : rating,
      reviewDesc : message
    })
  };
  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-1">{children}</DialogTrigger>
      <DialogContent className="rounded-3xl bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            <StarRateOnclick rating={rating} setRating={setRating} />
            <Label htmlFor="message" className="h5 text-black">
              Review
            </Label>
            <Textarea
              placeholder="Type your review here"
              id="message"
              value={message}
              onChange={handleChange}
            />
          </DialogDescription>
          <DialogFooter className="flex flex-row justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="h5 border-primary-500 text-primary-500"
                type="submit"
              >
                Back To Event
              </Button>
            </DialogClose>
            {/* <DialogClose asChild>
              <Button
                onSubmit={handleSubmit}
                variant="default"
                className="bg-primary-500 text-white"
              >
                Sent a Review
              </Button>
            </DialogClose> */}
            <Button
              onSubmit={handleSubmit}
              variant="default"
              className="bg-primary-500 text-white"
            >
              Sent a Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
