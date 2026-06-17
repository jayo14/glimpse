"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
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
      toast.success(res.message || "Reset link dispatched.");
      setIsSubmittedSuccessfully(true);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Request failed.";
      toast.error(errorMsg);
    }
  };

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[60px] shadow-2xl space-y-12"
        >
          {isSubmittedSuccessfully ? (
            <div className="space-y-12 text-center py-8">
              <div className="mx-auto h-20 w-20 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 shadow-2xl">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-6">
                <h3 className="font-heading italic text-4xl text-white tracking-tight leading-none">Check your mail.</h3>
                <p className="text-xl text-white/40 leading-relaxed font-light italic">
                  A secure restoration link has been transmitted. Please check your inbox.
                </p>
              </div>
              <div className="pt-12 border-t border-white/5">
                <Link
                  href="/auth/login"
                  className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all font-bold"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-6 text-center lg:text-left">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Recovery</span>
                <h2 className="text-5xl md:text-6xl font-heading text-white tracking-tighter leading-none italic">
                  Recover access.
                </h2>
                <p className="text-xl text-white/40 font-light leading-relaxed italic">
                  Enter your email address to receive a secure restoration link.
                </p>
              </div>

              <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-8">
                <div className="space-y-3">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold ml-2">Email Address</label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="architect@glimpse.com"
                    className="w-full h-16 bg-white/[0.03] border-white/10 rounded-3xl text-white px-8 placeholder:text-white/10 focus:outline-none focus:border-white transition-all italic text-lg"
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500 italic ml-2">{errors.email.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-20 bg-white text-black text-[11px] uppercase tracking-[0.4em] rounded-full hover:bg-white/90 transition-all font-bold shadow-2xl flex items-center justify-center gap-3"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Transmitting..." : "Send Reset Link"}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </main>

      <footer className="h-24 flex items-center justify-center">
         <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">© glimpse systems • recovery protection active</p>
      </footer>
    </div>
  );
}