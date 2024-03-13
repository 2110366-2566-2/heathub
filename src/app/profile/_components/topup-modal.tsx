"use client";
import * as React from "react";
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

export function TopUpDialog() {
  "use client";
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
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
        <Button variant="outline">Edit Profile</Button>
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
      <div className="mx-auto flex w-full flex-col gap-1">
        <div className="flex w-full items-center gap-2 rounded-lg border border-primary-300 px-2 text-4xl text-high has-[:focus-visible]:ring has-[:focus-visible]:ring-primary-100">
          <input
            type="number"
            name="price"
            className="h-16 w-full rounded-lg border-0 px-0 text-right outline-none"
            step={1}
            min={10}
            placeholder="0"
            required
          />
          <span className="font-bold">฿</span>
        </div>
        <span className="text-right text-medium">Must be greater than 10฿</span>
      </div>
      <Button type="submit" variant="default">
        Top up
      </Button>
    </form>
  );
}
