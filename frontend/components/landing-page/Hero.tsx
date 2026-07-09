"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ScanFace } from "lucide-react";
import { Iphone15Pro } from "../magicui/iphone-15-pro";
import { toast } from "sonner";

const Hero = () => {
  const [progress, setProgress] = useState(72);
  const { scrollY } = useScroll();
  const yPhone = useTransform(scrollY, [0, 600], [0, 70]);
  const yGlow = useTransform(scrollY, [0, 600], [0, -40]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 96 ? 72 : prev + 0.2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-10 px-6 lg:px-10 relative overflow-hidden">
      <motion.div
        style={{ y: yGlow }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-[#1c1b19]/[.025] rounded-full blur-[90px] pointer-events-none"
      />
      <div className="shell text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#1c1b19]/[.08] text-[11px] font-semibold tracking-[.1em] uppercase text-[#57534e] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19]"></span>
            Event photos, finally personal
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-fh text-[clamp(2.8rem,6.5vw,5.4rem)] font-normal leading-[.95] tracking-[-.02em] mb-6 max-w-3xl mx-auto text-[#1c1b19]"
        >
          The photos of you,<br />
          <em className="text-[#78716c] not-italic">found.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[17px] font-light text-[#57534e] leading-[1.7] max-w-xl mx-auto mb-10"
        >
          Glimpse sends every picture you&rsquo;re in straight to your phone — while the night is still happening. No app to download, no album to dig through, no 40 minutes of scrolling strangers&rsquo; faces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-center justify-center gap-3 mb-20 flex-wrap"
        >
          <a href="#waitlist" className="btn-primary">
            Get early access <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#how" className="btn-ghost">
            See how it works
          </a>
        </motion.div>

        <motion.div style={{ y: yPhone }} className="relative flex justify-center">
          <Iphone15Pro width={300} height={648} className="shadow-2xl">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80"
                className="w-full h-full object-cover"
                alt="Guests enjoying an event"
              />
              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute inset-0 flex items-center justify-center pt-14 pb-7">
                <div className="relative w-[128px] h-[166px]">
                  <div className="absolute inset-0 border-2 border-white/15 rounded-[20px]" />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/80 rounded-tl-sm" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/80 rounded-tr-sm" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/80 rounded-bl-sm" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/80 rounded-br-sm" />
                  <div className="animate-scan absolute left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                </div>
              </div>

              {[
                { top: '20%', left: '16%' },
                { top: '25%', right: '18%' },
                { top: '34%', left: '30%' },
                { top: '29%', right: '32%' },
                { top: '41%', left: '55%' },
              ].map((pos, i) => (
                <div key={i} className="absolute z-10" style={pos}>
                  <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  </div>
                </div>
              ))}

              <div className="absolute bottom-0 left-0 right-0 z-[20] px-5 pb-7 pt-14 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[10px] tracking-[.1em] uppercase text-white/60 mb-0.5">Finding you</p>
                      <p className="text-[15px] font-semibold text-white">14 photos ready</p>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                      <ScanFace className="w-4 h-4 text-white/70 animate-pulse" />
                    </div>
                  </div>
                  <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/70 rounded-full transition-all duration-100"
                      style={{ width: progress + "%" }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-white/40 font-medium">Matched to your selfie</span>
                    <span className="text-[10px] text-white/40 font-medium">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Iphone15Pro>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
