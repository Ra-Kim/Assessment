"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { purchaseOrderData } from "@/lib/constants";
import { Columns3, Dot, Ellipsis } from "lucide-react";

export const purchaseOrderColumns: ColumnDef<
  (typeof purchaseOrderData.purchase_orders)[0]
>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          className="border-[2.5px] border-[#334155] rounded-[2px] data-[state=checked]:border-primary mt-3"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          className="border-[2.5px] border-[#334155] rounded-[2px] data-[state=checked]:border-[2.5px] data-[state=checked]:border-primary mt-4"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "#Purchase Order",
    accessorKey: "purchase_order",
    cell: ({ row }) => {
      return <div className="text-primary">{row.original.purchase_order}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Date Created",
    accessorKey: "date_created",
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Vendor Name",
    accessorKey: "vendor_name",
  },
  {
    header: "Expected Delievery Date",
    accessorKey: "expected_delivery_date",
  },
  {
    header: "Purchase Order Amount",
    accessorKey: "purchase_order_amount",
  },
  {
    header: "Outstanding Balance",
    accessorKey: "outstanding_balance",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Status status={status} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: ({ table }) => {
      return <Columns3 className="mt-2" />;
    },
    cell: () => {
      return <Ellipsis />;
    },
  },
];

const Status = ({status}:{status:string}) => {
  return (
    <div
    className={`flex items-center gap-1 text-sm font-bold rounded-sm px-[0.5px] justify-center ${
      status === "Draft"
        ? "text-[#475569] bg-[#F8FAFC]"
        : status === "Pending"
        ? "text-[#D97706] bg-[#FFFBEB]"
        : status === "Issued"
        ? "text-primary bg-[#EFF6FF]"
        : status === "Delivered"
        ? "text-[#059669] bg-[#ECFDF5]"
        : status === "Closed"
        ? "text-[#475569] bg-[#F8FAFC]"
        : "text-[#059669] bg-[#ECFDF5]"
    }`}
  >
    <Dot size={32}/>
    <p>{status}</p>
  </div>
  )
}