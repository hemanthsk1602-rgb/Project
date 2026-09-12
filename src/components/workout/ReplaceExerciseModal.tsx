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
        <p className="text-xs text-white/60 mb-2">
          Select an exercise matching target muscle (<strong className="text-white">{currentExercise.muscleGroup}</strong>) to swap into your session:
        </p>

        {alternatives.length === 0 ? (
          <p className="text-sm text-white/40 text-center py-6">
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
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D5FF3E]/50 hover:bg-white/[0.06] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#D5FF3E] group-hover:scale-105 transition-transform">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-outfit text-sm font-extrabold text-white group-hover:text-[#D5FF3E] transition-colors">
                    {alt.name}
                  </h5>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-white/50">
                    <span className="text-[#D5FF3E] font-medium">{alt.style}</span>
                    <span>•</span>
                    <span>{alt.difficulty}</span>
                    <span>•</span>
                    <span>{alt.sets} × {alt.reps}</span>
                  </div>
                </div>
              </div>

              <button className="px-3.5 py-1.5 rounded-full bg-[#D5FF3E]/10 text-[#D5FF3E] text-xs font-bold border border-[#D5FF3E]/30 group-hover:bg-[#D5FF3E] group-hover:text-black transition-all flex items-center gap-1.5">
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
