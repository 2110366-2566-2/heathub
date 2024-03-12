"use client";
import { tagIcon } from "@/utils/icon-mapping";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { Tag } from "../../_components/tag";
import Chat from "./chat";
import { type ProfilePreviewProps } from "../types";

export default function Card(props: ProfilePreviewProps) {
  const { aka, age, image, interests } = props;

  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const isLaptop = useMediaQuery({ maxWidth: 1279 });
  const maxInterestsToDisplay = isMobile ? 3 : isLaptop ? 4 : 5;

  const visibleInterests = interests.slice(0, maxInterestsToDisplay);
  const hiddenInterestsCount = interests.length - maxInterestsToDisplay;

  return (
    <div className="relative flex aspect-[0.76] min-h-[424px] max-w-[323px] flex-col gap-0 rounded-3xl bg-white p-4 shadow-md">
      <div className="aspect-9/10 relative h-full max-h-[264px]">
        <Image
          src={image}
          alt="card"
          fill
          className="rounded-lg object-cover object-top"
        />
      </div>
      {/* aspect-[0.76]<div className="relative h-full">
        <Image
          src={image}
          alt="card"
          fill
          className="rounded-t-3xl object-cover object-top"
        />
        <div className="absolute bottom-0 flex flex-col gap-2 p-4">
          <div className="flex text-start">
            <div className="h2 font-bold text-white">
              {aka}, {age}
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {visibleInterests.sort().map((tag) => (
              <Tag key={tag} variant="ghost" icon={tagIcon[tag]} size="md">
                {tag}
              </Tag>
            ))}
            {hiddenInterestsCount > 0 && (
              <Tag key="hidden-interests" variant="ghost" size="md">
                +{hiddenInterestsCount} more
              </Tag>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
}
