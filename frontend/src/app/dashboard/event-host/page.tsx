'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Handshake,
  QrCode,
  ArrowUpRight,
  Plus,
  DotsThreeVertical,
  Briefcase,
  TrendUp,
  Aperture,
  ShareNetwork,
  Palette
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

const hostStats = [
  { label: 'Active Events', value: '12', change: '+3 this month', icon: Calendar, color: 'var(--viola)' },
  { label: 'Guest Engagement', value: '88%', change: '+5.2%', icon: TrendUp, color: 'var(--aperture-teal)' },
  { label: 'Photographer Partners', value: '24', change: '+4 new', icon: Handshake, color: 'var(--flash-gold)' },
  { label: 'Total QR Scans', value: '4.2k', change: '+1.2k', icon: QrCode, color: '#818CF8' },
];

const collaborations = [
  {
    id: 1,
    event: 'The Sterling Wedding',
    photographer: 'Alex Sterling',
    status: 'In Progress',
    delivery: '842/1200 photos',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    event: 'Lagos Fashion Week',
    photographer: 'Moments Studio',
    status: 'Completed',
    delivery: '3100 photos',
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 3,
    event: 'Tech Summit 2026',
    photographer: 'Visionary Capture',
    status: 'Planning',
    delivery: 'Awaiting event',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop'
  },
];

export default function EventHostDashboard() {
  return (
    <DashboardShell role="host">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Event Host Dashboard</h1>
            <p className="text-[var(--text-secondary)] mt-1">Manage your events, team, and photo distribution branding.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-12 border-slate-200">
               Manage Team <Users size={20} className="ml-2" />
             </Button>
             <Button className="h-12 shadow-viola">
               New Event <Plus size={20} weight="bold" className="ml-2" />
             </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hostStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${stat.color}10`, color: stat.color }}>
                    <stat.icon size={28} weight="duotone" />
                  </div>
                  <span className="text-[10px] font-bold text-[var(--aperture-teal)] flex items-center gap-1 uppercase tracking-wider">
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</h3>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Active Collaborations */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Active Collaborations</h2>
                <Button variant="ghost" className="text-sm">View All Partners</Button>
             </div>

             <div className="space-y-4">
                {collaborations.map((collab, i) => (
                  <motion.div
                    key={collab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Card className="p-5 border-none shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:bg-[var(--bg-layer-2)] transition-colors cursor-pointer group">
                       <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={collab.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                             <h3 className="font-bold text-lg text-[var(--text-primary)] truncate">{collab.event}</h3>
                             <Badge variant={collab.status === 'In Progress' ? 'processing' : collab.status === 'Completed' ? 'face-found' : 'default'}>
                                {collab.status}
                             </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-[var(--text-secondary)] font-medium">
                             <span className="flex items-center gap-2"><Briefcase size={16} /> {collab.photographer}</span>
                             <span className="flex items-center gap-2 text-[var(--viola)]"><Aperture size={16} weight="fill" /> {collab.delivery}</span>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <button className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:text-[var(--viola)] transition-colors">
                             <ShareNetwork size={22} weight="bold" />
                          </button>
                          <button className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:text-[var(--viola)] transition-colors">
                             <DotsThreeVertical size={22} weight="bold" />
                          </button>
                       </div>
                    </Card>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* Quick Branding Preview */}
          <div className="space-y-6">
             <h2 className="text-xl font-bold text-[var(--text-primary)]">Gallery Branding</h2>
             <Card className="p-8 border-none bg-white shadow-sm space-y-8">
                <div>
                   <p className="gl-label text-[var(--viola)] mb-4">Live Preview</p>
                   <div className="aspect-[4/3] rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative p-4 flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                         <div className="w-6 h-6 rounded-md bg-[var(--viola)]" />
                         <div className="h-2 w-20 bg-slate-200 rounded-full" />
                      </div>
                      <div className="flex-1 rounded-xl bg-white shadow-sm p-3 space-y-2">
                         <div className="h-2 w-full bg-slate-50 rounded-full" />
                         <div className="h-2 w-3/4 bg-slate-50 rounded-full" />
                         <div className="aspect-video w-full rounded-lg bg-[var(--blush)]/20 mt-4 flex items-center justify-center">
                            <Aperture size={32} weight="fill" className="text-[var(--viola)] opacity-20" />
                         </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
                   </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-slate-100">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Palette size={20} className="text-slate-400" />
                         <span className="text-sm font-bold text-slate-700">Primary Color</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100 bg-[var(--viola)]" />
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <QrCode size={20} className="text-slate-400" />
                         <span className="text-sm font-bold text-slate-700">QR Branding</span>
                      </div>
                      <Badge variant="face-found" className="text-[10px] font-bold py-0.5">Active</Badge>
                   </div>
                </div>

                <Button variant="outline" fullWidth className="h-12 border-slate-200 text-sm font-bold">
                   Customize Appearance
                </Button>
             </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
