import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EventHostDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[var(--gradient-event)] p-6 text-white">
        <p className="gl-section-label !text-[#FFD54F]">Event host control room</p>
        <h1 className="mt-3 text-3xl font-bold">Event Operations</h1>
        <p className="mt-2 text-sm text-[#CBD5E1]">One QR code. Every guest. Zero follow-up emails.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Live event</h2>
            <Badge variant="event-live">Event live</Badge>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">Lagos Corporate Summit 2026 · 1,208 guests</p>
          <Button className="mt-4">Share guest QR</Button>
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 text-xl font-semibold">Processing pipeline</h2>
          <Badge variant="processing">Scanning...</Badge>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Your photos are being processed. Magic incoming.
          </p>
        </Card>
      </section>

      <Card className="p-5">
        <h2 className="mb-4 text-xl font-semibold">Upcoming events</h2>
        <div className="space-y-3">
          {['Wedding Finale · 17 May', 'Campus Convocation · 24 May', 'Summer Gala · 1 June'].map((event) => (
            <div key={event} className="rounded-xl border border-[var(--border-default)] p-3">
              <p>{event}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
