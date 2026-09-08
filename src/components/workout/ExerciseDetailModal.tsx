import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Exercise } from '@/lib/types';
import { Dumbbell, Clock, Repeat, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  isOpen,
  onClose,
}) => {
  if (!exercise) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={exercise.name}
      subtitle={`${exercise.muscleGroup} • ${exercise.difficulty}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Key Attributes Bar */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[11px] text-slate-400 font-medium">Target Sets</span>
            <span className="text-base font-bold text-white mt-0.5">{exercise.sets} Sets</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-x border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Target Reps</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5">{exercise.reps}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[11px] text-slate-400 font-medium">Rest Period</span>
            <span className="text-base font-bold text-cyan-400 mt-0.5">{exercise.restSeconds}s</span>
          </div>
        </div>

        {/* Target Muscles */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Target Muscles
          </h4>
          <div className="flex flex-wrap gap-2">
            {exercise.targetMuscles.map((muscle, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Equipment Needed */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Equipment
          </h4>
          <div className="flex flex-wrap gap-2">
            {exercise.equipment.map((eq, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs"
              >
                {eq}
              </span>
            ))}
          </div>
        </div>

        {/* Progression Stage if calisthenics */}
        {exercise.progressionChain && (
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-cyan-300">
                {exercise.progressionChain} (Stage {exercise.progressionOrder})
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Master this variation with clean range-of-motion before advancing to higher lever angles or unilateral work.
              </p>
            </div>
          </div>
        )}

        {/* Form Coaching & Execution Tips */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
            Key Execution & Form Cues
          </h4>
          <div className="space-y-2">
            {exercise.formTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

