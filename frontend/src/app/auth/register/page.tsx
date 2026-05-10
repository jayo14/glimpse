import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  return (
    <Card className="mx-auto max-w-xl p-6 md:p-10">
      <p className="gl-section-label mb-3">Create account</p>
      <h2 className="mb-6 text-3xl font-bold">Start with Glimpse</h2>
      <form className="space-y-4">
        <Input name="name" label="Full name" placeholder="Ada Okoro" />
        <Input name="email" type="email" label="Email" placeholder="you@example.com" />
        <Input name="password" type="password" label="Password" placeholder="At least 8 characters" />
        <Input name="confirmPassword" type="password" label="Confirm password" placeholder="Repeat password" />
        <Button className="w-full">Create account</Button>
      </form>
      <p className="mt-5 text-sm text-[var(--text-secondary)]">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-[var(--viola)]">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
