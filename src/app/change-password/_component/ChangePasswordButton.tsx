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
import { api } from "@/trpc/react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/router";
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

  // const router = useRouter();
  const mutate = api.auth.changePassword.useMutation({});
  const [error, setError] = useState<string | null>(null);
  const [criticalError, _setCriticalError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async () => {
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const password = formData.get("Current Password") as string;
    const oldPassword = formData.get("New Password") as string;
    const confirm_password = formData.get("Ponfirm password") as string;
    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      await mutate.mutateAsync({
        oldPassword: oldPassword,
        newPassword: password,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`Error: ${e.message}`);
      } else {
        setError("Unknown error");
      }
    }
    // void router.push("/");
  };

  const handleClose = () => {
    return;
  };

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

      <DialogContent className="flex h-fit w-full max-w-[422px] flex-col items-center gap-y-4 rounded-md bg-white p-6">
        <FontAwesomeIcon
          icon={faKey}
          className={"h-12 w-12 text-primary-500"}
        />
        <div className="flex w-full flex-col items-center gap-y-6">
          <div className="h3 font-bold">Change your password</div>
          <form className="flex w-full flex-col gap-y-3" ref={formRef}>
            <div className="flex w-full flex-col gap-y-1">
              <Label htmlFor="Current Password">Current Password</Label>
              <Input
                type="text"
                className="h-9"
                name="Current Password"
                placeholder="Enter your current password"
              />
            </div>
            <div className="flex w-full flex-col gap-y-1">
              <Label htmlFor="New Password">New Password</Label>
              <Input
                type="text"
                className="h-9"
                name="New Password"
                placeholder="New password"
              />
            </div>
            <div className="flex w-full flex-col gap-y-1">
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
        <div className="flex h-10 w-full flex-row-reverse gap-x-3">
          <span
            className="inline-flex h-full w-24 items-center justify-center rounded-xl bg-primary-500 text-white hover:cursor-pointer hover:bg-primary-600 disabled:bg-primary-100"
            onClick={handleSubmit}
          >
            Confirm
          </span>
          <span
            className="inline-flex h-full w-20 items-center justify-center rounded-xl border border-primary-500 bg-white text-primary-500 hover:cursor-pointer hover:border-primary-600 hover:text-primary-600 disabled:bg-primary-100"
            onClick={handleClose}
          >
            Cancel
          </span>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
