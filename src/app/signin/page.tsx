import { serverapi } from "@/trpc/server";
import { redirect } from "next/navigation";
import { signIn } from "../../action/auth";

export default async function SignIn() {
  const user = await serverapi.auth.me.query();

  if (user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="font-bold">Sign in</h1>

        <form action={signIn} className="flex flex-col gap-4 text-black">
          <input
            className="rounded-md p-2"
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            className="rounded-md p-2"
            type="password"
            name="password"
            placeholder="password"
          />

          <button
            type="submit"
            className="rounded-md bg-violet-500 p-4 text-white"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
