"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils/tailwind-merge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarFilter } from "@/components/ui/calendar-filter";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  isFilter: boolean;
}

export function DatePicker(props: DatePickerProps) {
  const { date, setDate, isFilter } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start border-primary-300 text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-white p-0">
        {isFilter ? (
          <CalendarFilter
            mode="single"
            captionLayout="dropdown-buttons"
            selected={date}
            onSelect={setDate}
            fromYear={new Date().getFullYear() - 120}
            toDate={new Date()}
            initialFocus
          />
        ) : (
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
