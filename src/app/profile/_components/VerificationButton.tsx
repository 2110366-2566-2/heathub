import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Verify from "./verify";

export default function VerificationButton() {
  const [criticalError, _setCriticalError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (error === "Error: AUTH_INVALID_PASSWORD") {
      setError("Wrong password");
    }
  }, [error]);
  return criticalError ? (
    // <>{router.push("/")}</>
    <>Error</>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex flex-row items-center gap-[10px] rounded-xl border border-secondary-500 bg-neutral-0 px-4 py-2 text-secondary-500 hover:border-secondary-700 hover:bg-secondary-50 hover:text-secondary-700 disabled:border-secondary-700 disabled:bg-neutral-0 disabled:text-secondary-700">
          <FontAwesomeIcon icon={faCircleCheck} size="1x" />
          Get Verified
        </div>
      </DialogTrigger>

      <DialogContent className="flex h-fit w-full max-w-[555px] flex-col items-center rounded-md bg-white p-6">
        <Verify
          onClose={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
