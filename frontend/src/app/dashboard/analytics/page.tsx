'use client';

import { motion } from 'framer-motion';
import {
  ChartLineUp,
  Users,
  Images,
  CurrencyNgn,
  Eye,
  DownloadSimple,
  Calendar,
  CaretDown,
  ArrowUpRight,
  ArrowDownRight
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total Revenue', value: '₦1,240,000', trend: '+14.2%', up: true, icon: CurrencyNgn },
  { label: 'Gallery Visits', value: '42,850', trend: '+28.5%', up: true, icon: Eye },
  { label: 'Photo Downloads', value: '12,400', trend: '-2.4%', up: false, icon: DownloadSimple },
  { label: 'Avg. Matches/Guest', value: '18.4', trend: '+5.1%', up: true, icon: Users },
];

export default function AnalyticsDashboard() {
  return (
    <DashboardShell role="creator">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Performance Insights</h1>
            <p className="text-[var(--text-secondary)] mt-1">Detailed metrics for your photography business.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-12 border-slate-200 bg-white">
                <Calendar size={20} className="mr-2" /> Last 30 Days <CaretDown size={16} className="ml-2" />
             </Button>
             <Button className="h-12 shadow-viola">
                Download Report <DownloadSimple size={20} className="ml-2" />
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
              <Card className="p-6 border-none shadow-sm group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[var(--viola)] group-hover:bg-[var(--blush)] transition-all">
                    <stat.icon size={28} weight="duotone" />
                  </div>
                  <Badge className={cn(
                    "text-[10px] font-bold border-none",
                    stat.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    {stat.up ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</h3>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Preview */}
        <div className="grid lg:grid-cols-3 gap-8">
           <Card className="lg:col-span-2 p-8 border-none shadow-sm min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">Revenue Growth</h3>
                    <p className="text-xs text-slate-400">Daily earnings over the last 30 days</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-md bg-[var(--viola)] text-white text-xs font-bold">Line</button>
                    <button className="px-3 py-1 rounded-md bg-slate-100 text-slate-500 text-xs font-bold">Bar</button>
                 </div>
              </div>

              <div className="flex-1 flex items-end gap-2 px-4">
                 {[40, 60, 45, 80, 55, 90, 70, 100, 85, 60, 40, 50, 75, 95, 110, 80, 65, 45, 70, 90, 105, 120, 100, 85, 110, 130, 115, 140, 150, 160].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h * 0.5}%` }}
                      transition={{ delay: 0.5 + i * 0.02, duration: 1 }}
                      className="flex-1 bg-gradient-to-t from-[var(--viola)]/10 to-[var(--viola)]/40 rounded-t-sm relative group"
                    >
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--ink)] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          ₦{(h * 1000).toLocaleString()}
                       </div>
                    </motion.div>
                 ))}
              </div>
              <div className="pt-4 flex justify-between text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                 <span>Oct 1</span>
                 <span>Oct 15</span>
                 <span>Oct 30</span>
              </div>
           </Card>

           <Card className="p-8 border-none shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-8">Traffic Sources</h3>
              <div className="flex-1 flex flex-col justify-center gap-6">
                 {[
                   { label: 'QR Scan', value: '74%', color: 'var(--viola)' },
                   { label: 'Direct Link', value: '18%', color: 'var(--flash-gold)' },
                   { label: 'Social Media', value: '8%', color: 'var(--aperture-teal)' },
                 ].map(source => (
                   <div key={source.label} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                         <span className="text-slate-600">{source.label}</span>
                         <span className="text-[var(--text-primary)]">{source.value}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                         <motion.div
                           initial={{ width: 0 }}
                           animate={{ width: source.value }}
                           className="h-full rounded-full"
                           style={{ background: source.color }}
                         />
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                 <p className="text-xs text-slate-400 leading-relaxed">
                    Most guests scan QR codes within the first <span className="text-[var(--viola)] font-bold">2 hours</span> of the event starting.
                 </p>
              </div>
           </Card>
        </div>

        {/* Top Performing Events */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-[var(--text-primary)]">Event Engagement Ranking</h2>
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="p-6 border-none shadow-sm flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[var(--viola)] text-xl italic">
                      #{i}
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[var(--text-primary)] truncate">
                         {i === 1 ? 'Sterling Wedding' : i === 2 ? 'Lagos Fashion Week' : 'Tech Summit 2026'}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium">1,240 matches • 94% retention</p>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-bold text-[var(--aperture-teal)]">+12%</p>
                   </div>
                </Card>
              ))}
           </div>
        </div>
      </div>
    </DashboardShell>
  );
}
