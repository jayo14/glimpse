'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Handshake,
  Plus,
  DotsThreeVertical,
  Envelope,
  SealCheck,
  ShieldCheck,
  UserPlus,
  Clock,
  ChatCircleText,
  MagnifyingGlass
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

const teamMembers = [
  { id: 1, name: 'Alex Sterling', role: 'Lead Photographer', status: 'Active', email: 'alex@sterling.com', access: 'Editor' },
  { id: 2, name: 'Sarah Jenkins', role: 'Event Manager', status: 'Active', email: 'sarah@glimpse.com', access: 'Admin' },
  { id: 3, name: 'Michael Chen', role: 'Assistant', status: 'Pending', email: 'mike@chen.com', access: 'Viewer' },
  { id: 4, name: 'Olamide Adeyemi', role: 'Content Creator', status: 'Active', email: 'ola@adeyemi.com', access: 'Editor' },
];

export default function TeamCollaboration() {
  return (
    <DashboardShell role="host">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Team & Collaboration</h1>
            <p className="text-[var(--text-secondary)] mt-1">Manage collaborators and photographer partnerships.</p>
          </div>
          <Button className="h-12 shadow-viola">
            Invite Collaborator <UserPlus size={20} weight="bold" className="ml-2" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Team List */}
           <div className="lg:col-span-2 space-y-6">
              <Card className="p-4 border-none shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
                 <div className="relative w-full md:w-80 group">
                    <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search team members..."
                      className="w-full h-11 pl-12 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[var(--viola)]/20 outline-none"
                    />
                 </div>
                 <div className="flex gap-3">
                    <Badge variant="face-found" className="h-9 px-4">4 Members</Badge>
                    <Badge variant="default" className="h-9 px-4">2 Pending</Badge>
                 </div>
              </Card>

              <Card className="border-none shadow-sm overflow-hidden bg-white">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b border-slate-100">
                             <th className="px-6 py-5 gl-label text-slate-400">Member</th>
                             <th className="px-6 py-5 gl-label text-slate-400">Access Level</th>
                             <th className="px-6 py-5 gl-label text-slate-400 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody>
                          {teamMembers.map((member) => (
                            <tr key={member.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className="w-11 h-11 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                                        <img src={`https://i.pravatar.cc/150?u=${member.email}`} alt="" />
                                     </div>
                                     <div>
                                        <div className="flex items-center gap-2">
                                           <p className="font-bold text-[var(--text-primary)]">{member.name}</p>
                                           {member.status === 'Pending' && <Badge className="text-[9px] py-0 px-2 h-4">Pending</Badge>}
                                        </div>
                                        <p className="text-xs text-slate-400 font-medium">{member.role}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-2">
                                     <div className={cn(
                                       "w-8 h-8 rounded-lg flex items-center justify-center",
                                       member.access === 'Admin' ? "bg-[var(--blush)] text-[var(--viola)]" : "bg-slate-100 text-slate-400"
                                     )}>
                                        {member.access === 'Admin' ? <ShieldCheck size={18} weight="duotone" /> : <Users size={18} />}
                                     </div>
                                     <span className="text-sm font-bold text-slate-700">{member.access}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-5 text-right">
                                  <div className="flex justify-end gap-2">
                                     <button className="p-2 rounded-full hover:bg-white hover:shadow-sm text-slate-300 hover:text-[var(--viola)] transition-all">
                                        <Envelope size={20} />
                                     </button>
                                     <button className="p-2 rounded-full hover:bg-white hover:shadow-sm text-slate-300 hover:text-[var(--viola)] transition-all">
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

           {/* Invitation Center */}
           <div className="space-y-8">
              <Card className="p-8 border-none shadow-sm bg-white">
                 <h3 className="font-bold text-lg text-[var(--ink)] mb-6 flex items-center gap-2">
                    <Handshake size={24} weight="duotone" className="text-[var(--viola)]" />
                    Partner Connections
                 </h3>
                 <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                    Connecting with verified photographers allows seamless photo delivery directly to your dashboard.
                 </p>

                 <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                            <SealCheck size={24} weight="fill" className="text-[var(--aperture-teal)]" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[var(--ink)] truncate">Luxe Vision Partner</p>
                            <p className="text-[10px] text-[var(--aperture-teal)] font-bold uppercase tracking-widest">Verified Partner</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <Button variant="outline" fullWidth className="h-12 border-slate-200 mt-8 text-sm font-bold">
                    Browse Partners
                 </Button>
              </Card>

              {/* Activity Feed */}
              <Card className="p-8 border-none shadow-sm bg-[var(--ink)] text-white relative overflow-hidden">
                 <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Clock size={24} weight="duotone" className="text-[var(--viola)]" />
                    Live Activity
                 </h3>
                 <div className="space-y-6 relative z-10">
                    {[
                      { text: 'Alex Sterling started uploading 142 new photos.', time: '2 mins ago' },
                      { text: 'Sarah Jenkins updated the gallery branding.', time: '1 hour ago' },
                      { text: 'New collaborator invitation sent to Michael.', time: '3 hours ago' },
                    ].map((activity, i) => (
                      <div key={i} className="flex gap-4">
                         <div className="w-[2px] bg-gradient-to-b from-[var(--viola)] to-transparent rounded-full flex-shrink-0" />
                         <div>
                            <p className="text-xs text-white leading-relaxed">{activity.text}</p>
                            <p className="text-[10px] text-white/40 mt-1 font-bold">{activity.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[var(--viola)] opacity-10 rounded-full blur-2xl" />
              </Card>
           </div>
        </div>
      </div>
    </DashboardShell>
  );
}
