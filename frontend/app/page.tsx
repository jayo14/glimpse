"use client";
import { useRouter } from "next/navigation";

import { PRELOADED_THEMES, FAQS, Photo } from "@/lib/types";
import IphoneMockupShowcase from "@/components/landing-page/IphoneMockupShowcase";
import PricingCalculator from "@/components/landing-page/PricingCalculator";
import TvSlideshow from "@/components/landing-page/TvSlideshow";

import BlogPage from "@/components/landing-page/BlogPage";
import CaseStudies from "@/components/landing-page/CaseStudies";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function App() {
  const router = useRouter();
  const [selectedThemeId, setSelectedThemeId] = useState("wedding");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isTvActive, setIsTvActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [currentView, setCurrentView] = useState<
    "home" | "blog" | "case-study"
  >("home");
  const [activeCaseId, setActiveCaseId] = useState<
    "wedding" | "party" | "conference"
  >("wedding");

  useEffect(() => {
    const defaultTheme = PRELOADED_THEMES.find((t) => t.id === selectedThemeId);
    if (defaultTheme) {
      setPhotos([...defaultTheme.samplePhotos]);
    }
  }, [selectedThemeId]);

  const activeTheme =
    PRELOADED_THEMES.find((t) => t.id === selectedThemeId) ||
    PRELOADED_THEMES[0];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black font-body overflow-x-hidden antialiased">
      {isTvActive && (
        <TvSlideshow
          eventName="Sarah & James' Dream Wedding"
          themeColor={activeTheme.id}
          photos={photos}
          onClose={() => setIsTvActive(false)}
        />
      )}

      {/* NAVBAR */}
      <header className="fixed top-4 left-0 right-0 z-50 px-6">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-auto max-w-5xl h-16 flex items-center justify-between px-6 rounded-full border border-white/5 bg-background/50 backdrop-blur-xl shadow-2xl"
        >
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setCurrentView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-heading text-xl tracking-tighter text-white">glimpse</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Overview", action: () => { setCurrentView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
              { label: "Case Studies", action: () => { setActiveCaseId("wedding"); setCurrentView("case-study"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
              { label: "Journal", action: () => { setCurrentView("blog"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-[13px] uppercase tracking-widest text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push("/auth/login")}
              className="hidden md:block text-[13px] uppercase tracking-widest text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/auth/signup")}
              className="px-6 py-2 bg-white text-black text-[13px] uppercase tracking-widest rounded-full hover:bg-white/90 transition-all cursor-pointer font-bold"
            >
              Start
            </motion.button>
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {[
              { label: "Overview", action: () => { setCurrentView("home"); setIsMobileMenuOpen(false); } },
              { label: "Case Studies", action: () => { setActiveCaseId("wedding"); setCurrentView("case-study"); setIsMobileMenuOpen(false); } },
              { label: "Journal", action: () => { setCurrentView("blog"); setIsMobileMenuOpen(false); } },
              { label: "Sign In", action: () => { router.push("/auth/login"); setIsMobileMenuOpen(false); } },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-3xl font-heading text-white"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
        <main className="pt-16">
          {/* HERO */}
          <section className="min-h-[100vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
            <div className="max-w-5xl w-full text-center space-y-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm shadow-xl"
                >
                   <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                   <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Next generation event capture</span>
                </motion.div>
                <h1 className="text-[12vw] md:text-[8vw] font-heading leading-[0.85] tracking-tight">
                  Stop asking for <br /> photos. <span className="italic">Collect joy.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                  The absolute standard for guest-sourced visual assets. <br className="hidden md:block" /> High resolution storage, real-time projection, zero friction.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/auth/signup")}
                  className="w-full sm:w-auto px-12 py-5 bg-white text-black text-[13px] uppercase tracking-[0.2em] rounded-full hover:bg-white/90 transition-all font-bold flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                >
                  Create Event <Plus size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const target = document.getElementById("showcase");
                    target?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-12 py-5 border border-white/10 text-[13px] uppercase tracking-[0.2em] rounded-full transition-all flex items-center justify-center gap-3"
                >
                  View Showcase <ArrowUpRight size={16} />
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* SPLIT SECTION */}
          <section className="px-6 py-12">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="p-12 md:p-24 rounded-[40px] bg-white/[0.02] border border-white/5 flex flex-col justify-between aspect-square"
              >
                 <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">01 / Friction</span>
                 <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-heading leading-[0.9] italic">
                      "Download our app" is where <br /> engagement dies.
                    </h2>
                    <p className="text-lg text-white/50 max-w-md font-light">
                      Guests don't want another app. They want to experience the moment. Glimpse works with the camera they already have.
                    </p>
                 </div>
              </motion.div>
              <motion.div 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="p-12 md:p-24 rounded-[40px] bg-white/[0.04] border border-white/5 flex flex-col justify-between aspect-square"
              >
                 <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">02 / Simplicity</span>
                 <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-heading leading-[0.9]">
                      Scan. Beam. <br /> Done.
                    </h2>
                    <p className="text-lg text-white/50 max-w-md font-light">
                      A simple QR code. A web-based upload. Full resolution hits the screen in under a second. No password. No friction.
                    </p>
                 </div>
              </motion.div>
            </div>
          </section>

          {/* FULL WIDTH SHOWCASE */}
          <section id="showcase" className="py-32 px-6">
             <div className="max-w-[1440px] mx-auto space-y-12">
                <motion.div 
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-12"
                >
                   <h2 className="text-5xl md:text-7xl font-heading italic tracking-tight">Live Projection Stream</h2>
                   <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
                      <span>Real-time sync</span>
                      <div className="h-px w-12 bg-white/10" />
                      <span>Ballroom C</span>
                   </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="aspect-video bg-white/[0.02] border border-white/5 rounded-[40px] relative overflow-hidden flex items-center justify-center group shadow-2xl"
                >
                   <TvSlideshow
                      eventName="Sarah & James' Dream Wedding"
                      themeColor={selectedThemeId}
                      photos={photos}
                      isHero={true}
                    />
                    <div className="absolute bottom-8 left-8 z-10 flex items-center gap-3 px-5 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                       <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                       <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">Live uplink established</span>
                    </div>
                </motion.div>
             </div>
          </section>

          {/* FEATURES GRID */}
          <section className="px-6 py-12">
             <motion.div 
               variants={staggerContainer}
               initial="initial"
               whileInView="whileInView"
               viewport={{ once: true }}
               className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
             >
               {[
                 { title: "Zero Friction", desc: "No app downloads, no accounts, no passwords. Just a scan and an upload." },
                 { title: "Full Resolution", desc: "We don't compress. Your guests' 48MP shots stay exactly as they were captured." },
                 { title: "Instant Magic", desc: "Photos hit the big screen before the phone even goes back in the pocket." }
               ].map((item, i) => (
                 <motion.div 
                    variants={fadeInUp}
                    key={i} 
                    className="p-12 md:p-16 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-12 hover:bg-white/[0.04] transition-all group"
                 >
                    <div className="h-14 w-14 rounded-2xl border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 transition-all text-xl font-heading">
                       0{i + 1}
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-4xl font-heading italic tracking-tight">{item.title}</h3>
                      <p className="text-white/40 font-light text-lg leading-relaxed">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
             </motion.div>
          </section>

          {/* MOCKUP SHOWCASE */}
          <section className="py-32 px-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
             <div className="max-w-[1440px] mx-auto relative z-10">
                <motion.div 
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  className="text-center mb-24 space-y-6"
                >
                   <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">The Experience</span>
                   <h2 className="text-6xl md:text-8xl font-heading tracking-tight italic">Elegance in every frame.</h2>
                </motion.div>
                <IphoneMockupShowcase />
             </div>
          </section>

          {/* PRICING */}
          <section id="cost-analysis" className="py-32 px-6">
             <div className="max-w-6xl mx-auto space-y-24">
                <motion.div 
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  className="text-center space-y-8"
                >
                   <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Investment</span>
                   <h2 className="text-6xl md:text-9xl font-heading tracking-tighter leading-[0.8] italic">For the price of <br /> a few cocktails.</h2>
                </motion.div>
                <PricingCalculator />
             </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-32 px-6">
             <div className="max-w-4xl mx-auto">
                <motion.div 
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  className="mb-24 border-b border-white/5 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
                >
                   <h2 className="text-5xl md:text-7xl font-heading italic tracking-tight">Questions.</h2>
                   <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Inquiry desk / {FAQS.length} items</span>
                </motion.div>
                <div className="space-y-6">
                   {FAQS.map((faq, i) => (
                     <motion.div 
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        key={i} 
                        className="rounded-[32px] border border-white/5 bg-white/[0.01] overflow-hidden"
                     >
                        <button 
                          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                          className="w-full p-8 md:p-12 flex justify-between items-center text-left group"
                        >
                           <span className="text-2xl md:text-4xl font-heading tracking-tight group-hover:italic transition-all duration-300">{faq.question}</span>
                           <div className={`h-12 w-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 shadow-xl ${activeFaq === i ? 'rotate-45 bg-white text-black border-white' : 'hover:border-white/30'}`}>
                              <Plus size={20} />
                           </div>
                        </button>
                        <AnimatePresence>
                           {activeFaq === i && (
                             <motion.div
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: "auto", opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                               className="overflow-hidden"
                             >
                                <div className="px-8 md:px-12 pb-12">
                                   <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl italic">
                                      {faq.answer}
                                   </p>
                                </div>
                             </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-32 px-6 flex flex-col items-center justify-center min-h-[80vh] text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
             <motion.h2 
               initial={{ opacity: 0, scale: 1.2 }}
               whileInView={{ opacity: 0.03, scale: 1 }}
               transition={{ duration: 2 }}
               className="text-[25vw] font-heading tracking-tighter leading-none text-white select-none absolute bottom-0"
             >
                glimpse
             </motion.h2>
             <div className="relative z-10 space-y-16">
                <motion.h2 
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  className="text-7xl md:text-[10vw] font-heading tracking-tight leading-[0.8] italic"
                >
                   Ready to capture <br /> the magic?
                </motion.h2>
                <motion.button
                   whileHover={{ scale: 1.05, y: -4 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => router.push("/auth/signup")}
                   className="px-20 py-8 bg-white text-black text-[14px] uppercase tracking-[0.4em] rounded-full hover:bg-white/90 transition-all font-bold shadow-[0_30px_100px_rgba(255,255,255,0.15)]"
                >
                   Create Your Event
                </motion.button>
             </div>
          </section>

          {/* FOOTER */}
          <footer className="py-24 px-6 bg-black relative">
             <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
                   <div className="col-span-1 md:col-span-2 space-y-12">
                      <span className="font-heading text-4xl tracking-tighter">glimpse.</span>
                      <p className="text-white/40 max-w-sm text-xl font-light leading-relaxed italic">
                         The absolute standard for guest-sourced visual assets. High resolution storage, real-time projection.
                      </p>
                   </div>
                   <div className="space-y-8">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Navigation</span>
                      <div className="flex flex-col gap-6">
                         {['Overview', 'Case Studies', 'Journal', 'Pricing'].map(link => (
                           <button key={link} className="text-lg text-white/50 hover:text-white text-left transition-all hover:translate-x-2">
                              {link}
                           </button>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-8">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Connect</span>
                      <div className="flex flex-col gap-6">
                         {['Instagram', 'Twitter', 'LinkedIn', 'Support'].map(link => (
                           <button key={link} className="text-lg text-white/50 hover:text-white text-left transition-all hover:translate-x-2">
                              {link}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-12">
                   <span className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-medium">
                      &copy; {new Date().getFullYear()} Glimpse Editorial. All rights reserved.
                   </span>
                   <div className="flex gap-12">
                      {['Privacy Policy', 'Terms of Service'].map(link => (
                        <button key={link} className="text-[11px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">
                           {link}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </footer>
        </main>
      )}
    </div>
  );
}
