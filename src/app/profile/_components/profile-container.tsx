"use client";
import { useMediaQuery } from "react-responsive";
import { MyAccountPreview } from "./my-account";
import { TagList } from "@/utils/icon-mapping";
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
};
export default function ProfileContainer(props: ProfilePreviewProps) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const balance = {
    balance: props.balance,
  };
  
    return (
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex h-64 w-full justify-center rounded-xl border border-solid border-primary-300 bg-white p-6 lg:w-1/3">
          <MyAccountPreview {...props} key={props.name} />
        </div>
        <PaymentCard {...balance} />
      </div>
    );
}
