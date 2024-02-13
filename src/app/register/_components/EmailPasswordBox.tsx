"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailPasswordBoxProps {
  setPasswordMatch: (isMatch: boolean) => void;
  setPasswordValid: (isValid: boolean) => void;
  setEmailValid: (isValid: boolean) => void;
  setEmailAlreadyReg: (isValid: boolean) => void;
  formRef: React.RefObject<HTMLFormElement>;
}

export default function EmailPasswordBox(props: EmailPasswordBoxProps) {
  const {
    setPasswordMatch,
    setPasswordValid,
    setEmailValid,
    setEmailAlreadyReg,
    formRef,
  } = props;

  const checkConfirmPassword = () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const password = formData.get("Password") as string | null;
    const confirmPassword = formData.get("Confirm Password") as string | null;
    if (!!confirmPassword && !!password && confirmPassword != "") {
      if (password == confirmPassword) {
        (
          document.getElementById("Notice Message") as HTMLInputElement
        ).style.color = "green";
        (
          document.getElementById("Notice Message") as HTMLInputElement
        ).innerHTML = "";
        setPasswordMatch(true);
      } else {
        (
          document.getElementById("Notice Message") as HTMLInputElement
        ).style.color = "red";
        (
          document.getElementById("Notice Message") as HTMLInputElement
        ).innerHTML = "not matching";
        setPasswordMatch(false);
      }
    }
  };

  const checkValidPassword = () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const password = formData.get("Password") as string | null;
    if (!!password) {
      if (password.length >= 8) {
        // add additional condition here
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }
    }
  };

  const checkValidEmail = () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const email = formData.get("Email") as string | null;
    if (!!email) {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      console.log(`check email: ${email} \n valid = `, email.match(validRegex));
      if (email.match(validRegex)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }

      if (true) {
        // add condition here
        setEmailAlreadyReg(true);
      } else {
        setEmailAlreadyReg(false);
      }
    }
  };

  return (
    <Card className="h-[432px] w-full min-w-[256px] max-w-[632px] justify-center rounded-3xl border-solid border-primary-500 bg-white p-6 sm:h-[388px]">
      <CardContent className="flex h-full w-full justify-center p-0">
        <form
          className="flex h-full w-full max-w-[420px] flex-col gap-y-2"
          ref={formRef}
        >
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Email">Email</Label>
            <Input
              type="text"
              name="Email"
              placeholder="Enter your Email"
              onKeyUp={() => {
                checkValidEmail();
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Password">Password</Label>
            <Input
              type="password"
              name="Password"
              placeholder="Enter your password"
              onKeyUp={() => {
                checkConfirmPassword();
                checkValidPassword();
              }}
            />
          </div>
          <div className="body5">
            The password must be at least 8 characters
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Confirm Password">Confirm Password</Label>
            <Input
              type="password"
              name="Confirm Password"
              placeholder="Enter your password"
              onKeyUp={() => {
                checkConfirmPassword();
                checkValidPassword();
              }}
            />
          </div>
          <span id="Notice Message"></span>
        </form>
      </CardContent>
    </Card>
  );
}
