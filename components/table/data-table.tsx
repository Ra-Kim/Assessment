"use client";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
  Row,
  RowModel,
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import SearchBar from "@/components/search";
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeftIcon,
  ChevronRightIcon,
  Download,
  Search,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as XLSX from "xlsx";
import { purchaseOrderData } from "@/lib/constants";
import { DataTableFacetedFilter } from "./facet";
import { Input } from "../ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: typeof purchaseOrderData.purchase_orders;
}

function PurchaseOrderDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<(typeof purchaseOrderData.purchase_orders)[0], TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const statuses = [
    "Draft",
    "Pending",
    "Closed",
    "Delivered",
    "Completed",
    "Issued",
  ];
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [{ pageSize, pageIndex }, setPagination] =
    React.useState<PaginationState>({ pageSize: 10, pageIndex: 0 });
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    },
  });

  const handleExportRows = ({
    rows,
  }: {
    rows: Row<(typeof purchaseOrderData.purchase_orders)[0]>[];
  }) => {
    const header = table
      .getVisibleFlatColumns()
      .map((c) => c.columnDef.header as string);
    const compatibleData = rows.map((row) => {
      const obj: { [key: string]: any } = {};
      header.forEach((col, index) => {
        row.getVisibleCells().map((cell) => {
          if (cell.column.columnDef.header === col) {
            // console.log(cell.getValue());
            obj[col] = cell.getValue();
          }
        });
      });
      return obj;
    });
    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, { header });
    XLSX.utils.book_append_sheet(wb, ws1, "Purchase Orders");
    XLSX.writeFile(wb, `Purchase Orders.xlsx`);
    // toast.success("Exporting data...");
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between text-[#475569]">
        <div className="flex gap-2 text-sm text-muted-foreground font-semibold items-center">
          {/* search filter */}
          <div className="h-[2.25rem] w-[24rem] border border-[#CBD5E1] px-1 flex items-center">
            <Search size={18} />
            <Input
              name="search"
              value={globalFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGlobalFilter(e.target.value)
              }
              placeholder="Search by vendor name, id, amount..."
              className="border-none outline-none h-[95%] bg-transparent"
            />
          </div>
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}
        </div>
        <div className="relative ml-auto flex justify-end gap-6 items-center">
          {/* column visibility */}
          <>
            <p>Sort</p>
            <Button
              className="flex gap-2 items-center bg-white border border-[#E2E8F0] text-sm text-[#475569]"
              onClick={() => {
                handleExportRows({
                  rows: table.getPrePaginationRowModel().rows,
                });
              }}
            >
              <p>Date Added</p>
              <ChevronDown size={18} />
            </Button>
            <Button
              className="flex gap-2 items-center bg-white border border-[#E2E8F0] text-sm text-[#475569]"
              onClick={() => {
                handleExportRows({
                  rows: table.getPrePaginationRowModel().rows,
                });
              }}
            >
              <Download size={18} />
              <p>Export</p>
              <ChevronDown size={18} />
            </Button>
          </>
        </div>
      </div>

      {/* table */}
      <div className="rounded-2xl mt-4">
        <Table className="border border-[#F1F5F9] rounded-2xl z-10">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup, idx) => {
              return (
                <TableRow key={`headerGroup${headerGroup.id}${idx}`} className="bg-[#F8FAFC]">
                  {headerGroup.headers.map((header, idx) => {
                    return (
                      <TableHead
                        key={`header${header.id}${idx}`}
                        className="text-sm text-[#475569] font-semibold h-[68px] align-top pt-2"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          {/* <div className="mt-4 bg-white rounded-md border"> */}
          <TableBody className="bg-white rounded-[10px] shadow-[0px_4px_12px_2px_#0000001A] ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow key={`row${row.id}`} className={`rounded-[10px]`}>
                  {row.getVisibleCells().map((cell, idx) => (
                    <TableCell
                      key={`cell${cell.id}${idx}`}
                      className={`text-sm text-[#475569] font-medium px-5 align-top`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
          {/* </div> */}
        </Table>
      </div>
      <div className="flex justify-between items-center mt-3">
        {/* row selection */}
        <div className="flex gap-4 items-center text-sm text-[#475569]">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
          {/* pagination */}
          <div className="flex items-center gap-2 ">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronFirst className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronLast className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-[#475569]">Show:</p>
          <div>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[110px]">
                <SelectValue
                  placeholder={`${table.getState().pagination.pageSize} rows`}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {["10 rows", "20 rows", "30 rows", "40 rows", "50 rows"].map(
                  (pageSize) => (
                    <SelectItem
                      key={pageSize}
                      value={`${pageSize.split(" ")[0]}`}
                    >
                      {pageSize}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseOrderDataTable;
