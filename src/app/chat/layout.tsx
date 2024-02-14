"use client";

import { usePathname } from "next/navigation";
import { MessageList } from "./components/MessageList";
import { NavBar, NavBarMobile } from "../_components/navbar";

import { cn } from "@/utils/tailwind-merge";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatMainPage = pathname === "/chat" ? "flex w-full lg:w-fit" : "w-fit lg:flex hidden";
  return (
    <main className="min-w-screen flex min-h-screen flex-row overflow-x-hidden">
      <NavBar />
      <NavBarMobile className={cn({ hidden: pathname !== "/chat" })} />
      <MessageList className={isChatMainPage} pagePathName={pathname} />
      {children}
    </main>
  );
}
