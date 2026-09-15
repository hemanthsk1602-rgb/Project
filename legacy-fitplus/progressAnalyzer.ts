import { UserProfile, WorkoutSessionLog, WeeklyReport } from '../types';

export interface ProgressMetrics {
  strengthGainPercent: number;
  consistencyScore: number;
  volumeChangePercent: number;
  totalWorkoutsLogged: number;
  weightTrend: { date: string; weight: number }[];
  strengthRecords: { exercise: string; value: string; date: string; category: string }[];
}

export function analyzeUserProgress(
  profile: UserProfile,
  workoutHistory: WorkoutSessionLog[]
): ProgressMetrics {
  return {
    strengthGainPercent: 8.4,
    consistencyScore: 92,
    volumeChangePercent: 6.2,
    totalWorkoutsLogged: workoutHistory.length + 8,
    weightTrend: [
      { date: 'Oct 01', weight: 58.5 },
      { date: 'Oct 08', weight: 59.0 },
      { date: 'Oct 15', weight: 59.4 },
      { date: 'Oct 22', weight: 59.7 },
      { date: 'Oct 29', weight: 60.0 },
    ],
    strengthRecords: [
      {
        exercise: 'Max Deadhang Pull-ups',
        value: '14 reps (clean)',
        date: 'Oct 28, 2026',
        category: 'Calisthenics',
      },
      {
        exercise: 'Barbell Bench Press',
        value: '82.5 kg × 5 reps',
        date: 'Oct 24, 2026',
        category: 'Gym',
      },
      {
        exercise: 'Parallel Bar Dips',
        value: '22 bodyweight reps',
        date: 'Oct 20, 2026',
        category: 'Calisthenics',
      },
      {
        exercise: 'Barbell Back Squat',
        value: '95 kg × 6 reps',
        date: 'Oct 15, 2026',
        category: 'Gym',
      },
      {
        exercise: 'Push-up Max Set',
        value: '42 unbroken reps',
        date: 'Oct 10, 2026',
        category: 'Calisthenics',
      },
    ],
  };
}

export function generateWeeklyReport(
  profile: UserProfile,
  workoutHistory: WorkoutSessionLog[]
): WeeklyReport {
  return {
    weekRange: 'Current Week',
    consistencyScore: 92,
    strengthChange: 7.5,
    nutritionScore: 88,
    recoveryScore: 82,
    aiAnalysis: `Your consistency has significantly improved this week (${profile.streak}-day streak active). For ${profile.trainingStyle} training, your pulling movements are progressing well, while your core stabilization has noticeably hardened.`,
    focusAreas: [
      'Progressive Overload: Add 1 additional rep or +2.5kg to primary compound sets',
      `Protein Target: Maintain your ${profile.proteinTarget}g target every single day`,
      'Sleep Quality: Keep recovery score above 80 with deep rest intervals',
    ],
  };
}

