/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/event/join/[eventId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ArrowRight, Camera, ImageUp, HelpCircle, ArrowLeft } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { EventService } from "@/api/event";
import { Button } from "@/components/ui/button";

const checkInSchema = z.object({
  fullName: z.string().min(1, "Please provide your first and last name to proceed."),
});

type CheckInForm = z.infer<typeof checkInSchema>;
type FlowPhases = "IDENTITY_VERIFICATION" | "ACTION_ROUTE_SELECTION";

export default function GuestCheckInPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventId = params?.id as string;
  const inviteToken = searchParams.get("inviteToken") || undefined;

  const { loading: isAuthLoading, user } = useAuth();
  
  const [phase, setPhase] = useState<FlowPhases>("IDENTITY_VERIFICATION");
  const [isVerifyingAccess, setIsVerifyingAccess] = useState(true);
  const [eventData, setEventData] = useState<{ id: string; title: string; photoLimit: number } | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CheckInForm>({
    resolver: zodResolver(checkInSchema),
    defaultValues: { fullName: "" }
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const nameInputWatcher = watch("fullName") || "";

  useEffect(() => {
    if (!eventId) return;

    async function verifyGatewayPipeline() {
      try {
        setIsVerifyingAccess(true);
        const res = await EventService.checkGateAccess(eventId, inviteToken);
        
        setEventData({
          id: res.eventId,
          title: res.title,
          photoLimit: res.limit || 15 
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const failureNotice = err?.response?.data?.message || "This event link is no longer accepting portal entries.";
        toast.error(failureNotice);
        router.push("/event/join"); 
      } finally {
        setIsVerifyingAccess(false);
      }
    }

    verifyGatewayPipeline();
  }, [eventId, inviteToken, router]);

  useEffect(() => {
    if (user?.full_name) {
      setValue("fullName", user.full_name);
    }
  }, [user, setValue]);

  const onProceedIdentity = (data: CheckInForm) => {
    setPhase("ACTION_ROUTE_SELECTION");
  };

  if (isAuthLoading || isVerifyingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <p className="text-xs font-mono tracking-widest text-muted-foreground/60 uppercase">Verifying Portal Access...</p>
        </div>
      </div>
    );
  }

  if (!eventData) return null;

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-background text-foreground select-none overflow-hidden relative">
      <div className="w-full max-w-sm flex flex-col justify-between min-h-[80vh] relative z-20">
        
        <AnimatePresence mode="wait">
          {/* PHASE 1: IDENTITY PROFILE CHECK */}
          {phase === "IDENTITY_VERIFICATION" && (
            <motion.div
              key="identity-phase"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex-1 flex flex-col justify-center"
            >
              {/* Overlaid Polaroid Stack Graphic */}
              <div className="relative w-44 h-40 mx-auto mb-10 flex items-center justify-center">
                <div className="w-32 h-32 absolute rotate-[-8deg] rounded-2xl overflow-hidden border border-border/40 shadow-lg">
                  <Image src="/images/auth-image.png" alt="Candid Stack" fill className="object-cover grayscale-[30%]" />
                </div>
                <div className="w-32 h-32 absolute rotate-[6deg] translate-x-4 -translate-y-2 rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
                  <div className="w-full h-24 relative bg-zinc-900 flex items-center justify-center text-xl">
                    📸
                  </div>
                  <div className="p-1 text-center font-mono text-[8px] tracking-widest text-muted-foreground">GLIMPSE PASS</div>
                </div>
              </div>

              {/* Title matches screenshot formatting using dynamic title pulled from verified API response */}
              <h1 className="text-3xl sm:text-[34px] font-serif tracking-tight leading-[1.1] mb-2">
                Who is joining the<br />Event?
              </h1>
              <p className="text-xs text-muted-foreground mb-8 font-sans">
                Entering gateway: <span className="text-foreground font-medium italic">{eventData.title}</span>
              </p>

              {/* Floating Input field container */}
              <div className="relative w-full mb-3">
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Type your first and last name..."
                  autoComplete="off"
                  className="w-full h-14 rounded-xl border border-border bg-input-bg px-5 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/30"
                />
                {errors.fullName && (
                  <p className="mt-2 text-xs text-red-500 pl-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Dynamic Notification Allocation parameters display */}
              <div className="w-full h-10 border border-border/40 rounded-xl bg-card/10 flex items-center px-4 gap-2 mb-8">
                <p className="text-[11px] font-sans text-muted-foreground leading-snug">
                  The Host has allocated you <strong className="text-foreground font-semibold">{eventData.photoLimit} Candid Lens</strong> shots.
                </p>
              </div>

              <Button
                type="button"
                disabled={!nameInputWatcher.trim()}
                onClick={handleSubmit(onProceedIdentity)}
                className="rounded-full w-full h-12 bg-foreground text-background font-sans font-semibold text-sm transition-all hover:opacity-90 inline-flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
              >
                Get in <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}

          {/* CAMERA PATHWAY ROUTING SELECTIONS */}
          {phase === "ACTION_ROUTE_SELECTION" && (
            <motion.div
              key="route-phase"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex-1 flex flex-col justify-center"
            >
              <div className="mb-6">
                <h1 className="text-3xl font-serif tracking-tight leading-[1.1] mb-2">Choose your pathway</h1>
                <p className="text-muted-foreground text-xs sm:text-sm">Select how you want to interact with this shared gallery stream right now.</p>
              </div>

              <div className="space-y-3 w-full mb-8">
                {/* Bulk Media Upload Drops */}
                <button
                  type="button"
                  onClick={() => router.push(`/guest-hub/${eventData.id}/upload`)}
                  className="w-full flex items-start gap-4 p-4 rounded-xl border border-border bg-input-bg hover:border-foreground/30 text-left transition-all cursor-pointer group"
                >
                  <div className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground group-hover:text-foreground group-hover:border-foreground transition-colors">
                    <ImageUp size={18} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold mb-0.5">Upload Stored Candids</h3>
                    <p className="text-xs text-muted-foreground leading-normal">Drop unedited captures directly into the host&apos;s real-time shared visual wall.</p>
                  </div>
                </button>

                {/* Pathway 2: AI Face Sync Selfie Registration */}
                <button
                  type="button"
                  onClick={() => router.push(`/guest/${eventData.id}/selfie`)}
                  className="w-full flex items-start gap-4 p-4 rounded-xl border border-border bg-input-bg hover:border-foreground/30 text-left transition-all cursor-pointer group"
                >
                  <div className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground group-hover:text-foreground group-hover:border-foreground transition-colors">
                    <Camera size={18} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold mb-0.5">Take a Setup Selfie</h3>
                    <p className="text-xs text-muted-foreground leading-normal">Register your face so AI matching filters can notify you when someone takes your picture.</p>
                  </div>
                </button>
              </div>

              {/* Utility Backlinks Stack */}
              <div className="flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={() => toast.info("Face sync matches photo tags effortlessly.")}
                  className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
                >
                  <HelpCircle size={13} /> Learn more about guest allocations
                </button>
                
                <button
                  type="button"
                  onClick={() => setPhase("IDENTITY_VERIFICATION")}
                  className="text-xs font-sans font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mt-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft size={14} /> Change Name
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}