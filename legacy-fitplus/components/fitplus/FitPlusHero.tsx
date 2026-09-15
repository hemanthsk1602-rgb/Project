'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Dumbbell,
  Activity,
  ShieldCheck,
  Target,
  ArrowRight,
  Zap,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Flame,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

const ATHLETE_IMAGE_URL = 'https://cdn.jiro.build/Sumon/hero%2011%20orbit.png';

interface HotspotConfig {
  id: string;
  title: string;
  subtitle: string;
  dotX: number; // percentage
  dotY: number; // percentage
  labelX: number; // percentage
  labelY: number; // percentage
  svgPath: string;
  delay: number;
}

const HOTSPOTS: HotspotConfig[] = [
  {
    id: 'shoulder',
    title: 'Upper-Body Power',
    subtitle: 'Shoulder & Deltoid Development',
    dotX: 43,
    dotY: 28,
    labelX: 25,
    labelY: 24,
    svgPath: 'M 25 24 C 32 24, 38 26, 43 28',
    delay: 1.2,
  },
  {
    id: 'chest',
    title: 'Push Strength',
    subtitle: 'Chest & Triceps Hypertrophy',
    dotX: 53,
    dotY: 34,
    labelX: 72,
    labelY: 30,
    svgPath: 'M 72 30 C 64 30, 58 32, 53 34',
    delay: 1.6,
  },
  {
    id: 'core',
    title: 'Core Stability',
    subtitle: 'Functional Kinetic Chain',
    dotX: 49,
    dotY: 46,
    labelX: 27,
    labelY: 48,
    svgPath: 'M 27 48 C 36 48, 42 47, 49 46',
    delay: 2.0,
  },
  {
    id: 'legs',
    title: 'Lower-Body Drive',
    subtitle: 'Quad & Hamstring Power',
    dotX: 47,
    dotY: 67,
    labelX: 70,
    labelY: 69,
    svgPath: 'M 70 69 C 60 69, 53 68, 47 67',
    delay: 2.4,
  },
];

const SOCIAL_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
];

