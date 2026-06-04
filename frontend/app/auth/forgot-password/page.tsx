"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";
import { emailSchema, EmailStepInput } from "@/validators/auth";

export default function ForgotPasswordPage() {
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const { clear } = useApiStatus();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailStepInput>({
    resolver: zodResolver(emailSchema),
  });

  const onEmailSubmit = async (data: EmailStepInput) => {
    clear();
    try {
      const res = await AuthService.forgotPassword(data);
      toast.success(res.message || "Security reset link dispatched successfully.");
      setIsSubmittedSuccessfully(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit request. Verify your email and try again.";
      toast.error(errorMsg);
    }
  };

  // Render Check Inbox Template State upon success
  if (isSubmittedSuccessfully) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-background text-foreground">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center max-w-sm w-full text-center"
        >
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

          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight leading-[1.1] mb-2">
            Verify your email
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We&apos;ve sent a password reset link to your inbox. Click the link inside to seamlessly configure your secure credential setup.
          </p>

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

          <Link
            href="/auth/login"
            className="text-xs text-muted-foreground hover:text-foreground hover:underline mt-2 transition-colors"
          >
            Back to Sign in
          </Link>
        </motion.div>
      </div>
    );
  }

  // Standard Form Input Request State
  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-background text-foreground">
      <div className="flex w-full max-w-sm flex-col">
        <div className="flex flex-col justify-center items-center mb-6 text-center w-full">
          <div className="mb-4">
            <Image
              src="/images/auth-image.png"
              alt="Logo"
              width={140}
              height={140}
              priority
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight leading-[1.1] mb-2">
            Recover Account
          </h2>

          <p className="text-muted-foreground text-sm">
            Enter your email to request a secure verification connection link.
          </p>
        </div>

        <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
          <div className="relative w-full">
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder=" "
              className="peer block w-full h-12 rounded-lg border border-border bg-input-bg px-4 sm:px-6 pb-2 pt-3 text-sm text-foreground outline-none focus:border-foreground"
            />
            <label
              htmlFor="email"
              className="absolute top-1.5 sm:top-2 left-3 sm:left-4 z-10 origin-left -translate-y-4 scale-75 transform bg-background px-2 text-[14px] sm:text-[16px] text-gray duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-foreground"
            >
              Email Address
            </label>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="rounded-full flex items-center justify-center w-full h-11 sm:h-12 bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Sending Link..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/auth/login"
            className="text-xs font-sans tracking-widest font-medium uppercase text-gray hover:text-foreground hover:underline transition-all"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}