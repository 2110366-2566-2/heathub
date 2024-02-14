import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { useEffect } from "react";
interface SuccessButtonProps {
  handleClick: () => void | Promise<void>;
  isModalPop: boolean;
  setModalPop?: (pop: boolean) => void;
  router: AppRouterInstance;
}
export default function SuccessButton(props: SuccessButtonProps) {
  const { handleClick, isModalPop, setModalPop, router } = props;
  const handleStartButton = () => {
    router.push("/discover");
  };

  useEffect(() => {
    if (setModalPop) {
      setModalPop(isModalPop);
    }
  }, [isModalPop, setModalPop]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="submit"
          onClick={handleClick}
          className="h-12 w-[168px] bg-primary-500 text-white"
          variant="outline"
        >
          Create Account
        </Button>
      </DialogTrigger>
      {isModalPop ? (
        <DialogContent className="h-fit w-full max-w-[360px] rounded-md bg-white">
          <DialogHeader className="flex flex-col items-center justify-center gap-2">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={"h-12 w-12 text-primary-500"}
            />
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription className="text-medium">
              Your account has been successfully created
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex w-full justify-self-center">
            <DialogClose className="w-full">
              <Button
                className="h-fit w-full rounded-xl bg-primary-500 text-white"
                onClick={() => {
                  handleStartButton();
                }}
              >
                Get Started
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      ) : (
        <></>
      )}
    </Dialog>
  );
}
