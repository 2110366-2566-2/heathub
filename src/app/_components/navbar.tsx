"use client";
import {
  faCalendarCheck,
  faComment,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="sticky left-0 top-0 z-50 hidden h-screen w-[100px] flex-col gap-[10px] bg-white px-6 py-9 shadow-sm lg:flex">
      <div className="flex h-[762px] flex-col gap-9">
        <Image src="/svgs/logo-default.svg" width={62} height={46} alt="logo" />
        <div className="group relative flex h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
          <FontAwesomeIcon icon={faCompass} className="h-8 w-8 text-medium" />
          <div
            className={`${pathname === "/discover" ? "block" : "hidden"} absolute left-[62px] h-10 w-1 rounded-sm bg-primary-500 group-hover:block`}
          />
        </div>
        <div className="group relative flex h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="h-8 w-8 text-medium"
          />
          <div
            className={`${pathname === "/event" ? "block" : "hidden"} absolute left-[62px] h-10 w-1 rounded-sm bg-primary-500 group-hover:block`}
          />
        </div>
        <div className="group relative flex h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
          <FontAwesomeIcon icon={faComment} className="h-8 w-8 text-medium" />
          <div
            className={`${pathname === "/chat" ? "block" : "hidden"} absolute left-[62px] h-10 w-1 rounded-sm bg-primary-500 group-hover:block`}
          />
        </div>
      </div>
      <div className="items-center justify-center self-center">
        <div className="relative flex h-10 w-10">
          <Image
            src="/images/discover/mock-profile/mock-1.jpg"
            fill
            alt="logo"
            className="self-center rounded-full"
            objectFit="cover"
          />
        </div>
      </div>
    </nav>
  );
}

export function NavBarMobile() {
  return (
    <nav className=" z-50 mx-auto flex h-14 w-[80%] justify-between rounded-3xl bg-white px-9 lg:hidden">
      <div className="h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
        <FontAwesomeIcon icon={faCompass} className="h-8 w-8 text-medium" />
      </div>
      <div className="h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
        <FontAwesomeIcon
          icon={faCalendarCheck}
          className="h-8 w-8 text-medium"
        />
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
            className="self-center rounded-full"
            objectFit="cover"
          />
        </div>
      </div>
    </nav>
  );
}
