'use client';

import React, { useState } from 'react';
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

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      {/* Header */}
      <TopHeader
        title="Achievements & Athletic Ranks"
        subtitle="Earn XP, level up your athletic tier, and unlock badges for milestones"
      />

      {/* Top Banner: Level Card & Streak Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Level Card (spans 2) */}
        <div className="sm:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-emerald-500/20">
                {profile.level}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Current Rank
                </span>
                <h3 className="text-2xl font-black text-white">Level {profile.level} Elite Athlete</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Top tier consistency and physical volume
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Unlocked</span>
              <span className="text-lg font-black text-emerald-400">
                {unlockedCount} / {totalCount}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">XP Progress to Level {profile.level + 1}</span>
              <span className="text-white font-bold">
                {profile.currentXp} / {profile.nextLevelXp} XP ({progressPercent}%)
              </span>
            </div>
            <ProgressBar
              value={profile.currentXp}
              max={profile.nextLevelXp}
              color="emerald"
              height="lg"
            />
          </div>
        </div>

        {/* Streak Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-slate-900 flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-3xl shadow-inner animate-pulse">
            <Flame className="w-8 h-8 fill-amber-400" />
          </div>
          <h4 className="text-3xl font-black text-white">{profile.streak} Days</h4>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Unstoppable Streak
          </span>
          <p className="text-[11px] text-slate-400 max-w-[200px]">
            Keep logging workouts or recovery to reach the 30-day Iron badge!
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Badges Grid with Locked / Unlocked States */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAchievements.map((ach) => (
          <div
            key={ach.id}
            className={`glass-card p-6 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
              ach.isUnlocked
                ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-900/90'
                : 'border-slate-800/80 opacity-70 hover:opacity-90'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${
                    ach.isUnlocked
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-500/15'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}
                >
                  {ach.isUnlocked ? ach.icon : <Lock className="w-5 h-5 text-slate-500" />}
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      ach.isUnlocked
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {ach.isUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold block mt-1">
                    +{ach.xpReward} XP
                  </span>
                </div>
              </div>

              {/* Title & Desc */}
              <h4 className="text-base font-bold text-white mb-1">{ach.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{ach.description}</p>
            </div>

            {/* Footer Status */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500">{ach.category}</span>
              {ach.isUnlocked && ach.unlockedDate && (
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{ach.unlockedDate}</span>
                </span>
              )}
              {!ach.isUnlocked && ach.progressMax && (
                <span className="text-[11px] text-slate-400 font-medium">
                  {ach.progressCurrent} / {ach.progressMax}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

