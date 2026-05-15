'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-white/95 backdrop-blur-xl p-8 md:p-12 shadow-photo border-none rounded-[32px]">
        {!isSubmitted ? (
          <>
            <div className="mb-10">
              <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--viola)] mb-6 hover:opacity-80 transition-opacity">
                <ArrowLeft weight="bold" /> Back to login
              </Link>
              <h2 className="gl-heading-display-md text-[var(--ink)]">Reset Password</h2>
              <p className="text-[var(--slate-600)] mt-2">Enter your email and we&apos;ll send you instructions.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
              <Input
                name="email"
                type="email"
                label="Email Address"
                placeholder="alex@example.com"
                className="h-14 bg-[#F8FAFC]"
                required
              />

              <Button fullWidth className="h-14 text-lg shadow-viola">
                Send Reset Link <PaperPlaneTilt className="ml-2" weight="duotone" />
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-[var(--aperture-teal)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
               <CheckCircle size={48} weight="fill" className="text-[var(--aperture-teal)]" />
            </div>
            <h2 className="gl-heading-display-md text-[var(--ink)] mb-4">Check your email</h2>
            <p className="text-[var(--slate-600)] mb-10 leading-relaxed">
              We&apos;ve sent a password reset link to your email address. Please follow the instructions to reset your password.
            </p>
            <Button variant="outline" fullWidth onClick={() => setIsSubmitted(false)} className="h-14">
              Resend email
            </Button>
            <Link href="/auth/login" className="block mt-8 text-sm font-bold text-[var(--viola)] hover:opacity-80 transition-opacity">
               Back to sign in
            </Link>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
