'use client';

import { motion } from 'framer-motion';
import {
  QrCode,
  DownloadSimple,
  ShareNetwork,
  Copy,
  Printer,
  Eye,
  CursorClick,
  Monitor,
  Phone,
  Selection
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

export default function QRCodesManagement() {
  return (
    <DashboardShell role="creator">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">QR Distribution</h1>
            <p className="text-[var(--text-secondary)] mt-1">Generate and manage QR codes for your event galleries.</p>
          </div>
          <Button className="h-12 shadow-viola">
            Generate Dynamic QR <QrCode size={20} className="ml-2" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
           {/* Active QR Code Preview */}
           <div className="lg:col-span-2 space-y-8">
              <Card className="p-10 border-none shadow-photo bg-white flex flex-col items-center text-center">
                 <div className="mb-8">
                    <p className="gl-label text-[var(--viola)] mb-3">Live Event</p>
                    <h2 className="text-2xl font-bold text-[var(--ink)]">Sterling Wedding Gallery</h2>
                 </div>

                 <div className="relative group mb-10">
                    <div className="p-6 bg-slate-50 rounded-[32px] border-2 border-slate-100 group-hover:border-[var(--viola)]/30 transition-all duration-500">
                       <div className="bg-white p-6 rounded-2xl shadow-sm">
                          <QrCode size={240} weight="thin" className="text-[var(--ink)]" />
                       </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button className="shadow-lg h-12 px-6">Preview Link</Button>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                    <Button variant="outline" className="h-12 border-slate-200 bg-slate-50/50">
                       <DownloadSimple size={20} className="mr-2" /> SVG
                    </Button>
                    <Button variant="outline" className="h-12 border-slate-200 bg-slate-50/50">
                       <DownloadSimple size={20} className="mr-2" /> PNG
                    </Button>
                    <Button variant="outline" className="h-12 border-slate-200 bg-slate-50/50">
                       <Printer size={20} className="mr-2" /> Print
                    </Button>
                    <Button variant="outline" className="h-12 border-slate-200 bg-slate-50/50">
                       <Copy size={20} className="mr-2" /> Link
                    </Button>
                 </div>
              </Card>

              {/* QR Poster Templates */}
              <div className="space-y-6">
                 <h3 className="text-xl font-bold text-[var(--text-primary)]">Poster Mockups</h3>
                 <div className="grid sm:grid-cols-2 gap-6">
                    {[1, 2].map(i => (
                      <Card key={i} className="aspect-[3/4] border-none shadow-sm relative overflow-hidden group cursor-pointer">
                         <img
                           src={i === 1
                             ? 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop'
                             : 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop'}
                           alt=""
                           className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-8 text-center">
                            <div className="bg-white p-3 rounded-lg mb-4 shadow-xl scale-75 group-hover:scale-100 transition-transform duration-500">
                               <QrCode size={60} />
                            </div>
                            <h4 className="text-white font-bold text-lg mb-1">{i === 1 ? 'Minimalist Slate' : 'Floral Gold'}</h4>
                            <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Template A{i}</p>
                         </div>
                      </Card>
                    ))}
                 </div>
              </div>
           </div>

           {/* Stats & Customization */}
           <div className="space-y-8">
              <Card className="p-8 border-none shadow-sm bg-white space-y-8">
                 <h3 className="font-bold text-lg text-[var(--ink)] flex items-center gap-2">
                    <Selection size={24} weight="duotone" className="text-[var(--viola)]" />
                    Live Scan Metrics
                 </h3>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                       <p className="text-2xl font-bold text-[var(--viola)]">428</p>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Total Scans</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                       <p className="text-2xl font-bold text-[var(--aperture-teal)]">92%</p>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Match Rate</p>
                    </div>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-slate-100">
                    {[
                      { label: 'Smartphone', value: '88%', icon: Phone },
                      { label: 'Tablet', value: '7%', icon: Monitor },
                      { label: 'Other', value: '5%', icon: CursorClick },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between">
                         <div className="flex items-center gap-3 text-[var(--text-secondary)] font-medium">
                            <item.icon size={20} />
                            <span className="text-sm">{item.label}</span>
                         </div>
                         <span className="text-sm font-bold text-[var(--text-primary)]">{item.value}</span>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="p-8 border-none shadow-sm bg-white">
                 <h3 className="font-bold text-lg text-[var(--ink)] mb-6">Customization</h3>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="gl-label">Logo in Center</label>
                       <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-sm font-medium text-slate-600">Enabled</span>
                          <div className="w-10 h-5 rounded-full bg-[var(--viola)] flex justify-end p-0.5">
                             <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="gl-label">QR Style</label>
                       <div className="flex gap-2">
                          {['Round', 'Square', 'Dots'].map(s => (
                            <button key={s} className={cn(
                              "flex-1 h-10 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                              s === 'Round' ? "bg-[var(--ink)] text-white" : "bg-slate-50 text-slate-400 border border-slate-100"
                            )}>
                              {s}
                            </button>
                          ))}
                       </div>
                    </div>
                    <Button fullWidth variant="outline" className="h-12 border-slate-200 mt-4">
                       Save as Default
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </DashboardShell>
  );
}
