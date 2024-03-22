import { api } from "@/trpc/react";
import ReviewCard from "./ReviewCard";
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
  if(data?.length==0){
    return (
      <div>
        No review
      </div>
    );
  }  
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-neutral-50 p-5">
      {data?.map((review,index) => {
          return <ReviewCard key={index} {...review} />;
        })}
    </div>
  );

}
