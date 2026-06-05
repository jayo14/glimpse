"use client";

import React, { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { EventFormInputs } from "@/validators/event";

interface MetricsStepProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MetricsStep({
  imagePreview,
  onImageChange,
}: MetricsStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EventFormInputs>();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full flex flex-col"
    >
      {/* Cover Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-44 relative mb-6 rounded-2xl overflow-hidden border border-border bg-card/40 flex flex-col items-center justify-center cursor-pointer group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onImageChange}
          accept="image/*"
          className="hidden"
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            fill
            className="object-cover"
          />
        )}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs px-4 py-2 rounded-full inline-flex items-center gap-1.5">
          <Plus size={14} />
          {imagePreview ? "Change Banner" : "Add Cover Asset"}
        </div>
      </div>

      <h1 className="text-3xl font-serif tracking-tight leading-[1.1] mb-6">
        What should we call this Event?
      </h1>

      <div className="relative w-full mb-8">
        <input
          {...register("title")}
          type="text"
          placeholder="Enter Event Name (e.g., Summer Wedding 2026)"
          className="w-full h-14 rounded-xl border border-border bg-input-bg px-5 text-sm text-foreground outline-none focus:border-foreground"
        />
        {errors.title && (
          <p className="mt-2 text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-muted-foreground/80 mb-3 block">
        Event Limits (Optional)
      </span>

      <div className="space-y-3 w-full">
        {/* Photo Limits */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/40">
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Guest Photo Limit
            </h4>
            <p className="text-xs text-muted-foreground">
              Per guest, per session
            </p>
          </div>
          <Controller
            name="guest_photo_limit"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    field.onChange(Math.max(0, (field.value || 0) - 1))
                  }
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold min-w-[55px] text-center">
                  {field.value || 0}
                  <span className="text-xs text-muted-foreground font-normal ml-0.5">
                    Shots
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => field.onChange((field.value || 0) + 1)}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          />
        </div>

        {/* Headcount Limits */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/40">
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Expected Attendees
            </h4>
            <p className="text-xs text-muted-foreground">
              Approximate headcount
            </p>
          </div>
          <Controller
            name="attendees"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    field.onChange(Math.max(0, (field.value || 0) - 10))
                  }
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold min-w-[55px] text-center">
                  {field.value || 0}
                  <span className="text-xs text-muted-foreground font-normal ml-0.5">
                    Guests
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => field.onChange((field.value || 0) + 10)}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
