export type TrainingStyle = 'Gym' | 'Calisthenics' | 'Hybrid';

export type FitnessGoal =
  | 'Build Muscle'
  | 'Lose Fat'
  | 'Build Strength'
  | 'Improve Fitness'
  | 'Calisthenics Skills'
  | 'General Fitness';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type ActivityLevel = 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';

export interface UserProfile {
  name: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  trainingStyle: TrainingStyle;
  experience: ExperienceLevel;
  daysPerWeek: number; // 3 to 7
  workoutDuration: number; // minutes: 20, 30, 45, 60, 75
  equipment: string[];
  calorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  waterTarget: number; // in Liters
  streak: number;
  level: number;
  currentXp: number;
  nextLevelXp: number;
}

export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Legs'
  | 'Core'
  | 'Full Body'
  | 'Skill';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  style: 'Gym' | 'Calisthenics' | 'Both';
  difficulty: ExperienceLevel;
  equipment: string[];
  sets: number;
  reps: string; // e.g. "8-12", "6-8", "Max", "30 sec"
  restSeconds: number;
  targetMuscles: string[];
  formTips: string[];
  progressionOrder?: number; // for calisthenics progression chains
  progressionChain?: string; // e.g. "Push Progression", "Pull Progression"
  defaultWeightKg?: number;
}

export interface WorkoutDay {
  id: string;
  dayName: string; // "Monday", "Tuesday", etc.
  routineName: string; // "Push Day", "Calisthenics Pull & Core", etc.
  focus: string;
  durationMinutes: number;
  difficulty: ExperienceLevel;
  exercises: Exercise[];
  isRestDay: boolean;
}

export interface WorkoutPlan {
  id: string;
  trainingStyle: TrainingStyle;
  splitName: string;
  createdAt: string;
  days: WorkoutDay[];
}

export interface ActiveSetLog {
  setNumber: number;
  targetReps: string;
  actualReps: number;
  targetWeightKg: number;
  actualWeightKg: number;
  completed: boolean;
}

export interface ActiveExerciseSession {
  exercise: Exercise;
  sets: ActiveSetLog[];
  completed: boolean;
}

export interface WorkoutSessionLog {
  id: string;
  date: string;
  workoutName: string;
  trainingStyle: TrainingStyle;
  durationMinutes: number;
  exercisesCompleted: number;
  totalSets: number;
  totalVolumeKg: number;
  caloriesBurned: number;
  notes?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingSize: string;
  category: 'Protein' | 'Carb' | 'Fat' | 'Dairy' | 'Produce' | 'Snack';
}

export interface LoggedFood {
  id: string;
  foodId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  grams: number;
  servings: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  loggedAt: string;
}

export interface DailyNutrition {
  date: string;
  caloriesConsumed: number;
  calorieTarget: number;
  proteinConsumed: number;
  proteinTarget: number;
  carbsConsumed: number;
  carbsTarget: number;
  fatConsumed: number;
  fatTarget: number;
  waterLiters: number;
  waterTarget: number;
  meals: {
    breakfast: LoggedFood[];
    lunch: LoggedFood[];
    dinner: LoggedFood[];
    snacks: LoggedFood[];
  };
}

export interface RecoveryData {
  score: number; // 0 - 100
  sleepHours: number;
  sleepMinutes: number;
  sleepQuality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  energyLevel: 'Low' | 'Moderate' | 'Good' | 'Peak';
  sorenessLevel: 'None' | 'Low' | 'Moderate' | 'High';
  sorenessAreas: string[];
  hrvMs: number;
  restDaysThisWeek: number;
  aiRecommendation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Streak' | 'Workouts' | 'Strength' | 'Calisthenics' | 'Nutrition';
  xpReward: number;
  isUnlocked: boolean;
  unlockedDate?: string;
  progressCurrent?: number;
  progressMax?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface WeeklyReport {
  weekRange: string;
  consistencyScore: number; // % e.g. 92
  strengthChange: number; // % e.g. +7
  nutritionScore: number; // % e.g. 86
  recoveryScore: number; // % e.g. 81
  aiAnalysis: string;
  focusAreas: string[];
}

