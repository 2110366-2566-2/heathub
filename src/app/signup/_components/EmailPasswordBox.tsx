"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/tailwind-merge";
import * as React from "react";
import { useState } from "react";
import { z } from "zod";

interface EmailPasswordBoxProps {
  setValid: (valid: boolean) => void;
  formRef: React.RefObject<HTMLFormElement>;
}

const emailSchema = z.string().email();

export default function EmailPasswordBox(props: EmailPasswordBoxProps) {
  const { setValid, formRef } = props;

  const [emailNotice, setEmailNotice] = useState<string>("");

  const [passwordNotice, setPasswordNotice] = useState<string>("");

  const [confirmPasswordNotice, setConfirmPasswordNotice] =
    useState<string>("");

  const formCheck = () => {
    setEmailNotice("");
    setPasswordNotice("");
    setConfirmPasswordNotice("");
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const email = formData.get("Email") as string | null;
    const password = formData.get("Password") as string | null;
    const confirmPassword = formData.get("Confirm Password") as string | null;

    let valid = true;

    if (email && !emailSchema.safeParse(email).success) {
      setValid(false);
      setEmailNotice("Invalid email");
      valid = false;
    }

    if (password && password.length < 8) {
      setValid(false);
      setPasswordNotice("Password must be at least 8 characters");
      valid = false;
    }

    if (password !== confirmPassword) {
      setValid(false);
      setConfirmPasswordNotice("Passwords do not match");
      valid = false;
    }

    if (!email || !password || !confirmPassword) {
      console.log("Invalid");
      setValid(false);
    }

    setValid(valid);
  };

  return (
    <Card className="w-fit justify-center rounded-3xl border-solid border-primary-500 bg-white p-12">
      <CardContent className="flex h-full w-full justify-center p-0">
        <form className="flex h-full w-[420px] flex-col gap-y-6" ref={formRef}>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Email" className="font-semibold">
              Email
            </Label>
            <Input
              type="text"
              name="Email"
              placeholder="Enter your Email"
              onKeyUp={formCheck}
            />
            <span className="text-sm text-red-500">{emailNotice}</span>
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Password" className="font-semibold">
              Password
            </Label>
            <Input
              type="password"
              name="Password"
              placeholder="Enter your password"
              onKeyUp={formCheck}
            />
            <div
              className={cn("text-subtle text-sm ", {
                "text-red-500": passwordNotice,
              })}
            >
              The password must be at least 8 characters
            </div>
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Confirm Password" className="font-semibold">
              Confirm Password
            </Label>
            <Input
              type="password"
              name="Confirm Password"
              placeholder="Enter your password"
              onKeyUp={formCheck}
            />
            <span className="text-sm text-red-500">
              {confirmPasswordNotice}
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
