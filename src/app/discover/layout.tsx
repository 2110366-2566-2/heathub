import { redirect } from "next/navigation";
import { NavBar, NavBarMobile } from "../_components/navbar";
import { serverapi } from "@/trpc/server";

export default async function DiscoverLayout({
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
