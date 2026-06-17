/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, X, QrCode, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Html5QrcodeScanner } from "html5-qrcode";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EventService } from "@/api/event";

const portalSchema = z.object({
  event_code: z.string().min(4, "Please enter a valid event code."),
});

type PortalInput = z.infer<typeof portalSchema>;

export default function EventJoinPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const { register, handleSubmit, watch } = useForm<PortalInput>({
    resolver: zodResolver(portalSchema),
    defaultValues: { event_code: "" },
  });

  const codeValue = watch("event_code") || "";

  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5QrcodeScanner(
      "reader-portal",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    const onScanSuccess = (decodedText: string) => {
      try {
        scanner.clear();
        setShowScanner(false);
        
        if (decodedText.includes("/join/") || decodedText.includes("/event/")) {
          const urlObj = new URL(decodedText);
          const pathParts = urlObj.pathname.split("/");
          const targetedTokenId = pathParts[pathParts.length - 1];
          
          if (targetedTokenId) {
            toast.success("Portal recognized.");
            router.push(`/event/join/${targetedTokenId}${urlObj.search}`);
            return;
          }
        }
        router.push(`/event/join/${decodedText.trim()}`);
      } catch (err) {
        toast.error("Scan failed.");
      }
    };

    scanner.render(onScanSuccess, (err) => {});
    return () => {
      scanner.clear().catch((e) => {});
    };
  }, [showScanner, router]);

  const onSubmit = async (data: PortalInput) => {
    setIsSubmitting(true);
    try {
      await EventService.checkGateAccess(data.event_code);
      toast.success("Access authorized.");
      router.push(`/event/join/${data.event_code}`);
    } catch (err: any) {
      toast.error("Access denied.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white antialiased font-body relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

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
              <QrCode className="h-10 w-10 opacity-20" />
            </div>
            
            <div className="space-y-4">
               <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold">Portal Access</span>
               <h1 className="text-4xl md:text-5xl font-heading text-white tracking-tighter leading-none italic">
                  Enter Event.
               </h1>
               <p className="text-xl text-white/40 leading-relaxed font-light italic">
                  Drop your event code below or scan the host's QR to jump straight in.
               </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative">
              <input
                {...register("event_code")}
                type="text"
                placeholder="EVENT CODE"
                className="w-full h-20 bg-white/[0.03] border border-white/10 rounded-3xl px-8 text-center text-3xl font-heading tracking-[0.3em] text-white placeholder:text-white/5 focus:outline-none focus:border-white transition-all uppercase italic"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                disabled={isSubmitting || !codeValue.trim()}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-all disabled:opacity-0 cursor-pointer shadow-xl"
              >
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
              </motion.button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-bold">
                <span className="bg-black px-4 text-white/10 italic">Optical Scanner</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setShowScanner(true)}
              className="w-full h-20 rounded-full border border-white/10 bg-white/[0.02] text-[10px] uppercase tracking-[0.4em] text-white font-bold flex items-center justify-center gap-4 hover:bg-white/[0.05] transition-all shadow-xl"
            >
              Scan host qr code
            </motion.button>
          </form>
        </motion.div>
      </main>

      <footer className="h-24 flex items-center justify-center">
         <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">© glimpse systems • secure portal active</p>
      </footer>

      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex flex-col items-center justify-center p-8"
          >
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowScanner(false)}
              className="absolute top-12 right-12 h-16 w-16 flex items-center justify-center rounded-full border border-white/10 text-white bg-white/5 cursor-pointer shadow-2xl"
            >
              <X size={24} />
            </motion.button>
            
            <div className="w-full max-w-lg aspect-square overflow-hidden rounded-[60px] border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div id="reader-portal" className="w-full h-full overflow-hidden rounded-[48px] font-body" />
            </div>
            
            <p className="text-[10px] text-white/30 mt-12 font-bold uppercase tracking-[0.4em] italic">Align visual matrix within guidelines</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}