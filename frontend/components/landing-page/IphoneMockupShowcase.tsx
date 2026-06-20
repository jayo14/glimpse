/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Camera,
  Heart,
  Sparkles,
  Check,
  Tv,
  Sliders,
  Image as ImageIcon,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function IphoneMockupShowcase() {
  return (
    <div className="w-full space-y-48">
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        className="text-center space-y-8 max-w-3xl mx-auto py-12"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-body font-bold tracking-[0.3em] text-white/50 uppercase">
          <Sparkles className="h-3 w-3" />
          Visual Architecture
        </div>
        <h2 className="font-heading text-6xl md:text-8xl text-white tracking-tight leading-[0.9]">
          Fluent guest flows, <br />
          <span className="italic">zero friction.</span>
        </h2>
        <p className="text-xl text-white/40 leading-relaxed font-body font-light max-w-xl mx-auto italic">
          Explore the exact web layouts your guests interact with. Beautifully responsive, custom themes, and blazingly fast upload tunnels.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 px-4 max-w-[1600px] mx-auto">

        {/* Mockup 1: The Capture Interface */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          className="space-y-12 group flex flex-col items-center"
        >
          <div className="text-center md:text-left w-full max-w-[320px] space-y-6">
            <span className="font-body text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">01 / Capture</span>
            <h3 className="font-heading text-4xl text-white leading-[0.9] italic">Instant Camera <br /> upload.</h3>
            <p className="text-white/40 font-body font-light leading-relaxed text-sm">
              Guests type their name, attach a toast message, and snap an immediate frame directly inside their browser tunnel.
            </p>
          </div>

          <div className="relative w-full max-w-[300px] aspect-[9/18.5] rounded-[60px] border-[12px] border-white/5 bg-black p-3 shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-6 ring-1 ring-white/10 group-hover:shadow-[0_80px_150px_rgba(255,255,255,0.05)]">
            <div className="absolute top-4 left-1/2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-white/5 flex items-center justify-end pr-3">
              <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
            </div>

            <div className="h-full w-full rounded-[48px] bg-black overflow-hidden flex flex-col font-body relative border border-white/5 text-white">

              <div className="flex h-10 items-center justify-between px-8 pt-3 text-[10px] font-medium text-white/30">
                <span>9:41</span>
                <span>LTE</span>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="text-center space-y-1">
                    <span className="font-heading text-2xl tracking-tighter italic block">glimpse</span>
                    <span className="text-[8px] text-white/20 tracking-[0.2em] uppercase">Sarah & James Wedding</span>
                  </div>

                  <div className="space-y-6 text-left">
                    <div className="space-y-2">
                      <span className="block text-[8px] uppercase tracking-widest text-white/20 font-bold">Contributor</span>
                      <div className="w-full bg-white/5 border border-white/10 text-xs px-4 py-3 rounded-2xl text-white font-light flex items-center justify-between italic">
                        <span>Diana Kings</span>
                        <span className="w-px h-4 bg-white animate-pulse"></span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="block text-[8px] uppercase tracking-widest text-white/20 font-bold">Asset</span>
                      <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-inner">
                        <img
                          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=550&q=80"
                          alt="Wedding table setting"
                          className="w-full h-full object-cover grayscale opacity-60"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 bg-black/80 rounded-full p-2 border border-white/20 backdrop-blur-md">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="block text-[8px] uppercase tracking-widest text-white/20 font-bold">Caption</span>
                      <div className="w-full bg-white/5 border border-white/10 text-xs px-4 py-3 rounded-2xl text-white/30 italic">
                        "Simply beautiful reception!"
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button className="w-full bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] py-4 rounded-full transition-all hover:bg-white/90 shadow-2xl">
                    Beam Memory
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mockup 2: The Collective Stream Feed */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          className="space-y-12 group flex flex-col items-center pt-0 md:pt-12"
        >
          <div className="text-center md:text-left w-full max-w-[320px] space-y-6">
            <span className="font-body text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">02 / Interactive</span>
            <h3 className="font-heading text-4xl text-white leading-[0.9] italic">Live shared <br /> memory pool.</h3>
            <p className="text-white/40 font-body font-light leading-relaxed text-sm">
              Guests can view real-time streams, react using premium haptics, and instantly download high-quality files.
            </p>
          </div>

          <div className="relative w-full max-w-[300px] aspect-[9/18.5] rounded-[60px] border-[12px] border-white/5 bg-black p-3 shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-6 ring-1 ring-white/10 group-hover:shadow-[0_80px_150px_rgba(255,255,255,0.05)]">
            <div className="h-full w-full rounded-[48px] bg-black overflow-hidden flex flex-col font-body relative border border-white/5 text-white">

              <div className="flex h-10 items-center justify-between px-8 pt-3 text-[10px] font-medium text-white/30">
                <span>9:41</span>
                <span className="text-white font-bold">&bull; LIVE</span>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="text-xs font-bold text-white italic">Community Stream</span>
                    <span className="text-[8px] font-bold bg-white text-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                      142 pieces
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-2 space-y-3">
                      <div className="aspect-square rounded-2xl overflow-hidden relative shadow-inner">
                        <img
                          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=260&q=80"
                          alt="Wedding dancing"
                          className="w-full h-full object-cover grayscale opacity-70"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md rounded-full px-2 py-0.5 text-[7px] text-white font-bold">
                          9:30 PM
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[9px] px-1 pb-1">
                        <span className="font-bold truncate text-white/50">Cousin Mike</span>
                        <div className="flex items-center gap-1 text-white/80">
                          <Heart className="h-2.5 w-2.5 fill-white text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-3xl p-2 space-y-3">
                      <div className="aspect-square rounded-2xl overflow-hidden relative shadow-inner">
                        <img
                          src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=260&q=80"
                          alt="Toasts card"
                          className="w-full h-full object-cover grayscale opacity-70"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md rounded-full px-2 py-0.5 text-[7px] text-white font-bold">
                          6:12 PM
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[9px] px-1 pb-1">
                        <span className="font-bold truncate text-white/50">Sophia H.</span>
                        <div className="flex items-center gap-1 text-white/80">
                          <Sparkles className="h-2.5 w-2.5 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-[32px] p-3 col-span-2 shadow-inner">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-14 rounded-2xl overflow-hidden bg-black border border-white/10">
                          <img
                            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=150&q=80"
                            className="w-full h-full object-cover grayscale opacity-40"
                            referrerPolicy="no-referrer"
                            alt="unsplash"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-[10px] space-y-0.5">
                          <p className="font-bold text-white">Jessica P.</p>
                          <p className="text-white/30 truncate italic">"Sunset love shots..."</p>
                        </div>
                        <div className="flex items-center gap-2 text-white/50 pr-2">
                          <Check className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 pb-2 flex items-center justify-around text-white/20 text-[10px]">
                  <span className="text-white font-bold flex flex-col items-center gap-1.5">
                    <ImageIcon className="h-4 w-4" />
                    Feed
                  </span>
                  <span className="hover:text-white flex flex-col items-center gap-1.5 cursor-pointer transition-colors">
                    <Camera className="h-4 w-4" />
                    Snap
                  </span>
                  <span className="hover:text-white flex flex-col items-center gap-1.5 cursor-pointer transition-colors">
                    <Tv className="h-4 w-4" />
                    Cast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mockup 3: Host Moderation Deck */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          className="space-y-12 group flex flex-col items-center pt-0 md:pt-24"
        >
          <div className="text-center md:text-left w-full max-w-[320px] space-y-6">
            <span className="font-body text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">03 / Moderation</span>
            <h3 className="font-heading text-4xl text-white leading-[0.9] italic">Host validation <br /> control.</h3>
            <p className="text-white/40 font-body font-light leading-relaxed text-sm">
              Control the central projection screens. Filter bad frames instantly before they hit the live monitors.
            </p>
          </div>

          <div className="relative w-full max-w-[300px] aspect-[9/18.5] rounded-[60px] border-[12px] border-white/5 bg-black p-3 shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-6 ring-1 ring-white/10 group-hover:shadow-[0_80px_150px_rgba(255,255,255,0.05)]">
            <div className="h-full w-full rounded-[48px] bg-black overflow-hidden flex flex-col font-body relative border border-white/5 text-white">

              <div className="flex h-10 items-center justify-between px-8 pt-3 text-[10px] font-medium text-white/30">
                <span>9:41</span>
                <span className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
                  <span className="font-bold">Active</span>
                </span>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="text-center font-heading text-base font-bold pb-4 border-b border-white/5 italic">
                    Control Room
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-[32px] space-y-3 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Active Cast</span>
                      <span className="text-[8px] bg-white text-black px-3 py-1 rounded-full uppercase tracking-tighter font-bold shadow-lg">Connected</span>
                    </div>
                    <div className="text-[10px] text-white/30 leading-relaxed italic">
                      Broadcasting to <br /> <span className="text-white font-medium not-italic">"Ballroom_West_TV"</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-left">
                    <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold ml-1">Stream Guard</span>

                    <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-3xl border border-white/10 shadow-inner">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-white block">Verification</span>
                        <span className="text-[8px] text-white/20 block italic">Filter before posting</span>
                      </div>
                      <div className="h-5 w-9 rounded-full bg-white p-1 flex justify-end shadow-inner">
                        <div className="h-3 w-3 rounded-full bg-black shadow-lg"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-3xl border border-white/10 shadow-inner">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-white block">ZIP Export</span>
                        <span className="text-[8px] text-white/20 block italic">124 source units</span>
                      </div>
                      <button className="text-[9px] bg-white/10 text-white px-3 py-1.5 rounded-full font-bold uppercase tracking-tighter border border-white/10">
                        Ready
                      </button>
                    </div>

                    <div className="p-3 border border-dashed border-white/10 bg-white/[0.02] rounded-3xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-2xl bg-black overflow-hidden relative shrink-0 border border-white/5">
                          <img
                            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=80&q=80"
                            className="w-full h-full object-cover opacity-30 grayscale"
                            referrerPolicy="no-referrer"
                            alt="unsplash"
                          />
                        </div>
                        <div className="truncate text-[10px] space-y-0.5">
                          <p className="font-bold text-white">David</p>
                          <p className="text-white/30 italic font-heading">Waiting...</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="h-7 w-7 bg-white rounded-full text-black flex items-center justify-center font-bold text-xs shadow-lg">&check;</button>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-8">
                  <button className="w-full bg-transparent border border-white/10 text-white font-bold text-[9px] uppercase tracking-[0.3em] py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all shadow-2xl">
                    <Sliders className="h-3 w-3" />
                    Open Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mockup 4: Beamed Confirmation */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          className="space-y-12 group flex flex-col items-center pt-0 md:pt-36"
        >
          <div className="text-center md:text-left w-full max-w-[320px] space-y-6">
            <span className="font-body text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">04 / Confirmation</span>
            <h3 className="font-heading text-4xl text-white leading-[0.9] italic">Instant screen <br /> projection.</h3>
            <p className="text-white/40 font-body font-light leading-relaxed text-sm">
              Beautiful responsive confirmation loops. Guests get instant validation of their broadcasted memories.
            </p>
          </div>

          <div className="relative w-full max-w-[300px] aspect-[9/18.5] rounded-[60px] border-[12px] border-white/5 bg-black p-3 shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-6 ring-1 ring-white/10 group-hover:shadow-[0_80px_150px_rgba(255,255,255,0.05)]">
            <div className="h-full w-full rounded-[48px] bg-black overflow-hidden flex flex-col font-body relative border border-white/5 text-white">

              <div className="flex h-10 items-center justify-between px-8 pt-3 text-[10px] font-medium text-white/30">
                <span>9:41</span>
                <span>LTE</span>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col justify-between text-center">
                <div className="space-y-12">
                  <div className="mx-auto h-20 w-20 rounded-full bg-white flex items-center justify-center text-black shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
                    <Check className="h-10 w-10" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-heading text-3xl font-bold text-white italic tracking-tight">Beamed!</h4>
                    <p className="text-xs text-white/30 leading-relaxed font-light italic">
                      Your memory is now live on the slideshow monitor.
                    </p>
                  </div>

                  <div className="p-4 border border-white/10 bg-white/[0.03] rounded-[40px] relative overflow-hidden shadow-inner">
                    <div className="text-[9px] text-white/20 uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2 font-bold">
                      <Tv className="h-3 w-3" /> Projecting
                    </div>
                    <div className="aspect-[16/10] overflow-hidden rounded-[28px] relative shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=350&q=80"
                        className="w-full h-full object-cover grayscale opacity-60"
                        referrerPolicy="no-referrer"
                        alt="unsplash"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-4 justify-start text-left">
                        <div className="text-[9px] space-y-1">
                          <p className="text-white font-heading italic leading-none text-xs">"Simply beautiful!"</p>
                          <p className="text-white/30 leading-none uppercase tracking-widest font-bold">Diana Kings</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-12 space-y-4">
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] uppercase tracking-[0.3em] py-4 rounded-full border border-white/10 transition-all">
                    Send feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
