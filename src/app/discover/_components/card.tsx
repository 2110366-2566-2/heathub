"use client";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { type ProfilePreviewProps } from "../types";
import { tagStyle } from "@/utils/icon-mapping";
import { Tag } from "@/app/_components/tag";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RatingIcon } from "./rating-icon";

export default function Card(props: ProfilePreviewProps) {
  const { aka, age, image, interests, rating } = props;

  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const maxInterestsToDisplay = isMobile ? 3 : 4;

  const visibleInterests = interests.slice(0, maxInterestsToDisplay);
  const hiddenInterestsCount = interests.length - maxInterestsToDisplay;

  return (
    <div className="relative flex aspect-[0.76] min-h-[424px] max-w-[323px] flex-col gap-3 rounded-3xl border-2 border-solid border-neutral-300 bg-white p-4">
      {/* <FontAwesomeIcon
        icon={faCertificate}
        className="absolute right-[-28px] top-[-24px] z-40 h-16 w-24 text-[#FFC661]"
      />
      <div className="h3 absolute right-0 top-[-12px] z-50 rotate-12 flex-col font-extrabold text-white">
        {rating.toFixed(1)}
      </div>
      <div className="absolute right-[11px] top-[14px] z-50 rotate-12 flex-col text-[8px] font-extrabold text-white">
        rating
      </div> */}
      <div className="absolute right-[-28px] top-[-24px] z-40 rotate-12">
        <RatingIcon rating={rating} />
      </div>

      <div className="aspect-9/10 relative h-full max-h-[264px]">
        <Image
          src={image}
          alt="card"
          fill
          className="rounded-lg object-cover object-top"
          draggable="false"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2">
          <div className="h2 self-start font-bold text-high">
            {aka}, {age}
          </div>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="h-6 w-6 self-center text-secondary-500"
          />
        </div>
        <div className="flex flex-row flex-wrap items-center justify-start gap-2 self-stretch">
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
