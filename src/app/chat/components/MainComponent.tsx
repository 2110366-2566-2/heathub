"use client";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CMessage } from "../../_components/creat-message";
import { cn } from "@/utils/tailwind-merge";
export function MainComponent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-screen min-w-[452px] flex-col justify-center  bg-purple-100 p-6",
        className,
      )}
    >
      <div className="mb-4 flex flex-row gap-2.5">
        <FontAwesomeIcon
          icon={faComment}
          className={"h-10 w-10 text-secondary-400"}
        />
        <span className="h2-bold  text-primary-900">Message</span>
      </div>
      <CMessage />
    </div>
  );
}
