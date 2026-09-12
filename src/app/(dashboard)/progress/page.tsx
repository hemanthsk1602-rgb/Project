'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Calendar,
  Dumbbell,
  Scale,
  Sparkles,
  ArrowUpRight,
  Flame,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function ProgressPage() {
  const { profile, workoutHistory } = useFitness();
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y'>('1M');

  // Realistic weight data points
  const weightData = [
    { label: 'Week 1', weight: 58.6 },
    { label: 'Week 2', weight: 59.0 },
    { label: 'Week 3', weight: 59.3 },
    { label: 'Week 4', weight: 59.7 },
    { label: 'Week 5', weight: 60.0 },
  ];

  // Strength progression records
  const personalRecords = [
    {
      id: 'pr-1',
      exercise: 'Max Deadhang Pull-ups',
      value: '14 Clean Reps',
      improvement: '+3 reps',
      date: 'Oct 28',
      category: 'Calisthenics',
      icon: '🤸',
    },
    {
      id: 'pr-2',
      exercise: 'Barbell Bench Press',
      value: '82.5 kg × 5',
      improvement: '+5 kg',
      date: 'Oct 24',
      category: 'Gym',
      icon: '🏋️',
    },
    {
      id: 'pr-3',
      exercise: 'Barbell Back Squat',
      value: '95 kg × 6',
      improvement: '+7.5 kg',
      date: 'Oct 19',
      category: 'Gym',
      icon: '🛡️',
    },
    {
      id: 'pr-4',
      exercise: 'Push-up Unbroken Set',
      value: '42 Reps',
      improvement: '+6 reps',
      date: 'Oct 15',
      category: 'Calisthenics',
      icon: '⚡',
    },
  ];

  const bodyMeasurements = [
    { part: 'Chest', current: '98 cm', change: '+2.0 cm' },
    { part: 'Arms (Biceps)', current: '36.5 cm', change: '+1.2 cm' },
    { part: 'Waist', current: '76 cm', change: '-1.5 cm' },
    { part: 'Thighs', current: '56 cm', change: '+1.8 cm' },
    { part: 'Calves', current: '37 cm', change: '+0.5 cm' },
  ];

  const proteinConsistencyData = [
    { day: 'Mon', protein: 118, target: profile.proteinTarget },
    { day: 'Tue', protein: 125, target: profile.proteinTarget },
    { day: 'Wed', protein: 110, target: profile.proteinTarget },
    { day: 'Thu', protein: 122, target: profile.proteinTarget },
    { day: 'Fri', protein: 128, target: profile.proteinTarget },
    { day: 'Sat', protein: 115, target: profile.proteinTarget },
    { day: 'Sun', protein: 105, target: profile.proteinTarget },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <TopHeader
        title="Performance & Progress Analytics"
        subtitle={`Tracking progressive overload, volume adaptations, and verified records for ${profile.name}`}
      />

      {/* Comparison Cards: "This month vs last month" */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-pulse" />
            <h2 className="font-outfit text-sm font-extrabold uppercase tracking-wider text-white">
              Month-Over-Month Adaptation
            </h2>
          </div>
          <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-full border border-white/10">
            {(['1M', '3M', '6M', '1Y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  timeRange === r
                    ? 'bg-[#D5FF3E] text-black shadow-md shadow-[#D5FF3E]/20'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                Strength Progression
              </span>
              <span className="flex items-center text-xs font-extrabold text-[#D5FF3E] bg-[#D5FF3E]/10 px-2.5 py-0.5 rounded-full border border-[#D5FF3E]/20">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +8.4%
              </span>
            </div>
            <h4 className="font-outfit text-3xl font-black text-white">+8.4%</h4>
            <p className="text-xs text-white/60 mt-1">Average load/rep velocity increase across compound lifts</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                Workout Consistency
              </span>
              <span className="flex items-center text-xs font-extrabold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12%
              </span>
            </div>
            <h4 className="font-outfit text-3xl font-black text-white">92%</h4>
            <p className="text-xs text-white/60 mt-1">Scheduled sessions completed without skipping</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                Cumulative Volume
              </span>
              <span className="flex items-center text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +6.2%
              </span>
            </div>
            <h4 className="font-outfit text-3xl font-black text-white">+6.2%</h4>
            <p className="text-xs text-white/60 mt-1">Total weekly tonnage lifted and mechanical tension</p>
          </div>
        </div>
      </div>

      {/* Main Charts Row: Weight Progression & Protein Consistency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progression Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-outfit text-lg font-bold text-white">Weight Over Time</h4>
                <p className="text-xs text-white/50 mt-0.5">Lean mass progression ({profile.weight} kg current)</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#D5FF3E]/10 text-xs font-bold text-[#D5FF3E] border border-[#D5FF3E]/30">
                +1.4 kg this month
              </span>
            </div>

            {/* Custom SVG Line / Bar Chart */}
            <div className="pt-6 pb-2">
              <div className="h-44 w-full flex items-end justify-between gap-4 relative">
                {/* Horizontal Guide Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                  <div className="border-b border-white w-full" />
                  <div className="border-b border-white w-full" />
                  <div className="border-b border-white w-full" />
                </div>

                {weightData.map((d, i) => {
                  const minW = 58;
                  const maxW = 61;
                  const heightPercent = ((d.weight - minW) / (maxW - minW)) * 80 + 20;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                      <div className="text-[11px] font-bold text-white/70 group-hover:text-[#D5FF3E] transition-colors">
                        {d.weight} kg
                      </div>
                      <div className="w-full max-w-[36px] bg-white/5 rounded-t-xl relative overflow-hidden flex flex-col justify-end" style={{ height: `${heightPercent}%` }}>
                        <div className="w-full bg-[#D5FF3E] rounded-t-xl h-full transition-all group-hover:shadow-[0_0_12px_rgba(213,255,62,0.5)]" />
                      </div>
                      <span className="text-[10px] text-white/40 mt-1 font-semibold">{d.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>Goal: Controlled athletic hypertrophy</span>
            <span className="text-[#D5FF3E] font-bold">On Track</span>
          </div>
        </div>

        {/* Protein Consistency Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-outfit text-lg font-bold text-white">Daily Protein Consistency</h4>
                <p className="text-xs text-white/50 mt-0.5">Target: {profile.proteinTarget}g / day</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                86% Hit Rate
              </span>
            </div>

            <div className="pt-6 pb-2">
              <div className="h-44 w-full flex items-end justify-between gap-3 relative">
                {proteinConsistencyData.map((d, i) => {
                  const heightPercent = Math.min(100, (d.protein / 140) * 100);
                  const isSuccess = d.protein >= d.target;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] font-bold text-white/70">
                        {d.protein}g
                      </div>
                      <div className="w-full max-w-[32px] bg-white/5 rounded-t-xl relative overflow-hidden flex flex-col justify-end" style={{ height: `${heightPercent}%` }}>
                        <div
                          className={`w-full rounded-t-xl h-full transition-all ${
                            isSuccess
                              ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                              : 'bg-white/20'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-white/40 mt-1 font-semibold">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>Weekly Average: <strong className="text-cyan-400">117g</strong></span>
            <span>Target: <strong className="text-white">{profile.proteinTarget}g</strong></span>
          </div>
        </div>
      </div>

      {/* Personal Records (PR) Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-outfit text-lg font-bold text-white">Personal Records & Milestones</h4>
            <p className="text-xs text-white/50 mt-0.5">All-time benchmark lifts and bodyweight milestones</p>
          </div>
          <span className="text-xs text-[#D5FF3E] font-bold flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D5FF3E]/10 border border-[#D5FF3E]/20">
            <Sparkles className="w-3.5 h-3.5" /> 4 Verified PRs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalRecords.map((pr) => (
            <div
              key={pr.id}
              className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#D5FF3E]/40 backdrop-blur-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                  {pr.icon}
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/30">
                  {pr.improvement}
                </span>
              </div>

              <span className="text-[10px] font-bold text-white/40 block uppercase tracking-wider">
                {pr.category}
              </span>
              <h5 className="font-outfit text-sm font-bold text-white mt-0.5 truncate">{pr.exercise}</h5>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-baseline justify-between">
                <span className="font-outfit text-base font-extrabold text-[#D5FF3E]">{pr.value}</span>
                <span className="text-[10px] text-white/40">{pr.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body Measurements Tracker */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-outfit text-lg font-bold text-white">Body Measurements (Tape Measurements)</h4>
            <p className="text-xs text-white/50 mt-0.5">Circumference changes over the past 30 days</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {bodyMeasurements.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center"
            >
              <span className="text-xs font-semibold text-white/50 block">{m.part}</span>
              <span className="font-outfit text-xl font-black text-white mt-1 block">{m.current}</span>
              <span className="text-xs font-bold text-[#D5FF3E] mt-1 inline-block">
                {m.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
