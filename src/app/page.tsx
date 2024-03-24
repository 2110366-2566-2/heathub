import { serverapi } from "@/trpc/server";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { redirect } from "next/navigation";
config.autoAddCss = false;

export default async function Home() {
  const user = await serverapi.auth.me.query();
  if (!user) {
    return redirect("/signin");
  }

  if (user.role === "admin") {
    return redirect("/admin");
  }

  return redirect("/discover");
}
