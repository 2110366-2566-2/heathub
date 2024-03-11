"use client";

export type myEventProps = {
  status: "payment-await" | "payment-done" | "completed" | "canceled";
  description: string | null;
  location: string;
  id: number;
  participantID: string;
  participant: {
    aka: string;
    profileImageURL: string | null;
  };
  hostID: string;
  host: {
    aka: string;
    profileImageURL: string | null;
  };
  startTime: Date;
};

