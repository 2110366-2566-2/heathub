import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { cn } from "@/utils/tailwind-merge";
import { faCircleInfo, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordButton() {
  const router = useRouter();

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

  const [criticalError, _setCriticalError] = useState<string | null>(null);
  const [noticeColor, setNoticeColor] = useState("text-placeholder");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (error === "Error: AUTH_INVALID_PASSWORD") {
      setError("Wrong password");
    }
  }, [error]);

  const mutate = api.auth.changePassword.useMutation({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async () => {
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const currentPassword = formData.get("Current Password") as string;
    const password = formData.get("New Password") as string;
    const confirmPassword = formData.get("Confirm Password") as string;
    if (!!password && password.length < 8) {
      setNoticeColor("text-red-500");
      setError("");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password do not match.");
      password.length < 8 ? {} : setNoticeColor("text-placeholder");
      return;
    }

    if (!currentPassword || !password || !confirmPassword) {
      return;
    }

    setNoticeColor("text-placeholder");
    if (currentPassword.length < 8) {
      setError("Wrong password");
      return;
    }

    try {
      await mutate.mutateAsync({
        oldPassword: currentPassword,
        newPassword: password,
      });
      handleClose();
      toast("Password changed", {
        description: "Your password has been changed successfully.",
      });
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
          className="text-h4 ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-xl border border-secondary-500 bg-white font-medium text-secondary-500 transition-colors hover:bg-secondary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-secondary-100"
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
          <div className="h3 font-bold text-high">Change your password</div>
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
              <div className="flex flex-row gap-x-1">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className={cn("h-4 w-4", noticeColor)}
                />
                <span className={cn("text-sm", noticeColor)}>
                  The password must be at least 8 characters.
                </span>
              </div>
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
            className="inline-flex h-10 w-24 items-center justify-center rounded-xl bg-secondary-400 text-white hover:cursor-pointer hover:bg-secondary-500 disabled:bg-secondary-100"
            onClick={handleSubmit}
          >
            Confirm
          </span>
          <span
            className="inline-flex h-10 w-20 items-center justify-center rounded-xl border border-primary-500 bg-white text-medium hover:cursor-pointer hover:border-primary-600 hover:text-primary-600 disabled:bg-primary-100"
            onClick={handleClose}
          >
            Cancel
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
