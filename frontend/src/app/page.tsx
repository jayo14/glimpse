import Link from 'next/link';
import {
  Camera,
  CheckCircle,
  IdentificationBadge,
  Lightning,
  Sparkle,
  Users,
} from '@phosphor-icons/react/dist/ssr';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Lightning,
    title: 'Instant retrieval',
    text: 'No endless scrolling. Guests scan, smile, and find every frame they are in within seconds.',
  },
  {
    icon: Camera,
    title: 'Photographer-proud delivery',
    text: 'Premium gallery experiences with your identity front and center.',
  },
  {
    icon: Users,
    title: 'Guest delight loop',
    text: 'One QR code. Every guest. Zero follow-up email chaos after the event.',
  },
];

const pricing = [
  {
    name: 'Free',
    price: '₦0',
    usd: '$0',
    period: 'Per event starter',
    features: ['1 Event', '100 Photos', 'Face Search'],
    cardClass: 'bg-white text-[#0F0E17] border border-[#0F0E17]/20',
    cta: 'Start Free',
    ctaVariant: 'primary' as const,
  },
  {
    name: 'Per Event',
    price: '₦8,000',
    usd: '$5',
    period: 'Per event',
    features: ['1,000 Photos', 'Priority processing', 'Custom QR + white-label'],
    cardClass: 'bg-white text-[#0F0E17] border-2 border-[#C2185B] relative',
    badge: 'Most Popular',
    cta: 'Get Started',
    ctaVariant: 'primary' as const,
  },
  {
    name: 'Pro Monthly',
    price: '₦25,000',
    usd: '$16',
    period: 'Monthly',
    features: ['Unlimited events', '5,000 photos/event', 'Priority support'],
    cardClass: 'bg-[#0F0E17] text-white border border-[#FFD54F]/60',
    badge: 'Best Value',
    cta: 'Go Pro',
    ctaVariant: 'outline' as const,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border-default)]/60 bg-[var(--bg-page)]/85 backdrop-blur-xl">
        <div className="gl-container flex h-20 items-center justify-between gap-4">
          <Link href="/" className="gl-wordmark text-4xl font-bold text-[var(--text-primary)]">
            Glimpse
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-[var(--text-secondary)] md:flex">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden lg:flex" />
            <Link href="/auth/login">
              <Button variant="outline" className="hidden md:inline-flex">
                Sign in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="gl-gradient-event relative overflow-hidden pb-24 pt-20">
          <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-magic)]" />
          <div className="gl-container relative z-10 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="gl-section-label mb-6">AI-powered event photo retrieval</p>
              <h1 className="gl-heading-display-xl mb-6 text-white">
                See yourself in every <span className="italic text-[#FFD54F]">shot</span>.
              </h1>
              <p className="gl-body-lg mb-10 text-[#CBD5E1]">
                Guests scan. Smile. Instantly find every frame where they appear. Built for photographers,
                creators, and event hosts who deliver premium memories.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/onboarding">
                  <Button className="w-full sm:w-auto">Create an event</Button>
                </Link>
                <Link href="/dashboard/guest">
                  <Button variant="outline" className="w-full border-white/80 text-white hover:bg-white hover:text-[#0F0E17] sm:w-auto">
                    Live demo
                  </Button>
                </Link>
              </div>
              <div className="mt-8">
                <Badge variant="face-found">✓ Match found · We found you in 23 photos ✨</Badge>
              </div>
            </div>

            <Card tone="dark" className="overflow-hidden border-[#3A3850] p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="gl-label text-[#CBD5E1]">Magic moment preview</p>
                  <p className="text-lg font-semibold text-white">Guest gallery reveal</p>
                </div>
                <Sparkle size={24} className="text-[#FFD54F]" weight="duotone" />
              </div>
              <div className="gl-photo-grid">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-[4/5] rounded-xl border border-[#3A3850] bg-gradient-to-b from-[#2E2C40] to-[#1C1B2E]"
                  />
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="gl-container">
            <p className="gl-section-label mb-5">Built for the full event lifecycle</p>
            <h2 className="gl-heading-display-lg mb-10">From upload to delight, end-to-end.</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-l-4 border-l-[#C2185B] p-8">
                  <feature.icon size={40} weight="duotone" className="mb-5 text-[#C2185B]" />
                  <h3 className="mb-3 text-2xl font-bold">{feature.title}</h3>
                  <p className="gl-body-md text-[var(--text-secondary)]">{feature.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="gl-gradient-warm py-20">
          <div className="gl-container">
            <p className="gl-section-label mb-5">How it works</p>
            <h2 className="gl-heading-display-lg mb-10">Scan. Smile. See yourself. Done.</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                ['01', 'Upload event photos', 'Bulk upload with cinematic processing and progress visibility.'],
                ['02', 'Share event QR', 'Guests scan and take a selfie with guided framing.'],
                ['03', 'Receive personalized gallery', 'Face match reveal cascades matching photos in seconds.'],
              ].map(([step, title, text]) => (
                <Card key={step} className="p-8">
                  <p className="mb-4 gl-mono text-sm text-[var(--viola)]">{step}</p>
                  <h3 className="mb-3 text-2xl font-bold">{title}</h3>
                  <p className="gl-body-md text-[var(--text-secondary)]">{text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="gl-container">
            <p className="gl-section-label mb-5">Pricing</p>
            <h2 className="gl-heading-display-lg mb-4">Simple tiers, premium outcomes.</h2>
            <p className="gl-body-md mb-10 text-[var(--text-secondary)]">Naira first. USD shown as a secondary reference.</p>
            <div className="grid gap-6 lg:grid-cols-3">
              {pricing.map((plan) => (
                <div key={plan.name} className={`rounded-[20px] p-6 shadow-[var(--shadow-md)] ${plan.cardClass}`}>
                  {plan.badge ? (
                    <span
                      className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                        plan.name === 'Pro Monthly' ? 'bg-[#FFD54F] text-[#0F0E17]' : 'bg-[#C2185B] text-white'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  ) : null}
                  <h3 className="mb-4 text-3xl font-bold">{plan.name}</h3>
                  <p className="gl-heading-display-md mb-1 text-[40px] leading-none">{plan.price}</p>
                  <p className="mb-2 text-sm opacity-70">{plan.usd}</p>
                  <p className="mb-6 text-sm opacity-70">{plan.period}</p>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={20} weight="duotone" className="mt-0.5 text-[#00BFA5]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.ctaVariant} className="w-full">
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-default)] py-8">
        <div className="gl-container flex flex-col items-start justify-between gap-4 text-sm text-[var(--text-secondary)] md:flex-row md:items-center">
          <p>© 2026 Glimpse. Your moment, found.</p>
          <div className="flex items-center gap-4">
            <IdentificationBadge size={20} className="text-[var(--viola)]" weight="duotone" />
            <Link href="/dashboard/creator">Creator dashboard</Link>
            <Link href="/dashboard/event-host">Event host</Link>
            <Link href="/dashboard/guest">Guest view</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
