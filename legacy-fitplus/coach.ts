import { UserProfile, RecoveryData, WorkoutPlan } from '../types';

export interface CoachContext {
  profile: UserProfile;
  recovery: RecoveryData;
  workoutPlan: WorkoutPlan;
}

export function generateCoachResponse(
  userQuery: string,
  context: CoachContext
): string {
  const { profile, recovery, workoutPlan } = context;
  const q = userQuery.toLowerCase();

  const todayDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  // map to Monday-first index: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
  const normalizedIndex = todayDayIndex === 0 ? 6 : todayDayIndex - 1;
  const todayWorkout = workoutPlan.days[normalizedIndex] || workoutPlan.days[0];

  if (q.includes('what should i train') || q.includes('what to train') || q.includes('today')) {
    if (todayWorkout.isRestDay) {
      return `Based on your ${profile.trainingStyle} plan and your current recovery score of ${recovery.score}/100, today is scheduled as a **${todayWorkout.routineName}**. Your body builds muscle during recovery; focus on mobility, hydrating (target ${profile.waterTarget}L), and hitting your ${profile.proteinTarget}g protein goal!`;
    }
    return `Based on your ${profile.trainingStyle} plan, previous performance, and solid recovery score of ${recovery.score}/100, today's focus is **${todayWorkout.routineName}** (${todayWorkout.focus}). You have ${todayWorkout.exercises.length} exercises programmed for approximately ${todayWorkout.durationMinutes} minutes. Head over to the Workout tab and let's get after it!`;
  }

  if (q.includes('improve my pull-up') || q.includes('pull ups') || q.includes('pull-up')) {
    if (profile.trainingStyle === 'Calisthenics' || profile.trainingStyle === 'Hybrid') {
      return `To break through on pull-ups for your **${profile.experience}** level:\n\n1. **Scapular Pull-ups:** Do 3 sets of 8-10 reps before every pulling session to recruit the lower traps.\n2. **Slow Eccentrics (Negatives):** Finish your sets with a 5-second controlled lowering phase.\n3. **Grease the Groove:** Perform 50% of your maximum pull-up capacity 3-4 times distributed throughout the day without reaching failure.\n4. **Current Recommendation:** Since your bodyweight is ${profile.weight}kg, your pulling power-to-weight ratio is prime. Target 4 sets of 8 clean reps this week!`;
    }
    return `To elevate your pull-up capacity: Add lat pulldown dropsets and heavy bent-over barbell rows to strengthen your mid-back. Also incorporate negative pull-ups with a 5-second descent at the end of back sessions.`;
  }

  if (q.includes('progress slowing') || q.includes('plateau') || q.includes('slow')) {
    return `Plateaus are normal and often indicate a need for systematic deloading or stimulus variation. Given your current ${profile.streak}-day streak:\n\n• **Fatigue Masking Fitness:** Your recovery score is ${recovery.score}/100. If soreness lingers, consider a 3-day active recovery phase.\n• **Progressive Overload Tweak:** Try micro-progressions—add 1 extra rep per set rather than jumping weight or drastically changing exercises.\n• **Nutrition Factor:** Ensure you consistently hit your ${profile.calorieTarget} kcal and ${profile.proteinTarget}g protein target to support cellular repair.`;
  }

  if (q.includes('create a workout') || q.includes('new workout') || q.includes('routine')) {
    return `I can regenerate your routine instantly! You are currently configured for **${profile.trainingStyle}** (${profile.daysPerWeek} days/week, ${profile.workoutDuration} min). If you'd like a fresh split or want to switch between Gym, Calisthenics, or Hybrid, use the training style switcher on the Workout page or Profile settings!`;
  }

  if (q.includes('how much protein') || q.includes('protein target') || q.includes('nutrition')) {
    const perKg = (profile.proteinTarget / profile.weight).toFixed(1);
    return `For your goal of **${profile.goal}** at ${profile.weight}kg bodyweight, your optimal daily protein target is **${profile.proteinTarget}g** (~${perKg}g per kg of bodyweight). Spread this across 3-4 meals (approx 30-40g per meal) to maximize muscle protein synthesis. High-yield sources: chicken breast, eggs, Greek yogurt, whey isolate, and paneer.`;
  }

  if (q.includes('rest day') || q.includes('recovery day')) {
    return `On your rest days, focus on passive and active recovery:\n\n• 20–30 minutes of gentle walking or light joint mobility.\n• Drink at least ${profile.waterTarget} liters of water.\n• Prioritize quality sleep (aim for 7.5 to 8.5 hours).\n• Hit your full ${profile.proteinTarget}g protein target so your muscle tissue repairs effectively.`;
  }

  // Fallback intelligent answer
  return `As your FitPlus coach, I'm tracking your **${profile.trainingStyle}** progression towards **${profile.goal}**. With a ${profile.streak}-day streak and recovery rating of ${recovery.score}/100, your consistency is exceptional. Keep your sets close to RPE 8-9 and ensure you hit your ${profile.proteinTarget}g protein today. How else can I assist your training?`;
}

