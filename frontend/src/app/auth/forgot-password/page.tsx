import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  return (
    <Card className="mx-auto max-w-xl p-6 md:p-10">
      <p className="gl-section-label mb-3">Reset password</p>
      <h2 className="mb-3 text-3xl font-bold">Magic link request</h2>
      <p className="mb-6 text-sm text-[var(--text-secondary)]">
        Enter your email and we&apos;ll send a secure reset link.
      </p>
      <form className="space-y-4">
        <Input name="email" type="email" label="Email" placeholder="you@example.com" />
        <Button className="w-full">Send reset link</Button>
      </form>
      <p className="mt-5 text-sm text-[var(--text-secondary)]">
        Remembered your password?{' '}
        <Link href="/auth/login" className="text-[var(--viola)]">
          Back to sign in
        </Link>
      </p>
    </Card>
  );
}
