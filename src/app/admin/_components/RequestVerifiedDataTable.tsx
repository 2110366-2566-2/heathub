"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Row,
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
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

import { api } from "@/trpc/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function RequestVerifiedDataTable<TData, TValue>({
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
  const updateVerifiedRequestStatus =
    api.admin.updateVerifiedRequestStatus.useMutation();

  const utils = api.useUtils();
  const handleUpdateVerifiedRequestStatus = async (
    hostId: string,
    status: "verified" | "rejected",
  ) => {
    try {
      await updateVerifiedRequestStatus.mutateAsync({
        hostID: hostId,
        updateStatus: status,
      });
      await utils.admin.getVerifiedRequest.invalidate();
    } catch (error) {
      console.error(error);
    }
  };

  const actionCols: ColumnDef<TData, TValue> = {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex w-fit flex-row">
          <Button
            onClick={() =>
              handleUpdateVerifiedRequestStatus(
                row.getValue("hostId"),
                "verified",
              )
            }
            className="space-x h-fit w-fit space-x-1 bg-transparent text-success hover:bg-transparent"
          >
            <FontAwesomeIcon icon={faCheck} width={20} height={20} />
            <span>Approve</span>
          </Button>
          <Button
            onClick={() =>
              handleUpdateVerifiedRequestStatus(
                row.getValue("hostId"),
                "rejected",
              )
            }
            className="h-fit w-fit space-x-1 bg-transparent text-neutral-500 hover:bg-transparent"
          >
            <FontAwesomeIcon icon={faBan} width={20} height={20} />
            <span>Reject</span>
          </Button>
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
