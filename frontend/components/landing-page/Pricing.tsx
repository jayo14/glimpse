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
        "Basic face matching",
        "7-day photo hosting",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/event",
      subPeriod: "No subscriptions",
      features: [
        "Unlimited photos",
        "Unlimited events",
        "Premium face matching",
        "Branded gallery page",
        "30-day hosting & analytics",
      ],
      buttonText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Tailored to you",
      features: [
        "Everything in Pro",
        "API access",
        "White-label solution",
        "Dedicated account manager",
        "SLA & priority support",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 md:py-36 px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1a1a1a]/[.01] rounded-full blur-[80px] pointer-events-none" />
      <div className="max-w-[82rem] mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-[.12em] uppercase text-[#a09890] mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-fh text-4xl md:text-[3.4rem] font-normal tracking-[-.02em] leading-[1.05] mb-4"
          >
            Simple, <em className="text-[#78716c] not-italic">transparent</em> pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[15px] text-[#78716c] font-light max-w-md mx-auto"
          >
            No hidden fees. Pay per event or go unlimited.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-lg bg-[#1a1a1a] text-white text-[10px] font-bold tracking-[.08em] uppercase z-10">
                  Most Popular
                </div>
              )}
              <div
                className={cn(
                  "gc p-8 text-center h-full flex flex-col",
                  plan.popular ? "!border-black/12 !bg-white shadow-lg shadow-black/[.04]" : ""
                )}
              >
                <p className="text-[13px] font-semibold text-[#a09890] mb-1">{plan.name}</p>
                <div className="flex items-baseline justify-center gap-0.5 mb-1">
                  <span className="font-fh text-[2.8rem] font-normal tracking-tight leading-none">
                    {plan.price}
                  </span>
                  {plan.popular && <span className="text-[14px] text-[#a09890]">{plan.period}</span>}
                </div>
                <p className="text-[12px] text-[#a09890] mb-8">{plan.popular ? plan.subPeriod : plan.period}</p>

                <ul className="space-y-3 text-[13px] text-[#78716c] mb-10 text-left flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className={cn("w-4 h-4 mt-0.5 flex-shrink-0", plan.popular ? "text-[#1a1a1a]/50" : "text-[#1a1a1a]/30")} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => toast.success(`${plan.buttonText} initiated!`)}
                  className={cn(
                    "w-full py-3.5 rounded-2xl font-semibold text-[14px] transition-colors",
                    plan.popular
                      ? "bg-[#1a1a1a] text-white hover:bg-[#333]"
                      : "bg-[#f5f4f2] text-[#1a1a1a] hover:bg-[#eceae7]"
                  )}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
