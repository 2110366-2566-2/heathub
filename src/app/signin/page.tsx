"use client";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "../../action/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex min-h-screen">
      <div className="hidden flex-[1_1_555px] bg-gradient-to-b from-primary-300 to-secondary-200 md:block">
        <Quote />
      </div>

      <div className="flex-[2_2_725px]  bg-gradient-to-b from-primary-300 to-secondary-200 md:bg-purple-100 md:bg-none">
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="md:hidden">
            <Quote />
          </div>
          <div className="container flex flex-col items-center justify-center gap-6 px-4 py-6 md:gap-9 md:py-16">
            <div className="h1 text-bold text-primary-900">Login</div>
            <form action={signInHandler} className="flex flex-col gap-4 ">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                className="w-[284px] md:w-[361px] "
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="w-[284px] md:w-[361px]"
              />
              {error && <p className="h5 text-red-500">{error}</p>}
              <div className="flex flex-col gap-6 md:gap-9">
                <Button variant="link" className="h-2 justify-start px-0">
                  <Link href="/reset-password">Forgot your password?</Link>
                </Button>

                <Button
                  type="submit"
                  className="mx-20 h-12 w-[108px] md:mx-32"
                  disabled={loading}
                >
                  Login
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-0">
              <div className="h5 text-primary-700">
                Don&apos;t have an account yet?
              </div>
              <Button variant="link" className="text-secondary-400">
                <Link href="/signup">Sign up now</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Quote() {
  return (
    <div className="mb-[-10px] flex min-h-0 flex-col items-center justify-center md:h-screen">
      <Image
        src="/images/signin/group.png"
        width={565}
        height={338}
        className="ml-[-50px]"
        alt="Picture"
      />
      <div className="flex flex-col justify-center text-center">
        <div className="md:h1 h2 font-bold text-primary-900 md:font-bold">
          Find Your Perfect
        </div>
        <div className="md:h1 h2 font-bold text-primary-900 md:font-bold">
          Companion Today!
        </div>
      </div>
    </div>
  );
}
