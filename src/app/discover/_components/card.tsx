"use client";
import { Tag } from "@/app/_components/tag";
import { generateAvatar } from "@/lib/avatar";
import { tagStyle } from "@/utils/icon-mapping";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { type ProfilePreviewProps } from "../types";
import { RatingIcon } from "./rating-icon";

export default function Card(props: ProfilePreviewProps) {
  const { aka, age, image, interests, rating, verifiedStatus } = props;

  const maxInterestsToDisplay = 3;

  const visibleInterests = interests.slice(0, maxInterestsToDisplay);
  const hiddenInterestsCount = interests.length - maxInterestsToDisplay;

  return (
    <div className="relative mx-auto flex h-[380px] w-[289px] flex-col gap-3 rounded-3xl border-2 border-solid border-neutral-300 bg-white p-4 sm:h-[424px] sm:w-[323px]">
      {rating >= 4.0 && (
        <div className="absolute right-[-28px] top-[-24px] z-30 rotate-12">
          <RatingIcon rating={rating} />
        </div>
      )}
      <div className="aspect-9/10 relative h-full max-h-[264px] overflow-hidden rounded-lg">
        <Image
          src={image || generateAvatar(aka)}
          alt="card"
          fill
          className="object-cover object-top"
          draggable="false"
          unoptimized={!image}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-1">
          <div className="h2 text-wrap text-start font-bold text-high">
            {aka}, {age}
          </div>
          {verifiedStatus === "verified" && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="self-center  text-secondary-500"
              size="xl"
            />
          )}
        </div>
        <div className="flex flex-row flex-wrap items-center justify-start gap-2">
          {visibleInterests.sort().map((tag, index) => {
            return (
              <Tag
                key={index}
                variant="solid"
                icon={tagStyle[tag].icon}
                size="md"
                color={tagStyle[tag].color}
              >
                {tag}
              </Tag>
            );
          })}
          {hiddenInterestsCount > 0 && (
            <Tag key="hidden-interests" variant="solid" size="md">
              +{hiddenInterestsCount} more
            </Tag>
          )}
        </div>
      </div>
    </div>
  );
}
