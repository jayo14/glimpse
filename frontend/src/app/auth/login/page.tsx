'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, GoogleLogo } from '@phosphor-icons/react';

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-white/95 backdrop-blur-xl p-8 md:p-12 shadow-photo border-none rounded-[32px]">
        <div className="mb-10">
          <p className="gl-label text-[var(--viola)] mb-3">Welcome Back</p>
          <h2 className="gl-heading-display-md text-[var(--ink)]">Sign in to Glimpse</h2>
          <p className="text-[var(--slate-600)] mt-2">Enter your details to continue your journey.</p>
        </div>

        <form className="space-y-6">
          <Input
            name="email"
            type="email"
            label="Email Address"
            placeholder="alex@example.com"
            className="h-14 bg-[#F8FAFC]"
          />
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="gl-label">Password</span>
              <Link href="/auth/forgot-password"  className="text-xs font-bold text-[var(--viola)] hover:opacity-80 transition-opacity">
                Forgot?
              </Link>
            </div>
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              className="h-14 bg-[#F8FAFC]"
            />
          </div>

          <div className="flex items-center gap-3 py-2">
             <input type="checkbox" id="remember" className="w-5 h-5 rounded-md border-slate-300 text-[var(--viola)] focus:ring-[var(--viola)]" />
             <label htmlFor="remember" className="text-sm font-medium text-[var(--slate-600)]">Remember me for 30 days</label>
          </div>

          <Button fullWidth className="h-14 text-lg shadow-viola">
            Sign In <ArrowRight className="ml-2" weight="bold" />
          </Button>

          <div className="relative py-4 flex items-center gap-4">
             <div className="h-[1px] flex-1 bg-slate-100" />
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
             <div className="h-[1px] flex-1 bg-slate-100" />
          </div>

          <Button variant="outline" fullWidth className="h-14 text-base border-slate-200 text-slate-700 hover:bg-slate-50">
            <GoogleLogo size={24} weight="bold" className="mr-2 text-[#4285F4]" /> Continue with Google
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-[var(--slate-600)]">
            New to the platform?{' '}
            <Link href="/auth/register" className="font-bold text-[var(--ink)] hover:text-[var(--viola)] transition-colors underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
