import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GuestDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[var(--gradient-event)] p-6 text-white">
        <p className="gl-section-label !text-[#FFD54F]">Guest experience</p>
        <h1 className="mt-3 text-3xl font-bold">My Photos</h1>
        <p className="mt-2 text-sm text-[#CBD5E1]">Scan. Smile. See yourself. Done.</p>
      </section>

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Face match status</h2>
          <Badge variant="face-found">✓ Match found</Badge>
        </div>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">We found you in 23 photos ✨</p>
      </Card>

      <div className="gl-photo-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="aspect-[4/5] overflow-hidden rounded-xl border border-[var(--border-default)]" />
        ))}
      </div>

      <Button className="fixed bottom-20 left-1/2 z-20 h-14 w-[min(320px,calc(100%-40px))] -translate-x-1/2 lg:hidden">
        Selfie Scan CTA
      </Button>
    </div>
  );
}
