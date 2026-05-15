'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Camera,
  Users,
  ArrowRight,
  ArrowLeft,
  Aperture,
  User,
  ShieldCheck,
  Palette,
  UploadSimple
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const rolePaths = {
  creator: '/dashboard/creator',
  host: '/dashboard/event-host',
  guest: '/dashboard/guest',
  admin: '/dashboard/admin',
} as const;

type Role = keyof typeof rolePaths;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>('creator');

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] py-12 flex flex-col relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[var(--viola)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[var(--flash-gold)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="gl-container max-w-5xl flex-1 flex flex-col relative z-10">
        <header className="flex items-center justify-between mb-16">
          <Link href="/" className="gl-wordmark text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--viola)] flex items-center justify-center shadow-viola">
              <Aperture size={24} weight="fill" className="text-white" />
            </div>
            Glimpse
          </Link>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 w-16 rounded-full transition-all duration-700",
                  s <= step ? 'bg-[var(--viola)]' : 'bg-slate-200'
                )}
              />
            ))}
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait" custom={step}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full"
              >
                <div className="text-center mb-12">
                  <p className="gl-label text-[var(--viola)] mb-3">Identity</p>
                  <h1 className="gl-heading-display-lg mb-4">Choose your role</h1>
                  <p className="gl-body-md text-[var(--text-secondary)]">How will you experience the magic of Glimpse?</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                  {[
                    { id: 'creator' as Role, icon: Camera, title: 'Photographer', desc: 'Capture & deliver AI galleries.' },
                    { id: 'host' as Role, icon: Users, title: 'Event Host', desc: 'Manage events & distribution.' },
                    { id: 'guest' as Role, icon: User, title: 'Guest', desc: 'Find yourself in event photos.' },
                    { id: 'admin' as Role, icon: ShieldCheck, title: 'Admin', desc: 'Platform control & monitoring.' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "group relative p-8 rounded-[32px] text-left transition-all duration-500 border-2",
                        role === r.id
                          ? 'border-[var(--viola)] bg-white shadow-photo'
                          : 'border-transparent bg-white/50 hover:bg-white hover:border-slate-200'
                      )}
                    >
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110",
                        role === r.id ? 'bg-[var(--viola)] text-white shadow-viola' : 'bg-slate-100 text-slate-500'
                      )}>
                        <r.icon size={32} weight="duotone" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-[var(--ink)]">{r.title}</h3>
                      <p className="text-sm text-[var(--slate-600)] leading-relaxed">{r.desc}</p>

                      {role === r.id && (
                        <motion.div
                          layoutId="role-check"
                          className="absolute top-6 right-6 text-[var(--viola)]"
                        >
                          <CheckCircle size={28} weight="fill" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button onClick={handleNext} className="h-16 px-16 text-xl group shadow-viola">
                    Continue <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-2xl mx-auto"
              >
                <Card className="p-10 md:p-14 shadow-photo bg-white border-none rounded-[24px]">
                  <div className="mb-12">
                    <p className="gl-label text-[var(--viola)] mb-3">Profile Setup</p>
                    <h2 className="gl-heading-display-md text-[var(--ink)]">
                      {role === 'creator' ? 'Your Studio Identity' :
                       role === 'host' ? 'Organizer Details' :
                       'Tell us about yourself'}
                    </h2>
                    <p className="text-[var(--slate-600)] mt-2">Let&apos;s personalize your Glimpse experience.</p>
                  </div>

                  <div className="space-y-8 mb-12">
                    <Input
                      label={role === 'creator' ? "Studio / Business Name" : "Company / Group Name"}
                      placeholder={role === 'creator' ? "Luxe Moments Studio" : "Grand Galas Inc."}
                      className="h-14 bg-slate-50"
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input label="Phone Number" placeholder="+234 ..." className="h-14 bg-slate-50" />
                      <Input label="Primary City" placeholder="Lagos" className="h-14 bg-slate-50" />
                    </div>
                    {role === 'creator' && (
                      <Input label="Portfolio Link" placeholder="https://..." className="h-14 bg-slate-50" />
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button variant="ghost" onClick={handleBack} className="h-14 px-8 text-slate-500 font-bold">
                      <ArrowLeft className="mr-2" weight="bold" /> Back
                    </Button>
                    <Button onClick={handleNext} className="flex-1 h-14 text-lg shadow-viola">
                      Next Step <ArrowRight className="ml-2" weight="bold" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-2xl mx-auto"
              >
                <Card className="p-10 md:p-14 shadow-photo bg-white border-none rounded-[24px]">
                  <div className="mb-12">
                    <p className="gl-label text-[var(--viola)] mb-3">Branding</p>
                    <h2 className="gl-heading-display-md text-[var(--ink)]">Style & Preferences</h2>
                    <p className="text-[var(--slate-600)] mt-2">Make Glimpse yours with custom branding.</p>
                  </div>

                  <div className="space-y-10 mb-12">
                    <div className="space-y-4">
                       <span className="gl-label">Brand Color</span>
                       <div className="flex flex-wrap gap-4">
                          {['#C2185B', '#8E0038', '#0F0E17', '#1C1B2E', '#00BFA5'].map(c => (
                            <button key={c} className="w-12 h-12 rounded-full border-4 border-white shadow-sm ring-1 ring-slate-100 transition-transform hover:scale-110 active:scale-95" style={{ background: c }} />
                          ))}
                          <button className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-[var(--viola)] hover:text-[var(--viola)] transition-colors">
                             <Palette size={24} />
                          </button>
                       </div>
                    </div>

                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-[24px] text-center group hover:border-[var(--viola)]/50 transition-colors cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--blush)] transition-colors">
                           <UploadSimple size={32} className="text-slate-400 group-hover:text-[var(--viola)]" />
                        </div>
                        <p className="text-sm font-bold text-[var(--ink)] mb-1">Upload Brand Logo</p>
                        <p className="text-xs text-slate-500">PNG or SVG, max 5MB</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="ghost" onClick={handleBack} className="h-14 px-8 text-slate-500 font-bold">
                      <ArrowLeft className="mr-2" weight="bold" /> Back
                    </Button>
                    <Button onClick={handleNext} className="flex-1 h-14 text-lg shadow-viola">
                      Complete Setup <ArrowRight className="ml-2" weight="bold" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="w-full max-w-lg mx-auto text-center"
              >
                <div className="relative mb-12">
                   <div className="w-32 h-32 bg-[var(--aperture-teal)]/10 rounded-full flex items-center justify-center mx-auto relative z-10">
                      <CheckCircle size={72} weight="fill" className="text-[var(--aperture-teal)]" />
                   </div>
                   <motion.div
                     animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="absolute inset-0 w-48 h-48 bg-[var(--aperture-teal)]/5 rounded-full blur-2xl -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2"
                   />
                </div>

                <h2 className="gl-heading-display-lg mb-4 text-[var(--ink)]">Welcome to Glimpse</h2>
                <p className="text-[var(--slate-600)] text-xl mb-12 leading-relaxed">
                  Your premium {role} experience is ready. Let&apos;s start creating memories that last forever.
                </p>

                <div className="p-8 bg-[var(--blush)]/50 backdrop-blur-sm rounded-[32px] mb-12 text-left flex items-start gap-5 border border-[var(--viola)]/10">
                  <div className="w-3 h-3 rounded-full bg-[var(--viola)] mt-2.5 animate-pulse shadow-[0_0_8px_var(--viola)]" />
                  <div>
                    <p className="text-base text-[var(--deep-viola)] font-bold italic mb-1">
                      &quot;Your photos are being processed. Magic incoming.&quot;
                    </p>
                    <p className="text-xs text-[var(--viola)]/70 uppercase tracking-widest font-bold">Glimpse AI indexing</p>
                  </div>
                </div>

                <Link href={rolePaths[role]}>
                  <Button fullWidth className="h-16 text-xl shadow-viola group">
                    Enter Dashboard <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
