/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Loader2, User, Calendar, Camera, Plus, Clock, QrCode } from "lucide-react";

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
    description:
      "Scan event QR codes, upload unedited raw candids, and view digital memories.",
    icon: User,
  },
  {
    id: "HOST" as const,
    title: "Event Organizer",
    description:
      "Host gatherings, customize native streams, collect visuals, and invite guests.",
    icon: Calendar,
  },
  {
    id: "PHOTOGRAPHER" as const,
    title: "Pro Photographer",
    description:
      "Deliver high-fidelity professional galleries directly to hosts and attendees.",
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

  // eslint-disable-next-line react-hooks/incompatible-library
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
        // Evaluate role to determine next viewport layout configuration
        if (data.role === "GUEST") {
          router.push("/event/join");
        } else if (data.role === "PHOTOGRAPHER") {
          setStep("SUCCESS_PHOTOGRAPHER");
        } else {
          setStep("SUCCESS_HOST");
        }
      }, 1500);
    } catch (err) {
      setError(err, "Failed to complete setup configuration.");
      setStep("ROLE_SELECT");
    }
  };

  const currentStepIndex = step === "NAME_INPUT" ? 0 : step === "ROLE_SELECT" ? 1 : 2;

  const renderProgressBar = () => (
    <div className="flex items-center gap-1.5">
      {[0, 1].map((idx) => {
        const isActive = idx === currentStepIndex;
        return (
          <motion.div
            key={idx}
            animate={{ width: isActive ? 18 : 6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`h-1 rounded-full ${
              idx <= currentStepIndex ? "bg-foreground" : "bg-muted-foreground/30"
            }`}
          />
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-background text-foreground overflow-hidden select-none relative">
      
      <div className="w-full max-w-xl flex flex-col items-center justify-center min-h-[60vh] relative z-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center"
        >
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CAPTURING FULL NAME */}
            {step === "NAME_INPUT" && (
              <motion.div
                key="name-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-sm flex flex-col items-center text-center"
              >
                <div className="mb-6 transform scale-110 sm:scale-125">
                  <Image
                    src="/images/auth-image.png"
                    alt="Intro Illustration"
                    width={220}
                    height={220}
                    priority
                    className="object-contain"
                  />
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif tracking-tight leading-[1.1] mb-2">
                  What should we call you?
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Please provide your full name to instantly begin organizing or
                  personalizing your shared galleries.
                </p>

                {error && (
                  <div className="text-red-500 text-sm mb-3 text-center">
                    {error}
                  </div>
                )}

                <div className="relative w-full mb-6">
                  <input
                    {...register("full_name", {
                      required: "Full name is required",
                    })}
                    type="text"
                    id="full_name"
                    placeholder=" "
                    autoComplete="off"
                    className="peer block w-full h-12 rounded-lg border border-border bg-input-bg px-4 sm:px-6 pb-2 pt-3 text-sm pr-10 sm:pr-12 text-foreground outline-none focus:border-foreground"
                  />
                  <label
                    htmlFor="full_name"
                    className="absolute top-1.5 sm:top-2 left-3 sm:left-4 z-10 origin-left -translate-y-4 scale-75 transform bg-background px-2 text-[14px] sm:text-[16px] text-gray duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-foreground"
                  >
                    Your Full Name
                  </label>
                  {errors.full_name && (
                    <p className="mt-2 text-xs text-red-500 text-left w-full">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-border/40">
                  {renderProgressBar()}
                  <Button
                    type="button"
                    size="default"
                    disabled={!currentFullName.trim()}
                    onClick={handleNextStep}
                    className="rounded-full px-6 h-10 bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 font-medium"
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DESIGN ROLE CARDS */}
            {step === "ROLE_SELECT" && (
              <motion.div
                key="role-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md flex flex-col items-center"
              >
                <div className="text-center w-full mb-6">
                  <h2 className="text-2xl sm:text-3xl font-serif tracking-tight leading-[1.1] mb-2">
                    Select your purpose
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Hey {currentFullName.split(" ")[0]}, pick the account
                    container option that mirrors your event objectives.
                  </p>
                </div>

                {error && (
                  <div className="text-red-500 text-sm mb-4 text-center">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 w-full mb-6">
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <>
                        {ROLE_CARDS.map((card) => {
                          const isSelected = field.value === card.id;
                          const CardIcon = card.icon;
                          return (
                            <button
                              key={card.id}
                              type="button"
                              onClick={() => field.onChange(card.id)}
                              className={`flex items-start text-left gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                                isSelected
                                  ? "border-foreground bg-secondary/30 shadow-sm"
                                  : "border-border bg-input-bg hover:border-gray/60"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-lg border ${
                                  isSelected
                                    ? "border-foreground bg-background"
                                    : "border-border"
                                }`}
                              >
                                <CardIcon className="h-5 w-5 stroke-[1.5]" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-sans text-sm font-semibold tracking-wide mb-0.5">
                                  {card.title}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {card.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </>
                    )}
                  />
                </div>

                <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-border/40">
                  {renderProgressBar()}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setStep("NAME_INPUT")}
                      className="h-10 rounded-full border border-border px-4 text-xs font-medium uppercase tracking-wider hover:bg-secondary/40 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      Back
                    </button>
                    <Button
                      type="submit"
                      size="default"
                      className="rounded-full h-10 px-5 bg-foreground text-background hover:opacity-90 transition-opacity"
                    >
                      Finalize Setup
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: LOADING OVERLAY */}
            {step === "SAVING_CINEMATIC" && (
              <motion.div
                key="saving-step"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center max-w-sm"
              >
                <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center bg-input-bg mb-6">
                  <Loader2 className="h-6 w-6 animate-spin text-foreground opacity-80" />
                </div>
                <h2 className="text-xl font-serif tracking-tight mb-1">
                  Configuring profile layout
                </h2>
                <p className="text-muted-foreground text-sm">
                  Tailoring your custom native workspace controls. This will
                  only take a quick instant...
                </p>
              </motion.div>
            )}

            {/* STEP 4A: SUCCESS HOST ENDPOINT */}
            {step === "SUCCESS_HOST" && (
              <motion.div
                key="host-success-step"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md flex flex-col items-center text-center px-4"
              >
                <div className="relative w-full flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md shadow-xl">
                    <Clock className="h-5 w-5 text-white/70 stroke-[1.5]" />
                  </div>
                </div>

                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase font-semibold tracking-widest text-white/60 mb-4 shadow-sm">
                  Event Host
                </div>

                <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white mb-4">
                  Your stage is ready.
                </h1>
                
                <p className="text-white/60 text-sm max-w-sm leading-relaxed mb-8">
                  Create an event to invite guests, sync photographer galleries, and capture every candid moment — all in one place.
                </p>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Button
                    type="button"
                    onClick={() => router.push("/event/create")}
                    className="w-full h-12 rounded-full bg-white text-black font-semibold shadow-md hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                    Create an Event
                  </Button>

                  <button
                    type="button"
                    onClick={() => router.push("/host")}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors font-medium underline underline-offset-4 pt-2"
                  >
                    Skip to dashboard
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4B: SUCCESS PHOTOGRAPHER ENDPOINT */}
            {step === "SUCCESS_PHOTOGRAPHER" && (
              <motion.div
                key="photographer-success-step"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md flex flex-col items-center text-center px-4"
              >
                <div className="relative w-full flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md shadow-xl">
                    <Camera className="h-5 w-5 text-white/70 stroke-[1.5]" />
                  </div>
                </div>

                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase font-semibold tracking-widest text-white/60 mb-4 shadow-sm">
                  Photographer
                </div>

                <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white mb-4">
                  Frame every moment.
                </h1>
                
                <p className="text-white/60 text-sm max-w-sm leading-relaxed mb-8">
                  Launch your own shoot, or join an existing event with a code or QR scan to start delivering matched pro galleries instantly.
                </p>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Button
                    type="button"
                    onClick={() => router.push("/event/create")}
                    className="w-full h-12 rounded-full bg-white text-black font-semibold shadow-md hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                    Create an Event
                  </Button>

                  <Button
                    type="button"
                    onClick={() => router.push("/events/join")}
                    variant="outline"
                    className="w-full h-12 rounded-full border-white/20 bg-transparent text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  >
                    <QrCode className="h-4 w-4 stroke-[1.5]" />
                    Join via Code or QR
                  </Button>

                  <button
                    type="button"
                    onClick={() => router.push("/host")}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors font-medium underline underline-offset-4 pt-2"
                  >
                    Skip to dashboard
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}