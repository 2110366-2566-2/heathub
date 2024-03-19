import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Verify from "./verify";

export default function VerificationButton() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex flex-row items-center gap-[10px] rounded-xl border border-secondary-500 bg-neutral-0 px-4 py-2 text-secondary-500 hover:border-secondary-700 hover:bg-secondary-50 hover:text-secondary-700 disabled:border-secondary-700 disabled:bg-neutral-0 disabled:text-secondary-700 h-8 h6 font-bold lg:h-10 lg:h5 lg:font-normal">
          <FontAwesomeIcon icon={faCircleCheck} size="1x" />
          Get Verified
        </div>
      </DialogTrigger>
      <DialogContent className="flex h-fit lg:w-full w-[350px] flex-col items-center rounded-md bg-white p-6">
        <Verify
          onClose={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
