import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Image from "next/image";
import Link from "next/link";
config.autoAddCss = false;

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-100 to-secondary-100 text-white">
      <div className="container flex flex-col items-center justify-center gap-4">
        <Image
          src="/svgs/logo-default.svg"
          width={420}
          height={420}
          alt="logo"
        />

        <Link href="/discover">
          <button className="rounded-2xl bg-slate-500/20 px-10 py-3 font-semibold transition hover:bg-slate-500/40">
            Discover
          </button>
        </Link>

        <Link href="/signin">
          <button className="rounded-2xl bg-slate-500/20 px-10 py-3 font-semibold transition hover:bg-slate-500/40">
            Sign In
          </button>
        </Link>
      </div>
    </main>
  );
}
