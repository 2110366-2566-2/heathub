"use client";

import GenderSelector from "@/app/signup/_components/GenderSelector";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";

interface RegisterFormBoxProps {
  setGender: (gender: string) => void;
  formRef: React.RefObject<HTMLFormElement>;
}

export default function RegisterFormBox(props: RegisterFormBoxProps) {
  const { setGender, formRef } = props;
  const [firsttext, setFirstText] = useState("");
  const [lasttext, setLastText] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [, setImage] = useState<File | null>(null);

  return (
    <Card className=" w-full min-w-[256px] max-w-[600px] justify-center self-center rounded-3xl border-solid border-primary-500 bg-white md:max-w-[844px]">
      <CardContent className="flex h-full w-full p-0">
        <form
          className="flex h-full w-full flex-col content-center items-stretch gap-y-4 p-8 md:flex-row md:gap-x-8 md:gap-y-0 md:px-4 md:py-6 lg:w-auto"
          ref={formRef}
        >
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
            <div className="relative h-32 w-32 rounded-full bg-slate-200">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Profile Picture"
                  fill
                  className="rounded-full"
                />
              ) : (
                ""
              )}
              <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-neutral-500 bg-neutral-50 p-1 text-neutral-500">
                <FontAwesomeIcon icon={faCamera} />
                <Input
                  type="file"
                  name="Image"
                  className="absolute h-8 w-8 rounded-full opacity-0"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      if (!file) return;
                      const url = URL.createObjectURL(file);
                      setimageUrl(url);
                      setImage(file);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex w-full flex-col space-y-4 md:w-64 lg:w-80">
              <div className="flex w-full flex-col gap-y-1.5">
                <Label htmlFor="Firstname">Firstname</Label>
                <Input
                  value={firsttext}
                  type="text"
                  className="h-9"
                  name="Firstname"
                  placeholder="Enter your firstname"
                  onChange={(e) => {
                    setFirstText(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1),
                    );
                  }}
                />
              </div>
              <div className="flex w-full flex-col gap-y-1.5">
                <Label htmlFor="Lastname">Lastname</Label>
                <Input
                  value={lasttext}
                  type="text"
                  className="h-9"
                  name="Lastname"
                  placeholder="Enter your Lastname"
                  onChange={(e) => {
                    setLastText(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1),
                    );
                  }}
                />
              </div>
              <div className="flex w-full flex-col gap-y-1.5">
                <Label htmlFor="AKA">AKA</Label>
                <Input
                  type="text"
                  className="h-9"
                  name="AKA"
                  placeholder="Enter your aka"
                />
              </div>
              <div className="flex w-full flex-col gap-y-1.5">
                <Label htmlFor="Date of birth">Date of birth</Label>
                <Input
                  type="date"
                  name="Date of birth"
                  placeholder="Select date"
                />
              </div>
            </div>
          </div>
          <div className="h-[0.5px] bg-primary-500 md:h-auto md:w-[0.5px]"></div>
          <div className="h-full">
            <GenderSelector setGender={setGender} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
