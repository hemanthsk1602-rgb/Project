import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Exercise } from '@/lib/types';
import { EXERCISE_DATABASE } from '@/lib/data/exercises';
import { Dumbbell, ArrowRightLeft, Check } from 'lucide-react';

interface ReplaceExerciseModalProps {
  currentExercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectReplacement: (replacement: Exercise) => void;
}

export const ReplaceExerciseModal: React.FC<ReplaceExerciseModalProps> = ({
  currentExercise,
  isOpen,
  onClose,
  onSelectReplacement,
}) => {
  if (!currentExercise) return null;

  // Filter pool for replacements with the same or related muscle group
  const alternatives = EXERCISE_DATABASE.filter(
    (ex) => ex.id !== currentExercise.id && ex.muscleGroup === currentExercise.muscleGroup
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Replace Exercise"
      subtitle={`Find an alternative for ${currentExercise.name}`}
      maxWidth="lg"
    >
      <div className="space-y-3">
        <p className="text-xs text-slate-400 mb-2">
          Select an exercise matching target muscle ({currentExercise.muscleGroup}) to swap into your session:
        </p>

        {alternatives.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">
            No direct replacements found in this category.
          </p>
        ) : (
          alternatives.map((alt) => (
            <div
              key={alt.id}
              onClick={() => {
                onSelectReplacement(alt);
                onClose();
              }}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {alt.name}
                  </h5>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                    <span className="text-emerald-400/90">{alt.style}</span>
                    <span>•</span>
                    <span>{alt.difficulty}</span>
                    <span>•</span>
                    <span>{alt.sets} × {alt.reps}</span>
                  </div>
                </div>
              </div>

              <button className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold group-hover:bg-emerald-500 group-hover:text-black transition-all flex items-center gap-1">
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Swap</span>
              </button>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

