"use client";

import { useRef } from "react";
import { Nav } from "./NavHeroStatement";
import { Hero } from "./NavHeroStatement";
import { Statement } from "./NavHeroStatement";
import { Steps, Features, Screens, Stats, Pricing, Quotes, Faq } from "./Sections";
import { Footer } from "./Footer";
import { useLandingMotion } from "@/hooks/useLandingMotion";

export default function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);
  useLandingMotion(rootRef);
  return (
    <div className="gl" ref={rootRef}>
      <Nav />
      <Hero />
      <Statement />
      <Steps />
      <Features />
      <Screens />
      <Stats />
      <Pricing />
      <Quotes />
      <Faq />
      <Footer />
    </div>
  );
}
