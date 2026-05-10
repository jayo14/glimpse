'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Camera,
  CheckCircle,
  Lightning,
  Sparkle,
  Users,
  QrCode,
  MagicWand,
  Quotes,
  ArrowRight
} from '@phosphor-icons/react';
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
    usd: '-bash',
    period: 'Per event starter',
    features: ['1 Event', '100 Photos', 'Face Search'],
    isPopular: false,
    cta: 'Start Free',
    ctaVariant: 'primary' as const,
  },
  {
    name: 'Per Event',
    price: '₦8,000',
    usd: '',
    period: 'One-time payment',
    features: ['1,000 Photos', 'Priority processing', 'Custom QR + white-label'],
    isPopular: true,
    badge: 'Most Popular',
    cta: 'Get Started',
    ctaVariant: 'primary' as const,
  },
  {
    name: 'Pro Monthly',
    price: '₦25,000',
    usd: '6',
    period: 'Billed monthly',
    features: ['Unlimited events', '5,000 photos/event', 'Priority support'],
    isPopular: false,
    badge: 'Best Value',
    cta: 'Go Pro',
    ctaVariant: 'outline' as const,
    isDark: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function LandingPage() {
  const headline = "See yourself in every shot.";
  const words = headline.split(" ");

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] selection:bg-[var(--viola)] selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-default)]/60 bg-[var(--bg-page)]/85 backdrop-blur-xl">
        <div className="gl-container flex h-20 items-center justify-between gap-4">
          <Link href="/" className="gl-wordmark text-4xl font-bold text-[var(--text-primary)]">
            Glimpse
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--text-secondary)] md:flex">
            <a href="#features" className="hover:text-[var(--viola)] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[var(--viola)] transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-[var(--viola)] transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden lg:flex" />
            <Link href="/auth/login">
              <Button variant="ghost" className="hidden md:inline-flex">
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
        {/* Hero Section */}
        <section className="gl-gradient-event relative overflow-hidden pb-32 pt-24 min-h-[90vh] flex items-center">
          <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-magic)]" />

          {/* Ambient radial drift background effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, rgba(194, 24, 91, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 70%, rgba(194, 24, 91, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 30%, rgba(194, 24, 91, 0.15) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          <div className="gl-container relative z-10 grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.p variants={itemVariants} className="gl-section-label mb-6 text-[var(--flash-gold)]">
                AI-powered event photo retrieval
              </motion.p>

              <h1 className="gl-heading-display-xl mb-6 text-white">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.25em]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.08,
                      ease: "easeOut" as const
                    }}
                  >
                    {word === "shot." ? <span className="italic text-[var(--flash-gold)]">{word}</span> : word}
                  </motion.span>
                ))}
              </h1>

              <motion.p variants={itemVariants} className="gl-body-lg mb-10 text-[#CBD5E1]">
                Guests scan. Smile. Instantly find every frame where they appear. Built for photographers,
                creators, and event hosts who deliver premium memories.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row">
                <Link href="/onboarding">
                  <Button className="w-full sm:w-auto px-10 h-14 text-lg">Create an event</Button>
                </Link>
                <Link href="/dashboard/guest">
                  <Button variant="outline" className="w-full border-white/40 text-white hover:bg-white hover:text-[#0F0E17] sm:w-auto px-10 h-14 text-lg">
                    Live demo
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--ink)] bg-[#2E2C40] overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=glimpse-${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <Badge variant="face-found" className="py-2 px-4 shadow-viola">
                   Match found · 23 photos found ✨
                </Badge>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "circOut" as const }}
              className="relative"
            >
              <Card className="gl-card-dark overflow-hidden border-[#3A3850] p-4 lg:p-8 relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="gl-label text-[#94A3B8] mb-1">Magic Moment</p>
                    <p className="text-xl font-semibold text-white">Guest Gallery Reveal</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[var(--viola)]/20 flex items-center justify-center">
                    <Sparkle size={24} className="text-[var(--flash-gold)]" weight="fill" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop",
                  ].map((url, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
                      className="aspect-[4/5] rounded-lg overflow-hidden group relative"
                    >
                      <img src={url} alt="Event" className="object-cover w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[var(--viola)] animate-pulse" />
                   <span className="text-sm text-[#94A3B8]">Scanning for your face...</span>
                </div>
              </Card>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--viola)]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--flash-gold)]/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative bg-[var(--bg-page)]">
          <div className="gl-container">
            <div className="max-w-3xl mb-20">
              <p className="gl-section-label mb-5">Professional distribution</p>
              <h2 className="gl-heading-display-lg mb-6 text-[var(--text-primary)]">Deliver photos guests actually find.</h2>
              <p className="gl-body-lg text-[var(--text-secondary)]">Glimpse transforms the way event memories are shared, moving from passive links to active discovery.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, idx) => (
                <Card key={feature.title} variant="feature" className="hover:translate-y-[-8px] transition-transform duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--blush)] flex items-center justify-center mb-8">
                    <feature.icon size={32} weight="duotone" className="text-[var(--viola)]" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-[var(--ink)]">{feature.title}</h3>
                  <p className="gl-body-md text-[var(--slate-600)] leading-relaxed">{feature.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 bg-[var(--bg-layer-2)]">
          <div className="gl-container">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="gl-section-label mb-5">The Experience</p>
              <h2 className="gl-heading-display-lg mb-6">Scan. Smile. See yourself. Done.</h2>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              {[
                {
                  step: '01',
                  icon: Camera,
                  title: 'Upload event photos',
                  text: 'Bulk upload high-res shots. Our AI indexes every face with cinematic precision.',
                  img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&auto=format&fit=crop'
                },
                {
                  step: '02',
                  icon: QrCode,
                  title: 'Share event QR',
                  text: 'Guests scan the code at the venue. No apps to download, just instant magic.',
                  img: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=400&auto=format&fit=crop'
                },
                {
                  step: '03',
                  icon: MagicWand,
                  title: 'Instant Discovery',
                  text: 'Guests take a quick selfie and instantly see every photo they are in. Pure delight.',
                  img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop'
                },
              ].map((item, i) => (
                <div key={item.step} className="group">
                  <div className="relative mb-8 rounded-2xl overflow-hidden aspect-video">
                    <img src={item.img} alt={item.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-[var(--ink)] shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold flex items-center gap-3">
                    <item.icon size={28} weight="duotone" className="text-[var(--viola)]" />
                    {item.title}
                  </h3>
                  <p className="gl-body-md text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 bg-[var(--bg-page)]">
          <div className="gl-container">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="gl-section-label mb-5">Simple & Transparent</p>
              <h2 className="gl-heading-display-lg mb-4">Premium outcomes for every event.</h2>
              <p className="gl-body-md text-[var(--text-secondary)]">Flexible pricing that scales with your growth.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {pricing.map((plan) => (
                <Card
                  key={plan.name}
                  variant="pricing"
                  isPopular={plan.isPopular}
                  className={plan.isDark ? 'bg-[var(--ink)] text-white border-[var(--flash-gold)]/40 shadow-photo' : 'bg-white text-[var(--ink)]'}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <p className={`text-sm ${plan.isDark ? 'text-slate-400' : 'text-[var(--slate-600)]'}`}>{plan.period}</p>
                    </div>
                    {plan.badge && (
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${plan.name === 'Pro Monthly' ? 'bg-[var(--flash-gold)] text-[var(--ink)]' : 'bg-[var(--viola)] text-white'}`}>
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="mb-10">
                    <div className="flex items-start gap-1">
                      <span className={`text-lg font-medium mt-2 ${plan.isDark ? 'text-slate-400' : 'text-[var(--slate-400)]'}`}>₦</span>
                      <span className="gl-heading-display-lg text-[64px] leading-none">{plan.price.replace('₦', '')}</span>
                    </div>
                    <p className={`mt-2 text-sm ${plan.isDark ? 'text-slate-500' : 'text-[var(--slate-400)]'}`}>~ {plan.usd} USD equivalent</p>
                  </div>

                  <ul className="mb-10 space-y-4">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle size={24} weight="fill" className="text-[var(--aperture-teal)] flex-shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.ctaVariant}
                    fullWidth
                    className={`h-14 ${plan.isDark ? 'bg-white text-[var(--ink)] hover:bg-slate-200' : ''}`}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="gl-container">
            <div className="relative rounded-[32px] overflow-hidden bg-[var(--ink)] p-12 lg:p-24 text-center">
               {/* Background texture */}
               <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
                  <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop" alt="texture" className="w-full h-full object-cover" />
               </div>

               <div className="relative z-10 max-w-3xl mx-auto">
                 <h2 className="gl-heading-display-md text-white mb-8">Ready to bring magic to your next event?</h2>
                 <p className="text-[#CBD5E1] text-lg mb-12">Join thousands of photographers and event planners delivering the Glimpse experience.</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <Button className="px-12 h-14 text-lg">Create your first event</Button>
                   <Button variant="ghost" className="text-white hover:text-[var(--flash-gold)] h-14 text-lg group">
                     Talk to sales <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-default)]/60 py-20 bg-[var(--bg-layer-2)]">
        <div className="gl-container">
          <div className="grid gap-12 md:grid-cols-4 mb-20">
            <div className="col-span-2">
              <Link href="/" className="gl-wordmark text-4xl font-bold mb-6 block text-[var(--text-primary)]">
                Glimpse
              </Link>
              <p className="gl-body-md text-[var(--text-secondary)] max-w-sm mb-8">
                The future of event photo delivery. AI-powered face retrieval for memories that matter.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border border-[var(--border-default)] flex items-center justify-center hover:border-[var(--viola)] hover:text-[var(--viola)] transition-colors cursor-pointer">
                    <Sparkle size={18} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Product</h4>
              <ul className="space-y-4 text-sm text-[var(--text-secondary)] font-medium">
                <li><Link href="#features" className="hover:text-[var(--viola)]">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-[var(--viola)]">How it works</Link></li>
                <li><Link href="#pricing" className="hover:text-[var(--viola)]">Pricing</Link></li>
                <li><Link href="/dashboard/guest" className="hover:text-[var(--viola)]">Live Demo</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Platform</h4>
              <ul className="space-y-4 text-sm text-[var(--text-secondary)] font-medium">
                <li><Link href="/dashboard/creator" className="hover:text-[var(--viola)]">Photographers</Link></li>
                <li><Link href="/dashboard/event-host" className="hover:text-[var(--viola)]">Event Hosts</Link></li>
                <li><Link href="/auth/register" className="hover:text-[var(--viola)]">Guest Search</Link></li>
                <li><Link href="/onboarding" className="hover:text-[var(--viola)]">White-label</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--border-default)]/60 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[var(--text-secondary)]">
            <p>© 2026 Glimpse AI. Built with ❤️ in Lagos & London.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-[var(--text-primary)]">Privacy Policy</Link>
              <Link href="#" className="hover:text-[var(--text-primary)]">Terms of Service</Link>
              <Link href="#" className="hover:text-[var(--text-primary)]">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
