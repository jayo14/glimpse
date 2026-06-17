"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
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
      toast.error("Invalid or expired token.");
    } else {
      Promise.resolve().then(() => setToken(accessToken));
    }
  }, [searchParams]);

  const onResetSubmit = async (data: ResetStepInput) => {
    if (!token) {
      toast.error("Invalid token.");
      return;
    }
    
    clear();
    try {
      const res = await AuthService.resetPassword({
        access_token: token,
        password: data.password,
        confirm_password: data.confirm_password,
      });

      toast.success(res.message || "Password updated.");
      setIsSuccessRedirect(true);

      setTimeout(() => {
        const profile = res.profile || {};
        const role = (profile as { role?: string }).role;
        const fullName = (profile as { full_name?: string }).full_name;
        if (!role || !fullName?.trim()) {
          router.push("/role-selection");
        } else {
          router.push(role === "HOST" ? "/host" : "/guest");
        }
      }, 2000);
    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { message?: string } }; message?: string };
      const errorMsg =
        errorResponse?.response?.data?.message ||
        errorResponse?.message ||
        "Reset failed.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[60px] shadow-2xl space-y-12">
      <div className="space-y-6 text-center lg:text-left">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Security</span>
        <h2 className="text-5xl md:text-6xl font-heading text-white tracking-tighter leading-none italic">
          {isSuccessRedirect ? "Success." : "New password."}
        </h2>
        <p className="text-xl text-white/40 font-light leading-relaxed italic">
          {isSuccessRedirect
            ? "Your credentials have been restored. Redirecting..."
            : "Define your new secure password to regain control room access."}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSuccessRedirect ? (
          <motion.form
            key="reset-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onResetSubmit)}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="password" className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold ml-2">New Password</label>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className="w-full h-16 bg-white/[0.03] border-white/10 rounded-3xl text-white px-8 placeholder:text-white/10 focus:outline-none focus:border-white transition-all text-lg"
                />
                {errors.password && (
                  <p className="mt-2 text-xs text-red-500 italic ml-2">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <label htmlFor="confirm_password" className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold ml-2">Confirm Password</label>
                <input
                  {...register("confirm_password")}
                  type={showPassword ? "text" : "password"}
                  id="confirm_password"
                  placeholder="••••••••"
                  className="w-full h-16 bg-white/[0.03] border-white/10 rounded-3xl text-white px-8 placeholder:text-white/10 focus:outline-none focus:border-white transition-all text-lg"
                />
                {errors.confirm_password && (
                  <p className="mt-2 text-xs text-red-500 italic ml-2">{errors.confirm_password.message}</p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting || !token}
              className="w-full h-20 bg-white text-black text-[11px] uppercase tracking-[0.4em] rounded-full hover:bg-white/90 transition-all font-bold shadow-2xl flex items-center justify-center gap-3"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Updating..." : "Update Password"}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center space-y-6"
          >
            <CheckCircle2 className="h-20 w-20 text-white stroke-[1]" />
            <p className="text-lg font-bold text-white tracking-widest uppercase">
              Authenticated.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResetPasswordPage() {
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
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Exit
          </Link>

          <div className="flex items-center gap-2 cursor-pointer font-heading">
            <span className="font-bold text-xl tracking-tighter italic">glimpse</span>
          </div>
        </motion.div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-16">
        <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-white/20" />}>
          <ResetPasswordForm />
        </Suspense>
      </main>

      <footer className="h-24 flex items-center justify-center">
         <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">© glimpse systems • secure session active</p>
      </footer>
    </div>
  );
}

