'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Home,
  BookOpen,
  GraduationCap,
  Trophy,
  Calendar,
  User,
  Users,
  MessageSquare,
  CreditCard,
  FileText,
  Search,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  BarChart3,
  Settings,
  BookMarked,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/Logo';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navByRole: Record<string, NavItem[]> = {
  student: [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'My Tracks', href: '/dashboard/tracks', icon: BookOpen },
    { label: 'Practice', href: '/dashboard/practice', icon: GraduationCap },
    { label: 'Achievements', href: '/dashboard/achievements', icon: Trophy },
    { label: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
  ],
  parent: [
    { label: 'Overview', href: '/parent', icon: Home },
    { label: 'Children', href: '/parent/children', icon: Users },
    { label: 'Schedule', href: '/parent/schedule', icon: Calendar },
    { label: 'Messages', href: '/parent/messages', icon: MessageSquare },
    { label: 'Billing', href: '/parent/billing', icon: CreditCard },
    { label: 'Reports', href: '/parent/reports', icon: FileText },
  ],
  coach: [
    { label: 'Dashboard', href: '/coach', icon: Home },
    { label: 'Sessions', href: '/coach/sessions', icon: Calendar },
    { label: 'Notes', href: '/coach/notes', icon: FileText },
    { label: 'Schedule', href: '/coach/schedule', icon: Calendar },
  ],
  admin: [
    { label: 'Overview', href: '/admin', icon: Home },
    { label: 'Approvals', href: '/admin/approvals', icon: UserCheck },
    { label: 'Students', href: '/admin/students', icon: Users },
    { label: 'Coaches', href: '/admin/coaches', icon: GraduationCap },
    { label: 'Revenue', href: '/admin/revenue', icon: BarChart3 },
    { label: 'Curriculum', href: '/admin/curriculum', icon: BookMarked },
    { label: 'Sessions', href: '/admin/sessions', icon: Calendar },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ],
};

function getMobileNav(role: string): NavItem[] {
  const items = navByRole[role] ?? navByRole.student;
  return items.slice(0, 5);
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/dashboard' || href === '/parent' || href === '/coach' || href === '/admin') {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'parent' | 'coach' | 'admin';
  userName: string;
  userAvatar?: string | null;
}

export function DashboardLayout({
  children,
  role,
  userName,
  userAvatar,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    // Client-side sign out first (clears local auth state)
    const supabase = createClient();
    await supabase.auth.signOut();
    // Then hit the server route to clear server-side cookies
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/auth/signout';
    document.body.appendChild(form);
    form.submit();
  }

  const navItems = navByRole[role] ?? navByRole.student;
  const mobileNavItems = getMobileNav(role);
  const greeting = getGreeting();

  return (
    <div className="flex h-screen overflow-hidden bg-navy-dark">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-navy border-r border-white/5 transition-all duration-300 ${
          sidebarOpen ? 'w-56' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-3 h-16 border-b border-white/5">
          {sidebarOpen ? (
            <Link href="/" aria-label="Cognitron home">
              <Logo size="sm" on="dark" variant="full" />
            </Link>
          ) : (
            <Link href="/" aria-label="Cognitron home" className="mx-auto">
              <Logo size="sm" on="dark" variant="icon-only" />
            </Link>
          )}
          {sidebarOpen && (
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-light hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {!sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="mx-auto mt-3 text-slate-light hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Nav items */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                  active
                    ? 'bg-gold/10 text-gold font-semibold'
                    : 'text-slate-light hover:bg-white/5 hover:text-white'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    active ? 'text-gold' : 'group-hover:text-white'
                  }`}
                />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-2 pb-4 space-y-1">
          {sidebarOpen && (
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-2 rounded-lg bg-navy-light/50 text-slate-light text-sm hover:bg-navy-light hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search&hellip;</span>
              <kbd className="ml-auto text-[10px] text-slate bg-navy px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-light hover:bg-white/5 hover:text-coral transition-colors w-full ${
              sidebarOpen ? '' : 'justify-center'
            }`}
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between bg-navy/95 backdrop-blur-md border-b border-white/5 px-4 md:px-6 h-14">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-light hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <p className="text-sm text-white font-medium hidden sm:block">
            {greeting},{' '}
            <span className="text-gold">{userName.split(' ')[0]}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative text-slate-light hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full ring-2 ring-navy" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-full hover:bg-white/5 transition-colors p-1 pr-2"
              aria-label="Account menu"
            >
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gold/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center ring-2 ring-gold/20">
                  <span className="text-xs font-bold text-gold">
                    {getInitials(userName)}
                  </span>
                </div>
              )}
            </button>
          </div>
        </header>

        {/* Mobile slide-out nav with backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 top-14 z-20 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="md:hidden absolute top-14 left-0 right-0 z-30 bg-navy border-b border-white/10 px-4 py-3 space-y-0.5 shadow-2xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-gold/10 text-gold font-semibold'
                        : 'text-slate-light hover:bg-white/5 hover:text-white'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Scrollable content — light bg contrasts with dark chrome */}
        <main className="flex-1 overflow-y-auto bg-off-white md:rounded-tl-2xl p-4 md:p-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-md border-t border-white/10 flex items-center justify-around h-16 px-1"
        aria-label="Mobile navigation"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all ${
                active ? 'text-gold' : 'text-slate-light hover:text-white'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                className={`w-5 h-5 transition-transform ${active ? 'scale-110' : ''}`}
              />
              <span className={`text-[10px] ${active ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-gold" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
