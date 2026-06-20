/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ArrowRight, Camera, ImageUp, HelpCircle, ArrowLeft, User, Sparkles } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { EventService } from "@/api/event";
import { Button } from "@/components/ui/button";

const checkInSchema = z.object({
  fullName: z.string().min(1, "Please provide your first and last name to proceed."),
});

type CheckInForm = z.infer<typeof checkInSchema>;
type FlowPhases = "IDENTITY_VERIFICATION" | "ACTION_ROUTE_SELECTION";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

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
      } catch (err: any) {
        toast.error("Portal access denied.");
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
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-6">
          <div className="h-16 w-16 rounded-full border-t-2 border-white animate-spin opacity-20" />
          <p className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase italic">Verifying Access</p>
        </div>
      </div>
    );
  }

  if (!eventData) return null;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white antialiased font-body relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

      <header className="px-6 h-24 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl w-full mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/5 px-8 h-16 rounded-full shadow-2xl"
        >
          <button
            onClick={() => phase === "IDENTITY_VERIFICATION" ? router.push("/event/join") : setPhase("IDENTITY_VERIFICATION")}
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all cursor-pointer font-bold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> {phase === "IDENTITY_VERIFICATION" ? "Exit" : "Identify"}
          </button>

          <div className="flex items-center gap-2 cursor-pointer font-heading">
            <span className="font-bold text-xl tracking-tighter italic">glimpse</span>
          </div>
        </motion.div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-16">
        <div className="w-full max-w-lg bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[60px] shadow-2xl space-y-12">
          
          <AnimatePresence mode="wait">
            {phase === "IDENTITY_VERIFICATION" && (
              <motion.div
                key="identity"
                {...fadeInUp}
                className="space-y-12"
              >
                <div className="space-y-6 text-center lg:text-left">
                  <div className="mx-auto lg:ml-0 h-20 w-20 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 shadow-2xl">
                    <User className="h-10 w-10 opacity-20" />
                  </div>
                  
                  <div className="space-y-4">
                     <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Check-In</span>
                     <h1 className="text-4xl md:text-5xl font-heading text-white tracking-tighter leading-none italic">
                        Who is joining?
                     </h1>
                     <p className="text-xl text-white/40 leading-relaxed font-light italic">
                        Entering gateway: <span className="text-white font-medium not-italic">{eventData.title}</span>
                     </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label htmlFor="fullName" className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold ml-4">Full Name</label>
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="Your first and last name..."
                      autoComplete="off"
                      className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-full px-8 text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all italic text-lg"
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-xs text-red-500 italic ml-4">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center gap-4 shadow-xl">
                    <Sparkles className="h-5 w-5 text-white/20 shrink-0" />
                    <p className="text-xs text-white/40 font-light italic leading-relaxed">
                      Allocation: <strong className="text-white font-bold not-italic">{eventData.photoLimit} Candid Lens</strong> shots authorized.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    disabled={!nameInputWatcher.trim()}
                    onClick={handleSubmit(onProceedIdentity)}
                    className="w-full h-20 bg-white text-black text-[11px] uppercase tracking-[0.4em] rounded-full font-bold shadow-2xl flex items-center justify-center gap-3 disabled:opacity-30 transition-all"
                  >
                    Enter Portal <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {phase === "ACTION_ROUTE_SELECTION" && (
              <motion.div
                key="route"
                {...fadeInUp}
                className="space-y-12"
              >
                <div className="space-y-6 text-center lg:text-left">
                  <div className="mx-auto lg:ml-0 h-20 w-20 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 shadow-2xl">
                    <Sparkles className="h-10 w-10 opacity-20" />
                  </div>
                  
                  <div className="space-y-4">
                     <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Select Pathway</span>
                     <h1 className="text-4xl md:text-5xl font-heading text-white tracking-tighter leading-none italic">
                        Choose Action.
                     </h1>
                     <p className="text-xl text-white/40 leading-relaxed font-light italic">
                        Select how you want to interact with the shared gallery stream.
                     </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(`/guest-hub/${eventData.id}/upload`)}
                    className="w-full flex items-center gap-6 p-8 rounded-[40px] border border-white/5 bg-white/[0.01] hover:border-white/20 transition-all text-left group shadow-xl"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-white transition-all">
                      <ImageUp size={24} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-base uppercase tracking-widest">Upload Candids</h3>
                      <p className="text-xs text-white/30 italic font-light">Drop captures directly into the shared wall.</p>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(`/guest/${eventData.id}/selfie`)}
                    className="w-full flex items-center gap-6 p-8 rounded-[40px] border border-white/5 bg-white/[0.01] hover:border-white/20 transition-all text-left group shadow-xl"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-white transition-all">
                      <Camera size={24} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-base uppercase tracking-widest">Register Face</h3>
                      <p className="text-xs text-white/30 italic font-light">Get notified when AI detects your picture.</p>
                    </div>
                  </motion.button>
                </div>

                <div className="flex flex-col items-center gap-6 pt-8 border-t border-white/5">
                  <button
                    onClick={() => toast.info("Allocations managed by event host.")}
                    className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all font-bold flex items-center gap-2 italic"
                  >
                    <HelpCircle size={14} /> Allocation intelligence
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <footer className="h-24 flex items-center justify-center">
         <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">© glimpse systems • gateway session active</p>
      </footer>
    </div>
  );
}