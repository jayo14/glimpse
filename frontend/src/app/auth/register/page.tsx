'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, GoogleLogo } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const [password, setPassword] = useState('');

  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-white/95 backdrop-blur-xl p-8 md:p-12 shadow-photo border-none rounded-[32px]">
        <div className="mb-10">
          <p className="gl-label text-[var(--viola)] mb-3">Join Glimpse</p>
          <h2 className="gl-heading-display-md text-[var(--ink)]">Create your account</h2>
          <p className="text-[var(--slate-600)] mt-2">Start delivering magic moments today.</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <Input name="firstName" label="First Name" placeholder="Jane" className="h-14 bg-[#F8FAFC]" />
             <Input name="lastName" label="Last Name" placeholder="Doe" className="h-14 bg-[#F8FAFC]" />
          </div>

          <Input
            name="email"
            type="email"
            label="Email Address"
            placeholder="jane@example.com"
            className="h-14 bg-[#F8FAFC]"
          />

          <div className="space-y-3">
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 bg-[#F8FAFC]"
            />
            {password.length > 0 && (
              <div className="flex gap-1.5 h-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-full transition-colors duration-500",
                      strength >= i ? (strength === 1 ? "bg-amber-400" : "bg-[var(--aperture-teal)]") : "bg-slate-100"
                    )}
                  />
                ))}
              </div>
            )}
            <p className="text-[10px] text-slate-500 font-medium">Use 8 or more characters with a mix of letters & numbers.</p>
          </div>

          <div className="flex items-start gap-3 py-2">
             <div className="mt-1">
               <input type="checkbox" id="terms" className="w-5 h-5 rounded-md border-slate-300 text-[var(--viola)] focus:ring-[var(--viola)]" />
             </div>
             <label htmlFor="terms" className="text-xs text-[var(--slate-600)] leading-relaxed">
               I agree to the <Link href="#" className="text-[var(--viola)] font-bold">Terms of Service</Link> and <Link href="#" className="text-[var(--viola)] font-bold">Privacy Policy</Link>.
             </label>
          </div>

          <Button fullWidth className="h-14 text-lg shadow-viola">
            Create Account <ArrowRight className="ml-2" weight="bold" />
          </Button>

          <div className="relative py-4 flex items-center gap-4">
             <div className="h-[1px] flex-1 bg-slate-100" />
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
             <div className="h-[1px] flex-1 bg-slate-100" />
          </div>

          <Button variant="outline" fullWidth className="h-14 text-base border-slate-200 text-slate-700 hover:bg-slate-50">
            <GoogleLogo size={24} weight="bold" className="mr-2 text-[#4285F4]" /> Sign up with Google
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-[var(--slate-600)]">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold text-[var(--ink)] hover:text-[var(--viola)] transition-colors underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
