"use client";

import LoginForm from "@/components/auth/LoginForm";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased font-body">
      <header className="px-6 h-24 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl w-full mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/5 px-8 h-16 rounded-full shadow-2xl"
        >
          <Link
            href="/"
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
          <div className="space-y-6 text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Authentication</span>
            <h2 className="text-5xl md:text-6xl font-heading text-white tracking-tighter leading-none italic">
              Welcome back.
            </h2>
            <p className="text-xl text-white/40 font-light leading-relaxed italic">
              Access your control room and manage your event captures.
            </p>
          </div>

          <LoginForm />
        </motion.div>
      </main>

      <footer className="h-24 flex items-center justify-center">
         <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">© glimpse systems • secure session active</p>
      </footer>
    </div>
  );
}