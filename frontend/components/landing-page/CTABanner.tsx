"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CTABanner = () => {
  return (
    <section id="cta" className="relative py-28 md:py-36 px-6 lg:px-10 overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#2a2520]">
      <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[200%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[40%] h-[160%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[82rem] mx-auto relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[.06] border border-white/[.08] text-[11px] font-semibold tracking-[.1em] uppercase text-white/50">
              <Sparkles className="w-3 h-3" /> Start for free
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-fh text-4xl md:text-[3.2rem] font-normal tracking-[-.02em] leading-[1.05] text-white mb-6"
          >
            Let Glimpse take the busywork off your event photos' plate
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-[16px] font-light text-white/40 leading-[1.7] max-w-lg mx-auto mb-10"
          >
            Stop manually sorting, emailing, and organizing photos. Upload once, and let attendees find themselves instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
          >
            <Link
              href="#waitlist"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1a1a1a] rounded-[36px] font-semibold text-[15px] hover:bg-white/90 transition-all hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]"
            >
              Find My Photos <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
