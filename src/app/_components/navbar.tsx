"use client";
import { cn } from "@/utils/tailwind-merge";
import { faCalendarCheck, faComment, faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavBar() {
  const pathName = usePathname();
  const isDiscover = pathName.startsWith("/discover") ? "block" : "hidden";
  const isEvent = pathName.startsWith("/event") ? "block" : "hidden";
  const isChat = pathName.startsWith("/chat") ? "block" : "hidden";

  return (
    <nav className="sticky left-0 top-0 z-50 hidden h-screen w-[100px] flex-col justify-between gap-3 bg-white px-6 py-9 shadow-sm lg:flex">
      <div className="flex h-[762px] flex-col gap-9">
        <Image src="/svgs/logo-default.svg" width={62} height={46} alt="logo" />
        <Link
          className="group relative flex h-8 w-8 flex-row items-center self-center hover:cursor-pointer"
          href="/discover"
        >
          <FontAwesomeIcon
            icon={faCompass}
            className={cn("h-8 w-8", isDiscover == "block" ? "text-primary-500" : "text-medium")}
          />
          <div
            className={cn(
              "absolute left-[62px] h-10 w-1 rounded-sm bg-primary-500 group-hover:block",
              isDiscover,
            )}
          />
        </Link>
        <Link
          className="group relative flex h-8 w-8 flex-row items-center self-center hover:cursor-pointer"
          href="/event"
        >
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className={cn("h-8 w-8", isEvent == "block" ? "text-primary-500" : "text-medium")}
          />
          <div
            className={cn(
              "absolute left-[62px] h-10 w-1 rounded-sm bg-primary-500 group-hover:block",
              isEvent,
            )}
          />
        </Link>
        <Link
          className="group relative flex h-8 w-8 flex-row items-center self-center hover:cursor-pointer"
          href="/chat"
        >
          <FontAwesomeIcon
            icon={faComment}
            className={cn("h-8 w-8", isChat == "block" ? "text-primary-500" : "text-medium")}
          />
          <div
            className={cn(
              "absolute left-[62px] h-10 w-1 rounded-sm bg-primary-500 group-hover:block",
              isChat,
            )}
          />
        </Link>
      </div>
      <div className="items-center justify-center self-center">
        <div className="relative flex h-10 w-10">
          <Image
            src="/images/discover/mock-profile/mock-1.jpg"
            fill
            alt="logo"
            className="self-center rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

export function NavBarMobile({ className }: { className?: string }) {
  return (
    <nav className={cn("fixed bottom-4 z-50 w-full justify-center ", className)}>
      <div className=" z-50 mx-auto flex h-16 w-[80%] max-w-[448px] justify-between rounded-3xl bg-white px-9 lg:hidden">
        <div className="h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
          <FontAwesomeIcon icon={faCompass} className="h-8 w-8 text-medium" />
        </div>
        <div className="h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
          <FontAwesomeIcon icon={faCalendarCheck} className="h-8 w-8 text-medium" />
        </div>
        <div className="h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
          <FontAwesomeIcon icon={faComment} className="h-8 w-8 text-medium" />
        </div>
        <div className="items-center justify-center self-center">
          <div className="relative flex h-10 w-10">
            <Image
              src="/images/discover/mock-profile/mock-1.jpg"
              fill
              alt="logo"
              className="self-center rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
