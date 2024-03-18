import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ProfilePreviewProps } from "./profile-container";

export default function MyReview(props: ProfilePreviewProps) {
  const { rating } = props;
  return (
    <Card className="h-[256px] w-full justify-center rounded-lg border-none bg-neutral-50 p-4 lg:h-full lg:w-[360px] ">
      <CardContent className="flex h-full w-full flex-col items-center justify-between gap-y-4 p-0">
        <div className="flex h-6 w-full flex-row gap-x-2">
          <FontAwesomeIcon
            icon={faHeart}
            className="h-6 w-6 text-secondary-500"
          />
          <div className="h4 font-bold text-high">My Review</div>
        </div>
        <div className="flex h-[134px] w-full flex-col items-center gap-y-2">
          <div className="h2 font-bold text-high">{rating}</div>
          <StarMaker Rating={rating} />
        </div>
        <Button
          variant={"secondaryOutline"}
        >
          See All Reviews
        </Button>
      </CardContent>
    </Card>
  );
}

interface StarRating {
  Rating: number;
}

function StarMaker(props: StarRating) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div key={index}>
              <FontAwesomeIcon
                icon={faStar}
                className={`h-8 w-8 px-1 ${index <= props.Rating - 1 ? "text-pending" : "text-neutral-200"}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
