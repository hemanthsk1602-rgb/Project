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
  { label: 'Progress', href: '/progress', icon: TrendingUp },
  { label: 'AI Coach', href: '/ai-coach', icon: Bot, badge: 'AI' },
  { label: 'Recovery', href: '/recovery', icon: HeartPulse },
  { label: 'Achievements', href: '/achievements', icon: Trophy },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { profile } = useFitness();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-[#0A0F1A] border-r border-slate-800/80 p-5 select-none z-30">
      {/* Brand Header */}
      <Link href="/dashboard" className="flex items-center gap-3 px-2 py-1 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
          <Zap className="w-5 h-5 text-black fill-black" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-tight text-white font-sans">
              FIT<span className="text-emerald-400">PLUS</span>
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full">
              AI
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Smart Fitness System</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-black">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer Profile */}
      <div className="pt-4 mt-auto border-t border-slate-800/80">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-black font-bold text-sm shadow-md">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                Lvl {profile.level}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-emerald-400 font-semibold">{profile.trainingStyle}</span>
              <span className="text-[11px] text-slate-500">•</span>
              <span className="text-[11px] text-slate-400 truncate">{profile.experience}</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between mt-3 px-1 text-xs">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{profile.streak} Day Streak</span>
          </div>
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
            title="Return to Landing Page"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit
          </Link>
        </div>
      </div>
    </aside>
  );
};

