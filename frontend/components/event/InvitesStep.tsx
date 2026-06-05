"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { EventFormInputs } from "@/validators/event";

export default function InvitesStep() {
  const { register, control } = useFormContext<EventFormInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "photographers",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-serif tracking-tight leading-[1.1] mb-2">
          Invite your photographers.
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Add photographer email addresses. They&apos;ll receive a Glimpse
          invite to join and sync their professional galleries with your event.
        </p>
      </div>

      <div className="space-y-3 max-h-[35vh] overflow-y-auto pr-1 mb-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-full border border-border bg-card/60 flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground">
              {index + 1}
            </div>
            <div className="flex-1 relative">
              <input
                {...register(`photographers.${index}.email` as const)}
                type="email"
                placeholder="photographer@studio.com"
                className="w-full h-12 rounded-xl border border-border bg-input-bg px-4 text-sm text-foreground outline-none focus:border-foreground"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ email: "" })}
        className="self-start h-11 border border-border px-5 rounded-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-foreground bg-card/20 hover:bg-card/60 transition-colors"
      >
        <Plus size={14} /> Add photographer
      </button>

      <p className="text-muted-foreground text-xs mt-4 leading-relaxed">
        You can invite photographers later from your event dashboard.
      </p>
    </motion.div>
  );
}
