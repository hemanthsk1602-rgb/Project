'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown, 
  Flame, 
  Bot, 
  Zap, 
  Sun, 
  Moon, 
  LogOut, 
  LogIn 
} from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const aiMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Global keydown listener for "/" or "Ctrl+K"
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputActive =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.classList.contains('monaco-editor');

      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !isInputActive && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [searchOpen]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (aiMenuRef.current && !aiMenuRef.current.contains(e.target as Node)) {
        setAiMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setAiMenuOpen(false);
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // If in practice mode, the specialized IDENavbar is used instead
  if (pathname?.startsWith('/practice')) {
    return null;
  }

  // If on login page, render nothing from standard navbar (it has its own streamlined header)
  if (pathname === '/login') {
    return null;
  }

  const isAiActive = pathname?.startsWith('/ai-');

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#090D16]/95 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Brand + Primary Clean Navigation */}
          <div className="flex items-center gap-10">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group select-none">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold font-mono text-xs group-hover:border-brand-500/60 group-hover:scale-105 transition-all duration-200">
                CA
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-white font-mono text-sm group-hover:text-zinc-200 transition-colors">
                  CODEARENA
                </span>
                <span className="text-[9px] text-zinc-500 font-mono tracking-widest -mt-0.5">
                  THINK. CODE. IMPROVE.
                </span>
              </div>
            </Link>

            {/* Streamlined Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
              <Link
                href="/problems"
                className={`transition-colors py-1 ${
                  pathname === '/problems'
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Problems
              </Link>

              <Link
                href="/roadmap"
                className={`transition-colors py-1 ${
                  pathname === '/roadmap'
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Roadmap
              </Link>

              <Link
                href="/arena"
                className={`transition-colors py-1 flex items-center gap-1.5 ${
                  pathname === '/arena'
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>Arena</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" title="Live rated round active" />
              </Link>

              {/* AI Dropdown Menu */}
              <div className="relative" ref={aiMenuRef}>
                <button
                  onClick={() => setAiMenuOpen(!aiMenuOpen)}
                  className={`flex items-center gap-1 py-1 transition-colors ${
                    isAiActive || aiMenuOpen
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-400" />
                    <span>AI</span>
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${aiMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {aiMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 rounded-xl bg-[#0B0F19] border border-white/[0.1] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <Link
                      href="/ai-review"
                      className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                        pathname === '/ai-review'
                          ? 'bg-white/[0.08] text-white'
                          : 'hover:bg-white/[0.04] text-zinc-300'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-md bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0 mt-0.5">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">AI Code Review</div>
                        <div className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                          Asymptotic Big-O analyzer & optimal code refactoring
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/ai-tutor"
                      className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors mt-1 ${
                        pathname === '/ai-tutor'
                          ? 'bg-white/[0.08] text-white'
                          : 'hover:bg-white/[0.04] text-zinc-300'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">AI Socratic Tutor</div>
                        <div className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                          Interactive curriculum dialogue, hints & concept quizzes
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right: Search + Streak + Theme Toggle + Start Coding + User Profile Menu */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <span>Search...</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-zinc-400">
                /
              </kbd>
            </button>

            {/* Streak Indicator */}
            <div 
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium select-none"
              title="Consecutive daily problem solving streak"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{user?.streak || 87}d</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-zinc-600" />
              )}
            </button>

            {/* Primary Action Button */}
            <Link
              href="/practice/two-sum"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-all duration-150 hover:translate-y-[-1px]"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Practice IDE</span>
            </Link>

            {/* Profile User Dropdown or Sign In */}
            {isAuthenticated && user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full hover:bg-white/5 transition-colors border border-white/10"
                  title="Account Menu"
                >
                  <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center">
                    {user.avatar || 'HS'}
                  </div>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-[#0B0F19] border border-white/[0.1] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {/* User Profile Header */}
                    <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                      <div className="font-semibold text-xs text-white">{user.name}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">@{user.username} • Level {user.level}</div>
                    </div>

                    <div className="space-y-0.5">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Developer Profile</span>
                      </Link>

                      <Link
                        href="/analytics"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Performance Analytics</span>
                      </Link>

                      <Link
                        href="/leaderboard"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                      >
                        <Trophy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Global Leaderboards</span>
                      </Link>
                    </div>

                    <div className="mt-1 pt-1 border-t border-white/[0.06] space-y-0.5">
                      <button
                        onClick={() => {
                          logout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.1] hover:bg-white/[0.05] text-xs font-medium text-white transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-brand-400" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger & Theme Toggle Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="p-2 text-zinc-400 hover:text-zinc-200"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-zinc-400 hover:text-zinc-200"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.08] bg-[#090D16] px-4 pt-4 pb-6 space-y-4">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-1">
                Core Platform
              </div>
              <Link
                href="/problems"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5"
              >
                <Code2 className="w-4 h-4 text-zinc-400" />
                <span>Problem Explorer</span>
              </Link>
              <Link
                href="/roadmap"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5"
              >
                <Map className="w-4 h-4 text-zinc-400" />
                <span>DSA Roadmap</span>
              </Link>
              <Link
                href="/arena"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5"
              >
                <Trophy className="w-4 h-4 text-zinc-400" />
                <span>Competitive Arena</span>
              </Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/[0.06]">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-1">
                AI Intelligence
              </div>
              <Link
                href="/ai-review"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5"
              >
                <Zap className="w-4 h-4 text-brand-400" />
                <span>AI Code Review</span>
              </Link>
              <Link
                href="/ai-tutor"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>AI Socratic Tutor</span>
              </Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/[0.06]">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-1">
                Developer Account
              </div>
              {isAuthenticated && user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5"
                  >
                    <User className="w-4 h-4 text-zinc-400" />
                    <span>Developer Résumé (@{user.username})</span>
                  </Link>
                  <Link
                    href="/analytics"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5"
                  >
                    <BarChart3 className="w-4 h-4 text-zinc-400" />
                    <span>Performance Analytics</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-brand-300 hover:text-white hover:bg-white/5"
                >
                  <LogIn className="w-4 h-4 text-brand-400" />
                  <span>Sign In to Workstation</span>
                </Link>
              )}
            </div>

            <div className="pt-3 border-t border-white/[0.08]">
              <Link
                href="/practice/two-sum"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-500 text-white text-xs font-semibold shadow-glow-brand"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Launch Practice IDE</span>
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
