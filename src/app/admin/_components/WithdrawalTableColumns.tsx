"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Dayjs } from "@/utils/dayjs";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WithdrawalRequest = {
  requestDate: Date;
  requestId: number;
  userId: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
  bank: string;
  amount: number;
};

export const withdrawalRequestTableColumns: ColumnDef<WithdrawalRequest>[] = [
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
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
  },
  {
    accessorKey: "bank",
    header: "Bank",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
