/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check } from "lucide-react";

export default function PricingCalculator() {
  const [guestCount, setGuestCount] = useState(120);

  // Estimates calculations
  const estimatedPhotosCaptured = guestCount * 6;
  
  // Disposable camera math: 1 camera for every 4 guests.
  const camerasNeeded = Math.ceil(guestCount / 4);
  const cameraPurchaseCost = camerasNeeded * 18; // $18 per camera
  const cameraDevelopingCost = camerasNeeded * 22; // $22 to develop film
  const totalDisposableCost = cameraPurchaseCost + cameraDevelopingCost;

  // Flat Glimpse Pricing
  const glimpsePremiumCost = 49;
  const savingsPercent = Math.round(((totalDisposableCost - glimpsePremiumCost) / totalDisposableCost) * 100);

  return (
    <div id="savings-calculator" className="space-y-12 w-full">
      
      {/* SIMPLIFIED MATH SCORECARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-10 rounded-[24px] border border-[#E4E4E7]/60 shadow-lg font-sans">
        
        {/* LEFT COLUMN: INTERACTIVE SLIDER */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-sans font-semibold text-[#898B91] uppercase tracking-wider block">Estimated Attendees</span>
            <div className="flex justify-between items-baseline">
              <span className="font-serif text-3xl font-light text-[#263043]">{guestCount} guests</span>
              <span className="text-xs font-mono text-[#898B91]">~{estimatedPhotosCaptured} expected uploads</span>
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
            Calculated on average client metrics of 6 high-resolution photo uploads per guest. This coverage scales seamlessly.
          </p>
        </div>

        {/* RIGHT COLUMN: REFINED CONTRAST CARD */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* TRADITIONAL EXPENSE */}
            <div className="p-5 bg-stone-50 border border-[#E4E4E7]/50 rounded-2xl space-y-2">
              <span className="text-[9px] uppercase font-sans font-semibold tracking-wider text-[#898B91] block">Disposable Film Cost</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-serif font-light text-[#18171C]">${totalDisposableCost}</span>
                <span className="text-[10px] text-[#898B91] font-mono">est.</span>
              </div>
              <p className="text-[10px] text-[#898B91] font-light leading-snug">
                Based on purchasing & developing {camerasNeeded} rolls of analog film.
              </p>
            </div>

            {/* MODERN SAVINGS */}
            <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl relative overflow-hidden space-y-2">
              <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[8px] font-semibold uppercase px-2 py-0.5 rounded-full">
                -{savingsPercent}% Saved
              </div>
              <span className="text-[9px] uppercase font-sans font-semibold tracking-wider text-[#263043] block">Glimpse Spotlight</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-serif text-[#263043] font-semibold">${glimpsePremiumCost}</span>
                <span className="text-[10px] text-[#263043] font-sans font-medium">flat</span>
              </div>
              <p className="text-[10px] text-emerald-800/80 font-light leading-snug">
                One-off fee for permanent storage, live projection, and full ZIP downloads.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* PLANS GRID */}
      <div className="space-y-8">
        <div className="text-center">
          <h4 className="text-[9px] font-mono font-semibold uppercase tracking-widest text-[#898B91]">Interactive Access Models</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch font-sans">
          
          {/* BASIC FREE */}
          <div className="p-6 lg:p-8 bg-white border border-[#E4E4E7]/60 rounded-[20px] flex flex-col justify-between hover:border-[#263043] transition-all duration-300 shadow-sm">
            <div className="space-y-5">
              <span className="text-[8.5px] font-sans font-semibold text-[#898B91] uppercase tracking-wider block">Standard Access</span>
              <h4 className="font-serif text-lg text-[#18171C]">Basic Free</h4>
              <p className="text-[#898B91] text-[11px] font-sans font-light leading-relaxed">Perfect for dinner test flights or small social gatherings.</p>
              <div className="border-y border-[#E4E4E7]/40 py-3">
                <span className="text-2xl font-serif font-light text-[#18171C]">$0</span>
                <span className="text-[9.5px] font-sans text-[#898B91] uppercase font-light"> / event</span>
              </div>
              <ul className="text-[10.5px] text-[#898B91] space-y-2 font-sans font-light">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> Up to 15 crowd members</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> 100 high-res image uploads</li>
                <li className="flex items-center gap-2 text-[#898B91]/40"><span>By Glimpse: No slide-view</span></li>
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
              <h4 className="font-serif text-lg text-white font-light">Spotlight Pro</h4>
              <p className="text-[#B2B3BA] text-[11px] font-sans font-light leading-relaxed">Full digital coverage with immersive slideshow display outputs.</p>
              <div className="border-y border-white/10 py-3">
                <span className="text-2xl font-serif text-white font-light">$49</span>
                <span className="text-[9.5px] font-sans text-[#B2B3BA] uppercase font-light"> / flat fee</span>
              </div>
              <ul className="text-[10.5px] text-[#EDEEF2] space-y-2 font-sans font-light">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[#A7C3A8] shrink-0" /> <strong>Unlimited</strong> uploads & guests</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[#A7C3A8] shrink-0" /> Permanent high-res storage</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[#A7C3A8] shrink-0" /> Live Projector Stream mode</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[#A7C3A8] shrink-0" /> 1-Click high-fidelity ZIP archive</li>
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
              <h4 className="font-serif text-lg text-[#18171C]">Professional Guild</h4>
              <p className="text-[#898B91] text-[11px] font-sans font-light leading-relaxed">Configured for active coordinators, venue hosts, or repeating curators.</p>
              <div className="border-y border-[#E4E4E7]/40 py-3">
                <span className="text-2xl font-serif font-light text-[#18171C]">$129</span>
                <span className="text-[9.5px] font-sans text-[#898B91] uppercase font-light"> / flat fee</span>
              </div>
              <ul className="text-[10.5px] text-[#898B91] space-y-2 font-sans font-light">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> Everything in Spotlight Pro</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> Whitelabel domain setup config</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500 shrink-0" /> Multi-hall canvas routing</li>
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
              Contact Guild
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
