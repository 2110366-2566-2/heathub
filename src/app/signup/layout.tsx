import "@/styles/globals.css";
import { serverapi } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function SingOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverapi.auth.me.query();
  if (user) {
    return redirect("/discover");
  }

  return <>{children}</>;
}
