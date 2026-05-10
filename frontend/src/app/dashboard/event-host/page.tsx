'use client';

import {
  Plus,
  QrCode,
  Users,
  TrendUp,
  ShareNetwork,
  CaretRight,
  Monitor,
  Buildings
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EventHostDashboardPage() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--ink)] mb-2">Event Host Panel</h1>
          <p className="text-[var(--slate-600)]">Monitor guest engagement and brand impact.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 text-lg">
             <Monitor className="mr-2" /> White-label Settings
           </Button>
           <Button className="h-14 px-8 text-lg">
             <Plus className="mr-2" weight="bold" /> New Event
           </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Engagement Card */}
        <Card className="lg:col-span-2 p-8 bg-white border-none shadow-sm relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8">Guest Engagement</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                 <div>
                    <p className="text-sm font-bold text-[var(--slate-400)] uppercase tracking-wider mb-2">Total Guests</p>
                    <p className="text-4xl font-bold text-[var(--ink)]">2,840</p>
                    <div className="flex items-center gap-1 text-green-500 text-sm mt-2 font-bold">
                       <TrendUp /> +12% vs last month
                    </div>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-[var(--slate-400)] uppercase tracking-wider mb-2">Social Shares</p>
                    <p className="text-4xl font-bold text-[var(--ink)]">1,420</p>
                    <div className="flex items-center gap-1 text-green-500 text-sm mt-2 font-bold">
                       <TrendUp /> +18% engagement
                    </div>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-[var(--slate-400)] uppercase tracking-wider mb-2">Conversion</p>
                    <p className="text-4xl font-bold text-[var(--ink)]">84%</p>
                    <div className="flex items-center gap-1 text-green-500 text-sm mt-2 font-bold">
                       <TrendUp /> High discovery rate
                    </div>
                 </div>
              </div>
           </div>
           {/* Abstract illustration element */}
           <div className="absolute right-[-100px] top-[-100px] w-64 h-64 bg-[var(--viola)]/5 rounded-full blur-[80px]" />
        </Card>

        {/* QR Code Quick Access */}
        <Card className="p-8 bg-[var(--ink)] text-white border-none shadow-photo flex flex-col items-center text-center">
           <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <QrCode size={32} className="text-[var(--flash-gold)]" />
           </div>
           <h3 className="text-xl font-bold mb-4">Event QR Code</h3>
           <p className="text-[#94A3B8] mb-8 text-sm">Download your custom branded QR code for printed materials.</p>
           <div className="bg-white p-4 rounded-2xl mb-8">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=glimpse-event-123" alt="QR Code" />
           </div>
           <Button fullWidth className="h-12 bg-[var(--viola)] hover:bg-[var(--deep-viola)]">
              Download PNG
           </Button>
        </Card>
      </div>

      {/* Brand Profile */}
      <Card className="p-8 bg-white border-none shadow-sm flex flex-col md:flex-row items-center gap-8">
         <div className="w-24 h-24 rounded-3xl bg-[var(--bg-layer-2)] flex items-center justify-center">
            <Buildings size={48} className="text-[var(--viola)]" />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[var(--ink)] mb-2">Corporate Brand Identity</h3>
            <p className="text-[var(--slate-600)]">Your logo and colors are applied to all guest galleries automatically.</p>
         </div>
         <Button variant="outline" className="h-12">Edit Brand Profile</Button>
      </Card>
    </div>
  );
}
