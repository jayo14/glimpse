"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";
import { toast } from "sonner";

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
      const fallbackMsg = "Invalid or missing verification token.";
      setError(null, fallbackMsg);
      toast.error(fallbackMsg);
      return;
    }

    if (verificationStarted.current) return;
    verificationStarted.current = true;

    const performVerification = async () => {
      try {
        await AuthService.verifyEmail(token);
        const successMsg =
          "Email successfully verified! Redirecting to setup...";

        setSuccess(successMsg);
        toast.success(successMsg);

        setTimeout(() => {
          router.push("/role-selection");
        }, 2500);
      } catch (err: unknown) {
        const errorResponse = err as { response?: { data?: { message?: string } }; message?: string };
        const errorMsg =
          errorResponse?.response?.data?.message ||
          errorResponse?.message ||
          "Verification failed or token expired.";

        setError(err, errorMsg);
        toast.error(errorMsg);
      }
    };

    performVerification();
  }, [searchParams, router, setError, setSuccess]);

  const isLoading = !error && !success;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center max-w-sm w-full text-center"
    >
      <div className="w-36 h-36 relative mb-6 flex items-center justify-center">
        {isLoading && (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/verify-mail.png"
              alt="Verifying Status"
              width={144}
              height={144}
              className="object-contain opacity-40 blur-[1px]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-night opacity-80" />
            </div>
          </div>
        )}

        {success && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <ShieldCheck className="h-20 w-20 text-sage-green stroke-[1.25]" />
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <ShieldAlert className="h-20 w-20 text-error stroke-[1.25]" />
          </motion.div>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif tracking-tight leading-[1.1] mb-2 text-night">
        {isLoading && "Securing account"}
        {success && "Token approved"}
        {error && "Verification failed"}
      </h2>

      <div className="min-h-[48px]">
        {isLoading && (
          <p className="text-ash text-sm font-light">
            Authenticating your dynamic access token token security keys,
            please sit tight...
          </p>
        )}

        {success && (
          <p className="text-forest text-sm font-medium">
            Processing confirmation setup...
          </p>
        )}

        {error && (
          <div className="space-y-3">
            <p className="text-error text-sm font-medium">
              Unable to verify credentials
            </p>
            <button
              onClick={() => router.push("/auth/login")}
              className="text-xs font-sans font-medium uppercase tracking-widest text-ash hover:text-night underline transition-colors cursor-pointer"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-off-white text-night">
      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-ash" />}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
