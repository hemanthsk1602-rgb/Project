import React, { useState } from 'react';
import { Exercise } from '@/lib/types';
import { Dumbbell, Clock, Repeat, Flame, Info, ArrowRightLeft, Play } from 'lucide-react';
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
    Beginner: 'text-[#D5FF3E] bg-[#D5FF3E]/10 border-[#D5FF3E]/20',
    Intermediate: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    Advanced: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  }[exercise.difficulty];

  return (
    <>
      <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#D5FF3E]/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              {/* Illustration / Category Avatar */}
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5FF3E] shadow-md group-hover:border-[#D5FF3E]/40 group-hover:scale-105 transition-all">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                    {index !== undefined ? `Exercise 0${index + 1}` : exercise.muscleGroup}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${difficultyColors}`}
                  >
                    {exercise.difficulty}
                  </span>
                </div>
                <h4 className="font-outfit text-base font-extrabold text-white group-hover:text-[#D5FF3E] transition-colors mt-0.5 tracking-tight">
                  {exercise.name}
                </h4>
              </div>
            </div>

            <button
              onClick={() => setShowDetail(true)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
              title="Exercise Details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Exercise Metrics Pills */}
          <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
            <div>
              <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Sets</span>
              <span className="font-outfit text-sm font-extrabold text-white mt-0.5">{exercise.sets}</span>
            </div>
            <div className="border-x border-white/10">
              <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Reps</span>
              <span className="font-outfit text-sm font-extrabold text-[#D5FF3E] mt-0.5">{exercise.reps}</span>
            </div>
            <div>
              <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Rest</span>
              <span className="font-outfit text-sm font-extrabold text-white mt-0.5">{exercise.restSeconds}s</span>
            </div>
          </div>

          {/* Target Muscles Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {exercise.targetMuscles.slice(0, 3).map((muscle, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/10 font-medium"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReplace(true)}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>
            <button
              onClick={() => setShowDetail(true)}
              className="px-3 py-1.5 rounded-full hover:bg-white/5 text-white/50 hover:text-white text-xs font-semibold transition-colors"
            >
              Details
            </button>
          </div>

          <Link
            href="/workout/session"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black text-xs font-extrabold transition-all shadow-md shadow-[#D5FF3E]/20 active:scale-95"
          >
            <Play className="w-3 h-3 fill-black" />
            <span>Start Set</span>
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
