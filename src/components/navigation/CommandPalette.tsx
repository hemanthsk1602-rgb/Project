'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Code2, Map, Trophy, Sparkles, User, ArrowRight, X, Bot, BarChart3 } from 'lucide-react';
import { DEMO_PROBLEMS } from '@/data/demo/problems';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input, textarea or contenteditable element
      const target = e.target as HTMLElement;
      const isInputActive =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.classList.contains('monaco-editor');

      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      } else if (e.key === '/' && !isInputActive && !isOpen) {
        e.preventDefault();
        // Open
      }

      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProblems = DEMO_PROBLEMS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const quickLinks = [
    { label: 'Problem Explorer', href: '/problems', icon: Code2, badge: 'Library' },
    { label: 'Interactive DSA Roadmap', href: '/roadmap', icon: Map, badge: 'Skill Tree' },
    { label: 'Competitive Arena', href: '/arena', icon: Trophy, badge: 'Contest' },
    { label: 'AI Code Review Workspace', href: '/ai-review', icon: Sparkles, badge: 'Intelligence' },
    { label: 'AI Socratic Tutor', href: '/ai-tutor', icon: Bot, badge: 'Learning' },
    { label: 'Developer Rankings', href: '/leaderboard', icon: Trophy, badge: 'Rankings' },
    { label: 'Developer Performance Analytics', href: '/analytics', icon: BarChart3, badge: 'Telemetry' },
    { label: 'Developer Profile & Résumé', href: '/profile', icon: User, badge: 'Profile' },
  ];

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 bg-black/80 backdrop-blur-sm px-4 select-none"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#0B0F19] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] bg-[#080C14]">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search problems, topics, algorithms, or commands... (e.g., Two Sum, DP, Arena)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none font-sans"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono">
              ESC
            </kbd>
            <button 
              onClick={onClose} 
              className="text-zinc-500 hover:text-zinc-300 p-1 rounded hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Navigation Links */}
          {query.trim() === '' && (
            <div>
              <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest px-3 py-1.5 font-mono">
                Platform Navigation
              </div>
              <div className="space-y-0.5">
                {quickLinks.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-zinc-400 group-hover:text-brand-400 transition-colors" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-zinc-400 font-mono">
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Problem Search Matches */}
          <div>
            <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest px-3 py-1.5 font-mono flex justify-between">
              <span>Matching Problems</span>
              <span className="text-zinc-500 font-mono">{filteredProblems.length} results</span>
            </div>
            <div className="space-y-1">
              {filteredProblems.slice(0, 7).map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => handleNavigate(`/practice/${problem.slug}`)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs hover:bg-white/[0.04] transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Code2 className="w-4 h-4 text-zinc-500 group-hover:text-brand-400 shrink-0 transition-colors" />
                    <div className="truncate">
                      <div className="text-zinc-200 group-hover:text-white font-medium truncate text-sm">
                        {problem.title}
                      </div>
                      <div className="text-xs text-zinc-500 truncate">
                        {problem.category} • {problem.tags.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border font-mono ${
                        problem.difficulty === 'Easy'
                          ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                          : problem.difficulty === 'Medium'
                          ? 'text-amber-400 border-amber-500/20 bg-amber-500/10'
                          : 'text-rose-400 border-rose-500/20 bg-rose-500/10'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300" />
                  </div>
                </button>
              ))}

              {filteredProblems.length === 0 && (
                <div className="py-10 text-center text-xs text-zinc-500">
                  No problems or algorithms matched <span className="text-zinc-300">"{query}"</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-white/[0.06] bg-[#070A12] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">↵</kbd> to jump</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">/</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">Ctrl+K</kbd> to search</span>
          </div>
          <span>CodeArena Command Engine</span>
        </div>
      </div>
    </div>
  );
}
