'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutDashboard,
  GraduationCap,
  Dumbbell,
  Wallet,
  CalendarCheck,
  Code2,
  Compass,
  Sparkles,
  Sun,
  Moon,
  X,
  ArrowRight,
} from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { toggleTheme, resolvedTheme } = useTheme();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const actions = [
    { name: 'Dashboard Command Center', href: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { name: 'Study Hub (Exams & Notes)', href: '/study', icon: GraduationCap, category: 'Navigation' },
    { name: 'Fitness Hub & Workout Log', href: '/fitness', icon: Dumbbell, category: 'Navigation' },
    { name: 'Finance & Budget Tracker', href: '/finance', icon: Wallet, category: 'Navigation' },
    { name: 'Productivity Planner & Tasks', href: '/planner', icon: CalendarCheck, category: 'Navigation' },
    { name: 'SkillForge Career & Coding', href: '/skills', icon: Code2, category: 'Navigation' },
    { name: 'Student Campus Navigation', href: '/navigate', icon: Compass, category: 'Navigation' },
    { name: 'Ask NEXUS AI Assistant', href: '/ai', icon: Sparkles, category: 'AI' },
  ];

  const filtered = actions.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-nexus-light-border dark:border-nexus-dark-border">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Type a module name, task, or question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm md:text-base outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">
              No matching modules or actions found for "{query}".
            </div>
          ) : (
            filtered.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.href}
                  onClick={() => handleSelect(action.href)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {action.name}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          )}

          {/* Quick System Action: Theme */}
          <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => {
                toggleTheme();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left text-xs text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                {resolvedTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                <span>Toggle Theme (currently {resolvedTheme})</span>
              </div>
              <span className="text-[10px] uppercase font-semibold text-gray-400">System</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50/80 dark:bg-gray-900/50 border-t border-nexus-light-border dark:border-nexus-dark-border flex items-center justify-between text-[11px] text-gray-400">
          <span>Navigate with arrows or click</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}

