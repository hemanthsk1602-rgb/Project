'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Dumbbell,
  Wallet,
  CalendarCheck,
  Code2,
  Compass,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  Cpu,
  Layers,
  ChevronRight,
  Activity,
  Award,
} from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function LandingPage() {
  const modules = [
    {
      name: 'Study Hub',
      desc: 'Smart subject tracking, exam countdowns, attendance forecasting, and AI PDF RAG notes.',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Blue Accent',
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      name: 'Fitness Hub',
      desc: 'Adaptive workout regimens (Gym, Calisthenics, Home) dynamically adjusted for exam pressure.',
      icon: Dumbbell,
      color: 'from-emerald-600 to-green-600',
      badge: 'Green Accent',
      textColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      name: 'Finance Hub',
      desc: 'Student-friendly monthly burn rate tracking, daily safe-spend limits, and mess vs food delivery analytics.',
      icon: Wallet,
      color: 'from-green-600 to-emerald-600',
      badge: 'Emerald Accent',
      textColor: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      name: 'Productivity Planner',
      desc: 'Linear-style prioritized tasks, Pomodoro sprint cycles, and habit streak counters built for academic life.',
      icon: CalendarCheck,
      color: 'from-amber-600 to-orange-600',
      badge: 'Amber Accent',
      textColor: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      name: 'SkillForge',
      desc: 'Technical career readiness score, interactive skill tree graphs, and coding challenge tracking.',
      icon: Code2,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Indigo Accent',
      textColor: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
    {
      name: 'Student Navigate',
      desc: 'Provider-abstracted campus routes, university shuttle schedules, and metro fare estimation.',
      icon: Compass,
      color: 'from-cyan-600 to-blue-600',
      badge: 'Cyan Accent',
      textColor: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-nexus-light-bg dark:bg-nexus-dark-bg text-nexus-light-text dark:text-nexus-dark-text selection:bg-violet-600 selection:text-white transition-colors duration-200 overflow-x-hidden">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-nexus-dark-bg/70 backdrop-blur-xl border-b border-nexus-light-border/70 dark:border-nexus-dark-border/70">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <NexusOrb size="sm" state="idle" />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                NEXUS
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-gray-400">
                Student OS
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="#cross-module" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Cross-Module AI
            </Link>
            <Link href="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Architecture
            </Link>
            <Link href="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Plans
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 rounded-btn transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 rounded-btn bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-xs md:text-sm font-bold shadow-button-primary transition-all duration-200 hover:scale-[1.02]"
            >
              <span>Launch OS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center bg-nexus-grid">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/15 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Pill Announcement */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-200/70 dark:border-violet-800/50 text-xs font-semibold text-violet-700 dark:text-violet-300 mb-8 shadow-xs animate-in fade-in slide-in-from-top-4 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
          <span>NEXUS Phase 1 Foundation Live</span>
          <span className="w-1 h-1 rounded-full bg-violet-400" />
          <span className="text-gray-400 font-normal">Student Intelligence Architecture</span>
        </div>

        {/* Central Orb Animation */}
        <div className="mb-8">
          <NexusOrb size="xl" state="thinking" showBadge />
        </div>

        {/* Hero Title & Tagline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight max-w-5xl leading-[1.1] text-gray-900 dark:text-white">
          Your life. Your learning. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Your future. Connected.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
          The first unified AI-powered operating system built specifically for students.
          Harmonizing study deadlines, gym recovery, monthly budgets, coding skills, and campus navigation through central cross-module intelligence.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-3.5 rounded-btn bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:opacity-95 text-white font-bold text-sm md:text-base shadow-button-primary hover:shadow-button-primary-hover transition-all flex items-center justify-center gap-2"
          >
            <span>Open Student Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-7 py-3.5 rounded-btn bg-white dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700/80 text-gray-900 dark:text-gray-100 font-semibold text-sm md:text-base border border-gray-200 dark:border-gray-700 shadow-subtle-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Complete Student Onboarding</span>
          </Link>
        </div>

        {/* Strict Honesty Notice */}
        <p className="mt-4 text-[11px] text-gray-400 dark:text-gray-500">
          * Strictly follows real API architecture. Runs with sample student data when external providers are unconfigured.
        </p>
      </section>

      {/* 3. CROSS-MODULE INTELLIGENCE SHOWCASE (CORE DIFFERENTIATOR) */}
      <section id="cross-module" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-wider text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-3 py-1 rounded-full">
            The NEXUS Differentiator
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
            Not just a dashboard. <br />
            An operating system that connects dots.
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-400">
            Traditional tools treat study, fitness, and finance as isolated silos.
            NEXUS understands how an exam tomorrow affects tonight's workout, your monthly budget, and your career roadmap.
          </p>
        </div>

        {/* Interactive Scenario Card */}
        <div className="rounded-card-lg p-6 md:p-10 bg-gradient-to-br from-violet-500/10 via-white/80 to-blue-500/10 dark:from-violet-950/40 dark:via-nexus-dark-card/90 dark:to-blue-950/30 border border-violet-200 dark:border-violet-800/60 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                <Zap className="w-4 h-4" />
                <span>Live Cross-Module Scenario</span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                Exam Load vs Fitness & Budget Synthesis
              </h3>

              <div className="p-4 rounded-xl bg-white/80 dark:bg-black/40 border border-violet-200/60 dark:border-violet-800/40 font-mono text-xs md:text-sm text-gray-800 dark:text-gray-200 leading-relaxed shadow-sm">
                <span className="text-violet-600 dark:text-violet-400 font-bold block mb-1">
                  NEXUS Assistant Output:
                </span>
                "You have a <strong>Data Structures & DBMS exam in 4 days</strong>, so I've reduced today's workout to <strong>35 minutes</strong> and moved your SkillForge coding challenge to tomorrow evening. You also have <strong>₹800 remaining</strong> in your monthly budget."
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40">
                  <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">Study</span>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">Priority Revision</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Fitness</span>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">Reduced 35m Push</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900/40">
                  <span className="text-[10px] uppercase font-bold text-green-600 dark:text-green-400">Finance</span>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">₹800 Burn Guard</p>
                </div>
                <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">SkillForge</span>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">Rescheduled DSA</p>
                </div>
              </div>
            </div>

            <div className="shrink-0 p-6 rounded-2xl bg-white dark:bg-nexus-dark-card border border-gray-200 dark:border-gray-800 shadow-md text-center max-w-xs">
              <NexusOrb size="lg" state="speaking" />
              <h4 className="font-heading font-bold text-sm text-gray-900 dark:text-white mt-4">
                Adaptive AI Orchestrator
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Constantly evaluates 44+ student data models to resolve conflicting demands on your time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 6 LIFE MODULES GRID */}
      <section id="features" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full">
            Unified Ecosystem
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
            Six Pillars of Student Excellence
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-400">
            Crafted with intentional color palettes, dedicated schemas, and clean architectural separation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.name}
                className={`p-6 rounded-card bg-white dark:bg-nexus-dark-card border ${m.borderColor} shadow-card dark:shadow-card-dark hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${m.bgColor} ${m.textColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${m.bgColor} ${m.textColor}`}>
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                    {m.name}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs font-semibold text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                  <Link href="/dashboard" className="flex items-center gap-1">
                    <span>Explore Module</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ARCHITECTURE & HONESTY PRINCIPLES */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-nexus-light-border/80 dark:border-nexus-dark-border/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-full">
              Non-Negotiable Standard
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
              Never Fake Functionality.
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Every external integration follows a strict Provider Interface pattern:
              <br />
              <code className="mt-2 inline-block px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs text-blue-600 dark:text-blue-400">
                Frontend → Service Layer → Provider Interface → External Provider
              </code>
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>PostgreSQL Row Level Security:</strong> 44+ tables completely protected; students never see another user's data.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Explicit Demo Identifiers:</strong> Unconfigured APIs explicitly signal DEMO MODE with transparent notices.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Zero Fake ETAs:</strong> Maps & Transit services isolate live APIs from mock campus schedules.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 md:p-8 rounded-card-lg bg-gray-900 text-white font-mono text-xs shadow-2xl border border-gray-800">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[11px]">nexus.architecture.ts</span>
              </div>
              <span className="text-[10px] uppercase text-emerald-400 font-bold">RLS Validated</span>
            </div>
            <pre className="mt-4 overflow-x-auto text-gray-300 leading-relaxed">
{`// 1. Provider Pattern Abstraction
interface AIProvider {
  generateChat(messages, options): Promise<AIResponse>;
}

// 2. Strict RLS on every user-owned table
CREATE POLICY "Users access own data only"
ON public.tasks FOR ALL
USING (auth.uid() = user_id);

// 3. Transparent Development State
export const isDemoMode = !isSupabaseConfigured();`}
            </pre>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <div className="p-8 md:p-14 rounded-card-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
              Ready to connect your life, learning, and future?
            </h2>
            <p className="text-sm md:text-base text-blue-100 leading-relaxed">
              Launch the NEXUS Command Center right now in development demo mode, or connect your Supabase database to start fresh.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-btn bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Launch Dashboard
              </Link>
              <Link
                href="/onboarding"
                className="w-full sm:w-auto px-8 py-3.5 rounded-btn bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold transition-colors"
              >
                Start Onboarding
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-10 border-t border-nexus-light-border/80 dark:border-nexus-dark-border/80 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <NexusOrb size="sm" state="idle" />
            <span className="font-heading font-bold text-sm text-gray-900 dark:text-gray-100">
              NEXUS
            </span>
            <span className="text-gray-400">© 2026. Built with Next.js, Supabase & AI.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/portfolio" className="hover:text-blue-500 transition-colors">
              Developer Portfolio
            </Link>
            <Link href="/features" className="hover:text-blue-500 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-blue-500 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-blue-500 transition-colors">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
