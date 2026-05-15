'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Palette,
  Bell,
  ShieldCheck,
  Globe,
  CloudArrowUp,
  Aperture,
  Lock,
  Devices,
  SealCheck,
  Gear
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'ai', label: 'AI Preferences', icon: Aperture },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <DashboardShell role="creator">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--border-default)]/60 pb-8">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Settings</h1>
            <p className="text-[var(--text-secondary)] mt-1">Manage your account and platform preferences.</p>
          </div>
          <Button className="h-12 shadow-viola">Save All Changes</Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
           {/* Sidebar Navigation */}
           <aside className="lg:w-64 space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-5 h-14 rounded-2xl transition-all duration-300 font-bold text-sm",
                    activeTab === tab.id
                      ? "bg-white shadow-sm text-[var(--viola)]"
                      : "text-slate-400 hover:text-[var(--text-primary)] hover:bg-white/50"
                  )}
                >
                  <tab.icon size={22} weight={activeTab === tab.id ? 'duotone' : 'regular'} />
                  {tab.label}
                </button>
              ))}
           </aside>

           {/* Content Area */}
           <div className="flex-1 max-w-3xl">
              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                   <section className="space-y-8">
                      <div className="flex items-center gap-8">
                         <div className="relative group">
                            <div className="w-24 h-24 rounded-[32px] bg-slate-100 overflow-hidden border-4 border-white shadow-sm">
                               <img src="https://i.pravatar.cc/150?u=alexsterling" alt="" className="w-full h-full object-cover" />
                            </div>
                            <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[var(--viola)] text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                               <CloudArrowUp size={20} weight="bold" />
                            </button>
                         </div>
                         <div>
                            <h3 className="text-xl font-bold text-[var(--ink)]">Profile Photo</h3>
                            <p className="text-sm text-slate-400 mt-1">This will be displayed on your galleries and studio profile.</p>
                         </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                         <Input label="Full Name" defaultValue="Alex Sterling" className="h-14 bg-white" />
                         <Input label="Public Email" defaultValue="alex@sterlingmoments.com" className="h-14 bg-white" />
                      </div>
                      <Input label="Studio Bio" placeholder="Tell your guests about your photography style..." className="h-14 bg-white" />
                   </section>

                   <div className="h-[1px] bg-slate-100" />

                   <section className="space-y-8">
                      <h3 className="text-xl font-bold text-[var(--ink)]">Social Identity</h3>
                      <div className="space-y-4">
                         <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 group hover:border-[var(--viola)]/30 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[var(--viola)] transition-colors">
                               <Globe size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Portfolio Website</p>
                               <input type="text" defaultValue="sterlingmoments.com" className="w-full bg-transparent border-none text-sm font-bold text-[var(--ink)] focus:ring-0 p-0" />
                            </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 group hover:border-[var(--viola)]/30 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[var(--viola)] transition-colors">
                               <Aperture size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Instagram</p>
                               <input type="text" defaultValue="@sterlingmoments" className="w-full bg-transparent border-none text-sm font-bold text-[var(--ink)] focus:ring-0 p-0" />
                            </div>
                         </div>
                      </div>
                   </section>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                   <section className="space-y-8">
                      <h3 className="text-xl font-bold text-[var(--ink)] flex items-center gap-2">
                         <Lock size={24} weight="duotone" className="text-[var(--viola)]" />
                         Authentication
                      </h3>
                      <div className="space-y-6">
                         <Input label="Current Password" type="password" placeholder="••••••••" className="h-14 bg-white" />
                         <div className="grid md:grid-cols-2 gap-6">
                            <Input label="New Password" type="password" placeholder="••••••••" className="h-14 bg-white" />
                            <Input label="Confirm New Password" type="password" placeholder="••••••••" className="h-14 bg-white" />
                         </div>
                         <Button variant="outline" className="h-12 border-slate-200">Update Password</Button>
                      </div>
                   </section>

                   <div className="h-[1px] bg-slate-100" />

                   <section className="space-y-8">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xl font-bold text-[var(--ink)] flex items-center gap-2">
                            <SealCheck size={24} weight="duotone" className="text-[var(--aperture-teal)]" />
                            Two-Factor Authentication
                         </h3>
                         <Badge variant="face-found" className="bg-emerald-50 text-emerald-600 border-none">Secure</Badge>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                         Add an extra layer of security to your account by requiring more than just a password to log in.
                      </p>
                      <Button variant="outline" className="h-12 border-slate-200 text-red-500 hover:bg-red-50">Deactivate 2FA</Button>
                   </section>

                   <div className="h-[1px] bg-slate-100" />

                   <section className="space-y-8">
                      <h3 className="text-xl font-bold text-[var(--ink)] flex items-center gap-2">
                         <Devices size={24} weight="duotone" className="text-[var(--viola)]" />
                         Active Sessions
                      </h3>
                      <div className="space-y-4">
                         {[
                           { device: 'MacBook Pro 16"', location: 'Lagos, Nigeria', active: 'Current Session' },
                           { device: 'iPhone 15 Pro', location: 'Lagos, Nigeria', active: 'Active 2 hours ago' },
                         ].map((session, i) => (
                           <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Devices size={24} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-[var(--ink)]">{session.device}</p>
                                    <p className="text-xs text-slate-400">{session.location} • {session.active}</p>
                                 </div>
                              </div>
                              {i !== 0 && (
                                <button className="text-xs font-bold text-red-500 hover:underline">Revoke</button>
                              )}
                           </div>
                         ))}
                      </div>
                   </section>
                </motion.div>
              )}

              {['appearance', 'notifications', 'ai'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
                   <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                      <Gear size={40} className="animate-spin" />
                   </div>
                   <h3 className="text-xl font-bold">Refining Preferences</h3>
                   <p className="text-sm max-w-xs">These settings are being optimized for the premium Glimpse experience.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </DashboardShell>
  );
}
