"use client";
import { api } from "@/trpc/react";
import { cn } from "@/utils/tailwind-merge";
import {
  faAngleLeft,
  faMinusCircle,
  faMoneyBillWave,
  faPlusCircle,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const mockData: TransactionBoxProps[] = [
  {
    id: 1,
    type: "Topup",
    dateTime: new Date("2023-05-17T11:00:00"),
    amount: 1000,
    aiteiName: "John Doe",
    eventDate: null,
  },
  {
    id: 2,
    type: "Withdraw",
    dateTime: new Date("2024-02-16T15:30:00"),
    amount: -500,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    id: 3,
    type: "Event",
    dateTime: new Date("2024-03-15T22:00:00"),
    amount: -400,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-15T23:00:00"),
  },
  {
    id: 4,
    type: "Topup",
    dateTime: new Date("2023-11-17T21:00:00"),
    amount: 1000,
    aiteiName: "John Doe",
    eventDate: null,
  },
  {
    id: 5,
    type: "Withdraw",
    dateTime: new Date("2024-03-16T08:30:00"),
    amount: -500,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    id: 6,
    type: "Event",
    dateTime: new Date("2024-03-05T21:20:00"),
    amount: -1700,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-05T21:30:00"),
  },
  {
    id: 7,
    type: "Topup",
    dateTime: new Date("2024-03-17T10:00:00"),
    amount: 1500,
    aiteiName: "John Doe",
    eventDate: null,
  },
  {
    id: 8,
    type: "Topup",
    dateTime: new Date("2024-01-16T15:30:00"),
    amount: 5000,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    id: 9,
    type: "Event",
    dateTime: new Date("2024-03-15T21:00:00"),
    amount: -1500,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-20T14:00:00"),
  },
  {
    id: 10,
    type: "Topup",
    dateTime: new Date("2024-03-15T10:30:00"),
    amount: 1000,
    aiteiName: "John Doe",
    eventDate: null,
  },
  {
    id: 11,
    type: "Withdraw",
    dateTime: new Date("2024-03-16T15:30:00"),
    amount: -1200,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    id: 12,
    type: "Event",
    dateTime: new Date("2024-01-15T18:00:00"),
    amount: -1700,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-01-20T14:00:00"),
  },
  {
    id: 13,
    type: "Topup",
    dateTime: new Date("2024-03-17T10:00:00"),
    amount: 3500,
    aiteiName: "John Doe",
    eventDate: null,
  },
  {
    id: 14,
    type: "Withdraw",
    dateTime: new Date("2024-03-16T15:30:00"),
    amount: -250,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    id: 15,
    type: "Event",
    dateTime: new Date("2024-03-24T20:00:00"),
    amount: -1500,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-24T20:00:00"),
  },
  {
    id: 16,
    type: "Event",
    dateTime: new Date("2024-03-15T23:30:00"),
    amount: -400,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-15T23:00:00"),
  },
];

export default function TransactionHistory() {
  const { transactions } = api.transaction.getTransactions.useQuery({
    userID: "",
  });
  mockData.sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());
  return (
    <div className="flex w-full flex-col gap-y-6 p-9">
      <div className="flex w-full flex-row items-center gap-x-3">
        <Link href={"/profile"}>
          <FontAwesomeIcon
            className="h-6 text-high hover:cursor-pointer hover:text-black"
            icon={faAngleLeft}
          />
        </Link>
        <div className="h3 font-bold text-high">Transaction History</div>
      </div>
      <div className="flex w-full flex-col gap-y-4">
        {mockData.map((item: TransactionBoxProps) => (
          <TransactionBox
            aiteiName={item.aiteiName}
            amount={item.amount}
            dateTime={item.dateTime}
            eventDate={item.eventDate}
            type={item.type}
            key={item.id}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
}

interface TransactionBoxProps {
  id: number;
  type: "Topup" | "Withdraw" | "Event";
  dateTime: Date;
  amount: number;
  aiteiName: string | null;
  eventDate: Date | null;
}

function TransactionBox(props: TransactionBoxProps) {
  const { type, dateTime, amount, aiteiName, eventDate } = props;

  const formatDate = (date: Date, options: number) => {
    const options1: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const options2: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formatter = new Intl.DateTimeFormat(
      "en-US",
      options == 1 ? options1 : options2,
    );
    const formattedDate: string = formatter.format(date);

    return formattedDate;
  };

  return (
    <div className="flex h-16 w-full flex-row items-center gap-x-4 rounded-lg bg-neutral-50 p-3">
      <div className="flex h-10 w-10 items-center justify-center">
        <div className="relative h-7 w-8">
          <FontAwesomeIcon
            className="h-7 w-8 text-secondary-500"
            icon={type == "Event" ? faMoneyBillWave : faWallet}
          />

          {type != "Event" ? (
            <FontAwesomeIcon
              className="absolute left-[26px] top-0 h-3 w-3 text-secondary-400"
              icon={type == "Topup" ? faPlusCircle : faMinusCircle}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex h-9 w-full flex-row items-center gap-x-1">
        <div className="flex h-full w-full flex-col gap-y-1">
          <div className="h5 line-clamp-1 font-bold">
            {(() => {
              switch (type) {
                case "Topup":
                  return "Topup money";
                case "Withdraw":
                  return "Withdraw money";
                default:
                  return `Event with ${aiteiName} on ${eventDate ? formatDate(eventDate, 1) : ""}`;
              }
            })()}
          </div>
          <div className="line-clamp-1 text-xs/[14px] text-medium">
            {formatDate(dateTime, 2)}
          </div>
        </div>
        <span
          className={cn(
            "h4 font-bold",
            amount > 0 ? "text-success" : "text-error-default",
          )}
        >
          {amount > 0 ? `+${amount}฿` : `-${-amount}฿`}
        </span>
      </div>
    </div>
  );
}
