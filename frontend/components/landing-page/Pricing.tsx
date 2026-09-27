"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"event" | "annual">("event");

  const plans = [
    {
      name: "Guest & Casual",
      badge: "Free Tier",
      price: "$0",
      period: "forever for event guests",
      description: "Perfect for attending events, finding your photos, and saving memories.",
      highlighted: false,
      features: [
        "Unlimited facial recognition searches",
        "Instant web gallery access (no app needed)",
        "Standard high-definition downloads",
        "Direct sharing to Instagram & WhatsApp",
        "Encrypted biometric privacy protection",
      ],
      ctaText: "Get Started Free",
      ctaLink: "#download",
    },
    {
      name: "Host Pro",
      badge: "Most Popular",
      price: billingCycle === "event" ? "$29" : "$24",
      period: billingCycle === "event" ? "per event" : "per event (billed annually)",
      description: "Everything hosts and wedding planners need for unforgettable guest experiences.",
      highlighted: true,
      features: [
        "Unlimited guests & facial recognition matches",
        "Full-resolution original 4K photo downloads",
        "Real-time Live TV wall & slideshow cast",
        "Custom event branding & printable QR kits",
        "90-day secure cloud archive & zip export",
        "Priority AI facial recognition processing",
        "Guestbook & live toast message feed",
      ],
      ctaText: "Get Started",
      ctaLink: "#download",
    },
    {
      name: "Studio & Agency",
      badge: "Professional",
      price: billingCycle === "event" ? "$79" : "$65",
      period: "per month",
      description: "For professional photographers and event agencies running multiple gigs weekly.",
      highlighted: false,
      features: [
        "Unlimited events and photo uploads",
        "Multi-photographer team workspaces",
        "Direct camera tethering & Lightroom sync",
        "White-label custom domain & email delivery",
        "Permanent raw photo cloud vault",
        "Dedicated account manager & 24/7 SLA",
        "Automated client invoicing & print sales",
      ],
      ctaText: "Contact Sales",
      ctaLink: "#contact",
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with Instrument Serif */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-zinc-950 tracking-tight leading-[1.05] mb-4">
            Flexible Plans for Every User
          </h2>
          <p className="font-sans text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Start free, upgrade anytime. No hidden fees, cancel whenever.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-zinc-200/80 rounded-full mt-6 text-xs font-semibold text-zinc-700 font-sans">
            <button
              type="button"
              onClick={() => setBillingCycle("event")}
              className={cn(
                "px-4 py-1.5 rounded-full transition-all",
                billingCycle === "event"
                  ? "bg-white text-zinc-950 shadow-xs font-bold"
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              Pay Per Event
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5",
                billingCycle === "annual"
                  ? "bg-white text-zinc-950 shadow-xs font-bold"
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              <span>Annual Subscription</span>
              <span className="text-[10px] bg-zinc-900 text-white px-2 py-0.2 rounded-full font-medium">Save 20%</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12 font-sans">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative",
                plan.highlighted
                  ? "bg-zinc-950 text-white shadow-2xl border border-zinc-800 scale-[1.02] lg:-translate-y-2 z-10"
                  : "bg-white text-zinc-950 border border-zinc-200/80 shadow-xs hover:shadow-md"
              )}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "text-xs font-semibold px-3 py-1 rounded-full",
                      plan.highlighted
                        ? "bg-zinc-800 text-zinc-200 border border-zinc-700"
                        : "bg-zinc-100 text-zinc-800 border border-zinc-200"
                    )}
                  >
                    {plan.badge}
                  </span>
                  {plan.highlighted && (
                    <Icon name="auto_awesome" className="text-base text-zinc-300" />
                  )}
                </div>

                {/* Plan Name & Price */}
                <h3 className="font-heading text-3xl font-normal tracking-tight mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      plan.highlighted ? "text-zinc-400" : "text-zinc-500"
                    )}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-xs leading-relaxed mb-8",
                    plan.highlighted ? "text-zinc-400" : "text-zinc-500"
                  )}
                >
                  {plan.description}
                </p>

                {/* Feature List */}
                <div
                  className={cn(
                    "space-y-3 pt-4 border-t border-dashed mb-8",
                    plan.highlighted ? "border-zinc-800" : "border-zinc-200"
                  )}
                >
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs leading-relaxed">
                      <span
                        className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                          plan.highlighted
                            ? "bg-zinc-800 text-white"
                            : "bg-zinc-100 text-zinc-900"
                        )}
                      >
                        <Icon name="check" className="text-[11px]" />
                      </span>
                      <span
                        className={
                          plan.highlighted ? "text-zinc-200" : "text-zinc-700"
                        }
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <Link
                  href={plan.ctaLink}
                  className={cn(
                    "w-full py-3.5 px-6 rounded-full font-semibold text-xs transition-all flex items-center justify-center gap-2",
                    plan.highlighted
                      ? "bg-white text-zinc-950 hover:bg-zinc-100 shadow-md"
                      : "bg-zinc-950 text-white hover:bg-zinc-800 shadow-xs"
                  )}
                >
                  <span>{plan.ctaText}</span>
                  <Icon name="arrow_forward" className="text-xs" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link: Compare All Plans */}
        <div className="text-center font-sans">
          <Link
            href="#faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold transition-all border border-zinc-200"
          >
            <span>Compare All Plan Details</span>
            <Icon name="arrow_forward" className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
