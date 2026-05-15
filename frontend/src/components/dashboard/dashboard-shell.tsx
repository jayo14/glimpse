'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  Calendar,
  House,
  Images,
  UserCircle,
  Aperture,
  SignOut,
  Bell,
  Gear,
  ChartBar,
  CloudArrowUp,
  Users,
  QrCode,
  CreditCard,
  MagnifyingGlass,
  Command,
  List,
  X,
  ShieldCheck,
  WarningOctagon,
  Plus,
  MagnifyingGlass as SearchIcon
} from '@phosphor-icons/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

// Types for navigation items
interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  roles?: string[];
}

const sidebarItems: NavItem[] = [
  { href: '/dashboard/creator', label: 'Dashboard', icon: House, roles: ['creator'] },
  { href: '/dashboard/event-host', label: 'Dashboard', icon: House, roles: ['host'] },
  { href: '/dashboard/guest', label: 'Dashboard', icon: House, roles: ['guest'] },
  { href: '/dashboard/admin', label: 'Admin Panel', icon: ShieldCheck, roles: ['admin'] },

  { href: '/dashboard/events', label: 'Events', icon: Calendar, roles: ['creator', 'host'] },
  { href: '/dashboard/galleries', label: 'Galleries', icon: Images, roles: ['creator', 'host', 'guest'] },
  { href: '/dashboard/uploads', label: 'Upload Studio', icon: CloudArrowUp, roles: ['creator'] },
  { href: '/dashboard/analytics', label: 'Analytics', icon: ChartBar, roles: ['creator', 'host', 'admin'] },
  { href: '/dashboard/guests', label: 'Guests', icon: Users, roles: ['creator', 'host'] },
  { href: '/dashboard/qr-codes', label: 'QR Codes', icon: QrCode, roles: ['creator', 'host'] },
  { href: '/dashboard/moderation', label: 'Moderation', icon: WarningOctagon, roles: ['admin'] },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard, roles: ['creator', 'host', 'admin'] },
  { href: '/dashboard/settings', label: 'Settings', icon: Gear },
];

const mobileDockItems: NavItem[] = [
  { href: '/dashboard/creator', label: 'Home', icon: House, roles: ['creator'] },
  { href: '/dashboard/event-host', label: 'Home', icon: House, roles: ['host'] },
  { href: '/dashboard/guest', label: 'Home', icon: House, roles: ['guest'] },

  { href: '/dashboard/events', label: 'Events', icon: Calendar, roles: ['creator', 'host'] },
  { href: '/dashboard/uploads', label: 'Uploads', icon: CloudArrowUp, roles: ['creator'] },
  { href: '/dashboard/galleries', label: 'Gallery', icon: Images, roles: ['creator', 'host', 'guest'] },
  { href: '/dashboard/guest/profile', label: 'Profile', icon: UserCircle, roles: ['guest'] },
  { href: '/dashboard/settings', label: 'Settings', icon: Gear, roles: ['creator', 'host', 'admin'] },
];

interface DashboardShellProps {
  children: React.ReactNode;
  role?: 'creator' | 'host' | 'guest' | 'admin';
}

