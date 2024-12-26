"use client";
import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  SortingState,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  RowData
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EmployeeFilters } from "./employee-filters";
import { updateEmployee } from "@/services/employees";


declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}
export interface FilterOptions {
  statuses: string[];
  positions: string[];
  subdivisions: string[];
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterOptions: FilterOptions;
}

export function EmployeeTable<TData, TValue>({
  columns,
  data: initialData,
  filterOptions,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(initialData);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      updateData: async (rowIndex: number, columnId: string, value: unknown) => {
        const oldData = [...data];
        const currentEmployee = { ...data[rowIndex] as any };
        const updatedEmployee = {
          ...currentEmployee,
          [columnId]: value
        };
        setData(old =>
          old.map((row, index) => index === rowIndex ? updatedEmployee : row)
        );
        try {
          await updateEmployee(updatedEmployee.id, updatedEmployee);
        } catch (error) {
          setData(oldData);
          console.error('Error updating employee:', error);
        }
      },
    },  
  });

  return (
    <>
      <EmployeeFilters
        table={table}
        statuses={filterOptions.statuses}
        positions={filterOptions.positions}
        subdivisions={filterOptions.subdivisions}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
