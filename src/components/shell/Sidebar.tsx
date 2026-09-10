'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GraduationCap,
  Dumbbell,
  Wallet,
  CalendarCheck,
  Code2,
  Compass,
  Sparkles,
  Bell,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badge?: string;
}

const primaryNavItems: NavItem[] = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: LayoutDashboard,
    accentColor: 'text-blue-500 group-hover:text-blue-400',
  },
  {
    name: 'Study',
    href: '/study',
    icon: GraduationCap,
    accentColor: 'text-blue-500 group-hover:text-blue-400',
    badge: 'Exam in 4d',
  },
  {
    name: 'Fitness',
    href: '/fitness',
    icon: Dumbbell,
    accentColor: 'text-emerald-500 group-hover:text-emerald-400',
    badge: '35m Push',
  },
  {
    name: 'Finance',
    href: '/finance',
    icon: Wallet,
    accentColor: 'text-green-500 group-hover:text-green-400',
  },
  {
    name: 'Planner',
    href: '/planner',
    icon: CalendarCheck,
    accentColor: 'text-amber-500 group-hover:text-amber-400',
    badge: '3 Due',
  },
  {
    name: 'SkillForge',
    href: '/skills',
    icon: Code2,
    accentColor: 'text-indigo-500 group-hover:text-indigo-400',
    badge: '68%',
  },
  {
    name: 'Navigate',
    href: '/navigate',
    icon: Compass,
    accentColor: 'text-cyan-500 group-hover:text-cyan-400',
  },
  {
    name: 'AI Core',
    href: '/ai',
    icon: Sparkles,
    accentColor: 'text-violet-500 group-hover:text-violet-400',
  },
];

const bottomNavItems: NavItem[] = [
  {
    name: 'Notifications',
    href: '/notifications',
    icon: Bell,
    accentColor: 'text-gray-400',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    accentColor: 'text-gray-400',
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
    accentColor: 'text-gray-400',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-nexus-light-border dark:border-nexus-dark-border bg-white/70 dark:bg-nexus-dark-card/60 backdrop-blur-xl transition-all duration-300 z-30 sticky top-0 h-screen select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-nexus-light-border/60 dark:border-nexus-dark-border/60">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <NexusOrb size="sm" state="idle" />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                NEXUS
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-gray-400 dark:text-gray-500">
                Student OS
              </span>
            </div>
          )}
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1.5 rounded-btn text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="px-2 mb-2">
          {!isCollapsed ? (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Command Modules
            </span>
          ) : (
            <div className="h-2" />
          )}
        </div>

        {primaryNavItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-all duration-200 relative ${
                isActive
                  ? 'bg-blue-50/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-subtle-sm font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : item.accentColor
                  }`}
                />
              </div>

              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold truncate ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700/60'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-blue-600 dark:bg-blue-500" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-nexus-light-border/60 dark:border-nexus-dark-border/60 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2 rounded-btn text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200" />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}

        {/* Demo Mode Badge */}
        {!isCollapsed && (
          <div className="mt-2 pt-2 px-2 border-t border-gray-200/50 dark:border-gray-800/50 flex items-center gap-2 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Demo Session Active</span>
          </div>
        )}
      </div>
    </aside>
  );
}

