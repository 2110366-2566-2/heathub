"use client";

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
    id: string;
    aka: string;
    profileImageURL: string | null;
  };
  startTime: Date;
};
