'use client';

import { motion } from 'framer-motion';
import {
  Users,
  MagnifyingGlass,
  Funnel,
  DotsThreeVertical,
  Envelope,
  ChatCircleText,
  UserPlus,
  CheckCircle,
  Clock
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

const guests = [
  { id: 1, name: 'Tunde Afolayan', email: 'tunde@example.com', matchedPhotos: 24, lastActive: '2 hours ago', status: 'Active' },
  { id: 2, name: 'Chioma Okoro', email: 'chioma.o@example.com', matchedPhotos: 42, lastActive: '5 mins ago', status: 'Active' },
  { id: 3, name: 'Zainab Musa', email: 'zainab@example.com', matchedPhotos: 18, lastActive: 'Yesterday', status: 'Inactive' },
  { id: 4, name: 'David Smith', email: 'david.s@example.com', matchedPhotos: 12, lastActive: '3 hours ago', status: 'Active' },
  { id: 5, name: 'Adesua Etomi', email: 'adesua@example.com', matchedPhotos: 56, lastActive: '1 hour ago', status: 'Active' },
];

export default function GuestsManagement() {
  return (
    <DashboardShell role="creator">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Guest Management</h1>
            <p className="text-[var(--text-secondary)] mt-1">Track guest engagement and matched photo delivery.</p>
          </div>
          <Button className="h-12 shadow-viola">
            Invite Guests <UserPlus size={20} weight="bold" className="ml-2" />
          </Button>
        </div>

        <Card className="p-4 border-none shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
           <div className="relative w-full md:w-96 group">
              <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search guests by name or email..."
                className="w-full h-11 pl-12 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[var(--viola)]/20 outline-none"
              />
           </div>
           <Button variant="outline" className="h-11 border-slate-200">
              <Funnel size={20} className="mr-2" /> Filter List
           </Button>
        </Card>

        <Card className="border-none shadow-sm overflow-hidden bg-white">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-slate-100">
                       <th className="px-6 py-5 gl-label text-slate-400">Guest</th>
                       <th className="px-6 py-5 gl-label text-slate-400">Matched Photos</th>
                       <th className="px-6 py-5 gl-label text-slate-400">Last Active</th>
                       <th className="px-6 py-5 gl-label text-slate-400">Status</th>
                       <th className="px-6 py-5 gl-label text-slate-400 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody>
                    {guests.map((guest) => (
                      <tr key={guest.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                                  <img src={`https://i.pravatar.cc/150?u=${guest.email}`} alt="" />
                               </div>
                               <div>
                                  <p className="font-bold text-[var(--text-primary)] group-hover:text-[var(--viola)] transition-colors">{guest.name}</p>
                                  <p className="text-xs text-slate-400 font-medium">{guest.email}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                               <span className="font-bold text-[var(--text-primary)]">{guest.matchedPhotos}</span>
                               <CheckCircle size={16} weight="fill" className="text-[var(--aperture-teal)]" />
                            </div>
                         </td>
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                               <Clock size={16} />
                               {guest.lastActive}
                            </div>
                         </td>
                         <td className="px-6 py-5">
                            <Badge variant={guest.status === 'Active' ? 'face-found' : 'default'}>
                               {guest.status}
                            </Badge>
                         </td>
                         <td className="px-6 py-5 text-right">
                            <div className="flex justify-end gap-2">
                               <button className="p-2 rounded-full hover:bg-white hover:shadow-sm text-slate-400 hover:text-[var(--viola)] transition-all">
                                  <Envelope size={20} />
                               </button>
                               <button className="p-2 rounded-full hover:bg-white hover:shadow-sm text-slate-400 hover:text-[var(--viola)] transition-all">
                                  <DotsThreeVertical size={24} weight="bold" />
                               </button>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
