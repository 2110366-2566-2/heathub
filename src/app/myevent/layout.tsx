import { serverapi } from "@/trpc/server";
import { NavBar, NavBarMobile } from "../_components/navbar";
import { redirect } from "next/navigation";

export default async function MyEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverapi.auth.me.query();
  if (!user) {
    return redirect("/signin");
  }

  return (
    <div className="flex h-auto flex-row bg-bgColor">
      <NavBar />
      <NavBarMobile />
      {children}
    </div>
  );
}
