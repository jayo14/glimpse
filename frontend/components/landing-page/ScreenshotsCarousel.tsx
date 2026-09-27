"use client";

import React, { useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

interface ScreenItem {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  detail: string;
}

const screens: ScreenItem[] = [
  {
    id: 1,
    tag: "01 / Join Event",
    title: "Instant QR Scanner",
    subtitle: "Scan table card to enter",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80",
    detail: "No app store download required for guests to get started.",
  },
  {
    id: 2,
    tag: "02 / Verification",
    title: "Biometric Selfie Match",
    subtitle: "10-second facial registration",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    detail: "Fast AI embeddings mapped to your private guest album.",
  },
  {
    id: 3,
    tag: "03 / Your Photos",
    title: "Personalized Gallery",
    subtitle: "Real-time matched photos",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
    detail: "Direct original resolution downloads with one tap.",
  },
  {
    id: 4,
    tag: "04 / Live Experience",
    title: "TV Wall Slideshow",
    subtitle: "Real-time projector stream",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80",
    detail: "Stream highlights to big screens as photographers shoot.",
  },
  {
    id: 5,
    tag: "05 / Host Control",
    title: "Event Analytics Hub",
    subtitle: "Live attendance & uploads",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=400&q=80",
    detail: "Monitor match counts, guest engagement, and storage.",
  },
];

const ScreenshotsCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section id="screenshots" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-b border-zinc-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl font-sans">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 mb-3">
              <Icon name="auto_awesome" className="text-sm text-zinc-900" />
              <span>App Interface</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-zinc-950 tracking-tight leading-[1.05]">
              A Seamless Experience <br className="hidden sm:inline" />
              Across Every Screen.
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous screen"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              <Icon name="chevron_left" className="text-xl" />
            </button>
            <button
              type="button"
              aria-label="Next screen"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              <Icon name="chevron_right" className="text-xl" />
            </button>
          </div>
        </div>

        {/* Horizontal Screens Showcase */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 font-sans"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {screens.map((screen) => (
            <div
              key={screen.id}
              className="shrink-0 w-[260px] sm:w-[280px] md:w-[300px] rounded-[38px] bg-zinc-950 border-[6px] border-zinc-800 shadow-xl overflow-hidden p-3.5 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Dynamic Island */}
              <div className="w-20 h-4 bg-zinc-900 rounded-full mx-auto mb-2" />

              {/* Inside Phone Screen */}
              <div className="h-[430px] rounded-[26px] bg-white overflow-hidden flex flex-col justify-between p-4 text-left border border-zinc-200/50">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    {screen.tag}
                  </span>
                  <h3 className="font-heading text-xl font-normal text-zinc-950 leading-snug">
                    {screen.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium">{screen.subtitle}</p>
                </div>

                {/* Center Image preview */}
                <div className="my-3 flex-1 rounded-2xl overflow-hidden bg-zinc-100 relative group-hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={screen.image}
                    alt={screen.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-[10px] font-medium leading-tight">
                    {screen.detail}
                  </div>
                </div>

                {/* Bottom App Bar Element */}
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] font-bold text-zinc-900">
                  <span>Glimpse Studio</span>
                  <span className="w-2 h-2 rounded-full bg-zinc-950" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsCarousel;
