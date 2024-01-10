import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function SignIn() {
  let user = await api.auth.me.query();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>YOUR PROFILE</h1>
        <div className="flex flex-col gap-4">
          <p>
            name: {user.firstName} {user.lastName}
          </p>
          <p>username: {user.userName}</p>
          <p>email: {user.email}</p>
          <p>id: {user.userId}</p>
          <p>gender: {user.gender}</p>
        </div>
      </div>
    </main>
  );
}
