'use client';

import { motion } from 'framer-motion';
import {
  Camera,
  Sparkle,
  ShieldCheck,
  ArrowRight,
  Aperture,
  CheckCircle,
  Images,
  MapPin,
  Calendar
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function GuestEventLanding() {
  return (
    <div className="min-h-screen bg-[var(--ink)] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
            alt="Event"
            className="w-full h-full object-cover opacity-40 scale-110 blur-sm animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/60 to-transparent" />
        </div>

        <div className="gl-container relative z-10 text-center max-w-3xl">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
              <div className="flex justify-center mb-8">
                 <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center p-4">
                    <img src="https://i.pravatar.cc/150?u=sterling" alt="Logo" className="w-full h-full object-contain rounded-lg" />
                 </div>
              </div>

              <Badge variant="face-found" className="mb-6 bg-[var(--viola)] text-white border-none px-6 py-2 h-auto text-sm font-bold shadow-lg shadow-[var(--viola)]/20">
                 Exclusive Event Gallery
              </Badge>

              <h1 className="gl-heading-display-lg mb-6 leading-tight">The Sterling Wedding Ceremony</h1>

              <div className="flex flex-wrap justify-center gap-6 text-white/60 mb-12 font-medium">
                 <span className="flex items-center gap-2"><Calendar size={20} weight="duotone" className="text-[var(--viola)]" /> Oct 24, 2026</span>
                 <span className="flex items-center gap-2"><MapPin size={20} weight="duotone" className="text-[var(--viola)]" /> Royal Palms, Lagos</span>
                 <span className="flex items-center gap-2 font-bold text-white"><Aperture size={20} weight="fill" className="text-[var(--flash-gold)]" /> Sterling Moments</span>
              </div>

              <div className="grid gap-4 sm:flex sm:justify-center">
                 <Link href="/dashboard/guest/search">
                    <Button className="h-16 px-12 text-xl shadow-viola group w-full sm:w-auto">
                       Find My Photos <Sparkle className="ml-2 group-hover:rotate-12 transition-transform" weight="fill" />
                    </Button>
                 </Link>
                 <Button variant="outline" className="h-16 px-12 text-xl border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                    Browse All
                 </Button>
              </div>
           </motion.div>
        </div>
      </section>

      {/* AI Explanation */}
      <section className="py-24 bg-[var(--ink)]">
         <div className="gl-container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div className="space-y-8">
                  <h2 className="gl-heading-display-md">How it works</h2>
                  <div className="space-y-10">
                     {[
                       {
                         icon: Camera,
                         title: "Take a quick selfie",
                         desc: "Just a snap to help our AI recognize you among the thousands of memories captured."
                       },
                       {
                         icon: Aperture,
                         title: "AI matching engine",
                         desc: "Glimpse instantly compares your face against every high-res photo in the gallery."
                       },
                       {
                         icon: CheckCircle,
                         title: "Instant discovery",
                         desc: "See every photo you're in, ready to download in 4K quality and share with the world."
                       }
                     ].map((step, i) => (
                       <motion.div
                         key={i}
                         initial={{ opacity: 0, x: -20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: i * 0.2 }}
                         className="flex gap-6"
                       >
                          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[var(--viola)]">
                             <step.icon size={32} weight="duotone" />
                          </div>
                          <div>
                             <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                             <p className="text-white/40 leading-relaxed">{step.desc}</p>
                          </div>
                       </motion.div>
                     ))}
                  </div>
               </div>

               <div className="relative group">
                  <div className="aspect-square rounded-[24px] overflow-hidden shadow-photo">
                     <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" alt="Magic" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-transparent" />
                  </div>

                  {/* Floating Result Cards */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -bottom-6 -right-6 p-4 rounded-3xl bg-white text-[var(--ink)] shadow-2xl flex items-center gap-4 border border-white/20"
                  >
                     <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md ring-2 ring-[var(--viola)]">
                        <img src="https://i.pravatar.cc/100?u=match" alt="" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-[var(--viola)] uppercase tracking-widest">Match Found</p>
                        <p className="font-bold text-sm">✓ High Confidence</p>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* Privacy Messaging */}
      <section className="py-24 border-t border-white/5">
         <div className="gl-container max-w-4xl text-center">
            <ShieldCheck size={56} weight="duotone" className="text-[var(--aperture-teal)] mx-auto mb-8" />
            <h2 className="text-3xl font-bold mb-6">Your privacy is our priority</h2>
            <p className="text-lg text-white/50 leading-relaxed mb-12">
               Glimpse uses your selfie exclusively to find your photos. We never sell your data, and your facial signature is deleted automatically after you leave the gallery. Professional memories, handled with care.
            </p>
            <Button variant="ghost" className="text-white/60 hover:text-white font-bold">Read our Trust Policy <ArrowRight className="ml-2" /></Button>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/20">
         <div className="gl-container flex flex-col md:flex-row items-center justify-between gap-8 text-white/30 text-sm">
            <p>© 2026 Glimpse. All moments preserved.</p>
            <div className="flex gap-8 font-bold uppercase tracking-widest text-[10px]">
               <Link href="#" className="hover:text-white">Privacy</Link>
               <Link href="#" className="hover:text-white">Security</Link>
               <Link href="#" className="hover:text-white">Support</Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
