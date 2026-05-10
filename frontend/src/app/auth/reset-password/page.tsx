import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ResetPasswordPage() {
  return (
    <Card className="mx-auto max-w-xl p-6 md:p-10">
      <p className="gl-section-label mb-3">Set new password</p>
      <h2 className="mb-6 text-3xl font-bold">Create your new password</h2>
      <form className="space-y-4">
        <Input name="password" type="password" label="New password" placeholder="At least 8 characters" />
        <Input name="confirmPassword" type="password" label="Confirm password" placeholder="Repeat password" />
        <Button className="w-full">Update password</Button>
      </form>
      <p className="mt-5 text-sm text-[var(--text-secondary)]">
        Need help?{' '}
        <Link href="/auth/login" className="text-[var(--viola)]">
          Return to sign in
        </Link>
      </p>
    </Card>
  );
}
