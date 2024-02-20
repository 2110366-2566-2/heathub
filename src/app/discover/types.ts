import { type TagList } from "@/utils/icon-mapping";

export type userProps = {
  name: string;
  age: number;
  image: string;
  rating: number;
  reviews: number;
  interests: TagList;
  bio: string;
};

export type userApiProps = {
  interests: string[];
  aka: string;
  bio: string | null;
  email: string;
  firstName: string;
  gender: string;
  role: "host" | "participant";
  lastName: string;
  dateOfBirth: Date | null;
  profileImageURL: string | null;
  avgRating: number | null;
  reviewCount: number | null;
};

export type ProfilePreviewProps = {
  name: string;
  age: number;
  image: string;
  rating: number;
  reviews: number;
  bio: string;
  interests: TagList;
};

export type Filters = {
  interest: TagList;
  rating: number;
  gender: string;
  age: {
    min: number;
    max: number;
  };
};
