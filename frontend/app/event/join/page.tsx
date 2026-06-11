/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/guest/portal/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { EventService } from "@/api/event";

const portalSchema = z.object({
  event_code: z.string().min(4, "Please enter a valid event code parameters."),
});

type PortalInput = z.infer<typeof portalSchema>;

export default function EventJoinPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch } = useForm<PortalInput>({
    resolver: zodResolver(portalSchema),
    defaultValues: { event_code: "" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const codeValue = watch("event_code") || "";

  const onSubmit = async (data: PortalInput) => {
    setIsSubmitting(true);
    try {
      await EventService.checkGateAccess(data.event_code);
      
      toast.success("Access authorized. Syncing visual stream stream link...");
      router.push(`/guest/${data.event_code}`);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Access denied. Invalid or expired portal token code.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-background text-foreground select-none relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm flex flex-col items-center text-center"
      >
        {/* TICKET PASS BADGE ELEMENT */}
        <div className="w-44 h-20 border border-border/40 rounded-xl relative mb-10 flex items-center px-4 bg-card/10 opacity-60">
          <div className="w-3 h-6 border-r border-t border-b border-border/40 bg-background absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full" />
          <div className="w-3 h-6 border-l border-t border-b border-border/40 bg-background absolute right-0 top-1/2 -translate-y-1/2 rounded-l-full" />

          <div className="flex flex-col text-left justify-center flex-1">
            <span className="font-sans text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
              Glimpse
            </span>
            <span className="font-serif text-[10px] tracking-wider text-muted-foreground/60 mt-0.5">
              EVENT PASS
            </span>
          </div>
          <div className="h-full border-l border-dashed border-border/40 mx-4" />
          <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
          </div>
        </div>

        {/* Headline Header Typography */}
        <h1 className="text-3xl sm:text-4xl font-serif tracking-tight leading-[1.1] mb-4">
          Enter the Glimpse
          <br />
          Portal.
        </h1>

        <p className="text-muted-foreground text-xs sm:text-sm max-w-xs mb-8 leading-relaxed">
          Got an invite? Drop your event code below or scan the host&apos;s QR to jump straight in.
        </p>

        {/* INPUT SUBMISSION FIELD FLOW */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full relative mb-6"
        >
          <input
            {...register("event_code")}
            type="text"
            placeholder="Event Code"
            autoComplete="off"
            className="w-full h-14 rounded-xl border border-border bg-input-bg px-6 pr-16 text-md font-mono tracking-[0.25em] text-foreground outline-none focus:border-foreground uppercase placeholder:font-sans placeholder:tracking-normal placeholder:text-muted-foreground/40"
          />
          <button
            type="submit"
            disabled={isSubmitting || !codeValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center transition-all hover:opacity-90 active:scale-95 disabled:opacity-20 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowRight size={16} />
            )}
          </button>
        </form>

        {/* Splitting Dividers */}
        <div className="w-full flex items-center justify-center gap-4 my-2 mb-6">
          <div className="h-[1px] bg-border/40 flex-1" />
          <span className="text-[10px] font-sans font-bold text-muted-foreground/40 uppercase tracking-widest">
            or
          </span>
          <div className="h-[1px] bg-border/40 flex-1" />
        </div>

        {/* NATIVE CAMERA TRIGGERS ACCORDIONS */}
        <Button
          type="button"
          size="lg"
          className="rounded-full w-full h-12 transition-colors gap-2 font-sans tracking-wide text-xs uppercase cursor-pointer"
        >
            
          <span className="font-bold lowercase">or</span> Scan Event QR Code
        </Button>
      </motion.div>
    </div>
  );
}