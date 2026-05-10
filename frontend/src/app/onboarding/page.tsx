'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Camera, Users, ArrowRight, ArrowLeft, Aperture } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const rolePaths = {
  creator: '/dashboard/creator',
  host: '/dashboard/event-host',
} as const;

type Role = keyof typeof rolePaths;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>('creator');

  return (
    <div className="min-h-screen bg-[var(--bg-layer-2)] py-12 flex flex-col">
      <div className="gl-container max-w-4xl flex-1 flex flex-col">
        <header className="flex items-center justify-between mb-12">
          <Link href="/" className="gl-wordmark text-2xl font-bold flex items-center gap-2">
            <Aperture size={24} weight="fill" className="text-[var(--viola)]" />
            Glimpse
          </Link>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-12 rounded-full transition-colors duration-500 ${s <= step ? 'bg-[var(--viola)]' : 'bg-[var(--border-default)]'}`}
              />
            ))}
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="text-center mb-10">
                  <p className="gl-label text-[var(--viola)] mb-3">Get Started</p>
                  <h1 className="gl-heading-display-md mb-4">How will you use Glimpse?</h1>
                  <p className="gl-body-md text-[var(--text-secondary)]">We&apos;ll tailor your experience based on your role.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 mb-10">
                  {[
                    {
                      id: 'creator' as Role,
                      icon: Camera,
                      title: 'Photographer',
                      desc: 'I capture photos and deliver guest galleries.'
                    },
                    {
                      id: 'host' as Role,
                      icon: Users,
                      title: 'Event Host',
                      desc: 'I run events and need branded photo distribution.'
                    },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`group relative p-8 rounded-[24px] text-left transition-all duration-300 border-2 ${
                        role === r.id
                          ? 'border-[var(--viola)] bg-white shadow-viola'
                          : 'border-transparent bg-white hover:border-[var(--viola)]/30'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                        role === r.id ? 'bg-[var(--viola)] text-white' : 'bg-[var(--blush)] text-[var(--viola)]'
                      }`}>
                        <r.icon size={32} weight="duotone" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[var(--ink)]">{r.title}</h3>
                      <p className="text-sm text-[var(--slate-600)] leading-relaxed">{r.desc}</p>

                      {role === r.id && (
                        <div className="absolute top-6 right-6 text-[var(--viola)]">
                          <CheckCircle size={24} weight="fill" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button onClick={() => setStep(2)} className="h-14 px-12 text-lg group">
                    Continue <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
                className="w-full max-w-xl mx-auto"
              >
                <Card className="p-8 md:p-12 shadow-photo bg-white border-none">
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-[var(--ink)] mb-2">Tell us about your business</h2>
                    <p className="text-[var(--slate-600)]">This helps us personalize your dashboard.</p>
                  </div>

                  <div className="space-y-6 mb-10">
                    <Input name="businessName" label="Business name" placeholder="Luxe Moments Studio" className="h-14" />
                    <Input name="phone" label="Phone number" placeholder="+234 ..." className="h-14" />
                    <Input name="city" label="Primary event city" placeholder="Lagos" className="h-14" />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="ghost" onClick={() => setStep(1)} className="h-14 px-8">
                      <ArrowLeft className="mr-2" /> Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1 h-14 text-lg">
                      Continue <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto text-center"
              >
                <div className="w-24 h-24 bg-[var(--aperture-teal)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                   <CheckCircle size={56} weight="fill" className="text-[var(--aperture-teal)]" />
                </div>

                <h2 className="gl-heading-display-md mb-4 text-[var(--ink)]">You&apos;re ready.</h2>
                <p className="text-[var(--slate-600)] text-lg mb-12">
                  Your profile is set up. Let&apos;s start creating magic moments for your guests.
                </p>

                <div className="p-6 bg-[var(--blush)] rounded-2xl mb-12 text-left flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--viola)] mt-2 animate-pulse" />
                  <p className="text-sm text-[var(--deep-viola)] font-medium">
                    <p className="text-sm text-[var(--deep-viola)] font-medium">&quot;Your photos are being processed. Magic incoming.&quot;</p>
                  </p>
                </div>

                <Link href={rolePaths[role]}>
                  <Button fullWidth className="h-14 text-lg">Go to my dashboard</Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
