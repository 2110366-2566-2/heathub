"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GenderSelector from "@/app/register/_components/GenderSelector";

export default function RegisterFormBox() {
  return (
    <Card className="h-[845px] w-full min-w-[382px] max-w-[600px] justify-center rounded-3xl border-solid border-primary-500 bg-white md:h-[496px] md:max-w-[845px]">
      <CardContent className="h-full w-full p-0">
        <form className="flex h-full flex-col content-center gap-y-4 p-4 md:flex-row md:gap-x-[6.28%] md:gap-y-0 md:px-[2.84%] md:py-6">
          <div className="flex flex-col justify-between md:w-[494px] md:flex-row">
            <div className="flex aspect-square w-[32.86%] min-w-[115px] items-center justify-center self-center md:h-full md:w-[32.79%] md:items-start">
              <div className="h-12 w-12 bg-black"></div>
            </div>
            <div className="flex flex-col space-y-4 md:w-[62.55%]">
              <div className="flex w-full flex-col gap-y-1.5">
                <Label htmlFor="Firstname">Firstname</Label>
                <Input
                  className="h-9"
                  id="Firstname"
                  placeholder="Enter your firstname"
                />
              </div>
              <div className="flex w-full flex-col gap-y-1.5">
                <Label htmlFor="Lastname">Lastname</Label>
                <Input
                  className="h-9"
                  id="Lastname"
                  placeholder="Enter your Lastname"
                />
              </div>
              <div className="flex w-full flex-col gap-y-1.5">
                <Label htmlFor="AKA">AKA</Label>
                <Input className="h-9" id="AKA" placeholder="Enter your aka" />
              </div>
              <div className="flex w-full flex-col gap-y-1.5">
                <Label htmlFor="Date of birth">Date of birth</Label>
                <Input id="Date of birth" placeholder="Select date" />
              </div>
            </div>
          </div>

          <div className="flex justify-center md:h-full">
            <div className="h-[0.5px] w-full bg-primary-500 md:h-full md:w-[0.5px]"></div>
          </div>

          <div className="md:w-[314px]">
            <GenderSelector />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
