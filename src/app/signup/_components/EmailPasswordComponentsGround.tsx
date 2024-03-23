"use client";

import {
  isHost,
  type Host,
  type Participant,
  type User,
} from "@/app/signup/interfaces";
import { Button } from "@/components/ui/button";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { api } from "@/trpc/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/tailwind-merge";
import * as React from "react";
import { useEffect } from "react";
import { z } from "zod";

interface ComponentGroundProps {
  setData: (data: User) => void;
  setPage: Dispatch<
    SetStateAction<
      | "ChooseRole"
      | "EmailPassword"
      | "HostDetails"
      | "ParticipantDetails"
      | "HostInterest"
    >
  >;
  data: User;
}

const emailSchema = z.string().email();

export default function ComponentsGround(props: ComponentGroundProps) {
  const { setData, setPage, data } = props;

  const formRef = useRef<HTMLFormElement>(null);

  const [isValid, setValid] = useState<boolean>(false);
  const [emailNotice, setEmailNotice] = useState<string>("");

  const testEmail = api.auth.isEmailAlreadyExist.useMutation();

  const isEmailDup = async (email: string) => {
    return await testEmail.mutateAsync({
      email: email,
    });
  };

  const [emailText, setEmailText] = useState(data.Email ? data.Email : "");
  const [passwordText, setPasswordText] = useState(
    data.Password ? data.Password : "",
  );
  const [cfPasswordText, setCfPasswordText] = useState(
    data.Password ? data.Password : "",
  );

  const [passwordNotice, setPasswordNotice] = useState<string>("");

  const [confirmPasswordNotice, setConfirmPasswordNotice] =
    useState<string>("");

  const formCheck = () => {
    console.log("formCheck");
    if (emailNotice != "This Email is already exits.") {
      setEmailNotice("");
    }
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

  useEffect(() => {
    formCheck();
  });

  const handleButtonClick = async () => {
    console.log(isValid);
    if (!formRef.current || !isValid) {
      return;
    }

    const formData = new FormData(formRef.current);
    const password = formData.get("Password") as string | null;
    const email = formData.get("Email") as string | null;

    try {
      if (!(await isEmailDup(email ? email : ""))) {
        if (isHost(data)) {
          const host: Host = {
            Firstname: data.Firstname ?? "",
            Lastname: data.Lastname ?? "",
            Username: data.Username ?? "",
            Bio: data.Bio ?? "",
            DOB: data.DOB ?? new Date(),
            Gender: data.Gender ?? "",
            Email: email ? email : "",
            Password: password ? password : "",
            Interest: data.Interest ?? [],
            Image: data.Image ?? null,
          };
          setData(host);
          setPage("HostDetails");
        } else {
          const participant: Participant = {
            Firstname: data.Firstname ?? "",
            Lastname: data.Lastname ?? "",
            Username: data.Username ?? "",
            DOB: data.DOB ?? new Date(),
            Gender: data.Gender ?? "",
            Email: email ? email : "",
            Password: password ? password : "",
            Image: data.Image ?? null,
          };
          setData(participant);
          setPage("ParticipantDetails");
        }
      } else {
        setEmailNotice("This Email is already exits.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setEmailNotice(error.message);
      } else {
        setEmailNotice("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-y-8 md:max-w-[506px]">
      <div className="h1 text-center font-extrabold text-primary-900">
        Create your account
      </div>
      <div className="flex w-full flex-col items-center gap-y-10">
        <form
          ref={formRef}
          className="flex w-full flex-col items-center gap-y-6"
        >
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Email" className="font-semibold">
              Email
            </Label>
            <Input
              value={emailText}
              type="text"
              name="Email"
              placeholder="Enter your Email"
              onKeyUp={formCheck}
              onChange={(e) => {
                setEmailText(e.currentTarget.value);
              }}
            />
            <span className="text-sm text-red-500">{emailNotice}</span>
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Password" className="font-semibold">
              Password
            </Label>
            <Input
              value={passwordText}
              type="password"
              name="Password"
              placeholder="Enter your password"
              onKeyUp={formCheck}
              onChange={(e) => {
                setPasswordText(e.currentTarget.value);
              }}
            />
            <div
              className={cn("text-sm text-placeholder ", {
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
              value={cfPasswordText}
              type="password"
              name="Confirm Password"
              placeholder="Enter your password"
              onKeyUp={formCheck}
              onChange={(e) => {
                setCfPasswordText(e.currentTarget.value);
              }}
            />
            <span className="text-sm text-red-500">
              {confirmPasswordNotice}
            </span>
          </div>
        </form>
        <Button
          className="h-12 w-full bg-primary-500 text-white sm:static"
          variant="default"
          onClick={handleButtonClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
