"use client";
import { api } from "@/trpc/react";
import { cn } from "@/utils/tailwind-merge";
import {
  faAngleLeft,
  faClock,
  faMinusCircle,
  faMoneyBillWave,
  faPlusCircle,
  faRotateLeft,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const mockData: TransactionBoxProps[] = [
  {
    type: "topup",
    createdAt: new Date("2023-05-17T11:00:00"),
    amount: 1000,
    aiteiName: "John Doe",
    eventDate: null,
  },
  {
    type: "withdraw",
    createdAt: new Date("2024-02-16T15:30:00"),
    amount: -500,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    type: "pay",
    createdAt: new Date("2024-03-15T22:00:00"),
    amount: -400,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-15T23:00:00"),
  },
  {
    type: "topup",
    createdAt: new Date("2023-11-17T21:00:00"),
    amount: 1000,
    aiteiName: "John Doe",
    eventDate: null,
  },
  {
    type: "withdraw",
    createdAt: new Date("2024-03-16T08:30:00"),
    amount: -500,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    type: "pay",
    createdAt: new Date("2024-03-05T21:20:00"),
    amount: -1700,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-05T21:30:00"),
  },
  {
    type: "topup",
    createdAt: new Date("2024-03-17T10:00:00"),
    amount: 1500,
    aiteiName: "John Doe",
    eventDate: null,
  },
  {
    type: "topup",
    createdAt: new Date("2024-01-16T15:30:00"),
    amount: 5000,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    type: "pay",
    createdAt: new Date("2024-03-15T21:00:00"),
    amount: -1500,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-20T14:00:00"),
  },
  {
    type: "refund",
    createdAt: new Date("2024-03-15T10:30:00"),
    amount: 1000,
    aiteiName: "John Doe",
    eventDate: new Date("2024-03-15T10:30:00"),
  },
  {
    type: "pending",
    createdAt: new Date("2024-03-16T15:30:00"),
    amount: -1200,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    type: "pay",
    createdAt: new Date("2024-01-15T18:00:00"),
    amount: -1700,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-01-20T14:00:00"),
  },
  {
    type: "topup",
    createdAt: new Date("2024-03-17T10:00:00"),
    amount: 3500,
    aiteiName: "John Doe",
    eventDate: null,
  },
  {
    type: "withdraw",
    createdAt: new Date("2024-03-16T15:30:00"),
    amount: -250,
    aiteiName: "Alice Smith",
    eventDate: null,
  },
  {
    type: "pending",
    createdAt: new Date("2024-03-24T20:00:00"),
    amount: -1500,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-24T20:00:00"),
  },
  {
    type: "pay",
    createdAt: new Date("2024-03-15T23:30:00"),
    amount: -400,
    aiteiName: "Alice Smith",
    eventDate: new Date("2024-03-15T23:00:00"),
  },
];

export default function TransactionHistory() {
  const { data } = api.transaction.getTransactions.useQuery();
  data?.sort((a, b) => b.createdAt?.getTime() - a.createdAt?.getTime());
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
        {/* {data ? (
          (data as TransactionBoxProps[]).map(
            (item: TransactionBoxProps, _index) => (
              <TransactionBox
                aiteiName={item.aiteiName}
                amount={item.amount / 100}
                createdAt={item.createdAt}
                eventDate={item.eventDate}
                type={item.type}
                key={_index}
              />
            ),
          )
        ) : (
          <></>
        )} */}
        {mockData.map((item: TransactionBoxProps, _index) => (
          <TransactionBox
            aiteiName={item.aiteiName}
            amount={item.amount}
            createdAt={item.createdAt}
            eventDate={item.eventDate}
            type={item.type}
            key={_index}
          />
        ))}
      </div>
    </div>
  );
}

interface TransactionBoxProps {
  type: "pay" | "recieve" | "refund" | "withdraw" | "topup" | "pending";
  createdAt: Date;
  amount: number;
  aiteiName: string | null;
  eventDate: Date | null;
}

function TransactionBox(props: TransactionBoxProps) {
  let { type, createdAt, amount, aiteiName, eventDate } = props;

  if (type == "pay" || type == "withdraw" || type == "pending") {
    if (amount > 0) {
      amount = -amount;
    }
  }

  if (type == "recieve" || type == "topup") {
    if (amount < 0) {
      amount = -amount;
    }
  }

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
            className={cn(
              "h-7 w-8",
              type == "pending" ? "text-placeholder" : "text-secondary-500",
            )}
            icon={
              type == "recieve" || type == "pay" || type == "refund"
                ? faMoneyBillWave
                : type == "pending"
                  ? faClock
                  : faWallet
            }
          />

          {type != "recieve" &&
          type != "pay" &&
          type != "refund" &&
          type != "pending" ? (
            <FontAwesomeIcon
              className="absolute left-[26px] top-0 h-3 w-3 text-secondary-400"
              icon={type == "topup" ? faPlusCircle : faMinusCircle}
            />
          ) : type == "refund" ? (
            <div className="absolute left-[26px] top-0 flex h-3 w-3 items-center justify-center rounded-full bg-white">
              <FontAwesomeIcon
                className=" h-2 w-2 text-secondary-400"
                icon={faRotateLeft}
              />
            </div>
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
                case "topup":
                  return "Topup money";
                case "withdraw":
                  return "Withdraw money";
                case "pending":
                  return "Withdraw money";
                case "refund":
                  return `Refund event with ${aiteiName} on ${eventDate ? formatDate(eventDate, 1) : ""}`;
                default:
                  return `Event with ${aiteiName} on ${eventDate ? formatDate(eventDate, 1) : ""}`;
              }
            })()}
            <span className="h-1.5 w-1.5 rounded-full bg-pending"></span>
          </div>
          <div className="line-clamp-1 text-xs/[14px] text-medium">
            {formatDate(createdAt, 2)}
          </div>
        </div>
        <span
          className={cn(
            "h4 font-bold",
            type == "pending"
              ? "text-placeholder"
              : amount > 0
                ? "text-success"
                : "text-error-default",
          )}
        >
          {amount > 0 ? `+${amount}฿` : `-${-amount}฿`}
        </span>
      </div>
    </div>
  );
}
