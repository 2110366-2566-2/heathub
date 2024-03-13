"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

interface ConfirmEventPaymetProps {
  confirmEvent: () => void;
}

export default function ConfirmEventPaymet(props: ConfirmEventPaymetProps) {
  const { confirmEvent } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Confirm</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px] sm:rounded-md">
        <DialogHeader className="flex w-full flex-col items-center">
          <FontAwesomeIcon
            icon={faMoneyCheckDollar}
            className="h-8 w-8 text-primary-500 "
          />
          <DialogTitle className="text-center">Confirm Payment</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-medium">
          Please check your balance before confirm payment
        </DialogDescription>
        <div className="grid gap-2">
          <div className="flex w-full flex-row text-medium">
            Your Balance 3500
          </div>
          <hr />
          <div className="flex w-full flex-row text-medium">
            Total Price 3500
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              confirmEvent();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
