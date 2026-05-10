'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  House,
  Images,
  UserCircle,
  Aperture,
  SignOut,
  Bell,
  Gear
} from '@phosphor-icons/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const tabs = [
  { href: '/dashboard/creator', label: 'Home', icon: House },
  { href: '/dashboard/guest', label: 'My Photos', icon: Images },
  { href: '/dashboard/event-host', label: 'Events', icon: Calendar },
  { href: '/auth/login', label: 'Profile', icon: UserCircle },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 bg-[var(--ink)] text-white z-30">
        <div className="p-8">
          <Link href="/" className="gl-wordmark text-2xl font-bold flex items-center gap-2">
            <Aperture size={32} weight="fill" className="text-[var(--viola)]" />
            Glimpse
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <p className="px-4 text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mb-4">Main Menu</p>
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex items-center gap-3 h-12 px-4 rounded-xl transition-all duration-200 group relative",
                  active ? "bg-[#1C1B2E] text-white" : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon size={22} weight={active ? "duotone" : "regular"} className={cn(active ? "text-[var(--viola)]" : "group-hover:text-white")} />
                <span className="font-medium">{tab.label}</span>
                {active && (
                  <span className="absolute left-0 w-1 h-6 bg-[var(--viola)] rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 space-y-2">
           <Link href="#" className="flex items-center gap-3 h-12 px-4 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all">
             <Gear size={22} />
             <span className="font-medium">Settings</span>
           </Link>
           <Link href="/auth/login" className="flex items-center gap-3 h-12 px-4 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all">
             <SignOut size={22} />
             <span className="font-medium">Logout</span>
           </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 h-20 bg-[var(--bg-page)]/80 backdrop-blur-md border-b border-[var(--border-default)] flex items-center justify-between px-6 lg:px-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)] lg:hidden">
            <Aperture size={24} weight="fill" className="text-[var(--viola)] inline mr-2" />
            Glimpse
          </h2>
          <div className="hidden lg:block">
            <p className="text-sm text-[var(--text-secondary)]">Good morning, <span className="font-bold text-[var(--text-primary)]">John Doe</span></p>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle className="hidden sm:flex scale-90" />
            <button className="p-2 rounded-full hover:bg-[var(--bg-layer-2)] text-[var(--text-secondary)] relative">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--viola)] rounded-full border-2 border-[var(--bg-page)]" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[var(--viola)]/10 border border-[var(--viola)]/20 overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=johndoe" alt="User" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 pb-32 lg:pb-10 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[var(--bg-layer-1)] border-t border-[var(--border-default)] safe-area-inset-bottom">
        <div className="grid grid-cols-4 h-20 px-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center justify-center gap-1.5 transition-colors relative"
              >
                <div className={cn(
                  "p-1.5 rounded-xl transition-all duration-300",
                  active ? "bg-[var(--viola)]/10 text-[var(--viola)]" : "text-[var(--text-secondary)]"
                )}>
                  <tab.icon size={24} weight={active ? "duotone" : "regular"} />
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  active ? "text-[var(--viola)]" : "text-[var(--text-secondary)]"
                )}>
                  {tab.label}
                </span>
                {active && (
                   <motion.div
                     layoutId="mobile-tab-pill"
                     className="absolute top-0 w-8 h-1 bg-[var(--viola)] rounded-b-full"
                   />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
