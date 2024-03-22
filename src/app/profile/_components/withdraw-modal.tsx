"use client";
import { BankIcon } from "@/components/common/bank-icon";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BANK_LIST, BANK_NAME_MAPPER, type Bank } from "@/constants/payment";
import { useMediaQuery } from "@/hooks/use-media-query";
import { api } from "@/trpc/react";
import {
  faCircleInfo,
  faMinus,
  faPlus,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import * as React from "react";
import { z } from "zod";

type WithdrawDialongProps = {
  withdrawalAmount: number;
  bankName?: Bank;
  bankAccount?: string;
};

export function WithdrawDialog(props: WithdrawDialongProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex w-full grow items-center justify-center gap-2 rounded-md px-1 py-4 hover:bg-secondary-50 md:py-2">
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
            Withdraw
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-high">
              Withdrawing Your Balance
            </DialogTitle>
            <DialogDescription>
              Insert the amount of money you want to withdraw.
            </DialogDescription>
          </DialogHeader>
          <WithdrawForm setOpen={setOpen} {...props} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="flex w-full grow items-center justify-center gap-2 rounded-md px-1 py-4 hover:bg-secondary-50 md:py-2">
          <div className="relative h-6 w-8">
            <FontAwesomeIcon
              className="h-6 w-6 text-secondary-500"
              icon={faWallet}
            />
            <FontAwesomeIcon
              className="absolute right-0 top-0 h-[12px] w-[12px] rounded-full bg-secondary-300 p-[2px] text-white"
              fontWeight={900}
              icon={faMinus}
            />
          </div>
          Witndraw
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-high">
            Withdrawing Your Balance
          </DrawerTitle>
          <DrawerDescription>
            Insert the amount of money you want to withdraw.
          </DrawerDescription>
        </DrawerHeader>
        <WithdrawForm setOpen={setOpen} {...props} />
      </DrawerContent>
    </Drawer>
  );
}

type WithdrawFormProps = {
  setOpen: (open: boolean) => void;
  withdrawalAmount: number;
  bankName?: string;
  bankAccount?: string;
};

function WithdrawForm(props: WithdrawFormProps) {
  const {
    setOpen,
    withdrawalAmount: withdrawalAmount,
    bankName,
    bankAccount,
  } = props;
  const utils = api.useUtils();
  const router = useRouter();

  const sortedBankList = [...BANK_LIST].sort((a, b) =>
    BANK_NAME_MAPPER[a].localeCompare(BANK_NAME_MAPPER[b]),
  );
  const updateHostMutation = api.profile.updateHost.useMutation();
  const requestWithdrawMutation = api.profile.requestWithdraw.useMutation();
  const { toast } = useToast();

  const formAction = async (data: FormData) => {
    const bank = z.enum(BANK_LIST).parse(data.get("bank"));
    const bankNumber = z.string().parse(data.get("bankNumber"));
    const amountBaht = z.coerce.number().parse(data.get("price"));

    if (amountBaht * 100 > withdrawalAmount) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough balance to withdraw.`,
        variant: "error",
      });
      return;
    }

    await Promise.all([
      updateHostMutation.mutateAsync({
        bankName: bank,
        bankAccount: bankNumber,
      }),
      requestWithdrawMutation.mutateAsync({
        amountStang: amountBaht * 100,
        bankName: bank,
        bankAccount: bankNumber,
      }),
    ]);

    await utils.auth.me.invalidate();
    router.refresh();

    toast({
      title: "Withdrawal Requested",
      description: `Your withdrawal request has been submitted.`,
    });

    setOpen(false);
  };
  return (
    <form action={formAction} className="flex flex-col gap-6 p-4 pt-6">
      <div className="mx-auto flex w-full flex-col gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label>Bank</Label>
          {bankName ? (
            <Select required name="bank" defaultValue={bankName}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortedBankList.map((bank) => (
                    <SelectItem value={bank} key={bank}>
                      <div className="flex items-center gap-2">
                        <BankIcon bank={bank} /> {BANK_NAME_MAPPER[bank]}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <div className="h-10 animate-pulse rounded-lg bg-gray-200 transition-all"></div>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Bank Number</Label>
          {bankAccount ? (
            <Input
              required
              name="bankNumber"
              defaultValue={bankAccount}
            ></Input>
          ) : (
            <div className="h-10 animate-pulse rounded-lg bg-gray-200 transition-all"></div>
          )}
        </div>
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
      </div>
      <Button type="submit" variant="secondary">
        Withdraw
      </Button>
    </form>
  );
}
