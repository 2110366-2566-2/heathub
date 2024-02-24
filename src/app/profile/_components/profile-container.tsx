"use client";
import { useMediaQuery } from "react-responsive";
import { MyAccountPreview } from "./my-account";
import { type TagList } from "@/utils/icon-mapping";
import PaymentCard from "./payment-card";
import ProfileDetails from "./ProfileDetails";
import MyReview from "./MyReview";

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:gap-4 lg:flex-row">
        <ProfileDetails {...props} />
        <MyReview {...props} />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex h-64 w-full justify-center rounded-xl border border-solid border-primary-300 bg-white p-6 lg:w-1/3">
          <MyAccountPreview {...props} key={props.name} />
        </div>
        <PaymentCard {...balance} />
      </div>
    </div>
  );
}
