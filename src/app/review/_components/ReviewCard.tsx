import Image from "next/image";
import { type TextProps, type ReviewType } from "./type";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils/tailwind-merge";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function ReviewCard(props: ReviewType) {
  const [showFullText, setShowFullText] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const toggleFullText = () => {
    setShowFullText(!showFullText);
  };
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const TruncateText: React.FC<TextProps> = ({ text, maxLength }) => {
    if (text.length > maxLength && !showFullText) {
      return (
        <span>
          {text.slice(0, maxLength) + "..."}
          <button
            onClick={toggleFullText}
            className="text-secondary-500 hover:underline"
          >
            Read More
          </button>
        </span>
      );
    } else if (text.length > maxLength) {
      return (
        <span>
          {text + "..."}
          <button
            onClick={toggleFullText}
            className="text-secondary-500 hover:underline"
          >
            Show Less
          </button>
        </span>
      );
    }
    return <span>{text}</span>;
  };
  const location = props.location.slice(0, 15);
  const eventDate = props.eventDate.toLocaleDateString().slice(0, -2);
  const reviewDate = props.createdAt.toLocaleString().split("/");
  const reviewDateString =
    month[parseInt(reviewDate[0]!, 10)]! +
    " " +
    reviewDate[1]! +
    " " +
    reviewDate[2]!.split(",").join(" at");
  if (isMobile) {
    return (
      <div className="flex w-full flex-col gap-3 rounded-xl bg-neutral-0 p-4">
        <div className="flex flex-row gap-2">
          <Image
            className="h-[44px] w-[44px] items-start justify-start rounded-full"
            src={props.participantPic ?? ""}
            width={44}
            height={44}
            alt="profilePic"
          />
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full flex-row justify-between">
              <div className="h4">{props.participantName}</div>
              <StarMaker rating={props.ratingScore} />
            </div>
            <div className="flex flex-col">
              <div className="h6 text-medium">{location}</div>
              <div className="small text-medium ">Event at {eventDate}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`h5 w-full break-all text-neutral-700 ${showFullText ? "" : "line-clamp-3"}`}
          >
            <TruncateText text={props.reviewDesc ?? ""} maxLength={95} />
          </div>
          <div className="flex justify-end">
            <div className="small text-medium">{reviewDateString}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row gap-2 rounded-xl bg-neutral-0 p-4">
      <div className="flex w-[183px] flex-col items-start justify-start">
        <div className="flex flex-col gap-2">
          <Image
            className="items-center justify-center rounded-full"
            src={props.participantPic ?? ""}
            width={44}
            height={44}
            alt="profilePic"
          />
          <div className="h4 font-bold">{props.participantName}</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="h6 text-medium">{location}</div>
          <div className="h6 text-medium ">Event at {eventDate}</div>
        </div>
      </div>
      <div className="flex w-full flex-col flex-wrap gap-1">
        <div className="flex w-full flex-row justify-between">
          <StarMaker rating={props.ratingScore} />
          <div className="h6 text-medium">{reviewDateString}</div>
        </div>
        <hr className="w-full border" />

        <div
          className={`h5 w-full break-all text-neutral-700 ${showFullText ? "" : "line-clamp-3"}`}
        >
          <TruncateText text={props.reviewDesc ?? ""} maxLength={120} />
        </div>
      </div>
    </div>
  );
}

function StarMaker(props: { rating: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div key={index}>
              <FontAwesomeIcon
                icon={faStar}
                className={cn("h-4 w-4 pr-1", {
                  "text-pending": index <= props.rating - 1,
                  "text-neutral-200": index > props.rating - 1,
                })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
