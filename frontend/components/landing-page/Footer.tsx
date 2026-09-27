"use client";

import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="contact" className="bg-[#09090b] text-white pt-16 sm:pt-20 pb-12 px-5 sm:px-8 border-t border-zinc-900 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter / Stay Updated Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-14 border-b border-zinc-800/80">
          <div className="max-w-md">
            <h3 className="font-heading text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-zinc-400 font-normal">
              Get the latest updates on AI photo matching, new feature releases, and event tech tips.
            </p>
          </div>

          {/* Subscribe Form */}
          <div className="w-full lg:max-w-md">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-sm text-zinc-300 bg-zinc-900/80 border border-zinc-800 px-4 py-3 rounded-full">
                <Icon name="check_circle" className="text-base text-white fill" />
                <span>Thank you! You are on our VIP dispatch list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/90 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-full pl-5 pr-32 py-3.5 border border-zinc-800 focus:outline-hidden focus:border-zinc-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-all shadow-xs"
                >
                  <span>Subscribe</span>
                  <Icon name="arrow_forward" className="text-xs" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Columns & Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 py-14">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white text-zinc-950 flex items-center justify-center shadow-xs">
                <Icon name="auto_awesome" className="text-base text-zinc-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Glimpse
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed font-normal">
              AI-powered event media platform for photographers, hosts, and guests. Automating photo discovery and real-time delivery with zero friction.
            </p>
            <div className="text-xs text-zinc-500 pt-2 font-normal">
              © {new Date().getFullYear()} Glimpse Technologies Inc. All rights reserved.
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-normal">
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#screenshots" className="hover:text-white transition-colors">
                  App Screens
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="#download" className="hover:text-white transition-colors">
                  Live Wall Slideshow
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-normal">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Press & Media
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">
              Help & Contact
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-normal">
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  Support & FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li className="text-zinc-500 pt-1 text-xs">
                hello@glimpse.app <br />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
