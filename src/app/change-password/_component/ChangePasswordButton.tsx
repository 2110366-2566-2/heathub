import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { cn } from "@/utils/tailwind-merge";
import { faCircleInfo, faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChangePasswordButton() {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);

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
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully.",
        duration: 3000,
        variant: "success",
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
    setOpen(false);
    setError("");
    setNoticeColor("text-placeholder");
    return;
  };

  const { toast } = useToast();

  return criticalError ? (
    <>{router.push("/")}</>
  ) : (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger>
        <div className="h6 lg:h5 flex h-8 w-fit flex-row items-center gap-[10px] rounded-xl border border-secondary-500 bg-neutral-0 px-4 py-2 font-bold text-secondary-500 hover:border-secondary-700 hover:bg-secondary-50 hover:text-secondary-700 disabled:border-secondary-700 disabled:bg-neutral-0 disabled:text-secondary-700 lg:h-10 lg:font-normal">
          <FontAwesomeIcon icon={faLock} size={"1x"} />
          Change Password
        </div>
      </DialogTrigger>

      <DialogContent className="flex h-fit w-full max-w-[422px] flex-col items-center gap-y-4 rounded-md bg-white p-6">
        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-secondary-400">
          <FontAwesomeIcon icon={faKey} className={"text-invert"} size={"2x"} />
        </div>
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
          <Button variant={"secondary"} onClick={handleSubmit}>
            Confirm
          </Button>
          <Button
            variant={"secondaryOutline"}
            className="border-medium text-medium"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
