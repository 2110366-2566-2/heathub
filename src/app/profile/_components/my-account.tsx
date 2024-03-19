"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faKey,
  faCircleInfo,
  faClock,
  faCheckCircle,
  faCircleXmark,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type ProfilePreviewProps } from "./profile-container";
import ChangePasswordButton from "@/app/change-password/_component/ChangePasswordButton";
import VerificationButton from "./VerificationButton";

export function MyAccountPreview(props: ProfilePreviewProps) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const verifiedStatusText = () =>{
  const status = props.verifiedStatus;
  // "unverified", "pending", "verified", "rejected"
  if(status=== "Verified"){
    return (
      <div className="flex flex-row items-center gap-1 text-[#34B463]">
        <div className="flex h-5 w-5 items-center justify-center">
          <FontAwesomeIcon icon={faCheckCircle} size={"1x"} />
        </div>
        Verified
      </div>
    );
  }
  else if(status === "pending"){
    return (
      <div className="flex flex-row items-center gap-1 text-status-pending">
        <div className="flex h-5 w-5 items-center justify-center">
          <FontAwesomeIcon icon={faClock} size={"1x"} />
        </div>
        Pending
      </div>
    );
  }
  else if(status === "unverified"){
    return (
      <div className="flex flex-row items-center gap-1 text-medium">
        <div className="flex h-5 w-5 items-center justify-center">
          <FontAwesomeIcon icon={faCircleExclamation} size={"1x"} />
        </div>
        Not Verified
      </div>
    );
  }
    else if(status === "rejected"){
    return (
      <div className="small flex flex-col gap-1 text-medium">
        <div className="flex flex-row items-center gap-1 text-status-error-default">
          <div className="flex h-5 w-5 items-center justify-center">
            <FontAwesomeIcon icon={faCircleXmark} size={"1x"} />
          </div>
          Rejected
        </div>
        Your request has been rejected with the following reason: [Reason
        provided by the admin]. Please review the provided details and make
        necessary corrections before resubmitting.
      </div>
    );
  }
  else{
    return(<div>Error</div>)
  }
}

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4 lg:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="h-6 w-6 text-secondary-500"
            />
            <div className="h4 font-bold text-high">My Account</div>
          </div>
          <div className="lg:gap-auto flex flex-col items-start gap-4 rounded-xl bg-invert px-6 py-6 lg:flex-row lg:justify-between">
            <div className="flex flex-col items-start gap-2">
              <div className="placeholder flex justify-center text-medium">
                Email
              </div>
              <div className="h6 flex justify-center font-bold text-high">
                {props.email}
              </div>
            </div>
            <ChangePasswordButton />
          </div>
          <div className="lg:gap-auto flex flex-col items-start gap-4 rounded-xl bg-invert px-6 py-6 lg:flex-row lg:justify-between">
            <div className="flex flex-col items-start gap-2">
              <div className="placeholder flex justify-center text-medium">
                Verification Status
              </div>
              <div className="h6 flex flex-1 justify-center font-bold">
                {verifiedStatusText()}
              </div>
            </div>
            <VerificationButton />
          </div>
        </div>
      </div>
      {isMobile ? (
        <Drawer>
          <DrawerOverlay
            className="bg-opacity-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${props.image})` }}
          />
          {/* <DrawerProfile {...props} /> */}
        </Drawer>
      ) : (
        <Dialog>
          {/* <DialogProfile {...props} /> */}
        </Dialog>
      )}
    </>
  );
}
