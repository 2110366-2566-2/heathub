"use client";
import { useMediaQuery } from "react-responsive";
import { MyAccountPreview } from "./my-account";
import { type TagList } from "@/utils/icon-mapping";
import PaymentCard from "./payment-card";
import ProfileDetails from "./ProfileDetails";
import MyReview from "./MyReview";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
};
export default function ProfileContainer(props: ProfilePreviewProps) {
  const balance = {
    balance: props.balance,
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex h-10 w-full flex-row items-center gap-x-2">
        <FontAwesomeIcon
          icon={faUser}
          className="h-10 w-10 text-secondary-500"
        />
        <div className="h2 font-bold text-high">Profile</div>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <ProfileDetails {...props} />
        <MyReview {...props} />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex h-64 w-full justify-center rounded-xl border-none bg-neutral-50 p-6 lg:w-1/3">
          <MyAccountPreview {...props} key={props.name} />
        </div>
        <PaymentCard {...balance} />
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
