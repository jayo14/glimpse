import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CreatorDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[var(--gradient-event)] p-6 text-white">
        <p className="gl-section-label !text-[#FFD54F]">Creator workspace</p>
        <h1 className="mt-3 text-3xl font-bold">Photographer Dashboard</h1>
        <p className="mt-2 text-sm text-[#CBD5E1]">Deliver photos guests actually find — and remember you.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Photos Uploaded', '847'],
          ['Guests Scanned', '312'],
          ['Downloads', '1,946'],
          ['Shares', '602'],
        ].map(([label, value]) => (
          <Card key={label} className="p-5">
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </Card>
        ))}
      </section>

      <Card className="p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Bulk upload zone</h2>
          <Badge variant="uploading">Uploading · 61%</Badge>
        </div>
        <div className="rounded-2xl border-2 border-dashed border-[#C2185B]/40 bg-[var(--blush)] p-8 text-center">
          <p className="font-medium">Drop photos here or click to upload</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Supports thousands of files per event.</p>
          <Button className="mt-4">Select photos</Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="mb-4 text-xl font-semibold">White-label preview</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-xl bg-[#1C1B2E]" />
          ))}
        </div>
      </Card>
    </div>
  );
}
