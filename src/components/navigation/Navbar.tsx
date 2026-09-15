'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Code2, 
  Map, 
  Trophy, 
  Sparkles, 
  BarChart3, 
  Search, 
  Menu, 
  X, 
  Play, 
  User, 
  ChevronRight,
  Flame,
  Bot
} from 'lucide-react';
import { CommandPalette } from './CommandPalette';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // If in practice mode, use IDENavbar instead
  if (pathname?.startsWith('/practice')) {
    return null;
  }

  const navLinks = [
    { name: 'Problems', href: '/problems', icon: Code2 },
    { name: 'Roadmap', href: '/roadmap', icon: Map },
    { name: 'Arena', href: '/arena', icon: Trophy, badge: 'LIVE' },
    { name: 'AI Review', href: '/ai-review', icon: Sparkles },
    { name: 'AI Tutor', href: '/ai-tutor', icon: Bot },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#090D16]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold font-mono shadow-glow-brand group-hover:scale-105 transition-transform duration-200">
                CA
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-white font-mono text-base group-hover:text-brand-400 transition-colors">
                  CODEARENA
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider -mt-1">
                  THINK. CODE. IMPROVE.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all relative ${
                      isActive
                        ? 'text-white bg-white/[0.08]'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {link.name}
                      {link.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono animate-pulse">
                          {link.badge}
                        </span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span>Search problems...</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-zinc-400">
                Ctrl K
              </kbd>
            </button>

            {/* Daily Streak Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>87d</span>
            </div>

            {/* Practice CTA */}
            <Link
              href="/practice/two-sum"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-all duration-150"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Practice IDE</span>
            </Link>

            {/* Profile Avatar Pill */}
            <Link
              href="/profile"
              className={`p-1 rounded-full border transition-all ${
                pathname === '/profile'
                  ? 'border-brand-500 ring-2 ring-brand-500/30'
                  : 'border-white/10 hover:border-white/30'
              }`}
              title="Developer Profile"
            >
              <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-300">
                HS
              </div>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-zinc-400 hover:text-zinc-200"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Sheet */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 bg-[#090D16] px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    pathname === link.href
                      ? 'bg-brand-500/20 text-white border border-brand-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge ? (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono">
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center gap-3">
              <Link
                href="/practice/two-sum"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-brand-500 text-white text-sm font-semibold"
              >
                <Play className="w-4 h-4 fill-white" />
                Practice IDE
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-zinc-300 text-sm font-medium border border-white/10"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

