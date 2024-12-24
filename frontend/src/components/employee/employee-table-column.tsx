"use client";
import Link from "next/link";
import { Employee } from "@shared/types";

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
export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
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
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
  },
  {
    accessorKey: "subdivision",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subdivision" />
    ),
  },
  {
    accessorKey: "projects",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Projects" />
    ),
    cell: ({ getValue }) => {
      const projects = getValue() as string[];
      return (
        <ul>
          {projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "outOfOfficeBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Out of Office Balance" />
    ),
  },
  {
    accessorKey: "peoplePartner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="People Partner" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employeeId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/employees/${employeeId}`} className="w-full">Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem >
              <Button className="text-red-600 w-full">Delete</Button>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
