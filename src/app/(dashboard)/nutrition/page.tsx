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
  Zap,
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
        title="Nutrition & Precision Fueling"
        subtitle={`Tracking calories, macros, and hydration to maximize recovery for ${profile.name}`}
        actionButton={{
          label: '+ Log Food',
          href: '#meals',
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      {/* Main Nutrition Overview: Calories Gauge & Macros Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Calorie Ring Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl flex flex-col items-center justify-center text-center transition-all">
          <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-4">
            Daily Energy Balance
          </span>
          <CircularProgress
            value={nutrition.caloriesConsumed}
            max={profile.calorieTarget}
            size={160}
            strokeWidth={12}
            color="lime"
            label="Kcal Consumed"
          />
          <div className="mt-4 pt-4 border-t border-white/10 w-full flex items-center justify-around text-xs">
            <div>
              <span className="text-white/40 block font-medium">Remaining</span>
              <span className="font-outfit text-base font-extrabold text-white">
                {Math.max(0, profile.calorieTarget - nutrition.caloriesConsumed)} kcal
              </span>
            </div>
            <div className="border-r border-white/10 h-8" />
            <div>
              <span className="text-white/40 block font-medium">Goal Target</span>
              <span className="font-outfit text-base font-extrabold text-[#D5FF3E]">
                {profile.calorieTarget} kcal
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Macro Progress Bars */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl flex flex-col justify-between space-y-6 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-outfit text-lg font-bold text-white">Macronutrient Targets</h4>
              <span className="text-xs font-semibold text-white/50">
                Calibrated for {profile.goal}
              </span>
            </div>

            <div className="space-y-4">
              {/* Protein */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <span className="text-[#D5FF3E] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D5FF3E]" />
                    Protein Target (Muscle Synthesis)
                  </span>
                  <span className="text-white font-mono">
                    {nutrition.proteinConsumed}g / {profile.proteinTarget}g ({proteinPercent}%)
                  </span>
                </div>
                <ProgressBar
                  value={nutrition.proteinConsumed}
                  max={profile.proteinTarget}
                  color="lime"
                  height="md"
                />
              </div>

              {/* Carbohydrates */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    Complex Carbohydrates (Glycogen)
                  </span>
                  <span className="text-white font-mono">
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
                    Healthy Fats (Hormone Support)
                  </span>
                  <span className="text-white font-mono">
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

          {/* Quick macro distribution pill */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>
              Ratio: <strong className="text-white">35% P</strong> • <strong className="text-white">45% C</strong> • <strong className="text-white">20% F</strong>
            </span>
            <span className="text-[#D5FF3E] font-semibold">Clean Whole Food Fuel</span>
          </div>
        </div>
      </div>

      {/* Second Row: Hydration Module + AI Nutritionist Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hydration Tracker */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl flex flex-col justify-between space-y-4 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-outfit text-base font-bold text-white">Daily Hydration</h4>
                  <p className="text-xs text-white/50">{nutrition.waterLiters}L / {profile.waterTarget}L goal</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-400 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                {waterPercent}%
              </span>
            </div>

            <ProgressBar
              value={nutrition.waterLiters}
              max={profile.waterTarget}
              color="blue"
              height="md"
            />
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={() => addWater(0.25)}
              className="flex-1 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+250 ml</span>
            </button>
            <button
              onClick={() => addWater(0.5)}
              className="flex-1 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+500 ml</span>
            </button>
          </div>
        </div>

        {/* AI Nutritionist Assistant Card (spans 2 cols) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#D5FF3E]/30 backdrop-blur-xl flex flex-col justify-between space-y-4 transition-all">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D5FF3E] to-emerald-400 flex items-center justify-center text-black shadow-lg shadow-[#D5FF3E]/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-outfit text-sm font-bold text-white flex items-center gap-1.5">
                    <span>FitPlus AI Nutritionist</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D5FF3E]" />
                  </h4>
                  <p className="text-[11px] text-white/50">Adaptive Macro Guidance</p>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                advice.proteinGap > 0
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/20'
              }`}>
                {advice.proteinGap > 0 ? `${advice.proteinGap}g Protein Needed` : 'Target Achieved'}
              </span>
            </div>

            <p className="text-xs text-white/80 leading-relaxed">
              {advice.message}
            </p>

            {advice.recommendedFoods.length > 0 && (
              <div className="mt-3">
                <span className="text-[10px] font-bold text-[#D5FF3E] uppercase tracking-wider block mb-1.5">
                  Suggested Targeted Foods:
                </span>
                <div className="flex flex-wrap gap-2">
                  {advice.recommendedFoods.map((food) => (
                    <span
                      key={food.id}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-semibold"
                    >
                      {food.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-white/40">Caloric Surplus/Deficit: {profile.goal}</span>
            <Link
              href="/ai-coach"
              className="text-[#D5FF3E] hover:text-[#c4f035] font-bold flex items-center gap-1 transition-colors"
            >
              <span>Ask Coach about Meal Prep</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Meals Logging Grid */}
      <div id="meals" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-pulse" />
            <h3 className="font-outfit text-base font-extrabold text-white uppercase tracking-wider">
              Logged Daily Meals
            </h3>
          </div>
          <span className="text-xs text-white/50">
            Database of 500+ Indian & Global fitness foods
          </span>
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
            title="Snacks & Supplements"
            mealType="snacks"
            items={nutrition.meals.snacks}
            onOpenAddModal={setActiveModalMeal}
            onRemoveFood={removeFoodFromMeal}
          />
        </div>
      </div>

      {/* Food Search Modal */}
      {activeModalMeal && (
        <FoodSearchModal
          isOpen={true}
          onClose={() => setActiveModalMeal(null)}
          mealType={activeModalMeal}
          onAddFood={addFoodToMeal}
        />
      )}
    </div>
  );
}
