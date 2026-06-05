"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerFieldProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder,
  label,
}: DatePickerFieldProps) {
  const date = value ? new Date(value) : undefined;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-semibold text-muted-foreground tracking-wide uppercase inline-flex items-center gap-1">
        <CalendarDays size={12} />
        {label}
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full h-12 rounded-xl border border-border bg-input-bg px-4",
              "text-sm text-left outline-none",
              "flex items-center justify-between",
              "hover:border-foreground transition-colors",
              !date && "text-muted-foreground"
            )}
          >
            <span>
              {date ? format(date, "PPP") : placeholder}
            </span>

            <CalendarDays
              size={16}
              className="opacity-60"
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-auto p-0 overflow-hidden rounded-2xl border border-border bg-card"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => {
              if (!selected) return;

              onChange(selected.toISOString());
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}