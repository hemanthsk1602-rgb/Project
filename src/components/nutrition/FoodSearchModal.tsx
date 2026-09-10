import React, { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FoodItem } from '@/lib/types';
import { FOOD_DATABASE } from '@/lib/data/foods';
import { Search, Plus, Utensils, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FoodSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  onAddFood: (
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks',
    food: FoodItem,
    grams: number
  ) => void;
}

export const FoodSearchModal: React.FC<FoodSearchModalProps> = ({
  isOpen,
  onClose,
  mealType,
  onAddFood,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState<number>(100);

  const categories = ['All', 'Protein', 'Dairy', 'Carb', 'Produce', 'Fat'];

  const filteredFoods = useMemo(() => {
    return FOOD_DATABASE.filter((food) => {
      const matchSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || food.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setGrams(100);
  };

  const handleConfirmAdd = () => {
    if (selectedFood) {
      onAddFood(mealType, selectedFood, grams);
      setSelectedFood(null);
      onClose();
    }
  };

  const calculatedNutrition = useMemo(() => {
    if (!selectedFood) return null;
    const ratio = grams / 100;
    return {
      calories: Math.round(selectedFood.calories * ratio),
      protein: Math.round(selectedFood.protein * ratio * 10) / 10,
      carbs: Math.round(selectedFood.carbs * ratio * 10) / 10,
      fat: Math.round(selectedFood.fat * ratio * 10) / 10,
    };
  }, [selectedFood, grams]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelectedFood(null);
        onClose();
      }}
      title={`Add Food to ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`}
      subtitle="Search ingredients or popular fitness foods"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Chicken, Oats, Eggs, Paneer, Rice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-black'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food List */}
        <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
          {filteredFoods.map((food) => {
            const isSelected = selectedFood?.id === food.id;
            return (
              <div
                key={food.id}
                onClick={() => handleSelectFood(food)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-white'
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 text-slate-300'
                }`}
              >
                <div>
                  <h5 className="text-sm font-bold text-white">{food.name}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {food.calories} kcal • {food.protein}g protein ({food.servingSize})
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-md font-medium ${
                      isSelected
                        ? 'bg-emerald-500 text-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isSelected ? 'Selected' : '+ Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quantity & Macro Confirmation Box */}
        {selectedFood && calculatedNutrition && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  Configuring Portion
                </span>
                <h4 className="text-sm font-bold text-white">{selectedFood.name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="10"
                  max="1000"
                  step="10"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(10, Number(e.target.value) || 0))}
                  className="w-20 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-center text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs text-slate-400 font-semibold">grams</span>
              </div>
            </div>

            {/* Calculated Macros Bar */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-center">
              <div className="p-2 rounded-lg bg-slate-800/60">
                <span className="text-[10px] text-slate-400 block">Calories</span>
                <span className="text-sm font-bold text-white">
                  {calculatedNutrition.calories}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-400 block font-semibold">Protein</span>
                <span className="text-sm font-bold text-emerald-400">
                  {calculatedNutrition.protein}g
                </span>
              </div>
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-[10px] text-cyan-400 block font-semibold">Carbs</span>
                <span className="text-sm font-bold text-cyan-400">
                  {calculatedNutrition.carbs}g
                </span>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] text-amber-400 block font-semibold">Fat</span>
                <span className="text-sm font-bold text-amber-400">
                  {calculatedNutrition.fat}g
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full mt-2"
              onClick={handleConfirmAdd}
              icon={<Plus className="w-4 h-4" />}
            >
              Add {grams}g to {mealType.toUpperCase()}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

