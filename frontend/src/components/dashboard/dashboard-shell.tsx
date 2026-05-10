'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, House, Images, UserCircle } from '@phosphor-icons/react';
import { ThemeToggle } from '@/components/theme-toggle';

const tabs = [
  { href: '/dashboard/creator', label: 'Home', icon: House },
  { href: '/dashboard/guest', label: 'My Photos', icon: Images },
  { href: '/dashboard/event-host', label: 'Events', icon: Calendar },
  { href: '/auth/login', label: 'Profile', icon: UserCircle },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <header className="sticky top-0 z-20 border-b border-[var(--border-default)] bg-[var(--bg-page)]/90 backdrop-blur">
        <div className="gl-container flex h-16 items-center justify-between">
          <p className="text-lg font-semibold">Glimpse Dashboard</p>
          <ThemeToggle />
        </div>
      </header>

      <div className="gl-container grid gap-6 py-5 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-2xl border border-[var(--border-default)] bg-[#0F0E17] p-4 text-white lg:block">
          <p className="mb-4 text-xs uppercase tracking-[0.12em] text-[#CBD5E1]">Navigation</p>
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const active = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex min-h-12 items-center gap-3 rounded-xl px-3 ${
                    active ? 'bg-[#1C1B2E] text-white' : 'text-[#CBD5E1] hover:bg-[#1C1B2E]'
                  }`}
                >
                  <tab.icon size={20} weight={active ? 'duotone' : 'regular'} />
                  <span>{tab.label}</span>
                  {active ? <span className="ml-auto h-2 w-2 rounded-full bg-[#C2185B]" /> : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="pb-24 lg:pb-0">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--border-default)] bg-[var(--bg-layer-1)] lg:hidden">
        <div className="grid grid-cols-4">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link key={tab.href} href={tab.href} className="flex min-h-12 flex-col items-center justify-center gap-1 text-xs">
                <tab.icon size={20} weight={active ? 'duotone' : 'regular'} className={active ? 'text-[var(--viola)]' : 'text-[var(--text-secondary)]'} />
                <span className={active ? 'text-[var(--viola)]' : 'text-[var(--text-secondary)]'}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
