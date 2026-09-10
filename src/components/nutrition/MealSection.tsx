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
    <div className="glass-card p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60">
        <div>
          <h4 className="text-base font-bold text-white tracking-tight">{title}</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {totalCalories} kcal • <span className="text-emerald-400 font-semibold">{totalProtein}g protein</span>
          </p>
        </div>

        <button
          onClick={() => onOpenAddModal(mealType)}
          className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Food</span>
        </button>
      </div>

      {/* Food items list */}
      {items.length === 0 ? (
        <div className="py-6 text-center">
          <Utensils className="w-6 h-6 text-slate-600 mx-auto mb-1.5" />
          <p className="text-xs text-slate-500">No foods logged for {title.toLowerCase()} yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700/60 transition-colors group"
            >
              <div>
                <h5 className="text-xs font-bold text-slate-200">{item.name}</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {item.grams}g • {item.calories} kcal •{' '}
                  <span className="text-emerald-400 font-medium">{item.protein}g P</span> •{' '}
                  <span className="text-cyan-400 font-medium">{item.carbs}g C</span> •{' '}
                  <span className="text-amber-400 font-medium">{item.fat}g F</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">{item.loggedAt}</span>
                <button
                  onClick={() => onRemoveFood(mealType, item.id)}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
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

