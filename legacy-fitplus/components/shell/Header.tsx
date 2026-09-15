'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles, LogOut, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface HeaderProps {
  onOpenCommand?: () => void;
}

export function Header({ onOpenCommand }: HeaderProps) {
  const { profile, isDemoMode, signOut } = useAuth();
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(now);
    setCurrentDate(formatted);
  }, []);

  return (
    <header className="h-16 px-4 md:px-8 border-b border-nexus-light-border/80 dark:border-nexus-dark-border/80 bg-white/70 dark:bg-nexus-dark-bg/70 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between transition-colors">
      {/* Left: Dynamic Greeting & Date */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-sm md:text-base font-heading font-bold text-nexus-light-text dark:text-nexus-dark-text flex items-center gap-2">
            <span>Welcome back, {profile?.fullName?.split(' ')[0] || 'Student'}</span>
            <span className="hidden sm:inline-block text-xs font-normal text-gray-400">
              ({profile?.courseName || 'B.Tech CS & AI'})
            </span>
          </h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
            {currentDate || 'Today'} • Semester {profile?.semester || 6}
          </p>
        </div>
      </div>

      {/* Right: Quick Search, Notifications, Demo Pill, Theme, Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommand}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-btn text-xs text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 border border-gray-200/60 dark:border-gray-700/60 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick search or ask AI...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded shadow-xs text-gray-500">
            ⌘K
          </kbd>
        </button>

        {/* AI Quick Prompt */}
        <Link
          href="/ai"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/50 hover:bg-violet-100 dark:hover:bg-violet-900/40 border border-violet-200/70 dark:border-violet-800/50 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
          <span>Ask NEXUS</span>
        </Link>

        {/* Demo Mode Pill */}
        {isDemoMode && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Demo Mode</span>
          </div>
        )}

        {/* Notifications */}
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative p-2 rounded-btn text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Avatar & Menu */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 p-[2px] shadow-sm hover:scale-105 transition-transform"
          >
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                profile?.fullName?.[0] || 'A'
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

