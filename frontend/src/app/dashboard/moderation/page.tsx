'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  WarningOctagon,
  Eye,
  Trash,
  CheckCircle,
  X,
  Funnel,
  MagnifyingGlass,
  ArrowRight,
  Detective
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

export default function ModerationDashboard() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Content Moderation</h1>
            <p className="text-[var(--text-secondary)] mt-1">Review flagged photos and maintain platform safety standards.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-12 border-slate-200">Moderation Policy</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
           {[
             { label: 'Pending Review', value: '142', color: 'var(--viola)' },
             { label: 'AI Flagged', value: '1,050', color: 'var(--flash-gold)' },
             { label: 'Privacy Complaints', value: '24', color: 'var(--aperture-teal)' },
             { label: 'Actions Today', value: '428', color: '#818CF8' },
           ].map(stat => (
             <Card key={stat.label} className="p-6 border-none shadow-sm text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
             </Card>
           ))}
        </div>

        <Card className="p-4 border-none shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
           <div className="relative w-full md:w-96 group">
              <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search reports or event IDs..."
                className="w-full h-11 pl-12 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[var(--viola)]/20 outline-none"
              />
           </div>
           <div className="flex gap-3">
              <Button variant="outline" className="h-11 border-slate-200">
                 <Funnel size={20} className="mr-2" /> Filter By Type
              </Button>
           </div>
        </Card>

        {/* Gallery-style Moderation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
             <motion.div
               key={i}
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.3 }}
             >
                <Card className="border-none shadow-sm overflow-hidden bg-white group">
                   <div className="aspect-square relative overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 2000000}?q=80&w=600&auto=format&fit=crop`} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                         <Badge className="bg-red-500 text-white border-none text-[10px] font-bold">
                            Flagged
                         </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                         <button className="w-12 h-12 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                            <CheckCircle size={28} weight="bold" />
                         </button>
                         <button className="w-12 h-12 rounded-full bg-red-500 text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                            <Trash size={28} weight="bold" />
                         </button>
                      </div>
                   </div>
                   <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                         <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">AI Confidence</p>
                         <span className="text-xs font-bold text-red-500">94.2%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-red-500 rounded-full" style={{ width: '94%' }} />
                      </div>
                      <p className="text-[10px] font-medium text-slate-400 leading-relaxed">
                         Reason: Exposure violation / Potential sensitive content detected by SafetyLens.
                      </p>
                   </div>
                </Card>
             </motion.div>
           ))}
        </div>

        <div className="flex justify-center pt-8 pb-12">
           <Button variant="outline" className="h-12 px-12 border-slate-200">Load More Queue</Button>
        </div>
      </div>
    </DashboardShell>
  );
}
