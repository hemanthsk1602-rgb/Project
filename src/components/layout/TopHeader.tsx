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
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-white/10">
      <div>
        <h1 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-white/60 mt-1 font-normal leading-relaxed">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Streak Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5FF3E]/10 border border-[#D5FF3E]/25 text-[#D5FF3E] shadow-sm">
          <Flame className="w-3.5 h-3.5 fill-[#D5FF3E]" />
          <span className="text-xs font-bold tracking-wide">{profile.streak} Day Streak</span>
        </div>

        {/* Training Style Badge */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-pulse" />
          <span>{profile.trainingStyle}</span>
        </div>

        {/* Action Button */}
        {actionButton ? (
          <Link
            href={actionButton.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black font-extrabold text-xs transition-all shadow-lg shadow-[#D5FF3E]/20 hover:scale-105 active:scale-95"
          >
            {actionButton.icon || <Play className="w-3.5 h-3.5 fill-black" />}
            <span>{actionButton.label}</span>
          </Link>
        ) : (
          <Link
            href="/workout/session"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black font-extrabold text-xs transition-all shadow-lg shadow-[#D5FF3E]/20 hover:scale-105 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Start Workout</span>
          </Link>
        )}
      </div>
    </header>
  );
};
