"use client";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faKey} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";


export default function ForgetPassword() {
  const { data: user } = api.auth.me.useQuery();
  const [status, setStatus] = useState<"idle" | "loading" | "done">("loading");
  const [buttonText,setButtonText] = useState<string>("send");
  const [url, setUrl] = useState<URL | null>(null);
  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    setUrl(new URL(window.location.href));
    setStatus("idle");
  }, []);

  const mutate = api.auth.resetPasswordByEmail.useMutation({});
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    if (!url) {
      setStatus("idle");
      return;
    }
    let email = (e.currentTarget.email?.value as string) ?? "";
    if (!email) {
      setStatus("idle");
      return;
    }
    try {
      await mutate.mutateAsync({
        email: email,
        url: url.origin,
      });
        toast({
          title: "Verify link sent",
          description: "Verify link is already sent to your email.",
          duration: 3000,
        });
      setStatus("done");
      const timer = (x: number) =>{
      if(x === 0) {
        setStatus("idle");
        setButtonText('Send');
        return ;
      }
      setButtonText(`Resend (${x})`);
      return setTimeout(() => {timer(--x)}, 1000)
      }
      timer(5);
    } catch (e) {
      setStatus("idle");
    }
  };
  const { toast } = useToast();
  return (
    <main className="flex h-screen bg-white p-6 lg:p-14">
      <div className="flex h-full w-full flex-1 flex-col gap-2">
        <Link href="/" className="absolute">
          <button className="absolute flex h-6 w-6 flex-row items-center justify-center">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="absolute h-4 text-high"
            />
          </button>
        </Link>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-full w-full justify-center rounded-4xl px-6 py-10 lg:h-[493px] lg:w-[846px] lg:items-center lg:px-0 lg:py-0">
            <div className="flex w-full flex-col items-center gap-9 lg:w-[412px] lg:justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-400 lg:h-[60px] lg:w-[60px]">
                <FontAwesomeIcon
                  icon={faKey}
                  className="h-12 text-neutral-0 lg:h-8"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="h3 lg:h2 font-extrabold text-primary-900 lg:font-extrabold">
                  Forgot Password
                </div>
                <div className="h6 text-medium">
                  Enter your email for the verification process,we will send
                  verify link to your email
                </div>
              </div>
              <div className="flex w-full flex-1 flex-col items-center gap-2 lg:gap-9">
                <form
                  onSubmit={handleSubmit}
                  className="flex h-full w-full flex-col justify-between gap-9 text-black lg:h-fit lg:justify-normal"
                >
                  <div className="flex w-full flex-col gap-1">
                    <Label htmlFor="email" className="body5">
                      Email
                    </Label>
                    <Input
                      className="w-full"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    size={"lg"}
                    disabled={status === "loading" || status === "done"}
                  >
                    {buttonText}
                  </Button>
                </form>
                <div className="h5 flex w-full flex-row justify-center gap-2">
                  <div className="text-primary-700">
                    Don’t have an account yet?
                  </div>
                  <Link href="/signup" className="text-secondary-500">
                    Sign up now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
