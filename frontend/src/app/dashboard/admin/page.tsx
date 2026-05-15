'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Users,
  Calendar,
  WarningOctagon,
  CurrencyNgn,
  Pulse,
  CloudArrowUp,
  Aperture,
  DotsThreeVertical,
  CaretRight,
  ChartBar,
  Detective,
  CheckCircle,
  X
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

const adminStats = [
  { label: 'Total Platform Users', value: '42.8k', change: '+2.4k', icon: Users, color: 'var(--viola)' },
  { label: 'Total Events Live', value: '1,240', change: '+142', icon: Calendar, color: 'var(--aperture-teal)' },
  { label: 'AI Indexing Success', value: '99.94%', change: 'Stable', icon: ShieldCheck, color: 'var(--flash-gold)' },
  { label: 'Monthly Revenue', value: '₦18.4M', change: '+18.2%', icon: CurrencyNgn, color: '#818CF8' },
];

const healthMetrics = [
  { label: 'Server Load', value: '24%', status: 'Healthy' },
  { label: 'AI Response Time', value: '1.2s', status: 'Healthy' },
  { label: 'Storage Usage', value: '84.2TB', status: 'Warning' },
  { label: 'API Uptime', value: '99.99%', status: 'Healthy' },
];

export default function AdminDashboard() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Platform Overview</h1>
            <p className="text-[var(--text-secondary)] mt-1">Super Admin Control Panel for Glimpse Platform.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-12 border-slate-200">System Logs</Button>
             <Badge variant="processing" className="h-10 px-4">Cluster Mode: Auto-Scale</Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat, i) => (
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
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.change}</span>
                </div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</h3>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
           {/* System Health */}
           <div className="space-y-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                 <Pulse size={24} weight="duotone" className="text-[var(--viola)]" />
                 System Health
              </h2>
              <Card className="p-8 border-none shadow-sm bg-white space-y-6">
                 {healthMetrics.map(metric => (
                   <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between items-center">
                         <span className="text-sm font-medium text-slate-500">{metric.label}</span>
                         <Badge variant={metric.status === 'Healthy' ? 'face-found' : 'default'} className={cn(
                           "text-[9px] font-bold uppercase",
                           metric.status === 'Warning' && "bg-amber-50 text-amber-600"
                         )}>
                            {metric.status}
                         </Badge>
                      </div>
                      <div className="flex justify-between items-end">
                         <span className="text-xl font-bold text-[var(--ink)]">{metric.value}</span>
                         <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                            <div className={cn(
                              "h-full rounded-full",
                              metric.status === 'Healthy' ? "bg-[var(--aperture-teal)]" : "bg-amber-400"
                            )} style={{ width: metric.label === 'Storage Usage' ? '84%' : '24%' }} />
                         </div>
                      </div>
                   </div>
                 ))}
                 <Button variant="outline" fullWidth className="mt-4 border-slate-200">Infrastructure Dashboard</Button>
              </Card>
           </div>

           {/* Moderation Queue */}
           <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <WarningOctagon size={24} weight="duotone" className="text-red-500" />
                    Pending Moderation
                 </h2>
                 <Button variant="ghost" className="text-sm font-bold text-[var(--viola)]">View All Queue</Button>
              </div>

              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <Card key={i} className="p-4 border-none shadow-sm flex items-center gap-6 bg-white hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                         <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 500000}?q=80&w=200&auto=format&fit=crop`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-bold text-[var(--ink)] truncate">Flagged: Copyright Violation</p>
                         <p className="text-xs text-slate-400 font-medium">Reported in <span className="font-bold text-slate-600">Davido Live Concert</span> • 12 mins ago</p>
                         <div className="flex items-center gap-2 mt-2">
                            <Badge className="text-[9px] bg-red-50 text-red-500 border-none">High Severity</Badge>
                            <Badge className="text-[9px] bg-slate-100 text-slate-400 border-none">AI Confirmed</Badge>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center">
                            <CheckCircle size={24} />
                         </button>
                         <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center">
                            <X size={24} weight="bold" />
                         </button>
                      </div>
                   </Card>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </DashboardShell>
  );
}
