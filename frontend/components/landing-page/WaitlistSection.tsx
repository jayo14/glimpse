"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Lock, Zap, Gift } from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(847);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await api.post("/waitlist", { email });
      setIsSuccess(true);
      setWaitlistCount(prev => prev + 1);
      toast.success("You're on the waitlist! We'll be in touch soon.");
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
    <section id="waitlist" className="relative py-24 md:py-32 px-6 lg:px-10 overflow-hidden bg-[#f9f8f6]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1a1a1a]/[.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[640px] mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-black/[.06] text-[11px] font-semibold tracking-[.1em] uppercase text-[#78716c]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 bg-[#1a1a1a]/30 rounded-full"></span>
              <span className="absolute inset-0 bg-[#1a1a1a] rounded-full animate-ping" style={{ animationDuration: '2s' }}></span>
            </span>
            Early Access
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-fh text-4xl md:text-[3.6rem] font-normal tracking-[-.02em] leading-[1.05] mb-5"
        >
          Join the <em className="text-[#78716c] not-italic">waitlist</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="text-[16px] font-light text-[#78716c] leading-[1.7] max-w-md mx-auto mb-10"
        >
          Be among the first to experience instant face-matching for your events. We're onboarding new photographers every week.
        </motion.p>

        {/* Social proof count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.24 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://picsum.photos/seed/wl${i}/64/64.jpg`}
                className="w-8 h-8 rounded-lg border-2 border-[#f9f8f6] object-cover"
                alt="Waitlist member"
              />
            ))}
          </div>
          <div className="text-left">
            <p className="text-[13px] font-medium text-[#1a1a1a]">{waitlistCount.toLocaleString()} people</p>
            <p className="text-[11px] text-[#a09890]">on the waitlist</p>
          </div>
        </motion.div>

        {!isSuccess ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={cn(
                "bg-white border-1.5 border-black/[.08] rounded-2xl px-5 py-4 text-[15px] text-[#1a1a1a] outline-none w-full focus:border-black/20 focus:ring-4 focus:ring-black/[.04] transition-all placeholder:text-black/25",
                isLoading && "opacity-50 pointer-events-none"
              )}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1a1a1a] text-white rounded-2xl px-8 py-4 font-semibold text-[15px] hover:bg-[#333] transition-all whitespace-nowrap flex items-center justify-center gap-2 hover:translate-y-[-1px] hover:shadow-lg"
            >
              <span>{isLoading ? "Joining..." : "Join Waitlist"}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-[28px] bg-[#1a1a1a] text-white"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Check className="w-4 h-4 animate-check-pop" />
            </div>
            <div className="text-left">
              <p className="text-[14px] font-semibold">You're on the list!</p>
              <p className="text-[12px] text-white/50">We'll reach out when it's your turn.</p>
            </div>
          </motion.div>
        )}

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8"
        >
          {[
            { icon: <Lock className="w-3.5 h-3.5" />, text: "No spam, ever" },
            { icon: <Zap className="w-3.5 h-3.5" />, text: "Priority access" },
            { icon: <Gift className="w-3.5 h-3.5" />, text: "Free to start" },
          ].map((signal, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[12px] text-[#a09890]">
              {signal.icon}
              {signal.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
