"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

export default function InterestPikerBox() {
  const allInterestList = [
    "ab",
    "def",
    "1234",
    "56",
    "abcd",
    "efghijk",
    "ab",
    "def",
    "1234",
    "56",
    "abcd",
    "efghijk",
    "ab",
    "def",
    "1234",
    "56",
    "abcd",
    "efghijk",
  ];

  const showTag = () => {
    return allInterestList.map((val) => {
      <Toggle>{val}</Toggle>;
    });
  };

  return (
    <Card className="h-[430px] w-full min-w-[255px] max-w-[848px] justify-center rounded-3xl border-solid border-primary-500 bg-white sm:h-[500px]">
      <CardContent className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2 p-4 sm:px-0">
        <Toggle>abc</Toggle>
        <Toggle>defgh</Toggle>
        <Toggle>ijkl</Toggle>
        <Toggle>abc</Toggle>
        <Toggle>defgh</Toggle>
        <Toggle>ijkl</Toggle>
        <Toggle>abc</Toggle>
        <Toggle>defgh</Toggle>
        <Toggle>ijkl</Toggle>
        <Toggle>abc</Toggle>
        <Toggle>defgh</Toggle>
        <Toggle>ijkl</Toggle>
        <Toggle>abc</Toggle>
        <Toggle>defgh</Toggle>
        <Toggle>ijkl</Toggle>
        <Toggle>abc</Toggle>
        <Toggle>defgh</Toggle>
        <Toggle>ijkl</Toggle>
        <Toggle>abc</Toggle>
        <Toggle>defgh</Toggle>
        <Toggle>ijkl</Toggle>
        <Toggle>abc</Toggle>
        <Toggle>defgh</Toggle>
        <Toggle>ijkl</Toggle>
      </CardContent>
    </Card>
  );
}
