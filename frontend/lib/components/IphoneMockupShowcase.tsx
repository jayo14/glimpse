/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Camera, 
  Heart, 
  Sparkles, 
  Check, 
  Tv, 
  Sliders, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  ThumbsUp,
  Image as ImageIcon
} from "lucide-react";

export default function IphoneMockupShowcase() {
  return (
    <div className="w-full space-y-24">
      {/* SECTION HEADER WITH INTENTIONAL BREATHING ROOM */}
      <div className="text-center space-y-6 max-w-3xl mx-auto py-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E4E4E7] text-[10px] font-sans font-medium tracking-widest text-[#263043] shadow-cluely-lifted uppercase">
          <Sparkles className="h-3 w-3 text-[#263043]" />
          Visual Architecture
        </div>
        <h2 className="font-serif text-4xl md:text-6xl text-[#18171C] font-light tracking-tight leading-none">
          Fluent guest flows, <br />
          <span className="italic font-normal text-[#263043]">zero installation overhead.</span>
        </h2>
        <p className="text-xs md:text-sm text-[#898B91] leading-relaxed font-sans font-light max-w-xl mx-auto">
          Explore the exact web layouts your guests interact with when scanning your Glimpse table placards. Beautifully responsive, custom themes, and blazingly fast upload tunnels designed to maximize candid captures.
        </p>
      </div>

      {/* HORIZONTAL TIMELINE OF IPHONE 16 MOCKUPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
        
        {/* Mockup 1: The Capture Interface */}
        <div className="space-y-6 group flex flex-col items-center">
          <div className="text-center md:text-left w-full max-w-[290px]">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">01 / CAPTURE VIEWPORT</span>
            <h3 className="font-serif font-light text-xl text-[#18171C] mt-1">Instant Camera upload</h3>
            <p className="text-[11px] text-[#898B91] font-sans font-light mt-1.5 leading-relaxed">
              Guests type their name, attach a warm toast message, and snap an immediate frame directly inside their browser tunnel.
            </p>
          </div>

          {/* PHONE CONTAINER */}
          <div className="relative w-full max-w-[280px] aspect-[9/18.5] rounded-[48px] border-[8px] border-[#18171C] bg-[#1d1d22] p-2.5 shadow-cluely-large transition-all duration-500 hover:-translate-y-2 ring-1 ring-zinc-200/10">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-[#18171C] flex items-center justify-end pr-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#A7C3A8] animate-pulse"></div>
            </div>
            {/* Camera Control button on right */}
            <div className="absolute right-[-10px] top-32 w-1 h-12 bg-[#2d2d34] rounded-l-md z-10"></div>
            {/* Action button on left */}
            <div className="absolute left-[-10px] top-24 w-1 h-8 bg-[#2d2d34] rounded-r-md z-10"></div>
            {/* Volume buttons on left */}
            <div className="absolute left-[-10px] top-36 w-1 h-10 bg-[#2d2d34] rounded-r-md z-10"></div>
            <div className="absolute left-[-10px] top-48 w-1 h-10 bg-[#2d2d34] rounded-r-md z-10"></div>

            {/* Screen Content Wrapper */}
            <div className="h-full w-full rounded-[38px] bg-[#18171C] overflow-hidden flex flex-col font-sans relative border border-white/5 text-zinc-200">
              
              {/* Top status bar */}
              <div className="flex h-7 items-center justify-between px-6 pt-1.5 text-[9px] font-medium text-zinc-400">
                <span>9:41</span>
                <span>LTE</span>
              </div>

              {/* Inset portal page */}
              <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Camera className="h-3.5 w-3.5 text-[#F4C9C8]" />
                    <span className="font-serif font-light text-xs tracking-wider">glimpse.</span>
                  </div>
                  <div className="text-center text-[8px] text-zinc-500 mb-4 tracking-tight uppercase">
                    Sarah & James Wedding
                  </div>

                  <div className="space-y-3.5 text-left">
                    {/* Name input */}
                    <div className="space-y-1">
                      <span className="block text-[8px] uppercase tracking-wider text-zinc-500 font-medium font-sans">Your Name</span>
                      <div className="w-full bg-[#26262c] shadow-cluely-input border border-zinc-800 text-[10px] px-2.5 py-1.5 rounded-lg text-zinc-200 font-light font-sans flex items-center justify-between">
                        <span>Diana Kings</span>
                        <span className="w-0.5 h-3 bg-zinc-400 animate-pulse"></span>
                      </div>
                    </div>

                    {/* Image space preview */}
                    <div className="space-y-1">
                      <span className="block text-[8px] uppercase tracking-wider text-zinc-500 font-medium font-sans">Capture</span>
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-[#2a2a30]">
                        <img 
                          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=550&q=80" 
                          alt="Wedding table setting" 
                          className="w-full h-full object-cover saturate-90"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 bg-black/60 rounded-full p-2 border border-white/10 shadow-cluely-premium">
                          <Check className="h-2.5 w-2.5 text-[#A7C3A8]" />
                        </div>
                      </div>
                    </div>

                    {/* Caption input */}
                    <div className="space-y-1">
                      <span className="block text-[8px] uppercase tracking-wider text-zinc-500 font-medium font-sans">Toast message</span>
                      <div className="w-full bg-[#26262c] border border-zinc-800 text-[10px] px-2.5 py-1.5 rounded-lg text-zinc-400 italic font-serif">
                        "Simply beautiful reception! 🥂 Love you guys!"
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submitting buttons */}
                <div className="pt-3">
                  <button className="w-full bg-[#263043] text-white font-medium text-[10px] uppercase tracking-wider py-2.5 rounded-xl transition-all hover:bg-black flex items-center justify-center gap-1.5 shadow-cluely-large">
                    <Check className="h-3 w-3" />
                    Beam Memory
                  </button>
                  <p className="text-[7.5px] text-zinc-600 text-center mt-1 font-sans">
                    Secure Web SSL connection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup 2: The Collective Stream Feed */}
        <div className="space-y-6 group flex flex-col items-center pt-0 md:pt-4">
          <div className="text-center md:text-left w-full max-w-[290px]">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">02 / INTERACTIVE FEED</span>
            <h3 className="font-serif font-light text-xl text-[#18171C] mt-1">Live shared memory pool</h3>
            <p className="text-[11px] text-[#898B91] font-sans font-light mt-1.5 leading-relaxed">
              Guests can view real-time streams of other tables, react using premium haptics, and instantly download high-quality files.
            </p>
          </div>

          {/* PHONE CONTAINER */}
          <div className="relative w-full max-w-[280px] aspect-[9/18.5] rounded-[48px] border-[8px] border-[#18171C] bg-[#1d1d22] p-2.5 shadow-cluely-large transition-all duration-500 hover:-translate-y-2 ring-1 ring-zinc-200/10">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-[#18171C] flex items-center justify-end pr-2"></div>
            {/* Camera Control button */}
            <div className="absolute right-[-10px] top-32 w-1 h-12 bg-[#2d2d34] rounded-l-md z-10"></div>
            {/* Buttons */}
            <div className="absolute left-[-10px] top-24 w-1 h-8 bg-[#2d2d34] rounded-r-md z-10"></div>
            <div className="absolute left-[-10px] top-36 w-1 h-10 bg-[#2d2d34] rounded-r-md z-10"></div>
            <div className="absolute left-[-10px] top-48 w-1 h-10 bg-[#2d2d34] rounded-r-md z-10"></div>

            {/* Screen Content */}
            <div className="h-full w-full rounded-[38px] bg-[#18171C] overflow-hidden flex flex-col font-sans relative border border-white/5 text-zinc-200">
              
              {/* Status bar */}
              <div className="flex h-7 items-center justify-between px-6 pt-1.5 text-[9px] font-medium text-zinc-400 font-sans">
                <span>9:41</span>
                <span className="text-[#A7C3A8]">• LIVE</span>
              </div>

              {/* Web feed screen */}
              <div className="flex-1 overflow-y-auto px-3.5 py-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                    <span className="text-[10px] font-semibold text-zinc-300 font-serif">Community Stream</span>
                    <span className="text-[8px] font-sans font-medium bg-[#263043] text-[#F4C9C8] px-2 py-0.5 rounded-full shadow-cluely-lifted">
                      142 pieces
                    </span>
                  </div>

                  {/* Micro Grid Cards */}
                  <div className="grid grid-cols-2 gap-2.5">
                    
                    {/* Item A */}
                    <div className="bg-[#1f1f24] border border-zinc-800 rounded-lg p-1.5 space-y-1.5 shadow-cluely-input">
                      <div className="aspect-square rounded-md overflow-hidden relative">
                        <img 
                          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=260&q=80" 
                          alt="Wedding dancing" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/60 rounded px-1 py-0.5 text-[7px] text-zinc-300 font-sans">
                          9:30 PM
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[8px] font-sans">
                        <span className="font-bold truncate text-zinc-300">Cousin Mike</span>
                        <div className="flex items-center gap-0.5 text-rose-355 font-bold">
                          <Heart className="h-2 w-2 fill-[#F4C9C8] text-[#F4C9C8]" />
                          <span>24</span>
                        </div>
                      </div>
                    </div>

                    {/* Item B */}
                    <div className="bg-[#1f1f24] border border-zinc-800 rounded-lg p-1.5 space-y-1.5 shadow-cluely-input">
                      <div className="aspect-square rounded-md overflow-hidden relative">
                        <img 
                          src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=260&q=80" 
                          alt="Toasts card" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/60 rounded px-1 py-0.5 text-[7px] text-zinc-300 font-sans">
                          6:12 PM
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[8px] font-sans">
                        <span className="font-bold truncate text-zinc-300">Sophia H.</span>
                        <div className="flex items-center gap-0.5 text-[#F4C9C8] font-bold">
                          <Sparkles className="h-2 w-2 text-[#F4C9C8]" />
                          <span>18</span>
                        </div>
                      </div>
                    </div>

                    {/* Item C */}
                    <div className="bg-[#1f1f24] border border-zinc-800 rounded-lg p-2.5 space-y-1.5 col-span-2 shadow-cluely-input">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-10 rounded-md overflow-hidden bg-zinc-800">
                          <img 
                            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=150&q=80" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-[8.5px] font-sans">
                          <p className="font-bold text-zinc-300">Jessica P.</p>
                          <p className="text-zinc-500 truncate italic">"Sunset love shots..."</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#A7C3A8]">
                          <Check className="h-2.5 w-2.5" />
                          <span className="text-[7.5px] font-bold">Approved</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Micro Bottom Action Bar */}
                <div className="border-t border-zinc-800 pt-2 pb-1.5 flex items-center justify-around text-zinc-500 text-[8px] font-sans">
                  <span className="text-zinc-200 font-semibold flex flex-col items-center">
                    <ImageIcon className="h-3 w-3 mb-0.5 text-[#263043]" />
                    Feed
                  </span>
                  <span className="hover:text-zinc-300 flex flex-col items-center cursor-pointer">
                    <Camera className="h-3 w-3 mb-0.5" />
                    New Photo
                  </span>
                  <span className="hover:text-zinc-300 flex flex-col items-center cursor-pointer">
                    <Tv className="h-3 w-3 mb-0.5" />
                    Cast View
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup 3: The Host Moderation Deck */}
        <div className="space-y-6 group flex flex-col items-center pt-0 md:pt-8">
          <div className="text-center md:text-left w-full max-w-[290px]">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">03 / REAL-TIME STREAM DECK</span>
            <h3 className="font-serif font-light text-xl text-[#18171C] mt-1">Host validation control</h3>
            <p className="text-[11px] text-[#898B91] font-sans font-light mt-1.5 leading-relaxed">
              Control the central projection screens. Filter bad frames instantly before they hit the live reception monitors.
            </p>
          </div>

          {/* PHONE CONTAINER */}
          <div className="relative w-full max-w-[280px] aspect-[9/18.5] rounded-[48px] border-[8px] border-[#18171C] bg-[#1d1d22] p-2.5 shadow-cluely-large transition-all duration-500 hover:-translate-y-2 ring-1 ring-zinc-200/10">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-[#18171C] flex items-center justify-end pr-2"></div>
            {/* Camera Control button */}
            <div className="absolute right-[-10px] top-32 w-1 h-12 bg-[#2d2d34] rounded-l-md z-10"></div>
            {/* Buttons */}
            <div className="absolute left-[-10px] top-24 w-1 h-8 bg-[#2d2d34] rounded-r-md z-10"></div>
            <div className="absolute left-[-10px] top-36 w-1 h-10 bg-[#2d2d34] rounded-r-md z-10"></div>
            <div className="absolute left-[-10px] top-48 w-1 h-10 bg-[#2d2d34] rounded-r-md z-10"></div>

            {/* Screen Content */}
            <div className="h-full w-full rounded-[38px] bg-[#18171C] overflow-hidden flex flex-col font-sans relative border border-white/5 text-zinc-200">
              
              {/* Status bar */}
              <div className="flex h-7 items-center justify-between px-6 pt-1.5 text-[9px] font-medium text-zinc-400 font-sans">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A7C3A8]"></span>
                  <span>Active</span>
                </span>
              </div>

              {/* Web feed screen */}
              <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col justify-between">
                <div>
                  <div className="text-center font-serif text-sm mb-3 font-semibold pb-1.5 border-b border-zinc-800">
                    Host Control Room
                  </div>

                  <div className="p-2.5 bg-[#1f1f24] border border-zinc-800 rounded-xl space-y-2 mb-4 shadow-cluely-input">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight font-sans">Active Cast</span>
                      <span className="text-[8px] bg-emerald-500/10 text-[#A7C3A8] border border-[#A7C3A8]/20 px-1.5 py-0.5 rounded-sm">Connected</span>
                    </div>
                    <div className="text-[8px] text-zinc-500 font-sans">
                      Broadcasting stream live to <span className="text-[#F4C9C8] font-mono">"Ballroom_West_TV"</span>
                    </div>
                  </div>

                  {/* Active checklist toggles */}
                  <div className="space-y-2.5 text-left font-sans">
                    <span className="text-[7.5px] uppercase tracking-wider text-zinc-500 font-mono font-medium">Stream Guard Setup</span>
                    
                    {/* Switch Toggle 1 */}
                    <div className="flex items-center justify-between p-2 bg-[#26262c]/50 rounded-xl border border-zinc-800 shadow-cluely-lifted">
                      <div>
                        <span className="text-[8.5px] font-semibold text-zinc-200 block">Host Verification</span>
                        <span className="text-[7.5px] text-zinc-500 block">Filter before posting</span>
                      </div>
                      <div className="h-3.5 w-6 rounded-full bg-[#A7C3A8] p-0.5 flex justify-end">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#18171C]"></div>
                      </div>
                    </div>

                    {/* Switch Toggle 2 */}
                    <div className="flex items-center justify-between p-2 bg-[#26262c]/50 rounded-xl border border-zinc-800 shadow-cluely-lifted">
                      <div>
                        <span className="text-[8.5px] font-semibold text-zinc-200 block">High-Res ZIP Export</span>
                        <span className="text-[7.5px] text-zinc-400 block">124 source units compiled</span>
                      </div>
                      <button className="text-[7px] bg-[#263043] hover:bg-zinc-700 text-[#F4C9C8] px-1.5 py-0.5 rounded font-bold uppercase transition-colors shadow-cluely-lifted">
                        Ready
                      </button>
                    </div>

                    {/* Pending review mini placeholder */}
                    <div className="p-2 border border-dashed border-[#F4C9C8]/40 bg-[#481F1E]/20 rounded-xl flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="h-6 w-6 rounded bg-zinc-800 overflow-hidden relative shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=80&q=80" 
                            className="w-full h-full object-cover opacity-60"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="truncate text-[7.5px] font-sans">
                          <p className="font-bold text-zinc-300">Cousin David</p>
                          <p className="text-[#F4C9C8]">Wait approval</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button className="h-4 w-4 bg-[#A7C3A8] rounded text-[#18171C] text-[9px] flex items-center justify-center font-bold">✓</button>
                        <button className="h-4 w-4 bg-[#481F1E] rounded text-white text-[9px] flex items-center justify-center font-bold">✕</button>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full bg-[#263043] border border-zinc-800 text-[#EDEEF2] font-semibold text-[8px] uppercase tracking-widest py-1.5 rounded-lg flex items-center justify-center gap-1 shadow-cluely-large">
                    <Sliders className="h-2 w-2 text-[#F4C9C8]" />
                    Open Dashboard Panel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup 4: The Beamed Confirmation Screen */}
        <div className="space-y-6 group flex flex-col items-center pt-0 md:pt-12">
          <div className="text-center md:text-left w-full max-w-[290px]">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">04 / CONFIRMATION HUD</span>
            <h3 className="font-serif font-light text-xl text-[#18171C] mt-1">Instant screen projection</h3>
            <p className="text-[11px] text-[#898B91] font-sans font-light mt-1.5 leading-relaxed">
              Beautiful responsive confirmation loops. Guests get instant validation of their photographic memories broadcasted.
            </p>
          </div>

          {/* PHONE CONTAINER */}
          <div className="relative w-full max-w-[280px] aspect-[9/18.5] rounded-[48px] border-[8px] border-[#18171C] bg-[#1d1d22] p-2.5 shadow-cluely-large transition-all duration-500 hover:-translate-y-2 ring-1 ring-zinc-200/10">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-[#18171C] flex items-center justify-end pr-2"></div>
            {/* Camera Control button */}
            <div className="absolute right-[-10px] top-32 w-1 h-12 bg-[#2d2d34] rounded-l-md z-10"></div>
            {/* Buttons */}
            <div className="absolute left-[-10px] top-24 w-1 h-8 bg-[#2d2d34] rounded-r-md z-10"></div>
            <div className="absolute left-[-10px] top-36 w-1 h-10 bg-[#2d2d34] rounded-r-md z-10"></div>
            <div className="absolute left-[-10px] top-48 w-1 h-10 bg-[#2d2d34] rounded-r-md z-10"></div>

            {/* Screen Content */}
            <div className="h-full w-full rounded-[38px] bg-[#18171C] overflow-hidden flex flex-col font-sans relative border border-white/5 text-zinc-200">
              
              {/* Status bar */}
              <div className="flex h-7 items-center justify-between px-6 pt-1.5 text-[9px] font-medium text-zinc-400 font-sans">
                <span>9:41</span>
                <span>LTE</span>
              </div>

              {/* Web success screen */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-between text-center">
                <div className="py-2"></div>

                <div className="space-y-4">
                  {/* Glowing Check circle */}
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 border border-[#A7C3A8]/30 flex items-center justify-center text-[#A7C3A8] shadow-cluely-premium">
                    <Check className="h-6 w-6" />
                  </div>

                  <div className="space-y-1 font-sans">
                    <h4 className="font-serif text-sm font-medium text-zinc-100">Moment Broadcasted!</h4>
                    <p className="text-[9px] text-[#898B91] font-sans px-2">
                      Your memory has been successfully streamed to the main venue slideshow monitor.
                    </p>
                  </div>

                  {/* MINI INTERACTIVE PREVIEW */}
                  <div className="p-2 border border-zinc-800 bg-[#26262c]/30 rounded-xl relative shadow-cluely-input">
                    <div className="text-[7px] text-zinc-500 font-sans uppercase tracking-wider mb-1.5 flex items-center justify-center gap-1">
                      <Tv className="h-2 w-2 text-zinc-500" /> Currently Projected
                    </div>
                    <div className="aspect-[16/10] overflow-hidden rounded-md relative shadow-inner">
                      <img 
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=350&q=80" 
                        className="w-full h-full object-cover brightness-95"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-1.5 justify-start text-left">
                        <div className="text-[6.5px] font-sans">
                          <p className="text-zinc-205 font-serif leading-none italic">"Simply beautiful!"</p>
                          <p className="text-[#898B91] font-mono leading-none mt-0.5">By Diana Kings</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 font-sans">
                  <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-[9px] uppercase tracking-wider py-2 rounded-lg border border-zinc-800 font-sans shadow-cluely-lifted">
                    Share direct feedback
                  </button>
                  <p className="text-[7px] text-[#898B91] mt-1">
                    Developed by glimpse systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
