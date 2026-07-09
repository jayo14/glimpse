"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "Forever free",
      features: [
        "Up to 100 photos per event",
        "1 event per month",
        "Your guests find themselves instantly",
        "7-day photo hosting",
      ],
      buttonText: "Join the waitlist",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/event",
      subPeriod: "No subscriptions, ever",
      features: [
        "Unlimited photos",
        "Unlimited events",
        "Branded gallery in your colors",
        "30-day hosting & a peek at what lands",
      ],
      buttonText: "Get early access",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Tailored to you",
      features: [
        "Everything in Pro",
        "Your own API & white-label",
        "A real person on your account",
        "Priority support, day or night",
      ],
      buttonText: "Talk to us",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 md:py-36 px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1c1b19]/[.02] rounded-full blur-[80px] pointer-events-none" />
      <div className="shell relative z-10">
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="eyebrow mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-fh text-4xl md:text-[3.4rem] font-normal tracking-[-.02em] leading-[1.05] text-[#1c1b19] mb-4"
          >
            Simple, honest pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-[15px] text-[#57534e] font-light max-w-md mx-auto"
          >
            Pay per event or go unlimited. No hidden fees, no surprise renewals — just your photos, delivered.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-lg bg-[#1c1b19] text-white text-[10px] font-bold tracking-[.08em] uppercase z-10">
                  Most Popular
                </div>
              )}
              <div
                className={cn(
                  "glass-card p-8 text-center h-full flex flex-col",
                  plan.popular ? "!border-[#1c1b19]/[.18] shadow-[0_18px_50px_rgba(28,27,25,0.08)]" : ""
                )}
              >
                <p className="text-[13px] font-semibold text-[#57534e] mb-1">{plan.name}</p>
                <div className="flex items-baseline justify-center gap-0.5 mb-1">
                  <span className="font-fh text-[2.8rem] font-normal tracking-tight leading-none text-[#1c1b19]">
                    {plan.price}
                  </span>
                  {plan.popular && <span className="text-[14px] text-[#57534e]">{plan.period}</span>}
                </div>
                <p className="text-[12px] text-[#57534e] mb-8">{plan.popular ? plan.subPeriod : plan.period}</p>

                <ul className="space-y-3 text-[13px] text-[#57534e] mb-10 text-left flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className={cn("w-4 h-4 mt-0.5 flex-shrink-0", plan.popular ? "text-[#1c1b19]" : "text-[#1c1b19]/40")} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.name === "Enterprise" ? (
                  <button
                    onClick={() => toast.success("We'll be in touch shortly!")}
                    className="w-full py-3.5 rounded-2xl font-semibold text-[14px] transition-colors bg-[#1c1b19]/[.04] text-[#1c1b19] hover:bg-[#1c1b19]/[.08]"
                  >
                    {plan.buttonText}
                  </button>
                ) : (
                  <a
                    href="#waitlist"
                    className={cn(
                      "w-full py-3.5 rounded-2xl font-semibold text-[14px] transition-colors",
                      plan.popular
                        ? "bg-[#1c1b19] text-white hover:bg-[#322f2b]"
                        : "bg-[#1c1b19]/[.04] text-[#1c1b19] hover:bg-[#1c1b19]/[.08]"
                    )}
                  >
                    {plan.buttonText}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
