"use client";
import { generateAvatar } from "@/lib/avatar";
import { api } from "@/trpc/react";
import { cn } from "@/utils/tailwind-merge";
import {
  faCalendarCheck,
  faComment,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, NavItemMobile } from "./navItem";
import LoadingCircle from "./loading-circle";

export function NavBar() {
  const pathName = usePathname();
  const isDiscover = pathName.startsWith("/discover");
  const isEvent = pathName.startsWith("/myevent");
  const isChat = pathName.startsWith("/chat");

  const { data: me, isLoading } = api.auth.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <nav className="sticky left-0 top-0 z-50 hidden h-screen w-[80px] min-w-[80px] flex-col justify-between gap-3 bg-secondary-400 px-3 py-9 shadow-sm lg:flex">
      <div className="flex h-full flex-col gap-8">
        <NavItem link="/discover" icon={faCompass} isSelected={isDiscover} />
        <NavItem link="/myevent" icon={faCalendarCheck} isSelected={isEvent} />
        <NavItem link="/chat" icon={faComment} isSelected={isChat} />
      </div>
      <div className="items-center justify-center self-center">
        <Link href="/profile">
          <div className="relative flex h-10 w-10 justify-center rounded-full border-2 border-white">
            {isLoading ? (
              <div className="h-fit w-fit self-center">
                <LoadingCircle width="32px" height="32px" />
              </div>
            ) : (
              <Image
                src={me?.profileImageURL || generateAvatar("mock-profile")}
                fill
                alt="logo"
                className="self-center rounded-full object-cover"
              />
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export function NavBarMobile({ className }: { className?: string }) {
  const isDiscover = usePathname().startsWith("/discover");
  const isEvent = usePathname().startsWith("/myevent");
  const isChat = usePathname().startsWith("/chat");

  const { data: me, isLoading } = api.auth.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <nav
      className={cn("fixed bottom-4 z-30 w-full justify-center ", className)}
    >
      <div className=" z-50 mx-auto flex h-[68px] w-[80%] max-w-[448px] justify-between rounded-full bg-secondary-400 px-9 lg:hidden">
        <NavItemMobile
          link="/discover"
          icon={faCompass}
          isSelected={isDiscover}
        />
        <NavItemMobile
          link="/myevent"
          icon={faCalendarCheck}
          isSelected={isEvent}
        />
        <NavItemMobile link="/chat" icon={faComment} isSelected={isChat} />
        <div className="items-center justify-center self-center">
          <Link href="/profile">
            <div className="relative flex h-10 w-10 justify-center rounded-full border-2 border-white">
              {isLoading ? (
                <div className="h-fit w-fit self-center">
                  <LoadingCircle width="32px" height="32px" />
                </div>
              ) : (
                <Image
                  src={me?.profileImageURL || generateAvatar("mock-profile")}
                  fill
                  alt="logo"
                  className="self-center rounded-full object-cover"
                />
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
