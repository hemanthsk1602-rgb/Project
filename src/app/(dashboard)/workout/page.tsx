'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Dumbbell,
  Play,
  Clock,
  Flame,
  Calendar,
  Layers,
  History,
  Search,
  Filter,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { ExerciseCard } from '@/components/workout/ExerciseCard';
import { EXERCISE_DATABASE } from '@/lib/data/exercises';
import { TrainingStyle, Exercise } from '@/lib/types';

export default function WorkoutPage() {
  const { profile, workoutPlan, workoutHistory, updateTrainingStyle, regeneratePlan } = useFitness();
  const [activeTab, setActiveTab] = useState<'today' | 'weekly' | 'exercises' | 'history'>('today');
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<string>('All');

  // Identify current day's routine
  const todayDayIndex = new Date().getDay();
  const normalizedIndex = todayDayIndex === 0 ? 6 : todayDayIndex - 1;
  const todayWorkout = workoutPlan.days[normalizedIndex] || workoutPlan.days[0];

  const handleStyleChange = (newStyle: TrainingStyle) => {
    updateTrainingStyle(newStyle);
  };

  const muscleFilters = ['All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Skill', 'Core'];

  const filteredLibrary = EXERCISE_DATABASE.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(exerciseSearch.toLowerCase());
    const matchesMuscle = selectedMuscleFilter === 'All' || ex.muscleGroup === selectedMuscleFilter;
    const matchesStyle =
      profile.trainingStyle === 'Hybrid' || ex.style === profile.trainingStyle || ex.style === 'Both';
    return matchesSearch && matchesMuscle && matchesStyle;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <TopHeader
        title="Training & Routines"
        subtitle={`Personalized for ${profile.name} • ${profile.goal}`}
        actionButton={{
          label: 'Start Today\'s Session',
          href: '/workout/session',
          icon: <Play className="w-4 h-4 fill-black" />,
        }}
      />

      {/* Top Banner: Training Style Switcher */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            Active Training Discipline
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {profile.trainingStyle === 'Gym' && '🏋️ Gym Weightlifting'}
            {profile.trainingStyle === 'Calisthenics' && '🤸 Calisthenics Bodyweight Mastery'}
            {profile.trainingStyle === 'Hybrid' && '🔀 Hybrid Strength & Skill Split'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Switch style anytime. FitPlus instantly rebuilds your routines and progression trees.
          </p>
        </div>

        {/* 3-way Style Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 self-start md:self-center">
          <button
            onClick={() => handleStyleChange('Gym')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              profile.trainingStyle === 'Gym'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🏋️</span>
            <span>Gym</span>
          </button>
          <button
            onClick={() => handleStyleChange('Calisthenics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              profile.trainingStyle === 'Calisthenics'
                ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🤸</span>
            <span>Calisthenics</span>
          </button>
          <button
            onClick={() => handleStyleChange('Hybrid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              profile.trainingStyle === 'Hybrid'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🔀</span>
            <span>Hybrid</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'today', label: "Today's Workout", icon: Play },
          { id: 'weekly', label: 'Weekly Plan', icon: Calendar },
          { id: 'exercises', label: 'Exercise Library', icon: Dumbbell },
          { id: 'history', label: 'Workout History', icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Today's Workout */}
      {activeTab === 'today' && (
        <div className="space-y-6">
          {/* Today Overview Card */}
          {todayWorkout.isRestDay ? (
            <div className="space-y-6">
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/20 to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[11px] font-bold border border-cyan-500/30 uppercase">
                    Scheduled Rest & Recovery Day
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-2">
                    {todayWorkout.routineName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Muscles grow during recovery! Focus on hydration, mobility, and hitting {profile.proteinTarget}g protein.
                  </p>
                </div>
                <Link
                  href="/recovery"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all shrink-0"
                >
                  View Recovery Status
                </Link>
              </div>

              {/* Upcoming Training Routine preview so user always has exercises */}
              {(() => {
                const nextTrainingDay = workoutPlan.days.find((d) => !d.isRestDay) || workoutPlan.days[0];
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Upcoming Session
                        </span>
                        <h4 className="text-lg font-bold text-white mt-0.5">
                          {nextTrainingDay.routineName} ({nextTrainingDay.focus})
                        </h4>
                      </div>
                      <Link
                        href="/workout/session"
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Start This Routine</span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {nextTrainingDay.exercises.map((exercise, index) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <>
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-bold border border-emerald-500/30 uppercase">
                      Scheduled Today
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-400 font-medium">
                      {todayWorkout.difficulty} Level
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    {todayWorkout.routineName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Target Muscle Groups: <strong className="text-emerald-400">{todayWorkout.focus}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right sm:border-r border-slate-800 sm:pr-6">
                    <span className="text-[11px] text-slate-400 block font-medium">Estimated Time</span>
                    <span className="text-lg font-bold text-white">{todayWorkout.durationMinutes} min</span>
                  </div>
                  <Link
                    href="/workout/session"
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>Start Session</span>
                  </Link>
                </div>
              </div>

              {/* Exercise Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {todayWorkout.exercises.map((exercise, index) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Tab 2: Weekly Plan */}
      {activeTab === 'weekly' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-white">Full Weekly Split Overview</h4>
            <button
              onClick={regeneratePlan}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate Split</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workoutPlan.days.map((day, i) => (
              <div
                key={day.id}
                className={`glass-card p-6 rounded-2xl border transition-all ${
                  day.isRestDay
                    ? 'border-slate-800/60 opacity-80'
                    : 'border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {day.dayName}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      day.isRestDay
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {day.isRestDay ? 'Rest Day' : `${day.durationMinutes} min`}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-1">{day.routineName}</h4>
                <p className="text-xs text-slate-400 mb-4">{day.focus}</p>

                {!day.isRestDay ? (
                  <div className="space-y-1.5 border-t border-slate-800/80 pt-3 text-xs text-slate-300">
                    <span className="text-[11px] text-slate-500 block mb-1">
                      {day.exercises.length} Exercises:
                    </span>
                    {day.exercises.map((ex) => (
                      <div key={ex.id} className="flex items-center justify-between py-0.5">
                        <span className="truncate pr-2">{ex.name}</span>
                        <span className="text-slate-500 shrink-0">{ex.sets} × {ex.reps}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic border-t border-slate-800/80 pt-3">
                    Active joint mobility, hydration, and cellular recovery.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Exercise Library */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Bench Press, Pull-ups, Squats, Muscle-ups..."
                value={exerciseSearch}
                onChange={(e) => setExerciseSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {muscleFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedMuscleFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                    selectedMuscleFilter === filter
                      ? 'bg-emerald-500 text-black'
                      : 'bg-slate-800/70 text-slate-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLibrary.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white">Past Logged Workout Sessions</h4>

          {workoutHistory.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-3xl border border-slate-800">
              <History className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No past workouts logged yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {workoutHistory.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-emerald-400">{item.date}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">{item.trainingStyle}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{item.workoutName}</h4>
                    {item.notes && <p className="text-xs text-slate-400 mt-1 italic">"{item.notes}"</p>}
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-center min-w-[70px]">
                      <span className="text-[10px] text-slate-500 block">Duration</span>
                      <span className="font-bold text-white">{item.durationMinutes}m</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-center min-w-[70px]">
                      <span className="text-[10px] text-slate-500 block">Total Sets</span>
                      <span className="font-bold text-emerald-400">{item.totalSets}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-center min-w-[70px]">
                      <span className="text-[10px] text-slate-500 block">Calories</span>
                      <span className="font-bold text-orange-400">{item.caloriesBurned} kcal</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

