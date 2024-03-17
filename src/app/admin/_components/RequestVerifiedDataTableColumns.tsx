"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Dayjs } from "@/utils/dayjs";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VerifiedRequest = {
  requestDate: Date;
  requestId: number;
  hostId: string;
  firstName: string;
  lastName: string;
  userName: string;
  profileImageURL: string;
  nationalIdCardImageURL: string;
};

export const requestVerifiedDataTableColumns: ColumnDef<VerifiedRequest>[] = [
  {
    accessorKey: "requestId",
    header: "ID",
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => {
      const dayFormat = Dayjs(row.getValue("requestDate")).format("DD/MM/YYYY");
      return dayFormat;
    },
  },
  {
    accessorKey: "hostId",
    header: "Host Id",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "profileImageURL",
    header: "Profile Image Url",

    cell: ({ row }) => {
      const profileImageURL: string = row.getValue("profileImageURL");
      return (
        <a
          key={profileImageURL}
          target="_blank"
          rel="noreferrer"
          href={profileImageURL}
          className="hover:cursor underline"
        >
          {profileImageURL.slice(0, 40)}...
        </a>
      );
    },
  },
  {
    accessorKey: "nationalIdCardImageURL",
    header: "Copy Of ID Card",

    cell: ({ row }) => {
      const nationalIdCardImageURL: string = row.getValue(
        "nationalIdCardImageURL",
      );
      return (
        <a
          key={nationalIdCardImageURL}
          href={nationalIdCardImageURL}
          target="_blank"
          rel="noreferrer"
          className="hover:cursor  underline"
        >
          {nationalIdCardImageURL.slice(0, 40)}...
        </a>
      );
    },
  },
];