export function FitPlusHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#07090E] text-white min-h-screen selection:bg-[#D5FF3E] selection:text-black">
      {/* 1. ATHLETE BACKGROUND WITH CINEMATIC GRADIENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Full-bleed athlete picture */}
        <div className="relative w-full h-full min-h-[900px] lg:min-h-[1100px]">
          <img
            src={ATHLETE_IMAGE_URL}
            alt="FitPlus Athletic Performance"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-55 lg:opacity-75 scale-105"
          />
        </div>

        {/* Ambient Dark Gradients for Guaranteed Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090E]/80 via-transparent to-[#07090E]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#07090E]/40 to-[#07090E]" />

        {/* Electric Lime Ambient Glow Spotlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D5FF3E]/5 blur-[140px] rounded-full pointer-events-none" />
      </div>

      {/* 2. TOP NAVIGATION BAR */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#D5FF3E] flex items-center justify-center shadow-lg shadow-[#D5FF3E]/20 transition-transform group-hover:scale-105">
            <Zap className="w-5 h-5 text-black fill-black" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-outfit font-black text-xl tracking-tight text-white">
              FIT<span className="text-[#D5FF3E]">PLUS</span>
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-white/10 text-slate-300 border border-white/15">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 shadow-xl shadow-black/30">
          <Link
            href="/workout"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Training
          </Link>
          <Link
            href="/nutrition"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Nutrition
          </Link>
          <Link
            href="/ai-coach"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            AI Coach
          </Link>
          <Link
            href="/progress"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Progress
          </Link>
          <a
            href="#why-fitplus"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Why FitPlus
          </a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/onboarding"
            className="px-6 py-2.5 rounded-full text-xs font-bold bg-white text-black hover:bg-[#D5FF3E] hover:text-black transition-all shadow-lg hover:shadow-[#D5FF3E]/20"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden relative z-40 mx-4 mt-2 p-5 rounded-3xl bg-[#0F131D]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-4"
        >
          <nav className="flex flex-col space-y-2 text-sm font-semibold">
            <Link
              href="/workout"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-200"
            >
              🏋️ Workout Program
            </Link>
            <Link
              href="/nutrition"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-200"
            >
              🥗 Nutrition Tracker
            </Link>
            <Link
              href="/ai-coach"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-200"
            >
              🤖 AI Fitness Coach
            </Link>
            <Link
              href="/progress"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-200"
            >
              📊 Progress Analytics
            </Link>
            <a
              href="#why-fitplus"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-200"
            >
              ⚡ Why FitPlus?
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full text-center text-xs font-bold bg-[#D5FF3E] text-black shadow-lg shadow-[#D5FF3E]/20"
            >
              Get Started Free
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full text-center text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10"
            >
              Open Dashboard
            </Link>
          </div>
        </motion.div>
      )}

      {/* 3. DESKTOP INTERACTIVE HOTSPOT SYSTEM (hidden lg:block) */}
      <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
        {/* SVG Drawing Layer for Connector Lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {HOTSPOTS.map((spot) => (
            <motion.path
              key={`line-${spot.id}`}
              d={spot.svgPath}
              fill="none"
              stroke="rgba(213, 255, 62, 0.45)"
              strokeWidth="0.18"
              strokeDasharray="0.6 0.6"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.2,
                delay: spot.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>

        {/* Hotspot Markers & Labels */}
        {HOTSPOTS.map((spot) => (
          <React.Fragment key={spot.id}>
            {/* Glowing Biomechanical Body Dot */}
            <div
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${spot.dotX}%`, top: `${spot.dotY}%` }}
            >
              <motion.div
                initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: spot.delay - 0.2 }}
                className="relative group cursor-pointer"
              >
                {/* Outer Glow Ring */}
                <div className="w-5 h-5 rounded-full bg-[#D5FF3E]/25 animate-ping absolute -inset-0.5" />
                {/* Center Core Dot */}
                <div className="w-4 h-4 rounded-full bg-white border-2 border-[#D5FF3E] shadow-[0_0_15px_#D5FF3E] relative z-10 transition-transform group-hover:scale-125" />
              </motion.div>
            </div>

            {/* Glassmorphic Hotspot Annotation Card */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: spot.delay + 0.4 }}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${spot.labelX}%`, top: `${spot.labelY}%` }}
            >
              <div className="px-3.5 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/60 min-w-[170px] hover:border-[#D5FF3E]/50 transition-colors">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D5FF3E]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5FF3E]">
                    {spot.title}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200">{spot.subtitle}</p>
              </div>
            </motion.div>
          </React.Fragment>
        ))}
      </div>

      {/* 4. MAIN HERO CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20 lg:pb-36 flex flex-col items-center text-center">
        {/* Inline Glassmorphic Icon Cluster */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 p-1.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl mb-8"
        >
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-[#D5FF3E] border border-white/10 hover:scale-110 hover:bg-[#D5FF3E]/20 transition-all cursor-pointer group">
            <Dumbbell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-cyan-400 border border-white/10 hover:scale-110 hover:bg-cyan-400/20 transition-all cursor-pointer group">
            <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 border border-white/10 hover:scale-110 hover:bg-emerald-400/20 transition-all cursor-pointer group">
            <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-amber-400 border border-white/10 hover:scale-110 hover:bg-amber-400/20 transition-all cursor-pointer group">
            <Target className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </div>
          <div className="pr-4 pl-1 hidden sm:flex items-center gap-2 border-l border-white/10 ml-1">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D5FF3E] animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">
              AI Biomechanical Adaptation
            </span>
          </div>
        </motion.div>

        {/* Editorial Headline */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl space-y-3"
        >
          <h1 className="font-outfit text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-white">
            Transform Your Body. <br />
            <span className="bg-gradient-to-r from-white via-slate-200 to-[#D5FF3E] bg-clip-text text-transparent">
              Build Your Best Self.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Personalized workouts, precision nutrition guidance, and intelligent recovery tracking
            synthesized dynamically around your schedule and physical progression.
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black font-extrabold text-sm md:text-base flex items-center justify-center gap-3 shadow-xl shadow-[#D5FF3E]/20 hover:shadow-[#D5FF3E]/40 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start Training Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <a
            href="#why-fitplus"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold text-sm md:text-base flex items-center justify-center gap-2 backdrop-blur-xl transition-all"
          >
            <span>Explore FitPlus</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Social Proof + Athlete Badges */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 p-3 px-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
        >
          {/* Overlapping Avatar Stack */}
          <div className="flex -space-x-3 overflow-hidden">
            {SOCIAL_AVATARS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="FitPlus Athlete"
                className="inline-block h-9 w-9 rounded-full ring-2 ring-[#07090E] object-cover"
              />
            ))}
          </div>

          <div className="text-center sm:text-left text-xs">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-[#D5FF3E]">
              {'★'.repeat(5)}
              <span className="font-bold text-white ml-1">4.9 / 5.0</span>
            </div>
            <p className="text-slate-400 mt-0.5">
              Over <strong className="text-white">12,000+ athletes</strong> training smarter with
              FitPlus AI
            </p>
          </div>
        </motion.div>

        {/* 5. FLOATING AI COACH CARD (Desktop bottom-right / ambient) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="hidden xl:block absolute bottom-12 right-12 max-w-xs text-left"
        >
          <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 space-y-2 hover:border-[#D5FF3E]/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#D5FF3E]/15 text-[#D5FF3E]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white">FitPlus AI Coach</span>
              </div>
              <span className="text-[10px] font-semibold text-[#D5FF3E] uppercase tracking-wider bg-[#D5FF3E]/10 px-2 py-0.5 rounded-full border border-[#D5FF3E]/20">
                Live Insights
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;Upper body volume calibrated: Upper Chest & Delts primed for progressive overload today.&quot;
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> +12% Recovery
              </span>
              <span>4 Sets Planned</span>
            </div>
          </div>
        </motion.div>

        {/* 6. FLOATING STAT PILL (Desktop bottom-left) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="hidden xl:block absolute bottom-12 left-12 max-w-xs text-left"
        >
          <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Hyper-Adaptive Split</span>
                <span className="text-[10px] text-slate-400">Gym • Calisthenics • Hybrid</span>
              </div>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#D5FF3E] h-full w-4/5 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

