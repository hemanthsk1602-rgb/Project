'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  TrendingUp,
  Bot,
  HeartPulse,
  Trophy,
  User,
  Settings,
  Flame,
  LogOut,
  Zap,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Workout', href: '/workout', icon: Dumbbell },
  { label: 'Nutrition', href: '/nutrition', icon: Utensils },
  { label: 'AI Coach', href: '/ai-coach', icon: Bot, badge: 'AI' },
  { label: 'Progress', href: '/progress', icon: TrendingUp },
  { label: 'Recovery', href: '/recovery', icon: HeartPulse },
  { label: 'Achievements', href: '/achievements', icon: Trophy },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { profile } = useFitness();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-[#07090E] border-r border-white/10 p-5 select-none z-30">
      {/* Brand Header */}
      <Link href="/dashboard" className="flex items-center gap-3 px-2 py-1 mb-8 group">
        <div className="w-10 h-10 rounded-2xl bg-[#D5FF3E] flex items-center justify-center shadow-lg shadow-[#D5FF3E]/20 group-hover:scale-105 transition-transform">
          <Zap className="w-5 h-5 text-black fill-black" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-outfit text-xl font-extrabold tracking-tight text-white">
              FIT<span className="text-[#D5FF3E]">PLUS</span>
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-white/10 text-slate-300 border border-white/15 rounded-full">
              AI
            </span>
          </div>
          <p className="text-[11px] text-white/50 font-medium">Smart Fitness System</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1 scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? 'bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/30 shadow-[0_0_15px_rgba(213,255,62,0.12)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#D5FF3E]' : 'text-white/50 group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#D5FF3E] text-black">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer Profile */}
      <div className="pt-4 mt-auto border-t border-white/10">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D5FF3E] to-emerald-400 flex items-center justify-center text-black font-extrabold text-sm shadow-md">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate group-hover:text-[#D5FF3E] transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/70">
                Lvl {profile.level}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-[#D5FF3E] font-semibold">{profile.trainingStyle}</span>
              <span className="text-[11px] text-white/30">•</span>
              <span className="text-[11px] text-white/50 truncate">{profile.experience}</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between mt-3 px-1 text-xs">
          <div className="flex items-center gap-1.5 text-[#D5FF3E] font-semibold text-[11px]">
            <Flame className="w-3.5 h-3.5 fill-[#D5FF3E]" />
            <span>{profile.streak} Day Streak</span>
          </div>
          <Link
            href="/"
            className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
            title="Return to Landing Page"
          >
            <LogOut className="w-3.5 h-3.5" />
            Landing
          </Link>
        </div>
      </div>
    </aside>
  );
};
