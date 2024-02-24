import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ProfilePreviewProps } from "./profile-container";

export default function MyReview(props: ProfilePreviewProps) {
  const { rating } = props;
  return (
    <Card className="h-[190px] w-full justify-center rounded-lg border-solid border-primary-300 bg-white p-4 lg:h-full lg:w-[360px] ">
      <CardContent className="flex h-full w-full flex-col items-center justify-between  p-0">
        <div className="flex h-6 w-full flex-row gap-x-2">
          <FontAwesomeIcon
            icon={faComments}
            className="h-6 w-6 text-primary-500"
          />
          <div className="h4 font-bold text-high">My Review</div>
        </div>
        <div className="flex h-[68px] w-full flex-col items-center gap-y-2">
          <div className="h2 font-bold text-high">{rating}</div>
          <div className="h-6 text-yellow-400"> starrr </div>
        </div>
        <Button variant={"outline"} className="w-full">
          See All Previews
        </Button>
      </CardContent>
    </Card>
  );
}
