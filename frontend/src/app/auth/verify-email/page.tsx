'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Envelope, ArrowClockwise, CheckCircle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export default function VerifyEmailPage() {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const canResend = countdown === 0;

  const handleResend = () => {
    setCountdown(60);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white/95 backdrop-blur-xl p-8 md:p-12 shadow-photo border-none rounded-[32px] text-center">
        <div className="w-20 h-20 bg-[var(--viola)]/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
           <Envelope size={40} weight="duotone" className="text-[var(--viola)]" />
           <motion.div
             animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 border-2 border-[var(--viola)]/30 rounded-full"
           />
        </div>

        <h2 className="gl-heading-display-md text-[var(--ink)] mb-4">Verify your email</h2>
        <p className="text-[var(--slate-600)] mb-8 leading-relaxed">
          We&apos;ve sent a verification code to <span className="font-bold text-[var(--ink)]">alex@example.com</span>.
          Please click the link in the email to confirm your account.
        </p>

        <div className="space-y-4">
          <Button
            variant="outline"
            fullWidth
            disabled={!canResend}
            onClick={handleResend}
            className="h-14 border-slate-200"
          >
            <ArrowClockwise size={20} className={cn("mr-2", !canResend && "animate-spin")} />
            {canResend ? "Resend verification email" : `Resend in ${countdown}s`}
          </Button>

          <Link href="/auth/register" className="block text-sm font-bold text-[var(--slate-400)] hover:text-[var(--viola)] transition-colors">
            Entered the wrong email? Change it
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
           <CheckCircle size={16} weight="fill" className="text-[var(--aperture-teal)]" />
           Premium Security Active
        </div>
      </Card>
    </motion.div>
  );
}
