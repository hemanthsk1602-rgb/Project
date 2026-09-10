'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Code2,
  Dumbbell,
  Wallet,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';
import { useAuth } from '@/lib/auth/AuthContext';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const router = useRouter();
  const { updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Alex Rivera',
    collegeName: 'National Institute of Technology',
    courseName: 'B.Tech in Computer Science & AI',
    semester: 6,
    careerGoal: 'AI Engineer & Distributed Systems Architect',
    technicalLevel: 'intermediate' as 'beginner' | 'intermediate' | 'advanced',
    fitnessTrainingStyle: 'gym' as 'gym' | 'calisthenics' | 'home',
    fitnessGoal: 'muscle_gain' as 'muscle_gain' | 'fat_loss' | 'strength' | 'general_fitness',
    monthlyBudget: 12000,
    preferredTransitMode: 'metro' as 'metro' | 'bus' | 'walking' | 'auto',
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleFinish = () => {
    setIsProcessing(true);
    // Simulate AI synthesis animation
    setTimeout(() => {
      updateProfile({
        ...formData,
        remainingBudget: 800,
      });
      toast.success('Student profile calibrated! NEXUS is ready.');
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-nexus-light-bg dark:bg-nexus-dark-bg text-nexus-light-text dark:text-nexus-dark-text flex flex-col justify-between p-4 md:p-8 bg-nexus-grid transition-colors">
      {/* Header */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between py-4 border-b border-nexus-light-border dark:border-nexus-dark-border">
        <div className="flex items-center gap-2">
          <NexusOrb size="sm" state="idle" />
          <span className="font-heading font-extrabold text-base tracking-wider bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            NEXUS ONBOARDING
          </span>
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Step {step} of 4
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8">
        {/* Step 1: Academic Identity */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Phase 1: Academic Foundation</span>
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
                Tell NEXUS about your university life
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                NEXUS personalizes exam countdowns, attendance warnings, and study sprints.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Full Student Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-white dark:bg-nexus-dark-card text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  University / College Name
                </label>
                <input
                  type="text"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-white dark:bg-nexus-dark-card text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Course / Major
                  </label>
                  <input
                    type="text"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-white dark:bg-nexus-dark-card text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Current Semester
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-white dark:bg-nexus-dark-card text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={nextStep}
                className="px-6 py-2.5 rounded-btn bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-button-primary flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: SkillForge Career Goal */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                <Code2 className="w-4 h-4" />
                <span>Phase 2: SkillForge & Career Target</span>
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
                What is your target professional trajectory?
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                NEXUS builds an interactive skill tree and recommends targeted daily coding challenges.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Career Aspirations
                </label>
                <input
                  type="text"
                  value={formData.careerGoal}
                  onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                  placeholder="e.g. Full-Stack Developer, AI/ML Engineer, Cloud Architect"
                  className="w-full px-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-white dark:bg-nexus-dark-card text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current Technical Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFormData({ ...formData, technicalLevel: lvl })}
                      className={`p-3 rounded-xl border text-center capitalize text-xs md:text-sm font-semibold transition-all ${
                        formData.technicalLevel === lvl
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-xs'
                          : 'border-nexus-light-border dark:border-nexus-dark-border hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-btn text-gray-500 hover:text-gray-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2.5 rounded-btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-button-primary flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Fitness & Health Style */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                <Dumbbell className="w-4 h-4" />
                <span>Phase 3: Training Style & Physical Health</span>
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
                How and where do you like to train?
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                NEXUS dynamically adjusts session duration when academic or exam deadlines spike.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Training Modality
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'gym', label: 'Gym (Weights)', desc: 'Machines & Free Weights' },
                    { id: 'calisthenics', label: 'Calisthenics', desc: 'Bodyweight Movement' },
                    { id: 'home', label: 'Home Workout', desc: 'Minimal Equipment' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, fitnessTrainingStyle: style.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.fitnessTrainingStyle === style.id
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-xs'
                          : 'border-nexus-light-border dark:border-nexus-dark-border hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <p className="text-xs md:text-sm font-bold">{style.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{style.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Primary Fitness Goal
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'muscle_gain', label: 'Muscle Gain' },
                    { id: 'fat_loss', label: 'Fat Loss' },
                    { id: 'strength', label: 'Strength' },
                    { id: 'general_fitness', label: 'General Fitness' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, fitnessGoal: goal.id as any })}
                      className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                        formData.fitnessGoal === goal.id
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                          : 'border-nexus-light-border dark:border-nexus-dark-border hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-btn text-gray-500 hover:text-gray-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2.5 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-button-primary flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Budget & Transit Mode */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-1">
                <Wallet className="w-4 h-4" />
                <span>Phase 4: Budget & Campus Commute</span>
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
                Finances & Transit Preferences
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Help NEXUS protect your pocket and calculate commute times into your daily study schedule.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Monthly Student Allowance / Budget (₹ INR)
                </label>
                <input
                  type="number"
                  value={formData.monthlyBudget}
                  onChange={(e) => setFormData({ ...formData, monthlyBudget: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-white dark:bg-nexus-dark-card text-sm font-heading font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Primary Commute Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'metro', label: 'Metro Rail' },
                    { id: 'bus', label: 'City / Campus Bus' },
                    { id: 'walking', label: 'Walking / Cycle' },
                    { id: 'auto', label: 'Auto / Cab' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredTransitMode: t.id as any })}
                      className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                        formData.preferredTransitMode === t.id
                          ? 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-500 text-cyan-700 dark:text-cyan-300'
                          : 'border-nexus-light-border dark:border-nexus-dark-border hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-btn text-gray-500 hover:text-gray-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleFinish}
                disabled={isProcessing}
                className="px-7 py-3 rounded-btn bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:opacity-95 text-white font-extrabold text-sm shadow-button-primary flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <NexusOrb size="sm" state="thinking" />
                    <span>Calibrating NEXUS...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Synthesize & Launch NEXUS</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="max-w-2xl mx-auto w-full text-center text-xs text-gray-400 py-4 border-t border-nexus-light-border/60 dark:border-nexus-dark-border/60">
        NEXUS Student Operating System • Phase 1 Foundation
      </div>
    </div>
  );
}
