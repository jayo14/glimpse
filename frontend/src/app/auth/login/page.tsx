import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <Card className="mx-auto max-w-xl p-6 md:p-10">
      <p className="gl-section-label mb-3">Sign in</p>
      <h2 className="mb-6 text-3xl font-bold">Welcome back</h2>
      <form className="space-y-4">
        <Input name="email" type="email" label="Email" placeholder="you@example.com" />
        <Input name="password" type="password" label="Password" placeholder="••••••••" />
        <div className="flex justify-end">
          <Link href="/auth/forgot-password" className="text-sm text-[var(--viola)]">
            Forgot password?
          </Link>
        </div>
        <Button className="w-full">Sign in</Button>
      </form>
      <p className="mt-5 text-sm text-[var(--text-secondary)]">
        New to Glimpse?{' '}
        <Link href="/auth/register" className="text-[var(--viola)]">
          Create account
        </Link>
      </p>
    </Card>
  );
}
