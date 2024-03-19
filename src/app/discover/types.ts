import { type TagList } from "@/utils/icon-mapping";

export type userProps = {
  id: string;
  aka: string;
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
  role: "host" | "participant" | "admin";
  lastName: string;
  dateOfBirth: Date | null;
  profileImageURL: string | null;
  avgRating: number | null;
  reviewCount: number | null;
  id: string;
};

export type ProfilePreviewProps = {
  aka: string;
  age: number;
  image: string;
  rating: number;
  reviews: number;
  bio: string;
  interests: TagList;
  id: string;
};

export type filters = {
  searchQuery: string;
  interests: string[];
  rating: number;
  gender: string;
  age: {
    min: number;
    max: number;
  };
};
