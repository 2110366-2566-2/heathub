"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faClock,
  faCheckCircle,
  faCircleXmark,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { type ProfilePreviewProps } from "./profile-container";
import ChangePasswordButton from "@/app/change-password/_component/ChangePasswordButton";
import VerificationButton from "./VerificationButton";

export function MyAccountPreview(props: ProfilePreviewProps) {
  const verifiedStatusText = () => {
    const status = props.verifiedStatus;
    if (status === "verified") {
      return (
        <div className="flex flex-row items-center gap-1 text-[#34B463]">
          <div className="flex h-5 w-5 items-center justify-center">
            <FontAwesomeIcon icon={faCheckCircle} size={"1x"} />
          </div>
          Verified
        </div>
      );
    } else if (status === "pending") {
      return (
        <div className="flex flex-row items-center gap-1 text-status-pending">
          <div className="flex h-5 w-5 items-center justify-center">
            <FontAwesomeIcon icon={faClock} size={"1x"} />
          </div>
          Pending
        </div>
      );
    } else if (status === "unverified") {
      return (
        <div className="flex flex-row items-center gap-1 text-medium">
          <div className="flex h-5 w-5 items-center justify-center">
            <FontAwesomeIcon icon={faCircleExclamation} size={"1x"} />
          </div>
          Not Verified
        </div>
      );
    } else if (status === "rejected") {
      return (
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1 text-status-error-default">
            <div className="flex h-5 w-5 items-center justify-center ">
              <FontAwesomeIcon icon={faCircleXmark} size={"1x"} />
            </div>
            Rejected
          </div>
          <div className="small font-normal text-medium">
            Reason: {props.verifiedDetail}
          </div>
        </div>
      );
    } else {
      return <div>Error</div>;
    }
  };

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
          {props.verifiedStatus !== "" && (
            <div className="lg:gap-auto flex flex-col items-start gap-4 rounded-xl bg-invert px-6 py-6 lg:flex-row lg:justify-between">
              <div className="flex flex-col items-start gap-2">
                <div className="placeholder flex justify-center text-medium">
                  Verification Status
                </div>
                <div className="h6 flex flex-1 justify-center font-bold">
                  {verifiedStatusText()}
                </div>
              </div>
              {(props.verifiedStatus === "unverified" ||
                props.verifiedStatus === "rejected") && <VerificationButton />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
