"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import InterestPikerBox from "./InterestPickerBox";

export default function ComponentsGround() {
  const handleButtonClick = () => {
    return;
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="sm:h1-bold h2-bold text-primary-900">Interests</div>
      <InterestPikerBox />
      <Button
        className="absolute bottom-6 h-12 w-[108px] bg-primary-500 text-white sm:static"
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
