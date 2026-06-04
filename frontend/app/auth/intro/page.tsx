// src/app/auth/intro/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SCENES = [
  {
    type: "text-only",
    text: "Once captures the film of your life through every eye that matters.",
  },
  {
    type: "mixed",
    image: "/images/auth-image.png", // Replace with your showcase graphic
    text: "Host unforgettable events, share digital galleries, and capture live memories.",
  },
  {
    type: "text-only",
    text: "Your seamless guest-sourced event visual accumulator. Raw joy, streamed natively.",
  },
];

export default function IntroPage() {
  const router = useRouter();
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // eslint-disable-next-line react-hooks/immutability
      handleNext();
    }, 8000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-background text-foreground overflow-hidden select-none relative">
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-30">
        <div className="w-5 h-5 relative flex items-center justify-center">
          {/* Using a clean inline SVG Asterisk fallback if your logo image isn't loaded */}
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M12 2l1.88 5.79h6.08l-4.92 3.58 1.88 5.79-4.92-3.58-4.92 3.58 1.88-5.79-4.92-3.58h6.08z"/>
          </svg>
        </div>
        <span className="font-serif text-lg tracking-wide">Glimpse</span>
      </div>

      {/* Invisible Tap/Click wrappers to split navigation screen natively */}
      <div className="absolute inset-0 flex z-10">
        <div className="w-1/2 h-full cursor-w-resize" onClick={handlePrev} />
        <div className="w-1/2 h-full cursor-e-resize" onClick={handleNext} />
      </div>

      {/* SLIDING CONTENT AREA */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center min-h-[50vh] text-center px-4 relative z-20 pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScene}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="w-full flex flex-col items-center justify-center gap-6"
          >
            {/* Condition: Mixed Layout Render */}
            {SCENES[currentScene].type === "mixed" && SCENES[currentScene].image && (
              <div className="w-40 h-40 sm:w-48 sm:h-48 relative mb-2 rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                  src={SCENES[currentScene].image!}
                  alt="Feature Preview"
                  fill
                  className="object-cover p-2"
                  priority
                />
              </div>
            )}

            {/* Typography Engine with tightened leading values */}
            <h1 className="text-5xl md:text-6xl md:text-[54px] font-serif tracking-tight leading-[1.1] max-w-3xl">
              {SCENES[currentScene].text}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 flex items-center gap-6 z-30">
        <div className="flex gap-2">
          {SCENES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentScene ? 1 : -1);
                setCurrentScene(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentScene ? "bg-foreground scale-125" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        {/* <button
          onClick={completeIntro}
          className="text-xs font-sans tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          Skip
        </button> */}
      </div>
    </div>
  );
}