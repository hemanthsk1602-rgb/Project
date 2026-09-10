'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Play, Sparkles } from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';

interface TopHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
}

export const TopHeader: React.FC<TopHeaderProps> = ({ title, subtitle, actionButton }) => {
  const { profile } = useFitness();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-slate-800/80">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-400 mt-1 font-normal">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Streak Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 shadow-sm">
          <Flame className="w-4 h-4 fill-amber-400" />
          <span className="text-xs font-bold tracking-wide">{profile.streak} Day Streak</span>
        </div>

        {/* Training Style Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{profile.trainingStyle}</span>
        </div>

        {/* Action Button */}
        {actionButton ? (
          <Link
            href={actionButton.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95"
          >
            {actionButton.icon || <Play className="w-3.5 h-3.5 fill-black" />}
            <span>{actionButton.label}</span>
          </Link>
        ) : (
          <Link
            href="/workout/session"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Start Workout</span>
          </Link>
        )}
      </div>
    </header>
  );
};

