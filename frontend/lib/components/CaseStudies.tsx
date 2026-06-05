/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Users, Image as ImageIcon, Zap, Trophy, TrendingUp, Sparkles } from "lucide-react";

interface CaseStudy {
  id: "wedding" | "party" | "conference";
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  accentColor: string;
  bgClass: string;
  metrics: { label: string; value: string; desc: string }[];
  challenges: string[];
  results: string[];
  quote: string;
  quoteAuthor: string;
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  wedding: {
    id: "wedding",
    title: "Sarah & James' Late Summer Meadow Wedding",
    subtitle: "Capturing 1,240 candid angles without a single app install friction.",
    description: "Sarah and James married in a botanical garden meadow. They hired an elite professional photographer for standard portraits, but they wanted to capture the true, uncurated emotion of their guests—the shared laughter at tables, the late-night dancing, the kids running in the meadows, and the early prep.",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#F4C9C8", // Rose Mist
    bgClass: "bg-[#FAFAFA]",
    metrics: [
      { label: "Guests Present", value: "185", desc: "100% scanning rate" },
      { label: "Uploaded Photos", value: "1,245", desc: "Original high-res format" },
      { label: "Cost of Disposables Saved", value: "$640", desc: "$0 chemical development cost" },
      { label: "Live Streams Casted", value: "240 mins", desc: "Projected continuously" }
    ],
    challenges: [
      "Traditional disposable cameras are expensive to purchase and develop, and often result in blurry, poor photos.",
      "Most guests refuse to download mobile applications or register accounts during a reception.",
      "The host wants to enjoy the reception without managing active file caches or explaining complex systems."
    ],
    results: [
      "Spotlight Pro generated table cards with beautiful minimal aesthetic that blended into Sarah's custom florist centerpieces.",
      "Guests scanned and opened their core browser camera natively within 2 seconds. The first upload occurred within minutes of seating.",
      "1,245 lovely candid images were securely saved and formatted in an downloadable ZIP archive within 24 hours of the ceremony."
    ],
    quote: "Our official photographer took gorgeous images, but Glimpse gave us the soul of our wedding. We got table self-portraits, kids stealing cake, and hilarious group dances. The live TV cast on our reception wall kept everyone laughing all night.",
    quoteAuthor: "Sarah Collins, Bride"
  },
  party: {
    id: "party",
    title: "Club Nexus: Retro Cyber Synth Launch Party",
    subtitle: "Turning a high-energy dancefloor into an immediate visual sandbox stream.",
    description: "An electronic pop-up DJ launch in a dark downtown loft required a highly engaging, low-friction photo-sharing loop. Traditional sharing via group messages ruins photo resolution, is private to small groups, and breaks the immersive collective atmosphere.",
    heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#A7C3A8", // Sage Green
    bgClass: "bg-[#18171C] text-white",
    metrics: [
      { label: "Dancers", value: "320+", desc: "Interactive social crowd" },
      { label: "Beams Sent", value: "852", desc: "Direct client uploads" },
      { label: "Live Cast Hits", value: "3.5k+", desc: "Slideshow interactions" },
      { label: "Average Scan To Post time", value: "4.8s", desc: "Ultra-low latency tunnel" }
    ],
    challenges: [
      "High-speed event environment with low ambient lighting makes manual file-sharing networks slow.",
      "A fast interactive feedback loop is essential to encourage participation.",
      "A creative tech-loving crowd expects a visually striking, premium digital interface."
    ],
    results: [
      "Glimpse's dark aesthetic perfectly integrated into the venue's industrial atmosphere.",
      "A massive digital wall projected active guest snaps in real-time with zero lag.",
      "Over 850 raw, candid party beams captured the chaotic, real-world electricity that pro flash rigs miss."
    ],
    quote: "The visual engagement was crazy. People would snap a photo of their table, upload, and look up to see it on the warehouse projector screen seconds later. It made the room feel incredibly integrated and collaborative.",
    quoteAuthor: "DJ Silas Thorne, Host & Producer"
  },
  conference: {
    id: "conference",
    title: "SaaS Summit 2026: Live Interactive Panel Capture",
    subtitle: "Seamless keynote photo-sharing across 12 tracks, 45 panel sessions.",
    description: "A professional technology summit with 12 parallel presentation tracks and panel lounges needed to gather high-fidelity photos of slide decks from attendees. They wanted a central hub where attendees could easily see and share notes across different rooms.",
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#263043", // Navy Blue
    bgClass: "bg-white text-[#18171C]",
    metrics: [
      { label: "Attendees", value: "1,200", desc: "Corporate professionals" },
      { label: "High-Res Slides Saved", value: "2,480", desc: "Pristine legible text" },
      { label: "Panel Streams Active", value: "12 channels", desc: "Multi-hall routing" },
      { label: "Coordination Hours Saved", value: "14 hours", desc: "No manual social gathering" }
    ],
    challenges: [
      "Attendees are spread across separate keynote halls, meeting lounges, and workshops simultaneously.",
      "Presenters move quickly through highly informative slide diagrams.",
      "Requires high-quality resolution to preserve small diagram text and panel slides."
    ],
    results: [
      "Glimpse's Multi-Hall channel routing mapped separate QR codes to distinct panel boards.",
      "Attendees gathered high-fidelity slide notes on their mobile devices and compiled them instantly into shared visual guides.",
      "An incredible archive of over 2,400 educational diagrams and presenter keynotes was ready for premium post-event sharing."
    ],
    quote: "Glimpse was a fantastic additions to SaaS Summit. Instead of attendees begging presenters to slide deck PDFs, everyone just collaborated. Guests captured slide notes in real-time, instantly creating a valuable resource for all tables.",
    quoteAuthor: "David Chen, Chief Event Director"
  }
};

