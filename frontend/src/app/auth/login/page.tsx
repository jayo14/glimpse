'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react';

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
    >
      <Card className="bg-white p-8 md:p-12 shadow-photo border-none">
        <div className="mb-10">
          <p className="gl-label text-[var(--viola)] mb-3">Sign in</p>
          <h2 className="gl-heading-display-md text-[var(--ink)]">Welcome back.</h2>
        </div>

        <form className="space-y-6">
          <Input
            name="email"
            type="email"
            label="Email Address"
            placeholder="name@example.com"
            className="h-14"
          />
          <div className="space-y-2">
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              className="h-14"
            />
            <div className="flex justify-end">
              <Link href="/auth/forgot-password"  className="text-sm font-medium text-[var(--slate-600)] hover:text-[var(--viola)] transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button fullWidth className="h-14 text-lg">
            Sign in to Glimpse <ArrowRight className="ml-2" />
          </Button>
        </form>

        <div className="mt-10 pt-10 border-t border-[var(--border-default)]/60 text-center">
          <p className="text-[var(--slate-600)]">
            New to Glimpse?{' '}
            <Link href="/auth/register" className="font-bold text-[var(--ink)] hover:text-[var(--viola)] transition-colors underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
