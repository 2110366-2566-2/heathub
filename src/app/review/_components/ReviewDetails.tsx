import { faCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { type HostDetail } from "./type";
import { api } from "@/trpc/react";
import { cn } from "@/utils/tailwind-merge";

export default function ReviewDetails(props: HostDetail) {
  const { data } = api.review.getReviewsNumber.useQuery({
    hostID: props.hostID,
  });
  if (!data) {
    console.log("Error to get review number");
    return;
  }
  let five = {
    ratingScore: 5,
    count: 0,
  };
  let four = {
    ratingScore: 4,
    count: 0,
  };
  let three = {
    ratingScore: 3,
    count: 0,
  };
  let two = {
    ratingScore: 2,
    count: 0,
  };
  let one = {
    ratingScore: 1,
    count: 0,
  };
  data.map((data) => {
    switch (data.ratingScore) {
      case 1:
        one.count = data.count;
        break;
      case 2:
        two.count = data.count;
        break;
      case 3:
        three.count = data.count;
        break;
      case 4:
        four.count = data.count;
        break;
      case 5:
        five.count = data.count;
        break;
      default:
        break;
    }
  });
  const sumReviews =
    one.count + two.count + three.count + four.count + five.count;

  if (sumReviews === 0) {
    return (
      <div className="flex h-full flex-col items-center gap-4 rounded-xl bg-neutral-50 px-5 py-10 lg:min-w-[323px] ">
        <Image
          className="aspect-square items-center justify-center rounded-full"
          src={props.image ?? ""}
          width={100}
          height={100}
          alt="profilePic"
        />
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-row items-center justify-center gap-1">
            <div className="h2 flex h-9 items-center justify-center font-bold text-high">
              {props.username}
            </div>
            {props.isVerified == "verified" && (
              <FontAwesomeIcon
                icon={faCircleCheck}
                color="secondary"
                className={cn("text-secondary-500", "h-5 w-5")}
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="h3 font-bold">{props.rating ?? 0.0}</div>
              <div className="h6">/ 5</div>
            </div>
            <StarMaker rating={props.rating ?? 0} />
            <div className="h5 text-medium">No reviews available</div>
          </div>
        </div>
      </div>
    );
  }
  const w1 = !sumReviews ? 0 : ((one.count / sumReviews) * 100).toString();
  const w2 = !sumReviews ? 0 : ((two.count / sumReviews) * 100).toString();
  const w3 = !sumReviews ? 0 : ((three.count / sumReviews) * 100).toString();
  const w4 = !sumReviews ? 0 : ((four.count / sumReviews) * 100).toString();
  const w5 = !sumReviews ? 0 : ((five.count / sumReviews) * 100).toString();
  return (
    <div className="flex h-full flex-col items-center gap-4 rounded-xl bg-neutral-50 px-5 py-10 lg:min-w-[323px]  ">
      <Image
        className="aspect-square items-center justify-center rounded-full"
        src={props.image ?? ""}
        width={100}
        height={100}
        alt="profilePic"
      />
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-row items-center justify-center gap-1">
          <div className="h2 flex h-9 items-center justify-center font-bold text-high">
            {props.username}
          </div>
          {props.isVerified == "verified" && (
            <FontAwesomeIcon
              icon={faCircleCheck}
              color="secondary"
              className={cn("text-secondary-500", "h-5 w-5")}
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="h3 font-bold">{props.rating ?? 0.0}</div>
            <div className="h6">/ 5</div>
          </div>
          <StarMaker rating={props.rating ?? 0} />
          <div className="h5 text-medium">Base on {sumReviews} reviews</div>
        </div>
        <div className="flex flex-col  items-center gap-2">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">5</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w5}%` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{five.count}</div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">4</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w4}%` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{four.count}</div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">3</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w3}%` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{three.count}</div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">2</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w2}%` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{two.count}</div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">1</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w1}%` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{one.count}</div>
          </div>
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
                className={cn("h-6 w-6 pr-1", {
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
