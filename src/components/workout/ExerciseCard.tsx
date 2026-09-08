import React, { useState } from 'react';
import { Exercise } from '@/lib/types';
import { Dumbbell, Clock, Repeat, Flame, Info, ArrowRightLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import { ReplaceExerciseModal } from './ReplaceExerciseModal';
import Link from 'next/link';

interface ExerciseCardProps {
  exercise: Exercise;
  onReplace?: (replacement: Exercise) => void;
  index?: number;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onReplace, index }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showReplace, setShowReplace] = useState(false);

  const difficultyColors = {
    Beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Intermediate: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    Advanced: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  }[exercise.difficulty];

  return (
    <>
      <div className="glass-card p-5 rounded-2xl flex flex-col justify-between transition-all duration-200 hover:border-slate-700/80 group">
        <div>
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              {/* Illustration / Category Avatar */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/70 flex items-center justify-center text-emerald-400 shadow-md group-hover:border-emerald-500/40 group-hover:scale-105 transition-all">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {index !== undefined ? `Exercise 0${index + 1}` : exercise.muscleGroup}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${difficultyColors}`}
                  >
                    {exercise.difficulty}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                  {exercise.name}
                </h4>
              </div>
            </div>

            <button
              onClick={() => setShowDetail(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Exercise Details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Exercise Metrics Pills */}
          <div className="grid grid-cols-3 gap-2 my-4 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Sets</span>
              <span className="text-sm font-bold text-white mt-0.5">{exercise.sets}</span>
            </div>
            <div className="border-x border-slate-800">
              <span className="text-[10px] text-slate-400 block font-medium">Reps</span>
              <span className="text-sm font-bold text-emerald-400 mt-0.5">{exercise.reps}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Rest</span>
              <span className="text-sm font-bold text-cyan-400 mt-0.5">{exercise.restSeconds}s</span>
            </div>
          </div>

          {/* Target Muscles Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {exercise.targetMuscles.slice(0, 3).map((muscle, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowReplace(true)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/60 transition-colors flex items-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>
            <button
              onClick={() => setShowDetail(true)}
              className="px-2.5 py-1.5 rounded-lg hover:bg-slate-800/70 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
            >
              Details
            </button>
          </div>

          <Link
            href="/workout/session"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Start</span>
          </Link>
        </div>
      </div>

      {/* Modals */}
      <ExerciseDetailModal
        exercise={exercise}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
      {onReplace && (
        <ReplaceExerciseModal
          currentExercise={exercise}
          isOpen={showReplace}
          onClose={() => setShowReplace(false)}
          onSelectReplacement={onReplace}
        />
      )}
    </>
  );
};

