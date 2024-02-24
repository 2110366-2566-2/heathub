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
};
export default function ProfileContainer(props: ProfilePreviewProps) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const balance = {
    balance: 9999,
  };
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex h-64 w-full justify-center rounded-xl border border-solid border-primary-300 bg-white lg:p-6">
          <MyAccountPreview {...props} key={props.name} />
        </div>
        <PaymentCard {...balance} />
      </div>
    );
  }
  return (
    <div className="flex flex-row gap-4">
      <div className="flex h-64 w-1/3 justify-center rounded-xl border border-solid border-primary-300 bg-white lg:p-6">
        <MyAccountPreview {...props} key={props.name} />
      </div>
      <PaymentCard {...balance} />
    </div>
  );
}
