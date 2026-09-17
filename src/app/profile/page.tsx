'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CURRENT_USER_PROFILE } from '@/data/demo/profile';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { CountUp } from '@/components/motion/CountUp';
import { 
  MapPin, 
  Github, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  Award, 
  ExternalLink,
  Share2,
  FileCode
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const profile = CURRENT_USER_PROFILE;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Developer Profile URL copied to clipboard');
  };

  const xpPercent = (profile.xp / profile.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Developer Résumé Identity Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#0B101C] border border-white/[0.08] relative overflow-hidden shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
            {/* Avatar & Bio */}
            <div className="flex items-start gap-5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-600 flex items-center justify-center text-2xl sm:text-3xl font-bold font-mono text-white shadow-glow-brand shrink-0"
              >
                HS
              </motion.div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                    {profile.name}
                  </h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/40 font-mono font-semibold">
                    LEVEL {profile.level}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    @{profile.handle}
                  </span>
                </div>

                <div className="text-sm font-semibold text-zinc-300">
                  {profile.headline}
                </div>

                <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
                  {profile.bio}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {profile.location}
                  </span>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions & Share */}
            <div className="flex items-center gap-2 self-start">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-xs font-medium border border-white/[0.08] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Profile</span>
              </motion.button>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/practice/two-sum"
                  className="px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-colors inline-block"
                >
                  Start Coding
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Level XP Progress Bar */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400 text-[11px]">
              <span>Level 24 Engineer</span>
              <span>
                <CountUp value={profile.xp} /> / {profile.nextLevelXp.toLocaleString()} XP
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-brand-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Quad */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-1"
          >
            <span className="text-xs text-zinc-500 font-mono">Problems Solved</span>
            <div className="text-2xl font-bold font-mono text-white">
              <CountUp value={profile.solvedStats.total} duration={1.1} />
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Easy {profile.solvedStats.easy} • Med {profile.solvedStats.medium} • Hard {profile.solvedStats.hard}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="p-4 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-1"
          >
            <span className="text-xs text-zinc-500 font-mono">Active Streak</span>
            <div className="text-2xl font-bold font-mono text-amber-400 flex items-center gap-1.5">
              <CountUp value={profile.streak} duration={1.1} />
              <span>Days</span>
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Consistent daily practice
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-4 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-1"
          >
            <span className="text-xs text-zinc-500 font-mono">Accuracy</span>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              <CountUp value={profile.accuracy} suffix="%" decimals={1} duration={1.1} />
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Accepted first-run passes
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="p-4 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-1"
          >
            <span className="text-xs text-zinc-500 font-mono">Contest Rating</span>
            <div className="text-2xl font-bold font-mono text-brand-400 flex items-center gap-1.5">
              <CountUp value={profile.contestRating} duration={1.1} />
              <Trophy className="w-4 h-4" />
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Global Rank #{profile.globalRank}
            </div>
          </motion.div>
        </div>

        {/* Language Proficiency & Verified Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Language Proficiency */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-5">
            <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Language Proficiency
            </h2>

            <div className="space-y-4">
              {profile.languages.map((l, idx) => (
                <div key={l.language} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-zinc-200">{l.language}</span>
                    <span className="text-zinc-400">{l.problemsSolved} solved ({l.percentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${l.percentage}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-brand-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Achievement Badges */}
          <div className="lg:col-span-7 p-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                Verified Badges & Honors
              </h2>
              <span className="text-xs font-mono text-zinc-500">
                {profile.badges.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.badges.map((badge) => {
                const tierColor =
                  badge.tier === 'diamond'
                    ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : badge.tier === 'gold'
                    ? 'border-amber-500/40 text-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : badge.tier === 'silver'
                    ? 'border-zinc-500/40 text-zinc-300 bg-zinc-800'
                    : 'border-amber-700/40 text-amber-600 bg-amber-900/20';

                return (
                  <motion.div
                    key={badge.id}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.18 }}
                    className="p-3.5 rounded-lg bg-[#070A13] border border-white/[0.06] flex items-start gap-3 transition-colors hover:border-white/[0.14] cursor-default"
                  >
                    <div className={`p-2 rounded-lg border shrink-0 ${tierColor}`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white font-sans">
                          {badge.title}
                        </span>
                        <span className="text-[9px] uppercase font-mono px-1 rounded bg-white/[0.05] text-zinc-400">
                          {badge.tier}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-tight">
                        {badge.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Submissions Log */}
        <div className="p-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4 text-brand-400" />
              <span>Recent Solution Submissions</span>
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              Live Evaluation History
            </span>
          </div>

          <div className="space-y-2">
            {profile.recentSubmissions.map((sub) => (
              <motion.div
                key={sub.id}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
                className="p-3.5 rounded-lg bg-[#070A13] border border-white/[0.06] flex items-center justify-between text-xs hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-center gap-3">
                  {sub.status === 'Accepted' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <div>
                    <Link
                      href={`/practice/${sub.problemId}`}
                      className="font-semibold text-zinc-200 hover:text-white transition-colors"
                    >
                      {sub.problemTitle}
                    </Link>
                    <div className="text-[11px] text-zinc-500 font-mono">
                      {sub.language.toUpperCase()} • Submitted {sub.submittedAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right font-mono text-[11px]">
                  <div>
                    <div
                      className={`font-semibold ${
                        sub.status === 'Accepted' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {sub.status}
                    </div>
                    <div className="text-zinc-500">
                      {sub.runtimeMs}ms • {sub.memoryMb} MB
                    </div>
                  </div>

                  <Link
                    href={`/practice/two-sum`}
                    className="p-1.5 rounded text-zinc-500 hover:text-zinc-200 transition-colors"
                    title="View Code"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
