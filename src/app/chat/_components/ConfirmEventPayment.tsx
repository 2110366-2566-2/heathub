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
import { cn } from "@/utils/tailwind-merge";

import { TopUpDialog } from "@/app/profile/_components/topup-modal";
import { api } from "@/trpc/react";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

interface ConfirmEventPaymetProps {
  totalPrice: number;
  confirmEvent: () => void;
}

export default function ConfirmEventPaymet(props: ConfirmEventPaymetProps) {
  const { confirmEvent, totalPrice } = props;
  const { data } = api.profile.balance.useQuery(undefined);
  const decimalBaseMoney = (data ?? 0.0) / 100;
  const myBalance = decimalBaseMoney.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedTotalPrice = totalPrice.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const isEnoughMoney = decimalBaseMoney > props.totalPrice;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Confirm</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px] sm:rounded-md">
        <DialogHeader className="flex w-full flex-col items-center">
          <FontAwesomeIcon
            icon={faMoneyCheckDollar}
            className="text-primary-500"
            size="1x"
          />
          <DialogTitle className="text-center">Confirm Payment</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-medium">
          Please check your balance before confirm payment
        </DialogDescription>
        <div className="grid gap-2">
          <div className="flex w-full flex-row text-medium">
            Your Balance:
            <span
              className={cn(
                "ml-2 font-bold",
                isEnoughMoney ? "text-success" : "text-error-default",
              )}
            >
              {myBalance}
            </span>
          </div>
          <hr />
          <div className="flex w-full flex-row text-medium">
            Total Price:
            <span className="ml-2 font-bold">{formattedTotalPrice}</span>
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button variant={"outline"}>Close</Button>
          </DialogTrigger>
          {isEnoughMoney ? (
            <Button
              onClick={() => {
                confirmEvent();
              }}
            >
              Confirm
            </Button>
          ) : (
            <TopUpDialog className="w-fit grow-0 rounded-xl border border-secondary-400 px-4 text-secondary-400" />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
