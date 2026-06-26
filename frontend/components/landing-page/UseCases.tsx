"use client";

import React from "react";
import { motion } from "framer-motion";
import { Aperture, Heart, Presentation, Music2 } from "lucide-react";

const UseCases = () => {
  const cases = [
    {
      icon: <Aperture className="w-5 h-5 text-[#78716c]" />,
      title: "Event Photographers",
      desc: "Deliver photos instantly after events. Stop manually sorting and emailing.",
    },
    {
      icon: <Heart className="w-5 h-5 text-[#78716c]" />,
      title: "Weddings",
      desc: "Guests take a selfie and instantly see every candid moment they're in.",
    },
    {
      icon: <Presentation className="w-5 h-5 text-[#78716c]" />,
      title: "Large Conferences",
      desc: "Scale to 10,000+ attendees. Branded galleries and real-time analytics.",
    },
    {
      icon: <Music2 className="w-5 h-5 text-[#78716c]" />,
      title: "Concerts & Festivals",
      desc: "Fans find their crowd shots instantly. Drive social sharing and virality.",
    },
  ];

  return (
    <section className="py-28 md:py-36 px-6 lg:px-10 bg-white">
      <div className="max-w-[82rem] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-[.12em] uppercase text-[#a09890] mb-4"
          >
            Use Cases
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-fh text-4xl md:text-[3.4rem] font-normal tracking-[-.02em] leading-[1.05]"
          >
            Built for <em className="text-[#78716c] not-italic">every event</em>
          </motion.h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map((useCase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              className="gc p-7 group cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#f5f4f2] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                {useCase.icon}
              </div>
              <h3 className="font-fh text-lg font-normal tracking-tight mb-2">{useCase.title}</h3>
              <p className="text-[13px] text-[#78716c] font-light leading-[1.65]">{useCase.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
