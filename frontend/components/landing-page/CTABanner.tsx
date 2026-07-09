"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CTABanner = () => {
  return (
    <section id="cta" className="relative py-28 md:py-36 px-6 lg:px-10 overflow-hidden bg-[#1c1b19]">
      <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[200%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[40%] h-[160%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="shell relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[.08] border border-white/[.12] text-[11px] font-semibold tracking-[.1em] uppercase text-white/65">
              <Sparkles className="w-3 h-3" /> Ready when you are
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.08 }}
            className="font-fh text-4xl md:text-[3.2rem] font-normal tracking-[-.02em] leading-[1.08] text-white mb-6"
          >
            Your memories deserve better than a midnight email of 600 photos
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.16 }}
            className="text-[16px] font-light text-white/70 leading-[1.7] max-w-lg mx-auto mb-10"
          >
            Join the hosts and photographers already putting every guest inside their own photo story. Early access is open — and your first event is on us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.24 }}
          >
            <Link
              href="#waitlist"
              className="btn-on-dark"
            >
              Get early access <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
