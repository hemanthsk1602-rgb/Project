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
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[#07090E]/95 backdrop-blur-md border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#D5FF3E] flex items-center justify-center">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="font-outfit text-lg font-black tracking-tight text-white">
            FIT<span className="text-[#D5FF3E]">PLUS</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 text-[#D5FF3E] text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-[#D5FF3E]" />
            <span>{profile.streak}d</span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-xl bg-white/5 text-white/70 hover:text-white border border-white/10"
            aria-label="Open navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-72 bg-[#07090E] border-l border-white/10 p-5 flex flex-col z-10 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-outfit text-base font-bold text-white">FitPlus Menu</span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-1">
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider px-3 mb-2">
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
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#D5FF3E]/15 text-[#D5FF3E] border border-[#D5FF3E]/30'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-4 border-t border-white/10">
              <Link
                href="/"
                onClick={() => setIsDrawerOpen(false)}
                className="block text-center text-xs text-white/50 hover:text-white py-2"
              >
                Back to Landing Page
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#07090E]/95 backdrop-blur-md border-t border-white/10 px-2 py-1.5 flex items-center justify-around safe-bottom">
        {PRIMARY_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-[#D5FF3E]' : 'text-white/50 hover:text-white/80'
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
