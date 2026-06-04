"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/SignupForm";
import { motion } from "framer-motion";
import Image from "next/image";
import LoaderTwo from "@/components/ui/loader-two";

export default function SignupPage() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("glimpse_seen_intro");
    
    if (hasSeenIntro !== "true") {
      // Force onboarding layout first if record doesn't exist
      router.replace("/auth/intro");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVerified(true);
    }
  }, [router]);

  // Keep rendering standard design setup loader during runtime redirect
  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoaderTwo />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-1 p-4 sm:p-6 bg-background">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center items-center mb-3 text-center max-w-sm w-full"
      >
        <motion.div
          className="mb-4"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/images/auth-image.png"
            alt="Logo"
            width={200}
            height={200}
            priority
          />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl text-foreground font-serif">
          Join Glimpse
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Join Glimpse to host unforgettable events, share digital galleries, and capture live memories with your guests.
        </p>
      </motion.div>

      {/* Signup Form */}
      <SignupForm />
    </div>
  );
}