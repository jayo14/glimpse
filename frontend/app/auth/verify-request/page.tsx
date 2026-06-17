"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, RefreshCw, ArrowLeft, CheckCircle2 } from "lucide-react";
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
      setResendStatus({ type: "success", message: "Fresh link dispatched." });
    } catch (err) {
      setResendStatus({ type: "error", message: "Resend failed." });
    } finally {
      setIsResending(false);
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
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Exit
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
          className="w-full max-w-lg bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[60px] shadow-2xl space-y-12 text-center"
        >
          <div className="space-y-6">
            <div className="mx-auto h-20 w-20 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 shadow-2xl">
              <Mail className="h-10 w-10 opacity-20" />
            </div>
            
            <div className="space-y-4">
               <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Onboarding</span>
               <h2 className="text-4xl md:text-5xl font-heading text-white tracking-tighter leading-none italic">
                  Verify mail.
               </h2>
               <p className="text-xl text-white/40 leading-relaxed font-light italic">
                  A secure activation link has been transmitted. Please check your inbox to finalize your credentials.
               </p>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open("https://mail.google.com", "_blank")}
                className="w-full h-20 bg-white text-black text-[11px] uppercase tracking-[0.4em] rounded-full hover:bg-white/90 transition-all font-bold shadow-2xl flex items-center justify-center gap-3"
              >
                Open Gmail
              </motion.button>

              <div className="flex flex-col items-center gap-4">
                <button
                  type="button"
                  disabled={isResending}
                  onClick={handleResendToken}
                  className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`h-3 w-3 ${isResending ? "animate-spin" : ""}`} />
                  {isResending ? "Resending..." : "Resend Link"}
                </button>

                {resendStatus && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      resendStatus.type === "success" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {resendStatus.message}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="h-24 flex items-center justify-center">
         <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">© glimpse systems • secure session active</p>
      </footer>
    </div>
  );
}