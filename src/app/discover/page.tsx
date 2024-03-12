"use client";
import { ProfilePreview } from "./_components/profile-preview";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { type userProps, type userApiProps, type filters } from "./types";
import { type TagList } from "@/utils/icon-mapping";
import Filter from "./_components/filter";
import { useMediaQuery } from "react-responsive";
import Search from "./_components/search";
import { cn } from "@/utils/tailwind-merge";

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
      }));
      setUsers(_users);
    }
  }, [isSuccess, data, filters]);

  return (
    <div className="flex h-full w-full flex-col gap-4 p-6 lg:p-9">
      <div className="flex flex-col gap-4 self-stretch">
        <Header setFilters={setFilters} />
      </div>
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-secondary-50 px-4 py-6 lg:p-9">
        <SearchFilter setFilters={setFilters} />
        <CardContainer users={users} />
      </div>
    </div>
  );
}

function Header({ setFilters }: { setFilters: (filters: filters) => void }) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const mobileText = isMobile
    ? "Find perfect friends on"
    : "Find perfect partner for your adventure today on";

  return (
    <div className="flex flex-row">
      <div className="flex w-full flex-col justify-center gap-2">
        <div className="h4 w-full font-bold text-primary-900">
          Welcome back,
        </div>
        <div className="flex flex-col md:flex-row md:gap-2">
          <div className="text-[28px] font-extrabold text-primary-800 lg:text-4xl">
            {mobileText}
          </div>
          <div className="text-[28px] font-extrabold italic text-secondary-500 lg:text-4xl">
            HeatHub!
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

function CardContainer({ users }: { users: userProps[] }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 items-start justify-between gap-y-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {users.map((profile) => (
        <ProfilePreview {...profile} key={profile.aka} />
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
