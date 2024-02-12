"use client";

import { usePathname } from "next/navigation";
import { MessageList } from "./components/MessageList";
import { NavBar } from "../_components/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatMainPage =
    pathname === "/chat" ? "flex w-full md:w-fit" : "w-fit lg:flex hidden";
  return (
    <main className="min-w-screen flex min-h-screen flex-row overflow-x-hidden">
      <NavBar />
      <MessageList className={isChatMainPage} />
      {children}
    </main>
  );
}
