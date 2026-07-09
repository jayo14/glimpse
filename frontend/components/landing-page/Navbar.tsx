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
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How it works", href: "#how" },
    { label: "The experience", href: "#product" },
    { label: "For every event", href: "#usecases" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-3 left-1/2 -translate-x-1/2 w-[94%] sm:w-[82%] z-50 rounded-[28px] transition-all duration-500 border",
        isScrolled
          ? "bg-[#f9f8f6]/80 backdrop-blur-2xl border-[#1c1b19]/[.06] shadow-[0_8px_40px_rgba(28,27,25,.08)]"
          : "bg-[#f9f8f6]/55 backdrop-blur-xl border-transparent"
      )}
    >
      <div className="mx-auto px-5 sm:px-7 h-[62px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-[10px] bg-[#1c1b19] flex items-center justify-center">
            <ScanFace className="w-4 h-4 text-white" />
          </span>
          <span className="text-[16px] font-semibold tracking-tight text-[#1c1b19]">Glimpse</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-[#57534e] hover:text-[#1c1b19] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="#waitlist"
            className="btn-primary !py-2.5 !px-5 !text-[13px]"
          >
            Get early access
          </Link>
          <button
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-[10px] bg-[#1c1b19]/[.04] flex items-center justify-center text-[#1c1b19]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#1c1b19]/[.06] px-5 py-3 bg-[#f9f8f6]/95 backdrop-blur-xl rounded-b-[28px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2.5 px-3 rounded-[10px] text-[14px] font-medium text-[#57534e] hover:bg-[#1c1b19]/[.04] hover:text-[#1c1b19]"
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
