"use client";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-primary-100 to-secondary-100 text-white">
      <div className="container flex flex-col items-center justify-center gap-4">
        <h1 className="h1 font-bold text-neutral-800">404</h1>
        <p className="p text-neutral-800">Look like you might have lost 🗺️</p>

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
