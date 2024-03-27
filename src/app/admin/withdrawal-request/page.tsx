"use client";
import {
  type WithdrawalRequest,
  withdrawalRequestTableColumns,
} from "../_components/WithdrawalTableColumns";
import { WithdrawalTable } from "../_components/WithdrawalTable";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "@/trpc/react";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState<number>(0);
  const [recentData, setRecentData] = useState<WithdrawalRequest[]>([]);
  const setPageByAction = (action: "next" | "previous") => {
    if (action === "next") {
      setPage((prev) => prev + 1);
    } else if (page >= 1) {
      setPage((prev) => prev - 1);
    }
  };

  const { data } = api.admin.getWithdrawalRequest.useQuery(
    {
      limit: 10,
      page: page,
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        const formattedData = data.items
          .filter((e) => e.status === "pending")
          .map((e) => {
            const req: WithdrawalRequest = {
              requestDate: e.createdAt,
              requestId: e.id,
              userId: e.userID,
              accountNumber: e.bankAccount,
              bank: e.bankName,
              amount: e.amount / 100,
              firstName: e.hostUser.onUser.firstName,
              lastName: e.hostUser.onUser.lastName,
            };
            return req;
          });
        setRecentData(formattedData);
      },
    },
  );
  return (
    <div className="flex w-full flex-row">
      <div className=" flex w-full flex-col gap-4 p-9">
        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-2">
            <FontAwesomeIcon
              className="text-secondary-500"
              icon={faUserCheck}
              width={20}
              height={20}
            />
            <span className="h4 font-bold">Withdrawal Requests</span>
          </div>
          <span className="text-sm text-medium">
            Please note that you should transfer the money to user before
            clicking &quot;Complete&quot;.
          </span>
        </div>
        <WithdrawalTable
          columns={withdrawalRequestTableColumns}
          data={recentData}
          hasPrev={page !== 0}
          hasNext={data?.hasNextPage ?? false}
          setPage={setPageByAction}
        />
      </div>
    </div>
  );
}
