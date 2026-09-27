"use client";

import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

const FeatureGrid = () => {
  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with Instrument Serif */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-zinc-950 tracking-tight leading-[1.05] mb-4">
            Everything You Need. <br />
            Nothing You Don&apos;t.
          </h2>
          <p className="font-sans text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Comprehensive event media platform designed with simplicity, privacy, and speed in mind.
          </p>
        </div>

        {/* 3-Column Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12 font-sans">
          {/* LEFT COLUMN: 2 Cards */}
          <div className="flex flex-col gap-6 lg:gap-8 justify-between">
            {/* Card 1: Face Matching */}
            <div className="flex-1 p-7 sm:p-8 rounded-3xl bg-zinc-50/80 border border-zinc-200/70 hover:border-zinc-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mb-6 shadow-xs">
                  <Icon name="center_focus_strong" className="text-2xl text-white" />
                </div>
                <h3 className="font-heading text-2xl font-normal text-zinc-950 mb-2.5">
                  Instant Face Matching
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  Guests take a 10-second selfie and our facial vector engine matches every photo they appear in within seconds.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="#how"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  <span>Learn More</span>
                  <Icon name="arrow_forward" className="text-xs" />
                </Link>
              </div>
            </div>

            {/* Card 2: Live Slideshow */}
            <div className="flex-1 p-7 sm:p-8 rounded-3xl bg-zinc-50/80 border border-zinc-200/70 hover:border-zinc-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mb-6 shadow-xs">
                  <Icon name="tv" className="text-2xl text-white" />
                </div>
                <h3 className="font-heading text-2xl font-normal text-zinc-950 mb-2.5">
                  Live TV Slideshow
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  Stream high-res event highlights to venue screens and projectors in real-time as the photographer clicks the shutter.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="#how"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  <span>Learn More</span>
                  <Icon name="arrow_forward" className="text-xs" />
                </Link>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Featured Tall Phone Showcase Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-zinc-100/70 border border-zinc-200/80 shadow-xs flex flex-col justify-between overflow-hidden">
            {/* Embedded Phone Mockup */}
            <div className="relative mx-auto w-full max-w-[260px] h-[340px] sm:h-[360px] rounded-[38px] bg-zinc-950 border-[5px] border-zinc-800 shadow-xl overflow-hidden p-3.5 flex flex-col justify-between mb-8">
              {/* Dynamic island */}
              <div className="w-20 h-4 bg-zinc-900 rounded-full mx-auto mb-2" />

              {/* Screen Content */}
              <div className="flex-1 bg-white rounded-[26px] p-3.5 flex flex-col justify-between text-left overflow-hidden">
                <div>
                  <div className="text-[10px] text-zinc-400 font-medium">Guest Recognition</div>
                  <div className="text-xs font-bold text-zinc-900 leading-tight">
                    Here are your photos from tonight!
                  </div>
                </div>

                {/* Photo Grid Preview */}
                <div className="grid grid-cols-2 gap-1.5 my-2">
                  <div className="relative rounded-lg overflow-hidden h-20 bg-zinc-100">
                    <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=250&q=80" alt="Matched" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-zinc-950/80 flex items-center justify-center">
                      <Icon name="check" className="text-[10px] text-white" />
                    </span>
                  </div>
                  <div className="relative rounded-lg overflow-hidden h-20 bg-zinc-100">
                    <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=250&q=80" alt="Matched" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-zinc-950/80 flex items-center justify-center">
                      <Icon name="check" className="text-[10px] text-white" />
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-950 text-white rounded-xl py-1.5 text-center text-[10px] font-semibold flex items-center justify-center gap-1">
                  <Icon name="auto_awesome" className="text-xs text-zinc-300" />
                  <span>Download All (24 Photos)</span>
                </div>
              </div>
            </div>

            {/* Bottom Info on Center Card */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mb-4 shadow-xs">
                <Icon name="inventory_2" className="text-2xl text-white" />
              </div>
              <h3 className="font-heading text-2xl font-normal text-zinc-950 mb-2">
                Digital Event Vault
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed mb-4 font-normal">
                Access and download full-resolution original photos, guest books, and encrypted archives whenever you want.
              </p>
              <Link
                href="#how"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                <span>Learn More</span>
                <Icon name="arrow_forward" className="text-xs" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: 2 Cards */}
          <div className="flex flex-col gap-6 lg:gap-8 justify-between">
            {/* Card 3: Photographer Fast Upload */}
            <div className="flex-1 p-7 sm:p-8 rounded-3xl bg-zinc-50/80 border border-zinc-200/70 hover:border-zinc-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mb-6 shadow-xs">
                  <Icon name="cloud_upload" className="text-2xl text-white" />
                </div>
                <h3 className="font-heading text-2xl font-normal text-zinc-950 mb-2.5">
                  Photographer Fast Upload
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  Bulk sync directly from SD cards or tethered cameras. Background processing sorts and matches thousands of shots in seconds.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="#how"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  <span>Learn More</span>
                  <Icon name="arrow_forward" className="text-xs" />
                </Link>
              </div>
            </div>

            {/* Card 4: Secure & Encrypted */}
            <div className="flex-1 p-7 sm:p-8 rounded-3xl bg-zinc-50/80 border border-zinc-200/70 hover:border-zinc-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mb-6 shadow-xs">
                  <Icon name="shield" className="text-2xl text-white" />
                </div>
                <h3 className="font-heading text-2xl font-normal text-zinc-950 mb-2.5">
                  Secure & Encrypted
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  Enterprise-grade security. Facial recognition vectors are encrypted, never sold or shared, and easily purged at any time.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="#how"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  <span>Learn More</span>
                  <Icon name="arrow_forward" className="text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Centered Button: Explore Full Features */}
        <div className="text-center pt-2 font-sans">
          <Link
            href="#screenshots"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md"
          >
            <span>Explore Full Features</span>
            <Icon name="arrow_forward" className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
