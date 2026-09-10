'use client';

import React from 'react';
import { Dumbbell, Flame, Clock, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { SEED_WORKOUT } from '@/lib/data/nexus-seed';

export default function FitnessPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            <Dumbbell className="w-4 h-4" />
            <span>Fitness Hub</span>
            <span className="text-gray-400 font-normal">• Phase 5 Architecture Ready</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
            Workout & Physical Training
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            Intelligent exercise planning that balances physical health with study stress.
          </p>
        </div>
      </div>

      {/* Today's Adaptive Workout Banner */}
      <div className="p-6 rounded-card-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-600 text-white">
                Today's Adjusted Plan
              </span>
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                Shortened for Exam Week
              </span>
            </div>
            <h3 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white">
              {SEED_WORKOUT.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
              Targets: {SEED_WORKOUT.targetMuscleGroups.join(', ')} • {SEED_WORKOUT.estimatedDurationMinutes} minutes • {SEED_WORKOUT.exercisesCount} core movements
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-gray-400">Weekly Consistency</span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-current" />
                <span>4 workouts logged</span>
              </p>
            </div>
            <button className="px-5 py-2.5 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-button-primary transition-all">
              Start Session
            </button>
          </div>
        </div>
      </div>

      {/* Routine Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-2">
            1. Barbell Flat Bench
          </h4>
          <p className="text-xs text-gray-500 mb-3">Primary compound chest activation</p>
          <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300 font-mono">
            <div className="p-2 rounded bg-gray-50 dark:bg-gray-800 flex justify-between">
              <span>Set 1: 70 kg</span>
              <span>8 reps</span>
            </div>
            <div className="p-2 rounded bg-gray-50 dark:bg-gray-800 flex justify-between">
              <span>Set 2: 75 kg</span>
              <span>6 reps</span>
            </div>
            <div className="p-2 rounded bg-gray-50 dark:bg-gray-800 flex justify-between">
              <span>Set 3: 75 kg</span>
              <span>6 reps</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-2">
            2. Incline DB Press
          </h4>
          <p className="text-xs text-gray-500 mb-3">Upper clavicular focus</p>
          <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300 font-mono">
            <div className="p-2 rounded bg-gray-50 dark:bg-gray-800 flex justify-between">
              <span>Set 1: 22 kg / arm</span>
              <span>10 reps</span>
            </div>
            <div className="p-2 rounded bg-gray-50 dark:bg-gray-800 flex justify-between">
              <span>Set 2: 24 kg / arm</span>
              <span>8 reps</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-2">
            3. Triceps Cable Pushdowns
          </h4>
          <p className="text-xs text-gray-500 mb-3">Direct arm hypertrophy</p>
          <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300 font-mono">
            <div className="p-2 rounded bg-gray-50 dark:bg-gray-800 flex justify-between">
              <span>Set 1: 25 kg</span>
              <span>12 reps</span>
            </div>
            <div className="p-2 rounded bg-gray-50 dark:bg-gray-800 flex justify-between">
              <span>Set 2: 27.5 kg</span>
              <span>10 reps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

