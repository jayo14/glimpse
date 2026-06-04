// src/app/auth/verify-request/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, RefreshCw } from "lucide-react";
import { AuthService } from "@/api/auth";

export default function VerifyRequestPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleResendToken = async () => {
    setIsResending(true);
    setResendStatus(null);
    try {
      await AuthService.resendVerificationEmail();
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setResendStatus({ type: "success", message: "A fresh validation link has been sent." });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setResendStatus({ type: "error", message: "Failed to resend link. Please try again later." });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center max-w-sm w-full text-center"
      >
        {/* Verification Image Node Container */}
        <div className="w-36 h-36 relative mb-6 rounded-2xl overflow-hidden flex items-center justify-center">
          <Image
            src="/images/verify-mail.png"
            alt="Check Inbox Illustration"
            width={144}
            height={144}
            className="object-contain"
            priority
          />
        </div>

        {/* Editorial Heading Panel */}
        <h2 className="text-2xl sm:text-3xl font-serif tracking-tight leading-[1.1] mb-2">
          Verify your email
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          We&apos;ve sent an activation link to your inbox. Click the link inside to seamlessly configure your profile onboarding setup.
        </p>

        {/* Deep Link Open Gmail Action Trigger Button */}
        <Button
          size="lg"
          asChild
          className="rounded-full flex items-center justify-center w-full h-11 sm:h-12 bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer mb-4"
        >
          <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
            <Mail className="mr-2 h-4 w-4" />
            Open Gmail
          </a>
        </Button>

        {/* Dynamic Context Feedback Notices */}
        {resendStatus && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs font-medium mb-4 ${
              resendStatus.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {resendStatus.message}
          </motion.p>
        )}

        {/* Subtle Embedded Interactivity Options */}
        <div className="flex flex-col items-center gap-2 mt-2 w-full">
          <button
            type="button"
            disabled={isResending}
            onClick={handleResendToken}
            className="text-xs tracking-wide text-muted-foreground hover:text-foreground font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${isResending ? "animate-spin" : ""}`} />
            {isResending ? "Resending Link..." : "Didn't receive email? Resend link"}
          </button>

          <Link
            href="/auth/login"
            className="text-xs text-muted-foreground hover:text-foreground hover:underline mt-2 transition-colors"
          >
            Back to Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}