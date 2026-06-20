"use client";

import React, { useState } from "react";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await api.post("/waitlist", { email });
      toast.success("You have been added to the waitlist!");
      setEmail("");
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.info("You are already on the waitlist.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-48 px-6 border-t border-white/5 bg-black antialiased relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="space-y-8">
             <motion.span 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-bold"
             >
               Priority Access
             </motion.span>
             <h2 className="text-6xl md:text-9xl font-heading text-white tracking-tighter italic leading-[0.8]">Join the <br /> vanguard.</h2>
             <p className="text-2xl text-white/40 max-w-xl mx-auto font-light leading-relaxed italic">
               Be the first to experience the future of event photography. We are onboarding architects and curators in limited batches.
             </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 h-20 px-8 rounded-full border border-white/10 bg-white/[0.02] text-lg text-white font-body outline-none focus:border-white focus:bg-white/[0.05] transition-all placeholder:text-white/20 italic"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="h-20 px-12 bg-white text-black text-[13px] uppercase tracking-[0.4em] rounded-full hover:bg-white/90 transition-all font-bold cursor-pointer shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            >
              {isLoading ? "Transmitting..." : "Get Access"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
