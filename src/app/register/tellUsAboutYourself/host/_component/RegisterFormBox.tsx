"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GenderSelector from "../../_component/GenderSelector";

export default function RegisterFormBox() {
  return (
    <Card className="h-[1023px] w-[66%] min-w-[382px] justify-center rounded-3xl border-solid border-primary-500 bg-white md:h-[496px]">
      <CardContent className="h-full w-full p-0">
        <form className="flex h-full flex-col content-center gap-y-4 p-4 md:flex-row md:gap-x-[6.28%] md:gap-y-0 md:px-[2.84%] md:py-6">
          <div className="flex flex-col gap-x-[4.66%] md:w-[58.46%] md:flex-row">
            <div className="flex h-[115px] items-center justify-center md:h-full md:w-[32.79%] md:items-start">
              <div className="h-[50px] w-[50px] bg-black"></div>
            </div>
            <div className="flex flex-col space-y-1.5 md:w-[62.55%]">
              <Label htmlFor="Firstname">Firstname</Label>
              <Input id="Firstname" placeholder="Enter your firstname" />
              <Label htmlFor="Lastname">Lastname</Label>
              <Input id="Lastname" placeholder="Enter your Lastname" />
              <Label htmlFor="AKA">AKA</Label>
              <Input id="AKA" placeholder="Enter your aka" />
              <Label htmlFor="Bio">Bio</Label>
              <Input id="Bio" placeholder="Type your massage here" />
              <Label htmlFor="Date of birth">Date of birth</Label>
              <Input id="Date of birth" placeholder="Select date" />
            </div>
          </div>

          <div className="flex justify-center md:h-full">
            <div className="h-[0.5px] w-full bg-primary-500 md:h-full md:w-[0.5px]"></div>
          </div>

          <div className="md:w-[28.52%]">
            <GenderSelector />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
