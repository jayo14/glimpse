"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Download, ScanFace, Home, Search, Image as ImageIcon, User, Share, Check } from "lucide-react";
import { Iphone15Pro } from "../magicui/iphone-15-pro";
import { cn } from "@/lib/utils";

const ProductShowcase = () => {
  return (
    <section id="product" className="py-28 md:py-36 px-6 lg:px-10 bg-[#f4f3f1] relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#1a1a1a]/[.012] rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-[82rem] mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-[.12em] uppercase text-[#a09890] mb-4"
          >
            The Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-fh text-4xl md:text-[3.4rem] font-normal tracking-[-.02em] leading-[1.05]"
          >
            Designed to <em className="text-[#78716c] not-italic">delight</em>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 items-start">
          {/* Selfie Scan */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <Iphone15Pro width={248} height={536} className="mb-8 shadow-xl">
              <div className="absolute inset-0 flex flex-col bg-[#0c0c0e]">
                <div className="flex items-center gap-2 px-5 h-[46px] flex-shrink-0">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                    <ChevronLeft className="w-3.5 h-3.5 text-white/50" />
                  </div>
                  <span className="text-[13px] text-white/50 font-medium">Back</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-5 min-h-0">
                  <p className="text-white/40 text-[11px] tracking-[.08em] uppercase font-medium mb-4">Position your face</p>
                  <div className="relative w-[160px] h-[208px] rounded-[36px] border-2 border-white/10 overflow-hidden bg-white/5 flex-shrink-0">
                    <img src="https://picsum.photos/seed/glimpse-selfie-face/400/520.jpg" className="w-full h-full object-cover opacity-80" alt="Selfie" />
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/80" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/80" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/80" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/80" />
                    <div className="absolute inset-0 border-2 border-white/15 rounded-[36px] animate-pulse-glow" />
                  </div>
                  <p className="text-white/20 text-[11px] mt-3 font-medium">Hold steady</p>
                </div>
                <div className="px-5 pb-6 pt-2 flex-shrink-0">
                  <button className="w-full py-3 rounded-2xl bg-white text-[#111] text-[14px] font-semibold flex items-center justify-center gap-2">
                    <ScanFace className="w-4 h-4" /> Scan My Face
                  </button>
                </div>
              </div>
            </Iphone15Pro>
            <h3 className="font-fh text-xl font-normal tracking-tight mb-2">Selfie Scan</h3>
            <p className="text-[13px] text-[#78716c] text-center max-w-[220px] font-light leading-[1.6]">One selfie is all it takes. Our AI does the heavy lifting.</p>
          </motion.div>

          {/* Instant Results */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col items-center md:mt-10"
          >
            <Iphone15Pro width={248} height={536} className="mb-8 shadow-xl">
              <div className="absolute inset-0 flex flex-col bg-[#fafaf9]">
                <div className="flex items-center gap-2.5 px-4 h-[46px] flex-shrink-0">
                  <div className="w-7 h-7 rounded-lg bg-black/[.04] flex items-center justify-center">
                    <ChevronLeft className="w-3.5 h-3.5 text-black/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#1a1a1a] truncate">23 photos found</p>
                    <p className="text-[10px] text-[#a09890]">Annual Gala 2025</p>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-black/[.04] flex items-center justify-center">
                    <Download className="w-3.5 h-3.5 text-black/40" />
                  </div>
                </div>
                <div className="px-4 py-2 flex-shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1a1a1a]">
                    <Check className="w-3 h-3 text-white/60" />
                    <span className="text-[10px] text-white font-medium">Face matched</span>
                  </div>
                </div>
                <div className="flex-1 px-3 grid grid-cols-2 gap-1.5 content-start overflow-hidden min-h-0">
                  {["gr1h", "gr2h", "gr3h", "gr4h", "gr5h", "gr6h"].map((seed, i) => (
                    <div key={i} className={cn("aspect-square rounded-2xl overflow-hidden", i % 2 === 0 ? "ring-[2px] ring-[#1a1a1a] ring-offset-[2px] ring-offset-[#fafaf9]" : "")}>
                      <img src={`https://picsum.photos/seed/${seed}/300/300.jpg`} className="w-full h-full object-cover" alt="Matched face" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-around py-2 pt-2.5 border-t border-black/[.04] bg-white/80 backdrop-blur-md flex-shrink-0">
                  <div className="flex flex-col items-center gap-0.5"><Home className="w-[17px] h-[17px] text-black/20" /><span className="text-[9px] text-black/20 font-medium">Home</span></div>
                  <div className="flex flex-col items-center gap-0.5"><Search className="w-[17px] h-[17px] text-[#1a1a1a]" /><span className="text-[9px] text-[#1a1a1a] font-semibold">Results</span></div>
                  <div className="flex flex-col items-center gap-0.5"><ImageIcon className="w-[17px] h-[17px] text-black/20" /><span className="text-[9px] text-black/20 font-medium">Gallery</span></div>
                  <div className="flex flex-col items-center gap-0.5"><User className="w-[17px] h-[17px] text-black/20" /><span className="text-[9px] text-black/20 font-medium">Profile</span></div>
                </div>
              </div>
            </Iphone15Pro>
            <h3 className="font-fh text-xl font-normal tracking-tight mb-2">Instant Results</h3>
            <p className="text-[13px] text-[#78716c] text-center max-w-[220px] font-light leading-[1.6]">Every photo you appear in, delivered in under 3 seconds.</p>
          </motion.div>

          {/* Your Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <Iphone15Pro width={248} height={536} className="mb-8 shadow-xl">
              <div className="absolute inset-0 flex flex-col bg-[#fafaf9]">
                <div className="flex items-center justify-between px-4 h-[46px] flex-shrink-0">
                  <div>
                    <p className="text-[14px] font-semibold text-[#1a1a1a]">Your Gallery</p>
                    <p className="text-[10px] text-[#a09890]">23 photos · 4 downloads</p>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-black/[.04] flex items-center justify-center">
                    <Share className="w-3.5 h-3.5 text-black/40" />
                  </div>
                </div>
                <div className="px-4 py-2 flex gap-1.5 flex-shrink-0">
                  <span className="px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] text-white text-[10px] font-medium">All</span>
                  <span className="px-2.5 py-1.5 rounded-lg bg-black/[.04] text-black/40 text-[10px] font-medium">Favorites</span>
                  <span className="px-2.5 py-1.5 rounded-lg bg-black/[.04] text-black/40 text-[10px] font-medium">Shared</span>
                </div>
                <div className="flex-1 px-3 grid grid-cols-2 gap-1.5 content-start overflow-hidden min-h-0">
                  <div className="space-y-1.5">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden"><img src="https://picsum.photos/seed/ga1h/300/400.jpg" className="w-full h-full object-cover" alt="Gallery" /></div>
                    <div className="aspect-square rounded-2xl overflow-hidden"><img src="https://picsum.photos/seed/ga2h/300/300.jpg" className="w-full h-full object-cover" alt="Gallery" /></div>
                  </div>
                  <div className="space-y-1.5 pt-4">
                    <div className="aspect-square rounded-2xl overflow-hidden"><img src="https://picsum.photos/seed/ga3h/300/300.jpg" className="w-full h-full object-cover" alt="Gallery" /></div>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden"><img src="https://picsum.photos/seed/ga4h/300/400.jpg" className="w-full h-full object-cover" alt="Gallery" /></div>
                  </div>
                </div>
                <div className="flex items-center justify-around py-2 pt-2.5 border-t border-black/[.04] bg-white/80 backdrop-blur-md flex-shrink-0">
                  <div className="flex flex-col items-center gap-0.5"><Home className="w-[17px] h-[17px] text-black/20" /><span className="text-[9px] text-black/20 font-medium">Home</span></div>
                  <div className="flex flex-col items-center gap-0.5"><Search className="w-[17px] h-[17px] text-black/20" /><span className="text-[9px] text-black/20 font-medium">Results</span></div>
                  <div className="flex flex-col items-center gap-0.5"><ImageIcon className="w-[17px] h-[17px] text-[#1a1a1a]" /><span className="text-[9px] text-[#1a1a1a] font-semibold">Gallery</span></div>
                  <div className="flex flex-col items-center gap-0.5"><User className="w-[17px] h-[17px] text-black/20" /><span className="text-[9px] text-black/20 font-medium">Profile</span></div>
                </div>
              </div>
            </Iphone15Pro>
            <h3 className="font-fh text-xl font-normal tracking-tight mb-2">Your Gallery</h3>
            <p className="text-[13px] text-[#78716c] text-center max-w-[220px] font-light leading-[1.6]">Browse, download, and share your event photos securely.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
