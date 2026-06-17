"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, ShieldAlert, ArrowLeft } from "lucide-react";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";
import { toast } from "sonner";
import Link from "next/link";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { error, success, setError, setSuccess } = useApiStatus();
  const verificationStarted = useRef(false);

  useEffect(() => {
    let token = null;
    if (typeof window !== "undefined" && window.location.hash) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      token = params.get("access_token");
    }

    if (!token) {
      token = searchParams.get("access_token");
    }

    if (!token) {
      const fallbackMsg = "Invalid or missing token.";
      setError(null, fallbackMsg);
      toast.error(fallbackMsg);
      return;
    }

    if (verificationStarted.current) return;
    verificationStarted.current = true;

    const performVerification = async () => {
      try {
        await AuthService.verifyEmail(token);
        const successMsg = "Email verified successfully.";
        setSuccess(successMsg);
        toast.success(successMsg);
        setTimeout(() => {
          router.push("/role-selection");
        }, 2000);
      } catch (err: unknown) {
        const errorResponse = err as { response?: { data?: { message?: string } }; message?: string };
        const errorMsg =
          errorResponse?.response?.data?.message ||
          errorResponse?.message ||
          "Verification failed.";
        setError(err, errorMsg);
        toast.error(errorMsg);
      }
    };

    performVerification();
  }, [searchParams, router, setError, setSuccess]);

  const isLoading = !error && !success;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[60px] shadow-2xl space-y-12 text-center"
    >
      <div className="space-y-6">
        <div className="mx-auto h-20 w-20 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 shadow-2xl">
          {isLoading && <Loader2 className="h-10 w-10 animate-spin opacity-20" />}
          {success && <ShieldCheck className="h-10 w-10" />}
          {error && <ShieldAlert className="h-10 w-10 opacity-50" />}
        </div>
        
        <div className="space-y-4">
           <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Security</span>
           <h2 className="text-4xl md:text-5xl font-heading text-white tracking-tighter leading-none italic">
              {isLoading && "Securing..."}
              {success && "Verified."}
              {error && "Invalid Link."}
           </h2>
           <p className="text-xl text-white/40 leading-relaxed font-light italic">
              {isLoading && "Authenticating your access parameters. One moment."}
              {success && "Your account is now active. Redirecting to setup."}
              {error && "The verification token is missing or has expired."}
           </p>
        </div>

        {error && (
          <div className="pt-8 border-t border-white/5">
            <Link
              href="/auth/login"
              className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all font-bold"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased font-body">
      <header className="px-6 h-24 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl w-full mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/5 px-8 h-16 rounded-full shadow-2xl"
        >
          <Link
            href="/auth/login"
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all cursor-pointer font-bold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back
          </Link>

          <div className="flex items-center gap-2 cursor-pointer font-heading">
            <span className="font-bold text-xl tracking-tighter italic">glimpse</span>
          </div>
        </motion.div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-16">
        <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-white/20" />}>
          <VerifyEmailContent />
        </Suspense>
      </main>

      <footer className="h-24 flex items-center justify-center">
         <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">© glimpse systems • secure session active</p>
      </footer>
    </div>
  );
}
