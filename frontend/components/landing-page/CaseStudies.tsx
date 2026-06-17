/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ArrowLeft, Check, Users, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudy {
  id: "wedding" | "party" | "conference";
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  accentColor: string;
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
    accentColor: "white",
    metrics: [
      { label: "Guests Present", value: "185", desc: "100% scanning rate" },
      { label: "Uploaded Photos", value: "1,245", desc: "Original high-res format" },
      { label: "Cost Saved", value: "$640", desc: "No development cost" },
      { label: "Live Streams", value: "240 min", desc: "Projected continuously" }
    ],
    challenges: [
      "Traditional disposable cameras are expensive to purchase and develop.",
      "Most guests refuse to download mobile applications or register accounts.",
      "The host wants to enjoy the reception without managing active file caches."
    ],
    results: [
      "Spotlight Pro generated table cards with beautiful minimal aesthetic.",
      "Guests scanned and opened their core browser camera natively within 2 seconds.",
      "1,245 lovely candid images were securely saved and formatted in an archive."
    ],
    quote: "Our official photographer took gorgeous images, but Glimpse gave us the soul of our wedding. The live TV cast on our reception wall kept everyone laughing all night.",
    quoteAuthor: "Sarah Collins, Bride"
  },
  party: {
    id: "party",
    title: "Club Nexus: Retro Cyber Synth Launch Party",
    subtitle: "Turning a high-energy dancefloor into an immediate visual sandbox stream.",
    description: "An electronic pop-up DJ launch in a dark downtown loft required a highly engaging, low-friction photo-sharing loop. Traditional sharing via group messages ruins photo resolution, is private to small groups, and breaks the immersive collective atmosphere.",
    heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    accentColor: "white",
    metrics: [
      { label: "Dancers", value: "320+", desc: "Interactive social crowd" },
      { label: "Beams Sent", value: "852", desc: "Direct client uploads" },
      { label: "Live Hits", value: "3.5k+", desc: "Slideshow interactions" },
      { label: "Scan Time", value: "4.8s", desc: "Ultra-low latency tunnel" }
    ],
    challenges: [
      "High-speed event environment with low ambient lighting.",
      "A fast interactive feedback loop is essential to encourage participation.",
      "A creative tech-loving crowd expects a visually striking interface."
    ],
    results: [
      "Glimpse's dark aesthetic perfectly integrated into the venue's industrial atmosphere.",
      "A massive digital wall projected active guest snaps in real-time with zero lag.",
      "Over 850 raw party beams captured the chaotic, real-world electricity."
    ],
    quote: "The visual engagement was crazy. People would snap a photo, upload, and look up to see it on the warehouse projector screen seconds later.",
    quoteAuthor: "DJ Silas Thorne, Host & Producer"
  },
  conference: {
    id: "conference",
    title: "SaaS Summit 2026: Live Interactive Panel Capture",
    subtitle: "Seamless keynote photo-sharing across 12 tracks, 45 panel sessions.",
    description: "A professional technology summit with 12 parallel presentation tracks and panel lounges needed to gather high-fidelity photos of slide decks from attendees. They wanted a central hub where attendees could easily see and share notes across different rooms.",
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    accentColor: "white",
    metrics: [
      { label: "Attendees", value: "1,200", desc: "Corporate professionals" },
      { label: "Slides Saved", value: "2,480", desc: "Pristine legible text" },
      { label: "Active Tracks", value: "12", desc: "Multi-hall routing" },
      { label: "Hours Saved", value: "14h", desc: "No manual social gathering" }
    ],
    challenges: [
      "Attendees are spread across separate keynote halls and lounges.",
      "Presenters move quickly through highly informative slide diagrams.",
      "Requires high-quality resolution to preserve small diagram text."
    ],
    results: [
      "Glimpse's Multi-Hall channel routing mapped separate QR codes to distinct boards.",
      "Attendees gathered high-fidelity slide notes on their mobile devices.",
      "An archive of over 2,400 educational diagrams was ready for premium sharing."
    ],
    quote: "Glimpse was a fantastic addition to SaaS Summit. Instead of attendees begging presenters to slide deck PDFs, everyone just collaborated.",
    quoteAuthor: "David Chen, Chief Event Director"
  }
};

