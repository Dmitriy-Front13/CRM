"use client";
import { Employee } from "@shared/types";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../ui/column-header";

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
    accessorKey: "subdivision",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subdivision" />
    ),
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
  },
  {
    accessorKey: "peoplePartner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="People Partner" />
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
    accessorKey: "Action",
    header: "Action",
  },
];
