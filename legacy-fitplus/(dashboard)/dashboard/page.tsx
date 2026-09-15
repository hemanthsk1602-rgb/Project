'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  Flame,
  Dumbbell,
  Play,
  Sparkles,
  Bot,
  Utensils,
  Footprints,
  HeartPulse,
  Droplet,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  CheckCircle2,
  Calendar,
  Award,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { StatCard } from '@/components/ui/StatCard';
import { TopHeader } from '@/components/layout/TopHeader';
import { CircularProgress } from '@/components/ui/CircularProgress';

export default function DashboardPage() {
  const { profile, workoutPlan, workoutHistory, nutrition, recovery, addWater } = useFitness();

  // Dynamic Time-of-Day Greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Find today's workout based on current day of week (Monday first)
  const todayDayIndex = new Date().getDay(); // Sun=0, Mon=1, ...
  const normalizedIndex = todayDayIndex === 0 ? 6 : todayDayIndex - 1;
  const todayWorkout = workoutPlan.days[normalizedIndex] || workoutPlan.days[0];

  const daysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Calculate percentages
  const caloriePercent = Math.round((nutrition.caloriesConsumed / profile.calorieTarget) * 100);
  const proteinPercent = Math.round((nutrition.proteinConsumed / profile.proteinTarget) * 100);
  const waterPercent = Math.round((nutrition.waterLiters / profile.waterTarget) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header with Personalized Greeting */}
      <TopHeader
        title={`${greeting}, ${profile.name} 👋`}
        subtitle="Let's make today count. Your body grows through consistency and progressive overload."
      />

      {/* Section: Today's Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-pulse" />
            <h2 className="font-outfit text-sm font-extrabold uppercase tracking-wider text-white">
              Today&apos;s Overview
            </h2>
          </div>
          <span className="text-xs text-white/50">
            {profile.trainingStyle} • {profile.experience} Tier
          </span>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Workout Status */}
          <StatCard
            title="Today's Session"
            value={todayWorkout.isRestDay ? 'Rest Day' : 'Ready'}
            subvalue={todayWorkout.isRestDay ? 'Active recovery' : `${todayWorkout.durationMinutes} min`}
            icon={<Play className="w-4 h-4" />}
            accentColor="lime"
            badge={todayWorkout.isRestDay ? 'Recovery' : 'Scheduled'}
          />

          {/* Calories */}
          <StatCard
            title="Calories"
            value={nutrition.caloriesConsumed}
            subvalue={`/ ${profile.calorieTarget} kcal`}
            icon={<Utensils className="w-4 h-4" />}
            progressPercent={caloriePercent}
            accentColor="lime"
          />

          {/* Protein */}
          <StatCard
            title="Protein"
            value={`${nutrition.proteinConsumed}g`}
            subvalue={`/ ${profile.proteinTarget}g`}
            icon={<Dumbbell className="w-4 h-4" />}
            progressPercent={proteinPercent}
            accentColor="cyan"
            badge={`${proteinPercent}%`}
          />

          {/* Hydration */}
          <StatCard
            title="Hydration"
            value={`${nutrition.waterLiters}L`}
            subvalue={`/ ${profile.waterTarget}L`}
            icon={<Droplet className="w-4 h-4" />}
            progressPercent={waterPercent}
            accentColor="blue"
            actionButton={{
              label: '+250ml',
              onClick: () => addWater(0.25),
            }}
          />

          {/* Current Streak */}
          <StatCard
            title="Workout Streak"
            value={`${profile.streak} Days`}
            subvalue="Top 5% Consistency"
            icon={<Flame className="w-4 h-4" />}
            accentColor="orange"
            badge="On Fire"
          />

          {/* Recovery Score */}
          <StatCard
            title="Readiness"
            value={`${recovery.score}%`}
            subvalue="Optimal state"
            icon={<HeartPulse className="w-4 h-4" />}
            progressPercent={recovery.score}
            accentColor="lime"
            badge="Primed"
          />
        </div>
      </div>

      {/* Main Feature Row: Large "Today's Workout" + Streak / Recovery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large "Today's Workout" Card (spans 2 cols) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between transition-all">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D5FF3E]/5 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/30">
                Today&apos;s Workout
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white/60">
                <Clock className="w-3.5 h-3.5 text-[#D5FF3E]" />
                <span>{todayWorkout.durationMinutes} Minutes</span>
              </div>
            </div>

            <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              {todayWorkout.routineName}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-1 mb-6">
              Focus Areas: <span className="text-white font-semibold">{todayWorkout.focus}</span>
            </p>

            {/* Exercises Preview */}
            <div className="space-y-2.5 mb-6">
              {todayWorkout.exercises.slice(0, 4).map((ex, i) => (
                <div
                  key={ex.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 text-xs transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center font-mono font-bold text-[11px] text-white/50">
                      0{i + 1}
                    </span>
                    <div>
                      <h5 className="font-bold text-white">{ex.name}</h5>
                      <span className="text-[11px] text-white/50">{ex.muscleGroup}</span>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-[#D5FF3E] font-semibold">{ex.sets} Sets</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/70">{ex.reps}</span>
                  </div>
                </div>
              ))}
              {todayWorkout.exercises.length > 4 && (
                <p className="text-xs text-white/40 text-center pt-1">
                  + {todayWorkout.exercises.length - 4} more exercises in this session
                </p>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-pulse" />
              <span>Programmed for {profile.trainingStyle} ({profile.experience})</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/workout"
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all border border-white/15 flex-1 sm:flex-none text-center"
              >
                View Routine
              </Link>
              <Link
                href="/workout/session"
                className="px-6 py-2.5 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black text-xs font-extrabold transition-all shadow-lg shadow-[#D5FF3E]/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 flex-1 sm:flex-none"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Start Workout</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Streak Card + Recovery Readiness Gauge */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Current Streak Card */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl flex items-center justify-between transition-all">
            <div>
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
                Consistency Streak
              </span>
              <h4 className="font-outfit text-3xl font-black text-white mt-1">
                {profile.streak} Days <span className="text-amber-400">🔥</span>
              </h4>
              <p className="text-xs text-[#D5FF3E] font-medium mt-1">
                Unbroken discipline! Next milestone at 14 days.
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 text-[#D5FF3E] flex items-center justify-center text-2xl shadow-inner">
              <Flame className="w-7 h-7 fill-[#D5FF3E]" />
            </div>
          </div>

          {/* Recovery Gauge Card */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl flex items-center gap-6 transition-all flex-1">
            <CircularProgress
              value={recovery.score}
              max={100}
              size={110}
              strokeWidth={9}
              color="lime"
              label="Optimal"
            />
            <div className="flex-1">
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
                Recovery Readiness
              </span>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                Sleep: <span className="text-white font-bold">{recovery.sleepHours}h {recovery.sleepMinutes}m</span> • Energy: <span className="text-[#D5FF3E] font-bold">{recovery.energyLevel}</span>
              </p>
              <Link
                href="/recovery"
                className="text-xs font-bold text-[#D5FF3E] hover:text-[#c4f035] mt-3 inline-flex items-center gap-1 transition-colors"
              >
                <span>Full Recovery Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Weekly Activity Chart + AI Coach Recommendation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart (2 cols) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-outfit text-lg font-bold text-white">Weekly Activity & Training Volume</h4>
              <p className="text-xs text-white/50 mt-0.5">
                Completed vs scheduled sessions for the current 7-day microcycle
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/20">
              5 / {profile.daysPerWeek} Completed
            </span>
          </div>

          {/* 7-Day Activity Bars */}
          <div className="grid grid-cols-7 gap-3 sm:gap-4 pt-4 pb-2">
            {workoutPlan.days.map((day, idx) => {
              const isToday = idx === normalizedIndex;
              const isPast = idx < normalizedIndex;
              const isCompleted = isPast && !day.isRestDay;

              return (
                <div key={day.id || idx} className="flex flex-col items-center gap-2">
                  <div className="h-32 w-full max-w-[48px] bg-white/5 rounded-2xl p-1.5 flex flex-col justify-end border border-white/5 relative group">
                    {/* Hover Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 border border-white/10">
                      {day.isRestDay ? 'Rest Day' : day.routineName}
                    </div>

                    <div
                      className={`w-full rounded-xl transition-all duration-500 ${
                        isCompleted
                          ? 'bg-[#D5FF3E] shadow-[0_0_12px_rgba(213,255,62,0.4)]'
                          : isToday
                          ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                          : day.isRestDay
                          ? 'bg-white/10'
                          : 'bg-white/20'
                      }`}
                      style={{
                        height: day.isRestDay ? '25%' : isCompleted ? '85%' : isToday ? '70%' : '50%',
                      }}
                    />
                  </div>

                  <span
                    className={`text-xs font-bold ${
                      isToday
                        ? 'text-[#D5FF3E]'
                        : isCompleted
                        ? 'text-white'
                        : 'text-white/40'
                    }`}
                  >
                    {daysLabels[idx]}
                  </span>

                  <span className="text-[10px] text-white/40">
                    {day.isRestDay ? 'Rest' : `${day.durationMinutes}m`}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/50 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-[#D5FF3E]" />
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-white" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-white/20" />
                <span>Scheduled</span>
              </div>
            </div>

            <Link
              href="/progress"
              className="text-[#D5FF3E] hover:text-[#c4f035] font-bold flex items-center gap-1 transition-colors"
            >
              <span>Detailed Volume Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* AI Fitness Coach Recommendation Card (1 col) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#D5FF3E]/30 backdrop-blur-xl flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D5FF3E] to-emerald-400 flex items-center justify-center text-black shadow-lg shadow-[#D5FF3E]/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-outfit text-sm font-bold text-white flex items-center gap-1.5">
                    <span>FitPlus AI Coach</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D5FF3E]" />
                  </h4>
                  <p className="text-[11px] text-white/50">Daily Biomechanical Insight</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5FF3E] block">
                Targeted Overload Tip
              </span>
              <p className="text-xs text-white/80 leading-relaxed">
                &quot;Your {todayWorkout.routineName} is primed today. Recovery is at {recovery.score}%. Push for an extra 1-2 reps on your final working set of compound movements to trigger muscle protein synthesis.&quot;
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Protein Gap Remaining:</span>
                <span className="text-white font-bold">
                  {Math.max(0, profile.proteinTarget - nutrition.proteinConsumed)}g
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#D5FF3E] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, proteinPercent)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10">
            <Link
              href="/ai-coach"
              className="w-full py-3 rounded-full bg-white/10 hover:bg-[#D5FF3E] hover:text-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#D5FF3E] group-hover:text-black" />
              <span>Ask AI Coach</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Third Row: Recent Completed Workouts History */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-outfit text-lg font-bold text-white">Recent Workout Logs</h4>
            <p className="text-xs text-white/50 mt-0.5">Verified session history with volume tonnage</p>
          </div>
          <Link
            href="/workout"
            className="text-xs font-bold text-[#D5FF3E] hover:text-[#c4f035] flex items-center gap-1 transition-colors"
          >
            <span>View All Sessions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {workoutHistory.length === 0 ? (
          <div className="py-8 text-center text-white/40 text-xs">
            No completed sessions recorded yet. Start today&apos;s workout to log your first session!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workoutHistory.slice(0, 3).map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 text-[#D5FF3E] flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">{session.workoutName}</h5>
                    <p className="text-[11px] text-white/50">{session.date} • {session.durationMinutes} min</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#D5FF3E]">
                    {session.totalVolumeKg} kg
                  </span>
                  <span className="text-[10px] text-white/40 block">Tonnage</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
