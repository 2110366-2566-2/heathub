import Image from "next/image";
import { type ReviewType } from "./type";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ReviewCard(props: ReviewType) {
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
  const location = props.location.slice(0, 15);
  const eventDate = props.eventDate.toLocaleDateString().slice(0, -2);
  const reviewDate = props.createdAt.toLocaleString().split("/");
  const reviewDateString =
    month[parseInt(reviewDate[0]!, 10)]! +
    " " +
    reviewDate[1]! +
    " " +
    reviewDate[2]!.split(",").join(" at");
  return (
    <div className="flex h-[153px] flex-row gap-2 rounded-xl bg-neutral-0 p-4">
      <div className="flex w-[183px] flex-col items-start justify-between">
        <Image
          className="items-center justify-center rounded-full"
          src={props.participantPic ?? ""}
          width={44}
          height={44}
          alt="profilePic"
        />
        <div className="h4 font-bold">{props.participantName}</div>
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

        <div className="h5 line-clamp-3 w-full break-all text-neutral-700 ">
          {props.reviewDesc}
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
                className={`h-4 w-4 pr-1 ${index <= props.rating - 1 ? "text-pending" : "text-neutral-200"}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
