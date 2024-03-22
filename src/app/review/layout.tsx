"use client";

import { NavBar, NavBarMobile } from "../_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-auto w-screen flex-row bg-bgColor max-lg:mb-16">
      <NavBar />
      <NavBarMobile />
      {children}
    </div>
  );
}
