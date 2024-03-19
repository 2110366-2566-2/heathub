import { serverapi } from "@/trpc/server";
import { redirect } from "next/navigation";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverapi.auth.me.query();
  if (user?.role !== "admin") redirect("/");
  return <>{children}</>;
}
