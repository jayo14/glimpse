/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check } from "lucide-react";

export default function PricingCalculator() {
  const [guestCount, setGuestCount] = useState(120);

  const estimatedPhotosCaptured = guestCount * 6;
  const cocktailPricePerDrink = 16;
  const cocktailComparisonCost = guestCount * 2 * cocktailPricePerDrink;
  const glimpsePremiumCost = 49;
  const savingsPercent = Math.round(((cocktailComparisonCost - glimpsePremiumCost) / cocktailComparisonCost) * 100);

  return (
    <div id="savings-calculator" className="space-y-12 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-10 rounded-[24px] border border-[#E4E4E7]/60 shadow-lg font-sans">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-sans font-semibold text-[#898B91] uppercase tracking-wider block">Guest count</span>
            <div className="flex justify-between items-baseline">
              <span className="font-serif text-3xl font-light text-[#263043]">{guestCount} guests</span>
              <span className="text-xs font-mono text-[#898B91]">~{estimatedPhotosCaptured} photos people will actually keep</span>
            </div>
          </div>
          
          <input
            id="calculator-guest-slider"
            type="range"
            min="20"
            max="500"
            step="10"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full h-1 bg-[#EDEEF2] appearance-none cursor-pointer accent-[#263043]"
          />
          
          <div className="flex justify-between text-[9px] font-mono text-[#B2B3BA]">
            <span>20 guests</span>
            <span>250 guests</span>
            <span>500 guests</span>
          </div>

          <p className="text-[11px] text-[#898B91] leading-relaxed font-sans font-light">
            Two cocktails per person is a normal bar tab. Glimpse is the part that leaves you with the memories instead of the receipt.
          </p>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-stone-50 border border-[#E4E4E7]/50 rounded-2xl space-y-2">
              <span className="text-[9px] uppercase font-sans font-semibold tracking-wider text-[#898B91] block">Two cocktails per guest</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-serif font-light text-[#18171C]">${cocktailComparisonCost}</span>
                <span className="text-[10px] text-[#898B91] font-mono">est.</span>
              </div>
              <p className="text-[10px] text-[#898B91] font-light leading-snug">
                What a normal guest drink tab looks like when the evening gets going.
              </p>
            </div>

            <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl relative overflow-hidden space-y-2">
              <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[8px] font-semibold uppercase px-2 py-0.5 rounded-full">
                -{savingsPercent}% Saved
              </div>
              <span className="text-[9px] uppercase font-sans font-semibold tracking-wider text-[#263043] block">Glimpse full event</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-serif text-[#263043] font-semibold">${glimpsePremiumCost}</span>
                <span className="text-[10px] text-[#263043] font-sans font-medium">flat</span>
              </div>
              <p className="text-[10px] text-emerald-800/80 font-light leading-snug">
                One flat fee for a lifetime of full-quality memories, live projection, and easy downloads.
              </p>
            </div>

          </div>
        </div>

      </div>

      <div className="space-y-8">
        <div className="rounded-[24px] border border-[#E4E4E7]/60 bg-[#263043] px-6 py-5 text-white shadow-lg">
          <p className="text-sm md:text-base leading-relaxed">
            <strong>You have two choices: 1. $0 for a small test, or 2. $49 for the full wedding or party.</strong> Scroll no further if you want guests to actually contribute.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch font-sans">
          <div className="p-6 lg:p-8 bg-white border border-[#E4E4E7]/60 rounded-[20px] flex flex-col justify-between hover:border-[#263043] transition-all duration-300 shadow-sm">
            <div className="space-y-5">
              <span className="text-[8.5px] font-sans font-semibold text-[#898B91] uppercase tracking-wider block">Standard Access</span>
              <h4 className="font-serif text-lg text-[#18171C]">Small Test</h4>
              <p className="text-[#898B91] text-[11px] font-sans font-light leading-relaxed">Best for a shower, a rehearsal dinner, or a quick no-pressure trial.</p>
              <div className="border-y border-[#E4E4E7]/40 py-3">
                <span className="text-2xl font-serif font-light text-[#18171C]">$0</span>
                <span className="text-[9.5px] font-sans text-[#898B91] uppercase font-light"> / event</span>
              </div>
              <ul className="text-[10.5px] text-[#898B91] space-y-2 font-sans font-light">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> Up to 15 guests</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> Enough to prove the scan flow works</li>
                <li className="flex items-center gap-2 text-[#898B91]/40"><span>No live slideshow</span></li>
              </ul>
            </div>
            <button
              id="get-started-basic-btn"
              onClick={() => {
                const target = document.getElementById("cost-analysis");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 w-full py-2.5 bg-stone-50 hover:bg-[#EDEEF2] border border-[#E4E4E7]/60 text-[#263043] text-[9.5px] font-sans font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Start Free
            </button>
          </div>

          {/* PREMIUM SPOTLIGHT */}
          <div className="p-6 lg:p-8 bg-[#263043] text-white border-2 border-[#263043] rounded-[20px] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative shadow-md">
            <div className="absolute top-4 right-4 bg-[#F4C9C8] text-[#263043] text-[8px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              Preferred
            </div>
            <div className="space-y-5">
              <span className="text-[8.5px] font-sans font-semibold text-[#B2B3BA] uppercase tracking-wider block">Elite Coverage</span>
              <h4 className="font-serif text-lg text-white font-light">Wedding / Party</h4>
              <p className="text-[#B2B3BA] text-[11px] font-sans font-light leading-relaxed">The full experience for hosts who want the crowd to actually participate.</p>
              <div className="border-y border-white/10 py-3">
                <span className="text-2xl font-serif text-white font-light">$49</span>
                <span className="text-[9.5px] font-sans text-[#B2B3BA] uppercase font-light"> / flat fee</span>
              </div>
              <ul className="text-[10.5px] text-[#EDEEF2] space-y-2 font-sans font-light">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[#A7C3A8] shrink-0" /> <strong>Unlimited</strong> uploads from every guest</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[#A7C3A8] shrink-0" /> Every single photo stays forever in full quality</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[#A7C3A8] shrink-0" /> Photos hit the screen before the phone goes down</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[#A7C3A8] shrink-0" /> One-click ZIP download after the event</li>
              </ul>
            </div>
            <button
              id="get-started-pro-btn"
              onClick={() => {
                const target = document.getElementById("cost-analysis");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 w-full py-2.5 bg-white hover:bg-neutral-100 text-[#263043] text-[9.5px] font-sans font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Activate Pro
            </button>
          </div>

          {/* GUILD WHITELABEL */}
          <div className="p-6 lg:p-8 bg-white border border-[#E4E4E7]/60 rounded-[20px] flex flex-col justify-between hover:border-[#263043] transition-all duration-300 shadow-sm">
            <div className="space-y-5">
              <span className="text-[8.5px] font-sans font-semibold text-[#898B91] uppercase tracking-wider block">Enterprise Setup</span>
              <h4 className="font-serif text-lg text-[#18171C]">Venue Team</h4>
              <p className="text-[#898B91] text-[11px] font-sans font-light leading-relaxed">For planners and venues that host these events over and over.</p>
              <div className="border-y border-[#E4E4E7]/40 py-3">
                <span className="text-2xl font-serif font-light text-[#18171C]">$129</span>
                <span className="text-[9.5px] font-sans text-[#898B91] uppercase font-light"> / flat fee</span>
              </div>
              <ul className="text-[10.5px] text-[#898B91] space-y-2 font-sans font-light">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> Everything in the $49 plan</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> White-label branding and custom event pages</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> Built for larger venue workflows</li>
              </ul>
            </div>
            <button
              id="get-started-guild-btn"
              onClick={() => {
                const target = document.getElementById("cost-analysis");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 w-full py-2.5 bg-stone-50 hover:bg-[#EDEEF2] border border-[#E4E4E7]/60 text-[#263043] text-[9.5px] font-sans font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Contact venue team
            </button>
          </div>

        </div>

        <p className="text-center text-sm md:text-base text-[#18171C] font-medium pt-4">
          Stop begging for photos. Start collecting joy. Pick your plan below.
        </p>
      </div>

    </div>
  );
}
