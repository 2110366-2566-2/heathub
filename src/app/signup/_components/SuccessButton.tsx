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
    router.push("/signin");
  };

  useEffect(() => {
    if (setModalPop) {
      setModalPop(isModalPop);
    }
  }, [isModalPop, setModalPop]);

  return (
    <Dialog>
      <DialogTrigger>
        <span
          className="inline-flex h-12 w-[168px] items-center justify-center rounded-xl bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-100"
          onClick={handleClick}
        >
          Create Account
        </span>
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
              <span
                className="text-h4 ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-xl bg-primary-500 font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-primary-100"
                onClick={() => {
                  handleStartButton();
                }}
              >
                Get Started
              </span>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      ) : (
        <></>
      )}
    </Dialog>
  );
}
