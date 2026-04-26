import React from 'react';
import { Camera, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#113069] font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#faf8ff]/70 backdrop-blur-xl px-6 py-4 flex justify-between items-center border-b border-[#98b1f2]/10">
        <div className="text-2xl font-bold tracking-tight text-[#5148d7]">EventLens</div>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          <a href="#features" className="hover:text-[#5148d7] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#5148d7] transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-[#5148d7] transition-colors">Pricing</a>
          <button className="bg-gradient-to-r from-[#5148d7] to-[#4439cb] text-white px-5 py-2.5 rounded-md font-semibold hover:opacity-90 transition-all shadow-sm">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#e3dfff] text-[#5148d7] text-xs font-bold uppercase tracking-wider">
          AI-Powered Photo Retrieval
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          Upload your event photos.<br />
          Your guests <span className="text-[#5148d7]">find themselves</span> in seconds.
        </h1>
        <p className="text-lg md:text-xl text-[#445d99] max-w-2xl mx-auto mb-10 leading-relaxed">
          The magic moment: a guest scans a QR code, takes a selfie, and sees their face smiling back from dozens of photos instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#5148d7] text-white px-8 py-4 rounded-md text-lg font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
            Create an Event <ArrowRight size={20} />
          </button>
          <button className="bg-white text-[#113069] px-8 py-4 rounded-md text-lg font-bold border border-[#98b1f2]/20 hover:bg-[#eaedff] transition-colors">
            View Live Demo
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-[#eaedff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#98b1f2]/10">
              <div className="w-14 h-14 bg-[#e3dfff] rounded-xl flex items-center justify-center mb-6 text-[#5148d7]">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Retrieval</h3>
              <p className="text-[#445d99] leading-relaxed">
                No more scrolling through 800 photos. AI-powered face search delivers personal galleries in under 3 seconds.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#98b1f2]/10">
              <div className="w-14 h-14 bg-[#e3dfff] rounded-xl flex items-center justify-center mb-6 text-[#5148d7]">
                <Camera size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Photographer Branding</h3>
              <p className="text-[#445d99] leading-relaxed">
                Deliver a premium, white-labeled experience. Your logo, your watermark, your reputation.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#98b1f2]/10">
              <div className="w-14 h-14 bg-[#e3dfff] rounded-xl flex items-center justify-center mb-6 text-[#5148d7]">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Guest Delight</h3>
              <p className="text-[#445d99] leading-relaxed">
                High viral potential. Every guest who finds their photos becomes a fan of your work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">How it Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Upload Bulk", desc: "Drag and drop 1,000+ photos. Our async pipeline handles detection and clustering." },
            { step: "02", title: "Scan & Selfie", desc: "Guests scan a QR code at your event and upload a quick selfie." },
            { step: "03", title: "Magic Delivery", desc: "Guests see a personalized gallery of every photo they are in, instantly." }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="text-8xl font-black text-[#5148d7]/5 absolute -top-10 -left-4">
                {item.step}
              </div>
              <h4 className="text-2xl font-bold mb-4 relative z-10">{item.title}</h4>
              <p className="text-[#445d99] leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[#060e20] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-[#959cb5] mb-16">Built for Nigeria, expanding globally.</p>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-[#113069]/40 p-8 rounded-2xl border border-[#98b1f2]/10 text-left">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">₦0</div>
              <ul className="space-y-4 mb-8 text-[#959cb5]">
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> 1 Event</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> 100 Photos</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> Face Search</li>
              </ul>
              <button className="w-full py-3 rounded-md bg-white/10 hover:bg-white/20 transition-colors font-bold">Start Free</button>
            </div>
            <div className="bg-white p-8 rounded-2xl text-[#113069] text-left scale-105 shadow-2xl relative">
              <div className="absolute -top-4 right-8 bg-[#5148d7] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">Most Popular</div>
              <h3 className="text-xl font-bold mb-2">Per Event</h3>
              <div className="text-4xl font-bold mb-6">₦8,000<span className="text-sm font-normal text-[#445d99]">/event</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> Up to 1,000 photos</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> Priority AI Processing</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> Guest Face Search</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> Custom QR Codes</li>
              </ul>
              <button className="w-full py-3 rounded-md bg-[#5148d7] text-white hover:opacity-90 transition-opacity font-bold">Get Started</button>
            </div>
            <div className="bg-[#113069]/40 p-8 rounded-2xl border border-[#98b1f2]/10 text-left">
              <h3 className="text-xl font-bold mb-2">Pro Monthly</h3>
              <div className="text-4xl font-bold mb-6">₦25,000<span className="text-sm font-normal text-[#959cb5]">/mo</span></div>
              <ul className="space-y-4 mb-8 text-[#959cb5]">
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> Unlimited Events</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> 5,000 photos/event</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-[#5148d7]" /> White-label Gallery</li>
              </ul>
              <button className="w-full py-3 rounded-md bg-white/10 hover:bg-white/20 transition-colors font-bold">Go Pro</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-[#98b1f2]/10 text-center text-[#445d99] text-sm">
        &copy; 2026 EventLens. All rights reserved. Built for the magic moment.
      </footer>
    </div>
  );
}
