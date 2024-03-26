"use client";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/trpc/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RejectedRequestModal from "./RejectedRequestModal";
import { useToast } from "@/components/ui/use-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function WithdrawalTable<TData, TValue>({
  columns,
  data,
  hasPrev,
  hasNext,
  setPage,
}: DataTableProps<TData, TValue> & {
  hasPrev: boolean;
  hasNext: boolean;
  setPage: (action: "next" | "previous") => void;
}) {
  const { toast } = useToast();
  const completeWithdrawalRequest =
    api.admin.completeWithdrawalRequest.useMutation();

  const rejectWithdrawalRequest =
    api.admin.rejectWithdrawalRequest.useMutation();

  const utils = api.useUtils();
  const handleCompleteRequest = async (requestId: number) => {
    try {
      await completeWithdrawalRequest.mutateAsync({
        requestID: requestId,
      });
      await utils.admin.getWithdrawalRequest.invalidate();
      toast({
        title: `Successfully approved withdrawal request id ${requestId}`,
        description: `Withdrawal request id ${requestId} is approved`,
      });
    } catch (error) {
      toast({
        title: `Failed to approve withdrawal request id ${requestId}`,
        description: `Withdrawal request id ${requestId} is approved`,
        variant: "error",
      });
    }
  };
  const handleRejectRequest = async (requestId: number) => {
    try {
      await rejectWithdrawalRequest.mutateAsync({
        requestID: requestId,
      });
      await utils.admin.getWithdrawalRequest.invalidate();

      toast({
        title: `Successfully rejected request id ${requestId}`,
        description: `Withdrawal request id ${requestId} is rejected`,
      });
    } catch (error) {
      toast({
        title: `Failed to reject request id ${requestId}`,
        description: `Withdrawal request id ${requestId} is rejected`,
        variant: "error",
      });
    }
  };

  const actionCols: ColumnDef<TData, TValue> = {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const requestId: number = row.getValue("requestId");
      const handleReject = async () => {
        await handleRejectRequest(requestId);
      };
      return (
        <div className="flex w-full flex-row items-center justify-center">
          <Button
            onClick={() => handleCompleteRequest(requestId)}
            className="h5 space-x h-fit w-fit space-x-1 bg-transparent text-success hover:bg-transparent"
          >
            <FontAwesomeIcon icon={faCheck} width={20} height={20} />
            <span>Complete</span>
          </Button>
          <RejectedRequestModal rejectOnClick={handleReject} />
        </div>
      );
    },
  };
  const allCols: ColumnDef<TData, TValue>[] = [...columns, actionCols];

  const table = useReactTable({
    data,
    columns: allCols,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex min-h-[600px] flex-col gap-2">
      <div className=" flex justify-end text-neutral-500">
        {data.length} rows
      </div>
      <div className="rounded-md  border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center text-neutral-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-center"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-neutral-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-auto flex justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage("previous")}
          disabled={!hasPrev}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage("next")}
          disabled={!hasNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
