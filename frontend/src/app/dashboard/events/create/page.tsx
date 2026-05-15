'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Camera,
  Calendar,
  MapPin,
  Users,
  Lock,
  CheckCircle,
  Sparkle,
  UploadSimple
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CreateEvent() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  return (
    <DashboardShell role="creator">
      <div className="max-w-4xl mx-auto py-6">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
             <Link href="/dashboard/events">
                <Button variant="outline" className="w-10 h-10 p-0 rounded-full border-slate-200">
                   <ArrowLeft size={20} />
                </Button>
             </Link>
             <h1 className="gl-heading-display-md text-[var(--text-primary)]">New Event Gallery</h1>
          </div>

          <div className="flex gap-3">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-700",
                  s <= step ? 'bg-[var(--viola)]' : 'bg-slate-200'
                )}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <Card className="p-10 border-none shadow-sm bg-white space-y-8">
                 <div>
                    <h2 className="text-2xl font-bold text-[var(--ink)] mb-2 flex items-center gap-3">
                       <Sparkle size={32} weight="duotone" className="text-[var(--viola)]" />
                       Basic Information
                    </h2>
                    <p className="text-[var(--text-secondary)]">Give your event a beautiful title and cover image.</p>
                 </div>

                 <div className="space-y-6">
                    <Input label="Event Name" placeholder="e.g. The Sterling Wedding" className="h-14 bg-slate-50" />

                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="gl-label">Date & Time</label>
                          <input type="datetime-local" className="w-full h-14 px-4 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-[var(--viola)]/20 outline-none" />
                       </div>
                       <Input label="Venue / City" placeholder="Royal Palms, Lagos" className="h-14 bg-slate-50" />
                    </div>

                    <div className="space-y-2">
                       <label className="gl-label">Event Category</label>
                       <div className="flex flex-wrap gap-3">
                          {['Wedding', 'Corporate', 'Concert', 'Fashion', 'Gala', 'Other'].map(c => (
                            <button key={c} className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-500 hover:border-[var(--viola)] hover:text-[var(--viola)] transition-all">
                               {c}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </Card>

              <div className="flex justify-end">
                 <Button onClick={handleNext} className="h-14 px-12 text-lg shadow-viola group">
                    Continue <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                 </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <Card className="p-10 border-none shadow-sm bg-white space-y-8">
                 <div>
                    <h2 className="text-2xl font-bold text-[var(--ink)] mb-2 flex items-center gap-3">
                       <Camera size={32} weight="duotone" className="text-[var(--viola)]" />
                       Gallery Branding
                    </h2>
                    <p className="text-[var(--text-secondary)]">Customize how your guests see their photos.</p>
                 </div>

                 <div className="space-y-10">
                    <div className="p-12 border-2 border-dashed border-slate-200 rounded-[32px] text-center group hover:border-[var(--viola)]/50 transition-colors cursor-pointer bg-slate-50/50">
                        <div className="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                           <UploadSimple size={40} className="text-slate-400 group-hover:text-[var(--viola)]" />
                        </div>
                        <p className="text-lg font-bold text-[var(--ink)] mb-2">Upload Hero Banner</p>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto">This image will be the first thing guests see. Recommended size 1600x900px.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <label className="gl-label">Copyright Style</label>
                          <div className="grid grid-cols-2 gap-3">
                             <div className="p-4 rounded-2xl border-2 border-[var(--viola)] bg-[var(--blush)]/20 text-center cursor-pointer">
                                <p className="text-xs font-bold text-[var(--viola)] uppercase tracking-widest">Logo Only</p>
                             </div>
                             <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 text-center cursor-pointer opacity-60">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Text Only</p>
                             </div>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <label className="gl-label">Photo Quality</label>
                          <div className="flex gap-4">
                             <div className="flex items-center gap-2">
                                <input type="radio" name="quality" id="high" className="w-5 h-5 text-[var(--viola)]" defaultChecked />
                                <label htmlFor="high" className="text-sm font-medium">Standard</label>
                             </div>
                             <div className="flex items-center gap-2">
                                <input type="radio" name="quality" id="ultra" className="w-5 h-5 text-[var(--viola)]" />
                                <label htmlFor="ultra" className="text-sm font-medium">Original (4K)</label>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </Card>

              <div className="flex justify-between">
                 <Button variant="ghost" onClick={handleBack} className="h-14 px-8 text-slate-500 font-bold">
                    <ArrowLeft className="mr-2" weight="bold" /> Back
                 </Button>
                 <Button onClick={handleNext} className="h-14 px-12 text-lg shadow-viola group">
                    Continue <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                 </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <Card className="p-12 border-none shadow-photo bg-white text-center">
                 <div className="w-24 h-24 bg-[var(--aperture-teal)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={56} weight="fill" className="text-[var(--aperture-teal)]" />
                 </div>
                 <h2 className="gl-heading-display-md mb-4 text-[var(--ink)]">Everything looks perfect.</h2>
                 <p className="text-[var(--slate-600)] text-lg mb-12 max-w-md mx-auto">
                    Your event gallery is configured. Would you like to start uploading photos now?
                 </p>

                 <div className="grid gap-4 max-w-md mx-auto">
                    <Link href="/dashboard/uploads">
                       <Button fullWidth className="h-16 text-xl shadow-viola">
                          Start Uploading Photos <ArrowRight className="ml-2" weight="bold" />
                       </Button>
                    </Link>
                    <Link href="/dashboard/events">
                       <Button variant="outline" fullWidth className="h-14 text-base border-slate-200">
                          Go to My Events
                       </Button>
                    </Link>
                 </div>
              </Card>

              {/* Summary Summary */}
              <div className="grid md:grid-cols-3 gap-6 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                 <Card className="p-6 border-none bg-slate-50 flex items-center gap-4">
                    <Calendar size={24} weight="duotone" className="text-[var(--viola)]" />
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</p>
                       <p className="text-sm font-bold">Oct 24, 2026</p>
                    </div>
                 </Card>
                 <Card className="p-6 border-none bg-slate-50 flex items-center gap-4">
                    <MapPin size={24} weight="duotone" className="text-[var(--viola)]" />
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Venue</p>
                       <p className="text-sm font-bold">Royal Palms</p>
                    </div>
                 </Card>
                 <Card className="p-6 border-none bg-slate-50 flex items-center gap-4">
                    <Lock size={24} weight="duotone" className="text-[var(--viola)]" />
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Privacy</p>
                       <p className="text-sm font-bold">Public (QR Only)</p>
                    </div>
                 </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
}
