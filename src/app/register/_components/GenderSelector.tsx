"use client";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { faFemale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GenderSelectorProps {
  setGender: (gender: string) => void;
}

export default function GenderSelector(props: GenderSelectorProps) {
  const [currentGender, setCurrentGender] = useState<string>();
  const [isCustom, setCustom] = useState<boolean>(false);

  useEffect(() => {
    if (currentGender == "Custom") {
      setCustom(true);
    } else {
      setCustom(false);
    }
  }, [currentGender]);

  const checkToggle = (gender: string): string => {
    if (currentGender == gender) {
      return "flex h-full w-full flex-col gap-y-1 rounded-xl border border-solid border-primary-500 bg-primary-100 py-2 px-4";
    }
    return "flex h-full w-full flex-col gap-y-1 rounded-xl border border-solid border-primary-50 bg-primary-50 py-2 px-4";
  };

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex w-full flex-col gap-y-1">
        <div className="h5 text-center">Select your Gender</div>
        <ToggleGroup
          className="grid aspect-square w-52 grid-cols-2 gap-4 self-center p-4 md:w-full"
          type="single"
          value={currentGender}
          onValueChange={(val) => {
            setCurrentGender(val);
            if (val == "Custom" && !!document.getElementById("Custom Gender")) {
              const customInput = document.getElementById(
                "Custom Gender",
              ) as HTMLInputElement;
              props.setGender(customInput.value);
              return;
            }
            props.setGender(val);
          }}
        >
          <ToggleGroupItem
            className={checkToggle("Male")}
            value="Male"
            aria-label="Toggle Male"
          >
            <FontAwesomeIcon className="" icon={faFemale} />
            <div className="body6 max-h-4 text-primary-500">Male</div>
          </ToggleGroupItem>
          <ToggleGroupItem
            className={checkToggle("Female")}
            value="Female"
            aria-label="Toggle Female"
          >
            <FontAwesomeIcon className="" icon={faFemale} />
            <div className="body6 max-h-4 text-primary-500">Female</div>
          </ToggleGroupItem>
          <ToggleGroupItem
            className={checkToggle("Custom")}
            value="Custom"
            aria-label="Toggle Custom"
          >
            <FontAwesomeIcon className="" icon={faFemale} />
            <div className="body6 max-h-4 text-primary-500">Custom</div>
          </ToggleGroupItem>
          <ToggleGroupItem
            className={checkToggle("NotToSay")}
            value="NotToSay"
            aria-label="Toggle NotToSay"
          >
            <FontAwesomeIcon className="" icon={faFemale} />
            <div className="body6 max-h-4 overflow-x-visible text-primary-500">
              Prefer Not {"\n"} To Say
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {isCustom ? (
        <div className="flex w-full flex-col space-y-1.5">
          <Label className="body5" htmlFor="Custom gender">
            Custom Gender
          </Label>
          <Input
            className="h-9"
            id="Custom Gender"
            placeholder="Custom your gender"
            onKeyUp={() => {
              const customInput = document.getElementById(
                "Custom Gender",
              ) as HTMLInputElement;
              props.setGender(customInput.value);
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
