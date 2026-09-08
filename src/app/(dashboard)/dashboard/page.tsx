'use client';

import React from 'react';
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
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { StatCard } from '@/components/ui/StatCard';
import { TopHeader } from '@/components/layout/TopHeader';
import { CircularProgress } from '@/components/ui/CircularProgress';

export default function DashboardPage() {
  const { profile, workoutPlan, workoutHistory, nutrition, recovery, addWater } = useFitness();

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
      {/* Top Header */}
      <TopHeader
        title={`Good morning, ${profile.name} 👋`}
        subtitle="Let's make today count. Your body grows through consistency."
      />

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Calories */}
        <StatCard
          title="Calories"
          value={nutrition.caloriesConsumed}
          subvalue={`/ ${profile.calorieTarget} kcal`}
          icon={<Utensils className="w-4 h-4" />}
          progressPercent={caloriePercent}
          accentColor="emerald"
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

        {/* Water */}
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

        {/* Workout Status */}
        <StatCard
          title="Workout"
          value={todayWorkout.isRestDay ? 'Rest Day' : 'Ready'}
          subvalue={todayWorkout.isRestDay ? 'Active recovery' : `${todayWorkout.durationMinutes} min`}
          icon={<Play className="w-4 h-4" />}
          accentColor="purple"
          badge={todayWorkout.isRestDay ? 'Recovery' : 'Scheduled'}
        />

        {/* Steps */}
        <StatCard
          title="Daily Steps"
          value="8,420"
          subvalue="/ 10k goal"
          icon={<Footprints className="w-4 h-4" />}
          progressPercent={84}
          accentColor="orange"
        />

        {/* Recovery Score */}
        <StatCard
          title="Recovery"
          value={`${recovery.score}`}
          subvalue="/ 100"
          icon={<HeartPulse className="w-4 h-4" />}
          progressPercent={recovery.score}
          accentColor="emerald"
          badge="Optimal"
        />
      </div>

      {/* Main Feature Row: Large "Today's Workout" + Current Streak / Recovery Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large "Today's Workout" Card (spans 2 cols) */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Today's Workout
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{todayWorkout.durationMinutes} Minutes</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              {todayWorkout.routineName}
            </h3>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              Focus Areas: <span className="text-slate-200 font-medium">{todayWorkout.focus}</span>
            </p>

            {/* Exercises Preview */}
            <div className="space-y-2.5 mb-6">
              {todayWorkout.exercises.slice(0, 4).map((ex, i) => (
                <div
                  key={ex.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-slate-500 font-bold">0{i + 1}</span>
                    <div>
                      <h5 className="font-bold text-white">{ex.name}</h5>
                      <span className="text-[11px] text-slate-400">{ex.muscleGroup}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-semibold">{ex.sets} Sets</span>
                    <span className="text-slate-500 mx-1.5">•</span>
                    <span className="text-slate-300">{ex.reps}</span>
                  </div>
                </div>
              ))}
              {todayWorkout.exercises.length > 4 && (
                <p className="text-xs text-slate-400 text-center pt-1">
                  + {todayWorkout.exercises.length - 4} more exercises in this session
                </p>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Personalized for {profile.trainingStyle} ({profile.experience})</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/workout"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex-1 sm:flex-none text-center"
              >
                View Full Routine
              </Link>
              <Link
                href="/workout/session"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2 flex-1 sm:flex-none"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Start Workout</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Current Streak + Recovery Score Ring */}
        <div className="space-y-6">
          {/* Current Streak Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Current Streak
              </span>
              <h4 className="text-3xl font-black text-white mt-1">{profile.streak} Days 🔥</h4>
              <p className="text-xs text-amber-400/90 font-medium mt-1">
                You're in the top 5% of consistency this month!
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center text-2xl shadow-inner">
              <Flame className="w-7 h-7 fill-amber-400" />
            </div>
          </div>

          {/* Recovery Gauge Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 flex items-center gap-6">
            <CircularProgress
              value={recovery.score}
              max={100}
              size={110}
              strokeWidth={9}
              color="emerald"
              label="Optimal"
            />
            <div className="flex-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Recovery Readiness
              </span>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Sleep: <span className="text-white font-bold">{recovery.sleepHours}h {recovery.sleepMinutes}m</span> • Energy: <span className="text-emerald-400 font-bold">{recovery.energyLevel}</span>
              </p>
              <Link
                href="/recovery"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 mt-3 inline-flex items-center gap-1"
              >
                <span>Full Recovery Report</span> &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Weekly Activity Chart + AI Coach Recommendation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart (2 cols) */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Weekly Activity & Training Volume</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Completed vs scheduled sessions for this week
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-700" />
                <span>Planned</span>
              </div>
            </div>
          </div>

          {/* Weekly Bar Graph */}
          <div className="grid grid-cols-7 gap-3 sm:gap-4 h-48 items-end pt-4 pb-2 border-b border-slate-800">
            {workoutPlan.days.map((day, idx) => {
              const isPast = idx < normalizedIndex;
              const isToday = idx === normalizedIndex;
              const heightPercent = day.isRestDay ? 25 : isPast ? 85 : isToday ? 95 : 70;

              return (
                <div key={day.id} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full max-w-[48px] bg-slate-800/60 rounded-xl p-1 flex flex-col justify-end h-full relative overflow-hidden">
                    <div
                      className={`w-full rounded-lg transition-all duration-500 ${
                        day.isRestDay
                          ? 'bg-slate-700/60'
                          : isToday
                          ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                          : isPast
                          ? 'bg-emerald-500/80'
                          : 'bg-slate-700/80'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <span
                      className={`text-xs font-bold block ${
                        isToday ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      {daysLabels[idx]}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {day.isRestDay ? 'Rest' : `${day.durationMinutes}m`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs text-slate-400">
            <span>Overall Weekly Adherence: <strong className="text-emerald-400">92%</strong></span>
            <Link href="/progress" className="text-emerald-400 hover:text-emerald-300 font-semibold">
              View Detailed Analytics &rarr;
            </Link>
          </div>
        </div>

        {/* AI Coach Recommendation Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">AI Coach Recommendation</h4>
                <p className="text-[11px] text-emerald-400 font-semibold">Real-time Insight</p>
              </div>
            </div>

            <blockquote className="text-xs sm:text-sm text-slate-300 italic leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 mb-4">
              "Your pulling strength has improved this week. Consider increasing your pull-up volume slightly during your next session or testing your 5RM weighted pull-up."
            </blockquote>

            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your recovery rating of 82/100 and yesterday's 16 sets completed, your neuromuscular adaptation is trending upward.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800/80">
            <Link
              href="/ai-coach"
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Coach</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