interface CaseStudiesProps {
  currentCaseId: "wedding" | "party" | "conference";
  onBack: () => void;
  onNavigateToCase: (id: "wedding" | "party" | "conference") => void;
}

export default function CaseStudies({ currentCaseId, onBack, onNavigateToCase }: CaseStudiesProps) {
  const caseStudy = CASE_STUDIES[currentCaseId];

  if (!caseStudy) {
    return (
      <div className="py-20 text-center font-sans">
        <p className="text-sm text-[#898B91]">Case study not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-[#263043] text-white">Back to Home</button>
      </div>
    );
  }

  const isDark = caseStudy.id === "party";

  return (
    <div className={`min-h-screen font-sans ${caseStudy.bgClass} transition-colors duration-500`}>
      
      {/* Editorial Case Study Header */}
      <div className={`relative py-16 md:py-24 px-6 ${isDark ? "bg-[#111115]" : "bg-[#EDEEF2]"}`}>
        <div className="max-w-5xl mx-auto text-left space-y-6">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${isDark ? "text-stone-400 hover:text-white" : "text-[#898B91] hover:text-[#18171C]"} transition-colors cursor-pointer`}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider">
            <span style={{ color: caseStudy.accentColor }} className="font-bold">//</span>
            <span className={isDark ? "text-stone-400" : "text-[#898B91]"}>Case Study Presentation</span>
          </div>

          <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            {caseStudy.title}
          </h1>
          <p className={`text-sm sm:text-base font-light font-sans max-w-2xl leading-relaxed ${isDark ? "text-stone-300" : "text-stone-600"}`}>
            {caseStudy.subtitle}
          </p>
        </div>
      </div>

      {/* Case Study Image Banner */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="aspect-21/9 w-full rounded-2xl md:rounded-[32px] overflow-hidden shadow-xl border border-[#E4E4E7]/25">
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        
        {/* Left Column: Metrics and Overview */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Overview Block */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl md:text-2xl font-light">The Narrative</h3>
            <p className={`text-sm md:text-base leading-relaxed font-light ${isDark ? "text-stone-300" : "text-stone-600"}`}>
              {caseStudy.description}
            </p>
          </div>

          {/* Core Challenges */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl md:text-2xl font-light">The Obstacles</h3>
            <ul className="space-y-4 font-sans text-xs sm:text-sm font-light">
              {caseStudy.challenges.map((challenge, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span style={{ borderColor: caseStudy.accentColor }} className="mt-1 h-3.5 w-3.5 rounded-full border-2 border-dashed shrink-0" />
                  <span className={isDark ? "text-stone-300" : "text-stone-600"}>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results achieved */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl md:text-2xl font-light">The Implementation</h3>
            <ul className="space-y-4 font-sans text-xs sm:text-sm font-light">
              {caseStudy.results.map((result, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className={isDark ? "text-stone-200" : "text-stone-700"}>{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial Panel */}
          <div className={`p-8 rounded-3xl border ${isDark ? "bg-[#1F1E24]/60 border-stone-800" : "bg-white border-[#E4E4E7]/60 shadow-sm"} space-y-4`}>
            <p className={`font-serif italic font-light text-base sm:text-lg leading-relaxed ${isDark ? "text-stone-200" : "text-[#263043]"}`}>
              "{caseStudy.quote}"
            </p>
            <div className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-wider font-semibold">
              <span className="h-1 w-4 bg-[#B2B3BA]"></span>
              <span>{caseStudy.quoteAuthor}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Performance Data Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 rounded-[24px] border ${isDark ? "bg-[#1E1D22] border-stone-800" : "bg-white border-[#E4E4E7]/80 shadow-md"} space-y-6`}>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#898B91] block border-b border-[#E4E4E7]/10 pb-2">Gathering Metrics</span>
            
            <div className="space-y-5">
              {caseStudy.metrics.map((metric, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] text-[#898B91] uppercase tracking-wide font-sans">{metric.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-light text-[#263043] dark:text-stone-100">{metric.value}</span>
                  </div>
                  <p className="text-[10px] text-[#898B91] font-mono">{metric.desc}</p>
                </div>
              ))}
            </div>

            <div className={`rounded-xl p-3.5 flex gap-3 text-[11px] font-sans font-light leading-relaxed ${isDark ? "bg-stone-800/50 text-stone-300" : "bg-[#EDEEF2] text-stone-600"}`}>
              <Users className="h-4 w-4 text-[#263043] dark:text-stone-300 shrink-0 mt-0.5" />
              <span>Full original archives downloaded in premium vector compressed ZIP formats.</span>
            </div>
          </div>

          {/* Quick Case Study Nav buttons */}
          <div className="space-y-3 font-sans text-xs">
            <p className="text-[9px] uppercase tracking-wider text-[#898B91] font-bold text-center">View alternate applications</p>
            <div className="grid grid-cols-1 gap-2.5">
              {Object.keys(CASE_STUDIES).map((id) => {
                const c = CASE_STUDIES[id];
                if (c.id === caseStudy.id) return null;
                return (
                  <button
                    key={c.id}
                    onClick={() => onNavigateToCase(c.id as any)}
                    className={`w-full py-2.5 px-4 block text-left rounded-xl border font-sans text-xs tracking-wide transition-all cursor-pointer ${
                      isDark 
                        ? "bg-transparent border-stone-800 text-stone-300 hover:bg-stone-800/40" 
                        : "bg-white border-[#E4E4E7] text-[#263043] hover:bg-[#F5F5F5] hover:border-[#263043]"
                    }`}
                  >
                    Compare: <span className="font-semibold">{c.id.toUpperCase()}</span> study →
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
