// ==============================================================================
// NEXUS — AI STUDENT OPERATING SYSTEM
// Core TypeScript Domain Definitions across all 7 Life Modules
// ==============================================================================

export type ModuleName = 
  | 'study' 
  | 'fitness' 
  | 'finance' 
  | 'productivity' 
  | 'skills' 
  | 'navigate' 
  | 'ai';

export interface StudentProfile {
  id: string;
  fullName: string;
  avatarUrl?: string;
  collegeName: string;
  courseName: string;
  semester: number;
  careerGoal: string;
  technicalLevel: 'beginner' | 'intermediate' | 'advanced';
  fitnessTrainingStyle: 'gym' | 'calisthenics' | 'home';
  fitnessGoal: 'muscle_gain' | 'fat_loss' | 'strength' | 'general_fitness';
  monthlyBudget: number;
  remainingBudget: number;
  preferredTransitMode: 'metro' | 'bus' | 'walking' | 'auto';
  isDemoStudent?: boolean;
}

// ------------------------------------------------------------------------------
// Productivity Module Types
// ------------------------------------------------------------------------------
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TaskCategory = 'academic' | 'fitness' | 'career' | 'personal' | 'chores';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline?: string;
  estimatedDurationMinutes?: number;
  category: TaskCategory;
  isRecurring?: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  frequency: 'daily' | 'weekdays' | 'weekends';
  targetCount: number;
  unit: string;
  color: string;
  streakCount: number;
  completedToday: boolean;
}

// ------------------------------------------------------------------------------
// Study Module Types
// ------------------------------------------------------------------------------
export interface Subject {
  id: string;
  userId: string;
  name: string;
  code?: string;
  color: string;
  icon: string;
  targetAttendancePercentage: number;
  currentAttendancePercentage: number;
  totalClasses: number;
  attendedClasses: number;
  progressPercentage: number;
  topicsCompleted: number;
  totalTopics: number;
  nextExamDate?: string;
  studyMinutesThisWeek: number;
}

export interface Exam {
  id: string;
  userId: string;
  subjectId: string;
  subjectName: string;
  title: string;
  examDate: string;
  totalMarks?: number;
  weightagePercentage?: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  daysRemaining: number;
}

export interface Assignment {
  id: string;
  userId: string;
  subjectId: string;
  subjectName: string;
  title: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'graded';
  daysRemaining: number;
}

// ------------------------------------------------------------------------------
// Fitness Module Types
// ------------------------------------------------------------------------------
export interface Workout {
  id: string;
  name: string;
  trainingStyle: 'gym' | 'calisthenics' | 'home';
  targetMuscleGroups: string[];
  estimatedDurationMinutes: number;
  exercisesCount: number;
  isToday: boolean;
}

export interface FitnessSummary {
  weeklyStreak: number;
  completedWorkoutsThisWeek: number;
  targetWorkoutsPerWeek: number;
  todayWorkout?: Workout;
  totalVolumeKg: number;
  weightKg: number;
}

// ------------------------------------------------------------------------------
// Finance Module Types
// ------------------------------------------------------------------------------
export type ExpenseCategory = 
  | 'Food' 
  | 'Transport' 
  | 'Education' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Bills' 
  | 'Other';

export interface FinanceSummary {
  monthlyBudget: number;
  totalSpentThisMonth: number;
  remainingBudget: number;
  todaySpent: number;
  daysRemainingInMonth: number;
  dailySafeSpendingLimit: number;
  topCategory: ExpenseCategory;
  categoryBreakdown: Record<ExpenseCategory, number>;
}

// ------------------------------------------------------------------------------
// SkillForge Module Types
// ------------------------------------------------------------------------------
export interface SkillForgeSummary {
  activeCareerPath: string;
  careerReadinessScore: number; // 0 - 100
  skillsLearnedCount: number;
  totalRoadmapSkills: number;
  currentSkill: string;
  activeStreak: number;
  pendingCodingChallengesCount: number;
  activeProjectTitle: string;
  activeProjectProgress: number;
}

// ------------------------------------------------------------------------------
// Navigation Module Types
// ------------------------------------------------------------------------------
export interface TransitRoute {
  id: string;
  originName: string;
  destinationName: string;
  durationMinutes: number;
  estimatedFare: number;
  travelMode: 'bus' | 'metro' | 'walking' | 'auto';
  busNumber?: string;
  boardingPoint?: string;
  dropOffPoint?: string;
  transfers: number;
  isDemoData: boolean;
  departureTimeText: string;
}

// ------------------------------------------------------------------------------
// Cross-Module Intelligence & Daily Briefing
// ------------------------------------------------------------------------------
export interface DailyAIBriefing {
  greeting: string;
  summaryText: string;
  priorities: string[];
  crossModuleAction: {
    title: string;
    description: string;
    rationale: string;
    sourceModules: ModuleName[];
  };
  stats: {
    upcomingExamsCount: number;
    pendingTasksCount: number;
    remainingBudget: number;
    careerReadinessScore: number;
  };
}

