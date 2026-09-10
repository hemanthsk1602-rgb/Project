'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Dumbbell,
  Wallet,
  CalendarCheck,
  Code2,
  Compass,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  TrendingUp,
  Zap,
  Flame,
  ChevronRight,
  Play,
} from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';
import {
  SEED_TASKS,
  SEED_SUBJECTS,
  SEED_EXAMS,
  SEED_ASSIGNMENTS,
  SEED_WORKOUT,
  SEED_FINANCE,
  SEED_SKILLFORGE,
  SEED_HABITS,
  SEED_DAILY_BRIEFING,
  SEED_TRANSIT_ROUTE,
} from '@/lib/data/nexus-seed';

export default function DashboardPage() {
  const [tasks, setTasks] = useState(SEED_TASKS);
  const [habits, setHabits] = useState(SEED_HABITS);
  const briefing = SEED_DAILY_BRIEFING;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'completed' ? 'pending' : 'completed',
              completedAt: t.status === 'completed' ? undefined : new Date().toISOString(),
            }
          : t
      )
    );
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completedToday: !h.completedToday,
              streakCount: !h.completedToday ? h.streakCount + 1 : h.streakCount - 1,
            }
          : h
      )
    );
  };

  const completedTasksCount = tasks.filter((t) => t.status === 'completed').length;
  const pendingTasks = tasks.filter((t) => t.status !== 'completed');

  return (
    <div className="space-y-6 pb-12">
      {/* 1. HERO: DAILY AI BRIEFING CARD */}
      <div className="relative overflow-hidden rounded-card-lg p-6 md:p-8 bg-gradient-to-br from-white/90 via-violet-50/40 to-blue-50/30 dark:from-nexus-dark-card/90 dark:via-violet-950/20 dark:to-blue-950/20 border border-violet-200/60 dark:border-violet-800/40 shadow-card dark:shadow-card-dark">
        {/* Futuristic background glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 md:gap-5">
            <NexusOrb size="lg" state="thinking" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase font-bold tracking-wider text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 rounded-full">
                  Daily Briefing & Synthesis
                </span>
                <span className="text-xs text-gray-400">Powered by NEXUS Core</span>
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-extrabold text-nexus-light-text dark:text-nexus-dark-text tracking-tight">
                {briefing.greeting}
              </h2>
              <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
                {briefing.summaryText}
              </p>
            </div>
          </div>

          <Link
            href="/ai"
            className="flex items-center gap-2 px-4 py-2.5 rounded-btn bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-button-primary transition-all duration-200 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consult Assistant</span>
          </Link>
        </div>

        {/* Cross-Module Intelligence Banner (Prompt Core Differentiator) */}
        <div className="mt-6 pt-5 border-t border-violet-100 dark:border-violet-900/40 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-4 rounded-xl bg-white/70 dark:bg-black/30 border border-violet-200/50 dark:border-violet-800/30">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-violet-600 dark:text-violet-300">
              <Zap className="w-4 h-4 text-violet-500" />
              <span>{briefing.crossModuleAction.title}</span>
            </div>
            <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              "{briefing.crossModuleAction.description}"
            </p>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-600 dark:text-gray-300">Connected modules:</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">Study</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium">Fitness</span>
              <span className="px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-medium">Finance</span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium">SkillForge</span>
            </div>
          </div>

          {/* Key Metric Pillars */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/70 dark:bg-black/30 border border-gray-200/50 dark:border-gray-800/50 flex flex-col justify-between">
              <span className="text-[11px] font-medium text-gray-500">Approaching Exams</span>
              <span className="text-2xl font-heading font-extrabold text-blue-600 dark:text-blue-400">
                {briefing.stats.upcomingExamsCount}
              </span>
              <span className="text-[10px] text-gray-400">DBMS in 4 days</span>
            </div>

            <div className="p-3 rounded-xl bg-white/70 dark:bg-black/30 border border-gray-200/50 dark:border-gray-800/50 flex flex-col justify-between">
              <span className="text-[11px] font-medium text-gray-500">Remaining Budget</span>
              <span className="text-2xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400">
                ₹{briefing.stats.remainingBudget}
              </span>
              <span className="text-[10px] text-gray-400">8 days remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S FOCUS & SCHEDULE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Priorities (Linear Style) */}
        <div className="lg:col-span-2 p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-base md:text-lg text-nexus-light-text dark:text-nexus-dark-text">
                Today's Focus & Priorities
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {completedTasksCount} of {tasks.length} items completed
              </p>
            </div>
            <Link
              href="/planner"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View Planner</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => {
              const isDone = task.status === 'completed';
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`group flex items-start gap-3 p-3 rounded-xl border transition-all duration-150 cursor-pointer ${
                    isDone
                      ? 'bg-gray-50/60 dark:bg-gray-900/30 border-gray-200/50 dark:border-gray-800/40 opacity-60'
                      : 'bg-white dark:bg-nexus-dark-card border-gray-200/80 dark:border-gray-700/60 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <button
                    className="mt-0.5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium transition-colors ${
                        isDone
                          ? 'line-through text-gray-400 dark:text-gray-500'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${
                        task.priority === 'urgent'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : task.priority === 'high'
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                          : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-[11px] text-gray-400 hidden sm:inline">
                      {task.deadline}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Quick Habits & Pomodoro */}
        <div className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-base md:text-lg text-nexus-light-text dark:text-nexus-dark-text">
                Daily Habits
              </h3>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Active Streaks</span>
              </span>
            </div>

            <div className="space-y-3">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      className="text-gray-400 transition-colors"
                      aria-label="Toggle habit"
                    >
                      {habit.completedToday ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                    <span
                      className={`text-xs font-medium ${
                        habit.completedToday
                          ? 'line-through text-gray-400'
                          : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {habit.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-500" />
                    {habit.streakCount}d
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Pomodoro Widget */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-amber-500/5 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300">Pomodoro Focus</p>
                <p className="text-[10px] text-amber-600 dark:text-amber-400">25m study sprint</p>
              </div>
            </div>
            <Link
              href="/planner"
              className="p-2 rounded-btn bg-amber-600 text-white hover:bg-amber-700 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. CORE MODULE SNAPSHOTS (2x3 GRID) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Module Card 1: STUDY HUB */}
        <Link
          href="/study"
          className="group p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Study Hub
                  </span>
                  <h4 className="font-heading font-bold text-base text-nexus-light-text dark:text-nexus-dark-text">
                    Academic Command
                  </h4>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="p-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">Upcoming Exam</span>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
                  {SEED_EXAMS[0].title}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">Countdown: In {SEED_EXAMS[0].daysRemaining} days</p>
              </div>

              <div className="flex items-center justify-between pt-2 text-gray-600 dark:text-gray-400">
                <span>Pending Assignment</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {SEED_ASSIGNMENTS[0].title.slice(0, 24)}...
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span>Avg Attendance</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">85.9%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            <span>Open Study Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Module Card 2: FITNESS HUB */}
        <Link
          href="/fitness"
          className="group p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark hover:border-emerald-400 dark:hover:border-emerald-600 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Fitness Hub
                  </span>
                  <h4 className="font-heading font-bold text-base text-nexus-light-text dark:text-nexus-dark-text">
                    Training & Health
                  </h4>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  Today's Session
                </span>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
                  {SEED_WORKOUT.name}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Duration: {SEED_WORKOUT.estimatedDurationMinutes} mins • {SEED_WORKOUT.exercisesCount} Exercises
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-gray-600 dark:text-gray-400">
                <span>Weekly Streak</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">4 workouts logged</span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span>Training Style</span>
                <span className="font-semibold capitalize text-gray-900 dark:text-gray-100">
                  {SEED_WORKOUT.trainingStyle}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <span>Log Today's Workout</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Module Card 3: FINANCE HUB */}
        <Link
          href="/finance"
          className="group p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark hover:border-green-400 dark:hover:border-green-600 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                    Finance Hub
                  </span>
                  <h4 className="font-heading font-bold text-base text-nexus-light-text dark:text-nexus-dark-text">
                    Budget & Spending
                  </h4>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-2.5 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40">
                <span className="text-[10px] font-bold uppercase text-green-600 dark:text-green-400">
                  Remaining Monthly Budget
                </span>
                <p className="text-xl font-heading font-extrabold text-green-600 dark:text-green-400 mt-0.5">
                  ₹{SEED_FINANCE.remainingBudget}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-green-500 h-full rounded-full"
                    style={{
                      width: `${(SEED_FINANCE.totalSpentThisMonth / SEED_FINANCE.monthlyBudget) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span>Safe Daily Spend</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ₹{SEED_FINANCE.dailySafeSpendingLimit} / day
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span>Top Expense</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {SEED_FINANCE.topCategory} (₹{SEED_FINANCE.categoryBreakdown.Food})
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-green-600 dark:text-green-400 font-semibold">
            <span>Manage Budget & Expenses</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Module Card 4: SKILLFORGE */}
        <Link
          href="/skills"
          className="group p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark hover:border-indigo-400 dark:hover:border-indigo-600 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    SkillForge
                  </span>
                  <h4 className="font-heading font-bold text-base text-nexus-light-text dark:text-nexus-dark-text">
                    Technical Career
                  </h4>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 mt-4 text-xs">
              <div className="p-2.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">
                    Career Readiness
                  </span>
                  <span className="font-heading font-extrabold text-indigo-600 dark:text-indigo-400">
                    {SEED_SKILLFORGE.careerReadinessScore}%
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {SEED_SKILLFORGE.activeCareerPath}
                </p>
              </div>

              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span>Active Target Skill</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[150px]">
                  {SEED_SKILLFORGE.currentSkill}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span>Coding Streak</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {SEED_SKILLFORGE.activeStreak} days active
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
            <span>Explore Skill Tree</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Module Card 5: STUDENT NAVIGATE */}
        <Link
          href="/navigate"
          className="group p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark hover:border-cyan-400 dark:hover:border-cyan-600 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    Navigate
                  </span>
                  <h4 className="font-heading font-bold text-base text-nexus-light-text dark:text-nexus-dark-text">
                    Campus Transit
                  </h4>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="p-2.5 rounded-lg bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40">
                <span className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                  Saved Commute
                </span>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
                  {SEED_TRANSIT_ROUTE.originName} → {SEED_TRANSIT_ROUTE.destinationName}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Est. {SEED_TRANSIT_ROUTE.durationMinutes} mins • Fare ₹{SEED_TRANSIT_ROUTE.estimatedFare}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 text-gray-600 dark:text-gray-400">
                <span>Frequency</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Every 15 mins</span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span>Live Status</span>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  Demo Provider
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
            <span>Find Transit Routes</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Module Card 6: AI CORE */}
        <Link
          href="/ai"
          className="group p-6 rounded-card bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent dark:from-violet-950/40 dark:via-purple-950/20 dark:to-transparent border border-violet-300/60 dark:border-violet-700/50 shadow-card dark:shadow-card-dark hover:border-violet-500 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <NexusOrb size="sm" state="idle" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                    AI Core
                  </span>
                  <h4 className="font-heading font-bold text-base text-nexus-light-text dark:text-nexus-dark-text">
                    Cross-Module Brain
                  </h4>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2 mt-4 text-xs text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                Connects academic deadlines, fitness stress levels, financial burn rate, and career milestones into actionable guidance.
              </p>
              <div className="p-2 rounded-lg bg-violet-100/60 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800/40 text-[11px]">
                <span className="font-bold text-violet-700 dark:text-violet-300">Suggested Action:</span>
                <p className="text-gray-600 dark:text-gray-300 mt-0.5">
                  "Complete 45 minutes of DSA review before your workout tonight."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-violet-200/60 dark:border-violet-800/40 flex items-center justify-between text-[11px] text-violet-600 dark:text-violet-400 font-semibold">
            <span>Launch AI Chat Session</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
