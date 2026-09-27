"use client";

import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

const Hero = () => {
  return (
    <section id="hero" className="pt-28 sm:pt-36 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background subtle atmospheric radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-zinc-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-zinc-700 mb-6 shadow-xs font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
          <span>Next-Gen Event Photography</span>
        </div>

        {/* Headline with Instrument Serif */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal text-zinc-950 tracking-tight leading-[1.02] mb-5 max-w-4xl mx-auto">
          Find Your Event Photos <br className="hidden sm:inline" />
          Anytime, Anywhere.
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto mb-9">
          Glimpse helps you find your photos, deliver private galleries instantly to guests, and relive memories — all in one simple app.
        </p>

        {/* App Store & Google Play Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14 sm:mb-20">
          {/* App Store Button */}
          <Link
            href="#download"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white transition-all shadow-md hover:shadow-lg group"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.05-1.81.93-2.87-1 .04-2.18.67-2.85 1.45-.58.67-1.09 1.74-.95 2.78 1.12.09 2.24-.6 2.87-1.36z" />
            </svg>
            <div className="text-left font-sans">
              <div className="text-[10px] leading-3 uppercase tracking-wider text-zinc-400 font-medium">Download on the</div>
              <div className="text-[14px] font-bold leading-4 tracking-tight">App Store</div>
            </div>
          </Link>

          {/* Google Play Button */}
          <Link
            href="#download"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white transition-all shadow-md hover:shadow-lg group"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186c-.378-.344-.61-.84-.61-1.396V3.21c0-.556.232-1.052.609-1.396zm11.24 11.24l2.585 2.585-12.87 7.426 10.285-10.011zm0-2.108L4.564.935 17.434 8.36l-2.585 2.586zm1.488 1.054l4.28 2.471c.828.478.828 1.258 0 1.736l-4.28 2.471-2.227-2.227 2.227-2.451z" />
            </svg>
            <div className="text-left font-sans">
              <div className="text-[10px] leading-3 uppercase tracking-wider text-zinc-400 font-medium">GET IT ON</div>
              <div className="text-[14px] font-bold leading-4 tracking-tight">Google Play</div>
            </div>
          </Link>
        </div>

        {/* 3-Phones Layered Composition */}
        <div className="relative mx-auto max-w-5xl px-2 sm:px-4">
          <div className="relative flex items-center justify-center min-h-[460px] sm:min-h-[580px] md:min-h-[660px]">
            {/* LEFT PHONE (angled / behind) */}
            <div className="hidden lg:block absolute left-4 xl:left-8 top-12 w-[270px] h-[520px] rounded-[42px] bg-zinc-900 border-[6px] border-zinc-800 shadow-2xl overflow-hidden -rotate-6 transition-transform duration-500 hover:-rotate-3 z-10 font-sans">
              {/* Screen Content - Dark Mode Assistant */}
              <div className="w-full h-full bg-zinc-950 p-4 text-left flex flex-col justify-between text-white">
                <div className="space-y-4 pt-3">
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                    <span>9:41</span>
                    <span>5G • 100%</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Icon name="auto_awesome" className="text-sm text-zinc-200" />
                  </div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">AI Face Match</div>
                  <h3 className="font-heading text-2xl font-normal leading-tight text-white">
                    42 Photos Matched <br />
                    <span className="text-zinc-400 font-sans text-sm">from tonight&apos;s Gala.</span>
                  </h3>
                  <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                      <Icon name="check_circle" className="text-sm text-zinc-300 fill" />
                      <span>99.4% Face Confidence</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                      <Icon name="check_circle" className="text-sm text-zinc-300 fill" />
                      <span>Ready for 4K Download</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800/80">
                  <div className="text-[11px] text-zinc-400">Photographer upload sync:</div>
                  <div className="text-xs font-semibold text-white mt-0.5">Leo Vance (Sony A7 IV)</div>
                </div>
              </div>
            </div>

            {/* Left Floating Badge (Avatar cluster + reviews) */}
            <div className="hidden lg:flex absolute -left-2 xl:left-4 top-28 z-30 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-zinc-200/80 items-center gap-3 font-sans">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Avatar" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Avatar" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Avatar" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-zinc-900">10k+ Happy Guests</div>
                <div className="text-[11px] text-zinc-600 font-medium flex items-center gap-0.5">
                  <Icon name="star" className="text-xs text-zinc-900 fill" />
                  <span>Top Rated</span>
                </div>
              </div>
            </div>

            {/* CENTER PHONE (Front & Center) */}
            <div className="relative w-[300px] sm:w-[320px] md:w-[335px] h-[600px] sm:h-[640px] md:h-[660px] rounded-[48px] bg-zinc-900 border-[7px] border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.18)] overflow-hidden z-20 transition-transform duration-300 font-sans">
              {/* Dynamic Island */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-950 rounded-full z-40 flex items-center justify-between px-3">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900/60" />
                <span className="w-2 h-2 rounded-full bg-zinc-800/80" />
              </div>

              {/* Screen Inside */}
              <div className="w-full h-full bg-white text-left p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
                {/* Phone Header */}
                <div className="pt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-medium text-zinc-400">Welcome Back</div>
                      <div className="text-sm font-bold text-zinc-900">Sophia Martinez</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="User" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Ask AI Box */}
                  <div className="p-4 rounded-2xl bg-zinc-950 text-white shadow-md relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5 text-zinc-200">
                        <Icon name="auto_awesome" className="text-sm text-zinc-300" />
                        Ask AI Face Match
                      </span>
                      <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-300">Fast</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-tight mb-3">
                      All your event photos, candid shots & guest portraits identified in seconds.
                    </p>
                    <div className="bg-zinc-900/90 rounded-xl px-3 py-2 flex items-center justify-between text-xs text-zinc-300 border border-zinc-800">
                      <span className="truncate">Find photos at Main Stage...</span>
                      <Icon name="search" className="text-sm text-zinc-400 shrink-0" />
                    </div>
                  </div>

                  {/* Top Events Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-zinc-900">Top Events Today</span>
                      <span className="text-[11px] text-zinc-500 font-medium">View All</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl border border-zinc-200/90 bg-zinc-50/80 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-200 overflow-hidden shrink-0">
                          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=150&q=80" alt="Event" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-zinc-900 truncate">Metropolitan Annual Gala</div>
                          <div className="text-[10px] text-zinc-500">840 Photos • Live Sync</div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-900 text-white shrink-0">Joined</span>
                      </div>

                      <div className="p-2.5 rounded-xl border border-zinc-200/90 bg-zinc-50/80 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-200 overflow-hidden shrink-0">
                          <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=150&q=80" alt="Wedding" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-zinc-900 truncate">Claire & Liam Wedding</div>
                          <div className="text-[10px] text-zinc-500">1,250 Photos • Matching</div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-800 shrink-0">Open</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-around text-zinc-400">
                  <div className="flex flex-col items-center gap-0.5 text-zinc-950">
                    <Icon name="photo_library" className="text-lg" />
                    <span className="text-[9px] font-bold">Feed</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Icon name="search" className="text-lg" />
                    <span className="text-[9px]">Search</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Icon name="photo_camera" className="text-lg" />
                    <span className="text-[9px]">Selfie</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Icon name="group" className="text-lg" />
                    <span className="text-[9px]">Profile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PHONE (angled / behind) */}
            <div className="hidden lg:block absolute right-4 xl:right-8 top-12 w-[270px] h-[520px] rounded-[42px] bg-zinc-100 border-[6px] border-zinc-300 shadow-2xl overflow-hidden rotate-6 transition-transform duration-500 hover:rotate-3 z-10 font-sans">
              {/* Screen Content - Light Mode Gallery */}
              <div className="w-full h-full bg-zinc-50 p-4 text-left flex flex-col justify-between">
                <div className="space-y-4 pt-3">
                  <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                    <span>9:41</span>
                    <span>100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900">Live Delivery</span>
                    <span className="w-2 h-2 rounded-full bg-zinc-950 animate-pulse" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-24 rounded-xl bg-zinc-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=250&q=80" alt="Sample" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-24 rounded-xl bg-zinc-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=250&q=80" alt="Sample" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-zinc-200/80 shadow-xs space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-900">
                      <span>Total Matched</span>
                      <span className="font-mono">1,420</span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-zinc-900 h-full rounded-full w-[88%]" />
                    </div>
                    <div className="text-[10px] text-zinc-400 pt-1">Real-time instant biometric delivery</div>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 text-white rounded-2xl text-center text-xs font-semibold flex items-center justify-center gap-1.5">
                  <span>Cast to Live TV Wall</span>
                  <Icon name="arrow_forward" className="text-xs" />
                </div>
              </div>
            </div>

            {/* Right Floating Badge (Live Status) */}
            <div className="hidden lg:flex absolute -right-2 xl:right-4 top-36 z-30 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-zinc-200/80 items-center gap-3 font-sans">
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
                <Icon name="trending_up" className="text-base text-zinc-900" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Sync Active
                </div>
                <div className="text-[11px] text-zinc-500">24/7 Instant Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
