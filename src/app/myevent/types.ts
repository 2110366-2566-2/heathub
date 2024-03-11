"use client";

export type myEventProps = {
  status: "payment-await" | "payment-done" | "completed" | "canceled";
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
    id: string;
    aka: string;
    profileImageURL: string | null;
  };
  startTime: Date;
};
