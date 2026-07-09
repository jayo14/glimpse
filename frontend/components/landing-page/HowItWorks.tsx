"use client";

import React from "react";
import { motion } from "framer-motion";
import { QrCode, Camera, Sparkles } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <QrCode className="w-5 h-5 text-[#57534e]" />,
      title: "The host shares one link",
      desc: "A single QR code at the entrance is all it takes. Guests point their camera, tap, and they're in — no app to install and no account to make.",
      num: "01",
    },
    {
      icon: <Camera className="w-5 h-5 text-[#57534e]" />,
      title: "You take a 10-second selfie",
      desc: "One quick photo of your face is all Glimpse needs. That's the entire setup. Then you go back to enjoying the night.",
      num: "02",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#57534e]" />,
      title: "Your photos find you",
      desc: "From that moment on, every picture you're in lands in your private gallery — live, as the photographer shoots. No searching, no waiting.",
      num: "03",
    },
  ];

  return (
    <section id="how" className="py-28 md:py-36 px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-[#1c1b19]/[.02] rounded-full blur-[80px] pointer-events-none" />
      <div className="shell relative z-10">
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="eyebrow mb-4"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-fh text-4xl md:text-[3.4rem] font-normal tracking-[-.02em] leading-[1.05] text-[#1c1b19]"
          >
            Three steps, and none of them are yours to worry about
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-[16px] font-light text-[#57534e] leading-[1.7] mt-5"
          >
            The host does the setup. You do a selfie. Glimpse handles the rest — and suddenly every photo of you is right where you can see it.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="glass-card p-8 md:p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#1c1b19]/[.04] flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="font-fh text-[1.6rem] font-semibold text-[#1c1b19]/15 leading-none">{step.num}</span>
              </div>
              <h3 className="font-fh text-xl font-normal tracking-tight mb-3 text-[#1c1b19]">{step.title}</h3>
              <p className="text-[14px] text-[#57534e] font-light leading-[1.7]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
