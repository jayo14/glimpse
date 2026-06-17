/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, User, Calendar, Camera, Plus, Clock, QrCode, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import LoaderTwo from "@/components/ui/loader-two";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";
import { useAuth } from "@/hooks/useAuth";

type ProfileSetupInput = {
  full_name: string;
  role: "HOST" | "PHOTOGRAPHER" | "GUEST";
};

type Steps = 
  | "NAME_INPUT" 
  | "ROLE_SELECT" 
  | "SAVING_CINEMATIC" 
  | "SUCCESS_HOST" 
  | "SUCCESS_PHOTOGRAPHER";

const ROLE_CARDS = [
  {
    id: "GUEST" as const,
    title: "Guest / Attendee",
    description: "Scan QR codes, upload raw candids, and view memories.",
    icon: User,
  },
  {
    id: "HOST" as const,
    title: "Event Organizer",
    description: "Host gatherings, customize streams, and invite guests.",
    icon: Calendar,
  },
  {
    id: "PHOTOGRAPHER" as const,
    title: "Pro Photographer",
    description: "Deliver high-fidelity professional galleries.",
    icon: Camera,
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const [step, setStep] = useState<Steps>("NAME_INPUT");
  const { error, setError, clear } = useApiStatus();

  const { loading } = useAuth({
    requireAuth: true,
  });

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm<ProfileSetupInput>({
    defaultValues: {
      full_name: "",
      role: "GUEST",
    },
  });

  const selectedRole = watch("role");
  const currentFullName = watch("full_name");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoaderTwo />
      </div>
    );
  }

  const handleNextStep = async () => {
    const isValidName = await trigger("full_name");
    if (isValidName) {
      clear();
      setStep("ROLE_SELECT");
    }
  };

  const onSubmit = async (data: ProfileSetupInput) => {
    clear();
    setStep("SAVING_CINEMATIC");

    try {
      await AuthService.updateProfile({
        full_name: data.full_name,
        role: data.role,
      });

      setTimeout(() => {
        if (data.role === "GUEST") {
          router.push("/event/join");
        } else if (data.role === "PHOTOGRAPHER") {
          setStep("SUCCESS_PHOTOGRAPHER");
        } else {
          setStep("SUCCESS_HOST");
        }
      }, 1500);
    } catch (err) {
      setError(err, "Failed to complete setup.");
      setStep("ROLE_SELECT");
    }
  };

  const currentStepIndex = step === "NAME_INPUT" ? 0 : step === "ROLE_SELECT" ? 1 : 2;

  const renderProgressBar = () => (
    <div className="flex items-center gap-2">
      {[0, 1].map((idx) => {
        const isActive = idx === currentStepIndex;
        return (
          <motion.div
            key={idx}
            animate={{ width: isActive ? 24 : 8 }}
            className={`h-1 rounded-full transition-all ${
              idx <= currentStepIndex ? "bg-white" : "bg-white/10"
            }`}
          />
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased font-body relative overflow-hidden">
      
      <header className="px-6 h-24 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl w-full mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/5 px-8 h-16 rounded-full shadow-2xl"
        >
          <button
            onClick={() => setStep("NAME_INPUT")}
            disabled={step === "NAME_INPUT"}
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all cursor-pointer font-bold disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back
          </button>

          <div className="flex items-center gap-2 cursor-pointer font-heading">
            <span className="font-bold text-xl tracking-tighter italic">glimpse</span>
          </div>
        </motion.div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-16">
        <div className="w-full max-w-lg bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[60px] shadow-2xl space-y-12">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <AnimatePresence mode="wait">
              
              {step === "NAME_INPUT" && (
                <motion.div
                  key="name-step"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <div className="space-y-6 text-center lg:text-left">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Profile Setup</span>
                    <h2 className="text-5xl md:text-6xl font-heading text-white tracking-tighter leading-none italic">
                      Identify.
                    </h2>
                    <p className="text-xl text-white/40 font-light leading-relaxed italic">
                      Please provide your full name to instantly begin organizing or personalizing your shared galleries.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label htmlFor="full_name" className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold ml-4">Full Name</label>
                      <input
                        {...register("full_name", { required: "Full name is required" })}
                        type="text"
                        placeholder="Event Architect"
                        autoComplete="off"
                        className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-full px-8 text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all italic text-lg"
                      />
                      {errors.full_name && (
                        <p className="mt-2 text-xs text-red-500 italic ml-4">{errors.full_name.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                      {renderProgressBar()}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        disabled={!currentFullName.trim()}
                        onClick={handleNextStep}
                        className="px-10 h-14 bg-white text-black text-[11px] uppercase tracking-[0.3em] rounded-full font-bold shadow-xl disabled:opacity-30 transition-all"
                      >
                        Continue
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "ROLE_SELECT" && (
                <motion.div
                  key="role-step"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <div className="space-y-6 text-center lg:text-left">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Purpose</span>
                    <h2 className="text-5xl md:text-6xl font-heading text-white tracking-tighter leading-none italic">
                      Select role.
                    </h2>
                    <p className="text-xl text-white/40 font-light leading-relaxed italic">
                      Hey {currentFullName.split(" ")[0]}, pick the account container option that mirrors your event objectives.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-1 gap-4">
                          {ROLE_CARDS.map((card) => {
                            const isSelected = field.value === card.id;
                            const CardIcon = card.icon;
                            return (
                              <button
                                key={card.id}
                                type="button"
                                onClick={() => field.onChange(card.id)}
                                className={`flex items-center gap-6 p-6 rounded-[32px] border transition-all text-left group shadow-xl ${
                                  isSelected
                                    ? "border-white bg-white/[0.05]"
                                    : "border-white/5 bg-white/[0.01] hover:border-white/20"
                                }`}
                              >
                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${isSelected ? 'bg-white text-black' : 'bg-white/5 text-white/30 group-hover:text-white'}`}>
                                  <CardIcon size={20} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-1">
                                  <h3 className="font-bold text-base uppercase tracking-widest">{card.title}</h3>
                                  <p className="text-xs text-white/30 italic font-light">{card.description}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    />

                    <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-8">
                      {renderProgressBar()}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="px-10 h-14 bg-white text-black text-[11px] uppercase tracking-[0.3em] rounded-full font-bold shadow-xl transition-all"
                      >
                        Finalize Setup
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "SAVING_CINEMATIC" && (
                <motion.div
                  key="saving-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-8"
                >
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center bg-white/5 shadow-2xl relative">
                    <div className="absolute inset-0 rounded-full border-t border-white animate-spin"></div>
                    <Loader2 className="h-8 w-8 text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-heading text-white italic tracking-tight">Configuring...</h2>
                    <p className="text-white/30 text-sm font-light italic">Tailoring your native workspace controls.</p>
                  </div>
                </motion.div>
              )}

              {step === "SUCCESS_HOST" && (
                <motion.div
                  key="host-success"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12 text-center"
                >
                  <div className="mx-auto h-24 w-24 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                    <Clock className="h-10 w-10 opacity-30" />
                  </div>

                  <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">
                      Event Host
                    </div>
                    <h1 className="text-5xl md:text-6xl font-heading text-white tracking-tighter leading-none italic">
                      Stage is ready.
                    </h1>
                    <p className="text-xl text-white/40 max-sm mx-auto font-light leading-relaxed italic">
                      Create an event to start capturing every candid moment.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 items-center">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/event/create")}
                      className="w-full h-20 bg-white text-black text-[11px] uppercase tracking-[0.4em] rounded-full font-bold shadow-2xl flex items-center justify-center gap-4"
                    >
                      <Plus className="h-5 w-5" /> Create Event
                    </motion.button>
                    <button
                      onClick={() => router.push("/host")}
                      className="text-[10px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-all font-bold"
                    >
                      Skip to Dashboard
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "SUCCESS_PHOTOGRAPHER" && (
                <motion.div
                  key="photographer-success"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12 text-center"
                >
                  <div className="mx-auto h-24 w-24 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                    <Camera className="h-10 w-10 opacity-30" />
                  </div>

                  <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">
                      Photographer
                    </div>
                    <h1 className="text-5xl md:text-6xl font-heading text-white tracking-tighter leading-none italic">
                      Frame the magic.
                    </h1>
                    <p className="text-xl text-white/40 max-sm mx-auto font-light leading-relaxed italic">
                      Start delivering matched professional galleries instantly.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 items-center">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/event/create")}
                      className="w-full h-20 bg-white text-black text-[11px] uppercase tracking-[0.4em] rounded-full font-bold shadow-2xl flex items-center justify-center gap-4"
                    >
                      <Plus className="h-5 w-5" /> Launch Shoot
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/event/join")}
                      className="w-full h-20 border border-white/10 bg-white/[0.02] text-white text-[11px] uppercase tracking-[0.4em] rounded-full font-bold hover:bg-white/[0.05] transition-all flex items-center justify-center gap-4"
                    >
                      <QrCode className="h-5 w-5 opacity-40" /> Join via QR
                    </motion.button>
                    <button
                      onClick={() => router.push("/host")}
                      className="text-[10px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-all font-bold"
                    >
                      Skip to Dashboard
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </form>
        </div>
      </main>

      <footer className="h-24 flex items-center justify-center">
         <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">© glimpse systems • setup protocol active</p>
      </footer>
    </div>
  );
}
