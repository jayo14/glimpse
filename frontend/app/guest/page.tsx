// src/app/guest/page.tsx
"use client";

import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

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
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-background text-foreground font-sans">
      <DashboardHeader role="GUEST" />

      {/* Main viewport area constrained cleanly to max-w-md matching onboarding */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-10 flex flex-col justify-start">
        
        {/* Editorial Title Banner */}
        <div className="mb-8 text-left w-full">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block mb-1">
            Visual Repository
          </span>
          <h1 className="text-3xl font-serif tracking-tight leading-none">
            Your Shared Galleries.
          </h1>
        </div>

        {connectedEvents.length > 0 ? (
          /* Minimalist layout grid column stack */
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Connected active streams map context handles render here */}
          </div>
        ) : (
          /* MINIMALIST COMPACT EMPTY STATE CARD BLOCK */
          <div className="w-full border border-dashed border-border rounded-2xl bg-card/10 flex flex-col items-center justify-center text-center p-6 py-12 min-h-[40vh]">
            <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center bg-background mb-4 text-muted-foreground/60">
              <ImageIcon size={18} className="stroke-[1.25]" />
            </div>
            
            <h3 className="font-serif text-md tracking-tight mb-1">No active spaces connected</h3>
            <p className="text-muted-foreground text-xs px-2 mb-6 leading-relaxed">
              You haven&apos;t entered an event portal channel yet. Connect to spaces to live stream visual candids directly.
            </p>

            <Link
              href="/guest/portal"
              className="h-10 px-5 rounded-full bg-foreground text-background text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer hover:opacity-90"
            >
              <Sparkles size={12} /> Enter Event Pass
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}