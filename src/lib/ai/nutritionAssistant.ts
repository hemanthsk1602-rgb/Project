import { DailyNutrition, FoodItem } from '../types';
import { FOOD_DATABASE } from '../data/foods';

export interface NutritionAdvice {
  status: 'surplus' | 'deficit' | 'on-track';
  proteinGap: number; // in grams
  calorieGap: number;
  message: string;
  recommendedFoods: FoodItem[];
}

export function analyzeDailyNutrition(nutrition: DailyNutrition): NutritionAdvice {
  const proteinGap = Math.max(0, nutrition.proteinTarget - nutrition.proteinConsumed);
  const calorieGap = nutrition.calorieTarget - nutrition.caloriesConsumed;

  let message = '';
  if (proteinGap > 0) {
    message = `You are approximately ${proteinGap}g short of your protein target today. Prioritize lean protein sources in your upcoming meal or snack.`;
  } else {
    message = `Great job! You have hit your daily protein goal (${nutrition.proteinConsumed}g / ${nutrition.proteinTarget}g). Keep hydrated!`;
  }

  // Find top recommended foods high in protein
  const highProteinFoods = FOOD_DATABASE.filter((f) => f.category === 'Protein' || f.category === 'Dairy')
    .sort((a, b) => b.protein - a.protein)
    .slice(0, 5);

  return {
    status: calorieGap > 150 ? 'deficit' : calorieGap < -150 ? 'surplus' : 'on-track',
    proteinGap,
    calorieGap,
    message,
    recommendedFoods: highProteinFoods,
  };
}

