'use client';

import { motion } from 'framer-motion';
import {
  CurrencyNgn,
  Users,
  Images,
  Calendar,
  ArrowUpRight,
  Plus,
  DotsThreeVertical,
  Clock,
  CheckCircle,
  ChartLineUp,
  Aperture
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

const stats = [
  { label: 'Total Revenue', value: '₦1.2M', change: '+12.5%', icon: CurrencyNgn, color: 'var(--viola)' },
  { label: 'Active Events', value: '8', change: '+2 new', icon: Calendar, color: 'var(--aperture-teal)' },
  { label: 'Photos Uploaded', value: '12.4k', change: '+850', icon: Images, color: 'var(--flash-gold)' },
  { label: 'Guest Matches', value: '4.2k', change: '+94%', icon: Users, color: '#818CF8' },
];

const recentEvents = [
  {
    id: 1,
    name: 'Sterling Wedding',
    date: 'Oct 24, 2026',
    status: 'Live',
    photos: 842,
    guests: 156,
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Tech Summit 2026',
    date: 'Oct 20, 2026',
    status: 'Processing',
    photos: 1250,
    guests: 420,
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Lagos Fashion Week',
    date: 'Oct 15, 2026',
    status: 'Completed',
    photos: 3100,
    guests: 890,
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop'
  },
];

export default function CreatorDashboard() {
  return (
    <DashboardShell role="creator">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Photographer Dashboard</h1>
            <p className="text-[var(--text-secondary)] mt-1">Welcome back, your events are performing well.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-12 border-slate-200">
               View Analytics <ChartLineUp size={20} className="ml-2" />
             </Button>
             <Button className="h-12 shadow-viola">
               Create Event <Plus size={20} weight="bold" className="ml-2" />
             </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
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
                  <span className="text-xs font-bold text-[var(--aperture-teal)] flex items-center gap-1">
                    {stat.change} <ArrowUpRight size={14} />
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</h3>

                {/* Decorative curve */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 opacity-5 pointer-events-none">
                   <stat.icon size={96} weight="duotone" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Recent Events */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Recent Events</h2>
                <Button variant="ghost" className="text-sm">View All</Button>
             </div>

             <div className="space-y-4">
                {recentEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Card className="p-4 border-none shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:bg-[var(--bg-layer-2)] transition-colors cursor-pointer group">
                       <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={event.img} alt={event.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       </div>
                       <div className="flex-1 min-w-0 py-2">
                          <div className="flex items-center gap-3 mb-1">
                             <h3 className="font-bold text-lg text-[var(--text-primary)] truncate">{event.name}</h3>
                             <Badge variant={event.status === 'Live' ? 'event-live' : event.status === 'Processing' ? 'processing' : 'default'}>
                                {event.status}
                             </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-[var(--text-secondary)]">
                             <span className="flex items-center gap-1.5"><Calendar size={16} /> {event.date}</span>
                             <span className="flex items-center gap-1.5"><Images size={16} /> {event.photos} photos</span>
                             <span className="flex items-center gap-1.5"><Users size={16} /> {event.guests} guests</span>
                          </div>
                       </div>
                       <div className="flex sm:flex-col gap-2">
                          <button className="p-2 rounded-full hover:bg-white transition-colors text-[var(--text-secondary)]">
                             <DotsThreeVertical size={24} weight="bold" />
                          </button>
                       </div>
                    </Card>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* AI Processing Status */}
          <div className="space-y-6">
             <h2 className="text-xl font-bold text-[var(--text-primary)]">AI Processing</h2>
             <Card className="p-8 border-none bg-gradient-to-br from-[var(--ink)] to-[var(--dusk)] text-white relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                         <Clock size={28} weight="duotone" className="text-[var(--viola)]" />
                      </div>
                      <div>
                         <p className="text-xs uppercase tracking-widest font-bold opacity-60">System Status</p>
                         <p className="text-sm font-bold text-[var(--aperture-teal)] flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[var(--aperture-teal)] animate-pulse" />
                            All systems operational
                         </p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                         <div className="flex justify-between text-sm">
                            <span className="font-medium opacity-80">Tech Summit Indexing</span>
                            <span className="font-bold">64%</span>
                         </div>
                         <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                               initial={{ width: 0 }}
                               animate={{ width: '64%' }}
                               transition={{ duration: 1.5, ease: "easeOut" }}
                               className="h-full bg-gradient-to-r from-[var(--viola)] to-[var(--flash-gold)]"
                            />
                         </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-center">
                         <div className="p-4 rounded-2xl bg-white/5">
                            <p className="text-2xl font-bold mb-0.5">2.4s</p>
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Match Time</p>
                         </div>
                         <div className="p-4 rounded-2xl bg-white/5">
                            <p className="text-2xl font-bold mb-0.5">99.8%</p>
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Accuracy</p>
                         </div>
                      </div>
                   </div>

                   <Button variant="outline" fullWidth className="mt-8 border-white/20 text-white hover:bg-white/10 h-12">
                      View System Logs
                   </Button>
                </div>

                {/* Background Aperture */}
                <Aperture size={200} weight="fill" className="absolute -bottom-16 -right-16 text-white/5" />
             </Card>

             {/* Quick Tip */}
             <Card className="p-6 border-none bg-[var(--blush)]/30 border-l-4 border-[var(--viola)]">
                <div className="flex gap-4">
                   <CheckCircle size={24} weight="fill" className="text-[var(--viola)] flex-shrink-0" />
                   <div>
                      <h4 className="font-bold text-[var(--ink)] mb-1">Photographer Tip</h4>
                      <p className="text-sm text-[var(--slate-600)] leading-relaxed">
                        High-contrast portraits indexed 20% faster. Try using the Glimpse light profile for best results.
                      </p>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
