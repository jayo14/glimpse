"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { MapPin, AlignLeft } from "lucide-react";
import { EventFormInputs } from "@/validators/event";
import { DatePicker } from "@/components/ui/date-picker";

export default function DetailsStep() {
  const { register, control } = useFormContext<EventFormInputs>();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-serif tracking-tight leading-[1.1] mb-2">Almost there</h1>
        <p className="text-muted-foreground text-sm">Set the chronological parameters and structural visual descriptors.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Controller
          control={control}
          name="start_time"
          render={({ field }) => (
            <DatePicker
              label="Event Start"
              placeholder="Pick start date"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="end_time"
          render={({ field }) => (
            <DatePicker
              label="Event End"
              placeholder="Pick end date"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="relative w-full mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"><MapPin size={16} /></span>
        <input {...register("location")} type="text" placeholder="Venue Location (Optional)" className="w-full h-12 rounded-xl border border-border bg-input-bg pl-11 pr-5 text-sm text-foreground outline-none focus:border-foreground" />
      </div>

      <div className="relative w-full mb-6">
        <span className="absolute left-4 top-4 text-muted-foreground/60"><AlignLeft size={16} /></span>
        <textarea {...register("description")} placeholder="Add message details for guests (Optional)" rows={4} className="w-full rounded-xl border border-border bg-input-bg pl-11 pr-5 py-3 text-sm text-foreground outline-none focus:border-foreground resize-none" />
      </div>
    </motion.div>
  );
}