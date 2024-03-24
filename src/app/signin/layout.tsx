import "@/styles/globals.css";
import { serverapi } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverapi.auth.me.query();

  if (user) {
    if (user.role === "admin") {
      return redirect("/admin");
    }
    return redirect("/discover");
  }

  return <>{children}</>;
}
