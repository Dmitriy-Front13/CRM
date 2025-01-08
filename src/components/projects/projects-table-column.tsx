"use client";
import Link from "next/link";
import { Project } from "@prisma/client";

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

const formatDate = (date: Date | null | undefined) => {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "projectName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
  },
  {
    accessorKey: "projectType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Type" />
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
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            status === "Active"
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "projectManager",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Manager" />
    ),
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
    cell: ({ row, table }) => {
      const projectId = row.original.id;
      const projectStatus = row.original.status;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/projects/${projectId}`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={
                projectStatus === "Active" ? "text-red-600" : "text-green-500"
              }
              onClick={() => {
                table.options.meta?.updateData(
                  row.index,
                  "status",
                  projectStatus === "Active" ? "Completed" : "Active"
                );
              }}
            >
              {projectStatus === "Active" ? "Completed" : "Activate"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
