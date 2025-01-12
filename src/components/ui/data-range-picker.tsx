"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useController } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "@/components/ui/form";

interface DateRangePickerProps {
  className?: string;
  control: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
  startFieldName: string;
  endFieldName: string;
  outOfOfficeBalance: number
}

export function DateRangePicker({
  control,
  startFieldName,
  endFieldName,
  outOfOfficeBalance
}: DateRangePickerProps) {
  const startDate = useController({
    name: startFieldName,
    control,
  });

  const endDate = useController({
    name: endFieldName,
    control,
  });

  const date: DateRange = {
    from: startDate.field.value,
    to: endDate.field.value,
  };

  const handleSelect = (range: DateRange | undefined) => {
    console.log(range)
    startDate.field.onChange(range?.from);
    endDate.field.onChange(range?.to);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          max={outOfOfficeBalance}
          selected={date}
          onSelect={handleSelect}
          disabled={{ before: new Date() }}
          modifiers={{ clickable: true }}
        />
      </PopoverContent>
    </Popover>
  );
}
