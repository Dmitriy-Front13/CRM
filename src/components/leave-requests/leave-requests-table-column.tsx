"use client";
import Link from "next/link";
import { LeaveRequest } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../ui/column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";
import { LEAVE_REQUEST_STATUS } from "@/constants";

export const columns: ColumnDef<LeaveRequest>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: "equals",
    enableColumnFilter: true,
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const getStatusStyle = (status: string) => {
        switch (status) {
          case LEAVE_REQUEST_STATUS.SUBMITTED:
            return "bg-blue-50 text-blue-700";
          case LEAVE_REQUEST_STATUS.CANCELLED:
            return "bg-gray-100 text-gray-700";
          case LEAVE_REQUEST_STATUS.APPROVED:
            return "bg-green-50 text-green-700";
          case LEAVE_REQUEST_STATUS.REJECTED:
            return "bg-red-50 text-red-700";
          default:
            return "bg-gray-100 text-gray-700";
        }
      };
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ getValue }) => formatDate(getValue() as Date),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ getValue }) => formatDate(getValue() as Date),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const leaveRequestId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/employees/${leaveRequestId}`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
