"use client";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewList from "./_components/ReviewList";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/tailwind-merge";
import { useState } from "react";
import { api } from "@/trpc/react";
import ReviewDetails from "./_components/ReviewDetails";
import { type HostDetail } from "./_components/type";

export default function Page() {
  const router = useRouter();
  const mockUserId = "7ur4bw05d44qluk";
  const [filter, setFilter] = useState(0);

  const { data } = api.user.getHostData.useQuery({
    hostID: mockUserId,
  });
  if (!data) {
    console.log("Error can not get host data");
    return;
  }
  if (!data[0]) {
    console.log(`Do not have hostID: ${mockUserId}`);
    return;
  }
  const hostData = data[0];
  const props: HostDetail = {
    username: hostData.username,
    hostID : mockUserId,
    rating: hostData.avgRating,
    image: hostData.image,
  };
  const RatingFilter = (
    <div className="flex w-full flex-row items-center gap-2">
      <div className="h5 text-medium">Rating</div>
      <Select
        name="rating"
        onValueChange={(value: string) => {
          setFilter(parseInt(value));
        }}
      >
        <SelectTrigger
          className={cn(
            "w-full",
            "border-none",
            "text-placeholder",
            "bg-neutral-100",
            "w-[124px]",
          )}

          // className={cn("w-full", "border-none", isMobile && "bg-neutral-100")}
        >
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">All</SelectItem>
          <SelectItem value="5">5 Only</SelectItem>
          <SelectItem value="4">More than 4</SelectItem>
          <SelectItem value="3">More than 3</SelectItem>
          <SelectItem value="2">More than 2</SelectItem>
          <SelectItem value="1">More than 1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="flex h-screen w-full flex-row items-start justify-center gap-[6px] p-9">
      <div className="flex h-full flex-col items-start gap-4">
        <div className="flex h-9 w-full flex-row justify-between">
          <div className="flex h-9 flex-row  items-center justify-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex h-6 w-6 flex-row items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-high"
                size="lg"
              />
            </button>
            <div className="h2 flex h-9 items-center justify-center font-bold text-high">
              Reviews
            </div>
          </div>
          <div className="flex h-9 w-fit items-center justify-center">
            {RatingFilter}
          </div>
        </div>
        <div>
          <ReviewList userID={mockUserId} filter={filter} />
        </div>
      </div>
      <ReviewDetails {...props}/>
    </div>
  );
  // return (
  //   <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-primary-100 to-secondary-100 text-white">
  //     <div className="container flex flex-col items-center justify-center gap-4">
  //       <h1 className="h1 font-bold text-neutral-800">404</h1>
  //       <p className="p text-neutral-800">Look like you might have lost 🗺️</p>

  //       <Link href="/discover">
  //         <button className="rounded-2xl bg-slate-500/20 px-10 py-3 font-semibold transition hover:bg-slate-500/40">
  //           Discover
  //         </button>
  //       </Link>

  //       <Link href="/signin">
  //         <button className="rounded-2xl bg-slate-500/20 px-10 py-3 font-semibold transition hover:bg-slate-500/40">
  //           Sign In
  //         </button>
  //       </Link>
  //     </div>
  //   </main>
  // );
}
