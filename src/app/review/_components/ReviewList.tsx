import { api } from "@/trpc/react";
import ReviewCard from "./ReviewCard";
import Image from "next/image"
export default function ReviewList({
  userID,
  filter,
}: {
  userID: string;
  filter: number;
}) {
  const { data, isSuccess } = api.review.getReviews.useQuery({
    hostID: userID,
    filter: filter,
  });
  if (!isSuccess) {
    console.log("Err");
  }
  if (data?.length == 0) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-white">
        <Image width={150} height={150} src="/svgs/no-review.svg" alt="No review" />
        <div className="h-5 text-medium">no review</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-neutral-50 p-5">
      {data?.map((review, index) => {
        return <ReviewCard key={index} {...review} />;
      })}
    </div>
  );
}
