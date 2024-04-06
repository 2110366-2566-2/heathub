"use client";

import { type Host, type User } from "@/app/signup/interfaces";
import { Button } from "@/components/ui/button";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { api } from "@/trpc/react";
import { uploadFiles } from "@/components/ui/upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  faCamera,
  faMars,
  faMinus,
  faSliders,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useEffect } from "react";
import Image from "next/image";
import { DatePicker } from "@/app/_components/DatePicker";
import { cn } from "@/utils/tailwind-merge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";

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

export default function ComponentsGround(props: ComponentGroundProps) {
  const { setData, setPage, data } = props;

  const [gender, setGender] = useState<string>(data.Gender);
  const [notice, setNotice] = useState<string>("");
  const [DOB, setDOB] = useState<Date | undefined>(data.DOB);

  const testUsername = api.auth.isAKAAlreadyExist.useMutation();

  const isUsernameDup = async (username: string) => {
    return await testUsername.mutateAsync({
      aka: username,
    });
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleButtonClick = async () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    const firstnameInput = formData.get("Firstname") as string | null;
    const lastnameInput = formData.get("Lastname") as string | null;
    const usernameInput = formData.get("Username") as string | null;
    const bioInput = formData.get("Bio") as string | null;
    const DOBInput = DOB;
    const imageInput =
      !!(formData.get("Image") as File | null) &&
      (formData.get("Image") as File | null)?.name != ""
        ? (formData.get("Image") as File)
        : !!(data as Host).Image && (data as Host).Image?.name != ""
          ? (data as Host).Image
          : null;

    if (
      !gender ||
      !firstnameInput ||
      !lastnameInput ||
      !usernameInput ||
      !DOBInput ||
      gender == "Custom" ||
      gender == ""
    ) {
      setNotice("Please fill in your details.");
      return;
    } else if (!imageInput || imageInput.name == "") {
      setNotice("Please upload a profile picture.");
      return;
    } else {
      try {
        if (await isUsernameDup(usernameInput ? usernameInput : "")) {
          setNotice("This username is already exits.");
          return;
        }
      } catch (error) {
        if (error instanceof Error) {
          setNotice(error.message);
        } else {
          setNotice("Something went wrong. Please try again.");
        }
        return;
      }
    }

    const host: Host = {
      Firstname: firstnameInput,
      Lastname: lastnameInput,
      Username: usernameInput,
      Bio: bioInput ? bioInput : "",
      DOB: DOB,
      Gender: gender,
      Email: data.Email,
      Password: data.Password,
      Interest: (data as Host).Interest ?? [],
      Image: imageInput,
    };
    setData(host);
    setNotice("");
    setPage("HostInterest");
  };

  const host = data as Host;
  const [firstText, setFirstText] = useState(host.Firstname ?? "");
  const [lastText, setLastText] = useState(host.Lastname ?? "");
  const [usernameText, setUsernameText] = useState(host.Username ?? "");
  const [bioText, setBioText] = useState(host.Bio ?? "");
  const [DOBText, setDOBText] = useState<Date | undefined>(host.DOB);
  useEffect(() => {
    setDOB(DOBText);
  }, [DOBText, setDOB]);
  const [imageUrl, setimageUrl] = useState(
    !!host.Image && host.Image?.name != ""
      ? URL.createObjectURL(host.Image)
      : "",
  );

  const autoSave = () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    const firstnameInput = formData.get("Firstname") as string | null;
    const lastnameInput = formData.get("Lastname") as string | null;
    const usernameInput = formData.get("Username") as string | null;
    const bioInput = formData.get("Bio") as string | null;
    const imageInput =
      !!(formData.get("Image") as File | null) &&
      (formData.get("Image") as File | null)?.name != ""
        ? (formData.get("Image") as File)
        : !!(data as Host).Image && (data as Host).Image?.name != ""
          ? (data as Host).Image
          : null;

    const host: Host = {
      Firstname: firstnameInput ?? "",
      Lastname: lastnameInput ?? "",
      Username: usernameInput ?? "",
      Bio: bioInput ? bioInput : "",
      DOB: DOB,
      Gender: gender,
      Email: data.Email,
      Password: data.Password,
      Interest: (data as Host).Interest ?? [],
      Image: imageInput,
    };
    setData(host);
  };

  useEffect(() => {
    autoSave();
  }, [firstText, lastText, usernameText, bioText, DOB, gender, imageUrl]);

  const uploadImage = async () => {
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const imageInput = formData.get("Image") as File | null;

    if (!imageInput || imageInput?.name == "") {
      return;
    }

    const files = [imageInput];
    const res = await uploadFiles("signupProfileUploader", {
      files,
    });
    if (res.length !== 1) {
      setNotice("An error occurred");
      return;
    }
  };

  useEffect(() => {
    void uploadImage();
  }, [imageUrl]);

  return (
    <div className="flex w-full flex-col items-center gap-y-8">
      <form
        ref={formRef}
        className="mdp-6 flex w-full max-w-[880px] flex-col items-center gap-y-8"
      >
        <div className="h1 text-center font-extrabold text-high">
          Tell us about yourself
        </div>
        <div className="flex w-full flex-col gap-y-4 md:flex-row md:gap-x-6">
          <div className="relative h-40 w-40 self-center rounded-full bg-slate-200 md:self-start">
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
            <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-neutral-500 bg-neutral-50 p-1 text-neutral-500">
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
                  }
                }}
              />
            </div>
          </div>
          <div className="flex grow flex-col gap-y-4">
            <div className="flex w-full flex-col gap-y-1.5">
              <Label className="inline-flex" htmlFor="Firstname">
                Firstname
                <div className="text-red-600">*</div>
              </Label>
              <Input
                value={firstText}
                type="text"
                className="h-9"
                name="Firstname"
                placeholder="Enter your firstname"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setFirstText("");
                  } else {
                    setFirstText(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1),
                    );
                  }
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-y-1.5">
              <Label className="inline-flex" htmlFor="Lastname">
                Lastname
                <div className="text-red-600">*</div>
              </Label>
              <Input
                value={lastText}
                type="text"
                className="h-9"
                name="Lastname"
                placeholder="Enter your lastname"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setLastText("");
                  } else {
                    setLastText(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1),
                    );
                  }
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-y-1.5">
              <Label className="inline-flex" htmlFor="Username">
                Username
                <div className="text-red-600">*</div>
              </Label>
              <Input
                value={usernameText}
                type="text"
                className="h-9"
                name="Username"
                placeholder="Enter your username"
                onChange={(e) => {
                  setUsernameText(e.target.value);
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-y-1.5">
              <Label htmlFor="Bio">Bio</Label>
              <Textarea
                value={bioText}
                className="h-9 resize-none"
                name="Bio"
                placeholder="Enter your bio"
                onChange={(e) => {
                  setBioText(e.target.value);
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-y-1.5">
              <Label className="inline-flex" htmlFor="Date of birth">
                Date of birth
                <div className="text-red-600">*</div>
              </Label>
              <DatePicker date={DOBText} setDate={setDOBText} />
            </div>
            <div className="h-[0.5px] bg-neutral-300"></div>
            <div className="h-full">
              <GenderSelector gender={host.Gender} setGender={setGender} />
            </div>
          </div>
        </div>
      </form>
      <span className="h5 h-0 overflow-visible text-red-600" id="Notice">
        {notice}
      </span>
      <Button
        className="h-12 w-[108px] bg-primary-500 text-white"
        variant="default"
        onClick={() => {
          void handleButtonClick();
        }}
      >
        Next
      </Button>
    </div>
  );
}

interface GenderSelectorProps {
  setGender: (gender: string) => void;
  gender: string;
}

function GenderSelector(props: GenderSelectorProps) {
  const { setGender, gender } = props;
  const [genderText, setGenderText] = useState(
    gender == "Male" || gender == "Female" || gender == "NotToSay"
      ? ""
      : gender,
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    gender == "Male" ||
      gender == "Female" ||
      gender == "NotToSay" ||
      gender == ""
      ? gender
      : "Custom",
  );
  const [isCustom, setCustom] = useState<boolean>(false);

  const customGenderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedGender == "Custom") {
      setCustom(true);
    } else {
      setCustom(false);
    }
  }, [selectedGender]);

  const checkToggle = (gender: string): string => {
    return cn(
      "flex h-20 w-20 aspect-square flex-col gap-y-1 rounded-xl border border-solid py-2 px-0 border-primary-500 data-[state=on]:bg-secondary-400 data-[state=on]:text-white data-[state=on]:border-none  ",
      selectedGender == gender ? "bg-white" : "bg-white",
    );
  };

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="flex w-full flex-col items-center gap-y-1 md:items-start">
        <Label className="h4 inline-flex font-bold text-high">
          Select your Gender
          <div className="text-red-600">*</div>
        </Label>
        <ToggleGroup
          className="grid w-fit grid-cols-2 gap-4 p-4 md:flex md:flex-row md:justify-start"
          type="single"
          value={selectedGender}
          onValueChange={(val) => {
            setSelectedGender(val);
            const customInput = customGenderRef.current?.value;
            if (val == "Custom" && customInput) {
              setGender(customInput);
              return;
            }
            setGender(val);
          }}
        >
          <ToggleGroupItem
            className={checkToggle("Male")}
            value="Male"
            aria-label="Toggle Male"
          >
            <FontAwesomeIcon className="h-6 w-6" icon={faMars} />
            <div className="h6 max-h-4">Male</div>
          </ToggleGroupItem>
          <ToggleGroupItem
            className={checkToggle("Female")}
            value="Female"
            aria-label="Toggle Female"
          >
            <FontAwesomeIcon className="h-6 w-6" icon={faVenus} />
            <div className="h6 max-h-4">Female</div>
          </ToggleGroupItem>
          <ToggleGroupItem
            className={checkToggle("Custom")}
            value="Custom"
            aria-label="Toggle Custom"
          >
            <FontAwesomeIcon className="h-6 w-6" icon={faSliders} />
            <div className="h6 max-h-4">Custom</div>
          </ToggleGroupItem>
          <ToggleGroupItem
            className={checkToggle("NotToSay")}
            value="NotToSay"
            aria-label="Toggle NotToSay"
          >
            <FontAwesomeIcon className="h-6 w-6" icon={faMinus} />
            <div className="h6 max-h-4 overflow-x-visible leading-4">
              Prefer Not To Say
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div
        className={cn("flex w-full flex-col space-y-1 transition-all", {
          "opacity-50": !isCustom,
        })}
      >
        <Label className="body5 inline-flex" htmlFor="Custom Gender">
          Custom Gender
          {isCustom ? <div className="text-red-600">*</div> : <></>}
        </Label>
        <Input
          value={isCustom ? genderText : ""}
          disabled={!isCustom}
          className="h-9 w-full md:max-w-[242px]"
          ref={customGenderRef}
          placeholder="Custom your gender"
          onChange={(e) => {
            setGender(e.target.value);
            setGenderText(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
