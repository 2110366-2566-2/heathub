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
  const { data: me } = api.auth.me.useQuery();

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
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-secondary-50 px-4 py-6 lg:p-9">
        <SearchFilter setFilters={setFilters} />
        <CardContainer users={users} role={me.role} />
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
<<<<<<< HEAD
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
||||||| merged common ancestors
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
=======
    <div className="flex flex-row">
      <div className="flex w-full flex-col justify-center gap-2">
        <div className="h4 w-full font-bold text-primary-900">
          Welcome back,
        </div>
        <div className="flex flex-col md:flex-row md:gap-2">
          <div className="text-[28px] font-extrabold text-primary-800 lg:text-4xl">
            {mobileText}{" "}
            <span className="text-[28px] font-extrabold italic text-secondary-500 lg:text-4xl">
              HeatHub!
            </span>
          </div>
        </div>
>>>>>>> f7efe98aeefd92d65e12f97a2f186b9599129674
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
<<<<<<< HEAD
    <div className="grid w-full grid-cols-1 items-start justify-between gap-y-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {props.users.map((profile: ProfilePreviewProps) => (
        <ProfilePreview key={profile.aka} props={profile} role={props.role} />
||||||| merged common ancestors
    <div className="grid min-h-screen w-full grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-9 2xl:grid-cols-4">
      {users.map((profile) => (
        <ProfilePreview {...profile} key={profile.aka} />
=======
    <div className="flex w-full flex-row flex-wrap justify-center gap-8">
      {props.users.map((profile: ProfilePreviewProps) => (
        <ProfilePreview key={profile.aka} props={profile} role={props.role} />
>>>>>>> f7efe98aeefd92d65e12f97a2f186b9599129674
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
