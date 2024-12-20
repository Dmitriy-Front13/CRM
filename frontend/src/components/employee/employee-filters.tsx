import { Input } from "../ui/input";
import { TableSelectFilter } from "../ui/table-select-filter";

import { Table } from "@tanstack/react-table";
import { FilterOptions } from "./employee-table";
interface EmployeeFiltersProps<TData> extends FilterOptions {
  table: Table<TData>;
}

export function EmployeeFilters<TData>({
  table,
  statuses,
  positions,
  subdivisions,
}: EmployeeFiltersProps<TData>) {
  return (
    <div className="flex items-center py-4 gap-2">
      <Input
        placeholder="Search by Name"
        value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("fullName")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <TableSelectFilter
        table={table}
        columnId="status"
        placeholder="All statuses"
        options={statuses}
      />

      <TableSelectFilter
        table={table}
        columnId="position"
        placeholder="All positions"
        options={positions}
      />

      <TableSelectFilter
        table={table}
        columnId="subdivision"
        placeholder="All subdivisions"
        options={subdivisions}
      />
    </div>
  );
}
