"use client";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "../../action/auth";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"



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
      {/* ส่วนที่เป็นหน้าเปล่า */}
      <div className="flex-1 bg-gradient-to-b from-primary-300 to-secondary-200 text-white">
        {/* นำเนื้อหาจาก BlankPage มาแสดงที่นี่ */}
      </div>

      {/* ส่วน login ที่เขียนเอง */}
      <div className="flex-1 bg-purple-100">
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <div className="h1-bold">Login</div>

            <form action={signInHandler} className="flex flex-col gap-4 text-black">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              {error && <p className="text-red-500">{error}</p>}
              <Button variant="link" className="px-0 h-2 justify-start">Forgot your password?</Button>
              <Button type="submit" disabled={loading}>
                Login
              </Button>
            </form>
            <div className="flex items-center gap-0"> {/* เพิ่มคลาส flex และ gap ให้ทั้ง div */}
              <div className="">Don't have an account yet?</div>
              <Button variant="link" className="text-secondary-400">Sign up now</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}