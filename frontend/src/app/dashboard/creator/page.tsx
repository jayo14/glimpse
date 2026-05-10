'use client';

import {
  Plus,
  CloudArrowUp,
  Users,
  DownloadSimple,
  ShareNetwork,
  CaretRight,
  DotsThreeVertical,
  Calendar
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const events = [
  { id: 1, name: 'Lagos Fashion Week 2026', date: 'Oct 24, 2026', photos: 1240, status: 'live', scans: 450, img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Davido & Chioma Wedding', date: 'Sept 12, 2026', photos: 3500, status: 'processing', scans: 1200, img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'TechCabal Moonshot', date: 'Aug 05, 2026', photos: 850, status: 'live', scans: 320, img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop' },
];

export default function CreatorDashboardPage() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--ink)] mb-2">Creator Hub</h1>
          <p className="text-[var(--slate-600)]">Manage your events and track photo engagement.</p>
        </div>
        <Button className="h-14 px-8 text-lg">
          <Plus className="mr-2" weight="bold" /> Create New Event
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Photos', value: '12.4k', icon: CloudArrowUp, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Total Scans', value: '4.8k', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Downloads', value: '2.1k', icon: DownloadSimple, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Social Shares', value: '890', icon: ShareNetwork, color: 'text-pink-500', bg: 'bg-pink-50' },
        ].map((stat, i) => (
          <Card key={i} className="p-6 bg-white border-none shadow-sm flex items-center gap-5">
             <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={28} weight="duotone" />
             </div>
             <div>
                <p className="text-sm font-bold text-[var(--slate-400)] uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-[var(--ink)]">{stat.value}</p>
             </div>
          </Card>
        ))}
      </div>

      {/* Upload Zone */}
      <div className="gl-upload-zone">
         <div className="w-16 h-16 rounded-full bg-[var(--viola)]/10 text-[var(--viola)] flex items-center justify-center mx-auto mb-6">
            <CloudArrowUp size={32} weight="duotone" />
         </div>
         <h3 className="text-xl font-bold mb-2">Bulk Upload Photos</h3>
         <p className="text-[var(--slate-600)] mb-6">Drag and drop high-res images here. Our AI will handle the rest.</p>
         <Button variant="outline" className="h-10 text-sm">Select Files</Button>
      </div>

      {/* Recent Events */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--ink)]">Recent Events</h2>
          <button className="text-[var(--viola)] font-bold text-sm flex items-center gap-1 hover:underline">
            View All <CaretRight />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="group overflow-hidden bg-white border-none shadow-sm hover:shadow-photo transition-all duration-300 flex flex-col">
               <div className="relative aspect-video overflow-hidden">
                  <img src={event.img} alt={event.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-4 left-4">
                     <Badge variant={event.status === 'live' ? 'event-live' : 'processing'}>
                        {event.status === 'live' ? 'Live' : 'Processing'}
                     </Badge>
                  </div>
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <DotsThreeVertical weight="bold" />
                  </button>
               </div>
               <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-[var(--slate-400)] mb-3">
                     <Calendar size={18} />
                     {event.date}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--ink)] group-hover:text-[var(--viola)] transition-colors">{event.name}</h3>

                  <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-default)]/60">
                     <div>
                        <p className="text-[10px] font-bold text-[var(--slate-400)] uppercase">Photos</p>
                        <p className="text-lg font-bold">{event.photos.toLocaleString()}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-[var(--slate-400)] uppercase">Guest Scans</p>
                        <p className="text-lg font-bold">{event.scans.toLocaleString()}</p>
                     </div>
                  </div>
               </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
