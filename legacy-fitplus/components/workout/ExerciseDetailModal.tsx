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
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Target Sets</span>
            <span className="font-outfit text-base font-extrabold text-white mt-0.5">{exercise.sets} Sets</span>
          </div>
          <div className="flex flex-col items-center justify-center border-x border-white/10">
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Target Reps</span>
            <span className="font-outfit text-base font-extrabold text-[#D5FF3E] mt-0.5">{exercise.reps}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Rest Period</span>
            <span className="font-outfit text-base font-extrabold text-white mt-0.5">{exercise.restSeconds}s</span>
          </div>
        </div>

        {/* Target Muscles */}
        <div>
          <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
            Target Muscles
          </h4>
          <div className="flex flex-wrap gap-2">
            {exercise.targetMuscles.map((muscle, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 text-[#D5FF3E] text-xs font-bold"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Equipment Needed */}
        <div>
          <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
            Required Equipment
          </h4>
          <div className="flex flex-wrap gap-2">
            {exercise.equipment.map((eq, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium"
              >
                {eq}
              </span>
            ))}
          </div>
        </div>

        {/* Progression Stage if calisthenics */}
        {exercise.progressionChain && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#D5FF3E] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white">
                {exercise.progressionChain} (Stage {exercise.progressionOrder})
              </p>
              <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                Master this variation with clean range-of-motion before advancing to higher lever angles or unilateral work.
              </p>
            </div>
          </div>
        )}

        {/* Form Coaching & Execution Tips */}
        <div>
          <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2.5">
            Key Execution & Form Cues
          </h4>
          <div className="space-y-2.5">
            {exercise.formTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#D5FF3E] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
