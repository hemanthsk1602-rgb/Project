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
      notes: `Crushed ${currentRoutine.routineName} with focus on progressive tension.`,
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
      <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold text-[#D5FF3E] uppercase tracking-wider block mb-0.5">
            Live Workout Session
          </span>
          <h2 className="font-outfit text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight">
            {currentRoutine.routineName}
          </h2>
          <p className="text-xs text-white/50 mt-0.5">
            Movement {currentExIndex + 1} of {exercises.length} • {currentExercise.muscleGroup}
          </p>
        </div>

        {/* Stopwatch & Session Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-white">
            <Clock className="w-4 h-4 text-[#D5FF3E]" />
            <span className="text-sm font-black font-mono">{formatTime(elapsedSeconds)}</span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2.5 rounded-full border transition-all ${
              isPaused
                ? 'bg-[#D5FF3E]/20 text-[#D5FF3E] border-[#D5FF3E]/40'
                : 'bg-white/5 text-white/70 hover:text-white border-white/10'
            }`}
            title={isPaused ? 'Resume Session' : 'Pause Session'}
          >
            {isPaused ? <Play className="w-4 h-4 fill-[#D5FF3E]" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={handleFinishWorkout}
            className="px-6 py-2.5 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black text-xs font-extrabold transition-all shadow-lg shadow-[#D5FF3E]/20 hover:scale-105 active:scale-95"
          >
            Finish Workout
          </button>
        </div>
      </div>

      {/* Rest Timer Floating/Inline Bar */}
      {restSecondsRemaining !== null && restSecondsRemaining > 0 && (
        <div className="p-4 rounded-3xl bg-black/60 border border-[#D5FF3E]/40 backdrop-blur-2xl flex items-center justify-between animate-in slide-in-from-top-2 shadow-xl shadow-[#D5FF3E]/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D5FF3E]/15 text-[#D5FF3E] flex items-center justify-center font-mono font-black text-lg border border-[#D5FF3E]/30 animate-pulse">
              {restSecondsRemaining}s
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#D5FF3E] uppercase tracking-wider block">
                Rest Timer Active
              </span>
              <span className="text-xs text-white/60">
                Hydrate and mentally prepare for Set {currentSets.filter((s) => s.completed).length + 1}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRestSecondsRemaining((prev) => (prev || 0) + 30)}
              className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 hover:bg-white/15 transition-all"
            >
              +30s
            </button>
            <button
              onClick={() => setRestSecondsRemaining(0)}
              className="p-1.5 rounded-full text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Exercise Card in Focus */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative space-y-6">
        {/* Exercise Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5FF3E]">
              <Dumbbell className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5FF3E]">
                  {currentExercise.muscleGroup}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs text-white/50">{currentExercise.difficulty}</span>
              </div>
              <h3 className="font-outfit text-2xl font-extrabold text-white mt-0.5 tracking-tight">
                {currentExercise.name}
              </h3>
            </div>
          </div>

          {/* Swap Exercise Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReplaceModal(true)}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Replace Exercise</span>
            </button>
          </div>
        </div>

        {/* Interactive Sets Logger Table */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-white/40 uppercase tracking-wider px-3">
            <span className="col-span-2 text-center">Set</span>
            <span className="col-span-3 text-center">Target Reps</span>
            <span className="col-span-3 text-center">Weight (kg)</span>
            <span className="col-span-2 text-center">Actual Reps</span>
            <span className="col-span-2 text-right">Log Set</span>
          </div>

          {currentSets.map((set, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 gap-2 items-center p-3.5 rounded-2xl border transition-all ${
                set.completed
                  ? 'bg-[#D5FF3E]/10 border-[#D5FF3E]/30'
                  : 'bg-black/30 border-white/5 hover:border-white/10'
              }`}
            >
              {/* Set # */}
              <div className="col-span-2 text-center font-bold text-xs text-white font-mono">
                Set 0{set.setNumber}
              </div>

              {/* Target Reps */}
              <div className="col-span-3 text-center text-xs font-semibold text-white/60">
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
                  className="w-16 px-2 py-1.5 rounded-xl bg-black/50 border border-white/10 text-center text-xs font-bold text-white focus:outline-none focus:border-[#D5FF3E] transition-colors"
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
                  className="w-14 px-2 py-1.5 rounded-xl bg-black/50 border border-white/10 text-center text-xs font-bold text-[#D5FF3E] focus:outline-none focus:border-[#D5FF3E] transition-colors"
                />
              </div>

              {/* Checkmark Complete Button */}
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={() => handleCompleteSet(idx)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    set.completed
                      ? 'bg-[#D5FF3E] text-black shadow-lg shadow-[#D5FF3E]/30 scale-105'
                      : 'bg-white/10 text-white/40 hover:text-white hover:bg-white/20'
                  }`}
                  aria-label="Complete set"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Form execution cues footer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5FF3E] block mb-1">
            Biomechanical Form Cue
          </span>
          <p className="text-xs text-white/70 leading-relaxed">
            {currentExercise.formTips[0] || 'Focus on controlled eccentric tempo and peak isometric tension.'}
          </p>
        </div>

        {/* Action Controls for this exercise */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={handleSkipExercise}
            className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5"
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
            {currentExIndex === exercises.length - 1 ? 'Finish Workout' : 'Next Movement'}
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
        subtitle="Outstanding effort! Your body adapts through consistency and overload."
        maxWidth="md"
      >
        <div className="space-y-6 text-center py-2">
          <div className="w-20 h-20 rounded-3xl bg-[#D5FF3E]/15 border border-[#D5FF3E]/30 text-[#D5FF3E] flex items-center justify-center mx-auto text-3xl shadow-xl shadow-[#D5FF3E]/20 animate-bounce">
            🏆
          </div>

          <div>
            <h3 className="font-outfit text-xl font-extrabold text-white">{currentRoutine.routineName}</h3>
            <p className="text-xs text-white/60 mt-1">Logged to your fitness history & streak updated!</p>
          </div>

          {/* Stats Breakdown */}
          {(() => {
            const stats = calculateWorkoutStats();
            return (
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Duration</span>
                  <span className="font-outfit text-base font-extrabold text-white mt-0.5">
                    {stats.durationMinutes} Minutes
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Movements</span>
                  <span className="font-outfit text-base font-extrabold text-white mt-0.5">
                    {exercises.length} Completed
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Total Sets</span>
                  <span className="font-outfit text-base font-extrabold text-[#D5FF3E] mt-0.5">
                    {stats.totalCompletedSets || currentRoutine.exercises.length * 3} Sets
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Total Tonnage</span>
                  <span className="font-outfit text-base font-extrabold text-white mt-0.5">
                    {stats.totalVolume} kg
                  </span>
                </div>
              </div>
            );
          })()}

          <div className="p-3.5 rounded-2xl bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 text-xs text-[#D5FF3E] font-bold">
            +200 XP Earned • Streak +1 Day Extended 🔥
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors"
            >
              Dashboard
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
