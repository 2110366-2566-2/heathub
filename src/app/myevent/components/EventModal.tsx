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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import StarRateOnclick, { StarRate } from "./StarRate";

interface EventModalProps {
  name: string;
  status?: EventStatus;
  children: React.ReactNode;
  rating: number;
  review: string;
}

export function EventModal(prop:EventModalProps){

  const ModalButton = () => {
    switch (prop.status) {
      case EventStatus.STARTED:
        return (
          <Button
            variant="default"
            className="bg-primary-500 text-white"
          >
            Finish Event
          </Button>
        );
      case EventStatus.NOTSTARTED:
        return (
          <Button
            variant="default"
            className="bg-primary-500 text-white"
          >
            Cancel Event
          </Button>
        );
      case EventStatus.WAITINGREVIEW:
        return (
          <Button
            variant="default"
            className="bg-primary-500 text-white"
          >
            Sant a Review
          </Button>
        );
      case EventStatus.COMPLETED:
        return "";
    }
  };

  const ModalHeader = () => {
    switch (prop.status) {
      case EventStatus.STARTED:
        return (
          <DialogTitle className="flex flex-col items-begin gap-1">
            <h3 className="h3 flex flex-1 font-extrabold text-primary-800">
              Do you want to finish this event ?
            </h3>
            <div className="h6 font-normal text-medium">
              This action will permanently delete the event
            </div>
          </DialogTitle>
        );
      case EventStatus.NOTSTARTED:
        return (
          <DialogTitle className="flex flex-col items-begin gap-1">
            <h3 className="h3 flex flex-1 font-extrabold text-primary-800">
              Do you want to cancel this event ?
            </h3>
            <div className="h6 font-normal text-medium">
              This action will permanently delete the event
            </div>
          </DialogTitle>
        );
      case EventStatus.WAITINGREVIEW:
        return (
          <DialogTitle className="flex flex-col items-begin gap-1">
            <h3 className="md:h3 h4 flex flex-1 font-extrabold text-primary-800">
              Give {prop.name} a review
            </h3>
            <div className="h6 font-normal text-medium">
              This review will show on {prop.name} profile.
            </div>
          </DialogTitle>
        );
      case EventStatus.COMPLETED:
        return (
          <DialogTitle className="flex flex-col items-begin gap-1">
            <h3 className="md:h3 h4 flex flex-1 font-extrabold text-primary-800">
              Your review to {prop.name}
            </h3>
            <div className="h6 font-normal text-medium">
              This review will show on {prop.name} profile.
            </div>
          </DialogTitle>
        );
    }
  };

  const ModalDesc= () => {
    switch (prop.status) {
      case EventStatus.STARTED:
        return (
          ""
        );
      case EventStatus.NOTSTARTED:
        return (
          ""
        );

        case EventStatus.WAITINGREVIEW:
          return (
            <DialogDescription className="flex flex-col gap-3 text-medium">
            <StarRateOnclick/>
            <Label htmlFor="message" className="h5 text-black">Review</Label>
            <Textarea placeholder="Type your review here" id="message" />
          </DialogDescription>
          );

        case EventStatus.COMPLETED:
          return (
            <DialogDescription className="flex flex-col gap-3 text-medium">
            <StarRate 
            Rating={prop.rating}
            />
            <Label htmlFor="message" className="h5 text-black">Review</Label>
            <Textarea id="message" disabled >You did really great. I’m so happy to have a dinner with you</Textarea>
          </DialogDescription>
          );
    }
  };

  const { children } = prop;

  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-1">{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <ModalHeader/>
        </DialogHeader>
        <ModalDesc/>
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
            <ModalButton/>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}