'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_PROBLEMS } from '@/data/demo/problems';
import { Difficulty, Problem } from '@/lib/types';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  ArrowUpDown, 
  Filter, 
  Play, 
  Clock, 
  Cpu, 
  X,
  Code2
} from 'lucide-react';

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | Difficulty>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'acceptance'>('difficulty');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const categories = [
    'All',
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Linked Lists',
    'Stacks',
    'Binary Search',
    'Trees',
    'Graphs',
    'Dynamic Programming',
    'Linked Lists & Design',
  ];

  const filteredProblems = DEMO_PROBLEMS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'solved' && p.solved) ||
      (statusFilter === 'unsolved' && !p.solved);

    return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    if (sortBy === 'difficulty') {
      const order = { Easy: 1, Medium: 2, Hard: 3 };
      return sortOrder === 'asc'
        ? order[a.difficulty] - order[b.difficulty]
        : order[b.difficulty] - order[a.difficulty];
    }
    if (sortBy === 'acceptance') {
      const rateA = parseFloat(a.acceptanceRate);
      const rateB = parseFloat(b.acceptanceRate);
      return sortOrder === 'asc' ? rateA - rateB : rateB - rateA;
    }
    return 0;
  });

  const handleSort = (field: 'title' | 'difficulty' | 'acceptance') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Header with Stats Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Problem Explorer
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Curated algorithmic challenges spanning foundational data structures to competitive dynamic programming.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-[#0C111C] border border-white/[0.08] p-2 rounded-xl text-xs font-mono">
            <div className="px-2.5 py-1 rounded bg-white/[0.03]">
              <span className="text-zinc-500">Solved: </span>
              <span className="text-white font-bold">428</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-emerald-400 font-semibold">168 E</span>
              <span className="text-zinc-600">•</span>
              <span className="text-amber-400 font-semibold">212 M</span>
              <span className="text-zinc-600">•</span>
              <span className="text-rose-400 font-semibold">48 H</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search problem title, algorithm, or tag (e.g., Two Sum, DP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-[#0C111C] border border-white/[0.08] focus:border-brand-500 rounded-lg text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1 bg-[#0C111C] border border-white/[0.08] p-1 rounded-lg">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    selectedDifficulty === diff
                      ? diff === 'Easy'
                        ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                        : diff === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400 font-semibold'
                        : diff === 'Hard'
                        ? 'bg-rose-500/20 text-rose-400 font-semibold'
                        : 'bg-white/10 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-[#0C111C] border border-white/[0.08] p-1 rounded-lg">
              {(['all', 'solved', 'unsolved'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded text-xs capitalize transition-colors ${
                    statusFilter === st
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Category Quick Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 font-medium'
                    : 'bg-white/[0.02] text-zinc-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* High-Performance Problems Table */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0A0E18] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#070B13] text-zinc-400 font-mono select-none">
                  <th className="py-3 px-4 w-12 text-center">Status</th>
                  <th
                    onClick={() => handleSort('title')}
                    className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Problem Title</span>
                      <ArrowUpDown className="w-3 h-3 text-zinc-500" />
                    </div>
                  </th>
                  <th className="py-3 px-4 hidden md:table-cell">Category</th>
                  <th
                    onClick={() => handleSort('difficulty')}
                    className="py-3 px-4 cursor-pointer hover:text-white transition-colors w-28"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Difficulty</span>
                      <ArrowUpDown className="w-3 h-3 text-zinc-500" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('acceptance')}
                    className="py-3 px-4 cursor-pointer hover:text-white transition-colors hidden sm:table-cell w-28"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Acceptance</span>
                      <ArrowUpDown className="w-3 h-3 text-zinc-500" />
                    </div>
                  </th>
                  <th className="py-3 px-4 hidden lg:table-cell w-36">Optimal Target</th>
                  <th className="py-3 px-4 text-right w-24">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.04]">
                {filteredProblems.map((problem) => {
                  const diffColor =
                    problem.difficulty === 'Easy'
                      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                      : problem.difficulty === 'Medium'
                      ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                      : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

                  return (
                    <tr
                      key={problem.id}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      {/* Status Icon */}
                      <td className="py-3.5 px-4 text-center">
                        {problem.solved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-zinc-600 mx-auto" />
                        )}
                      </td>

                      {/* Title & Tags */}
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/practice/${problem.slug}`}
                          className="font-medium text-zinc-200 group-hover:text-white transition-colors font-sans text-sm block"
                        >
                          {problem.title}
                        </Link>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {problem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.04] text-zinc-500 font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-zinc-400 hidden md:table-cell font-sans">
                        {problem.category}
                      </td>

                      {/* Difficulty Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded border text-[11px] font-mono font-medium ${diffColor}`}>
                          {problem.difficulty}
                        </span>
                      </td>

                      {/* Acceptance Rate */}
                      <td className="py-3.5 px-4 font-mono text-zinc-400 hidden sm:table-cell">
                        {problem.acceptanceRate}
                      </td>

                      {/* Optimal Complexity Target */}
                      <td className="py-3.5 px-4 font-mono text-zinc-400 hidden lg:table-cell text-[11px]">
                        <span className="text-zinc-300 font-semibold">{problem.timeComplexityOptimal}</span> / {problem.spaceComplexityOptimal}
                      </td>

                      {/* Action Solve Button */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/practice/${problem.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-brand-500 hover:text-white text-zinc-300 font-medium text-xs transition-colors border border-white/[0.08] hover:border-brand-500"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Solve</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}

                {filteredProblems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-zinc-500 text-xs">
                      No problems match your current search and filter criteria.
                      <div className="mt-2">
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedDifficulty('All');
                            setSelectedCategory('All');
                            setStatusFilter('all');
                          }}
                          className="text-brand-400 hover:underline font-mono"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="py-3 px-4 bg-[#070B13] border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Showing {filteredProblems.length} of {DEMO_PROBLEMS.length} problems</span>
            <span>Deterministic Demo Suite</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

