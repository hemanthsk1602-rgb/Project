'use client';

import React from 'react';
import Link from 'next/link';
import {
  Dumbbell,
  Activity,
  Flame,
  Zap,
  Target,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Heart,
  BarChart3,
  Utensils,
  Clock,
  RotateCcw,
  Bot,
  Brain,
  Layers,
  Scale,
  Smile,
} from 'lucide-react';
import { FitPlusHero } from '@/components/fitplus/FitPlusHero';

export default function FitPlusLandingPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-[#D5FF3E] selection:text-black">
      {/* 1. HERO SECTION (Jiro-inspired FitPlus Production Hero) */}
      <FitPlusHero />

      {/* 2. WHY FITPLUS? (Section ID for smooth scroll) */}
      <section id="why-fitplus" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5FF3E]/10 border border-[#D5FF3E]/30 text-[#D5FF3E] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>The FitPlus Difference</span>
          </div>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Stop Guessing. <br />
            <span className="text-slate-400">Train with Intelligent Purpose.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Standard fitness apps give everyone the same cookie-cutter PDF. FitPlus synthesizes
            workouts tailored to your discipline, available equipment, schedule, and fatigue.
          </p>
        </div>

        {/* 3 Training Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Style 1: Gym */}
          <div className="group p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#D5FF3E]/40 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🏋️
              </div>
              <h3 className="font-outfit text-2xl font-bold text-white">Gym Weightlifting</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Compound barbell powerlifting, dumbbell volume splits, and machine hypertrophy. FitPlus calculates progressive overload curves and rest intervals automatically.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E]" />
                <span>Barbell RPE & 1RM calculator</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E]" />
                <span>Push / Pull / Legs & Upper / Lower splits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E]" />
                <span>Automated weekly deload detection</span>
              </li>
            </ul>
          </div>

          {/* Style 2: Calisthenics */}
          <div className="group p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#D5FF3E]/40 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🤸
              </div>
              <h3 className="font-outfit text-2xl font-bold text-white">Calisthenics Mastery</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Build elite relative strength, gymnastic levers, and bodyweight control. Follow step-by-step progression trees from basic pushups to front levers and muscle-ups.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E]" />
                <span>Step-by-step skill tree unlocking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E]" />
                <span>Zero equipment / pull-up bar adaptations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E]" />
                <span>Isometric hold timers and tempo cues</span>
              </li>
            </ul>
          </div>

          {/* Style 3: Hybrid */}
          <div className="group p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#D5FF3E]/40 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🔀
              </div>
              <h3 className="font-outfit text-2xl font-bold text-white">Hybrid Athletic Split</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The ultimate synthesis. Build raw squat and deadlift power in the gym while mastering rings, dips, handstands, and explosive movement outdoors or at home.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E]" />
                <span>Weighted pull-up and dip overload</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E]" />
                <span>Combined barbell & gymnastic splits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E]" />
                <span>Agility, mobility, and power balance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. PERSONALIZED WORKOUTS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Adaptive Split Generation</span>
            </div>
            <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A Workout Routine That Evolves With Every Rep.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              When you hit 10 reps instead of 8, FitPlus records your velocity and automatically increments your recommended weight for next week. If fatigue strikes, your volume scales back to prevent overtraining.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 text-[#D5FF3E] mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Live Set-by-Set Logging</h4>
                  <p className="text-xs text-slate-400">Track reps, weight, and rest countdown timers with audio cues.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 text-cyan-400 mt-0.5">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instant Exercise Swaps</h4>
                  <p className="text-xs text-slate-400">Gym busy or equipment unavailable? Switch to an equivalent movement targeting the same muscle head in one tap.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 text-emerald-400 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Form Guidance & Cue Videos</h4>
                  <p className="text-xs text-slate-400">Clear cues on foot placement, grip width, breathing, and common safety mistakes.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/workout"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#D5FF3E] hover:underline"
              >
                <span>View Today&apos;s Workout Routine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive UI Mockup Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F131D] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5FF3E]">
                  Upper Body Hypertrophy
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">Barbell Bench Press</h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D5FF3E]/15 text-[#D5FF3E] border border-[#D5FF3E]/30">
                Set 3 of 4
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { set: 1, target: '70 kg × 10 reps', actual: '70 kg × 10 reps', status: 'Completed', rpe: 'RPE 7' },
                { set: 2, target: '75 kg × 8 reps', actual: '75 kg × 8 reps', status: 'Completed', rpe: 'RPE 8' },
                { set: 3, target: '80 kg × 6 reps', actual: '80 kg × 7 reps (PR!)', status: 'Active', rpe: 'RPE 9' },
                { set: 4, target: '80 kg × 6 reps', actual: 'Upcoming', status: 'Queued', rpe: 'RPE 9.5' },
              ].map((s) => (
                <div
                  key={s.set}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    s.status === 'Active'
                      ? 'bg-[#D5FF3E]/10 border-[#D5FF3E]/40 text-white font-bold'
                      : s.status === 'Completed'
                      ? 'bg-white/[0.02] border-white/10 text-slate-300'
                      : 'bg-transparent border-white/5 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-mono font-bold text-[11px]">
                      {s.set}
                    </span>
                    <span>{s.target}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-400">{s.rpe}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.status === 'Active' ? 'bg-[#D5FF3E] text-black' : s.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500'
                    }`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Rest Timer Pill */}
            <div className="mt-6 p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D5FF3E] animate-spin" />
                <span className="text-xs text-slate-300">Rest countdown between sets:</span>
              </div>
              <span className="font-mono text-base font-black text-[#D5FF3E]">01:45</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI FITNESS COACH SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* AI Chat Interaction Showcase */}
          <div className="order-2 lg:order-1 p-6 sm:p-8 rounded-3xl bg-[#0F131D] border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D5FF3E] to-emerald-400 flex items-center justify-center text-black shadow-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>FitPlus AI Coach</span>
                  <span className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-pulse" />
                </h4>
                <p className="text-[11px] text-slate-400">Contextualized to your 1RM, volume & fatigue</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {/* User message */}
              <div className="flex justify-end">
                <div className="p-3 rounded-2xl rounded-tr-none bg-[#D5FF3E] text-black font-semibold max-w-sm">
                  &quot;My left shoulder feels a bit tight during heavy bench press. What should I substitute today?&quot;
                </div>
              </div>

              {/* AI response */}
              <div className="flex justify-start">
                <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-slate-200 max-w-md space-y-2">
                  <p>
                    I reviewed your training history. Let&apos;s protect your anterior deltoid joint capsule today:
                  </p>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <p className="text-[#D5FF3E] font-bold">Recommended Replacement:</p>
                    <p className="text-slate-300">
                      Swap Flat Barbell Bench with <strong>Neutral-Grip Dumbbell Press (30° Incline)</strong> at 70% intensity, 4 sets of 10-12 reps.
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    I&apos;ve automatically updated today&apos;s routine and added 2 sets of rotator cuff band warmups.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/ai-coach"
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#D5FF3E]" />
                <span>Chat with FitPlus Coach Live</span>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Brain className="w-3.5 h-3.5" />
              <span>Intelligent Fitness Intelligence</span>
            </div>
            <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              An Elite Fitness Coach In Your Pocket 24/7.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Ask about biomechanics, meal prep, macronutrient timing, form correction, or plateau breakthroughs. FitPlus AI understands your full workout log and provides scientific advice instantly.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="text-xl">🎯</span>
                <h5 className="font-bold text-white text-xs mt-2">Form Checks</h5>
                <p className="text-[11px] text-slate-400 mt-1">Cues on bar path, pelvic tilt, and scapular retraction.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="text-xl">⚡</span>
                <h5 className="font-bold text-white text-xs mt-2">Fatigue Auto-Deload</h5>
                <p className="text-[11px] text-slate-400 mt-1">Detects CNS fatigue and prevents overtraining.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NUTRITION & MACROS TRACKING */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" />
            <span>Precision Fueling</span>
          </div>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Nutrition Engineered for Your Muscle Goals.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hit your daily protein target with 0 stress. Access a database of 500+ Indian and global fitness meals with calculated macros.
          </p>
        </div>

        {/* Nutrition Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 text-center">
            <span className="text-3xl">🍗</span>
            <h4 className="text-base font-bold text-white">Protein Target Engine</h4>
            <p className="text-xs text-slate-400">Calculates 1.8g – 2.2g per kg of bodyweight to guarantee optimal muscle protein synthesis.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 text-center">
            <span className="text-3xl">🥗</span>
            <h4 className="text-base font-bold text-white">Macro Ring Breakdown</h4>
            <p className="text-xs text-slate-400">Live visual rings for Protein, Complex Carbs, and Healthy Fats to balance workout energy.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 text-center">
            <span className="text-3xl">🍛</span>
            <h4 className="text-base font-bold text-white">Indian & Global Foods</h4>
            <p className="text-xs text-slate-400">Paneer, Dal, Chicken Breast, Eggs, Oats, Rice bowls, and protein shakes pre-configured.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 text-center">
            <span className="text-3xl">💧</span>
            <h4 className="text-base font-bold text-white">Hydration Tracker</h4>
            <p className="text-xs text-slate-400">Track 250ml increments to prevent cramping and maintain intracellular hydration.</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/nutrition"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
          >
            <span>Open Nutrition & Calorie Tracker</span>
            <ArrowRight className="w-4 h-4 text-[#D5FF3E]" />
          </Link>
        </div>
      </section>

      {/* 6. PROGRESS ANALYTICS & RECOVERY */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5FF3E]/10 border border-[#D5FF3E]/30 text-[#D5FF3E] text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Biometric & Volume Analytics</span>
            </div>
            <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Visualize Your Transformation Week Over Week.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every rep, pound lifted, and session completed feeds your progression graphs. Track your estimated 1RM growth, total weekly tonnage, and consistency streaks.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <span className="font-outfit text-2xl font-black text-[#D5FF3E] block">+18.5%</span>
                <span className="text-[11px] text-slate-400">Strength Gain</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <span className="font-outfit text-2xl font-black text-cyan-400 block">42,500</span>
                <span className="text-[11px] text-slate-400">kg Volume / Mo</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <span className="font-outfit text-2xl font-black text-emerald-400 block">94%</span>
                <span className="text-[11px] text-slate-400">Readiness Score</span>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <Link
                href="/progress"
                className="text-xs font-bold text-[#D5FF3E] hover:underline flex items-center gap-1.5"
              >
                <span>Explore Progress Metrics</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/recovery"
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <span>Check Muscle Recovery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Recovery Readiness Heatmap Mockup */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F131D] border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5FF3E]">
                  Recovery Assessment
                </span>
                <h4 className="text-lg font-bold text-white">Readiness: 94% Primed</h4>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#D5FF3E]/15 text-[#D5FF3E] flex items-center justify-center font-bold text-lg">
                94
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { muscle: 'Chest & Delts', status: 'Fully Recovered (100%)', color: 'bg-emerald-400' },
                { muscle: 'Upper Back & Lats', status: 'Ready for Heavy Load (92%)', color: 'bg-emerald-400' },
                { muscle: 'Quads & Hamstrings', status: 'Moderate Fatigue (75%)', color: 'bg-amber-400' },
                { muscle: 'Core & Lower Back', status: 'Fully Recovered (98%)', color: 'bg-emerald-400' },
              ].map((m) => (
                <div key={m.muscle} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${m.color}`} />
                    <span className="font-semibold text-white">{m.muscle}</span>
                  </div>
                  <span className="text-slate-400">{m.status}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 italic">
              &quot;Sleep quality recorded at 8.2 hours. Your central nervous system is fully primed for heavy compound lifts today.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* 7. ACHIEVEMENTS & GAMIFICATION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Gamified Consistency</span>
          </div>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Earn Badges. Level Up. Maintain Your Streak.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every workout completed earns XP. Unlock achievements from your first push-up to the 100kg deadlift milestone.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
          {[
            { icon: '🔥', title: '7-Day Streak', desc: 'Unbroken workout discipline', xp: '+250 XP' },
            { icon: '🏆', title: 'Century Club', desc: '100kg Barbell Deadlift', xp: '+500 XP' },
            { icon: '🤸', title: 'Gravity Defier', desc: '10 Clean Pull-Ups', xp: '+300 XP' },
            { icon: '⚡', title: 'Nutrition Master', desc: 'Hit protein target 5 days straight', xp: '+400 XP' },
          ].map((badge) => (
            <div
              key={badge.title}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D5FF3E]/40 text-center space-y-2 transition-all"
            >
              <span className="text-3xl block">{badge.icon}</span>
              <h5 className="font-bold text-white text-xs sm:text-sm">{badge.title}</h5>
              <p className="text-[11px] text-slate-400">{badge.desc}</p>
              <span className="inline-block text-[10px] font-bold text-[#D5FF3E] bg-[#D5FF3E]/10 px-2 py-0.5 rounded-full">
                {badge.xp}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION BANNER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-tr from-[#0F131D] via-[#151C2C] to-[#0F131D] border border-[#D5FF3E]/30 text-white shadow-2xl relative overflow-hidden space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#D5FF3E] text-black flex items-center justify-center mx-auto shadow-xl shadow-[#D5FF3E]/20 text-3xl">
            <Zap className="w-8 h-8 fill-black" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Build Your Best Physique?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join thousands of athletes training with adaptive workouts, precision nutrition, and AI coaching. Free to get started in 60 seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black font-extrabold text-sm sm:text-base shadow-xl shadow-[#D5FF3E]/20 hover:scale-105 active:scale-95 transition-all"
            >
              Start Training Free
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm sm:text-base transition-colors"
            >
              Open Live Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#D5FF3E] flex items-center justify-center text-black">
              <Zap className="w-4 h-4 fill-black" />
            </div>
            <span className="font-outfit font-black text-sm text-white tracking-tight">
              FIT<span className="text-[#D5FF3E]">PLUS</span>
            </span>
            <span className="text-slate-500">© 2026 FitPlus. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/workout" className="hover:text-white transition-colors">
              Workouts
            </Link>
            <Link href="/nutrition" className="hover:text-white transition-colors">
              Nutrition
            </Link>
            <Link href="/ai-coach" className="hover:text-white transition-colors">
              AI Coach
            </Link>
            <Link href="/progress" className="hover:text-white transition-colors">
              Progress
            </Link>
            <Link href="/recovery" className="hover:text-white transition-colors">
              Recovery
            </Link>
            <Link href="/achievements" className="hover:text-white transition-colors">
              Achievements
            </Link>
            <Link href="/onboarding" className="text-[#D5FF3E] hover:underline font-semibold">
              Get Started
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/5 text-center text-[11px] text-slate-600">
          Disclaimer: FitPlus provides algorithmically generated fitness and nutritional suggestions. Always consult with a qualified physician or healthcare provider before beginning any strenuous workout routine or dietary modification.
        </div>
      </footer>
    </div>
  );
}
