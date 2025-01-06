import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select";
interface TableSelectFilterProps<TData> {
  table: Table<TData>;
  columnId: string;
  placeholder: string;
  options: string[];
}

export function TableSelectFilter<TData>({
  table,
  columnId,
  placeholder,
  options,
}: TableSelectFilterProps<TData>) {
  return (
    <Select
      defaultValue={
        (table.getColumn(columnId)?.getFilterValue() as string) ?? ""
      }
      onValueChange={(value) => {
        if (value === "all") {
          table.getColumn(columnId)?.setFilterValue("");
          return;
        }
        table.getColumn(columnId)?.setFilterValue(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{placeholder}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
