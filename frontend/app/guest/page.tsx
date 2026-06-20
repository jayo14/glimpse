/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Image as ImageIcon, Sparkles, Loader2, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function GuestHubDashboard() {
  const { loading } = useAuth({
    requireAuth: true,
    requireCompletedProfile: true,
    allowedRoles: ["GUEST"],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectedEvents: any[] = []; 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-6">
          <div className="h-16 w-16 rounded-full border-t-2 border-white animate-spin opacity-20" />
          <p className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase italic">Loading Hub</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white antialiased font-body relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

      <DashboardHeader role="GUEST" />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 pt-32 pb-16 flex flex-col items-center relative z-10">
        
        <motion.div 
          {...fadeInUp}
          className="mb-16 text-center w-full space-y-6"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 block italic">
            Visual Repository
          </span>
          <h1 className="text-5xl md:text-7xl font-heading text-white tracking-tighter leading-none italic">
            Your Galleries.
          </h1>
        </motion.div>

        {connectedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Connected active streams map context */}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full border border-white/5 rounded-[60px] bg-white/[0.02] flex flex-col items-center justify-center text-center p-12 py-24 shadow-2xl space-y-12"
          >
            <div className="w-20 h-20 rounded-[32px] border border-white/10 flex items-center justify-center bg-white/5 text-white/20 shadow-xl">
              <ImageIcon size={32} strokeWidth={1} />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-heading text-3xl tracking-tight italic">No active spaces.</h3>
              <p className="text-white/30 text-lg font-light leading-relaxed italic max-w-sm">
                You haven't entered an event portal channel yet. Connect to live streams to share candids.
              </p>
            </div>

            <Link
              href="/event/join"
              className="h-20 px-12 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] inline-flex items-center gap-3 transition-all hover:bg-white/90 shadow-2xl active:scale-95"
            >
              <Sparkles size={16} /> Enter Event Pass
            </Link>
          </motion.div>
        )}
      </main>

      <footer className="h-24 flex items-center justify-center">
         <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">© glimpse systems • hub active</p>
      </footer>
    </div>
  );
}