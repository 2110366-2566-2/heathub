"use client";
import { Input } from "@/components/ui/input";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfilePreview } from "./_components/profile-preview";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { type userProps, type userApiProps } from "./types";
import { type TagList } from "@/utils/icon-mapping";
import Filter from "./_components/filter";

export default function DiscoverPage() {
  const [users, setUsers] = useState<userProps[]>([]);
  const { data, isSuccess } = api.auth.getHostsByFilter.useQuery({});
  // const [filter, setFilter] = useState<

  useEffect(() => {
    if (isSuccess && data) {
      const _users = data.map((user: userApiProps) => ({
        name: `${user.firstName} ${user.lastName}`,
        age: user.dateOfBirth
          ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()
          : 0,
        image: user.profileImageURL ? user.profileImageURL : "",
        rating: user.avgRating ? user.avgRating : 0,
        reviews: user.reviewCount ? user.reviewCount : 0,
        interests: user.interests as TagList,
        bio: user.bio ? user.bio : "",
      }));
      setUsers(_users);
    }
  }, [isSuccess, data]);

  return (
    <div className="flex w-full flex-col gap-4 p-6 lg:p-9">
      <div className="flex flex-col gap-4 self-stretch">
        <Header />
        <SearchBar />
      </div>
      <div className="flex justify-center rounded-xl border border-solid border-primary-300 bg-white px-4 py-6 lg:p-9">
        <CardContainer users={users} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="relative flex items-center gap-3">
        <FontAwesomeIcon
          icon={faCompass}
          className="h-10 w-10 text-secondary-400"
        />
        <div className="h2 font-bold text-primary-900">Discover</div>
      </div>
      <div className="h5 lg:h4 text-primary-700">
        Unlock a World of Possibilities: Find Friends for Every Adventure on
        HeatHub!
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="hidden flex-row items-center gap-4 self-stretch lg:flex">
      <Input className="h-full p-3" placeholder="Search for friends" />
      <Filter />
    </div>
  );
}

function CardContainer({ users }: { users: userProps[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-9 2xl:grid-cols-4">
      {users.map((profile) => (
        <ProfilePreview {...profile} key={profile.name} />
      ))}
    </div>
  );
}
