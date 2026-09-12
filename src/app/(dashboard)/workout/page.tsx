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
  Zap,
  ArrowRight,
  Shield,
  Activity,
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Identify current day's routine
  const todayDayIndex = new Date().getDay();
  const normalizedIndex = todayDayIndex === 0 ? 6 : todayDayIndex - 1;
  const todayWorkout = workoutPlan.days[normalizedIndex] || workoutPlan.days[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStyleChange = (newStyle: TrainingStyle) => {
    updateTrainingStyle(newStyle);
    showToast(`Switched discipline to ${newStyle}! Routine regenerated.`);
  };

  const handleRegenerate = () => {
    regeneratePlan();
    showToast('Plan regenerated with fresh exercise variations!');
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
        title="Training & Workout Programs"
        subtitle={`Customized split for ${profile.name} • ${profile.goal} (${profile.experience} Tier)`}
        actionButton={{
          label: "Start Today's Session",
          href: '/workout/session',
          icon: <Play className="w-4 h-4 fill-black" />,
        }}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-[#D5FF3E]/10 border border-[#D5FF3E]/30 text-[#D5FF3E] text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TRAINING DISCIPLINE SELECTOR (Gym vs Calisthenics vs Hybrid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-pulse" />
            <h2 className="font-outfit text-sm font-extrabold uppercase tracking-wider text-white">
              Select Discipline
            </h2>
          </div>
          <button
            onClick={handleRegenerate}
            className="text-xs font-bold text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#D5FF3E]" />
            <span>Regenerate Routine Variations</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Gym Card */}
          <div
            onClick={() => handleStyleChange('Gym')}
            className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              profile.trainingStyle === 'Gym'
                ? 'bg-white/[0.06] border-[#D5FF3E] shadow-xl shadow-[#D5FF3E]/10'
                : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🏋️</span>
                {profile.trainingStyle === 'Gym' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#D5FF3E] text-black">
                    Active Discipline
                  </span>
                )}
              </div>
              <h3 className="font-outfit text-lg font-bold text-white">Gym Weightlifting</h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                Strength training • Equipment-based workouts • Progressive overload with barbell compound lifts and isolation hypertrophy.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/50">
              <span className="text-[#D5FF3E] font-semibold">Barbell • Dumbbells • Machines</span>
            </div>
          </div>

          {/* Calisthenics Card */}
          <div
            onClick={() => handleStyleChange('Calisthenics')}
            className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              profile.trainingStyle === 'Calisthenics'
                ? 'bg-white/[0.06] border-[#D5FF3E] shadow-xl shadow-[#D5FF3E]/10'
                : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🤸</span>
                {profile.trainingStyle === 'Calisthenics' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#D5FF3E] text-black">
                    Active Discipline
                  </span>
                )}
              </div>
              <h3 className="font-outfit text-lg font-bold text-white">Calisthenics Mastery</h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                Bodyweight training • Skill development • Progressive movements from clean pull-ups to front levers and handstand push-ups.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/50">
              <span className="text-[#D5FF3E] font-semibold">Bars • Rings • Bodyweight Skills</span>
            </div>
          </div>

          {/* Hybrid Card */}
          <div
            onClick={() => handleStyleChange('Hybrid')}
            className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              profile.trainingStyle === 'Hybrid'
                ? 'bg-white/[0.06] border-[#D5FF3E] shadow-xl shadow-[#D5FF3E]/10'
                : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🔀</span>
                {profile.trainingStyle === 'Hybrid' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#D5FF3E] text-black">
                    Active Discipline
                  </span>
                )}
              </div>
              <h3 className="font-outfit text-lg font-bold text-white">Hybrid Split</h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                The ultimate athletic balance. Combine raw gym compound powerlifting with gymnastic relative strength and athletic mobility.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/50">
              <span className="text-[#D5FF3E] font-semibold">Dual Modality Overload</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        {[
          { id: 'today', label: "Today's Workout", icon: Play },
          { id: 'weekly', label: '7-Day Microcycle Split', icon: Calendar },
          { id: 'exercises', label: 'Exercise Library', icon: Dumbbell },
          { id: 'history', label: 'Workout History', icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#D5FF3E] text-black shadow-lg shadow-[#D5FF3E]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
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
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold border border-white/15 uppercase">
                    Scheduled Rest & Recovery Day
                  </span>
                  <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-3">
                    {todayWorkout.routineName}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">
                    Muscles grow during recovery. Focus on hydration, mobility stretching, and hitting your {profile.proteinTarget}g protein target.
                  </p>
                </div>
                <Link
                  href="/recovery"
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 transition-all shrink-0"
                >
                  View Recovery Report
                </Link>
              </div>

              {/* Upcoming Training Routine preview so user can always inspect & train */}
              {(() => {
                const nextTrainingDay = workoutPlan.days.find((d) => !d.isRestDay) || workoutPlan.days[0];
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D5FF3E]">
                          Next Scheduled Session
                        </span>
                        <h4 className="font-outfit text-lg font-bold text-white mt-0.5">
                          {nextTrainingDay.routineName} ({nextTrainingDay.focus})
                        </h4>
                      </div>
                      <Link
                        href="/workout/session"
                        className="px-6 py-2.5 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black text-xs font-extrabold transition-all shadow-md shadow-[#D5FF3E]/20 active:scale-95 flex items-center gap-2"
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
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#D5FF3E]/5 rounded-full blur-3xl pointer-events-none -z-0" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/30">
                      Active Routine
                    </span>
                    <span className="text-xs text-white/50">•</span>
                    <span className="text-xs text-white/60 font-semibold">{todayWorkout.durationMinutes} Minutes</span>
                    <span className="text-xs text-white/50">•</span>
                    <span className="text-xs text-white/60 font-semibold">{todayWorkout.exercises.length} Movements</span>
                  </div>

                  <h3 className="font-outfit text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                    {todayWorkout.routineName}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-1">
                    Targeted Muscle Heads: <strong className="text-white">{todayWorkout.focus}</strong>
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <Link
                    href="/workout/session"
                    className="px-8 py-3.5 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black text-sm font-extrabold transition-all shadow-xl shadow-[#D5FF3E]/20 hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>Launch Live Session</span>
                  </Link>
                </div>
              </div>

              {/* Exercise Cards Grid */}
              <div className="space-y-3">
                <h4 className="font-outfit text-sm font-bold uppercase tracking-wider text-white/60">
                  Movement Order ({todayWorkout.exercises.length} Exercises)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {todayWorkout.exercises.map((exercise, index) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: 7-Day Microcycle Split */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <h3 className="font-outfit text-xl font-bold text-white">
              7-Day Training Microcycle ({profile.daysPerWeek} Training Days / Week)
            </h3>
            <p className="text-xs text-white/60 mt-1">
              Engineered with optimal frequency and volume distribution for {profile.trainingStyle} adaptation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {workoutPlan.days.map((day, idx) => {
              const isToday = idx === normalizedIndex;

              return (
                <div
                  key={day.id || idx}
                  className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                    isToday
                      ? 'bg-white/[0.06] border-[#D5FF3E] shadow-xl shadow-[#D5FF3E]/10'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                        {day.dayName}
                      </span>
                      {isToday && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#D5FF3E] text-black">
                          Today
                        </span>
                      )}
                    </div>

                    <h4 className="font-outfit text-base font-extrabold text-white">
                      {day.routineName}
                    </h4>
                    <p className="text-xs text-white/60 mt-1">Focus: {day.focus}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                    <span>{day.isRestDay ? 'Active Recovery' : `${day.durationMinutes} min`}</span>
                    <span>{day.exercises.length} exercises</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Exercise Library */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          {/* Search & Muscle Filters Bar */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={exerciseSearch}
                onChange={(e) => setExerciseSearch(e.target.value)}
                placeholder="Search exercise by name or keyword..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D5FF3E] transition-colors"
              />
            </div>

            {/* Muscle Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {muscleFilters.map((muscle) => (
                <button
                  key={muscle}
                  onClick={() => setSelectedMuscleFilter(muscle)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    selectedMuscleFilter === muscle
                      ? 'bg-[#D5FF3E] text-black shadow-md shadow-[#D5FF3E]/20'
                      : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {muscle}
                </button>
              ))}
            </div>
          </div>

          {/* Library Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLibrary.map((exercise, index) => (
              <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Workout History */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <h3 className="font-outfit text-xl font-bold text-white">Completed Workout Log History</h3>
            <p className="text-xs text-white/60 mt-1">
              Verified sessions recorded with progressive overload metrics, volume tonnage, and duration.
            </p>
          </div>

          {workoutHistory.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 text-white/40 text-xs">
              No completed sessions recorded yet. Start today&apos;s workout to build your history!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workoutHistory.map((session) => (
                <div
                  key={session.id}
                  className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 text-[#D5FF3E] flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-outfit text-sm font-extrabold text-white">{session.workoutName}</h4>
                      <p className="text-xs text-white/50 mt-0.5">
                        {session.date} • {session.durationMinutes} min • {session.exercisesCompleted} movements
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-outfit text-base font-extrabold text-[#D5FF3E] block">
                      {session.totalVolumeKg} kg
                    </span>
                    <span className="text-[10px] uppercase font-bold text-white/40">Total Tonnage</span>
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
