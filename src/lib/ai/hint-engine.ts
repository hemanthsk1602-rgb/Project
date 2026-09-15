import { Problem } from '@/lib/types';

export interface ProgressiveHintState {
  revealedCount: number;
  totalHints: number;
  hints: {
    level: 1 | 2 | 3;
    title: string;
    description: string;
  }[];
}

export function getProgressiveHints(problem: Problem): ProgressiveHintState {
  const hints = [
    {
      level: 1 as const,
      title: 'High-Level Intuition & Pattern',
      description: problem.hints[0] || 'Analyze what information is repeatedly scanned during a brute-force approach.',
    },
    {
      level: 2 as const,
      title: 'Data Structure & Invariant Choice',
      description: problem.hints[1] || 'Consider a data structure that enables fast constant-time lookup or state updates.',
    },
    {
      level: 3 as const,
      title: 'Algorithmic Implementation Invariant',
      description: problem.hints[2] || 'Store intermediate elements and check the complement condition in a single linear pass.',
    },
  ];

  return {
    revealedCount: 0,
    totalHints: 3,
    hints,
  };
}

