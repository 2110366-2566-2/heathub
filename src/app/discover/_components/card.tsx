"use client";
import { Tag } from "@/app/_components/tag";
import { generateAvatar } from "@/lib/avatar";
import { tagStyle } from "@/utils/icon-mapping";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
<<<<<<< HEAD
import { useMediaQuery } from "react-responsive";
||||||| merged common ancestors
import { useMediaQuery } from "react-responsive";
import { Tag } from "../../_components/tag";
import Chat from "./chat";
=======
>>>>>>> f7efe98aeefd92d65e12f97a2f186b9599129674
import { type ProfilePreviewProps } from "../types";
import { RatingIcon } from "./rating-icon";

export default function Card(props: ProfilePreviewProps) {
  const { aka, age, image, interests, rating } = props;

<<<<<<< HEAD
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const maxInterestsToDisplay = isMobile ? 3 : 4;
||||||| merged common ancestors
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const isLaptop = useMediaQuery({ maxWidth: 1279 });
  const maxInterestsToDisplay = isMobile ? 3 : isLaptop ? 4 : 5;
=======
  const maxInterestsToDisplay = 3;
>>>>>>> f7efe98aeefd92d65e12f97a2f186b9599129674

  const visibleInterests = interests.slice(0, maxInterestsToDisplay);
  const hiddenInterestsCount = interests.length - maxInterestsToDisplay;

  return (
<<<<<<< HEAD
    <div className="relative flex aspect-[0.76] min-h-[424px] max-w-[323px] flex-col gap-3 rounded-3xl border-2 border-solid border-neutral-300 bg-white p-4">
      <div className="absolute right-[-28px] top-[-24px] z-40 rotate-12">
        <RatingIcon rating={rating} />
      </div>

      <div className="aspect-9/10 relative h-full max-h-[264px] overflow-hidden rounded-lg">
        {image ? (
          <Image
            src={image}
            alt="card"
            fill
            className="object-cover object-top"
            draggable="false"
          />
        ) : (
          <Image
            className="object-cover object-top"
            src={generateAvatar(aka)}
            alt={`Avatar of ${aka}`}
          ></Image>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2">
          <div className="h2 self-start font-bold text-high">
            {aka}, {age}
          </div>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="self-center text-[1.5rem] text-secondary-500"
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
||||||| merged common ancestors
    <div className="relative mx-auto flex aspect-[7/10] max-w-[464px] flex-col gap-0 rounded-3xl shadow-md">
      <div className="relative h-full">
=======
    <div className="relative flex h-[424px] w-[323px] flex-col gap-3 rounded-3xl border-2 border-solid border-neutral-300 bg-white p-4">
      {rating >= 4.0 && (
        <div className="absolute right-[-28px] top-[-24px] z-30 rotate-12">
          <RatingIcon rating={rating} />
        </div>
      )}
      <div className="aspect-9/10 relative h-full max-h-[264px] overflow-hidden rounded-lg">
>>>>>>> f7efe98aeefd92d65e12f97a2f186b9599129674
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
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="self-center  text-secondary-500"
            size="xl"
          />
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
<<<<<<< HEAD
      </div> */}
||||||| merged common ancestors
      </div>

      <div className="my-auto flex aspect-[4.316] w-full items-center justify-center">
        <Chat />
      </div>
=======
      </div>
>>>>>>> f7efe98aeefd92d65e12f97a2f186b9599129674
    </div>
  );
}
