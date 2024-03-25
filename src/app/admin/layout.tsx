import { serverapi } from "@/trpc/server";
import { redirect } from "next/navigation";
import { AdminNavbar } from "../_components/AdminNavbar";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverapi.auth.me.query();
  if (!user) return redirect("/signin");
  if (user.role !== "admin") redirect("/");

  return (
    <div className="flex h-auto flex-row bg-bgColor">
      <AdminNavbar />
      {children}
    </div>
  );
}
