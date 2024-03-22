import { type TagList } from "@/utils/icon-mapping";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import MyReview from "./MyReview";
import ProfileDetails from "./ProfileDetails";
import { MyAccountPreview } from "./my-account";
import PaymentCard from "./payment-card";

export type ProfilePreviewProps = {
  email: string;
  name: string;
  age: number;
  image: string;
  rating: number;
  reviews: number;
  about: string;
  interests: TagList;
  balance: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  id: string;
  verifiedStatus: string;
  verifiedDetail: string;
  role: "host" | "participant";
};
export default function ProfileContainer(props: ProfilePreviewProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-10 w-full flex-row items-center gap-x-2">
        <FontAwesomeIcon icon={faUser} className="h-7 w-7 text-secondary-500" />
        <div className="h2 font-bold text-high">Profile</div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <ProfileDetails {...props} />
        {props.reviews != -1 && <MyReview {...props} />}
      </div>
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-fit w-full justify-center rounded-xl border-none bg-neutral-50 p-6">
          <MyAccountPreview {...props} key={props.name} />
        </div>
        <PaymentCard />
      </div>
      <div className="flex justify-end">
        <Link
          className="text-h4 ring-offset-background focus-visible:ring-ring flex h-12 w-[109px] items-center justify-center whitespace-nowrap rounded-xl bg-primary-700 font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-primary-100"
          href="/signout"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
