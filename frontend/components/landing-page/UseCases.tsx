"use client";

import React from "react";
import { motion } from "framer-motion";
import { Aperture, Heart, Presentation, Music2 } from "lucide-react";

const UseCases = () => {
  const cases = [
    {
      icon: <Aperture className="w-5 h-5 text-[#57534e]" />,
      title: "Event photographers",
      desc: "Hand every guest their own album without lifting another finger. You shoot — Glimpse delivers. The thank-you messages write themselves.",
    },
    {
      icon: <Heart className="w-5 h-5 text-[#57534e]" />,
      title: "Weddings",
      desc: "Your cousins, your college roommate, your grandmother — each guest gets the photos they're actually in, the moment they want them.",
    },
    {
      icon: <Presentation className="w-5 h-5 text-[#57534e]" />,
      title: "Large conferences",
      desc: "Ten thousand badges, one link. Attendees find their keynote shot and post it before the session ends — and you watch it happen live.",
    },
    {
      icon: <Music2 className="w-5 h-5 text-[#57534e]" />,
      title: "Concerts & festivals",
      desc: "The crowd shot that proves you were there. Fans find themselves in the sea of people and share it before the encore.",
    },
  ];

  return (
    <section id="usecases" className="py-28 md:py-36 px-6 lg:px-10 bg-white">
      <div className="shell">
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="eyebrow mb-4"
          >
            For every event
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-fh text-4xl md:text-[3.4rem] font-normal tracking-[-.02em] leading-[1.05] text-[#1c1b19]"
          >
            Wherever people gather, that&rsquo;s where the photos matter
          </motion.h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map((useCase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="glass-card p-7 group cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#1c1b19]/[.04] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                {useCase.icon}
              </div>
              <h3 className="font-fh text-lg font-normal tracking-tight mb-2 text-[#1c1b19]">{useCase.title}</h3>
              <p className="text-[13px] text-[#57534e] font-light leading-[1.65]">{useCase.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
