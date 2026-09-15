'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  WorkoutPlan,
  WorkoutSessionLog,
  DailyNutrition,
  RecoveryData,
  Achievement,
  FoodItem,
  TrainingStyle,
  FitnessGoal,
  LoggedFood,
} from '../types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_DAILY_NUTRITION,
  INITIAL_RECOVERY_DATA,
  INITIAL_WORKOUT_HISTORY,
} from '../data/initialData';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { generateWorkoutPlan } from '../ai/workoutGenerator';

interface FitnessContextType {
  profile: UserProfile;
  workoutPlan: WorkoutPlan;
  workoutHistory: WorkoutSessionLog[];
  nutrition: DailyNutrition;
  recovery: RecoveryData;
  achievements: Achievement[];
  isHydrated: boolean;
  updateProfile: (updated: Partial<UserProfile>) => void;
  updateTrainingStyle: (style: TrainingStyle) => void;
  updateGoal: (goal: FitnessGoal) => void;
  regeneratePlan: () => void;
  logCompletedWorkout: (log: Omit<WorkoutSessionLog, 'id'>) => void;
  addFoodToMeal: (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', food: FoodItem, grams?: number) => void;
  removeFoodFromMeal: (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', logId: string) => void;
  addWater: (liters: number) => void;
  updateRecoveryData: (updated: Partial<RecoveryData>) => void;
  unlockAchievement: (id: string) => void;
  addXp: (amount: number) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'fitplus_v1_';

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>(() =>
    generateWorkoutPlan(INITIAL_USER_PROFILE)
  );
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSessionLog[]>(INITIAL_WORKOUT_HISTORY);
  const [nutrition, setNutrition] = useState<DailyNutrition>(INITIAL_DAILY_NUTRITION);
  const [recovery, setRecovery] = useState<RecoveryData>(INITIAL_RECOVERY_DATA);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(`${STORAGE_KEY_PREFIX}profile`);
      const storedPlan = localStorage.getItem(`${STORAGE_KEY_PREFIX}workoutPlan`);
      const storedHistory = localStorage.getItem(`${STORAGE_KEY_PREFIX}workoutHistory`);
      const storedNutrition = localStorage.getItem(`${STORAGE_KEY_PREFIX}nutrition`);
      const storedRecovery = localStorage.getItem(`${STORAGE_KEY_PREFIX}recovery`);
      const storedAchievements = localStorage.getItem(`${STORAGE_KEY_PREFIX}achievements`);

      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
        if (storedPlan) {
          setWorkoutPlan(JSON.parse(storedPlan));
        } else {
          setWorkoutPlan(generateWorkoutPlan(parsedProfile));
        }
      }
      if (storedHistory) setWorkoutHistory(JSON.parse(storedHistory));
      if (storedNutrition) setNutrition(JSON.parse(storedNutrition));
      if (storedRecovery) setRecovery(JSON.parse(storedRecovery));
      if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}profile`, JSON.stringify(profile));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}workoutPlan`, JSON.stringify(workoutPlan));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}workoutHistory`, JSON.stringify(workoutHistory));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}nutrition`, JSON.stringify(nutrition));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}recovery`, JSON.stringify(recovery));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}achievements`, JSON.stringify(achievements));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }, [profile, workoutPlan, workoutHistory, nutrition, recovery, achievements, isHydrated]);

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      return next;
    });
  };

  const regeneratePlan = () => {
    const newPlan = generateWorkoutPlan(profile);
    setWorkoutPlan(newPlan);
  };

  const updateTrainingStyle = (style: TrainingStyle) => {
    const updated = { ...profile, trainingStyle: style };
    setProfile(updated);
    const newPlan = generateWorkoutPlan(updated);
    setWorkoutPlan(newPlan);
  };

  const updateGoal = (goal: FitnessGoal) => {
    const updated = { ...profile, goal };
    setProfile(updated);
    const newPlan = generateWorkoutPlan(updated);
    setWorkoutPlan(newPlan);
  };

  const addXp = (amount: number) => {
    setProfile((prev) => {
      let currentXp = prev.currentXp + amount;
      let level = prev.level;
      let nextLevelXp = prev.nextLevelXp;

      while (currentXp >= nextLevelXp) {
        currentXp -= nextLevelXp;
        level += 1;
        nextLevelXp = Math.round(nextLevelXp * 1.3);
      }

      return { ...prev, level, currentXp, nextLevelXp };
    });
  };

  const logCompletedWorkout = (log: Omit<WorkoutSessionLog, 'id'>) => {
    const fullLog: WorkoutSessionLog = {
      ...log,
      id: `hist-${Date.now()}`,
    };

    setWorkoutHistory((prev) => [fullLog, ...prev]);

    // Update streak and XP
    setProfile((prev) => ({
      ...prev,
      streak: prev.streak + 1,
    }));
    addXp(200);

    // Check achievement unlocks
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'first-workout' && !ach.isUnlocked) {
          return { ...ach, isUnlocked: true, unlockedDate: 'Today' };
        }
        if (ach.id === 'ten-workouts' && !ach.isUnlocked && workoutHistory.length + 1 >= 10) {
          return { ...ach, isUnlocked: true, unlockedDate: 'Today' };
        }
        return ach;
      })
    );
  };

  const addFoodToMeal = (
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks',
    food: FoodItem,
    grams = 100
  ) => {
    const ratio = grams / 100;
    const calories = Math.round(food.calories * ratio);
    const protein = Math.round(food.protein * ratio * 10) / 10;
    const carbs = Math.round(food.carbs * ratio * 10) / 10;
    const fat = Math.round(food.fat * ratio * 10) / 10;

    const loggedItem: LoggedFood = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      foodId: food.id,
      name: food.name,
      calories,
      protein,
      carbs,
      fat,
      grams,
      servings: Math.round(ratio * 10) / 10,
      mealType,
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setNutrition((prev) => ({
      ...prev,
      caloriesConsumed: prev.caloriesConsumed + calories,
      proteinConsumed: Math.round((prev.proteinConsumed + protein) * 10) / 10,
      carbsConsumed: Math.round((prev.carbsConsumed + carbs) * 10) / 10,
      fatConsumed: Math.round((prev.fatConsumed + fat) * 10) / 10,
      meals: {
        ...prev.meals,
        [mealType]: [loggedItem, ...prev.meals[mealType]],
      },
    }));

    addXp(25);
  };

  const removeFoodFromMeal = (
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks',
    logId: string
  ) => {
    setNutrition((prev) => {
      const target = prev.meals[mealType].find((m) => m.id === logId);
      if (!target) return prev;

      return {
        ...prev,
        caloriesConsumed: Math.max(0, prev.caloriesConsumed - target.calories),
        proteinConsumed: Math.max(0, Math.round((prev.proteinConsumed - target.protein) * 10) / 10),
        carbsConsumed: Math.max(0, Math.round((prev.carbsConsumed - target.carbs) * 10) / 10),
        fatConsumed: Math.max(0, Math.round((prev.fatConsumed - target.fat) * 10) / 10),
        meals: {
          ...prev.meals,
          [mealType]: prev.meals[mealType].filter((m) => m.id !== logId),
        },
      };
    });
  };

  const addWater = (liters: number) => {
    setNutrition((prev) => ({
      ...prev,
      waterLiters: Math.round((prev.waterLiters + liters) * 10) / 10,
    }));
  };

  const updateRecoveryData = (updated: Partial<RecoveryData>) => {
    setRecovery((prev) => ({ ...prev, ...updated }));
  };

  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isUnlocked: true, unlockedDate: 'Today' } : a))
    );
  };

  return (
    <FitnessContext.Provider
      value={{
        profile,
        workoutPlan,
        workoutHistory,
        nutrition,
        recovery,
        achievements,
        isHydrated,
        updateProfile,
        updateTrainingStyle,
        updateGoal,
        regeneratePlan,
        logCompletedWorkout,
        addFoodToMeal,
        removeFoodFromMeal,
        addWater,
        updateRecoveryData,
        unlockAchievement,
        addXp,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};

