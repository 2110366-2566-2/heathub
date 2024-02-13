import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect } from "react";
interface SuccessButtonProps {
  handleClick: () => void | Promise<void>;
  isModalPop: boolean;
  setModalPop: (pop: boolean) => void;
}
export default function SuccessButton(props: SuccessButtonProps) {
  // const router = useRouter();
  const handleStartButton = () => {
    return;
  };

  useEffect(() => {
    props.setModalPop(props.isModalPop);
  }, [props]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="submit"
          onClick={props.handleClick}
          className="h-12 w-[167px] bg-primary-500 text-white"
          variant="outline"
        >
          Create Account
        </Button>
      </DialogTrigger>
      {props.isModalPop ? (
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
