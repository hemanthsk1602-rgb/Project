'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GraduationCap,
  CalendarCheck,
  Sparkles,
  Menu,
  X,
  Dumbbell,
  Wallet,
  Code2,
  Compass,
  Bell,
  Settings,
  User,
} from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';

export function MobileNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainItems = [
    { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Study', href: '/study', icon: GraduationCap },
    { name: 'Planner', href: '/planner', icon: CalendarCheck },
    { name: 'AI Core', href: '/ai', icon: Sparkles, isOrb: true },
  ];

  const moreItems = [
    { name: 'Fitness', href: '/fitness', icon: Dumbbell, desc: 'Workouts & recovery' },
    { name: 'Finance', href: '/finance', icon: Wallet, desc: 'Budget & spending' },
    { name: 'SkillForge', href: '/skills', icon: Code2, desc: 'Career & coding tree' },
    { name: 'Navigate', href: '/navigate', icon: Compass, desc: 'Campus & transit' },
    { name: 'Notifications', href: '/notifications', icon: Bell, desc: 'Alerts & reminders' },
    { name: 'Settings', href: '/settings', icon: Settings, desc: 'Preferences' },
    { name: 'Profile', href: '/profile', icon: User, desc: 'Student credentials' },
  ];

  return (
    <>
      {/* iOS-Style Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-nexus-dark-card/90 backdrop-blur-xl border-t border-nexus-light-border dark:border-nexus-dark-border px-3 py-1.5 flex items-center justify-around shadow-lg">
        {mainItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isOrb) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-3 flex flex-col items-center select-none"
              >
                <div className="p-1 rounded-full bg-white dark:bg-nexus-dark-card shadow-lg border border-violet-500/30">
                  <NexusOrb size="sm" state="idle" />
                </div>
                <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 mt-0.5">
                  AI Core
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors select-none ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{item.name}</span>
            </Link>
          );
        })}

        {/* More Toggle */}
        <button
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors select-none ${
            isMoreOpen
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          {isMoreOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </nav>

      {/* Expanded "More" Drawer for Mobile */}
      {isMoreOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col justify-end"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            className="bg-white dark:bg-nexus-dark-card rounded-t-2xl p-5 border-t border-nexus-light-border dark:border-nexus-dark-border max-h-[75vh] overflow-y-auto mb-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-gray-100">
                All Command Modules
              </h3>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-blue-50/80 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                        : 'border-gray-100 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{item.name}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{item.desc}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

