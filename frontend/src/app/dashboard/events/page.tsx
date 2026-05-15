'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlass,
  Funnel,
  SquaresFour,
  Rows,
  Plus,
  Calendar,
  Users,
  Images,
  DotsThreeVertical,
  QrCode,
  ShareNetwork,
  ChartBar,
  MapPin
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

const events = [
  {
    id: 1,
    name: 'Sterling Wedding',
    date: 'Oct 24, 2026',
    venue: 'Royal Palms, Lagos',
    status: 'Live',
    photos: 842,
    guests: 156,
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Tech Summit 2026',
    date: 'Oct 20, 2026',
    venue: 'Landmark Centre',
    status: 'Processing',
    photos: 1250,
    guests: 420,
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Lagos Fashion Week',
    date: 'Oct 15, 2026',
    venue: 'Federal Palace Hotel',
    status: 'Completed',
    photos: 3100,
    guests: 890,
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Davido Live Concert',
    date: 'Oct 05, 2026',
    venue: 'Eko Energy City',
    status: 'Completed',
    photos: 5600,
    guests: 2400,
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Corporate Gala Dinner',
    date: 'Sep 28, 2026',
    venue: 'Intercontinental Hotel',
    status: 'Completed',
    photos: 420,
    guests: 200,
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Olamide Wedding',
    date: 'Sep 20, 2026',
    venue: 'The Monarch Lagos',
    status: 'Completed',
    photos: 1850,
    guests: 500,
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop'
  },
];

export default function EventsManagement() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <DashboardShell role="creator">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Event Management</h1>
            <p className="text-[var(--text-secondary)] mt-1">Manage, organize, and distribute your event galleries.</p>
          </div>
          <Button className="h-12 shadow-viola">
            Create New Event <Plus size={20} weight="bold" className="ml-2" />
          </Button>
        </div>

        {/* Filters and Controls */}
        <Card className="p-4 border-none shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="relative w-full md:w-96 group">
              <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--viola)] transition-colors" />
              <input
                type="text"
                placeholder="Search by event name or venue..."
                className="w-full h-11 pl-12 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[var(--viola)]/20 transition-all"
              />
           </div>

           <div className="flex items-center gap-3 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none h-11 border-slate-200 text-[var(--text-secondary)]">
                 <Funnel size={20} className="mr-2" /> Filter
              </Button>
              <div className="h-10 w-[1px] bg-slate-200 hidden md:block mx-1" />
              <div className="flex p-1 bg-slate-100 rounded-xl">
                 <button
                   onClick={() => setView('grid')}
                   className={cn(
                     "p-2 rounded-lg transition-all",
                     view === 'grid' ? "bg-white text-[var(--viola)] shadow-sm" : "text-slate-400 hover:text-slate-600"
                   )}
                 >
                   <SquaresFour size={24} weight={view === 'grid' ? "fill" : "regular"} />
                 </button>
                 <button
                   onClick={() => setView('list')}
                   className={cn(
                     "p-2 rounded-lg transition-all",
                     view === 'list' ? "bg-white text-[var(--viola)] shadow-sm" : "text-slate-400 hover:text-slate-600"
                   )}
                 >
                   <Rows size={24} weight={view === 'list' ? "fill" : "regular"} />
                 </button>
              </div>
           </div>
        </Card>

        {/* Content */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-none shadow-sm hover:shadow-xl transition-all group overflow-hidden bg-white">
                   <div className="aspect-[16/10] relative overflow-hidden">
                      <img src={event.img} alt={event.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4">
                         <Badge variant={event.status === 'Live' ? 'event-live' : event.status === 'Processing' ? 'processing' : 'default'} className="bg-white/95 backdrop-blur shadow-lg border-none">
                            {event.status}
                         </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                         <Button className="h-10 px-4 text-xs bg-white text-[var(--ink)] hover:bg-[var(--viola)] hover:text-white border-none shadow-lg">
                            Manage Event
                         </Button>
                         <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-[var(--viola)] transition-colors">
                               <ShareNetwork size={20} weight="bold" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-[var(--viola)] transition-colors">
                               <QrCode size={20} weight="bold" />
                            </button>
                         </div>
                      </div>
                   </div>
                   <div className="p-6">
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--viola)] transition-colors line-clamp-1">{event.name}</h3>
                      <div className="space-y-3 mb-6">
                         <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <Calendar size={18} className="text-[var(--viola)]" />
                            <span>{event.date}</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <MapPin size={18} className="text-[var(--viola)]" />
                            <span className="truncate">{event.venue}</span>
                         </div>
                      </div>
                      <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                         <div className="flex -space-x-2">
                            {[1, 2, 3].map(j => (
                              <div key={j} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                                 <img src={`https://i.pravatar.cc/100?u=${event.id}-${j}`} alt="Avatar" />
                              </div>
                            ))}
                            <div className="w-7 h-7 rounded-full border-2 border-white bg-[var(--blush)] flex items-center justify-center text-[10px] font-bold text-[var(--viola)]">
                               +{event.guests}
                            </div>
                         </div>
                         <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Images size={16} /> {event.photos}</span>
                            <span className="flex items-center gap-1.5"><ChartBar size={16} /> Stats</span>
                         </div>
                      </div>
                   </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="border-none shadow-sm overflow-hidden bg-white">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-slate-100">
                         <th className="px-6 py-5 gl-label text-slate-400">Event</th>
                         <th className="px-6 py-5 gl-label text-slate-400">Status</th>
                         <th className="px-6 py-5 gl-label text-slate-400">Date & Venue</th>
                         <th className="px-6 py-5 gl-label text-slate-400 text-center">Photos</th>
                         <th className="px-6 py-5 gl-label text-slate-400 text-center">Guests</th>
                         <th className="px-6 py-5 gl-label text-slate-400 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {events.map((event) => (
                        <tr key={event.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                           <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                 <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                    <img src={event.img} alt="" className="w-full h-full object-cover" />
                                 </div>
                                 <span className="font-bold text-[var(--text-primary)] group-hover:text-[var(--viola)] transition-colors">{event.name}</span>
                              </div>
                           </td>
                           <td className="px-6 py-5">
                              <Badge variant={event.status === 'Live' ? 'event-live' : event.status === 'Processing' ? 'processing' : 'default'}>
                                 {event.status}
                              </Badge>
                           </td>
                           <td className="px-6 py-5">
                              <div className="text-sm">
                                 <p className="font-medium text-[var(--text-primary)]">{event.date}</p>
                                 <p className="text-slate-400 text-xs">{event.venue}</p>
                              </div>
                           </td>
                           <td className="px-6 py-5 text-center">
                              <span className="text-sm font-bold text-slate-600">{event.photos}</span>
                           </td>
                           <td className="px-6 py-5 text-center">
                              <span className="text-sm font-bold text-slate-600">{event.guests}</span>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <button className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-slate-400 hover:text-[var(--viola)]">
                                 <DotsThreeVertical size={24} weight="bold" />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>
        )}

        {/* Pagination/Load More */}
        <div className="flex justify-center pt-8">
           <Button variant="outline" className="h-12 px-8 border-slate-200">Load More Events</Button>
        </div>
      </div>
    </DashboardShell>
  );
}
