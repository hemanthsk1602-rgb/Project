import React from 'react';
import { LoggedFood } from '@/lib/types';
import { Plus, Trash2, Utensils } from 'lucide-react';

interface MealSectionProps {
  title: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  items: LoggedFood[];
  onOpenAddModal: (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => void;
  onRemoveFood: (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', id: string) => void;
}

export const MealSection: React.FC<MealSectionProps> = ({
  title,
  mealType,
  items,
  onOpenAddModal,
  onRemoveFood,
}) => {
  const totalCalories = items.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = Math.round(items.reduce((acc, curr) => acc + curr.protein, 0) * 10) / 10;

  return (
    <div className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div>
          <h4 className="font-outfit text-base font-extrabold text-white tracking-tight">{title}</h4>
          <p className="text-xs text-white/50 mt-0.5">
            {totalCalories} kcal • <span className="text-[#D5FF3E] font-bold">{totalProtein}g protein</span>
          </p>
        </div>

        <button
          onClick={() => onOpenAddModal(mealType)}
          className="px-4 py-1.5 rounded-full bg-[#D5FF3E]/10 hover:bg-[#D5FF3E] text-[#D5FF3E] hover:text-black text-xs font-bold border border-[#D5FF3E]/30 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Food</span>
        </button>
      </div>

      {/* Food items list */}
      {items.length === 0 ? (
        <div className="py-6 text-center">
          <Utensils className="w-6 h-6 text-white/20 mx-auto mb-1.5" />
          <p className="text-xs text-white/40">No foods logged for {title.toLowerCase()} yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div>
                <h5 className="text-xs font-bold text-white">{item.name}</h5>
                <p className="text-[11px] text-white/50 mt-0.5">
                  {item.grams}g • {item.calories} kcal •{' '}
                  <span className="text-[#D5FF3E] font-bold">{item.protein}g P</span> •{' '}
                  <span className="text-cyan-400 font-medium">{item.carbs}g C</span> •{' '}
                  <span className="text-amber-400 font-medium">{item.fat}g F</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/40">{item.loggedAt}</span>
                <button
                  onClick={() => onRemoveFood(mealType, item.id)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Remove food"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
