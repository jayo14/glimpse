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
      className="w-full flex flex-col space-y-12"
    >
      <div className="space-y-6 text-center lg:text-left">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Chronology</span>
        <h1 className="text-4xl md:text-5xl font-heading text-white tracking-tighter leading-none italic">Almost there.</h1>
        <p className="text-xl text-white/40 font-light leading-relaxed italic">Set the chronological parameters and visual descriptors.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            control={control}
            name="event_start"
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
            name="event_end"
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

        <div className="relative w-full">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"><MapPin size={18} strokeWidth={1.5} /></span>
          <input 
            {...register("location")} 
            type="text" 
            placeholder="Venue Location (Optional)" 
            className="w-full h-16 rounded-full border border-white/10 bg-white/[0.03] pl-16 pr-8 text-lg text-white font-body outline-none focus:border-white transition-all italic placeholder:text-white/5" 
          />
        </div>

        <div className="relative w-full">
          <span className="absolute left-6 top-6 text-white/20"><AlignLeft size={18} strokeWidth={1.5} /></span>
          <textarea 
            {...register("description")} 
            placeholder="Add message details for guests (Optional)" 
            rows={4} 
            className="w-full rounded-[32px] border border-white/10 bg-white/[0.03] pl-16 pr-8 py-6 text-lg text-white font-body outline-none focus:border-white transition-all italic resize-none placeholder:text-white/5" 
          />
        </div>
      </div>
    </motion.div>
  );
}