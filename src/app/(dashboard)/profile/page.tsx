'use client';

import React from 'react';
import { User, GraduationCap, Code2, Dumbbell, Wallet, Compass, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { profile, isDemoMode, signOut } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Profile Card */}
      <div className="p-6 md:p-8 rounded-card-lg bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 p-[3px]">
            <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden flex items-center justify-center text-white font-heading font-extrabold text-2xl">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
              ) : (
                profile?.fullName?.[0] || 'A'
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
                {profile?.fullName || 'Alex Rivera'}
              </h1>
              {isDemoMode && (
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                  Demo Student
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              {profile?.collegeName} • Semester {profile?.semester}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
              Target: {profile?.careerGoal}
            </p>
          </div>
        </div>

        <button
          onClick={signOut}
          className="px-4 py-2 rounded-btn border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Reset / Sign Out</span>
        </button>
      </div>

      {/* Profile Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Program</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{profile?.courseName}</p>
          <p className="text-gray-500 mt-1">Semester {profile?.semester} of 8</p>
        </div>

        <div className="p-4 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-2">
            <Code2 className="w-4 h-4" />
            <span>Technical Mastery</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">
            {profile?.technicalLevel} Level
          </p>
          <p className="text-gray-500 mt-1">SkillForge Track Active</p>
        </div>

        <div className="p-4 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-2">
            <Dumbbell className="w-4 h-4" />
            <span>Training Style</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">
            {profile?.fitnessTrainingStyle} ({profile?.fitnessGoal?.replace('_', ' ')})
          </p>
          <p className="text-gray-500 mt-1">Adaptive Schedule Enabled</p>
        </div>

        <div className="p-4 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold mb-2">
            <Wallet className="w-4 h-4" />
            <span>Monthly Budget</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            ₹{profile?.monthlyBudget} / month
          </p>
          <p className="text-gray-500 mt-1">Remaining: ₹{profile?.remainingBudget}</p>
        </div>

        <div className="p-4 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold mb-2">
            <Compass className="w-4 h-4" />
            <span>Preferred Transit</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">
            {profile?.preferredTransitMode}
          </p>
          <p className="text-gray-500 mt-1">Connected to Campus Routes</p>
        </div>
      </div>
    </div>
  );
}
