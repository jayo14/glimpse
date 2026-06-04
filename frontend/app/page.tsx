"use client";

import React, { useState, useEffect } from "react";
import {
  Tv,
  ChevronDown,
  Sparkles,
  Lock,
  ArrowRight,
  BookOpen,
  User,
  Smartphone,
  Apple,
  Camera,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";

import { PRELOADED_THEMES, FAQS, Photo } from "@/lib/types";
import IphoneMockupShowcase from "@/components/IphoneMockupShowcase";
import PricingCalculator from "@/components/PricingCalculator";
import TvSlideshow from "@/components/TvSlideshow";
import PhoneMockup from "@/components/PhoneMockup";

// New high fidelity pages and custom navigation elements
import BlogPage from "@/components/BlogPage";
import CaseStudies from "@/components/CaseStudies";
import AuthPages from "@/components/AuthPages";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

// Premium layout animation definitions
const fadeUpVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true, margin: "-100px" },
};

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedThemeId, setSelectedThemeId] = useState("wedding");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isTvActive, setIsTvActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // High fidelity view routing states
  const [currentView, setCurrentView] = useState<
    "home" | "blog" | "case-study" | "auth"
  >("home");
  const [activeCaseId, setActiveCaseId] = useState<
    "wedding" | "party" | "conference"
  >("wedding");
  const [authMode, setAuthMode] = useState<
    "login" | "signup" | "forgot" | "reset"
  >("login");

  // Load photos from chosen theme to populate slideshow demo
  useEffect(() => {
    const defaultTheme = PRELOADED_THEMES.find((t) => t.id === selectedThemeId);
    if (defaultTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhotos([...defaultTheme.samplePhotos]);
    }
  }, [selectedThemeId]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const activeTheme =
    PRELOADED_THEMES.find((t) => t.id === selectedThemeId) ||
    PRELOADED_THEMES[0];

  if (currentView === "auth") {
    return (
      <AuthPages
        initialMode={authMode}
        onBackToHome={() => setCurrentView("home")}
        onSuccessToast={(msg) => showToast(msg)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#18171C] selection:bg-[#F4C9C8]/40 selection:text-[#481F1E] font-sans overflow-x-hidden antialiased">
      {/* TOAST SYSTEM */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 max-w-sm rounded-[16px] bg-white border border-[#E4E4E7] p-4 shadow-cluely-premium flex items-start space-x-3.5 text-sm text-[#18171C] animate-fade-in">
          <div className="h-6 w-6 mt-0.5 rounded-full bg-[#18171C] flex items-center justify-center text-white shrink-0 text-xs text-center font-bold">
            ✓
          </div>
          <div className="font-sans">
            <p className="text-[10px] text-[#263043] font-sans font-semibold uppercase tracking-wider">
              Update
            </p>
            <p className="text-[12px] text-[#898B91] font-light leading-normal mt-0.5">
              {toastMessage}
            </p>
          </div>
        </div>
      )}

      {/* IMMERSIVE TV MODAL OVERLAY */}
      {isTvActive && (
        <TvSlideshow
          eventName="Sarah & James' Dream Wedding"
          themeColor={activeTheme.id}
          photos={photos}
          onClose={() => setIsTvActive(false)}
        />
      )}

      {/* MINIMAL NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#E4E4E7]/60 select-none">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between font-sans">
          <div
            className="flex items-center space-x-2.5 cursor-pointer font-serif"
            onClick={() => {
              setCurrentView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="h-2 w-2 rounded-full bg-[#263043]"></div>
            <span className="font-medium text-lg tracking-tight">glimpse.</span>
          </div>

          <nav className="hidden md:flex items-center">
            {/* SHADCN MENUBAR COMPONENT */}
            <Menubar className="border-0 bg-transparent flex items-center gap-1">
              <MenubarMenu>
                <button
                  onClick={() => {
                    setCurrentView("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-[10px] uppercase font-semibold text-[#898B91] tracking-widest hover:text-[#263043] transition-all cursor-pointer px-3 py-1.5 rounded-lg hover:bg-stone-100"
                >
                  Overview
                </button>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-[10px] uppercase font-semibold text-[#898B91] tracking-widest hover:text-[#263043] transition-all cursor-pointer px-3 py-1.5 rounded-lg hover:bg-stone-100 aria-expanded:bg-stone-200">
                  Case Studies
                </MenubarTrigger>
                <MenubarContent className="bg-white border border-[#E4E4E7]/60 p-1 rounded-xl shadow-lg min-w-[200px] z-50">
                  <MenubarItem
                    onClick={() => {
                      setActiveCaseId("wedding");
                      setCurrentView("case-study");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center justify-between px-3 py-2 text-[11px] hover:bg-[#F5F5F5] rounded-lg cursor-pointer"
                  >
                    <span className="font-serif">Wedding Case Study</span>
                    <span className="text-[9px] font-mono text-[#898B91] uppercase">
                      Sarah & James
                    </span>
                  </MenubarItem>
                  <MenubarSeparator className="h-px bg-stone-100 my-1" />
                  <MenubarItem
                    onClick={() => {
                      setActiveCaseId("party");
                      setCurrentView("case-study");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center justify-between px-3 py-2 text-[11px] hover:bg-off-white rounded-lg cursor-pointer"
                  >
                    <span className="font-serif">Club Party Case Study</span>
                    <span className="text-[9px] font-mono text-ash uppercase">
                      Nexus Cyber
                    </span>
                  </MenubarItem>
                  <MenubarSeparator className="h-px bg-stone-100 my-1" />
                  <MenubarItem
                    onClick={() => {
                      setActiveCaseId("conference");
                      setCurrentView("case-study");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center justify-between px-3 py-2 text-[11px] hover:bg-off-white rounded-lg cursor-pointer"
                  >
                    <span className="font-serif">Conference Case Study</span>
                    <span className="text-[9px] font-mono text-ash uppercase">
                      SaaS Summit
                    </span>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <button
                  onClick={() => {
                    setCurrentView("blog");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-[10px] uppercase font-semibold text-ash tracking-widest hover:text-deep-slate transition-all cursor-pointer px-3 py-1.5 rounded-lg hover:bg-stone-100"
                >
                  Chronicle Blog
                </button>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-[10px] uppercase font-semibold text-ash tracking-widest hover:text-deep-slate transition-all cursor-pointer px-3 py-1.5 rounded-lg hover:bg-stone-100 aria-expanded:bg-stone-200">
                  Host Portal
                </MenubarTrigger>
                <MenubarContent className="bg-white border border-silver/60 p-1 rounded-xl shadow-lg min-w-50 z-50">
                  <MenubarItem
                    onClick={() => {
                      setAuthMode("login");
                      setCurrentView("auth");
                    }}
                    className="flex items-center justify-between px-3 py-2 text-[11px] hover:bg-off-white rounded-lg cursor-pointer"
                  >
                    <span>Host Login Console</span>
                    <BookOpen className="h-3.5 w-3.5 text-[#263043]" />
                  </MenubarItem>
                  <MenubarSeparator className="h-px bg-stone-100 my-1" />
                  <MenubarItem
                    onClick={() => {
                      setAuthMode("signup");
                      setCurrentView("auth");
                    }}
                    className="flex items-center justify-between px-3 py-2 text-[11px] hover:bg-[#F5F5F5] rounded-lg cursor-pointer"
                  >
                    <span>Register Dashboard</span>
                    <User className="h-3.5 w-3.5 text-[#263043]" />
                  </MenubarItem>
                  <MenubarSeparator className="h-px bg-stone-100 my-1" />
                  <MenubarItem
                    onClick={() => {
                      setAuthMode("forgot");
                      setCurrentView("auth");
                    }}
                    className="flex items-center justify-between px-3 py-2 text-[11px] hover:bg-[#F5F5F5] rounded-lg cursor-pointer"
                  >
                    <span>Restore Password</span>
                    <Lock className="h-3.5 w-3.5 text-[#898B91]" />
                  </MenubarItem>
                  <MenubarSeparator className="h-px bg-stone-100 my-1" />
                  <MenubarItem
                    onClick={() => {
                      setAuthMode("reset");
                      setCurrentView("auth");
                    }}
                    className="flex items-center justify-between px-3 py-2 text-[11px] hover:bg-[#F5F5F5] rounded-lg cursor-pointer"
                  >
                    <span>Reset Credentials</span>
                    <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </nav>

          <div className="flex items-center space-x-6">
            <button
              id="create-event-top-btn"
              onClick={() => {
                if (currentView !== "home") {
                  setCurrentView("home");
                  setTimeout(() => {
                    const target = document.getElementById("cost-analysis");
                    target?.scrollIntoView({ behavior: "smooth" });
                  }, 120);
                } else {
                  const target = document.getElementById("cost-analysis");
                  target?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-[#263043] hover:bg-black text-[11px] font-semibold text-white tracking-widest uppercase transition-all shadow-cluely-large hover:-translate-y-0.5 cursor-pointer"
            >
              Start Event
            </button>
          </div>
        </div>
      </header>

      {/* RENDER VIEW CONDITIONALLY */}
      {currentView === "blog" && (
        <BlogPage onBack={() => setCurrentView("home")} />
      )}

      {currentView === "case-study" && (
        <CaseStudies
          currentCaseId={activeCaseId}
          onBack={() => setCurrentView("home")}
          onNavigateToCase={(id) => setActiveCaseId(id)}
        />
      )}

      {currentView === "home" && (
        <>
          {/* EDITORIAL HERO SECTION */}
          <section className="relative py-16 md:py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* HERO LEFT: TYPOGRAPHY CONTENT */}
                <motion.div
                  className="lg:col-span-7 space-y-8 md:space-y-10 text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#898B91] flex items-center space-x-2">
                    <span className="text-[#263043] font-bold">/ /</span>
                    <span>Uncomplicated Crowdsourcing Portal</span>
                  </div>

                  <h1 className="font-serif font-light text-[42px] sm:text-5xl md:text-6xl lg:text-7xl text-[#18171C] tracking-tight leading-[1.02] sm:leading-[0.95]">
                    Stop asking guests to download an app.
                  </h1>

                  <p className="text-[#898B91] text-sm md:text-base leading-relaxed font-sans font-light max-w-xl">
                    Asking guests to download an app kills the vibe. Blurry
                    photos, forgotten cameras, and login screens do the rest.
                  </p>

                  <p className="text-[#18171C] text-sm md:text-base leading-relaxed font-sans font-medium max-w-xl">
                    <strong>
                      Guests just scan a QR code with their regular camera. No
                      app. No password. No typing.
                    </strong>{" "}
                    The upload starts in about one second.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      id="hero-create-btn"
                      onClick={() => {
                        const target = document.getElementById("cost-analysis");
                        target?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-6 py-3.5 rounded-xl bg-[#263043] hover:bg-black text-[11px] font-sans font-semibold text-white tracking-widest uppercase transition-all shadow-cluely-large hover:-translate-y-0.5 cursor-pointer"
                    >
                      Start a free test
                    </button>
                    <button
                      id="hero-scroll-showcase"
                      onClick={() => {
                        const target =
                          document.getElementById("visual-showcase");
                        target?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 group text-xs font-semibold text-[#263043] hover:text-[#898B91] uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      See it live
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  <div className="border-t border-[#E4E4E7]/60 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-[10px] uppercase tracking-widest text-[#898B91]">
                    <div>
                      <p className="font-serif text-lg text-[#18171C] mb-0.5 font-light">
                        0s Sign-up
                      </p>
                      <p className="font-sans font-light">No app needed</p>
                    </div>
                    <div>
                      <p className="font-serif text-lg text-[#18171C] mb-0.5 font-light">
                        100% Web
                      </p>
                      <p className="font-sans font-light font-normal">
                        Works from the camera they already have
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-lg text-[#18171C] mb-0.5 font-light">
                        Unlimited
                      </p>
                      <p className="font-sans font-light">
                        Every photo stays in full quality
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-lg text-[#18171C] mb-0.5 font-light">
                        Live Sync
                      </p>
                      <p className="font-sans font-light font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded shadow-sm inline-block">
                        ● On screen fast
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* HERO RIGHT: DYNAMIC GUEST-LEVEL LIVE MOCKUP */}
                <motion.div
                  className="lg:col-span-5 flex justify-center lg:justify-end relative"
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Floating aesthetic labels */}
                  <div className="absolute -top-6 left-2 sm:-left-6 bg-white border border-[#E4E4E7]/60 shadow-cluely-premium p-3 rounded-2xl flex items-center gap-2.5 z-20">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[9.5px] font-sans font-semibold text-[#263043] uppercase tracking-wide">
                      Live Camera Uplink
                    </span>
                  </div>

                  <div className="absolute -bottom-4 right-2 sm:-right-4 bg-white border border-[#E4E4E7]/60 shadow-cluely-premium p-3.5 rounded-2xl z-20 font-sans max-w-[150px] hidden sm:block">
                    <p className="text-[8.5px] uppercase text-[#898B91] font-semibold tracking-wider">
                      Try Sandbox
                    </p>
                    <p className="text-[10px] text-[#263043] font-light mt-0.5 leading-snug">
                      Click any quick-preset on the phone to draft live streams
                      below!
                    </p>
                  </div>

                  <div className="w-full max-w-[320px]">
                    <PhoneMockup
                      eventName="Sarah & James' Dream Wedding"
                      themeColor={selectedThemeId}
                      gradientFrom={activeTheme.gradientFrom}
                      gradientTo={activeTheme.gradientTo}
                      onPhotoUploaded={(newPhoto) => {
                        setPhotos((prev) => [newPhoto, ...prev]);
                        showToast(
                          "Beamed from the interactive hero phone mockup! View in showcase.",
                        );
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS: SYSTEM FRAMEWORK */}
          <section
            id="minimal-framework"
            className="relative py-28 bg-[#FFFFFF] border-y border-[#E4E4E7]/60 px-6"
          >
            <div className="max-w-5xl mx-auto space-y-24">
              <motion.div
                className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E4E4E7]/60 pb-8 gap-4"
                variants={fadeUpVariant}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="space-y-4 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#898B91]">
                    How it works
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl text-[#18171C] font-light tracking-tight">
                    Scan. Upload. Done.
                  </h2>
                </div>
                <p className="text-xs text-[#898B91] font-sans max-w-sm font-light text-left">
                  <strong className="text-[#18171C] font-semibold">
                    Guests just scan a QR code with their regular camera. No
                    app. No password. No typing.
                  </strong>{" "}
                  That is the whole trick.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-16 font-sans text-left"
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-80px" }}
              >
                {/* Step 1 */}
                <motion.div className="space-y-6" variants={fadeUpVariant}>
                  <span className="font-serif text-3xl font-light text-[#E4E4E7] block">
                    01 /
                  </span>
                  <h3 className="font-medium text-sm text-[#18171C] uppercase tracking-wider">
                    Put the QR code out
                  </h3>
                  <p className="text-xs text-[#898B91] leading-relaxed font-light">
                    Put it on tables, at the bar, or on a screen. Guests already
                    know what to do when they see a camera prompt.
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div className="space-y-6" variants={fadeUpVariant}>
                  <span className="font-serif text-3xl font-light text-[#E4E4E7] block">
                    02 /
                  </span>
                  <h3 className="font-medium text-sm text-[#18171C] uppercase tracking-wider">
                    They upload in one tap
                  </h3>
                  <p className="text-xs text-[#898B91] leading-relaxed font-light">
                    They pick a photo, add a note if they want, and hit send.
                    The whole thing feels as fast as texting.
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div className="space-y-6" variants={fadeUpVariant}>
                  <span className="font-serif text-3xl font-light text-[#E4E4E7] block">
                    03 /
                  </span>
                  <h3 className="font-medium text-sm text-[#18171C] uppercase tracking-wider">
                    The room sees it immediately
                  </h3>
                  <p className="text-xs text-[#898B91] leading-relaxed font-light">
                    Photos appear on the big screen before your guest even puts
                    their phone back in their pocket.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* NEW MOCKUPS VISUAL SHOWCASE */}
          <section
            id="visual-showcase"
            className="py-28 px-6 bg-zinc-50 border-b border-[#E4E4E7]/60"
          >
            <IphoneMockupShowcase />
          </section>

          {/* LIVE PROJECTOR EXPERIENCE ENHANCER */}
          <section className="py-24 px-6 bg-white relative overflow-hidden flex flex-col items-center border-y border-[#E4E4E7]/60">
            <motion.div
              className="max-w-4xl text-center space-y-8 relative z-10"
              variants={fadeUpVariant}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-[#263043]/5 border border-[#263043]/10 flex items-center justify-center text-[#263043] shadow-cluely-lifted mb-4">
                <Tv className="h-5 w-5 text-[#263043]" />
              </div>
              <h3 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#18171C]">
                Experience the{" "}
                <span className="italic">Live Projection Cast</span>.
              </h3>
              <p className="text-xs md:text-sm text-[#898B91] leading-relaxed max-w-xl mx-auto font-sans font-light">
                Toggle our premium fullscreen projector screen. Typically
                deployed on ballroom smart TVs or stage walls, this view serves
                gorgeous cross-fades of guest uploads in real time.
              </p>
              <div className="flex justify-center pt-2">
                <button
                  id="demo-projection-btn"
                  onClick={() => {
                    setIsTvActive(true);
                    showToast("Simulated Fullscreen TV Cast View activated.");
                  }}
                  className="px-8 py-4 bg-[#263043] hover:bg-black text-[12px] text-white font-sans font-semibold uppercase tracking-widest transition-all hover:-translate-y-0.5 rounded-xl flex items-center gap-2.5 shadow-cluely-large cursor-pointer"
                >
                  <Tv className="h-4 w-4 text-[#F4C9C8]" />
                  Launch Projector Display
                </button>
              </div>
            </motion.div>

            {/* Subtle decorative grid/ring layout representing cast range */}
            <div className="absolute inset-0 top-1/2 flex items-center justify-center -translate-y-12 opacity-5 pointer-events-none mb-12">
              <div className="h-[400px] w-[400px] rounded-full border border-black animate-pulse-slow"></div>
              <div className="absolute h-[600px] w-[600px] rounded-full border border-[#263043]"></div>
            </div>
          </section>

          {/* COST VS VALUE ANALYSIS REDESIGN */}
          <section
            id="cost-analysis"
            className="py-28 bg-[#FFFFFF] border-y border-[#E4E4E7]/60 px-6"
          >
            <div className="max-w-5xl mx-auto space-y-16">
              <motion.div
                className="text-left space-y-4"
                variants={fadeUpVariant}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#898B91]">
                  Why waste money on disposable cameras?
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-[#18171C] font-light tracking-tight">
                  For two cocktails per person, keep the memories forever.
                </h2>
                <p className="text-xs text-[#898B91] max-w-lg font-light leading-relaxed">
                  <strong className="text-[#18171C] font-semibold">
                    For the price of 2 cocktails per guest, you get a lifetime
                    of memories.
                  </strong>{" "}
                  That beats disposable cameras, half-used film rolls, and the
                  post-event hunt for missing prints.
                </p>
              </motion.div>

              <PricingCalculator />
            </div>
          </section>

          {/* SUBTLE FAQ REDESIGN */}
          <section id="faq" className="py-28 px-6">
            <div className="max-w-3xl mx-auto space-y-16">
              <motion.div
                className="text-left space-y-4"
                variants={fadeUpVariant}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#898B91]">
                  Common questions
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-[#18171C] font-light tracking-tight">
                  The questions hosts actually ask.
                </h2>
                <p className="text-xs text-[#898B91] max-w-lg font-light leading-relaxed">
                  <strong className="text-[#18171C] font-semibold">
                    If your guests can use a camera, they can use Glimpse.
                  </strong>{" "}
                  That is the short answer to almost every FAQ below.
                </p>
              </motion.div>

              {/* Accordion list stack */}
              <div className="border-t border-[#E4E4E7]/60 divide-y divide-[#E4E4E7]/60 text-left">
                {FAQS.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div key={index} className="py-6 first:pt-4">
                      <button
                        id={`faq-toggle-${index}`}
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left focus:outline-none hover:text-[#898B91] transition-colors cursor-pointer"
                      >
                        <span className="font-serif font-light text-[#18171C] text-base md:text-lg pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-[#898B91] transition-transform duration-300 transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-xs md:text-sm text-[#898B91] leading-relaxed font-light font-sans max-w-2xl">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* FINAL HIGH NEGATIVE SPACE ACTION INJECTOR */}
              <motion.div
                className="py-16 text-center space-y-6"
                variants={fadeUpVariant}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                <span className="inline-block h-px w-12 bg-[#B2B3BA] mb-2"></span>
                <h3 className="font-serif text-xl md:text-2xl text-[#18171C] font-light">
                  Stop begging for photos. Start collecting joy. Pick your plan
                  below.
                </h3>
                <div className="flex justify-center pt-2">
                  <button
                    id="faq-launch-event-btn"
                    onClick={() => {
                      const target = document.getElementById("cost-analysis");
                      target?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-cluely-primary px-8 py-3.5 bg-[#263043] text-white text-[11px] font-sans font-semibold uppercase tracking-widest hover:-translate-y-0.5 rounded-xl transition-all cursor-pointer shadow-cluely-large"
                  >
                    Pick a plan
                  </button>
                </div>
              </motion.div>

              {/* DYNAMIC COMPANION DOWNLOAD SECTION */}
              <section
                id="download-app"
                className="py-24 border-t border-[#E4E4E7]/60 bg-[#F9F9FB]/80 px-6 relative overflow-hidden"
              >
                <div className="max-w-5xl mx-auto relative z-10">
                  <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#898B91] flex items-center justify-center gap-2">
                      <Smartphone className="h-3 w-3 text-[#263043]" />{" "}
                      Standalone Client Utility
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#18171C] font-light tracking-tight">
                      Gather Glimpses anywhere.
                    </h2>
                    <p className="text-xs text-[#898B91] font-sans font-light leading-relaxed">
                      For professional event planners, wedding registrars, and
                      projection staff: access offline queues, interactive
                      casting streams, and remote moderation nodes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* iOS BADGE COMPANION BLOCK */}
                    <motion.div
                      className="bg-white border border-[#E4E4E7]/60 p-8 rounded-2xl md:rounded-3xl shadow-sm text-left flex flex-col justify-between hover:shadow-md transition-shadow"
                      variants={fadeUpVariant}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true }}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="h-10 w-10 bg-[#18171C]/5 rounded-xl flex items-center justify-center text-[#18171C]">
                            <Apple className="h-5 w-5" />
                          </div>
                          <span className="text-[9px] font-mono tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase font-semibold">
                            Native iOS Build
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-serif text-xl font-light text-[#18171C]">
                            Glimpse for iOS
                          </h3>
                          <p className="text-xs text-[#898B91] leading-relaxed font-light">
                            Integrated directly with Apple Photos API, AirPlay
                            casting, dynamic lockscreen widgets, and native push
                            alerts for immediate guest event alerts.
                          </p>
                        </div>

                        <ul className="space-y-2.5 pt-2 text-[10.5px] text-[#263043] font-light font-sans">
                          <li className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-[#263043] rounded-full"></span>{" "}
                            Secure Sandbox isolated framework
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-[#263043] rounded-full"></span>{" "}
                            Ultra-high resolution RAW & HEIC compatibility
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-[#263043] rounded-full"></span>{" "}
                            Simultaneous dual-camera capture module
                          </li>
                        </ul>
                      </div>

                      <button
                        onClick={() => {
                          showToast(
                            "Establishing App Store handshake... Glimpse Pro for iOS (v2.8.4) ready to transmit!",
                          );
                        }}
                        className="mt-8 w-full group flex items-center justify-center gap-2.5 h-12 bg-[#18171C] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all tracking-wider uppercase cursor-pointer"
                      >
                        <Apple className="h-4 w-4 fill-current" /> Download for
                        App Store
                      </button>
                    </motion.div>

                    {/* ANDROID BADGE COMPANION BLOCK */}
                    <motion.div
                      className="bg-white border border-[#E4E4E7]/60 p-8 rounded-2xl md:rounded-3xl shadow-sm text-left flex flex-col justify-between hover:shadow-md transition-shadow"
                      variants={fadeUpVariant}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true }}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="h-10 w-10 bg-[#18171C]/5 rounded-xl flex items-center justify-center text-[#263043]">
                            {/* High Fidelity Android Icon Vector */}
                            <svg
                              className="h-5 w-5 fill-current text-[#263043]"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.523 15.3l1.816 3.146a.82.82 0 01-.301 1.122.828.828 0 01-1.125-.301L16.08 16.09A9.123 9.123 0 0112 17a9.123 9.123 0 01-4.08-.91l-1.83 3.177a.825.825 0 01-1.426-.822l1.816-3.146A8.995 8.995 0 013 9.308c0-2.41 1.083-4.576 2.784-6.071L4.694 1.583a.825.825 0 111.426-.822l1.107 1.921c1.398-.67 2.964-1.05 4.623-1.05 1.66 0 3.225.38 4.623 1.05l1.107-1.921a.825.825 0 111.426.822l-1.09 1.904A8.91 8.91 0 0121 9.308a8.995 8.995 0 01-3.477 5.992zM7 9a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
                            </svg>
                          </div>
                          <span className="text-[9px] font-mono tracking-widest text-[#263043] bg-stone-100 px-2.5 py-1 rounded-full uppercase font-semibold">
                            Native SDK AOT
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-serif text-xl font-light text-[#18171C]">
                            Glimpse for Android
                          </h3>
                          <p className="text-xs text-[#898B91] leading-relaxed font-light">
                            Engineered around Material You adaptive parameters.
                            Built-in local offline background image queues, high
                            density network recovery protocols, and legacy cast
                            support.
                          </p>
                        </div>

                        <ul className="space-y-2.5 pt-2 text-[10.5px] text-[#263043] font-light font-sans">
                          <li className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-[#263043] rounded-full"></span>{" "}
                            Native C++ background transport layer
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-[#263043] rounded-full"></span>{" "}
                            Fast local local storage dump options
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-[#263043] rounded-full"></span>{" "}
                            Chromecast and DLNA projection streams
                          </li>
                        </ul>
                      </div>

                      <button
                        onClick={() => {
                          showToast(
                            "Accessing Google Play Hub... Safe transfer handshake verified on Android client.",
                          );
                        }}
                        className="mt-8 w-full group flex items-center justify-center gap-2.5 h-12 bg-white hover:bg-stone-50 text-[#18171C] border border-[#E4E4E7]/80 text-xs font-semibold rounded-xl transition-all tracking-wider uppercase cursor-pointer"
                      >
                        <svg
                          className="h-4 w-4 fill-current text-[#18171C]"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.523 15.3l1.816 3.146a.82.82 0 01-.301 1.122.828.828 0 01-1.125-.301L16.08 16.09A9.123 9.123 0 0112 17a9.123 9.123 0 01-4.08-.91l-1.83 3.177a.825.825 0 01-1.426-.822l1.816-3.146A8.995 8.995 0 013 9.308c0-2.41 1.083-4.576 2.784-6.071L4.694 1.583a.825.825 0 111.426-.822l1.107 1.921c1.398-.67 2.964-1.05 4.623-1.05 1.66 0 3.225.38 4.623 1.05l1.107-1.921a.825.825 0 111.426.822l-1.09 1.904A8.91 8.91 0 0121 9.308a8.995 8.995 0 01-3.477 5.992zM7 9a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
                        </svg>{" "}
                        Download for Google Play
                      </button>
                    </motion.div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </>
      )}

      {/* NEW HIGH-FIDELITY FOOTER WITH TYPOGRAPHIC STAMP ANCHOR */}
      <footer className="bg-[#FFFFFF] border-t border-[#E4E4E7]/60 pt-24 pb-12 px-6 font-sans relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main Footer Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 text-left">
            {/* Column 1: Brand & Slogan */}
            <div className="lg:col-span-5 space-y-6">
              <div
                className="flex items-center space-x-2 font-serif text-xl tracking-tight font-medium cursor-pointer"
                onClick={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="h-2 w-2 rounded-full bg-[#263043]"></div>
                <span>glimpse.</span>
              </div>
              <p className="text-xs text-[#898B91] font-sans font-light leading-relaxed max-w-sm">
                The absolute standard for guest-sourced visual assets. High
                resolution storage vaults, encrypted transit locks, and
                real-time interactive projection grids.
              </p>

              {/* Premium Social Links Accent */}
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Connected to verified secure archive feed.");
                  }}
                  className="h-8 w-8 rounded-full border border-stone-100 hover:border-[#18171C] flex items-center justify-center text-[#898B91] hover:text-[#18171C] transition-all hover:-translate-y-0.5"
                >
                  <Camera className="h-4 w-4" />
                </a>
                <a
                  href="#linkedin"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast(
                      "Establishing professional networks handshake...",
                    );
                  }}
                  className="h-8 w-8 rounded-full border border-stone-100 hover:border-[#18171C] flex items-center justify-center text-[#898B91] hover:text-[#18171C] transition-all hover:-translate-y-0.5"
                >
                  <Briefcase className="h-4 w-4" />
                </a>
                <a
                  href="#tw"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Routing microblogging transmission client...");
                  }}
                  className="h-8 w-8 rounded-full border border-stone-100 hover:border-[#18171C] flex items-center justify-center text-[#898B91] hover:text-[#18171C] transition-all hover:-translate-y-0.5"
                >
                  {/* Twitter Custom Premium Mini SVG */}
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: System Solutions */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#18171C] font-semibold">
                Architecture
              </h4>
              <ul className="space-y-2.5 text-xs font-light text-[#898B91]">
                <li>
                  <button
                    onClick={() => {
                      setCurrentView("home");
                      setTimeout(() => {
                        const target =
                          document.getElementById("minimal-framework");
                        target?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="hover:text-[#263043] transition-colors cursor-pointer"
                  >
                    Framework System
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView("home");
                      setTimeout(() => {
                        const target =
                          document.getElementById("visual-showcase");
                        target?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="hover:text-[#263043] transition-colors cursor-pointer"
                  >
                    Visual Live Showcase
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView("home");
                      setTimeout(() => {
                        const target = document.getElementById("cost-analysis");
                        target?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="hover:text-[#263043] transition-colors cursor-pointer"
                  >
                    Pricing Index
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView("home");
                      setTimeout(() => {
                        const target = document.getElementById("download-app");
                        target?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="hover:text-[#263043] font-semibold text-[#263043] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    Mobile Clients{" "}
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Case Chronics */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#18171C] font-semibold">
                Live Case Studies
              </h4>
              <ul className="space-y-2.5 text-xs font-light text-[#898B91]">
                <li>
                  <button
                    onClick={() => {
                      setActiveCaseId("wedding");
                      setCurrentView("case-study");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#263043] transition-colors cursor-pointer text-left"
                  >
                    Byron & Sarah Wedding
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCaseId("party");
                      setCurrentView("case-study");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#263043] transition-colors cursor-pointer text-left"
                  >
                    Nexus Cyber Club Night
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCaseId("conference");
                      setCurrentView("case-study");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#263043] transition-colors cursor-pointer text-left"
                  >
                    Global SaaS Tech Summit
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Host Vault */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#18171C] font-semibold">
                Access Portal
              </h4>
              <ul className="space-y-2.5 text-xs font-light text-[#898B91]">
                <li>
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setCurrentView("auth");
                    }}
                    className="hover:text-[#263043] transition-colors cursor-pointer text-left"
                  >
                    Curator Admin Console
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setCurrentView("auth");
                    }}
                    className="hover:text-[#263043] transition-colors cursor-pointer text-left"
                  >
                    Register Unified Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setAuthMode("forgot");
                      setCurrentView("auth");
                    }}
                    className="hover:text-[#263043] transition-colors cursor-pointer text-left"
                  >
                    Password Restoration
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView("blog");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#263043] font-semibold text-[#a75551] transition-colors cursor-pointer text-left"
                  >
                    Read Chronicle Blog
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Separation Guard */}
          <div className="border-t border-[#E4E4E7]/60 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="text-[10px] text-[#898B91] space-y-1.5 font-mono tracking-wider">
              <p>
                © {new Date().getFullYear()} glimpse. Spacecraft and Control,
                Inc. All rights reserved.
              </p>
              <p className="flex items-center gap-1.5 select-none text-[9px] text-[#A7C3A8]/90 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                PORT 3000 DIRECT ROUTE • PRIVACY VAULT ONLINE
              </p>
            </div>
            <div className="text-[10px] text-[#898B91] font-mono tracking-wide uppercase flex items-center gap-4">
              <a
                href="#rules"
                onClick={(e) => {
                  e.preventDefault();
                  showToast(
                    "Security parameters enforce no persistent cookie tracking.",
                  );
                }}
                className="hover:text-[#18171C]"
              >
                Privacy Code
              </a>
              <span>•</span>
              <a
                href="#rules"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Displaying statutory event legal provisions.");
                }}
                className="hover:text-[#18171C]"
              >
                Provision Terms
              </a>
            </div>
          </div>

          {/* ULTRA-BOLD MASSIVE ANCHOR STAMP */}
          <div className="text-[11vw] sm:text-[13vw] font-black tracking-widest text-[#18171C]/5 select-none text-center block leading-none pt-12 md:pt-16 uppercase transition-all font-sans font-extrabold pointer-events-none">
            glimpse
          </div>
        </div>
      </footer>
    </div>
  );
}
