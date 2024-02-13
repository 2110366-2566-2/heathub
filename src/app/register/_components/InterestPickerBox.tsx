"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useState } from "react";
import { chownSync } from "fs";

interface InterestPickerBoxProps {
  selectedInterestList: string[];
  setSelectedInterestList: (list: string[]) => void;
}

export default function InterestPikerBox(props: InterestPickerBoxProps) {
  const allInterestList = [
    "ab",
    "def",
    "1234",
    "56",
    "abcd",
    "efghijk",
    "fghi",
  ];

  const handleSelectedInterestList = (handleItem: string) => {
    // add if don't have, remove is have
    const handledList = props.selectedInterestList;
    const index = handledList.indexOf(handleItem);
    if (index !== -1) {
      handledList.splice(index, 1);
    } else {
      handledList.push(handleItem);
    }
    console.log(handledList);
    props.setSelectedInterestList(handledList);
  };

  return (
    <Card className="h-[430px] w-full min-w-[255px] max-w-[848px] justify-center rounded-3xl border-solid border-primary-500 bg-white sm:h-[500px]">
      <CardContent className="flex w-full justify-center gap-x-4 gap-y-2 p-4 sm:px-0">
        <ToggleGroup className="flex w-full flex-wrap" type="multiple">
          {allInterestList.map((val) => {
            return (
              <Toggle
                onClick={() => {
                  handleSelectedInterestList(val);
                }}
                value={val}
                key={val}
              >
                {val}
              </Toggle>
            );
          })}
        </ToggleGroup>
      </CardContent>
    </Card>
  );
}
