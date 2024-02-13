"use client";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Chat() {
  return (
    <Link
      className="flex aspect-square h-3/4 max-h-14 max-w-14 items-center justify-center rounded-full bg-secondary-400 transition hover:cursor-pointer hover:bg-secondary-500"
      style={{ boxShadow: "0px 15px 15px rgba(233, 64, 87, 0.20)" }}
      href="/chat"
    >
      <FontAwesomeIcon
        icon={faComment}
        className="h-2/5 max-w-6 text-white"
        onClick={(e) => {
          e.stopPropagation();
          console.log("clicked");
        }}
      />
    </Link>
  );
}

export function ChatDialog() {
  return (
    <Link
      className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-secondary-400 transition hover:cursor-pointer hover:bg-secondary-500"
      style={{ boxShadow: "0px 15px 15px rgba(233, 64, 87, 0.20)" }}
      href="/chat"
    >
      <FontAwesomeIcon
        icon={faComment}
        className="h-6 w-6 self-center text-white"
        onClick={(e) => {
          e.stopPropagation();
          console.log("clicked");
        }}
      />
    </Link>
  );
}
