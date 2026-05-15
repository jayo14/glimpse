'use client';

import { motion } from 'framer-motion';
import {
  CreditCard,
  CheckCircle,
  ArrowRight,
  Receipt,
  TrendUp,
  Warning,
  Sparkle
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

export default function BillingPage() {
  return (
    <DashboardShell role="creator">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Billing & Subscription</h1>
            <p className="text-[var(--text-secondary)] mt-1">Manage your plan, payment methods, and invoices.</p>
          </div>
          <Badge variant="face-found" className="h-10 px-4 bg-[var(--aperture-teal)] text-white border-none">
             Pro Plan Active
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Current Plan Card */}
           <Card className="lg:col-span-2 p-10 border-none shadow-photo bg-gradient-to-br from-[var(--ink)] to-[var(--dusk)] text-white relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-12">
                    <div>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--viola)] mb-2">Current Plan</p>
                       <h2 className="text-4xl font-bold mb-2">Pro Monthly</h2>
                       <p className="text-white/60">Billed monthly at <span className="text-white font-bold text-lg italic">₦45,000</span></p>
                    </div>
                    <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10">
                       <Sparkle size={32} weight="fill" className="text-[var(--flash-gold)]" />
                    </div>
                 </div>

                 <div className="grid sm:grid-cols-3 gap-8 mb-12">
                    <div className="space-y-1">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Next Billing</p>
                       <p className="font-bold">Nov 14, 2026</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Active Events</p>
                       <p className="font-bold text-[var(--aperture-teal)]">Unlimited</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Storage Used</p>
                       <p className="font-bold">12.4GB / 500GB</p>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-4">
                    <Button className="h-12 px-8 shadow-viola">Manage Subscription</Button>
                    <Button variant="ghost" className="text-white hover:bg-white/10 h-12 px-8">Switch to Annual (Save 20%)</Button>
                 </div>
              </div>

              {/* Background abstract shape */}
              <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] bg-[var(--viola)] opacity-10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
           </Card>

           {/* Payment Method */}
           <Card className="p-8 border-none shadow-sm bg-white">
              <h3 className="font-bold text-lg text-[var(--ink)] mb-8 flex items-center gap-2">
                 <CreditCard size={24} weight="duotone" className="text-[var(--viola)]" />
                 Payment Method
              </h3>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-8">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-8 rounded bg-[var(--ink)] flex items-center justify-center text-white text-[8px] font-bold tracking-widest">VISA</div>
                    <button className="text-xs font-bold text-[var(--viola)]">Edit</button>
                 </div>
                 <p className="font-mono text-lg text-[var(--ink)] mb-1">•••• •••• •••• 4242</p>
                 <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Expires 12/28</p>
              </div>

              <div className="space-y-4">
                 <Button variant="outline" fullWidth className="h-12 border-slate-200 text-sm font-bold text-slate-600">
                    Add New Method
                 </Button>
              </div>
           </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Usage Metrics */}
           <div className="lg:col-span-2 space-y-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Usage Metrics</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                 {[
                   { label: 'AI Indexing', value: '42,850 faces', usage: 8.5, color: 'var(--viola)' },
                   { label: 'Monthly Traffic', value: '185k requests', usage: 42, color: 'var(--aperture-teal)' },
                 ].map(metric => (
                   <Card key={metric.label} className="p-6 border-none shadow-sm bg-white">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{metric.label}</p>
                      <h4 className="text-xl font-bold text-[var(--ink)] mb-4">{metric.value}</h4>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                         <motion.div
                           initial={{ width: 0 }}
                           animate={{ width: `${metric.usage}%` }}
                           className="h-full rounded-full"
                           style={{ background: metric.color }}
                         />
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{metric.usage}% of limit used</p>
                   </Card>
                 ))}
              </div>
           </div>

           {/* Recent Invoices */}
           <div className="space-y-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Recent Invoices</h3>
              <Card className="p-0 border-none shadow-sm overflow-hidden bg-white">
                 <div className="divide-y divide-slate-50">
                    {[
                      { id: '#INV-8274', date: 'Oct 14, 2026', amount: '₦45,000' },
                      { id: '#INV-8120', date: 'Sep 14, 2026', amount: '₦45,000' },
                      { id: '#INV-7956', date: 'Aug 14, 2026', amount: '₦45,000' },
                    ].map(inv => (
                      <div key={inv.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
                         <div>
                            <p className="text-sm font-bold text-[var(--ink)]">{inv.id}</p>
                            <p className="text-xs text-slate-400">{inv.date}</p>
                         </div>
                         <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-[var(--ink)]">{inv.amount}</span>
                            <Receipt size={20} className="text-slate-300 group-hover:text-[var(--viola)] transition-colors" />
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-4 bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[var(--viola)] transition-colors">
                    View Billing History
                 </button>
              </Card>
           </div>
        </div>
      </div>
    </DashboardShell>
  );
}
