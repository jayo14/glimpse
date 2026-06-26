"use client";

import React from "react";
import Link from "next/link";
import { ScanFace, Send, Camera, User, Globe } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: <Globe className="w-4 h-4" />, href: "#" },
    { icon: <Camera className="w-4 h-4" />, href: "#" },
    { icon: <User className="w-4 h-4" />, href: "#" },
    { icon: <Send className="w-4 h-4" />, href: "#" },
  ];

  return (
    <footer className="bg-[#111111] px-6 lg:px-10 pt-16 md:pt-20 pb-6">
      <div className="max-w-[82rem] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          <div className="lg:pr-6">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center">
                <ScanFace className="w-4 h-4 text-white/60" />
              </div>
              <span className="text-[16px] font-semibold text-white tracking-tight">Glimpse</span>
            </Link>
            <p className="text-[13px] text-white/30 font-light leading-[1.7] mb-6">
              AI-powered face matching for event photography. Let attendees find their moments in seconds.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/[.05] border border-white/[.06] flex items-center justify-center text-white/35 hover:text-white/70 hover:bg-white/[.08] transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[.1em] uppercase text-white/20 mb-5">Company</p>
            <ul className="space-y-3">
              {["Home", "About Us", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/35 hover:text-white/70 text-[13px] transition-all">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[.1em] uppercase text-white/20 mb-5">Product</p>
            <ul className="space-y-3">
              {["How It Works", "Pricing", "API Docs", "Changelog", "Integrations"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/35 hover:text-white/70 text-[13px] transition-all">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[.1em] uppercase text-white/20 mb-5">Newsletter</p>
            <p className="text-[13px] text-white/30 font-light leading-[1.6] mb-5">
              Get product updates and event photography tips. No spam.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-white text-sm outline-none w-full focus:border-white/20 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-white text-[#1a1a1a] rounded-2xl px-4 py-2 text-sm font-semibold hover:bg-white/90 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[.06] pt-8 pb-2 flex flex-col items-center gap-6">
        <span
          className="text-center font-bold text-[clamp(3rem,8vw,5.5rem)] tracking-[-.04em] leading-none text-transparent select-none transition-all"
          style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.25)" }}
        >
          Glimpse
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {["Privacy Policy", "Terms of Service", "GDPR", "Security"].map((item, idx) => (
            <React.Fragment key={item}>
              <Link href="#" className="text-white/35 hover:text-white/70 text-[12px] transition-all">
                {item}
              </Link>
              {idx < 3 && <span className="text-white/10">·</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="text-[12px] text-white/15">© 2025 Glimpse Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
