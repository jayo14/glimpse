'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlass,
  Funnel,
  ArrowsOut,
  ShareNetwork,
  DownloadSimple,
  Heart,
  Eye,
  Selection,
  CirclesThreePlus,
  ArrowLeft,
  X,
  DotsThreeVertical,
  CheckCircle,
  Copyright
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

const photos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop', tags: ['Reception', 'Dance'], matches: 4 },
  { id: 2, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', tags: ['Ceremony'], matches: 2 },
  { id: 3, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', tags: ['Portrait'], matches: 1 },
  { id: 4, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop', tags: ['Reception'], matches: 6 },
  { id: 5, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', tags: ['Speech'], matches: 3 },
  { id: 6, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop', tags: ['Crowd'], matches: 12 },
  { id: 7, url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop', tags: ['Couple'], matches: 2 },
  { id: 8, url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop', tags: ['Details'], matches: 0 },
];

export default function GalleryManagement() {
  const [selectedPhoto, setSelectedPhoto] = useState<{id: number, url: string, tags: string[], matches: number} | null>(null);
  const [filter, setFilter] = useState('All');

  return (
    <DashboardShell role="creator">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <Button variant="outline" className="w-10 h-10 p-0 rounded-full border-slate-200 lg:hidden">
                <ArrowLeft size={20} />
             </Button>
             <div>
                <h1 className="gl-heading-display-md text-[var(--text-primary)]">Gallery Management</h1>
                <p className="text-[var(--text-secondary)] mt-1">Sterling Wedding — October 24, 2026</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-12 border-slate-200">
                <ShareNetwork size={20} className="mr-2" /> Share Gallery
             </Button>
             <Button className="h-12 shadow-viola">
                <CirclesThreePlus size={20} className="mr-2" /> Add Photos
             </Button>
          </div>
        </div>

        {/* Toolbar */}
        <Card className="p-4 border-none shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide py-1">
              {['All', 'Ceremony', 'Reception', 'Portraits', 'Dance Floor', 'AI Tagged'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                    filter === t ? "bg-[var(--viola)] text-white shadow-viola" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {t}
                </button>
              ))}
           </div>

           <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64 group">
                 <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input type="text" placeholder="Search photos..." className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-50 border-none text-sm outline-none focus:ring-2 focus:ring-[var(--viola)]/20" />
              </div>
              <Button variant="outline" className="h-11 border-slate-200">
                 <Selection size={20} className="mr-2" /> Select
              </Button>
           </div>
        </Card>

        {/* Gallery Grid */}
        <div className="gl-photo-grid">
           {photos.map((photo, i) => (
             <motion.div
               key={photo.id}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="relative aspect-square rounded-[24px] overflow-hidden group cursor-zoom-in"
               onClick={() => setSelectedPhoto(photo)}
             >
                <img src={photo.url} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />

                {/* Overlay UI */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                   <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                         {photo.matches > 0 && (
                           <Badge variant="face-found" className="bg-[var(--aperture-teal)] text-white border-none text-[10px] h-6">
                              {photo.matches} matches
                           </Badge>
                         )}
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-[var(--viola)] transition-all">
                         <Heart size={18} weight="fill" />
                      </button>
                   </div>

                   <div className="flex justify-between items-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex gap-1">
                         {photo.tags.map(tag => (
                           <span key={tag} className="text-[10px] font-bold text-white bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">{tag}</span>
                         ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-white text-[var(--ink)] flex items-center justify-center hover:bg-[var(--viola)] hover:text-white transition-colors">
                           <DownloadSimple size={18} weight="bold" />
                        </button>
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Load More */}
        <div className="flex flex-col items-center gap-4 py-12">
           <p className="text-sm font-medium text-slate-400">Showing 8 of 842 photos</p>
           <Button variant="outline" className="h-12 px-12 border-slate-200 bg-white">Load More Photos</Button>
        </div>
      </div>

      {/* Photo Viewer Modal */}
      <AnimatePresence>
         {selectedPhoto && (
           <>
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-[var(--ink)]/95 backdrop-blur-xl flex flex-col"
             >
                {/* Modal Header */}
                <header className="flex items-center justify-between p-6 md:px-10 border-b border-white/5">
                   <div className="flex items-center gap-6">
                      <button
                        onClick={() => setSelectedPhoto(null)}
                        className="text-white/60 hover:text-white flex items-center gap-2 font-bold transition-colors"
                      >
                         <X size={24} weight="bold" /> Close
                      </button>
                      <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                      <div className="hidden md:block">
                         <p className="text-sm font-bold text-white">DSC_0842.jpg</p>
                         <p className="text-xs text-white/40 uppercase tracking-widest font-bold">2.4MB • 4200 x 2800</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-3">
                      <Button variant="ghost" className="text-white hover:bg-white/10 h-11 px-4">
                         <Copyright size={20} className="mr-2" /> Add Copyright
                      </Button>
                      <Button className="h-11 px-6 shadow-viola">
                         <DownloadSimple size={20} weight="bold" className="mr-2" /> Download
                      </Button>
                      <button className="p-2.5 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
                         <DotsThreeVertical size={24} weight="bold" />
                      </button>
                   </div>
                </header>

                {/* Modal Content */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                   {/* Main Image View */}
                   <div className="flex-1 relative flex items-center justify-center p-6 md:p-12 overflow-hidden">
                      <motion.img
                        layoutId={`photo-${selectedPhoto.id}`}
                        src={selectedPhoto.url}
                        alt=""
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                      />

                      {/* Nav Buttons */}
                      <button className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[var(--ink)] transition-all">
                         <ArrowLeft size={24} weight="bold" />
                      </button>
                      <button className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[var(--ink)] transition-all">
                         <ArrowLeft size={24} weight="bold" className="rotate-180" />
                      </button>
                   </div>

                   {/* AI Info Panel */}
                   <div className="w-full md:w-96 bg-white/5 border-l border-white/5 p-8 overflow-y-auto">
                      <div className="space-y-8">
                         <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                               <CheckCircle size={24} weight="duotone" className="text-[var(--aperture-teal)]" />
                               AI Face Analysis
                            </h3>

                            <div className="space-y-4">
                               <p className="text-sm text-white/60">We found <span className="text-white font-bold">{selectedPhoto.matches} guests</span> in this photo.</p>
                               <div className="grid grid-cols-4 gap-3">
                                  {[1, 2, 3, 4].map(j => (
                                    <div key={j} className="aspect-square rounded-xl overflow-hidden border border-[var(--viola)] shadow-[0_0_10px_rgba(194,24,91,0.3)]">
                                       <img src={`https://i.pravatar.cc/100?u=${j}`} alt="" className="w-full h-full object-cover" />
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>

                         <div className="pt-8 border-t border-white/10">
                            <h3 className="text-white font-bold mb-4">Metadata</h3>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="p-4 rounded-2xl bg-white/5">
                                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1">Exposure</p>
                                  <p className="text-sm font-bold text-white">1/250 • f/2.8</p>
                               </div>
                               <div className="p-4 rounded-2xl bg-white/5">
                                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1">ISO</p>
                                  <p className="text-sm font-bold text-white">400</p>
                               </div>
                            </div>
                         </div>

                         <div className="pt-8 border-t border-white/10">
                            <h3 className="text-white font-bold mb-4">Actions</h3>
                            <div className="space-y-3">
                               <Button variant="outline" fullWidth className="border-white/10 text-white hover:bg-white/10 h-12">
                                  Set as Cover Photo
                               </Button>
                               <Button variant="outline" fullWidth className="border-white/10 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 h-12">
                                  Delete Photo
                               </Button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
           </>
         )}
      </AnimatePresence>
    </DashboardShell>
  );
}