export function DashboardShell({ children, role = 'creator' }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const filteredSidebarItems = sidebarItems.filter(
    item => !item.roles || item.roles.includes(role)
  );

  const filteredDockItems = mobileDockItems.filter(
    item => !item.roles || item.roles.includes(role)
  );

  const handleFabClick = () => {
    if (role === 'creator') router.push('/dashboard/uploads');
    else if (role === 'host') router.push('/dashboard/events/create');
    else if (role === 'guest') router.push('/dashboard/guest/search');
  };

  // Keyboard shortcut for command palette
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* Desktop/Tablet Sidebar (Glassmorphism) */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed inset-y-0 left-0 z-40 transition-all duration-500 ease-out-silk border-r border-[var(--border-default)]/30 backdrop-blur-xl bg-[var(--ink)]/80",
          isSidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--viola)] to-[var(--deep-viola)] flex items-center justify-center shadow-viola">
              <Aperture size={24} weight="fill" className="text-white" />
            </div>
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="gl-wordmark text-2xl font-bold text-white whitespace-nowrap"
              >
                Glimpse
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {filteredSidebarItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isSidebarCollapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 h-12 rounded-xl transition-all duration-300 group relative",
                  isSidebarCollapsed ? "justify-center px-0" : "px-4",
                  active
                    ? "bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                    : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon
                  size={24}
                  weight={active ? "duotone" : "regular"}
                  className={cn(
                    "transition-transform duration-300 group-hover:scale-110",
                    active ? "text-[var(--viola)]" : "text-slate-400 group-hover:text-white"
                  )}
                />
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
                {active && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute left-0 w-1 h-6 bg-[var(--viola)] rounded-r-full shadow-[0_0_12px_rgba(194,24,91,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 space-y-2">
           <button
             onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
             className="hidden lg:flex items-center gap-3 w-full h-12 px-4 rounded-xl text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all"
           >
             <List size={24} className={cn("transition-transform duration-500", isSidebarCollapsed && "rotate-180")} />
             {!isSidebarCollapsed && <span className="font-medium">Collapse</span>}
           </button>
           <Link href="/auth/login" className={cn(
             "flex items-center gap-3 h-12 rounded-xl text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all",
             isSidebarCollapsed ? "justify-center px-0" : "px-4"
           )}>
             <SignOut size={24} />
             {!isSidebarCollapsed && <span className="font-medium">Logout</span>}
           </Link>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 h-16 bg-[var(--bg-page)]/80 backdrop-blur-lg border-b border-[var(--border-default)] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-[var(--viola)] flex items-center justify-center">
             <Aperture size={20} weight="fill" className="text-white" />
           </div>
           <span className="gl-wordmark text-xl font-bold">Glimpse</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="scale-75" />
          <button
            onClick={() => setIsMobileMobileMenuOpen(true)}
            className="p-2 text-[var(--text-primary)]"
          >
            <List size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-[var(--ink)] z-[60] md:hidden p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="gl-wordmark text-2xl font-bold text-white">Glimpse</span>
                <button onClick={() => setIsMobileMobileMenuOpen(false)} className="text-white p-2">
                  <X size={28} />
                </button>
              </div>

              <nav className="flex-1 space-y-4 overflow-y-auto">
                 {filteredSidebarItems.map(item => (
                   <Link
                     key={item.href}
                     href={item.href}
                     onClick={() => setIsMobileMobileMenuOpen(false)}
                     className={cn(
                       "flex items-center gap-4 p-4 rounded-2xl transition-all",
                       pathname === item.href ? "bg-white/10 text-white shadow-lg shadow-white/5" : "text-slate-400"
                     )}
                   >
                     <item.icon size={28} weight={pathname === item.href ? "duotone" : "regular"} className={pathname === item.href ? "text-[var(--viola)]" : ""} />
                     <span className="text-lg font-medium">{item.label}</span>
                   </Link>
                 ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-white/10">
                 <Link href="/auth/login" className="flex items-center gap-4 p-4 text-slate-400">
                    <SignOut size={28} />
                    <span className="text-lg font-medium">Sign Out</span>
                 </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 transition-all duration-500 ease-out-silk",
        "md:ml-20 lg:ml-72",
        isSidebarCollapsed && "md:ml-20 lg:ml-20",
        !isSidebarCollapsed && "lg:ml-72"
      )}>
        {/* Desktop Header */}
        <header className="hidden md:flex sticky top-0 z-30 h-20 bg-[var(--bg-page)]/80 backdrop-blur-md border-b border-[var(--border-default)]/30 items-center justify-between px-8 lg:px-12">
          <div className="flex items-center gap-6 flex-1">
             <div className="relative max-w-md w-full group cursor-pointer" onClick={() => setIsCommandPaletteOpen(true)}>
                <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[var(--viola)] transition-colors" />
                <div className="w-full h-11 pl-12 pr-4 rounded-full bg-[var(--bg-layer-2)] border-none flex items-center text-slate-400 text-sm">
                   Search events, photos, guests...
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div
               onClick={() => setIsCommandPaletteOpen(true)}
               className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-layer-2)] text-[var(--text-secondary)] border border-[var(--border-default)]/50 cursor-pointer hover:border-[var(--viola)]/50 transition-colors"
            >
               <Command size={16} />
               <span className="text-xs font-bold tracking-tighter uppercase">K</span>
            </div>

            <ThemeToggle />

            <button className="p-2.5 rounded-full bg-[var(--bg-layer-2)] text-[var(--text-secondary)] hover:text-[var(--viola)] transition-all relative group">
              <Bell size={24} weight="duotone" className="group-hover:scale-110 transition-transform" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[var(--viola)] rounded-full border-2 border-[var(--bg-page)]" />
            </button>

            <div className="h-10 w-[1px] bg-[var(--border-default)]/60 mx-2" />

            <Link href={role === 'guest' ? '/dashboard/guest/profile' : '/dashboard/settings'} className="flex items-center gap-4 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[var(--text-primary)] leading-none mb-1">Alex Sterling</p>
                <p className="text-[10px] uppercase tracking-widest text-[var(--viola)] font-bold">{role}</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--blush)] to-[var(--champagne)] p-0.5 group-hover:rotate-6 transition-transform duration-500">
                <div className="w-full h-full rounded-[14px] bg-white overflow-hidden border border-[var(--viola)]/10">
                   <img src="https://i.pravatar.cc/150?u=glimpse-user" alt="User" className="w-full h-full object-cover" />
                </div>
              </div>
            </Link>
          </div>
        </header>

        <main className="p-6 md:p-8 lg:p-12 pb-32 md:pb-12">
          {children}
        </main>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-28 right-6 z-50">
        <button
          onClick={handleFabClick}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--viola)] to-[var(--deep-viola)] text-white shadow-viola flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-4 border-[var(--bg-page)]"
        >
          {role === 'creator' ? (
            <CloudArrowUp size={32} weight="duotone" />
          ) : (
            <Plus size={32} weight="bold" />
          )}
        </button>
      </div>

      {/* Mobile Floating Bottom Dock */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <nav className="bg-[var(--ink)]/90 backdrop-blur-xl border border-white/10 rounded-[28px] h-20 shadow-2xl px-4 flex items-center justify-around overflow-hidden">
          {filteredDockItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center py-2"
              >
                <div className={cn(
                  "p-2 rounded-2xl transition-all duration-500 relative z-10",
                  active ? "text-white scale-110" : "text-slate-500"
                )}>
                  <item.icon size={28} weight={active ? "fill" : "regular"} />
                </div>
                {active && (
                   <motion.div
                     layoutId="mobile-dock-pill"
                     className="absolute inset-0 bg-gradient-to-br from-[var(--viola)] to-[var(--deep-viola)] rounded-2xl opacity-20 blur-lg"
                   />
                )}
                {active && (
                   <motion.div
                     layoutId="mobile-dock-indicator"
                     className="absolute -bottom-1 w-1.5 h-1.5 bg-[var(--viola)] rounded-full shadow-[0_0_8px_var(--viola)]"
                   />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Global Command Palette Overlay */}
      <AnimatePresence>
         {isCommandPaletteOpen && (
           <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4 md:pt-40">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCommandPaletteOpen(false)}
                className="fixed inset-0 bg-[var(--ink)]/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="relative w-full max-w-2xl bg-white dark:bg-[var(--dusk)] rounded-[24px] shadow-photo overflow-hidden border border-[var(--border-default)]/30"
              >
                 <div className="p-6 border-b border-[var(--border-default)]/30 flex items-center gap-4">
                    <SearchIcon size={24} className="text-[var(--viola)]" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Type a command or search..."
                      className="flex-1 bg-transparent border-none text-lg outline-none focus:ring-0"
                    />
                    <div className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400">ESC</div>
                 </div>
                 <div className="max-h-[400px] overflow-y-auto p-4 space-y-6">
                    <div>
                       <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Quick Navigation</p>
                       <div className="space-y-1">
                          {[
                            { label: 'View All Events', icon: Calendar, href: '/dashboard/events' },
                            { label: 'Upload Photos', icon: CloudArrowUp, href: '/dashboard/uploads' },
                            { label: 'Platform Analytics', icon: ChartBar, href: '/dashboard/analytics' },
                          ].map(cmd => (
                            <div key={cmd.label} onClick={() => { router.push(cmd.href); setIsCommandPaletteOpen(false); }} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--blush)]/20 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                               <cmd.icon size={22} className="text-slate-400 group-hover:text-[var(--viola)]" />
                               <span className="font-bold text-sm">{cmd.label}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div>
                       <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Settings & Account</p>
                       <div className="space-y-1">
                          <div onClick={() => { router.push('/dashboard/settings'); setIsCommandPaletteOpen(false); }} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--blush)]/20 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                             <Gear size={22} className="text-slate-400 group-hover:text-[var(--viola)]" />
                             <span className="font-bold text-sm">Account Settings</span>
                          </div>
                          <div onClick={() => { router.push('/auth/login'); setIsCommandPaletteOpen(false); }} className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors cursor-pointer group">
                             <SignOut size={22} className="text-slate-400 group-hover:text-red-500" />
                             <span className="font-bold text-sm">Logout</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}
