"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const SCENES = [
  {
    text: "Capture the film of your life through every eye that matters.",
    sub: "Raw emotion, gathered natively."
  },
  {
    text: "Host unforgettable events and share digital galleries.",
    sub: "High resolution, zero friction."
  },
  {
    text: "The absolute standard for guest-sourced visual assets.",
    sub: "Join the vanguard of event photography."
  },
];

export default function IntroPage() {
  const router = useRouter();
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentScene]);

  const handleNext = () => {
    setDirection(1);
    if (currentScene < SCENES.length - 1) {
      setCurrentScene((prev) => prev + 1);
    } else {
      completeIntro();
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1);
    }
  };

  const completeIntro = () => {
    localStorage.setItem("glimpse_seen_intro", "true");
    router.replace("/auth/signup");
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      filter: "blur(20px)",
      scale: 1.1,
    }),
    center: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      filter: "blur(20px)",
      scale: 0.9,
    }),
  };

  return (
    <div className="min-h-screen bg-black text-white font-body antialiased flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

      <header className="absolute top-0 left-0 right-0 h-24 px-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer font-heading">
          <span className="font-bold text-xl tracking-tighter italic">glimpse</span>
        </div>
        <button 
          onClick={completeIntro}
          className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all font-bold"
        >
          Skip
        </button>
      </header>

      {/* Invisible Tap/Click wrappers */}
      <div className="absolute inset-0 flex z-40">
        <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} />
        <div className="w-2/3 h-full cursor-pointer" onClick={handleNext} />
      </div>

      <main className="max-w-5xl w-full px-8 text-center relative z-10 pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScene}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="space-y-8">
               <motion.span 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-[10px] uppercase tracking-[0.4em] text-white/20 block font-bold"
               >
                 Scenario 0{currentScene + 1}
               </motion.span>
               <h1 className="text-6xl md:text-[8vw] font-heading tracking-tighter leading-[0.85] italic">
                 {SCENES[currentScene].text}
               </h1>
               <p className="text-xl md:text-3xl text-white/40 font-light italic leading-relaxed">
                 {SCENES[currentScene].sub}
               </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 h-32 px-12 flex items-center justify-between z-50">
        <div className="flex gap-3">
          {SCENES.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-1000 ${
                idx === currentScene ? "w-12 bg-white" : "w-4 bg-white/10"
              }`}
            />
          ))}
        </div>
        
        <motion.button
          whileHover={{ x: 5 }}
          onClick={handleNext}
          className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white font-bold pointer-events-auto"
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </footer>

    </div>
  );
}