"use client";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Chat() {
  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-400 transition hover:cursor-pointer hover:bg-secondary-500"
      style={{ boxShadow: "0px 15px 15px rgba(233, 64, 87, 0.20)" }}
    >
      <FontAwesomeIcon
        icon={faComment}
        className="h-6 w-6 text-white"
        onClick={(e) => {
          e.stopPropagation();
          console.log("clicked");
        }}
      />
    </div>
  );
}
