'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  SkipForward,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  Flame,
  Dumbbell,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ReplaceExerciseModal } from '@/components/workout/ReplaceExerciseModal';
import { Exercise } from '@/lib/types';
import confetti from 'canvas-confetti';

interface SessionSet {
  setNumber: number;
  targetReps: string;
  reps: number;
  weight: number;
  completed: boolean;
}

export default function WorkoutSessionPage() {
  const router = useRouter();
  const { profile, workoutPlan, logCompletedWorkout } = useFitness();

  // Pick today's routine or fallback
  const todayDayIndex = new Date().getDay();
  const normalizedIndex = todayDayIndex === 0 ? 6 : todayDayIndex - 1;
  const currentRoutine = workoutPlan.days[normalizedIndex] || workoutPlan.days[0];

  const [exercises, setExercises] = useState<Exercise[]>(
    currentRoutine.exercises.length > 0 ? currentRoutine.exercises : workoutPlan.days[0].exercises
  );
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [setsData, setSetsData] = useState<Record<string, SessionSet[]>>({});
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Overall workout stopwatch
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Rest Timer
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number | null>(null);
  const [restTimerActive, setRestTimerActive] = useState(false);

  const currentExercise = exercises[currentExIndex] || exercises[0];

  // Initialize sets for all exercises if not already set
  useEffect(() => {
    if (exercises.length === 0) return;
    const initial: Record<string, SessionSet[]> = {};
    exercises.forEach((ex) => {
      const sets: SessionSet[] = [];
      for (let i = 1; i <= ex.sets; i++) {
        // parse target rep count number
        const baseReps = parseInt(ex.reps) || 10;
        sets.push({
          setNumber: i,
          targetReps: ex.reps,
          reps: baseReps,
          weight: ex.defaultWeightKg || 0,
          completed: false,
        });
      }
      initial[ex.id] = sets;
    });
    setSetsData(initial);
  }, [exercises]);

  // Overall workout timer effect
  useEffect(() => {
    if (isPaused || showSummaryModal) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, showSummaryModal]);

  // Rest timer countdown effect
  useEffect(() => {
    if (!restTimerActive || restSecondsRemaining === null || restSecondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setRestSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          setRestTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [restTimerActive, restSecondsRemaining]);

  const currentSets = (currentExercise && setsData[currentExercise.id]) || [];

  const handleUpdateSet = (index: number, field: 'reps' | 'weight', val: number) => {
    if (!currentExercise) return;
    setSetsData((prev) => {
      const copy = [...(prev[currentExercise.id] || [])];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, [currentExercise.id]: copy };
    });
  };

  const handleCompleteSet = (index: number) => {
    if (!currentExercise) return;
    setSetsData((prev) => {
      const copy = [...(prev[currentExercise.id] || [])];
      copy[index] = { ...copy[index], completed: !copy[index].completed };
      return { ...prev, [currentExercise.id]: copy };
    });

    // Start rest timer automatically if set was completed
    if (!currentSets[index]?.completed) {
      setRestSecondsRemaining(currentExercise.restSeconds || 60);
      setRestTimerActive(true);
    }
  };

  const handleSkipExercise = () => {
    if (currentExIndex < exercises.length - 1) {
      setCurrentExIndex(currentExIndex + 1);
      setRestTimerActive(false);
    }
  };

  const handleNextExercise = () => {
    if (currentExIndex < exercises.length - 1) {
      setCurrentExIndex(currentExIndex + 1);
      setRestTimerActive(false);
    } else {
      handleFinishWorkout();
    }
  };

  const handleReplaceExercise = (replacement: Exercise) => {
    setExercises((prev) => {
      const copy = [...prev];
      copy[currentExIndex] = replacement;
      return copy;
    });
  };

  const calculateWorkoutStats = () => {
    let totalCompletedSets = 0;
    let totalVolume = 0;

    Object.values(setsData).forEach((sets) => {
      sets.forEach((s) => {
        if (s.completed) {
          totalCompletedSets += 1;
          totalVolume += s.reps * (s.weight > 0 ? s.weight : profile.weight);
        }
      });
    });

    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    const estimatedCalories = Math.round(durationMinutes * 7.5);

    return {
      durationMinutes,
      totalCompletedSets,
      totalVolume: Math.round(totalVolume),
      estimatedCalories,
    };
  };

  const handleFinishWorkout = () => {
    const stats = calculateWorkoutStats();

    logCompletedWorkout({
      date: 'Today',
      workoutName: currentRoutine.routineName,
      trainingStyle: profile.trainingStyle,
      durationMinutes: stats.durationMinutes,
      exercisesCompleted: exercises.length,
      totalSets: stats.totalCompletedSets || currentRoutine.exercises.length * 3,
      totalVolumeKg: stats.totalVolume || 1200,
      caloriesBurned: stats.estimatedCalories,
      notes: `Crushed ${currentRoutine.routineName} with focus on form & tension.`,
    });

    setShowSummaryModal(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!currentExercise) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Session Top Status Bar */}
      <div className="glass-card p-4 sm:p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
            Active Training Session
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {currentRoutine.routineName}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Exercise {currentExIndex + 1} of {exercises.length}
          </p>
        </div>

        {/* Stopwatch & Session Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-black font-mono">{formatTime(elapsedSeconds)}</span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2.5 rounded-xl border transition-all ${
              isPaused
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800/80 text-slate-300 hover:text-white border-slate-700'
            }`}
            title={isPaused ? 'Resume Session' : 'Pause Session'}
          >
            {isPaused ? <Play className="w-4 h-4 fill-emerald-400" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={handleFinishWorkout}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md shadow-emerald-500/25 active:scale-95"
          >
            Finish Workout
          </button>
        </div>
      </div>

      {/* Rest Timer Floating/Inline Bar */}
      {restSecondsRemaining !== null && restSecondsRemaining > 0 && (
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-black text-base border border-cyan-500/30">
              {restSecondsRemaining}s
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                Rest Timer Active
              </span>
              <span className="text-[11px] text-slate-400">
                Catch your breath, hydrate, and prepare for set {currentSets.filter((s) => s.completed).length + 1}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRestSecondsRemaining((prev) => (prev || 0) + 30)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-cyan-300 text-xs font-bold border border-slate-700 hover:bg-slate-700"
            >
              +30s
            </button>
            <button
              onClick={() => setRestSecondsRemaining(0)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Exercise Card in Focus */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative space-y-6">
        {/* Exercise Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Dumbbell className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  {currentExercise.muscleGroup}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{currentExercise.difficulty}</span>
              </div>
              <h3 className="text-2xl font-black text-white mt-0.5">{currentExercise.name}</h3>
            </div>
          </div>

          {/* Swap Exercise Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReplaceModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Replace Exercise</span>
            </button>
          </div>
        </div>

        {/* Interactive Sets Logger Table */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3">
            <span className="col-span-2 text-center">Set</span>
            <span className="col-span-3 text-center">Target Reps</span>
            <span className="col-span-3 text-center">Weight (kg)</span>
            <span className="col-span-2 text-center">Actual Reps</span>
            <span className="col-span-2 text-right">Log Set</span>
          </div>

          {currentSets.map((set, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 gap-2 items-center p-3 rounded-2xl border transition-all ${
                set.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Set # */}
              <div className="col-span-2 text-center font-bold text-sm text-white">
                Set 0{set.setNumber}
              </div>

              {/* Target Reps */}
              <div className="col-span-3 text-center text-xs font-medium text-slate-300">
                {set.targetReps}
              </div>

              {/* Weight input */}
              <div className="col-span-3 flex justify-center">
                <input
                  type="number"
                  min="0"
                  step="2.5"
                  value={set.weight}
                  onChange={(e) => handleUpdateSet(idx, 'weight', Number(e.target.value) || 0)}
                  className="w-16 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-center text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Reps input */}
              <div className="col-span-2 flex justify-center">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={set.reps}
                  onChange={(e) => handleUpdateSet(idx, 'reps', Number(e.target.value) || 0)}
                  className="w-14 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-center text-xs font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Checkmark Complete Button */}
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={() => handleCompleteSet(idx)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    set.completed
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                  aria-label="Complete set"
                >
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Form execution cues footer */}
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Coach Form Cue
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentExercise.formTips[0] || 'Focus on controlled tempo and maximum range of motion.'}
          </p>
        </div>

        {/* Action Controls for this exercise */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handleSkipExercise}
            className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip Exercise</span>
          </button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNextExercise}
            icon={currentExIndex === exercises.length - 1 ? <Trophy className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          >
            {currentExIndex === exercises.length - 1 ? 'Finish Workout' : 'Next Exercise'}
          </Button>
        </div>
      </div>

      {/* Replace Modal */}
      <ReplaceExerciseModal
        currentExercise={currentExercise}
        isOpen={showReplaceModal}
        onClose={() => setShowReplaceModal(false)}
        onSelectReplacement={handleReplaceExercise}
      />

      {/* Workout Completion Summary Modal */}
      <Modal
        isOpen={showSummaryModal}
        onClose={() => router.push('/dashboard')}
        title="Workout Completed 🎉"
        subtitle="Outstanding effort! Your body adapts when you push through resistance."
        maxWidth="md"
      >
        <div className="space-y-6 text-center py-2">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-500/20 animate-bounce">
            🏆
          </div>

          <div>
            <h3 className="text-xl font-black text-white">{currentRoutine.routineName}</h3>
            <p className="text-xs text-slate-400 mt-1">Logged to your fitness history & streak updated!</p>
          </div>

          {/* Stats Breakdown */}
          {(() => {
            const stats = calculateWorkoutStats();
            return (
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Duration</span>
                  <span className="text-base font-black text-white mt-0.5">
                    {stats.durationMinutes} Minutes
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Exercises</span>
                  <span className="text-base font-black text-white mt-0.5">
                    {exercises.length} Completed
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Total Sets</span>
                  <span className="text-base font-black text-emerald-400 mt-0.5">
                    {stats.totalCompletedSets || currentRoutine.exercises.length * 3} Sets
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Est. Calories</span>
                  <span className="text-base font-black text-orange-400 mt-0.5">
                    ~{stats.estimatedCalories} kcal
                  </span>
                </div>
              </div>
            );
          })()}

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-semibold">
            +200 XP Earned • Streak +1 Day Extended 🔥
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
            >
              Go to Dashboard
            </button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => router.push('/progress')}
            >
              View Progress
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

