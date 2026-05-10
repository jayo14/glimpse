'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle } from '@phosphor-icons/react';
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
    <div className="min-h-screen py-8">
      <div className="gl-container space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="gl-section-label">Onboarding</p>
            <h1 className="gl-heading-display-md mt-2">Creator / Event host setup</h1>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">Step {step} of 3</p>
        </div>

        <Card className="p-5 md:p-8">
          {step === 1 ? (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold">Choose your role</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {(['creator', 'host'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`min-h-12 rounded-2xl border p-4 text-left ${
                      role === r ? 'border-[var(--viola)] bg-[var(--blush)]' : 'border-[var(--border-default)]'
                    }`}
                  >
                    <p className="text-lg font-semibold capitalize">{r === 'creator' ? 'Creator' : 'Event host'}</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {r === 'creator'
                        ? 'I capture photos and deliver guest galleries.'
                        : 'I run events and need branded photo distribution.'}
                    </p>
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep(2)} className="w-full md:w-auto">
                Continue
              </Button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Business details</h2>
              <Input name="businessName" label="Business name" placeholder="Luxe Moments Studio" />
              <Input name="phone" label="Phone number" placeholder="+234 ..." />
              <Input name="city" label="Primary event city" placeholder="Lagos" />
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>Continue</Button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <CheckCircle size={52} weight="duotone" className="text-[var(--aperture-teal)]" />
              <h2 className="text-2xl font-bold">You&apos;re ready</h2>
              <p className="text-[var(--text-secondary)]">
                Your photos are being processed. Magic incoming.
              </p>
              <Link href={rolePaths[role]}>
                <Button className="w-full md:w-auto">Go to dashboard</Button>
              </Link>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
