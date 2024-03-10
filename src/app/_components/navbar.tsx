"use client";
import { cn } from "@/utils/tailwind-merge";
import {
  faCalendarCheck,
  faComment,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavItem } from "./navItem";

export function NavBar() {
  const pathName = usePathname();
  const isDiscover = pathName.startsWith("/discover");
  const isEvent = pathName.startsWith("/myevent");
  const isChat = pathName.startsWith("/chat");

  return (
    <nav className="sticky left-0 top-0 z-50 hidden h-screen w-[80px] flex-col justify-between gap-3 bg-secondary-400 py-9 shadow-sm lg:flex">
      <div className="flex h-full flex-col gap-8">
        {/* <Image src="/svgs/logo-default.svg" width={62} height={46} alt="logo" /> */}
        <NavItem link="/discover" icon={faCompass} isSelected={isDiscover} />
        <NavItem link="/myevent" icon={faCalendarCheck} isSelected={isEvent} />
        <NavItem link="/chat" icon={faComment} isSelected={isChat} />
      </div>
      <div className="items-center justify-center self-center">
        <div className="relative flex h-10 w-10">
          <Image
            src="/images/discover/mock-profile/mock-1.jpg"
            fill
            alt="logo"
            className="self-center rounded-full border-2 border-white	 object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

export function NavBarMobile({ className }: { className?: string }) {
  const isDiscover = usePathname().startsWith("/discover");
  const isEvent = usePathname().startsWith("/myevent");
  const isChat = usePathname().startsWith("/chat");
  return (
    <nav
      className={cn("fixed bottom-4 z-50 w-full justify-center ", className)}
    >
      <div className=" z-50 mx-auto flex h-[68px] w-[80%] max-w-[448px] justify-between rounded-full bg-secondary-400 px-9 lg:hidden">
        <NavItem link="/discover" icon={faCompass} isSelected={isDiscover} />
        <NavItem link="/myevent" icon={faCalendarCheck} isSelected={isEvent} />
        <NavItem link="/chat" icon={faComment} isSelected={isChat} />
        <div className="items-center justify-center self-center">
          <div className="relative flex h-10 w-10">
            <Image
              src="/images/discover/mock-profile/mock-1.jpg"
              fill
              alt="logo"
              className="self-center rounded-full border-2 border-white object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
