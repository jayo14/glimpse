"use client";

import LoginForm from "@/components/auth/LoginForm";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-1 p-6 bg-background">
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
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
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
          Welcome to Glimpse
        </h2>

        <p className="text-gray text-sm sm:text-base mt-1">
          Log in to manage your events, sync professional galleries, or review
          live guest candids.
        </p>
      </motion.div>

      {/* Login Form */}
      <LoginForm />
    </div>
  );
}