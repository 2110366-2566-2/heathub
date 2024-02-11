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
export default function SuccessButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="h-12 w-[167px] bg-primary-500 text-white"
          variant="outline"
        >
          Create Account
        </Button>
      </DialogTrigger>
      <DialogContent className=" h-fit max-w-[360px] rounded-md bg-white">
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
            <Button className="h-fit w-full rounded-xl bg-primary-500 text-white">
              Get Started
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
