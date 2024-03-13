"use client";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCircleInfo,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function ForgetPassword() {
  const { data: user } = api.auth.me.useQuery();
  const [status, setStatus] = useState<"idle" | "loading" | "done">("loading");
  const [buttonText, setButtonText] = useState<string>("Send");
  const [url, setUrl] = useState<URL | null>(null);
  useEffect(() => {
    if (user) {
      redirect("/signin");
    }
  }, [user]);

  useEffect(() => {
    setUrl(new URL(window.location.href));
    setStatus("idle");
  }, []);

  const mutate = api.auth.resetPasswordByEmail.useMutation({});
  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      const timer = (x: number) => {
        if (x === 0) {
          setStatus("idle");
          setButtonText("Send");
          return;
        }
        setButtonText(`Resend (${x})`);
        return setTimeout(() => {
          timer(--x);
        }, 1000);
      };
      timer(30);
    } catch (e) {
      setStatus("idle");
    }
  };

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);
  return (
    <main
      className="flex h-screen bg-white p-6 lg:p-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-full w-full flex-1 flex-col gap-2">
        <Link href="/" className="absolute">
          <button className="absolute flex h-6 w-6 flex-row items-center justify-center">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="absolute text-high"
              size="lg"
            />
          </button>
        </Link>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-full w-full justify-center rounded-4xl px-6 py-10 lg:h-[493px] lg:w-[846px] lg:items-center lg:px-0 lg:py-0">
            <div className="flex w-full flex-col items-center gap-9 lg:w-[412px] lg:justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-400 lg:h-[60px] lg:w-[60px]">
                <FontAwesomeIcon
                  icon={faKey}
                  className="text-neutral-0 lg:h-8"
                  size="3x"
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
                  onSubmit={handlesubmit}
                  className="flex h-full w-full flex-col justify-between gap-9 text-black lg:h-fit lg:justify-normal"
                >
                  <div className="flex w-full flex-col gap-1">
                    <Label htmlFor="email" className="body5">
                      Email
                    </Label>
                    <Input
                      className="w-full"
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          className="text-red-500"
                          size="xs"
                        />
                        <p className="px-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      </div>
                    )}
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
