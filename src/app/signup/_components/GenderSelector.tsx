"use client";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/utils/tailwind-merge";
import {
  faFemale,
  faMars,
  faMinus,
  faSliders,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-label";
import { useEffect, useRef, useState } from "react";

interface GenderSelectorProps {
  setGender: (gender: string) => void;
  gender: string;
}

export default function GenderSelector(props: GenderSelectorProps) {
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
      "flex h-20 w-20 md:h-full md:w-full aspect-square flex-col gap-y-1 rounded-xl border border-solid py-2 px-0 md:px-4",
      selectedGender == gender
        ? "border-primary-500 bg-primary-100"
        : "border-primary-50 bg-primary-50",
    );
  };

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div className="flex w-full flex-col gap-y-1">
        <h2 className="h5 text-center font-bold">Select your Gender</h2>
        <ToggleGroup
          className="grid aspect-square w-52 grid-cols-2 gap-4 self-center p-4 md:w-full"
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
        className={cn("flex w-full flex-col space-y-1.5 transition-all", {
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
