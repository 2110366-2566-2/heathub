import { serverapi } from "@/trpc/server";
import { redirect } from "next/navigation";
import { AdminNavbar } from "../_components/AdminNavbar";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverapi.auth.me.query();
  if (user?.role !== "admin") redirect("/");
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}
