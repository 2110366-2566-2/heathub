import { topUp } from "@/action/payment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { serverapi } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await serverapi.auth.me.query();
  if (!user) {
    redirect("/");
  }

  const balance = await serverapi.profile.balance.query();

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
          <p>balance: {balance / 100}THB</p>
        </div>
        <form action={topUp}>
          <Input type="number" name="price" className="text-high" />
          <Button>TOP UP</Button>
        </form>
      </div>
    </main>
  );
}
