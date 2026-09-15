'use client';

import React, { useState } from 'react';
import { Problem } from '@/lib/types';
import { Lightbulb, Lock, Unlock, ChevronRight, Eye } from 'lucide-react';

interface ProgressiveHintsProps {
  problem: Problem;
}

export function ProgressiveHints({ problem }: ProgressiveHintsProps) {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);

  const hints = [
    {
      level: 1,
      tag: 'Intuition',
      title: 'High-Level Thinking',
      content: problem.hints[0] || 'Think about the brute-force nested loop and what duplicate calculations can be eliminated.',
    },
    {
      level: 2,
      tag: 'Data Structure',
      title: 'State & Memory Tradeoff',
      content: problem.hints[1] || 'Identify a data structure that provides constant O(1) or logarithmic O(log n) lookups.',
    },
    {
      level: 3,
      tag: 'Algorithm Invariant',
      title: 'Optimal Implementation Logic',
      content: problem.hints[2] || 'Store visited elements with their indices and verify the target condition in a single linear pass.',
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono">
            Progressive Hints ({unlockedLevel}/3)
          </h3>
        </div>
        <span className="text-[11px] text-zinc-500 font-mono">
          Reveals one stage at a time
        </span>
      </div>

      <div className="space-y-3">
        {hints.map((hint) => {
          const isUnlocked = unlockedLevel >= hint.level;
          const isNextToUnlock = unlockedLevel === hint.level - 1;

          return (
            <div
              key={hint.level}
              className={`rounded-lg border transition-all duration-200 ${
                isUnlocked
                  ? 'bg-[#0E1524] border-white/[0.09]'
                  : 'bg-white/[0.02] border-white/[0.04] opacity-70'
              }`}
            >
              <div className="p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      Hint {hint.level} • {hint.tag}
                    </span>
                    <span className="text-xs font-medium text-zinc-300">
                      {hint.title}
                    </span>
                  </div>

                  {isUnlocked ? (
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-zinc-500" />
                  )}
                </div>

                {isUnlocked ? (
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans mt-2 pl-1 border-l-2 border-brand-500/40">
                    {hint.content}
                  </p>
                ) : isNextToUnlock ? (
                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/[0.05]">
                    <span className="text-xs text-zinc-500">
                      Stuck on implementation?
                    </span>
                    <button
                      onClick={() => setUnlockedLevel(hint.level)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 border border-brand-500/30 text-xs font-medium transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      Reveal Hint {hint.level}
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-600 italic mt-1">
                    Complete previous hint first to unlock.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

