"use client";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "../../action/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const { data: user } = api.auth.me.useQuery();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  const signInHandler = async (e: FormData) => {
    setLoading(true);
    const err = await signIn(e);
    if (!err) {
      redirect("/");
    }
    setError(err);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-300 to-secondary-200 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="h1-bold">Sign in</div>

        <form action={signInHandler} className="flex flex-col gap-4 text-black">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          {error && <p className="text-red-500">{error}</p>}
          <Button variant="link">Forgot your password?</Button>
          <Button type="submit" disabled={loading}>
            Sign In
          </Button>
        </form>
      </div>
    </main>
  );
}
