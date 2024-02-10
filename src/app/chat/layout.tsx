"use client";

import { usePathname } from "next/navigation";
import { MessageList} from "./components/MessageList";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatMainPage =
    pathname === "/chat" ? "flex w-full md:w-fit" : "w-fit lg:flex hidden";
  return (
    <main className="min-w-screen flex min-h-screen flex-row overflow-x-hidden">
      <nav className="sticky left-0 top-0 z-50 hidden h-screen w-[100px] flex-col justify-between gap-3 bg-blue-500 px-6 py-9 shadow-sm lg:flex"></nav>
      <MessageList className={isChatMainPage} />
      {children}
    </main>
  );
}
