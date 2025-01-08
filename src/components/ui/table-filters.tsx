import { Input } from "./input";
import { TableSelectFilter } from "./table-select-filter";

import { Table } from "@tanstack/react-table";

export type TFilters = {
  placeholder: string;
  options?: string[];
  columnId: string;
  input?: boolean;
}[];

interface EmployeeFiltersProps<TData> {
  table: Table<TData>;
  filters: TFilters;
}

export function TableFilters<TData>({
  table,
  filters,
}: EmployeeFiltersProps<TData>) {
  return (
    <div className="flex items-center py-4 gap-2">
      {filters.map((filter) =>
        filter.input ? (
          <Input
            key={filter.columnId}
            placeholder={filter.placeholder}
            value={
              (table.getColumn(filter.columnId)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(filter.columnId)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : (
          <TableSelectFilter
            key={filter.columnId}
            table={table}
            columnId={filter.columnId}
            placeholder={filter.placeholder}
            options={filter.options ?? []}
          />
        )
      )}
    </div>
  );
}
