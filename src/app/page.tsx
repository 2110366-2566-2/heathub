import { serverapi } from "@/trpc/server";
import Link from "next/link";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default async function Home() {
  const user = await serverapi.auth.me.query();

  const users = await serverapi.auth.getAllUsers.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Turtoise <span className="text-[hsl(280,100%,70%)]">not</span> lonely!
        </h1>
        <DatePicker />
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {user ? user.firstName : "Loading tRPC query..."}
          </p>
        </div>
        {users.map(
          (user) =>
            user && (
              <Link href={`/chat/${user.id}`} key={user.id}>
                {user.aka}
              </Link>
            ),
        )}
        <a href="/signout">
          <button className="rounded-2xl bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
            Sign Out
          </button>
        </a>
      </div>
    </main>
  );
}
