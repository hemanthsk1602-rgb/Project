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
          <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Chicken, Oats, Eggs, Paneer, Rice, Whey..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D5FF3E] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D5FF3E] text-black shadow-md shadow-[#D5FF3E]/20'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food List Grid */}
        <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
          {filteredFoods.length === 0 ? (
            <p className="text-xs text-white/40 text-center py-6">No matching foods found.</p>
          ) : (
            filteredFoods.map((food) => {
              const isSelected = selectedFood?.id === food.id;
              return (
                <div
                  key={food.id}
                  onClick={() => handleSelectFood(food)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D5FF3E]/10 border-[#D5FF3E] shadow-sm'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <h5 className="font-outfit text-xs font-bold text-white">{food.name}</h5>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      {food.calories} kcal •{' '}
                      <span className="text-[#D5FF3E] font-semibold">{food.protein}g P</span> •{' '}
                      <span>{food.carbs}g C</span> • <span>{food.fat}g F</span> per {food.servingSize}
                    </p>
                  </div>
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#D5FF3E] text-black flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 hover:bg-white/10 text-xs font-medium border border-white/10">
                      Select
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Portion Calculator if food selected */}
        {selectedFood && calculatedNutrition && (
          <div className="p-4 rounded-2xl bg-black/40 border border-[#D5FF3E]/30 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Serving Weight:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="10"
                  step="10"
                  max="1000"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(1, Number(e.target.value) || 0))}
                  className="w-20 px-2 py-1 rounded-xl bg-black/60 border border-white/20 text-center font-bold text-xs text-white focus:outline-none focus:border-[#D5FF3E]"
                />
                <span className="text-xs text-white/60 font-semibold">Grams</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-white/5">
                <span className="text-[10px] text-white/40 block">Calories</span>
                <span className="font-outfit font-extrabold text-white">{calculatedNutrition.calories}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5">
                <span className="text-[10px] text-white/40 block">Protein</span>
                <span className="font-outfit font-extrabold text-[#D5FF3E]">{calculatedNutrition.protein}g</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5">
                <span className="text-[10px] text-white/40 block">Carbs</span>
                <span className="font-outfit font-extrabold text-cyan-400">{calculatedNutrition.carbs}g</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5">
                <span className="text-[10px] text-white/40 block">Fats</span>
                <span className="font-outfit font-extrabold text-amber-400">{calculatedNutrition.fat}g</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={handleConfirmAdd}
            >
              Add {grams}g of {selectedFood.name}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
