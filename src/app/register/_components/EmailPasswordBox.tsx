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
}

export default function EmailPasswordBox(props: EmailPasswordBoxProps) {
  const {
    setPasswordMatch,
    setPasswordValid,
    setEmailValid,
    setEmailAlreadyReg,
  } = props;

  const checkConfirmPassword = () => {
    const password = document.getElementById("Password") as HTMLInputElement;
    const confirmPassword = document.getElementById(
      "Confirm Password",
    ) as HTMLInputElement;
    if (!!confirmPassword && !!password && confirmPassword.value != "") {
      if (password.value == confirmPassword.value) {
        (document.getElementById("message") as HTMLInputElement).style.color =
          "green";
        (document.getElementById("message") as HTMLInputElement).innerHTML = "";
        setPasswordMatch(true);
      } else {
        (document.getElementById("message") as HTMLInputElement).style.color =
          "red";
        (document.getElementById("message") as HTMLInputElement).innerHTML =
          "not matching";
        setPasswordMatch(false);
      }
    }
  };

  const checkValidPassword = () => {
    const password = document.getElementById("Password") as HTMLInputElement;
    if (!!password) {
      if (password.value.length >= 8) {
        // add additional condition here
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }
    }
  };

  const checkValidEmail = () => {
    const email = document.getElementById("Email") as HTMLInputElement;
    if (!!email) {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      console.log(
        `check email: ${email.value} \n valid = `,
        email.value.match(validRegex),
      );
      if (email.value.match(validRegex)) {
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
        <form className="flex h-full w-full max-w-[420px] flex-col gap-y-2">
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
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
              id="Password"
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
              id="Confirm Password"
              placeholder="Enter your password"
              onKeyUp={() => {
                checkConfirmPassword();
                checkValidPassword();
              }}
            />
          </div>
          <span id="message"></span>
        </form>
      </CardContent>
    </Card>
  );
}
