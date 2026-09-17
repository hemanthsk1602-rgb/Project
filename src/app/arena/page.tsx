'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CURRENT_CONTEST, CONTEST_STANDINGS, UPCOMING_CONTESTS } from '@/data/demo/arena';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  Trophy, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Users, 
  Calendar, 
  Circle,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { toast } from 'sonner';

export default function ArenaPage() {
  // Live Contest Countdown Timer Simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 36 });
  const [isVirtualMode, setIsVirtualMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDigits = (num: number) => num.toString().padStart(2, '0');

  const handleToggleVirtual = () => {
    setIsVirtualMode(!isVirtualMode);
    toast.success(
      isVirtualMode ? 'Switched to official live contest mode' : 'Virtual contest session initialized',
      { description: 'Individual 120-minute timer started' }
    );
  };

  // Rank movement deltas for live realism
  const rankDeltas: Record<number, number> = {
    1: 0,
    2: 1,
    3: -1,
    4: 0,
    5: 2, // User moved up 2 ranks!
    6: -1,
    7: 1,
    8: 0,
    9: -2,
    10: 1,
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Live Arena Contest Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl bg-gradient-to-b from-[#11192B] to-[#0B101C] border border-white/[0.1] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Radial */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            {/* Contest Info */}
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  LIVE RATED CONTEST
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {CURRENT_CONTEST.registeredCount} Competitors
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {CURRENT_CONTEST.title}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {CURRENT_CONTEST.description}
              </p>

              {/* User Standing Quick Pill */}
              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500">Current Rank:</span>
                  <span className="text-white font-bold text-sm">#5</span>
                  <span className="inline-flex items-center text-[10px] text-emerald-400 font-bold bg-emerald-500/15 px-1 py-0.5 rounded">
                    <ArrowUp className="w-2.5 h-2.5" /> +2
                  </span>
                </div>
                <span className="text-zinc-700">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500">Score:</span>
                  <span className="text-emerald-400 font-bold">350 pts</span>
                </div>
                <span className="text-zinc-700">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500">Penalty:</span>
                  <span>32m</span>
                </div>
              </div>
            </div>

            {/* Live Digital Countdown Clock */}
            <div className="flex flex-col items-center lg:items-end gap-4 shrink-0">
              <div className="p-4 rounded-xl bg-[#070B13] border border-white/[0.08] text-center shadow-lg">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block mb-1">
                  Time Remaining
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-wider flex items-center justify-center">
                  <span>{formatDigits(timeLeft.hours)}</span>
                  <span className="mx-1 text-zinc-500 animate-pulse">:</span>
                  <span>{formatDigits(timeLeft.minutes)}</span>
                  <span className="mx-1 text-zinc-500 animate-pulse">:</span>
                  <div className="relative inline-block w-[1.8ch] overflow-hidden text-rose-400">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={timeLeft.seconds}
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="inline-block"
                      >
                        {formatDigits(timeLeft.seconds)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleToggleVirtual}
                  className="px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-zinc-300 border border-white/[0.08] transition-colors"
                >
                  {isVirtualMode ? 'Exit Virtual Mode' : 'Start Virtual Contest'}
                </motion.button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/practice/two-sum"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Resume Problem B</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contest Problem Set */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
              <Trophy className="w-4 h-4 text-brand-400" />
              <span>Contest Problem Set</span>
            </h2>
            <span className="text-xs font-mono text-zinc-500">
              4 Problems • 1600 Total Points
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CURRENT_CONTEST.problems.map((problem, idx) => {
              const isSolved = problem.status === 'solved';
              const isAttempted = problem.status === 'attempted';

              return (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={`p-5 rounded-xl border flex flex-col justify-between transition-colors ${
                    isSolved
                      ? 'bg-[#0A121F] border-emerald-500/30 shadow-sm'
                      : isAttempted
                      ? 'bg-[#101422] border-amber-500/30'
                      : 'bg-[#0A0E18] border-white/[0.08] hover:border-white/[0.16]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                      <span className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-bold text-white text-sm">
                        {problem.label}
                      </span>
                      <span className="font-semibold text-brand-400">
                        {problem.points} pts
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">
                      {problem.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                      <Users className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{problem.solvedCount.toLocaleString()} accepted</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    {isSolved ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                      </span>
                    ) : isAttempted ? (
                      <span className="flex items-center gap-1 text-xs text-amber-400 font-mono font-medium">
                        <AlertCircle className="w-3.5 h-3.5" /> Attempted
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-zinc-500 font-mono">
                        <Circle className="w-3.5 h-3.5" /> Unsolved
                      </span>
                    )}

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={`/practice/${problem.problemSlug}`}
                        className="px-3 py-1 rounded bg-white/[0.05] hover:bg-brand-500 hover:text-white text-zinc-300 text-xs font-semibold transition-colors font-mono inline-block"
                      >
                        Code →
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live Contest Standings Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-sans">
              Live Contest Standings
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              Simulated ICPC Penalty Rules • Auto-refreshed
            </span>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#0A0E18] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#070B13] text-zinc-400 font-mono select-none">
                    <th className="py-3 px-4 w-20 text-center">Rank</th>
                    <th className="py-3 px-4">Competitor</th>
                    <th className="py-3 px-4 text-center">Score</th>
                    <th className="py-3 px-4 text-center">Penalty</th>
                    <th className="py-3 px-4 text-center">Prob A</th>
                    <th className="py-3 px-4 text-center">Prob B</th>
                    <th className="py-3 px-4 text-center">Prob C</th>
                    <th className="py-3 px-4 text-center">Prob D</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {CONTEST_STANDINGS.map((standing) => {
                    const delta = rankDeltas[standing.rank] ?? 0;
                    const isCurrentUser = standing.username.includes('(You)');

                    return (
                      <tr
                        key={standing.rank}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          isCurrentUser ? 'bg-brand-500/10 border-l-2 border-brand-500' : ''
                        }`}
                      >
                        <td className="py-3 px-4 text-center font-mono font-bold text-zinc-300">
                          <div className="flex items-center justify-center gap-1.5">
                            <span>#{standing.rank}</span>
                            {delta > 0 ? (
                              <span className="text-[10px] text-emerald-400 flex items-center font-bold" title={`Up ${delta} ranks`}>
                                <ArrowUp className="w-2.5 h-2.5" />
                                {delta}
                              </span>
                            ) : delta < 0 ? (
                              <span className="text-[10px] text-rose-400 flex items-center font-bold" title={`Down ${Math.abs(delta)} ranks`}>
                                <ArrowDown className="w-2.5 h-2.5" />
                                {Math.abs(delta)}
                              </span>
                            ) : (
                              <span className="text-zinc-600">
                                <Minus className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center font-mono text-[10px] text-zinc-300 font-semibold shrink-0">
                              {standing.username.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-zinc-200">
                                {standing.username}
                              </div>
                              <div className="text-[11px] text-zinc-500 font-mono">
                                {standing.country} • Rating {standing.rating}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                          {standing.score}
                        </td>

                        <td className="py-3 px-4 text-center font-mono text-zinc-400">
                          {standing.penaltyMinutes}m
                        </td>

                        {(['A', 'B', 'C', 'D'] as const).map((label) => {
                          const prob = standing.problemStatus[label];
                          return (
                            <td key={label} className="py-3 px-4 text-center font-mono">
                              {prob.solved ? (
                                <span className="text-emerald-400 font-bold">
                                  +{prob.attempts > 1 ? prob.attempts - 1 : ''} <span className="text-[10px] text-zinc-500">{prob.timeMinutes}m</span>
                                </span>
                              ) : prob.attempts > 0 ? (
                                <span className="text-rose-400 font-bold">
                                  -{prob.attempts}
                                </span>
                              ) : (
                                <span className="text-zinc-600">-</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Contests Schedule */}
        <div className="space-y-4 pt-4 border-t border-white/[0.06]">
          <h2 className="text-base font-bold text-white font-sans flex items-center gap-2">
            <Calendar className="w-4 h-4 text-zinc-400" />
            <span>Upcoming Rated Rounds</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UPCOMING_CONTESTS.map((contest, idx) => (
              <motion.div
                key={contest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl bg-[#0A0E18] border border-white/[0.07] flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {contest.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {contest.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs font-mono text-zinc-500">
                    <span>{contest.durationMinutes} mins</span>
                    <span>•</span>
                    <span>{contest.registeredCount} Registered</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toast.success('Registered for upcoming contest!')}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-zinc-200 border border-white/[0.08] transition-colors shrink-0 ml-4"
                >
                  Register
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
