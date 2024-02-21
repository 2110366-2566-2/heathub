"use client";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfilePreview } from "./_components/profile-preview";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { type userProps, type userApiProps, type filters } from "./types";
import { type TagList } from "@/utils/icon-mapping";
import Filter from "./_components/filter";
import { useMediaQuery } from "react-responsive";
import Search from "./_components/search";

export default function DiscoverPage() {
  const [users, setUsers] = useState<userProps[]>([]);

  const [filters, setFilters] = useState<filters>({
    interests: new Array<string>(),
    rating: 0,
    age: { min: 0, max: 99 },
    gender: "-",
  });
  const { data, isSuccess } = api.auth.getHostsByFilter.useQuery({
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
        <SearchFilter setFilters={setFilters} />
      </div>
      <div className="flex justify-center rounded-xl border border-solid border-primary-300 bg-white px-4 py-6 lg:p-9">
        <CardContainer users={users} />
      </div>
    </div>
  );
}

function Header({ setFilters }: { setFilters: (filters: filters) => void }) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="relative flex items-center gap-3">
        <FontAwesomeIcon
          icon={faCompass}
          className="h-10 w-10 text-secondary-400"
        />
        <div className="h2 font-bold text-primary-900">Discover</div>
        {isMobile && <SearchFilterMobile setFilters={setFilters} />}
      </div>
      <div className="h5 lg:h4 text-primary-700">
        Unlock a World of Possibilities: Find Friends for Every Adventure on
        HeatHub!
      </div>
    </div>
  );
}

function SearchFilterMobile({
  setFilters,
}: {
  setFilters: (filters: filters) => void;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-end gap-4 lg:hidden">
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
    <div className="hidden flex-row items-center gap-4 self-stretch lg:flex">
      <Search />
      <Filter setFilters={setFilters} />
    </div>
  );
}

function CardContainer({ users }: { users: userProps[] }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-9 2xl:grid-cols-4">
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
