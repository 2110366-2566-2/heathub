"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import InterestPikerBox from "./InterestPickerBox";
import SuccessButton from "@/app/register/_components/SuccessButton";

interface ComponentGroundProps {
  setData: (data: User) => void;
  setPage: (page: string) => void;
  data: User;
}

export default function ComponentsGround(props: ComponentGroundProps) {
  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="sm:h1-bold h2-bold text-primary-900">Interests</div>
      <InterestPikerBox />
      <div className="absolute bottom-6 sm:static">
        <SuccessButton />
      </div>
    </div>
  );
}
