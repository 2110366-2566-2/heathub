"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { tagList, type TagList, tagIcon } from "../../../utils/icon-mapping";

interface InterestPickerBoxProps {
  selectedInterestList: string[];
  setSelectedInterestList: (list: string[]) => void;
}

export default function InterestPickerBox(props: InterestPickerBoxProps) {
  const allInterestList = tagList;
  const { selectedInterestList, setSelectedInterestList } = props;
  const handleSelectedInterestList = (handleItem: string) => {
    // add if don't have, remove is have
    const handledList = selectedInterestList;
    const index = handledList.indexOf(handleItem);
    if (index !== -1) {
      handledList.splice(index, 1);
    } else {
      handledList.push(handleItem);
    }
    setSelectedInterestList(handledList);
  };

  return (
    <Card className="w-full min-w-[256px] max-w-[848px] justify-center overflow-y-auto rounded-3xl border-solid border-primary-500 bg-white p-8">
      <CardContent className="flex w-full justify-center gap-x-4 gap-y-2">
        <ToggleGroup
          className="gap flex w-full flex-wrap gap-2"
          type="multiple"
        >
          {allInterestList.map((interestItem, index) => {
            return (
              <Toggle
                key={index}
                variant="outline"
                icon={tagIcon[interestItem]}
                size="md"
                onClick={() => {
                  handleSelectedInterestList(interestItem as string);
                }}
              >
                {interestItem}
              </Toggle>
            );
          })}
        </ToggleGroup>
      </CardContent>
    </Card>
  );
}
