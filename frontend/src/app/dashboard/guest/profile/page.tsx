'use client';

import { motion } from 'framer-motion';
import {
  User,
  Images,
  Heart,
  Calendar,
  DownloadSimple,
  ShareNetwork,
  Gear,
  ShieldCheck,
  SignOut,
  ArrowRight,
  DotsThreeVertical,
  CheckCircle,
  Aperture,
  Eye
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

const savedGalleries = [
  { id: 1, name: 'Sterling Wedding', date: 'Oct 24, 2026', photos: 23, img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Davido Live Concert', date: 'Oct 05, 2026', photos: 42, img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Tech Summit 2026', date: 'Oct 20, 2026', photos: 8, img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop' },
];

export default function GuestProfile() {
  return (
    <DashboardShell role="guest">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Profile Header */}
        <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
           <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[24px] bg-slate-100 overflow-hidden border-4 border-white shadow-photo">
                 <img src="https://i.pravatar.cc/300?u=guest-user" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[var(--aperture-teal)] text-white shadow-lg flex items-center justify-center border-2 border-white">
                 <CheckCircle size={24} weight="fill" />
              </div>
           </div>
           <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                 <h1 className="gl-heading-display-md text-[var(--text-primary)]">Tunde Afolayan</h1>
                 <Badge variant="face-found" className="w-fit mx-auto md:mx-0">Premium Guest</Badge>
              </div>
              <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-xl">
                Lover of memories, weddings, and high-energy concerts. Always found in the front row.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                 <Button variant="outline" className="h-11 border-slate-200">
                    Edit Profile <Gear size={18} className="ml-2" />
                 </Button>
                 <Button variant="ghost" className="h-11 text-slate-500 font-bold hover:text-red-500">
                    Logout <SignOut size={18} className="ml-2" />
                 </Button>
              </div>
           </div>

           <div className="flex gap-4">
              <Card className="p-6 border-none shadow-sm bg-white text-center min-w-[120px]">
                 <p className="text-2xl font-bold text-[var(--viola)]">73</p>
                 <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Found</p>
              </Card>
              <Card className="p-6 border-none shadow-sm bg-white text-center min-w-[120px]">
                 <p className="text-2xl font-bold text-[var(--aperture-teal)]">12</p>
                 <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Events</p>
              </Card>
           </div>
        </section>

        {/* Content Tabs Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
           {/* Saved Galleries */}
           <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                    <Images size={28} weight="duotone" className="text-[var(--viola)]" />
                    Saved Galleries
                 </h2>
                 <Button variant="ghost" className="text-sm font-bold">View History</Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                 {savedGalleries.map((gallery) => (
                   <motion.div key={gallery.id} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                      <Card className="border-none shadow-sm overflow-hidden bg-white group cursor-pointer">
                         <div className="aspect-video relative overflow-hidden">
                            <img src={gallery.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute top-4 right-4">
                               <div className="px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold shadow-lg">
                                  {gallery.photos} Photos
                               </div>
                            </div>
                         </div>
                         <div className="p-5 flex justify-between items-center">
                            <div>
                               <h3 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--viola)] transition-colors">{gallery.name}</h3>
                               <p className="text-xs text-slate-400 font-medium mt-1">{gallery.date}</p>
                            </div>
                            <button className="p-2 rounded-full hover:bg-slate-50 text-slate-400">
                               <ArrowRight size={20} weight="bold" />
                            </button>
                         </div>
                      </Card>
                   </motion.div>
                 ))}
              </div>
           </div>

           {/* Favorites & Settings */}
           <div className="space-y-10">
              <section className="space-y-6">
                 <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                    <Heart size={24} weight="duotone" className="text-red-500" />
                    Top Favorites
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-square rounded-2xl bg-slate-100 overflow-hidden relative group cursor-pointer shadow-sm">
                         <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?q=80&w=400&auto=format&fit=crop`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye size={24} className="text-white" />
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                    <ShieldCheck size={24} weight="duotone" className="text-[var(--viola)]" />
                    Privacy & AI
                 </h3>
                 <Card className="p-6 border-none shadow-sm bg-white space-y-6">
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold text-slate-700">Facial Recognition</span>
                       <div className="w-10 h-5 rounded-full bg-[var(--aperture-teal)] flex justify-end p-0.5">
                          <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold text-slate-700">Public Profile</span>
                       <div className="w-10 h-5 rounded-full bg-slate-200 flex justify-start p-0.5">
                          <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                       </div>
                    </div>
                    <Button variant="outline" fullWidth className="h-11 border-slate-200 text-xs font-bold">
                       Manage AI Data
                    </Button>
                 </Card>
              </section>
           </div>
        </div>
      </div>
    </DashboardShell>
  );
}
