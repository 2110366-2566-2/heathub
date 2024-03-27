"use client";

import { type Dispatch, type SetStateAction } from "react";

export type myEventProps = {
  status: "pending" | "payment-done" | "completed" | "cancelled" | "rejected";
  description: string | null;
  location: string;
  id: number;
  participantID: string;
  participant: {
    id: string;
    aka: string;
    profileImageURL: string | null;
  };
  hostID: string;
  host: {
    verifiedStatus: "unverified" | "pending" | "verified" | "rejected" | null;
    onUser: {
      id: string;
      aka: string;
      profileImageURL: string | null;
    };
  };
  startTime: Date;
  ratingAndReview: ratingAndReview | null;
};
export type ratingAndReview = {
  id: number;
};

export type StarProps = {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
};
