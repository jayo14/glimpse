"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero", active: true },
    { label: "Features", href: "#features" },
    { label: "Screenshots", href: "#screenshots" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-zinc-950 flex items-center justify-center text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
            <Icon name="auto_awesome" className="text-base text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-950 font-sans">
            Glimpse
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-1.5",
                link.active
                  ? "text-zinc-950 font-semibold"
                  : "text-zinc-500 hover:text-zinc-950"
              )}
            >
              {link.active && (
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 inline-block" />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            href="#download"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold tracking-wide transition-all shadow-xs group"
          >
            <span>Download App</span>
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <Icon name="arrow_forward" className="text-xs text-white" />
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-800 hover:bg-zinc-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "close" : "menu"} className="text-lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-5 pt-3 pb-5 bg-white/98 backdrop-blur-xl border-b border-zinc-200 shadow-xl space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors",
                link.active
                  ? "bg-zinc-100 text-zinc-950 font-semibold"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.active && (
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
              )}
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="#download"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-950 text-white text-sm font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Download App</span>
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
