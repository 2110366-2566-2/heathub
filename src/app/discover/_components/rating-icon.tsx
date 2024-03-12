import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function RatingIcon({ rating }: { rating: number }) {
  return (
    <div className="relative h-[76px] w-[108px]">
      <FontAwesomeIcon
        icon={faCertificate}
        className=" z-40 h-[76px] w-[108px] text-[#FFC661]"
      />
      <div className="h2 absolute right-[31px] top-4 z-50 font-extrabold text-white">
        {rating.toFixed(1)}
      </div>
      <div className="small absolute right-[38px] top-[46px] z-50 pt-[-8px] text-center text-white">
        rating
      </div>
    </div>
  );
}
