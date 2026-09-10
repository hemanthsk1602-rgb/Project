'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Utensils,
  Plus,
  Flame,
  Dumbbell,
  Sparkles,
  Bot,
  Droplet,
  PieChart,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { MealSection } from '@/components/nutrition/MealSection';
import { FoodSearchModal } from '@/components/nutrition/FoodSearchModal';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { analyzeDailyNutrition } from '@/lib/ai/nutritionAssistant';

export default function NutritionPage() {
  const { profile, nutrition, addFoodToMeal, removeFoodFromMeal, addWater } = useFitness();
  const [activeModalMeal, setActiveModalMeal] = useState<
    'breakfast' | 'lunch' | 'dinner' | 'snacks' | null
  >(null);

  const advice = analyzeDailyNutrition(nutrition);

  // Macro calculations
  const caloriePercent = Math.round((nutrition.caloriesConsumed / profile.calorieTarget) * 100);
  const proteinPercent = Math.round((nutrition.proteinConsumed / profile.proteinTarget) * 100);
  const carbsPercent = Math.round((nutrition.carbsConsumed / profile.carbsTarget) * 100);
  const fatPercent = Math.round((nutrition.fatConsumed / profile.fatTarget) * 100);
  const waterPercent = Math.round((nutrition.waterLiters / profile.waterTarget) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <TopHeader
        title="Nutrition & Fuel Dashboard"
        subtitle={`Tracking calories, macros, and hydration to maximize recovery for ${profile.name}`}
        actionButton={{
          label: '+ Add Food',
          href: '#meals',
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      {/* Main Nutrition Overview: Calories Gauge & Macros Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Calorie Ring Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Daily Energy Balance
          </span>
          <CircularProgress
            value={nutrition.caloriesConsumed}
            max={profile.calorieTarget}
            size={160}
            strokeWidth={12}
            color="emerald"
            label="Kcal Consumed"
          />
          <div className="mt-4 pt-4 border-t border-slate-800/80 w-full flex items-center justify-around text-xs">
            <div>
              <span className="text-slate-400 block">Remaining</span>
              <span className="text-base font-bold text-white">
                {Math.max(0, profile.calorieTarget - nutrition.caloriesConsumed)} kcal
              </span>
            </div>
            <div className="border-r border-slate-800 h-8" />
            <div>
              <span className="text-slate-400 block">Target</span>
              <span className="text-base font-bold text-emerald-400">
                {profile.calorieTarget} kcal
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Macro Progress Bars */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Macronutrient Targets</h4>
              <span className="text-xs font-semibold text-slate-400">
                Calibrated for {profile.goal}
              </span>
            </div>

            <div className="space-y-4">
              {/* Protein */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    Protein Target
                  </span>
                  <span className="text-white">
                    {nutrition.proteinConsumed}g / {profile.proteinTarget}g ({proteinPercent}%)
                  </span>
                </div>
                <ProgressBar
                  value={nutrition.proteinConsumed}
                  max={profile.proteinTarget}
                  color="emerald"
                  height="md"
                />
              </div>

              {/* Carbohydrates */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    Carbohydrates
                  </span>
                  <span className="text-white">
                    {nutrition.carbsConsumed}g / {profile.carbsTarget}g ({carbsPercent}%)
                  </span>
                </div>
                <ProgressBar
                  value={nutrition.carbsConsumed}
                  max={profile.carbsTarget}
                  color="cyan"
                  height="md"
                />
              </div>

              {/* Fats */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    Healthy Fats
                  </span>
                  <span className="text-white">
                    {nutrition.fatConsumed}g / {profile.fatTarget}g ({fatPercent}%)
                  </span>
                </div>
                <ProgressBar
                  value={nutrition.fatConsumed}
                  max={profile.fatTarget}
                  color="orange"
                  height="md"
                />
              </div>
            </div>
          </div>

          {/* Water Quick Tracker */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Droplet className="w-5 h-5 text-blue-400" />
              <div>
                <span className="text-xs font-bold text-white block">
                  Hydration: {nutrition.waterLiters} / {profile.waterTarget} Liters ({waterPercent}%)
                </span>
                <span className="text-[11px] text-slate-400">
                  Vital for muscular endurance and cellular recovery
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => addWater(0.25)}
                className="px-3 py-1.5 rounded-xl bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border border-blue-500/30 text-xs font-bold transition-colors"
              >
                +250ml
              </button>
              <button
                onClick={() => addWater(0.5)}
                className="px-3 py-1.5 rounded-xl bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border border-blue-500/30 text-xs font-bold transition-colors"
              >
                +500ml
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Nutrition Assistant Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                FitPlus AI Nutritionist
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                Live Analysis
              </span>
            </div>
            <p className="text-sm text-slate-200 font-medium leading-relaxed">
              "{advice.message}"
            </p>

            {/* Suggested High-Protein Foods */}
            {advice.proteinGap > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs text-slate-400 font-semibold">Recommended to bridge gap:</span>
                {advice.recommendedFoods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => {
                      addFoodToMeal('dinner', food, 100);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700/80 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <span>+ {food.name}</span>
                    <span className="text-[10px] text-emerald-400 font-bold">({food.protein}g P)</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <Link
          href="/ai-coach"
          className="shrink-0 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2 self-end md:self-center"
        >
          <Bot className="w-4 h-4" />
          <span>Ask AI Coach</span>
        </Link>
      </div>

      {/* Meal Sections */}
      <div id="meals" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Daily Meals Breakdown</h3>
          <span className="text-xs text-slate-400">Tap "+ Add Food" on any meal category</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <MealSection
            title="Breakfast"
            mealType="breakfast"
            items={nutrition.meals.breakfast}
            onOpenAddModal={setActiveModalMeal}
            onRemoveFood={removeFoodFromMeal}
          />
          <MealSection
            title="Lunch"
            mealType="lunch"
            items={nutrition.meals.lunch}
            onOpenAddModal={setActiveModalMeal}
            onRemoveFood={removeFoodFromMeal}
          />
          <MealSection
            title="Dinner"
            mealType="dinner"
            items={nutrition.meals.dinner}
            onOpenAddModal={setActiveModalMeal}
            onRemoveFood={removeFoodFromMeal}
          />
          <MealSection
            title="Snacks & Post-Workout"
            mealType="snacks"
            items={nutrition.meals.snacks}
            onOpenAddModal={setActiveModalMeal}
            onRemoveFood={removeFoodFromMeal}
          />
        </div>
      </div>

      {/* Add Food Modal */}
      {activeModalMeal && (
        <FoodSearchModal
          isOpen={true}
          mealType={activeModalMeal}
          onClose={() => setActiveModalMeal(null)}
          onAddFood={addFoodToMeal}
        />
      )}
    </div>
  );
}

