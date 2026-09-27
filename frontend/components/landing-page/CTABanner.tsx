"use client";

import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

const CTABanner = () => {
  return (
    <section id="download" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[36px] sm:rounded-[48px] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl border border-zinc-800 font-sans">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-zinc-200">
                <Icon name="auto_awesome" className="text-sm text-zinc-300" />
                <span>Instant Access for Guests & Hosts</span>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.08]">
                Download Glimpse & <br className="hidden sm:inline" />
                Take Control of Your Event Photos.
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Scan the QR code to experience Glimpse live in your browser, or download the native iOS and Android apps for professional photography workflows.
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="#hero"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white text-zinc-950 hover:bg-zinc-100 transition-all shadow-md group"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.05-1.81.93-2.87-1 .04-2.18.67-2.85 1.45-.58.67-1.09 1.74-.95 2.78 1.12.09 2.24-.6 2.87-1.36z" />
                  </svg>
                  <div className="text-left font-sans">
                    <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Download on the</div>
                    <div className="text-[13px] font-bold text-zinc-950 leading-none">App Store</div>
                  </div>
                </Link>

                <Link
                  href="#hero"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white transition-all shadow-md group"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.378-.344-.61-.84-.61-1.396V3.21c0-.556.232-1.052.609-1.396zm11.24 11.24l2.585 2.585-12.87 7.426 10.285-10.011zm0-2.108L4.564.935 17.434 8.36l-2.585 2.586zm1.488 1.054l4.28 2.471c.828.478.828 1.258 0 1.736l-4.28 2.471-2.227-2.227 2.227-2.451z" />
                  </svg>
                  <div className="text-left font-sans">
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-medium">GET IT ON</div>
                    <div className="text-[13px] font-bold text-white leading-none">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right QR Code Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-2xl text-center max-w-[240px] border border-zinc-200/90 text-zinc-950 flex flex-col items-center">
                {/* Visual QR Code Display */}
                <div className="w-36 h-36 bg-zinc-950 p-2.5 rounded-2xl flex items-center justify-center mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                    <rect x="10" y="10" width="25" height="25" rx="3" />
                    <rect x="15" y="15" width="15" height="15" fill="#09090b" rx="2" />
                    <rect x="18" y="18" width="9" height="9" fill="white" />
                    <rect x="65" y="10" width="25" height="25" rx="3" />
                    <rect x="70" y="15" width="15" height="15" fill="#09090b" rx="2" />
                    <rect x="73" y="18" width="9" height="9" fill="white" />
                    <rect x="10" y="65" width="25" height="25" rx="3" />
                    <rect x="15" y="70" width="15" height="15" fill="#09090b" rx="2" />
                    <rect x="18" y="73" width="9" height="9" fill="white" />
                    <rect x="42" y="12" width="6" height="6" />
                    <rect x="52" y="12" width="6" height="6" />
                    <rect x="42" y="24" width="6" height="6" />
                    <rect x="52" y="30" width="6" height="6" />
                    <rect x="42" y="42" width="16" height="16" rx="2" />
                    <rect x="12" y="42" width="6" height="16" />
                    <rect x="24" y="42" width="12" height="6" />
                    <rect x="65" y="42" width="6" height="16" />
                    <rect x="78" y="42" width="12" height="6" />
                    <rect x="65" y="65" width="12" height="12" />
                    <rect x="82" y="65" width="8" height="25" />
                    <rect x="42" y="65" width="16" height="6" />
                    <rect x="42" y="78" width="16" height="12" />
                  </svg>
                </div>
                <div className="text-xs font-bold text-zinc-950 font-sans">Scan with Phone</div>
                <div className="text-[11px] text-zinc-500 mt-0.5 font-sans">Instant web app demo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
