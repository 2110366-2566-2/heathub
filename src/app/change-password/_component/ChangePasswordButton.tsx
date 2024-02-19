import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { cn } from "@/utils/tailwind-merge";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChangePasswordButton() {
  const [isOpen, setOpen] = useState(false);
  const [isClose, setClose] = useState(false);
  useEffect(() => {
    setClose(false);
  }, [isOpen]);
  useEffect(() => {
    setOpen(false);
  }, [isClose]);

  const handlePop = () => {
    return;
  };

  const router = useRouter();
  const mutate = api.auth.changePassword.useMutation({});
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (error === "Error: AUTH_INVALID_PASSWORD") {
      setError("Wrong password");
    }
  }, [error]);
  const [criticalError, _setCriticalError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [noticeColor, setNoticeColor] = useState("text-placeholder");

  const handleSubmit = async () => {
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const oldPassword = formData.get("Current Password") as string;
    const password = formData.get("New Password") as string;
    const confirm_password = formData.get("Confirm Password") as string;
    if (password !== confirm_password) {
      setError("Password do not match.");
      password.length < 8 ? {} : setNoticeColor("text-placeholder");
      return;
    }

    if (!!password && password.length < 8) {
      setNoticeColor("text-red-500");
      setError("");
      return;
    }

    if (!oldPassword || !password || !confirm_password) {
      return;
    }

    setNoticeColor("text-placeholder");
    if (oldPassword.length < 8) {
      setError("Wrong password");
      return;
    }

    try {
      await mutate.mutateAsync({
        oldPassword: oldPassword,
        newPassword: password,
      });
      handleClose();
      //**********show toast************
      console.log(`password change to ${password}`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`Error: ${e.message}`);
      } else {
        setError("Unknown error");
      }
    }
  };

  const handleClose = () => {
    setClose(true);
    setError("");
    setNoticeColor("text-placeholder");
    return;
  };

  return criticalError ? (
    <>{router.push("/")}</>
  ) : (
    <Dialog
      onOpenChange={() => {
        setOpen(true);
      }}
      open={isOpen && !isClose}
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
                type="password"
                className="h-9"
                name="Current Password"
                placeholder="Enter your current password"
              />
            </div>
            <div className="flex w-full flex-col gap-y-1">
              <Label htmlFor="New Password">New Password</Label>
              <Input
                type="password"
                className="h-9"
                name="New Password"
                placeholder="New password"
              />
              <span className={cn("text-sm", noticeColor)}>
                The password must be at least 8 characters.
              </span>
            </div>
            <div className="flex w-full flex-col gap-y-1">
              <Label htmlFor="Confirm Password">Confirm Password</Label>
              <Input
                type="password"
                className="h-9"
                name="Confirm Password"
                placeholder="Confirm your new password"
              />
              <div className="flex flex-row-reverse">
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </form>
        </div>
        <div className="flex h-fit w-full flex-row-reverse gap-x-3">
          <span
            className="inline-flex h-10 w-24 items-center justify-center rounded-xl bg-primary-500 text-white hover:cursor-pointer hover:bg-primary-600 disabled:bg-primary-100"
            onClick={handleSubmit}
          >
            Confirm
          </span>
          <span
            className="inline-flex h-10 w-20 items-center justify-center rounded-xl border border-primary-500 bg-white text-primary-500 hover:cursor-pointer hover:border-primary-600 hover:text-primary-600 disabled:bg-primary-100"
            onClick={handleClose}
          >
            Cancel
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
