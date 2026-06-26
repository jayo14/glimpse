"use client";

import React from "react";
import { motion } from "framer-motion";
import { UploadCloud, BrainCircuit, Camera } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <UploadCloud className="w-5 h-5 text-[#78716c]" />,
      title: "Host Uploads",
      desc: "Bulk event photos are ingested into the platform. Upload thousands of images in minutes — our system handles the rest.",
      num: "01",
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-[#78716c]" />,
      title: "AI Face-Matching",
      desc: "Our AI instantly indexes every face across all photos, building a comprehensive face map with 99.2% accuracy.",
      num: "02",
    },
    {
      icon: <Camera className="w-5 h-5 text-[#78716c]" />,
      title: "Selfie to Find",
      desc: "Attendees upload a single selfie to instantly retrieve every photo they appear in. No accounts, no friction.",
      num: "03",
    },
  ];

  return (
    <section id="how" className="py-28 md:py-36 px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-[#1a1a1a]/[.01] rounded-full blur-[80px] pointer-events-none" />
      <div className="max-w-[82rem] mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-[.12em] uppercase text-[#a09890] mb-4"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-fh text-4xl md:text-[3.4rem] font-normal tracking-[-.02em] leading-[1.05]"
          >
            Three simple steps
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -50 : idx === 2 ? 50 : 0, y: idx === 1 ? 40 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="gc p-8 md:p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#f5f4f2] flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="font-fh text-13px font-semibold text-black/15">{step.num}</span>
              </div>
              <h3 className="font-fh text-xl font-normal tracking-tight mb-3">{step.title}</h3>
              <p className="text-[14px] text-[#78716c] font-light leading-[1.7]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
