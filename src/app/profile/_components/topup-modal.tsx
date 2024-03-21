"use client";
import { topUp } from "@/action/payment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  faCircleInfo,
  faPlus,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import { cn } from "@/utils/tailwind-merge";

export function TopUpDialog(props: { className?: string }) {
  "use client";
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className={cn(
              "flex w-full grow items-center justify-center gap-2 rounded-md px-1 py-4 hover:bg-secondary-50 md:py-2",
              props.className,
            )}
          >
            <div className="relative h-6 w-8">
              <FontAwesomeIcon
                className="h-6 w-6 text-secondary-500"
                icon={faWallet}
              />
              <FontAwesomeIcon
                className="absolute right-0 top-0 h-[12px] w-[12px] rounded-full bg-secondary-300 p-[2px] text-white"
                fontWeight={900}
                icon={faPlus}
              />
            </div>
            Top Up
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-high">
              Topping Up Your Balance
            </DialogTitle>
            <DialogDescription>
              Insert the amount of money you want to top up.
            </DialogDescription>
          </DialogHeader>
          <TopUpForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className={cn(
            "flex w-full grow items-center justify-center gap-2 rounded-md px-1 py-4 hover:bg-secondary-50 md:py-2",
            props.className,
          )}
        >
          <div className="relative h-6 w-8">
            <FontAwesomeIcon
              className="h-6 w-6 text-secondary-500"
              icon={faWallet}
            />
            <FontAwesomeIcon
              className="absolute right-0 top-0 h-[12px] w-[12px] rounded-full bg-secondary-300 p-[2px] text-white"
              fontWeight={900}
              icon={faPlus}
            />
          </div>
          Top Up
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-high">
            Topping Up Your Balance
          </DrawerTitle>
          <DrawerDescription>
            Insert the amount of money you want to top up.
          </DrawerDescription>
        </DrawerHeader>
        <TopUpForm />
      </DrawerContent>
    </Drawer>
  );
}

function TopUpForm() {
  return (
    <form action={topUp} className="flex flex-col gap-6 p-4 pt-6">
      <div className="flex w-full flex-col gap-1.5">
        <Label>Amount</Label>
        <div className="flex w-full items-center gap-2 rounded-lg bg-neutral-100 px-2 text-4xl text-high has-[:focus-visible]:bg-white has-[:focus-visible]:ring has-[:focus-visible]:ring-primary-100">
          <input
            type="number"
            name="price"
            className="h-16 w-full rounded-lg border-0 bg-neutral-100 bg-transparent px-0 text-right outline-none placeholder:text-placeholder"
            step={1}
            min={10}
            placeholder="0"
            required
          />
          <span className="font-bold">฿</span>
        </div>

        <div className="flex items-center text-sm text-medium">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="mr-1 h-4 w-4 text-medium"
          />
          The amount must be greater than 10฿.
        </div>
      </div>
      <Button type="submit" variant="secondary">
        Top up
      </Button>
    </form>
  );
}
