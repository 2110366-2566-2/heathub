"use client";
import { api } from "@/trpc/react";
import type { TagList } from "@/utils/icon-mapping";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Filter from "./_components/filter";
import { ProfilePreview } from "./_components/profile-preview";
import type {
  ProfilePreviewProps,
  filters,
  userApiProps,
  userProps,
} from "./types";
import Image from "next/image";

export default function DiscoverPage() {
  const [users, setUsers] = useState<userProps[]>([]);

  const [filters, setFilters] = useState<filters>({
    searchQuery: "",
    interests: new Array<string>(),
    rating: 0,
    age: { min: 0, max: 99 },
    gender: "-",
  });

  const { data, isSuccess } = api.user.getHostsByFilter.useQuery({
    searchQuery: filters.searchQuery ?? undefined,
    interests: filters.interests ?? undefined,
    rating: filters.rating ?? undefined,
    gender: filters.gender === "-" ? undefined : filters.gender,
    ageRange: [filters.age.min ?? 0, filters.age.max ?? 99],
  });
  const { data: me } = api.auth.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const _users = data.map((user: userApiProps) => ({
        aka: user.aka,
        age: CalculateAge(user.dateOfBirth),
        image: user.profileImageURL ? user.profileImageURL : "",
        rating: user.avgRating ? user.avgRating : 0,
        reviews: user.reviewCount ? user.reviewCount : 0,
        interests: user.interests as TagList,
        bio: user.bio ? user.bio : "",
        id: user.id,
        verifiedStatus: user.verifiedStatus
          ? user.verifiedStatus
          : "unverified",
      }));
      setUsers(_users);
    }
  }, [isSuccess, data, filters]);
  if (!me) {
    return <div></div>;
  }
  return (
    <div className="flex h-full w-full flex-col gap-4 p-6 lg:p-9">
      <div className="flex flex-col gap-4 self-stretch">
        <Header setFilters={setFilters} />
      </div>
      <Image
        src="/svgs/curve-discover.svg"
        alt="Adventure"
        width={170}
        height={260}
        className="absolute right-0 top-0 z-0 opacity-50"
      />
      <div className="z-20 flex flex-col justify-center gap-6 rounded-lg bg-secondary-50 px-4 py-6 lg:p-9">
        <SearchFilter setFilters={setFilters} />
        <CardContainer users={users} role={me.role} />
      </div>
    </div>
  );
}

function Header({ setFilters }: { setFilters: (filters: filters) => void }) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const text = isMobile
    ? "Find perfect friends on"
    : "Find perfect partner for your adventure today on";

  return (
    <div className="flex flex-row">
      <div className="flex w-full flex-col justify-center gap-2">
        <div className="h4 w-full font-bold text-primary-900">
          Welcome back,
        </div>
        <div className="z-[1] flex flex-col md:flex-row md:gap-2">
          <div className="text-[28px] font-extrabold text-primary-800 lg:text-4xl">
            {text}{" "}
            <span className="text-[28px] font-extrabold italic text-secondary-500 lg:text-4xl">
              HeatHub!
            </span>
          </div>
        </div>
      </div>
      {isMobile && <SearchFilterMobile setFilters={setFilters} />}
    </div>
  );
}

function SearchFilterMobile({
  setFilters,
}: {
  setFilters: (filters: filters) => void;
}) {
  return (
    <div className="flex flex-row gap-4 self-start lg:hidden">
      <Filter setFilters={setFilters} />
    </div>
  );
}

function SearchFilter({
  setFilters,
}: {
  setFilters: (filters: filters) => void;
}) {
  return (
    <div className="hidden flex-col items-center gap-4 self-stretch lg:flex">
      <Filter setFilters={setFilters} />
    </div>
  );
}

type CardContainerProps = {
  users: userProps[];
  role: string;
};

function CardContainer(props: CardContainerProps) {
  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-8">
      {props.users.map((profile: ProfilePreviewProps) => (
        <ProfilePreview key={profile.aka} props={profile} role={props.role} />
      ))}
    </div>
  );
}

function CalculateAge(dateOfBirth: Date | null) {
  if (!dateOfBirth) return 0;
  const nowDate = new Date();
  const birthDate = new Date(dateOfBirth);
  const age =
    nowDate.getFullYear() -
    birthDate.getFullYear() -
    (nowDate <
    new Date(nowDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())
      ? 1
      : 0);
  return age;
}
