'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  Bot,
  User,
  Menu,
  X,
  TrendingUp,
  HeartPulse,
  Trophy,
  Settings,
  Flame,
  Zap,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { profile } = useFitness();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const PRIMARY_NAV = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Workout', href: '/workout', icon: Dumbbell },
    { label: 'Nutrition', href: '/nutrition', icon: Utensils },
    { label: 'AI Coach', href: '/ai-coach', icon: Bot },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  const SECONDARY_NAV = [
    { label: 'Progress Analytics', href: '/progress', icon: TrendingUp },
    { label: 'Recovery Tracking', href: '/recovery', icon: HeartPulse },
    { label: 'Achievements & XP', href: '/achievements', icon: Trophy },
    { label: 'App Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-slate-800/80">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            FIT<span className="text-emerald-400">PLUS</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>{profile.streak}d</span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-72 bg-[#0A0F1A] border-l border-slate-800/90 p-5 flex flex-col z-10 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-base font-bold text-white">Navigation</span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-1">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
                All Sections
              </p>
              {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-4 border-t border-slate-800">
              <Link
                href="/"
                onClick={() => setIsDrawerOpen(false)}
                className="block text-center text-xs text-slate-400 hover:text-white py-2"
              >
                Back to Landing Page
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0F1A]/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around safe-bottom">
        {PRIMARY_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

