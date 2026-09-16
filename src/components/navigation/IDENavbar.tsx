'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Play, 
  Send, 
  AlignLeft, 
  Sparkles, 
  ChevronDown, 
  Maximize2, 
  Minimize2,
  Terminal,
  CheckCircle2,
  RotateCcw,
  Sun,
  Moon
} from 'lucide-react';
import { CodeLanguage, Problem } from '@/lib/types';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';

interface IDENavbarProps {
  problem: Problem;
  language: CodeLanguage;
  onLanguageChange: (lang: CodeLanguage) => void;
  onFormatCode: () => void;
  onRunCode: () => void;
  onSubmitCode: () => void;
  onResetCode: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
  onToggleAiDrawer: () => void;
  isAiDrawerOpen: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function IDENavbar({
  problem,
  language,
  onLanguageChange,
  onFormatCode,
  onRunCode,
  onSubmitCode,
  onResetCode,
  isRunning,
  isSubmitting,
  onToggleAiDrawer,
  isAiDrawerOpen,
  isFullscreen,
  onToggleFullscreen,
}: IDENavbarProps) {
  const { theme, toggleTheme } = useTheme();

  const languages: { key: CodeLanguage; label: string; ext: string }[] = [
    { key: 'cpp', label: 'C++ (Clang 17)', ext: '.cpp' },
    { key: 'python', label: 'Python 3.12', ext: '.py' },
    { key: 'java', label: 'Java (OpenJDK 21)', ext: '.java' },
    { key: 'javascript', label: 'JavaScript (Node 20)', ext: '.js' },
  ];

  const diffColor =
    problem.difficulty === 'Easy'
      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
      : problem.difficulty === 'Medium'
      ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
      : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

  return (
    <header className="h-13 bg-[#070B13] border-b border-white/[0.08] px-3 sm:px-4 flex items-center justify-between select-none z-30 shrink-0">
      {/* Left: Brand + Problem Quick Selector */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/problems"
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors shrink-0"
          title="Return to Problem Library"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Problems</span>
        </Link>

        <div className="h-4 w-px bg-white/10 shrink-0" />

        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 rounded bg-brand-500 flex items-center justify-center text-[10px] font-bold text-white font-mono shrink-0">
            CA
          </div>
          <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate font-sans">
            {problem.title}
          </span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono shrink-0 ${diffColor}`}>
            {problem.difficulty}
          </span>
        </div>
      </div>

      {/* Center: Language & Formatter Toolbar */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Language Selector Dropdown */}
        <div className="relative group">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as CodeLanguage)}
            className="appearance-none bg-[#0D1424] hover:bg-[#121B30] border border-white/[0.09] text-xs font-mono text-zinc-200 pl-3 pr-7 py-1.5 rounded-md cursor-pointer focus:outline-none focus:border-brand-500 transition-colors"
          >
            {languages.map((l) => (
              <option key={l.key} value={l.key} className="bg-[#0D1424] text-zinc-200">
                {l.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Format Code Button (Shift+Alt+F) */}
        <button
          onClick={onFormatCode}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-xs text-zinc-300 transition-colors"
          title="Format Code (Shift + Alt + F)"
        >
          <AlignLeft className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden md:inline">Format</span>
          <kbd className="hidden lg:inline-block text-[9px] px-1 py-0.2 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono">
            ⇧⌥F
          </kbd>
        </button>

        {/* Reset Code Template */}
        <button
          onClick={onResetCode}
          className="p-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-400 hover:text-zinc-200 transition-colors"
          title="Reset starter template"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: AI Intelligence + Run & Submit Actions */}
      <div className="flex items-center gap-2">
        {/* Ask AI Code Intelligence Drawer Button */}
        <button
          onClick={onToggleAiDrawer}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            isAiDrawerOpen
              ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 shadow-glow-brand'
              : 'bg-white/[0.04] hover:bg-white/[0.09] text-zinc-300 border-white/[0.08]'
          }`}
          title="Toggle CodeArena AI Intelligence Drawer"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span className="hidden sm:inline">AI Review</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-zinc-600" />
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-400 hover:text-zinc-200 transition-colors hidden md:block"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>

        {/* Run Code Button */}
        <button
          onClick={onRunCode}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-white/10 transition-colors disabled:opacity-50"
          title="Run visible test cases (Ctrl + Enter)"
        >
          <Play className={`w-3 h-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Running...' : 'Run'}</span>
          <kbd className="hidden lg:inline-block text-[9px] px-1 py-0.2 rounded bg-zinc-900 border border-zinc-700 text-zinc-400 font-mono">
            ^↵
          </kbd>
        </button>

        {/* Submit Solution Button */}
        <button
          onClick={onSubmitCode}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-glow-emerald transition-colors disabled:opacity-50"
          title="Submit solution against all testcases"
        >
          <Send className={`w-3 h-3 ${isSubmitting ? 'animate-pulse' : ''}`} />
          <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
        </button>
      </div>
    </header>
  );
}

