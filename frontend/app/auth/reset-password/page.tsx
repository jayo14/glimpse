// src/app/auth/reset-password/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";
import { resetSchema, ResetStepInput } from "@/validators/auth";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [token, setToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccessRedirect, setIsSuccessRedirect] = useState(false);
  
  const { clear } = useApiStatus();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetStepInput>({
    resolver: zodResolver(resetSchema),
  });

  // Extract access token parameter securely on component mount
  useEffect(() => {
    let accessToken = null;
    if (typeof window !== "undefined" && window.location.hash) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      accessToken = params.get("access_token");
    }
    if (!accessToken) {
      accessToken = searchParams.get("access_token");
    }
    if (!accessToken) {
      toast.error("Missing or expired password authentication token key.");
    } else {
      // Defer state update to avoid cascading render warning
      Promise.resolve().then(() => setToken(accessToken));
    }
  }, [searchParams]);

  const onResetSubmit = async (data: ResetStepInput) => {
    if (!token) {
      toast.error("Cannot process reset without a valid authentication token parameter.");
      return;
    }
    
    clear();
    try {
      const res = await AuthService.resetPassword({
        access_token: token,
        password: data.password,
        confirm_password: data.confirm_password,
      });

      toast.success(res.message || "Password successfully updated!");
      setIsSuccessRedirect(true);

      setTimeout(() => {
        const profile = res.profile || {};
        const role = (profile as { role?: string }).role;
        const fullName = (profile as { full_name?: string }).full_name;
        if (!role || !fullName?.trim()) {
          router.push("/role-selection");
        } else {
          router.push(role === "HOST" ? "/dashboard/host" : "/dashboard/guest");
        }
      }, 2500);
    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { message?: string } }; message?: string };
      const errorMsg =
        errorResponse?.response?.data?.message ||
        errorResponse?.message ||
        "Token validation failed. Your link may have expired.";
      toast.error(errorMsg);
    }
  };

  return (
    <>
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

        <h2 className="text-2xl sm:text-3xl font-serif tracking-tight leading-[1.1] mb-2 text-night text-center">
          {isSuccessRedirect ? "Access Granted" : "Reset Password"}
        </h2>

        <p className="text-ash text-sm font-light text-center">
          {isSuccessRedirect
            ? "Your password credentials have been restored. Authenticating session parameters..."
            : "Type your new password below to update and secure your profile authentication key."}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSuccessRedirect ? (
          <motion.form
            key="reset-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onSubmit={handleSubmit(onResetSubmit)}
            className="space-y-4 text-left"
          >
            <div className="relative w-full">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                className="peer block w-full h-12 rounded-lg border border-silver bg-off-white px-4 sm:px-6 pb-2 pt-3 text-sm pr-12 text-night outline-none focus:border-deep-slate"
              />
              <label
                htmlFor="password"
                className="absolute top-1.5 sm:top-2 left-3 sm:left-4 z-10 origin-left -translate-y-4 scale-75 transform bg-background px-2 text-[14px] sm:text-[16px] text-ash duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-night"
              >
                New Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-ash hover:text-night cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-error font-bold">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative w-full">
              <input
                {...register("confirm_password")}
                type={showPassword ? "text" : "password"}
                id="confirm_password"
                placeholder=" "
                className="peer block w-full h-12 rounded-lg border border-silver bg-off-white px-4 sm:px-6 pb-2 pt-3 text-sm text-night outline-none focus:border-deep-slate"
              />
              <label
                htmlFor="confirm_password"
                className="absolute top-1.5 sm:top-2 left-3 sm:left-4 z-10 origin-left -translate-y-4 scale-75 transform bg-background px-2 text-[14px] sm:text-[16px] text-ash duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-night"
              >
                Confirm New Password
              </label>
              {errors.confirm_password && (
                <p className="mt-1 text-xs text-error font-bold">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <Button
              size="lg"
              type="submit"
              disabled={isSubmitting || !token}
              className="rounded-full flex items-center justify-center w-full h-11 sm:h-12 bg-night text-white hover:opacity-90 transition-opacity cursor-pointer font-bold"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Updating Password..." : "Update Password"}
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="success-redirect"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-4 text-center"
          >
            <CheckCircle2 className="h-14 w-14 text-sage-green mb-2 stroke-[1.25]" />
            <p className="text-sm font-medium text-ash">
              Redirecting shortly...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-off-white text-night">
      <div className="flex w-full max-w-sm flex-col">
        <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-ash" /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
