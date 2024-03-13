"use client";
import { DatePicker } from "@/app/_components/DatePicker";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  faCamera,
  faMinus,
  faSliders,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/utils/tailwind-merge";
import { api } from "@/trpc/react";
import Image from "next/image";
import { uploadFiles } from "@/components/ui/upload";

interface EditProfileButtonProps {
  cUsername: string;
  cGender: string;
  cBio: string;
  cDOB: Date;
  cProfileURL: string;
}

export default function EditProfileButton(props: EditProfileButtonProps) {
  const { cUsername, cDOB, cBio, cGender, cProfileURL } = props;
  const [gender, setGender] = useState(cGender);
  const [usernameText, setUsernameText] = useState(cUsername);
  const [bioText, setBioText] = useState(cBio);
  const [DOB, setDOB] = useState<Date | undefined>(cDOB);
  const [notice, setNotice] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isClose, setClose] = useState(false);
  const [profileURL, setProfileURL] = useState(cProfileURL);
  useEffect(() => {
    setClose(false);
  }, [isOpen]);
  useEffect(() => {
    setOpen(false);
  }, [isClose]);

  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: (data) => {
      console.log(data);
      console.log("success");
      handleClose();
      window.location.reload();
    },
    onError: (error, variables) => {
      console.log(error, variables);
      console.log("error");
    },
  });
  const testUsername = api.auth.isAKAAlreadyExist.useMutation();
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const usernameInput = formData.get("Username") as string | null;
    const bioInput = formData.get("Bio") as string | null;
    const genderInput = gender;
    const DOBInput = DOB;
    const imageInput = formData.get("Image") as File | null;

    if (
      !gender ||
      !usernameInput ||
      !DOBInput ||
      gender == "Custom" ||
      gender == ""
    ) {
      setNotice("Please fill in your details.");
      return;
    }

    const isUsernameDup = async () => {
      return (
        (await testUsername.mutateAsync({
          aka: usernameInput,
        })) && usernameInput != cUsername
      );
    };

    if (await isUsernameDup()) {
      setNotice("This username is already used.");
      return;
    }

    let imageUrl;
    if (!!imageInput && imageInput.name != "") {
      const files = [imageInput];
      const res = await uploadFiles("signupProfileUploader", {
        files,
      });
      if (res.length !== 1) {
        setNotice("An error occurred");
        return;
      }
      imageUrl = res[0]?.url ? res[0].url : "";
    } else {
      imageUrl = profileURL;
    }

    try {
      updateProfile.mutate({
        bio: bioInput ? bioInput : "",
        gender: genderInput,
        aka: usernameInput,
        dateOfBirth: DOBInput,
        imgURL: imageUrl,
      });
    } catch (error) {
      if (error instanceof Error) {
        setNotice(error.message);
      } else {
        setNotice("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    console.log(notice);
  }, [notice]);

  const handleClose = () => {
    setClose(true);
    setNotice("");
    setGender(cGender);
    setUsernameText(cUsername);
    setBioText(cBio);
    setDOB(cDOB);
    setProfileURL(cProfileURL);
    return;
  };

  return (
    <Dialog
      onOpenChange={() => {
        setOpen(true);
      }}
      open={isOpen && !isClose}
    >
      <DialogTrigger className="text-h4 ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-xl bg-primary-500 font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-primary-100 lg:w-[126px]">
        Edit Profile
      </DialogTrigger>
      <DialogContent className="h-fit max-h-[90vh] w-full max-w-[95vw] overflow-y-scroll rounded-md bg-white p-0 md:max-w-[644px]">
        <form
          ref={formRef}
          className="flex w-full flex-col gap-y-6 rounded-md bg-white p-6 md:max-w-[644px]"
        >
          <div className="h3 w-full text-center font-bold text-black">
            Edit Profile
          </div>
          <div className="flex h-fit w-full justify-center">
            <div className="relative h-[155px] w-[155px] rounded-full">
              <Image
                className="items-center justify-center rounded-full"
                src={profileURL}
                fill
                alt="Profie"
              />
              <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-neutral-500 bg-neutral-50 p-1 text-neutral-500">
                <FontAwesomeIcon icon={faCamera} />
                <Input
                  type="file"
                  name="Image"
                  className="absolute h-7 w-7 rounded-full opacity-0"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      if (!file) return;
                      const url = URL.createObjectURL(file);
                      setProfileURL(url);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-y-4">
              <div className="flex w-full flex-col gap-y-1">
                <Label className="h5 text-high" htmlFor="Username">
                  Username
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
              <div className="flex w-full flex-col gap-y-1">
                <Label className="h5 text-high" htmlFor="Bio">
                  Bio
                </Label>
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
              <div className="flex w-full flex-col gap-y-1">
                <Label className="h5 text-high" htmlFor="Date of birth">
                  Date of birth
                </Label>
                <DatePicker date={DOB} setDate={setDOB} />
              </div>
              <GenderSelector gender={gender} setGender={setGender} />
            </div>
            <div className="flex flex-row-reverse">
              {notice && <p className="h-0 text-sm text-red-500">{notice}</p>}
            </div>
          </div>
          <div className="flex h-fit w-full flex-row-reverse gap-x-3">
            <span
              className="inline-flex h-10 w-24 items-center justify-center rounded-xl bg-primary-500 text-white hover:cursor-pointer hover:bg-primary-600 disabled:bg-primary-100"
              onClick={handleSubmit}
            >
              Confirm
            </span>
            <span
              className="inline-flex h-10 w-20 items-center justify-center rounded-xl border border-primary-500 bg-white text-primary-500 hover:cursor-pointer hover:border-primary-600 hover:text-primary-600 disabled:bg-primary-100"
              onClick={handleClose}
            >
              Cancel
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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
      "flex h-20 w-20 aspect-square flex-col gap-y-1 rounded-xl border border-solid py-2 px-0",
      selectedGender == gender
        ? "border-primary-500 bg-primary-100"
        : "border-primary-50 bg-primary-50",
    );
  };

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="flex w-full flex-col items-center gap-y-1 md:items-start">
        <Label className="h5 text-high">Select your Gender</Label>
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
        <Label className="body5" htmlFor="Custom Gender">
          Custom Gender
        </Label>
        <Input
          value={isCustom ? genderText : ""}
          disabled={!isCustom}
          className="h-9"
          ref={customGenderRef}
          placeholder="Custom your gender"
          onChange={(e) => {
            e.preventDefault();
            setGender(e.target.value);
            setGenderText(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
