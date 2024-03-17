"use client";
import {
  type VerifiedRequest,
  requestVerifiedDataTableColumns,
} from "../_components/RequestVerifiedDataTableColumns";
import { RequestVerifiedDataTable } from "../_components/RequestVerifiedDataTable";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "@/trpc/react";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState<number>(0);
  const [recentData, setRecentData] = useState<VerifiedRequest[]>([]);
  const setPageByAction = (action: "next" | "previous") => {
    if (action === "next") {
      setPage((prev) => prev + 1);
    } else if (page >= 1) {
      setPage((prev) => prev - 1);
    }
  };

  const { data } = api.admin.getVerifiedRequest.useQuery(
    {
      limit: 2,
      page: page,
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        const formattedData = data.items.map((e) => {
          const req: VerifiedRequest = {
            requestDate: e.createdAt,
            requestId: e.id,
            hostId: e.hostID,
            firstName: e.host.firstName,
            lastName: e.host.lastName,
            userName: e.host.aka,
            profileImageURL: e.host.profileImageURL!,
            nationalIdCardImageURL: e.nationalIDCardImageURL,
          };
          return req;
        });
        setRecentData(formattedData);
      },
    },
  );
  return (
    <div className="flex flex-row">
      <div className="h-screen w-[200px] min-w-[200px] bg-red-500">hello</div>
      <div className=" flex w-full flex-col gap-4 p-9">
        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-2">
            <FontAwesomeIcon
              className="text-secondary-500"
              icon={faUserCheck}
              width={20}
              height={20}
            />
            <span className="h4 font-bold">Verified Request</span>
          </div>
          <span className="text-sm text-medium">
            A descriptive body text comes here
          </span>
        </div>

        <RequestVerifiedDataTable
          columns={requestVerifiedDataTableColumns}
          data={recentData}
          hasPrev={page !== 0}
          hasNext={data?.hasNextPage ?? false}
          setPage={setPageByAction}
        />
      </div>
    </div>
  );
}
