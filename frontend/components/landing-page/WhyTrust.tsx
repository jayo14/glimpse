"use client";

import React from "react";
import Icon from "@/components/ui/Icon";

const WhyTrust = () => {
  const cards = [
    {
      iconName: "qr_code_2",
      title: "Scan & Match in 3 Taps",
      description:
        "Guests scan a custom table QR code, snap a quick selfie, and their personalized photo gallery opens in the browser instantly.",
      previewType: "camera",
    },
    {
      iconName: "bolt",
      title: "Real-Time Photo Delivery",
      description:
        "Every time the photographer clicks the shutter, new photos are matched and delivered to guests immediately while the party is still going.",
      previewType: "gallery",
    },
    {
      iconName: "download",
      title: "Full-Res Instant Downloads",
      description:
        "No watermarks, no waiting 3 weeks for an album link. Save pristine 4K original files straight to your phone camera roll.",
      previewType: "download",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with Instrument Serif */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-zinc-950 tracking-tight leading-[1.05] mb-4">
            Why Thousands Trust Glimpse
          </h2>
          <p className="font-sans text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            See how Glimpse makes event photography and guest photo delivery effortless.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 font-sans">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-zinc-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between pt-8 px-6 sm:px-8 pb-0"
            >
              {/* Card Header Info */}
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center mb-5 shadow-xs">
                  <Icon name={card.iconName} className="text-2xl text-zinc-900" />
                </div>
                <h3 className="font-heading text-2xl font-normal text-zinc-950 mb-2.5">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              {/* Peeking Mockup Screen at Bottom */}
              <div className="relative mx-auto w-full max-w-[260px] h-[220px] rounded-t-[36px] bg-zinc-950 border-t-[5px] border-x-[5px] border-zinc-800 p-3 pb-0 shadow-lg">
                {/* Notch / Dynamic Island */}
                <div className="w-16 h-3.5 bg-zinc-900 rounded-full mx-auto mb-2" />

                {/* Screen Content */}
                <div className="w-full h-full bg-zinc-50 rounded-t-[24px] p-3 border-t border-zinc-200 overflow-hidden">
                  {card.previewType === "camera" && (
                    <div className="space-y-2 text-center pt-2">
                      <div className="w-10 h-10 rounded-full bg-zinc-200 mx-auto flex items-center justify-center">
                        <Icon name="photo_camera" className="text-xl text-zinc-700" />
                      </div>
                      <div className="text-[11px] font-bold text-zinc-900">Take a 5-sec selfie</div>
                      <div className="w-24 h-24 mx-auto border-2 border-dashed border-zinc-400 rounded-full flex items-center justify-center">
                        <span className="text-[9px] text-zinc-400">Position face</span>
                      </div>
                    </div>
                  )}

                  {card.previewType === "gallery" && (
                    <div className="space-y-2 pt-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-zinc-900 px-1">
                        <span>Live Gallery</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-950 text-white font-normal">Syncing</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="h-16 rounded-lg bg-zinc-200 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80" alt="img" className="w-full h-full object-cover" />
                        </div>
                        <div className="h-16 rounded-lg bg-zinc-200 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=200&q=80" alt="img" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="text-[9px] text-center text-zinc-500 font-medium">
                        14 new photos added just now
                      </div>
                    </div>
                  )}

                  {card.previewType === "download" && (
                    <div className="space-y-2 pt-1 text-center">
                      <div className="h-16 rounded-lg bg-zinc-200 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=200&q=80" alt="img" className="w-full h-full object-cover" />
                        <div className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-xs flex items-center justify-center">
                          <Icon name="favorite" className="text-xs text-zinc-900 fill" />
                        </div>
                      </div>
                      <div className="p-1.5 rounded-xl bg-zinc-950 text-white text-[10px] font-semibold flex items-center justify-center gap-1">
                        <Icon name="check_circle" className="text-xs text-zinc-300 fill" />
                        <span>Saved in 4K Original</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrust;
