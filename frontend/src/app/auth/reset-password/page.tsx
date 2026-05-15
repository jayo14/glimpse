'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LockKey, CheckCircle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-white/95 backdrop-blur-xl p-8 md:p-12 shadow-photo border-none rounded-[32px]">
        {!isSuccess ? (
          <>
            <div className="mb-10">
              <h2 className="gl-heading-display-md text-[var(--ink)]">New Password</h2>
              <p className="text-[var(--slate-600)] mt-2">Secure your account with a fresh start.</p>
            </div>

            <form className="space-y-6" onSubmit={handleReset}>
              <div className="space-y-3">
                <Input
                  name="password"
                  type="password"
                  label="New Password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 bg-[#F8FAFC]"
                  required
                />
                <div className="flex gap-1.5 h-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 rounded-full transition-all duration-500",
                        password.length >= 8 ? "bg-[var(--aperture-teal)]" : password.length > 0 ? "bg-amber-400" : "bg-slate-100"
                      )}
                    />
                  ))}
                </div>
              </div>

              <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                className="h-14 bg-[#F8FAFC]"
                required
              />

              <Button fullWidth className="h-14 text-lg shadow-viola">
                Reset Password <LockKey className="ml-2" weight="duotone" />
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-[var(--aperture-teal)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
               <CheckCircle size={48} weight="fill" className="text-[var(--aperture-teal)]" />
            </div>
            <h2 className="gl-heading-display-md text-[var(--ink)] mb-4">Password reset</h2>
            <p className="text-[var(--slate-600)] mb-10 leading-relaxed">
              Your password has been successfully updated. You can now sign in with your new credentials.
            </p>
            <Link href="/auth/login">
              <Button fullWidth className="h-14 text-lg shadow-viola">
                Back to sign in
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
