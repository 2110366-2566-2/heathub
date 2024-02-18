import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-label";
import { useEffect, useRef, useState } from "react";

export default function ChangePasswordButton() {
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, [isOpen]);

  const [isClose, setClose] = useState(false);
  useEffect(() => {
    setClose(true);
  }, [isClose]);

  const handlePop = () => {
    return;
  };

  const handleConfirm = () => {
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);

    const oldPwInput = formData.get("Old Password") as string | null;
    const newPwInput = formData.get("New Password") as string | null;
    const confirmPwInput = formData.get("Confirm Password") as string | null;
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Dialog
    // onOpenChange={() => {
    //   setOpen(true);
    // }}
    // open={isOpen && !isClose}
    >
      <DialogTrigger>
        <span
          className="inline-flex h-12 w-[168px] items-center justify-center rounded-xl bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-100"
          onClick={handlePop}
        >
          Change Password
        </span>
      </DialogTrigger>

      <DialogContent className="flex h-[462px] w-full max-w-[422px] flex-col items-center gap-y-4 rounded-md bg-white p-6">
        <FontAwesomeIcon
          icon={faKey}
          className={"h-12 w-12 text-primary-500"}
        />
        <div className="flex w-full flex-col items-center gap-y-6">
          <div className="h3 font-bold">Change your password</div>
          <form className="flex w-full flex-col gap-y-2" ref={formRef}>
            <div className="flex w-full flex-col gap-y-1.5">
              <Label htmlFor="Current Password">Current Password</Label>
              <Input
                type="text"
                className="h-9"
                name="Current Password"
                placeholder="Enter your current password"
              />
            </div>
            <div className="flex w-full flex-col gap-y-1.5">
              <Label htmlFor="New Password">New Password</Label>
              <Input
                type="text"
                className="h-9"
                name="New Password"
                placeholder="New password"
              />
            </div>
            <div className="flex w-full flex-col gap-y-1.5">
              <Label htmlFor="Confirm Password">Confirm Password</Label>
              <Input
                type="text"
                className="h-9"
                name="Confirm Password"
                placeholder="Confirm your new password"
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
