'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Flame,
  Zap,
  Lock,
  CheckCircle2,
  Sparkles,
  Award,
  Shield,
  Star,
  Target,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function AchievementsPage() {
  const { profile, achievements } = useFitness();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Workouts', 'Streak', 'Calisthenics', 'Strength', 'Nutrition'];

  const filteredAchievements = achievements.filter((a) => {
    return selectedCategory === 'All' || a.category === selectedCategory;
  });

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalCount = achievements.length;
  const progressPercent = Math.round((profile.currentXp / profile.nextLevelXp) * 100);

  // Goal metrics based on actual profile
  const goalCompletion = Math.min(100, Math.round((profile.streak / 14) * 85));

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      {/* Header */}
      <TopHeader
        title="Goals & Athletic Achievements"
        subtitle="Track active milestones, earn XP, and unlock verified performance badges"
        actionButton={{
          label: 'Update Goal',
          href: '/profile',
          icon: <Target className="w-4 h-4 fill-black" />,
        }}
      />

      {/* 1. CURRENT GOAL SPOTLIGHT CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#D5FF3E]/30 backdrop-blur-xl relative overflow-hidden transition-all">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D5FF3E]/5 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/30">
                Primary Athletic Target
              </span>
              <span className="text-xs text-white/50">•</span>
              <span className="text-xs text-white/70 font-semibold">{profile.trainingStyle} Discipline</span>
            </div>

            <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {profile.goal}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Targeting lean muscle protein synthesis, compound overload, and metabolic conditioning tailored to your {profile.experience} experience tier.
            </p>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-white/60">Milestone Progress ({profile.streak} Days Logged):</span>
                <span className="font-outfit text-sm font-extrabold text-[#D5FF3E]">{goalCompletion}% Complete</span>
              </div>
              <ProgressBar
                value={goalCompletion}
                max={100}
                color="lime"
                height="md"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Link
              href="/workout"
              className="px-6 py-3 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black text-xs font-extrabold transition-all shadow-lg shadow-[#D5FF3E]/20 hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>Train for Goal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/profile"
              className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-colors text-center"
            >
              Adjust Parameters
            </Link>
          </div>
        </div>
      </div>

      {/* 2. LEVEL & STREAK SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Level Card (spans 2) */}
        <div className="sm:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl flex flex-col justify-between space-y-4 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#D5FF3E] flex items-center justify-center text-black font-black text-2xl shadow-xl shadow-[#D5FF3E]/20">
                {profile.level}
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#D5FF3E] uppercase tracking-wider block">
                  Current Rank
                </span>
                <h3 className="font-outfit text-2xl font-extrabold text-white">Level {profile.level} Elite Athlete</h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Top tier consistency and physical volume
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/40 block font-medium">Badges Unlocked</span>
              <span className="font-outfit text-xl font-extrabold text-[#D5FF3E]">
                {unlockedCount} / {totalCount}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60 font-semibold">XP Progress to Level {profile.level + 1}</span>
              <span className="text-white font-mono font-bold">
                {profile.currentXp} / {profile.nextLevelXp} XP ({progressPercent}%)
              </span>
            </div>
            <ProgressBar
              value={profile.currentXp}
              max={profile.nextLevelXp}
              color="lime"
              height="lg"
            />
          </div>
        </div>

        {/* Streak Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl flex flex-col items-center justify-center text-center space-y-2 transition-all">
          <div className="w-16 h-16 rounded-2xl bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 text-[#D5FF3E] flex items-center justify-center text-3xl shadow-inner animate-pulse">
            <Flame className="w-8 h-8 fill-[#D5FF3E]" />
          </div>
          <h4 className="font-outfit text-3xl font-black text-white">{profile.streak} Days</h4>
          <span className="text-[11px] font-bold text-[#D5FF3E] uppercase tracking-wider">
            Unbroken Streak
          </span>
          <p className="text-[11px] text-white/50 max-w-[200px]">
            Keep logging workouts or recovery to reach the 30-day Iron badge!
          </p>
        </div>
      </div>

      {/* 3. CATEGORY FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#D5FF3E] text-black shadow-md shadow-[#D5FF3E]/20'
                : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. BADGES GRID WITH LOCKED / UNLOCKED STATES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAchievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
              ach.isUnlocked
                ? 'bg-white/[0.03] border-white/10 hover:border-[#D5FF3E]/40 backdrop-blur-xl'
                : 'bg-white/[0.01] border-white/5 opacity-60 hover:opacity-85'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${
                    ach.isUnlocked
                      ? 'bg-white/5 border-white/10 text-[#D5FF3E] shadow-md'
                      : 'bg-black/40 border-white/5 text-white/30'
                  }`}
                >
                  {ach.isUnlocked ? ach.icon : <Lock className="w-5 h-5 text-white/40" />}
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      ach.isUnlocked
                        ? 'bg-[#D5FF3E]/10 text-[#D5FF3E] border-[#D5FF3E]/20'
                        : 'bg-white/5 text-white/40 border-white/10'
                    }`}
                  >
                    {ach.isUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                  <span className="text-[10px] text-[#D5FF3E] font-bold block mt-1">
                    +{ach.xpReward} XP
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                {ach.category}
              </span>
              <h4 className="font-outfit text-base font-extrabold text-white mt-0.5">{ach.title}</h4>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">{ach.description}</p>
            </div>

            {/* Status Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              {ach.isUnlocked ? (
                <span className="text-xs text-[#D5FF3E] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed & Verified</span>
                </span>
              ) : (
                <span className="text-xs text-white/40 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Keep Training to Unlock</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
