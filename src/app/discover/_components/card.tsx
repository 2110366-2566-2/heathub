"use client";
import { tagIcon } from "@/utils/icon-mapping";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { Tag } from "../../_components/tag";
import Chat from "./chat";
import { type ProfilePreviewProps } from "../types";

export default function Card(props: ProfilePreviewProps) {
  const { name, age, image, interests } = props;

  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const isLaptop = useMediaQuery({ maxWidth: 1279 });
  const maxInterestsToDisplay = isMobile ? 3 : isLaptop ? 4 : 5;

  const visibleInterests = interests.slice(0, maxInterestsToDisplay);
  const hiddenInterestsCount = interests.length - maxInterestsToDisplay;

  return (
    <div className="relative mx-auto flex aspect-[7/10] max-w-[464px] flex-col gap-0 rounded-3xl shadow-md">
      <div className="relative h-full">
        <Image
          src={image}
          alt="card"
          fill
          className="rounded-t-3xl object-cover object-top"
        />
        <div className="absolute bottom-0 flex flex-col gap-2 p-4">
          <div className="flex text-start">
            <div className="h2 font-bold text-white">
              {name}, {age}
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
      </div>

      <div className="my-auto flex aspect-[4.316] w-full items-center justify-center">
        <Chat />
      </div>
    </div>
  );
}
