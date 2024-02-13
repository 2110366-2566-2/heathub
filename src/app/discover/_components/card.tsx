"use client";
import Image from "next/image";
import { type ProfilePreviewProps } from "./profile-preview";
import Chat from "./chat";
import { Toggle } from "@/components/ui/toggle";
import { tagList } from "../../../utils/icon-mapping";
import { useMediaQuery } from "react-responsive";

export default function Card(props: ProfilePreviewProps) {
  const { name, age, image, interests } = props;

  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const maxInterestsToDisplay = isMobile ? 3 : 5;

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
          <div className="flex">
            <div className="h2 font-bold text-white">
              {name}, {age}
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {visibleInterests.map((tag, index) => (
              <Toggle
                key={index}
                variant="ghost"
                icon={tagList[tag]}
                size="md"
                disabled
              >
                {tag}
              </Toggle>
            ))}
            {hiddenInterestsCount > 0 && (
              <Toggle key="hidden-interests" variant="ghost" size="md" disabled>
                +{hiddenInterestsCount} more
              </Toggle>
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
