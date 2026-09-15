'use client';

import React, { useState } from 'react';
import { GLOBAL_LEADERBOARD, WEEKLY_LEADERBOARD, COLLEGE_LEADERBOARD } from '@/data/demo/leaderboard';
import { LeaderboardEntry } from '@/lib/types';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  Trophy, 
  Flame, 
  Search, 
  Medal, 
  Award, 
  GraduationCap, 
  Globe, 
  Calendar, 
  Users,
  ChevronRight
} from 'lucide-react';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'global' | 'weekly' | 'college' | 'friends'>('global');
  const [searchQuery, setSearchQuery] = useState('');

  const currentList =
    activeTab === 'global'
      ? GLOBAL_LEADERBOARD
      : activeTab === 'weekly'
      ? WEEKLY_LEADERBOARD
      : activeTab === 'college'
      ? COLLEGE_LEADERBOARD
      : GLOBAL_LEADERBOARD.slice(0, 5);

  const filtered = currentList.filter(
    (u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.college && u.college.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const topThree = currentList.slice(0, 3);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Grandmaster':
        return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'Master':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'Candidate Master':
        return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'Expert':
        return 'text-brand-400 border-brand-500/30 bg-brand-500/10';
      default:
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono mb-2">
              <Trophy className="w-3 h-3" />
              <span>Global Developer Rankings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Competitive Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Elo ratings calculated from weekly rated arena rounds and verified problem solving speed.
            </p>
          </div>

          {/* Sticky Current User Standing Quick Card */}
          <div className="p-3 rounded-xl bg-[#0D1424] border border-brand-500/30 flex items-center gap-4 text-xs font-mono shadow-md">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center font-bold text-white text-xs">
              HS
            </div>
            <div>
              <div className="text-white font-bold flex items-center gap-1.5">
                <span>Hemanth S (You)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  Expert
                </span>
              </div>
              <div className="text-zinc-400 text-[11px]">
                Rank <strong className="text-zinc-200">#127</strong> • Rating <strong className="text-emerald-400">2185</strong> • 87d streak
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selector & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-[#0C111C] border border-white/[0.08] p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('global')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'global'
                  ? 'bg-brand-500 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Global</span>
            </button>

            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'weekly'
                  ? 'bg-brand-500 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Weekly Sprint</span>
            </button>

            <button
              onClick={() => setActiveTab('college')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'college'
                  ? 'bg-brand-500 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>University</span>
            </button>

            <button
              onClick={() => setActiveTab('friends')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'friends'
                  ? 'bg-brand-500 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Friends</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search developer handle or university..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-[#0C111C] border border-white/[0.08] focus:border-brand-500 rounded-lg text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none w-full sm:w-64"
            />
          </div>
        </div>

        {/* Podium Top 3 Highlights */}
        {topThree.length >= 3 && !searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Rank 2 (Silver) */}
            <div className="p-5 rounded-xl bg-[#090E1A] border border-zinc-700/40 space-y-3 flex flex-col justify-between order-2 md:order-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-400 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                  RANK #2
                </span>
                <Medal className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex items-center gap-3">
                <img src={topThree[1].avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-zinc-600" />
                <div>
                  <h3 className="text-sm font-bold text-white">{topThree[1].username}</h3>
                  <span className="text-xs text-zinc-500 font-mono">@{topThree[1].handle}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between font-mono text-xs text-zinc-400">
                <span>Rating: <strong className="text-white">{topThree[1].rating}</strong></span>
                <span>{topThree[1].solvedCount} Solved</span>
              </div>
            </div>

            {/* Rank 1 (Gold) */}
            <div className="p-5 rounded-xl bg-gradient-to-b from-[#161D2E] to-[#0A0E18] border border-amber-500/40 space-y-3 flex flex-col justify-between order-1 md:order-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                  👑 RANK #1
                </span>
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex items-center gap-3">
                <img src={topThree[0].avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/60" />
                <div>
                  <h3 className="text-base font-bold text-white">{topThree[0].username}</h3>
                  <span className="text-xs text-zinc-400 font-mono">@{topThree[0].handle}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-zinc-300">
                <span>Rating: <strong className="text-amber-400 text-sm">{topThree[0].rating}</strong></span>
                <span>{topThree[0].solvedCount} Solved</span>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="p-5 rounded-xl bg-[#090E1A] border border-amber-700/30 space-y-3 flex flex-col justify-between order-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-600 px-2 py-0.5 rounded bg-amber-900/30 border border-amber-700/40">
                  RANK #3
                </span>
                <Medal className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex items-center gap-3">
                <img src={topThree[2].avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-amber-800" />
                <div>
                  <h3 className="text-sm font-bold text-white">{topThree[2].username}</h3>
                  <span className="text-xs text-zinc-500 font-mono">@{topThree[2].handle}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between font-mono text-xs text-zinc-400">
                <span>Rating: <strong className="text-white">{topThree[2].rating}</strong></span>
                <span>{topThree[2].solvedCount} Solved</span>
              </div>
            </div>
          </div>
        )}

        {/* Full Rankings Table */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0A0E18] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#070B13] text-zinc-400 font-mono select-none">
                  <th className="py-3 px-4 w-16 text-center">Rank</th>
                  <th className="py-3 px-4">Developer</th>
                  <th className="py-3 px-4">Rating Tier</th>
                  <th className="py-3 px-4 text-center">Rating</th>
                  <th className="py-3 px-4 text-center">Solved</th>
                  <th className="py-3 px-4 text-center">Streak</th>
                  <th className="py-3 px-4 text-right">XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((user) => (
                  <tr
                    key={user.handle}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      user.isCurrentUser ? 'bg-brand-500/10 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-zinc-300">
                      #{user.rank}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <div className="font-semibold text-zinc-200">
                            {user.username}
                          </div>
                          <div className="text-[11px] text-zinc-500 font-mono">
                            @{user.handle} {user.college ? `• ${user.college}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded border font-mono text-[11px] ${getTierColor(user.tier)}`}>
                        {user.tier}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-bold text-white text-sm">
                      {user.rating}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono text-zinc-300">
                      {user.solvedCount}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className="inline-flex items-center gap-1 text-amber-400">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        {user.streak}d
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-zinc-400">
                      {user.xp.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="py-3 px-4 bg-[#070B13] border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Showing verified competitors</span>
            <span>CodeArena Competitive Rating Engine</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

