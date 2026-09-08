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
    { day: 'Mon', protein: 118, target: 120 },
    { day: 'Tue', protein: 125, target: 120 },
    { day: 'Wed', protein: 110, target: 120 },
    { day: 'Thu', protein: 122, target: 120 },
    { day: 'Fri', protein: 128, target: 120 },
    { day: 'Sat', protein: 115, target: 120 },
    { day: 'Sun', protein: 105, target: 120 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <TopHeader
        title="Performance & Progress Analytics"
        subtitle={`Tracking metrics, physical adaptations, and all-time records for ${profile.name}`}
      />

      {/* Comparison Cards: "This month vs last month" */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            This Month vs Last Month
          </span>
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {(['1M', '3M', '6M', '1Y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === r
                    ? 'bg-emerald-500 text-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Strength Progression
              </span>
              <span className="flex items-center text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +8%
              </span>
            </div>
            <h4 className="text-3xl font-black text-white">+8.4%</h4>
            <p className="text-xs text-slate-400 mt-1">Average load/rep increase across compound lifts</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Workout Consistency
              </span>
              <span className="flex items-center text-xs font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12%
              </span>
            </div>
            <h4 className="text-3xl font-black text-white">92%</h4>
            <p className="text-xs text-slate-400 mt-1">Scheduled sessions completed on time</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Cumulative Volume
              </span>
              <span className="flex items-center text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +6%
              </span>
            </div>
            <h4 className="text-3xl font-black text-white">+6.2%</h4>
            <p className="text-xs text-slate-400 mt-1">Tonnage lifted and mechanical tension created</p>
          </div>
        </div>
      </div>

      {/* Main Charts Row: Weight Progression & Protein Consistency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progression Chart */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">Weight Over Time</h4>
                <p className="text-xs text-slate-400 mt-0.5">Lean mass progression ({profile.weight} kg current)</p>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-xs font-bold text-emerald-400 border border-slate-700">
                +1.4 kg this month
              </span>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="pt-6 pb-2">
              <div className="h-44 w-full flex items-end justify-between gap-4 relative">
                {/* Horizontal Guide Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="border-b border-slate-600 w-full" />
                  <div className="border-b border-slate-600 w-full" />
                  <div className="border-b border-slate-600 w-full" />
                </div>

                {weightData.map((d, i) => {
                  const minW = 58;
                  const maxW = 61;
                  const heightPercent = ((d.weight - minW) / (maxW - minW)) * 80 + 20;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                      <div className="text-[11px] font-bold text-slate-300 group-hover:text-emerald-400 transition-colors">
                        {d.weight} kg
                      </div>
                      <div className="w-full max-w-[32px] bg-slate-800/80 rounded-t-lg relative overflow-hidden flex flex-col justify-end" style={{ height: `${heightPercent}%` }}>
                        <div className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg h-full transition-all group-hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">{d.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Goal: Controlled lean hypertrophy</span>
            <span className="text-emerald-400 font-semibold">On Track</span>
          </div>
        </div>

        {/* Protein Consistency Chart */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">Daily Protein Consistency</h4>
                <p className="text-xs text-slate-400 mt-0.5">Target: {profile.proteinTarget}g / day</p>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-cyan-500/10 text-xs font-bold text-cyan-400 border border-cyan-500/20">
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
                      <div className="text-[10px] font-bold text-slate-300">
                        {d.protein}g
                      </div>
                      <div className="w-full max-w-[28px] bg-slate-800/80 rounded-t-lg relative overflow-hidden flex flex-col justify-end" style={{ height: `${heightPercent}%` }}>
                        <div
                          className={`w-full rounded-t-lg h-full transition-all ${
                            isSuccess
                              ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                              : 'bg-slate-600'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Weekly Average: <strong className="text-cyan-400">117g</strong></span>
            <span>Target: <strong className="text-white">120g</strong></span>
          </div>
        </div>
      </div>

      {/* Personal Records (PR) Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-white">Personal Records & Milestones</h4>
            <p className="text-xs text-slate-400 mt-0.5">All-time benchmark lifts and bodyweight milestones</p>
          </div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> 4 Verified PRs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalRecords.map((pr) => (
            <div
              key={pr.id}
              className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl">
                  {pr.icon}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {pr.improvement}
                </span>
              </div>

              <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                {pr.category}
              </span>
              <h5 className="text-sm font-bold text-white mt-0.5 truncate">{pr.exercise}</h5>
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
                <span className="text-base font-black text-emerald-400">{pr.value}</span>
                <span className="text-[10px] text-slate-500">{pr.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body Measurements Tracker */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Body Measurements (Tape Measurements)</h4>
            <p className="text-xs text-slate-400 mt-0.5">Circumference changes over the past 30 days</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {bodyMeasurements.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center"
            >
              <span className="text-xs font-semibold text-slate-400 block">{m.part}</span>
              <span className="text-xl font-black text-white mt-1 block">{m.current}</span>
              <span className="text-xs font-bold text-emerald-400 mt-1 inline-block">
                {m.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

