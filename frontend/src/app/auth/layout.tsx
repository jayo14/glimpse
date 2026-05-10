import Link from 'next/link';
import { Aperture, ArrowLeft } from '@phosphor-icons/react/dist/ssr';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--ink)] flex flex-col">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--viola)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--flash-gold)]/5 rounded-full blur-[120px]" />
      </div>

      <header className="relative z-10 p-8">
        <div className="gl-container">
          <Link href="/" className="gl-wordmark text-3xl font-bold text-white flex items-center gap-3">
             <Aperture size={32} weight="fill" className="text-[var(--viola)]" />
             Glimpse
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10 flex items-center py-12">
        <div className="gl-container grid lg:grid-cols-2 gap-16 items-center">
          <div className="hidden lg:block max-w-md">
            <p className="gl-section-label mb-6 text-[var(--flash-gold)]">The magic is waiting</p>
            <h1 className="gl-heading-display-lg mb-8 text-white">Join the future of photo delivery.</h1>
            <p className="gl-body-lg text-[#94A3B8] mb-12">
              Deliver photos guests actually find — and remember you for. Simple, cinematic, and seamless.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={20} /> Back to landing page
            </Link>
          </div>
          <div className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
