'use client';

import React from 'react';
import Link from 'next/link';
import { CURRENT_USER_PROFILE, AI_RECOMMENDED_STUDY_PLAN } from '@/data/demo/profile';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Flame, 
  TrendingUp, 
  Target, 
  ArrowRight,
  Code2,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export default function AnalyticsPage() {
  const profile = CURRENT_USER_PROFILE;
  const plan = AI_RECOMMENDED_STUDY_PLAN;

  // Heatmap generation (12 weeks of simulated activity)
  const heatmapWeeks = Array.from({ length: 16 }, (_, w) => 
    Array.from({ length: 7 }, (_, d) => {
      // higher activity on recent weeks
      const rand = Math.random();
      const level = rand > 0.7 ? 3 : rand > 0.4 ? 2 : rand > 0.2 ? 1 : 0;
      return { level };
    })
  );

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Report Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono mb-2">
              <BarChart3 className="w-3 h-3" />
              <span>Performance Analytics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Developer Performance Report
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Objective algorithmic competency telemetry, speed benchmarks, and AI targeted growth vectors.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>Report Period: Last 90 Days</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">94.2th Percentile</span>
          </div>
        </div>

        {/* Top Key Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-1">
            <span className="text-xs text-zinc-400 font-mono">Problems Solved</span>
            <div className="text-3xl font-bold font-mono text-white">
              {profile.solvedStats.total}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Top 6% across platform
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-1">
            <span className="text-xs text-zinc-400 font-mono">First-Pass Accuracy</span>
            <div className="text-3xl font-bold font-mono text-emerald-400">
              {profile.accuracy}%
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              +4.2% from previous month
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-1">
            <span className="text-xs text-zinc-400 font-mono">Average Solve Time</span>
            <div className="text-3xl font-bold font-mono text-brand-400">
              18.5m
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Medium difficulty benchmark
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-1">
            <span className="text-xs text-zinc-400 font-mono">Consecutive Streak</span>
            <div className="text-3xl font-bold font-mono text-amber-400 flex items-center gap-1.5">
              <span>{profile.streak}</span>
              <Flame className="w-5 h-5 fill-amber-400" />
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Active daily problem solver
            </div>
          </div>
        </div>

        {/* Section 1: Difficulty Distribution & Language Proficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Difficulty Distribution */}
          <div className="lg:col-span-6 p-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-5">
            <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Difficulty Distribution
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-emerald-400 font-semibold">Easy</span>
                  <span className="text-zinc-400">{profile.solvedStats.easy} / 200 Solved (84%)</span>
                </div>
                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-amber-400 font-semibold">Medium</span>
                  <span className="text-zinc-400">{profile.solvedStats.medium} / 350 Solved (60.5%)</span>
                </div>
                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '60.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-rose-400 font-semibold">Hard</span>
                  <span className="text-zinc-400">{profile.solvedStats.hard} / 120 Solved (40%)</span>
                </div>
                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Language Proficiency */}
          <div className="lg:col-span-6 p-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-5">
            <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Language Usage
            </h2>

            <div className="space-y-4">
              {profile.languages.map((lang) => (
                <div key={lang.language}>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-200 font-medium">{lang.language}</span>
                    <span className="text-zinc-400">{lang.problemsSolved} solutions ({lang.percentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Topic Mastery Matrix */}
        <div className="p-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Topic Mastery Matrix
            </h2>
            <span className="text-xs font-mono text-zinc-500">
              Evaluated against standard problem sets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profile.topicMastery.map((topic) => {
              const isHigh = topic.mastery >= 75;
              const isLow = topic.mastery < 50;

              return (
                <div
                  key={topic.topic}
                  className="p-3.5 rounded-lg bg-[#070A13] border border-white/[0.06] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-200 truncate">{topic.topic}</span>
                    <span
                      className={`font-mono font-bold ${
                        isHigh ? 'text-emerald-400' : isLow ? 'text-rose-400' : 'text-amber-400'
                      }`}
                    >
                      {topic.mastery}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isHigh ? 'bg-emerald-400' : isLow ? 'bg-rose-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${topic.mastery}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono">
                    {topic.solved} of {topic.total} Solved
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: AI RECOMMENDED 7-DAY STUDY PLAN */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#101726] to-[#0A0E18] border border-brand-500/30 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CodeArena AI Recommendation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                {plan.headline}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Identified primary bottleneck: <strong className="text-rose-400">{plan.identifiedWeakness}</strong> (Current success rate: {plan.currentSuccessRate}, target: {plan.targetBenchmark})
              </p>
            </div>

            <Link
              href="/roadmap"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-colors shadow-glow-brand shrink-0"
            >
              <span>Follow in Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
            {plan.planDays.map((day, idx) => (
              <div
                key={day.day}
                className="p-3.5 rounded-xl bg-[#070B13] border border-white/[0.08] space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono font-bold text-brand-400 block mb-1">
                    {day.day}
                  </span>
                  <h4 className="text-xs font-semibold text-white line-clamp-2">
                    {day.focus}
                  </h4>
                </div>
                <div className="text-[10px] text-zinc-400 italic pt-2 border-t border-white/[0.04]">
                  {day.keyInsight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Contribution Heatmap */}
        <div className="p-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>Activity Heatmap (16 Weeks)</span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-sm bg-brand-900" />
              <span className="w-2.5 h-2.5 rounded-sm bg-brand-600" />
              <span className="w-2.5 h-2.5 rounded-sm bg-brand-400" />
              <span>More</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[500px]">
              {heatmapWeeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((day, dIdx) => {
                    const color =
                      day.level === 3
                        ? 'bg-brand-400'
                        : day.level === 2
                        ? 'bg-brand-600'
                        : day.level === 1
                        ? 'bg-brand-900/60'
                        : 'bg-zinc-800/60';
                    return (
                      <div
                        key={dIdx}
                        className={`w-3.5 h-3.5 rounded-sm ${color} hover:ring-1 hover:ring-white transition-all`}
                        title={`Activity level: ${day.level}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

