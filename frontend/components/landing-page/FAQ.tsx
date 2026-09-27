"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

const faqs = [
  {
    question: "Do guests need to download an app to get their photos?",
    answer:
      "No! Guests can scan an event QR code, snap a 10-second selfie directly in their mobile browser, and access their personalized gallery instantly without installing anything.",
  },
  {
    question: "How does the facial recognition matching work?",
    answer:
      "Glimpse converts your selfie into a secure 512-dimensional facial embedding vector using high-precision ArcFace/InsightFace models. As photographers upload images, our background worker indexes detected faces and matches them to your vector in milliseconds.",
  },
  {
    question: "Is guest biometric data secure and private?",
    answer:
      "Absolutely. We treat biometric data with utmost security. Embeddings are encrypted at rest, never sold to third parties, never used to train public models, and can be automatically purged 30 days after the event with a single toggle.",
  },
  {
    question: "How fast do photos appear for guests during an event?",
    answer:
      "Photos typically appear within 3 to 10 seconds after the photographer's camera or SD card uploads them to the Glimpse cloud worker.",
  },
  {
    question: "How do photographers upload photos during a live event?",
    answer:
      "Photographers can upload via browser bulk drag-and-drop, camera Wi-Fi / FTP tethering, or direct SD card ingest through the Glimpse Desktop companion app.",
  },
  {
    question: "Can we display a Live TV Slideshow at the venue?",
    answer:
      "Yes! Glimpse includes a dedicated Live Wall feature. Simply open the event slideshow URL on any Smart TV, Apple TV, Chromecast, or projector to stream curated photos and guest toasts in real time.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-zinc-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading with Instrument Serif */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 font-sans">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 mb-3">
            <Icon name="auto_awesome" className="text-sm text-zinc-900" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-zinc-950 tracking-tight leading-[1.05] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Everything you need to know about Glimpse for hosts, photographers, and guests.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 font-sans">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "bg-zinc-50/80 border-zinc-300 shadow-xs"
                    : "bg-white border-zinc-200/80 hover:border-zinc-300"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 font-semibold text-zinc-950 text-base sm:text-lg"
                >
                  <span>{faq.question}</span>
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180 bg-zinc-950 text-white"
                    )}
                  >
                    <Icon name="keyboard_arrow_down" className="text-base" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 text-sm text-zinc-600 leading-relaxed pt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
