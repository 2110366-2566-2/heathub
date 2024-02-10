"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RegisterFormBox from "./RegisterFormBox";

export default function ComponentsGround() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/register/host/interest");
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6">
      <div className="md:h1-bold h2-bold text-primary-900">
        Tell us about yourself
      </div>
      <RegisterFormBox />
      <Button
        className="h-12 w-[108px] bg-primary-500 text-white"
        variant="outline"
        onClick={() => {
          handleButtonClick();
        }}
      >
        Next
      </Button>
    </div>
  );
}