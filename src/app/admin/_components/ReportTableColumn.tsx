"use client";

import { type ColumnDef } from "@tanstack/react-table";

export type Event = {
  id: number;
  status: "pending" | "rejected" | "completed" | "payment-done" | "cancelled";
  description: string | null;
  participantID: string;
  hostID: string;
  createdAt: Date;
  startTime: Date;
  endTime: Date;
  price: number;
  location: string;
};

export type Host = {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: "host" | "participant" | "admin";
  id: string;
  aka: string;
  bio: string | null;
  dateOfBirth: Date | null;
  profileImageURL: string | null;
  balance: number;
};
export type Participant = {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: "host" | "participant" | "admin";
  id: string;
  aka: string;
  bio: string | null;
  dateOfBirth: Date | null;
  profileImageURL: string | null;
  balance: number;
};

export type ReportRequest = {
  reportStatus: "pending" | "resolved" | "rejected";
  eventId: number;
  reportId: number;
  participantName: string;
  hostName: string;
  title: string;
  detail: string | null;
  event: Event;
  host: Host;
  participant: Participant;
};

export const reportTableColumns: ColumnDef<ReportRequest>[] = [
  {
    accessorKey: "eventId",
    header: "Event ID",
  },
  {
    accessorKey: "participantName",
    header: "Participant Name",
  },
  {
    accessorKey: "hostName",
    header: "Host Name",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) =>
      row.original.title.length > 25
        ? `${row.original.title.slice(0, 25)}...`
        : row.original.title,
  },
  {
    accessorKey: "detail",
    header: "Detail",
    cell: ({ row }) => {
      const detail = row.original.detail;
      if (detail === null) return null;
      return detail.length > 25 ? `${detail.slice(0, 25)}...` : detail;
    },
  },
  {
    accessorKey: "event.price",
    header: "Price",
  },
];
