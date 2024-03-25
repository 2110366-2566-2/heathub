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
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SeeMoreModal } from "./SeeMoreModal";
import { ReportRequest } from "./ReportTableColumn";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ReportTable<TData, TValue>({
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

  const actionCols: ColumnDef<TData, TValue> = {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original as ReportRequest;
      return (
        <div className="relative">
          <SeeMoreModal
            reportID={rowData.reportId}
            title={rowData.title}
            detail={rowData.detail}
            event={rowData.event}
            host={rowData.host}
            participant={rowData.participant}
          >
            <Button variant={'link'} className="h1 text-secondary-500 px-0">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="pr-1 text-secondary-500"
              />
              See More Detail
            </Button>
          </SeeMoreModal>
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
      <div className="rounded-md  border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-left text-neutral-500 ${header.id === "action" ? "w-40" : ""}`}
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
                  className="text-left"
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
