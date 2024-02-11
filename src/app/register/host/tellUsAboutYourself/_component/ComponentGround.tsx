"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RegisterFormBox from "./RegisterFormBox";

export default function ComponentsGround() {
  const [gender, setGender] = useState<string>();

  const router = useRouter();
  const handleButtonClick = () => {
    const firstnameInput = document.getElementById("Firstname");
    const lastnameInput = document.getElementById("Lastname");
    const AKAInput = document.getElementById("AKA");
    const BioInput = document.getElementById("Bio");
    if (
      !firstnameInput ||
      !lastnameInput ||
      !AKAInput ||
      !gender ||
      gender == "custom" ||
      gender == ""
    ) {
      (document.getElementById("Notice") as HTMLInputElement).innerHTML =
        "Please fill in your details.";
      return;
    }
    router.push("/register/host/interest");
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6">
      <div className="md:h1-bold h2-bold text-primary-900">
        Tell us about yourself
      </div>
      <div className="">
        <RegisterFormBox setGender={setGender} />
        <span
          className="h5 ml-5 overflow-visible text-red-600"
          id="Notice"
        ></span>
      </div>
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
