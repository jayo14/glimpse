"use client";
import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export default function PricingCalculator() {
  const [guestCount, setGuestCount] = useState(120);

  const estimatedPhotosCaptured = guestCount * 6;
  const cocktailPricePerDrink = 16;
  const cocktailComparisonCost = guestCount * 2 * cocktailPricePerDrink;
  const glimpsePremiumCost = 49;
  const savingsPercent = Math.round(((cocktailComparisonCost - glimpsePremiumCost) / cocktailComparisonCost) * 100);

  return (
    <div id="savings-calculator" className="space-y-32 w-full">
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start bg-white/[0.02] p-8 md:p-20 rounded-[48px] border border-white/5 font-body shadow-2xl"
      >
        <div className="lg:col-span-7 space-y-16">
          <div className="space-y-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">Volume Scale</span>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-6">
              <span className="font-heading text-7xl md:text-9xl text-white tracking-tighter italic">{guestCount} guests</span>
              <span className="text-base font-light text-white/30 italic">~{estimatedPhotosCaptured} curated assets</span>
            </div>
          </div>

          <div className="space-y-8">
            <input
              id="calculator-guest-slider"
              type="range"
              min="20"
              max="500"
              step="10"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-white rounded-full"
            />

            <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
              <span>Min. 20</span>
              <span>250 Capacity</span>
              <span>Max. 500</span>
            </div>
          </div>

          <p className="text-2xl text-white/40 leading-relaxed font-light max-w-xl italic">
            "Two cocktails per person is a normal bar tab. Glimpse is the part that leaves you with the memories instead of the receipt."
          </p>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="flex flex-col gap-8">
            <div className="p-10 bg-black border border-white/5 rounded-[40px] space-y-6 shadow-xl">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">Traditional Hospitality</span>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-heading text-white tracking-tighter italic">${cocktailComparisonCost}</span>
                <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">est.</span>
              </div>
              <p className="text-sm text-white/30 leading-relaxed font-light">
                Average cost of hospitality for an evening of this scale.
              </p>
            </div>

            <div className="p-10 bg-white text-black rounded-[40px] space-y-6 relative overflow-hidden shadow-[0_30px_100px_rgba(255,255,255,0.1)]">
              <div className="absolute top-6 right-6 bg-black/5 text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-black/10">
                -{savingsPercent}% Efficient
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 block font-bold">Glimpse Premium</span>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-heading text-black tracking-tighter italic">${glimpsePremiumCost}</span>
                <span className="text-[10px] text-black/40 uppercase tracking-widest font-bold">flat</span>
              </div>
              <p className="text-sm text-black/60 leading-relaxed font-medium italic">
                A single fee for a lifetime of visual magic.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-[48px] bg-white/[0.02] border border-white/5 space-y-12 hover:bg-white/[0.04] transition-all group"
          >
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">01 / Trial</span>
              <div className="space-y-2">
                <h4 className="font-heading text-5xl text-white tracking-tight italic">Small Test.</h4>
                <p className="text-white/40 font-light text-lg italic">Shower or rehearsal.</p>
              </div>
              <div className="pt-8 border-t border-white/5">
                <span className="text-6xl font-heading text-white italic">$0</span>
                <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] ml-3 font-bold">/ event</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-base text-white/40 font-light italic"><Check className="h-4 w-4 text-white/20" /> Up to 15 guests</li>
                <li className="flex items-center gap-4 text-base text-white/40 font-light italic"><Check className="h-4 w-4 text-white/20" /> Core scan flow</li>
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-full py-5 border border-white/10 rounded-full text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all font-bold"
            >
              Start Free
            </motion.button>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-[48px] bg-white text-black space-y-12 relative overflow-hidden group shadow-[0_50px_100px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute top-0 right-0 p-8">
               <span className="text-[10px] uppercase tracking-[0.4em] text-black/20 font-bold italic">Popular</span>
            </div>
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 block font-bold">02 / Standard</span>
              <div className="space-y-2">
                <h4 className="font-heading text-5xl text-black tracking-tight italic">Elite.</h4>
                <p className="text-black/50 font-medium text-lg italic">Weddings & parties.</p>
              </div>
              <div className="pt-8 border-t border-black/5">
                <span className="text-6xl font-heading text-black italic">$49</span>
                <span className="text-[10px] text-black/40 uppercase tracking-[0.3em] ml-3 font-bold">/ flat</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-base text-black/70 font-bold italic"><Check className="h-4 w-4 text-black" /> Unlimited uploads</li>
                <li className="flex items-center gap-4 text-base text-black/70 font-bold italic"><Check className="h-4 w-4 text-black" /> Forever storage</li>
                <li className="flex items-center gap-4 text-base text-black/70 font-bold italic"><Check className="h-4 w-4 text-black" /> Real-time cast</li>
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-black text-white rounded-full text-[11px] uppercase tracking-[0.4em] font-bold shadow-2xl"
            >
              Activate Pro
            </motion.button>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-[48px] bg-white/[0.02] border border-white/5 space-y-12 hover:bg-white/[0.04] transition-all group"
          >
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">03 / Professional</span>
              <div className="space-y-2">
                <h4 className="font-heading text-5xl text-white tracking-tight italic">Venue.</h4>
                <p className="text-white/40 font-light text-lg italic">Planners & teams.</p>
              </div>
              <div className="pt-8 border-t border-white/5">
                <span className="text-6xl font-heading text-white italic">$129</span>
                <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] ml-3 font-bold">/ month</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-base text-white/40 font-light italic"><Check className="h-4 w-4 text-white/20" /> White-labeling</li>
                <li className="flex items-center gap-4 text-base text-white/40 font-light italic"><Check className="h-4 w-4 text-white/20" /> Venue licenses</li>
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 border border-white/10 rounded-full text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all font-bold"
            >
              Contact Team
            </motion.button>
          </motion.div>
      </div>
    </div>
  );
}
