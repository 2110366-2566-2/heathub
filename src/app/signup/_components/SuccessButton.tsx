import LoadingCircle from "@/app/_components/loading-circle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";
interface SuccessButtonProps {
  handleClick: () => void | Promise<void>;
  isSuccessed: boolean;
  setSuccessed?: (pop: boolean) => void;
  isPressed: boolean;
  router: AppRouterInstance;
}
export default function SuccessButton(props: SuccessButtonProps) {
  const { handleClick, isSuccessed, setSuccessed, router, isPressed } = props;
  const handleStartButton = () => {
    router.push("/signin");
  };

  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, [isOpen]);

  useEffect(() => {
    if (setSuccessed) {
      setSuccessed(isSuccessed);
    }
  }, [isSuccessed, setSuccessed]);

  return (
    <Dialog
      onOpenChange={() => {
        setOpen(true);
      }}
      open={isOpen}
    >
      <DialogTrigger>
        <span
          className="inline-flex h-12 w-[168px] items-center justify-center rounded-xl bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-100"
          onClick={handleClick}
        >
          Create Account
        </span>
      </DialogTrigger>
      {isPressed ? (
        <DialogContent className="h-fit w-full max-w-[360px] rounded-md bg-white">
          <DialogHeader className="flex flex-col items-center justify-center gap-2">
            {isSuccessed ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={"h-12 w-12 text-primary-500"}
              />
            ) : (
              <div className="h-fit w-fit self-center">
                <LoadingCircle width="48px" height="48px" color="red" />
              </div>
            )}
            <DialogTitle>
              {isSuccessed ? "Success!" : "In process..."}
            </DialogTitle>
            <DialogDescription className="text-medium">
              {isSuccessed
                ? "Your account has been successfully created"
                : "Please wait for a moment..."}
            </DialogDescription>
          </DialogHeader>
          {isSuccessed ? (
            <DialogFooter className="flex w-full justify-self-center">
              <Button
                className="text-h4 ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-xl bg-primary-500 font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-primary-100"
                onClick={() => {
                  handleStartButton();
                }}
              >
                Get Started
              </Button>
            </DialogFooter>
          ) : (
            <></>
          )}
        </DialogContent>
      ) : (
        <></>
      )}
    </Dialog>
  );
}
