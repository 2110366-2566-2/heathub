"use client";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import { ReportTable } from "../_components/ReportTable";
import {
  type ReportRequest,
  reportTableColumns,
} from "../_components/ReportTableColumn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [page, setPage] = useState<number>(0);
  const [recentData, setRecentData] = useState<ReportRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const setPageByAction = (action: "next" | "previous") => {
    if (action === "next") {
      setPage((prev) => prev + 1);
    } else if (page >= 1) {
      setPage((prev) => prev - 1);
    }
  };

  const { data } = api.admin.getEventReports.useQuery(
    {
      limit: 6,
      page: page,
      status: statusFilter as
        | "pending"
        | "rejected"
        | "resolved"
        | "all"
        | undefined,
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        const formattedData = data.items.map((e) => {
          const req: ReportRequest = {
            eventId: e.eventID,
            reportId: e.id,
            participantName:
              e.participant.firstName + " " + e.participant.lastName,
            hostName: e.host.firstName + " " + e.host.lastName,
            title: e.title,
            detail: e.details,
            event: e.event,
            host: e.host,
            participant: e.participant,
          };
          return req;
        });
        setRecentData(formattedData);
      },
    },
  );

  const Filter = () => {
    return (
      <div className="flex flex-row items-center gap-2">
        <div className="h5 justify-start text-medium">Status</div>
        <Select
          name="status"
          defaultValue={statusFilter}
          onValueChange={(value: string) => {
            setStatusFilter(value);
          }}
        >
          <SelectTrigger className="min-w-32 border-none">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-row">
      <div className="flex w-full flex-col gap-4 p-9">
        <div className="flex flex-row justify-between">
          <div className="items-left flex flex-col justify-center ">
            <div className="flex flex-row items-center space-x-2">
              <FontAwesomeIcon
                className="text-secondary-500"
                icon={faFlag}
                width={20}
                height={20}
              />
              <span className="h4 font-bold">Report</span>
            </div>
            <span className="text-sm text-medium">
              A descriptive body text comes here
            </span>
          </div>
          <div className="flex flex-row-reverse">
            <Filter />
          </div>
        </div>
        <ReportTable
          columns={reportTableColumns}
          data={recentData}
          hasPrev={page !== 0}
          hasNext={data?.hasNextPage ?? false}
          setPage={setPageByAction}
        />
      </div>
    </div>
  );
}