interface CaseStudiesProps {
  currentCaseId: "wedding" | "party" | "conference";
  onBack: () => void;
  onNavigateToCase: (id: "wedding" | "party" | "conference") => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export default function CaseStudies({ currentCaseId, onBack, onNavigateToCase }: CaseStudiesProps) {
  const caseStudy = CASE_STUDIES[currentCaseId];

  if (!caseStudy) {
    return (
      <div className="py-24 text-center font-body bg-black min-h-screen text-white">
        <p className="text-sm text-white/40">Case study not found.</p>
        <button onClick={onBack} className="mt-8 px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-all text-[11px] uppercase tracking-[0.3em]">Back Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-body bg-black text-white antialiased">

      <header className="px-6 h-24 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl w-full mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/5 px-8 h-16 rounded-full shadow-2xl"
        >
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all cursor-pointer font-bold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Exit
          </button>

          <div className="flex items-center gap-2 cursor-pointer font-heading" onClick={onBack}>
            <span className="font-bold text-xl tracking-tighter italic">glimpse</span>
          </div>
        </motion.div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 pt-32 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCaseId}
            {...fadeInUp}
            className="space-y-32"
          >
            <div className="max-w-5xl space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
                   <span className="text-white">Case Presentation</span>
                   <span className="h-px w-12 bg-white/10" />
                   <span>0{Object.keys(CASE_STUDIES).indexOf(currentCaseId) + 1}</span>
                </div>
                <h1 className="font-heading italic text-7xl md:text-[10vw] tracking-tighter leading-[0.8] text-white">
                  {caseStudy.title}
                </h1>
                <p className="text-2xl text-white/40 max-w-2xl font-light italic leading-relaxed">
                  {caseStudy.subtitle}
                </p>
              </div>
            </div>

            <div className="aspect-[21/9] w-full bg-white/[0.02] border border-white/5 overflow-hidden rounded-[60px] shadow-[0_50px_150px_rgba(0,0,0,0.5)]">
              <img
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-60 hover:scale-105 transition-all duration-[2000ms]"
              />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">

              <div className="lg:col-span-8 space-y-24">

                <div className="space-y-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">The Narrative</span>
                  <p className="text-3xl text-white/60 font-light leading-relaxed max-w-3xl italic">
                    {caseStudy.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                   <div className="space-y-12">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">The Obstacles</span>
                      <ul className="space-y-8">
                        {caseStudy.challenges.map((challenge, i) => (
                          <li key={i} className="flex gap-6 items-start group">
                            <div className="mt-1 h-10 w-10 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:border-white transition-all duration-500 shadow-xl">
                              <div className="h-1.5 w-1.5 bg-white rounded-full" />
                            </div>
                            <span className="text-white/40 font-light text-lg leading-relaxed group-hover:text-white/60 transition-colors italic">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                   </div>

                   <div className="space-y-12">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">The Outcomes</span>
                      <ul className="space-y-8">
                        {caseStudy.results.map((result, i) => (
                          <li key={i} className="flex gap-6 items-start group">
                            <div className="mt-1 h-10 w-10 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl">
                              <Check className="h-5 w-5" />
                            </div>
                            <span className="text-white/40 font-light text-lg leading-relaxed group-hover:text-white/80 transition-colors italic">{result}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>

                <div className="p-16 bg-white/[0.02] border border-white/5 space-y-12 rounded-[60px] relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-white/10" />
                  <p className="font-heading italic text-4xl md:text-5xl text-white tracking-tighter leading-[0.9]">
                    "{caseStudy.quote}"
                  </p>
                  <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                    <span className="h-px w-12 bg-white/10" />
                    <span>{caseStudy.quoteAuthor}</span>
                  </div>
                </div>

              </div>

              <div className="lg:col-span-4 space-y-24">
                <div className="p-10 border border-white/5 space-y-16 rounded-[48px] shadow-2xl bg-white/[0.01]">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">Vital Metrics</span>

                  <div className="space-y-12">
                    {caseStudy.metrics.map((metric, i) => (
                      <div key={i} className="space-y-3 group">
                        <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">{metric.label}</p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-6xl font-heading text-white tracking-tighter group-hover:italic transition-all duration-500">{metric.value}</span>
                        </div>
                        <p className="text-[11px] text-white/20 font-light italic tracking-wide">{metric.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-10 border-t border-white/5 flex gap-4 text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold italic leading-relaxed">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>Full original archives.</span>
                  </div>
                </div>

                <div className="space-y-12">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold pl-4">Alternate Studies</span>
                  <div className="flex flex-col gap-6">
                    {Object.keys(CASE_STUDIES).map((id) => {
                      const c = CASE_STUDIES[id];
                      if (c.id === caseStudy.id) return null;
                      return (
                        <motion.button
                          whileHover={{ scale: 1.02, x: 8 }}
                          whileTap={{ scale: 0.98 }}
                          key={c.id}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onClick={() => onNavigateToCase(c.id as any)}
                          className="w-full p-8 text-left border border-white/5 rounded-[32px] hover:border-white/20 hover:bg-white/[0.02] transition-all group flex items-center justify-between shadow-xl"
                        >
                          <div className="space-y-2">
                             <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">{c.id}</span>
                             <p className="text-lg font-bold text-white/40 group-hover:text-white transition-colors italic">View Analysis</p>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-white/10 group-hover:text-white transition-colors" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}
