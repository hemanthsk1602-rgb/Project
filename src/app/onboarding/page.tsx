'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Zap,
  ArrowRight,
  ArrowLeft,
  Check,
  Dumbbell,
  Sparkles,
  Flame,
  Target,
  Clock,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  TrainingStyle,
  FitnessGoal,
  ExperienceLevel,
  ActivityLevel,
} from '@/lib/types';
import { useFitness } from '@/lib/context/FitnessContext';
import { Button } from '@/components/ui/Button';

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, updateProfile, regeneratePlan } = useFitness();

  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Form State initialized from default profile
  const [formData, setFormData] = useState({
    name: profile.name || 'Alex',
    age: profile.age || 24,
    height: profile.height || 175,
    weight: profile.weight || 60,
    activityLevel: profile.activityLevel || ('Very Active' as ActivityLevel),
    goal: profile.goal || ('Build Muscle' as FitnessGoal),
    trainingStyle: profile.trainingStyle || ('Calisthenics' as TrainingStyle),
    experience: profile.experience || ('Intermediate' as ExperienceLevel),
    daysPerWeek: profile.daysPerWeek || 5,
    workoutDuration: profile.workoutDuration || 45,
    equipment: profile.equipment || ['Pull-up bar', 'Dip bars', 'Resistance bands', 'Parallettes'],
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Calculate adaptive calorie/protein target
    const isHypertrophy = formData.goal === 'Build Muscle' || formData.goal === 'Build Strength';
    const proteinTarget = Math.round(formData.weight * 2.0); // ~2g/kg
    const baseCalories = Math.round(formData.weight * 32);
    const calorieTarget = isHypertrophy ? baseCalories + 400 : baseCalories - 250;

    updateProfile({
      ...formData,
      proteinTarget,
      calorieTarget,
      waterTarget: 3.0,
      streak: 1,
    });

    // Generate fresh plan matching the onboarding choices
    regeneratePlan();

    // Redirect to dashboard
    router.push('/dashboard');
  };

  const toggleEquipment = (item: string) => {
    setFormData((prev) => {
      const exists = prev.equipment.includes(item);
      const updated = exists
        ? prev.equipment.filter((eq) => eq !== item)
        : [...prev.equipment, item];
      return { ...prev, equipment: updated };
    });
  };

  const gymEquipmentOptions = [
    'Dumbbells',
    'Barbell',
    'Bench',
    'Cable machine',
    'Machines',
    'Pull-up bar',
  ];

  const calisthenicsEquipmentOptions = [
    'Pull-up bar',
    'Dip bars',
    'Resistance bands',
    'Parallettes',
    'No equipment',
  ];

  const currentEquipmentList =
    formData.trainingStyle === 'Gym'
      ? gymEquipmentOptions
      : formData.trainingStyle === 'Calisthenics'
      ? calisthenicsEquipmentOptions
      : Array.from(new Set([...gymEquipmentOptions, ...calisthenicsEquipmentOptions]));

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] pointer-events-none -z-10" />

      {/* Top Header */}
      <header className="max-w-3xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            FIT<span className="text-emerald-400">PLUS</span>
          </span>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">
            Step <span className="text-emerald-400 font-bold">{step}</span> of {totalSteps}
          </span>
          <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Step Container */}
      <main className="max-w-2xl w-full mx-auto my-8 flex-1 flex flex-col justify-center">
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Tell us about yourself
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Your biometrics help FitPlus accurately calculate volume and energy expenditure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Daily Activity Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'] as ActivityLevel[]).map(
                  (level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, activityLevel: level })}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        formData.activityLevel === level
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {level}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Goal */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                What's your primary fitness goal?
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                FitPlus adapts your rep tempos, load ranges, and caloric targets around this goal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(
                [
                  { id: 'Build Muscle', desc: 'Focus on hypertrophy, moderate volume and muscle fullness.' },
                  { id: 'Lose Fat', desc: 'Optimize body composition while preserving lean mass.' },
                  { id: 'Build Strength', desc: 'Prioritize neurological strength and heavier loads.' },
                  { id: 'Improve Fitness', desc: 'Cardiovascular endurance, stamina and overall energy.' },
                  { id: 'Calisthenics Skills', desc: 'Master handstands, L-sits, levers and muscle-ups.' },
                  { id: 'General Fitness', desc: 'Balanced health, functional mobility, and vitality.' },
                ] as { id: FitnessGoal; desc: string }[]
              ).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setFormData({ ...formData, goal: item.id })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.goal === item.id
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-md shadow-emerald-500/15'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{item.id}</h4>
                    {formData.goal === item.id && (
                      <Check className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Training Style (VERY IMPORTANT) */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                How do you want to train?
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Choose your primary training style. Your choice changes your exercise library and progression system.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Gym */}
              <div
                onClick={() => setFormData({ ...formData, trainingStyle: 'Gym' })}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  formData.trainingStyle === 'Gym'
                    ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🏋️</span>
                    <div>
                      <h3 className="text-lg font-black text-white">GYM</h3>
                      <p className="text-xs text-emerald-400 font-semibold">Weightlifting & Overload</p>
                    </div>
                  </div>
                  {formData.trainingStyle === 'Gym' && (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-black flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  "Train with weights, machines and progressive overload."
                </p>
              </div>

              {/* Calisthenics */}
              <div
                onClick={() => setFormData({ ...formData, trainingStyle: 'Calisthenics' })}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  formData.trainingStyle === 'Calisthenics'
                    ? 'bg-gradient-to-r from-cyan-950/40 to-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🤸</span>
                    <div>
                      <h3 className="text-lg font-black text-white">CALISTHENICS</h3>
                      <p className="text-xs text-cyan-400 font-semibold">Bodyweight & Skill Mastery</p>
                    </div>
                  </div>
                  {formData.trainingStyle === 'Calisthenics' && (
                    <div className="w-7 h-7 rounded-full bg-cyan-500 text-black flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  "Master your bodyweight through strength, control and skills."
                </p>
              </div>

              {/* Hybrid */}
              <div
                onClick={() => setFormData({ ...formData, trainingStyle: 'Hybrid' })}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  formData.trainingStyle === 'Hybrid'
                    ? 'bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-500 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🔀</span>
                    <div>
                      <h3 className="text-lg font-black text-white">HYBRID</h3>
                      <p className="text-xs text-amber-400 font-semibold">The Best of Both Worlds</p>
                    </div>
                  </div>
                  {formData.trainingStyle === 'Hybrid' && (
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-black flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  "Combine gym training and calisthenics."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Experience */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                What's your experience level?
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                We use strict progression logic so beginners aren't handed advanced skill movements.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {[
                {
                  id: 'Beginner',
                  title: 'Beginner (0 - 1 year)',
                  desc: 'Building basic neuromuscular pathways, foundational push/pull mechanics and movement consistency.',
                },
                {
                  id: 'Intermediate',
                  title: 'Intermediate (1 - 3 years)',
                  desc: 'Proficient with fundamental compounds (pull-ups, dips, squats, barbell lifts). Ready for specialized progression.',
                },
                {
                  id: 'Advanced',
                  title: 'Advanced (3+ years)',
                  desc: 'High work capacity. Ready for high-tension levers, muscle-ups, heavy periodized overloads, and high RPE.',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    setFormData({ ...formData, experience: item.id as ExperienceLevel })
                  }
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    formData.experience === item.id
                      ? 'bg-emerald-500/10 border-emerald-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                    {formData.experience === item.id && (
                      <Check className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Training Frequency */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                How often can you train?
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Select how many days per week you can consistently dedicate to workouts.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[3, 4, 5, 6, 7].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setFormData({ ...formData, daysPerWeek: days })}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    formData.daysPerWeek === days
                      ? 'bg-emerald-500/15 border-emerald-500 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-3xl font-black text-white block">{days}</span>
                  <span className="text-xs font-semibold text-slate-400 mt-1 block">
                    Days / week
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 text-center">
              Recommended: 4 to 5 days for optimal hypertrophy and recovery balance.
            </p>
          </div>
        )}

        {/* Step 6: Workout Duration */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                How long do you want to train?
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                We will structure the number of exercises and sets to fit your exact time window.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { min: 20, label: '20 minutes', desc: 'Express high-density circuit' },
                { min: 30, label: '30 minutes', desc: 'Efficient power session' },
                { min: 45, label: '45 minutes', desc: 'Optimal sweet spot' },
                { min: 60, label: '60 minutes', desc: 'Full volume session' },
                { min: 75, label: '60+ minutes', desc: 'Extended high-volume block' },
              ].map((item) => (
                <div
                  key={item.min}
                  onClick={() => setFormData({ ...formData, workoutDuration: item.min })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.workoutDuration === item.min
                      ? 'bg-emerald-500/15 border-emerald-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-white">{item.label}</span>
                    {formData.workoutDuration === item.min && (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Equipment */}
        {step === 7 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Available Equipment
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Select everything you have access to. FitPlus will only program exercises matching your gear.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentEquipmentList.map((eq) => {
                const isSelected = formData.equipment.includes(eq);
                return (
                  <button
                    key={eq}
                    type="button"
                    onClick={() => toggleEquipment(eq)}
                    className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{eq}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Action Footer */}
      <footer className="max-w-2xl w-full mx-auto flex items-center justify-between pt-6 border-t border-slate-800/80">
        <button
          type="button"
          onClick={handlePrev}
          disabled={step === 1}
          className="px-4 py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          icon={step === totalSteps ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        >
          {step === totalSteps ? 'Create My Plan' : 'Continue'}
        </Button>
      </footer>
    </div>
  );
}

