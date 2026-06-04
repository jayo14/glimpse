/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/role-selection/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Loader2, User, Calendar, Camera, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import LoaderTwo from "@/components/ui/loader-two";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";
import { useAuth } from "@/hooks/useAuth";

type ProfileSetupInput = {
  full_name: string;
  role: "HOST" | "PHOTOGRAPHER" | "GUEST";
};

type Steps = "NAME_INPUT" | "ROLE_SELECT" | "SAVING_CINEMATIC" | "SUCCESS";

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
    // Only proceed to roles if full_name passes client-side validation
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
      const res = await AuthService.updateProfile({
        full_name: data.full_name,
        role: data.role,
      });

      // Show the customized success layout for 2 seconds
      setStep("SUCCESS");

      setTimeout(() => {
        if (res.profile?.role === "HOST") {
          router.push("/host-dashboard");
        } else {
          router.push("/guest-hub");
        }
      }, 2200);
    } catch (err) {
      setError(err, "Failed to complete setup configuration.");
      setStep("ROLE_SELECT"); // Fallback to retry if api errors out
    }
  };

  // Step Indicator Array configuration
  const currentStepIndex =
    step === "NAME_INPUT" ? 0 : step === "ROLE_SELECT" ? 1 : 2;

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-background text-foreground overflow-hidden select-none relative">
      {/* 1. TOP PROGRESS TRACKER LAYER */}
      {step !== "SAVING_CINEMATIC" && step !== "SUCCESS" && (
        <div className="absolute top-10 flex items-center gap-2 z-30">
          {[0, 1, 2].map((idx) => {
            const isActive = idx === currentStepIndex;
            return (
              <motion.div
                key={idx}
                animate={{ width: isActive ? 24 : 6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  idx <= currentStepIndex
                    ? "bg-foreground"
                    : "bg-muted-foreground/30"
                }`}
              />
            );
          })}
        </div>
      )}

      {/* 2. MAIN SYSTEM STEP SHELLS */}
      <div className="w-full max-w-xl flex flex-col items-center justify-center min-h-[50vh] relative z-20">
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
                <div className="mb-4">
                  <Image
                    src="/images/auth-image.png"
                    alt="Intro Illustration"
                    width={130}
                    height={130}
                    priority
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

                {/* FLOATING LABELED INPUT BOX */}
                <div className="relative w-full mb-4">
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
                    <p className="mt-2 text-xs text-red-500">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  size="lg"
                  disabled={!currentFullName.trim()}
                  onClick={handleNextStep}
                  className="rounded-full flex items-center justify-center w-full h-11 sm:h-12 bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40"
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {/* STEP 2: MINIMALIST DESIGN ROLE CARDS */}
            {step === "ROLE_SELECT" && (
              <motion.div
                key="role-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center"
              >
                <div className="text-center max-w-md mb-6">
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

                {/* CARDS ELEMENT WRAPPER */}
                <div className="grid grid-cols-1 gap-3 w-full max-w-md mb-6">
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

                {/* NAVIGATION BUTTON ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <button
                    type="button"
                    onClick={() => setStep("NAME_INPUT")}
                    className="h-11 sm:h-12 rounded-full border border-border text-xs uppercase tracking-widest font-sans px-6 hover:bg-secondary/40 transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                  >
                    Back
                  </button>
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full flex-1 h-11 sm:h-12 bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Finalize Setup
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CINEMATIC SETUP LOADING BACKGROUND SPIN */}
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

            {/* STEP 4: SUCCESS RECONCILIATION */}
            {step === "SUCCESS" && (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center max-w-sm"
              >
                <motion.div
                  initial={{ transform: "scale(0.85)", opacity: 0 }}
                  animate={{ transform: "scale(1)", opacity: 1 }}
                  transition={{ delay: 0.15, type: "spring" }}
                  className="mb-4"
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500 stroke-[1.25]" />
                </motion.div>
                <h2 className="text-2xl font-serif tracking-tight mb-1">
                  All set!
                </h2>
                <p className="text-muted-foreground text-sm">
                  Welcome to Glimpse. Routing you straight into your dashboard
                  configuration...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
