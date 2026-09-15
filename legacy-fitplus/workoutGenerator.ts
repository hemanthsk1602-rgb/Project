import {
  UserProfile,
  WorkoutPlan,
  WorkoutDay,
  Exercise,
  TrainingStyle,
  ExperienceLevel,
} from '../types';
import { EXERCISE_DATABASE } from '../data/exercises';

export function generateWorkoutPlan(profile: UserProfile): WorkoutPlan {
  const { trainingStyle, experience, goal, daysPerWeek, workoutDuration, equipment } = profile;

  // Filter exercises compatible with user equipment
  const userHasEquip = (exEquip: string[]) => {
    if (exEquip.includes('No equipment')) return true;
    return exEquip.some((eq) => equipment.includes(eq));
  };

  // Filter pool
  const pool = EXERCISE_DATABASE.filter((ex) => {
    // Style check
    if (trainingStyle === 'Gym' && ex.style === 'Calisthenics') return false;
    if (trainingStyle === 'Calisthenics' && ex.style === 'Gym') return false;
    // Equipment check
    if (!userHasEquip(ex.equipment)) return false;

    // Difficulty filtering
    if (experience === 'Beginner') {
      if (ex.difficulty === 'Advanced') return false;
    } else if (experience === 'Intermediate') {
      // Intermediate can do beginner and intermediate, plus some advanced skills if progression
    }

    return true;
  });

  const getExercises = (
    muscles: string[],
    count: number,
    preferredStyle?: 'Gym' | 'Calisthenics'
  ): Exercise[] => {
    let filtered = pool.filter((ex) => muscles.includes(ex.muscleGroup));
    if (preferredStyle) {
      const matchStyle = filtered.filter((ex) => ex.style === preferredStyle || ex.style === 'Both');
      if (matchStyle.length >= count) filtered = matchStyle;
    }

    // Sort appropriately by difficulty matching user
    filtered.sort((a, b) => {
      const diffScore = (d: ExperienceLevel) =>
        d === experience ? 0 : d === 'Intermediate' ? 1 : 2;
      return diffScore(a.difficulty) - diffScore(b.difficulty);
    });

    const selected = filtered.slice(0, count);

    // Adapt sets & reps based on goal
    return selected.map((ex) => {
      const copy = { ...ex };
      if (goal === 'Build Strength') {
        copy.sets = Math.min(ex.sets + 1, 5);
        if (copy.reps.includes('-') && !copy.reps.includes('sec')) {
          copy.reps = '4-6';
        }
        copy.restSeconds = Math.max(ex.restSeconds + 30, 90);
      } else if (goal === 'Lose Fat') {
        copy.sets = Math.max(ex.sets - 1, 3);
        if (copy.reps.includes('-') && !copy.reps.includes('sec')) {
          copy.reps = '12-15';
        }
        copy.restSeconds = 45;
      }
      return copy;
    });
  };

  const days: WorkoutDay[] = [];
  const exerciseCount = workoutDuration <= 30 ? 4 : workoutDuration <= 45 ? 5 : 6;

  if (trainingStyle === 'Gym') {
    // Gym Splits
    if (daysPerWeek <= 3) {
      // Full Body A, Full Body B, Full Body C
      days.push({
        id: 'day-1',
        dayName: 'Monday',
        routineName: 'Gym Full Body Power A',
        focus: 'Chest, Back, Quads',
        durationMinutes: workoutDuration,
        difficulty: experience,
        exercises: getExercises(['Chest', 'Back', 'Legs', 'Shoulders', 'Triceps'], exerciseCount, 'Gym'),
        isRestDay: false,
      });
      days.push({
        id: 'day-2',
        dayName: 'Tuesday',
        routineName: 'Active Recovery & Mobility',
        focus: 'Recovery',
        durationMinutes: 20,
        difficulty: 'Beginner',
        exercises: [],
        isRestDay: true,
      });
      days.push({
        id: 'day-3',
        dayName: 'Wednesday',
        routineName: 'Gym Full Body Hypertrophy B',
        focus: 'Shoulders, Lats, Hamstrings',
        durationMinutes: workoutDuration,
        difficulty: experience,
        exercises: getExercises(['Back', 'Shoulders', 'Legs', 'Biceps', 'Core'], exerciseCount, 'Gym'),
        isRestDay: false,
      });
      days.push({
        id: 'day-4',
        dayName: 'Thursday',
        routineName: 'Rest & Neuromuscular Reset',
        focus: 'Recovery',
        durationMinutes: 0,
        difficulty: 'Beginner',
        exercises: [],
        isRestDay: true,
      });
      days.push({
        id: 'day-5',
        dayName: 'Friday',
        routineName: 'Gym Full Body Compound C',
        focus: 'Legs, Chest, Arms',
        durationMinutes: workoutDuration,
        difficulty: experience,
        exercises: getExercises(['Legs', 'Chest', 'Back', 'Triceps', 'Biceps'], exerciseCount, 'Gym'),
        isRestDay: false,
      });
      days.push({
        id: 'day-6',
        dayName: 'Saturday',
        routineName: 'Weekend Rest & Light Walk',
        focus: 'Recovery',
        durationMinutes: 0,
        difficulty: 'Beginner',
        exercises: [],
        isRestDay: true,
      });
      days.push({
        id: 'day-7',
        dayName: 'Sunday',
        routineName: 'Rest Day',
        focus: 'Recovery',
        durationMinutes: 0,
        difficulty: 'Beginner',
        exercises: [],
        isRestDay: true,
      });
    } else {
      // 4-6 Days: Push / Pull / Legs Split
      days.push({
        id: 'day-1',
        dayName: 'Monday',
        routineName: 'Push Day (Chest, Shoulders, Triceps)',
        focus: 'Chest, Front Delts, Triceps',
        durationMinutes: workoutDuration,
        difficulty: experience,
        exercises: getExercises(['Chest', 'Shoulders', 'Triceps'], exerciseCount, 'Gym'),
        isRestDay: false,
      });
      days.push({
        id: 'day-2',
        dayName: 'Tuesday',
        routineName: 'Pull Day (Back, Rear Delts, Biceps)',
        focus: 'Lats, Rhomboids, Biceps',
        durationMinutes: workoutDuration,
        difficulty: experience,
        exercises: getExercises(['Back', 'Shoulders', 'Biceps'], exerciseCount, 'Gym'),
        isRestDay: false,
      });
      days.push({
        id: 'day-3',
        dayName: 'Wednesday',
        routineName: 'Legs & Core Overload',
        focus: 'Quads, Hamstrings, Calves, Core',
        durationMinutes: workoutDuration,
        difficulty: experience,
        exercises: getExercises(['Legs', 'Core'], exerciseCount, 'Gym'),
        isRestDay: false,
      });
      days.push({
        id: 'day-4',
        dayName: 'Thursday',
        routineName: daysPerWeek >= 5 ? 'Upper Body Hypertrophy' : 'Active Recovery Day',
        focus: daysPerWeek >= 5 ? 'Chest, Back, Arms' : 'Recovery',
        durationMinutes: daysPerWeek >= 5 ? workoutDuration : 20,
        difficulty: experience,
        exercises:
          daysPerWeek >= 5
            ? getExercises(['Chest', 'Back', 'Biceps', 'Triceps'], exerciseCount, 'Gym')
            : [],
        isRestDay: daysPerWeek < 5,
      });
      days.push({
        id: 'day-5',
        dayName: 'Friday',
        routineName: daysPerWeek >= 5 ? 'Lower Body & Arms Power' : 'Rest Day',
        focus: daysPerWeek >= 5 ? 'Legs, Shoulders, Arms' : 'Recovery',
        durationMinutes: daysPerWeek >= 5 ? workoutDuration : 0,
        difficulty: experience,
        exercises:
          daysPerWeek >= 5
            ? getExercises(['Legs', 'Shoulders', 'Biceps'], exerciseCount, 'Gym')
            : [],
        isRestDay: daysPerWeek < 5,
      });
      days.push({
        id: 'day-6',
        dayName: 'Saturday',
        routineName: daysPerWeek >= 6 ? 'Arms & Shoulders Weakpoint Day' : 'Weekend Rest',
        focus: daysPerWeek >= 6 ? 'Biceps, Triceps, Delts' : 'Recovery',
        durationMinutes: daysPerWeek >= 6 ? workoutDuration : 0,
        difficulty: experience,
        exercises:
          daysPerWeek >= 6
            ? getExercises(['Shoulders', 'Biceps', 'Triceps', 'Core'], exerciseCount, 'Gym')
            : [],
        isRestDay: daysPerWeek < 6,
      });
      days.push({
        id: 'day-7',
        dayName: 'Sunday',
        routineName: 'Full Body Regeneration & Rest',
        focus: 'Recovery',
        durationMinutes: 0,
        difficulty: 'Beginner',
        exercises: [],
        isRestDay: true,
      });
    }
  } else if (trainingStyle === 'Calisthenics') {
    // Calisthenics Engine
    days.push({
      id: 'day-1',
      dayName: 'Monday',
      routineName: 'Calisthenics Push & Handstand Skills',
      focus: 'Chest, Triceps, Scapular Control',
      durationMinutes: workoutDuration,
      difficulty: experience,
      exercises: getExercises(['Chest', 'Triceps', 'Skill', 'Shoulders'], exerciseCount, 'Calisthenics'),
      isRestDay: false,
    });
    days.push({
      id: 'day-2',
      dayName: 'Tuesday',
      routineName: 'Calisthenics Pull & Front Lever Progression',
      focus: 'Lats, Biceps, Core Tension',
      durationMinutes: workoutDuration,
      difficulty: experience,
      exercises: getExercises(['Back', 'Biceps', 'Skill'], exerciseCount, 'Calisthenics'),
      isRestDay: false,
    });
    days.push({
      id: 'day-3',
      dayName: 'Wednesday',
      routineName: 'Bodyweight Legs & Core Compression',
      focus: 'Single-leg Balance, Quads, Abdominals',
      durationMinutes: workoutDuration,
      difficulty: experience,
      exercises: getExercises(['Legs', 'Core', 'Skill'], exerciseCount, 'Calisthenics'),
      isRestDay: false,
    });
    days.push({
      id: 'day-4',
      dayName: 'Thursday',
      routineName: daysPerWeek >= 5 ? 'Skill Specialization & Upper Endurance' : 'Active Recovery & Mobility',
      focus: daysPerWeek >= 5 ? 'L-sit, Muscle-up prep, Dips' : 'Recovery',
      durationMinutes: daysPerWeek >= 5 ? workoutDuration : 20,
      difficulty: experience,
      exercises:
        daysPerWeek >= 5
          ? getExercises(['Skill', 'Chest', 'Back'], exerciseCount, 'Calisthenics')
          : [],
      isRestDay: daysPerWeek < 5,
    });
    days.push({
      id: 'day-5',
      dayName: 'Friday',
      routineName: daysPerWeek >= 4 ? 'Full Upper Body Calisthenics Volume' : 'Rest Day',
      focus: daysPerWeek >= 4 ? 'Push-up variations, Pull-ups, Core' : 'Recovery',
      durationMinutes: daysPerWeek >= 4 ? workoutDuration : 0,
      difficulty: experience,
      exercises:
        daysPerWeek >= 4
          ? getExercises(['Chest', 'Back', 'Core', 'Triceps'], exerciseCount, 'Calisthenics')
          : [],
      isRestDay: daysPerWeek < 4,
    });
    days.push({
      id: 'day-6',
      dayName: 'Saturday',
      routineName: daysPerWeek >= 6 ? 'Calisthenics Conditioning & Agility' : 'Active Rest',
      focus: daysPerWeek >= 6 ? 'Legs, Core, Grip' : 'Recovery',
      durationMinutes: daysPerWeek >= 6 ? workoutDuration : 0,
      difficulty: experience,
      exercises:
        daysPerWeek >= 6
          ? getExercises(['Legs', 'Core'], exerciseCount, 'Calisthenics')
          : [],
      isRestDay: daysPerWeek < 6,
    });
    days.push({
      id: 'day-7',
      dayName: 'Sunday',
      routineName: 'Systemic Nervous Recovery',
      focus: 'Recovery',
      durationMinutes: 0,
      difficulty: 'Beginner',
      exercises: [],
      isRestDay: true,
    });
  } else {
    // Hybrid Training Engine (Gym + Calisthenics)
    days.push({
      id: 'day-1',
      dayName: 'Monday',
      routineName: 'Gym Heavy Push & Hypertrophy',
      focus: 'Barbell/Dumbbell Pressing, Triceps',
      durationMinutes: workoutDuration,
      difficulty: experience,
      exercises: getExercises(['Chest', 'Shoulders', 'Triceps'], exerciseCount, 'Gym'),
      isRestDay: false,
    });
    days.push({
      id: 'day-2',
      dayName: 'Tuesday',
      routineName: 'Calisthenics Pull & Lever Mechanics',
      focus: 'Pull-up progressions, Front lever drills',
      durationMinutes: workoutDuration,
      difficulty: experience,
      exercises: getExercises(['Back', 'Skill', 'Biceps'], exerciseCount, 'Calisthenics'),
      isRestDay: false,
    });
    days.push({
      id: 'day-3',
      dayName: 'Wednesday',
      routineName: 'Mid-Week Rest & Joint Flossing',
      focus: 'Recovery',
      durationMinutes: 0,
      difficulty: 'Beginner',
      exercises: [],
      isRestDay: true,
    });
    days.push({
      id: 'day-4',
      dayName: 'Thursday',
      routineName: 'Gym Heavy Legs & Posterior Chain',
      focus: 'Squats, RDLs, Machine accessories',
      durationMinutes: workoutDuration,
      difficulty: experience,
      exercises: getExercises(['Legs'], exerciseCount, 'Gym'),
      isRestDay: false,
    });
    days.push({
      id: 'day-5',
      dayName: 'Friday',
      routineName: 'Calisthenics Skills & Upper Dynamic Power',
      focus: 'Handstand, Dips, Archer variations',
      durationMinutes: workoutDuration,
      difficulty: experience,
      exercises: getExercises(['Skill', 'Chest', 'Core'], exerciseCount, 'Calisthenics'),
      isRestDay: false,
    });
    days.push({
      id: 'day-6',
      dayName: 'Saturday',
      routineName: daysPerWeek >= 5 ? 'Hybrid Conditioning & Core Overload' : 'Weekend Rest',
      focus: daysPerWeek >= 5 ? 'Core, Calves, Accessories' : 'Recovery',
      durationMinutes: daysPerWeek >= 5 ? workoutDuration : 0,
      difficulty: experience,
      exercises:
        daysPerWeek >= 5 ? getExercises(['Core', 'Legs', 'Back'], exerciseCount) : [],
      isRestDay: daysPerWeek < 5,
    });
    days.push({
      id: 'day-7',
      dayName: 'Sunday',
      routineName: 'Full Rest & Meal Prep',
      focus: 'Recovery',
      durationMinutes: 0,
      difficulty: 'Beginner',
      exercises: [],
      isRestDay: true,
    });
  }

  return {
    id: `plan-${Date.now()}`,
    trainingStyle,
    splitName:
      trainingStyle === 'Gym'
        ? `${daysPerWeek}-Day Gym Overload Split`
        : trainingStyle === 'Calisthenics'
        ? `${daysPerWeek}-Day Calisthenics Mastery Progression`
        : `${daysPerWeek}-Day Hybrid Power & Skill Split`,
    createdAt: new Date().toISOString(),
    days,
  };
}

