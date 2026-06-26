"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ScanFace, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "#how" },
    { label: "Features", href: "#product" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-3 left-1/2 -translate-x-1/2 w-[93%] sm:w-[82%] z-50 sq-xl transition-all duration-500 border border-black/[.04]",
        isScrolled
          ? "bg-[#f9f8f6]/88 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,.06)]"
          : "bg-[#f9f8f6]/75 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,.04)]"
      )}
    >
      <div className="max-w-full mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 sq-sm bg-[#1a1a1a] flex items-center justify-center">
            <ScanFace className="w-4 h-4 text-white" />
          </div>
          <span className="text-[16px] font-semibold tracking-tight">Glimpse</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] text-[#78716c] hover:text-[#1a1a1a] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="#waitlist" className="bp !py-2.5 !px-5 !text-[13px] !sq-lg">
            Get Started
          </Link>
          <button
            className="md:hidden w-9 h-9 sq-sm bg-[#f0efed] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-black/[.04] px-5 py-3 space-y-0.5 bg-[#f9f8f6]/95 backdrop-blur-xl rounded-b-[36px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2.5 px-3 sq-sm text-sm text-[#78716c] hover:bg-[#f0efed]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
