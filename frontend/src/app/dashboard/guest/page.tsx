'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlass,
  DownloadSimple,
  ShareNetwork,
  Heart,
  Eye,
  ArrowLeft,
  X,
  DotsThreeVertical,
  CheckCircle,
  Sparkle,
  Images,
  CaretDown
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const matchedPhotos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop', event: 'Sterling Wedding', confidence: 99 },
  { id: 2, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', event: 'Sterling Wedding', confidence: 98 },
  { id: 3, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', event: 'Sterling Wedding', confidence: 94 },
  { id: 4, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop', event: 'Sterling Wedding', confidence: 92 },
  { id: 5, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', event: 'Sterling Wedding', confidence: 89 },
  { id: 6, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop', event: 'Davido Live', confidence: 97 },
  { id: 7, url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop', event: 'Davido Live', confidence: 85 },
  { id: 8, url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop', event: 'Tech Summit', confidence: 91 },
];

export default function GuestDashboard() {
  const [selectedPhoto, setSelectedPhoto] = useState<{id: number, url: string, event: string, confidence: number} | null>(null);
  const [activeEvent, setActiveEvent] = useState('All Events');

  return (
    <DashboardShell role="guest">
      <div className="space-y-10">
        {/* Hero Section */}
        <section className="relative rounded-[24px] overflow-hidden bg-[var(--ink)] text-white p-8 md:p-16 shadow-photo">
           {/* Background Texture */}
           <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
              <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
           </div>

           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="max-w-xl">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[var(--viola)] flex items-center justify-center">
                       <Sparkle size={20} weight="fill" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-[var(--viola)]">Magic Found</span>
                 </div>
                 <h1 className="gl-heading-display-md mb-4 text-white">We found you in 23 photos.</h1>
                 <p className="text-white/60 text-lg leading-relaxed mb-8">
                    Your moments from <span className="text-white font-bold italic">Sterling Wedding</span> are ready for you to download and share.
                 </p>
                 <div className="flex gap-4">
                    <Button className="h-12 px-8 shadow-viola">Download All</Button>
                    <Link href="/dashboard/guest/search">
                       <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">Search New Event</Button>
                    </Link>
                 </div>
              </div>

              <div className="hidden lg:flex gap-4 relative">
                 {[1, 2].map(i => (
                   <motion.div
                     key={i}
                     initial={{ rotate: i === 1 ? -6 : 6, y: i === 1 ? 20 : -20 }}
                     animate={{ y: i === 1 ? [20, 0, 20] : [-20, 0, -20] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="w-48 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10"
                   >
                      <img src={matchedPhotos[i].url} alt="" className="w-full h-full object-cover" />
                   </motion.div>
                 ))}
                 <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-[var(--aperture-teal)] flex items-center justify-center text-white shadow-lg border-4 border-[var(--ink)] z-20">
                    <CheckCircle size={40} weight="fill" />
                 </div>
              </div>
           </div>
        </section>

        {/* Gallery Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto scrollbar-hide py-1">
              {['All Events', 'Sterling Wedding', 'Davido Live', 'Tech Summit'].map(e => (
                <button
                  key={e}
                  onClick={() => setActiveEvent(e)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                    activeEvent === e ? "bg-white text-[var(--viola)] shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {e}
                </button>
              ))}
           </div>

           <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64 group">
                 <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input type="text" placeholder="Search my photos..." className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border-none text-sm outline-none shadow-sm focus:ring-2 focus:ring-[var(--viola)]/20" />
              </div>
           </div>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-2 md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 space-y-6 md:space-y-0">
           {matchedPhotos.map((photo, i) => (
             <motion.div
               key={photo.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="break-inside-avoid"
             >
                <Card
                  className="border-none shadow-sm hover:shadow-xl transition-all group overflow-hidden bg-white cursor-zoom-in"
                  onClick={() => setSelectedPhoto(photo)}
                >
                   <div className="relative overflow-hidden">
                      <img src={photo.url} alt="" className="w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                         <div className="px-2.5 py-1 rounded-full bg-[var(--aperture-teal)] text-white text-[9px] font-bold shadow-lg flex items-center gap-1">
                            <CheckCircle size={12} weight="fill" /> {photo.confidence}% Match
                         </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                         <div className="flex gap-2">
                            <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-red-500 transition-colors">
                               <Heart size={20} weight="fill" />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-[var(--viola)] transition-colors">
                               <ShareNetwork size={20} weight="bold" />
                            </button>
                         </div>
                         <button className="w-9 h-9 rounded-full bg-white text-[var(--ink)] flex items-center justify-center hover:bg-[var(--viola)] hover:text-white transition-colors shadow-lg">
                            <DownloadSimple size={20} weight="bold" />
                         </button>
                      </div>
                   </div>
                </Card>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Simplified Photo Detail Overlay */}
      <AnimatePresence>
         {selectedPhoto && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] bg-[var(--ink)]/98 backdrop-blur-2xl flex items-center justify-center p-6"
           >
              <button onClick={() => setSelectedPhoto(null)} className="absolute top-8 right-8 text-white/40 hover:text-white p-2">
                 <X size={40} weight="bold" />
              </button>

              <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center">
                 <div className="flex-1 relative group">
                    <motion.img
                      layoutId={`photo-${selectedPhoto.id}`}
                      src={selectedPhoto.url}
                      className="w-full max-h-[80vh] object-contain rounded-3xl shadow-photo"
                    />
                    {/* Watermark simulation */}
                    <div className="absolute bottom-6 right-6 opacity-30 pointer-events-none select-none">
                       <p className="gl-wordmark text-2xl text-white">Glimpse</p>
                    </div>
                 </div>

                 <div className="w-full md:w-80 space-y-8 text-white">
                    <div>
                       <p className="gl-label text-[var(--viola)] mb-2">{selectedPhoto.event}</p>
                       <h3 className="text-3xl font-bold">Found Moment</h3>
                       <div className="flex items-center gap-2 mt-4 text-[var(--aperture-teal)]">
                          <CheckCircle size={24} weight="fill" />
                          <span className="font-bold">AI Match Verified</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <Button fullWidth className="h-14 text-lg shadow-viola">
                          Download Original <DownloadSimple className="ml-2" weight="bold" />
                       </Button>
                       <Button variant="outline" fullWidth className="h-14 border-white/20 text-white hover:bg-white/10">
                          Share Memory <ShareNetwork className="ml-2" />
                       </Button>
                    </div>

                    <div className="pt-8 border-t border-white/10 flex items-center justify-between opacity-60">
                       <div className="flex items-center gap-2">
                          <Heart size={24} className="hover:text-red-500 cursor-pointer transition-colors" />
                          <span className="text-sm font-bold">Add to Favorites</span>
                       </div>
                       <DotsThreeVertical size={24} className="cursor-pointer" />
                    </div>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </DashboardShell>
  );
}
