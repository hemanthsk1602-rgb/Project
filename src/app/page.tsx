'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Map, 
  Trophy, 
  Sparkles, 
  BarChart3, 
  Terminal, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Flame,
  Clock,
  Check,
  ChevronRight,
  Bot
} from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

export default function HomePage() {
  const [activeTabSnippet, setActiveTabSnippet] = useState<'cpp' | 'python'>('cpp');

  const heroCodeCpp = `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    // CodeArena AI Optimized: O(n) Time, O(n) Space
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`;

  const heroCodePython = `from typing import List

class Solution:
    # CodeArena AI Optimized: O(n) Time, O(n) Space
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in seen:
                return [seen[diff], i]
            seen[num] = i
        return []`;

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 selection:bg-brand-500/30 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* SECTION 1: HERO */}
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-white/[0.06] bg-grid-pattern">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-500/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Hero Content */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Next-Generation Algorithmic Platform</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                    MASTER YOUR <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                      PROBLEM SOLVING.
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-zinc-400 max-w-xl font-normal leading-relaxed">
                    Practice with purpose. Improve with intelligence. Code in a high-performance VS Code-inspired environment with progressive AI hints and asymptotic reviews.
                  </p>
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/practice/two-sum"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm shadow-glow-brand transition-all hover:translate-y-[-1px]"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Coding Now</span>
                  </Link>

                  <Link
                    href="/problems"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 font-medium text-sm border border-white/[0.1] transition-all"
                  >
                    <span>Explore Problems</span>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                </div>

                {/* Micro Stats Row */}
                <div className="pt-6 border-t border-white/[0.07] grid grid-cols-3 gap-6 max-w-md text-zinc-400 text-xs font-mono">
                  <div>
                    <div className="text-white text-lg font-bold">1,400+</div>
                    <div className="text-zinc-500">DSA Problems</div>
                  </div>
                  <div>
                    <div className="text-white text-lg font-bold">&lt; 15ms</div>
                    <div className="text-zinc-500">Execution Speed</div>
                  </div>
                  <div>
                    <div className="text-white text-lg font-bold">O(n)</div>
                    <div className="text-zinc-500">AI Optimization</div>
                  </div>
                </div>
              </div>

              {/* Right Hero: Animated Code Editor Preview */}
              <div className="lg:col-span-6">
                <div className="rounded-xl bg-[#070B13] border border-white/[0.12] shadow-2xl overflow-hidden">
                  {/* Fake Editor Title Bar */}
                  <div className="h-10 bg-[#05080E] border-b border-white/[0.08] px-4 flex items-center justify-between select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                      <span className="text-xs text-zinc-400 font-mono ml-2">
                        two-sum.{activeTabSnippet}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setActiveTabSnippet('cpp')}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded ${
                          activeTabSnippet === 'cpp'
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        C++
                      </button>
                      <button
                        onClick={() => setActiveTabSnippet('python')}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded ${
                          activeTabSnippet === 'python'
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        Python
                      </button>
                    </div>
                  </div>

                  {/* Code Snippet Area */}
                  <div className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto bg-[#070B13] leading-relaxed max-h-80">
                    <pre>
                      <code>{activeTabSnippet === 'cpp' ? heroCodeCpp : heroCodePython}</code>
                    </pre>
                  </div>

                  {/* Terminal Execution Feedback Footer */}
                  <div className="border-t border-white/[0.08] bg-[#04070D] p-3.5 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>✓ All Test Cases Passed (4ms, 11.4 MB)</span>
                    </div>
                    <span className="text-zinc-500 text-[11px]">Demo Sandbox</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE CORE PRODUCT LOOP */}
        <section className="py-20 border-b border-white/[0.06] bg-[#070A12]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold">
                The Engineering Method
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Learn. Practice. Code. Compete.
              </h2>
              <p className="text-zinc-400 text-sm">
                A continuous feedback loop designed to build deep algorithmic intuition and competitive problem-solving reflexes.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { step: '01', title: 'Learn', desc: 'Socratic DSA Roadmaps' },
                { step: '02', title: 'Practice', desc: '1400+ Curated Problems' },
                { step: '03', title: 'Code', desc: 'Monaco & JetBrains Mono' },
                { step: '04', title: 'Test', desc: 'Deterministic Test Suite' },
                { step: '05', title: 'Submit', desc: 'Deterministic Judge' },
                { step: '06', title: 'Review', desc: 'Asymptotic Intelligence' },
                { step: '07', title: 'Improve', desc: 'Refactor O(n²) to O(n)' },
                { step: '08', title: 'Compete', desc: 'Weekly Arena Contests' },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-500/40 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="text-xs font-mono text-zinc-500 group-hover:text-brand-400 font-semibold mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: AI CODE INTELLIGENCE */}
        <section className="py-24 border-b border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Socratic Code Intelligence</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  Progressive Hints. <br />
                  Asymptotic Code Reviews.
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  Never get stuck on an empty screen. CodeArena AI reveals hints progressively without spoiling answers, benchmarks Big-O complexity, and pinpoints hidden edge cases.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      title: 'Progressive 3-Tier Hints',
                      desc: 'Reveals intuition first, then data structures, and finally algorithm invariants.',
                    },
                    {
                      title: 'Multi-Dimensional Scorecard',
                      desc: 'Grades correctness, edge cases, time complexity, and readability out of 100.',
                    },
                    {
                      title: 'Complexity Transitions',
                      desc: 'Shows exactly how hash maps or two-pointer logic refactors O(n²) to O(n).',
                    },
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-200">
                          {feat.title}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {feat.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/ai-review"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300"
                  >
                    <span>Try AI Code Review Workspace</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Interactive AI Preview Card */}
              <div className="lg:col-span-7">
                <div className="rounded-xl bg-[#0A0E18] border border-white/[0.1] p-6 space-y-5 shadow-2xl">
                  {/* Top Quality Score Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold font-mono">
                        92
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white font-mono">
                          Optimal Algorithmic Solution
                        </div>
                        <div className="text-xs text-zinc-500 font-sans">
                          Two Sum • Hash Table Pattern
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs">
                      <div className="text-emerald-400 font-semibold">O(n) Time</div>
                      <div className="text-zinc-500">O(n) Space</div>
                    </div>
                  </div>

                  {/* Progressive Hint Drawer Demo */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                      Progressive Hint Sequence
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs space-y-1">
                        <div className="text-brand-400 font-mono font-medium text-[11px]">
                          Hint 1 • High-Level Thinking
                        </div>
                        <p className="text-zinc-300 leading-relaxed">
                          Notice that for every element x, you are searching for (target - x). A nested loop scans this linearly.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#0E1524] border border-brand-500/30 text-xs space-y-1">
                        <div className="text-emerald-400 font-mono font-medium text-[11px]">
                          Hint 2 • Data Structure Choice
                        </div>
                        <p className="text-zinc-300 leading-relaxed">
                          A Hash Map (unordered_map) provides O(1) amortized lookup to check if the complement has already been visited.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE CODING ENVIRONMENT (IDE SHOWCASE) */}
        <section className="py-24 border-b border-white/[0.06] bg-[#070A12]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold">
                VS Code Inspired Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                A Serious Developer Workspace
              </h2>
              <p className="text-zinc-400 text-sm">
                Engineered for muscle memory. Featuring Monaco Editor, Prettier-style formatting (Shift+Alt+F), custom test case runner, and multi-language support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Monaco Engine
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Real Monaco editor with line numbers, minimap, bracket pair colorization, smooth scrolling, and JetBrains Mono typography.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Shift + Alt + F Formatter
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  True client-side code formatting cleans indentation and brace placements instantly with subtle visual feedback toasts.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Deterministic Judge
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Clear, honest test execution telemetry measuring millisecond runtimes and memory allocations without fake cloud claims.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/practice/two-sum"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-glow-brand transition-all"
              >
                <span>Launch Practice IDE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE DSA ROADMAP TEASER */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold">
                  DSA Skill Tree
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Structured Mastery, <br />
                  Not Random Grinding.
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Navigate through linear structures, trees, topological graphs, and complex dynamic programming. Visualize prerequisites and track topic mastery node by node.
                </p>
                <div className="pt-2">
                  <Link
                    href="/roadmap"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs border border-white/[0.1] transition-colors"
                  >
                    <span>Explore Full Interactive Skill Tree</span>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                </div>
              </div>

              {/* Mini Interactive Roadmap Preview Nodes */}
              <div className="lg:col-span-6">
                <div className="p-6 rounded-xl bg-[#070A12] border border-white/[0.08] space-y-3">
                  {[
                    { title: 'Complexity & Big-O', status: 'Completed', problems: '12/12', color: 'emerald' },
                    { title: 'Arrays & Two Pointers', status: 'Completed', problems: '24/26', color: 'emerald' },
                    { title: 'Sliding Window', status: 'Completed', problems: '15/15', color: 'emerald' },
                    { title: 'Trees & BST', status: 'In Progress', problems: '16/30', color: 'indigo' },
                    { title: 'Graphs & Traversals', status: 'Locked', problems: '0/28', color: 'zinc' },
                    { title: 'Dynamic Programming', status: 'Locked', problems: '0/40', color: 'zinc' },
                  ].map((node, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            node.color === 'emerald'
                              ? 'bg-emerald-400'
                              : node.color === 'indigo'
                              ? 'bg-brand-400'
                              : 'bg-zinc-600'
                          }`}
                        />
                        <span className="font-medium text-zinc-200">{node.title}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
                        <span>{node.problems}</span>
                        <span
                          className={`px-2 py-0.5 rounded ${
                            node.color === 'emerald'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : node.color === 'indigo'
                              ? 'bg-brand-500/10 text-brand-400'
                              : 'bg-zinc-800 text-zinc-500'
                          }`}
                        >
                          {node.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: COMPETITIVE ARENA TEASER */}
        <section className="py-20 border-b border-white/[0.06] bg-[#070A12]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  LIVE CONTEST
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  CodeArena Weekly Arena
                </h2>
                <p className="text-zinc-400 text-sm">
                  Test your algorithmic problem-solving under real-time ICPC conditions.
                </p>
              </div>

              <Link
                href="/arena"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-colors shadow-glow-brand shrink-0"
              >
                <Trophy className="w-4 h-4" />
                <span>Enter Arena Round #42</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Problem A', title: 'Subarray Synthesis', points: 100, solved: '2,940', diff: 'Easy' },
                { label: 'Problem B', title: 'Distinct Window Bounds', points: 250, solved: '1,824', diff: 'Medium' },
                { label: 'Problem C', title: 'Denomination Partitioning', points: 500, solved: '840', diff: 'Medium' },
                { label: 'Problem D', title: 'Hydro Influx Optimization', points: 750, solved: '312', diff: 'Hard' },
              ].map((p, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="text-brand-400 font-semibold">{p.label}</span>
                    <span>{p.points} pts</span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-200 truncate">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-2 border-t border-white/[0.04]">
                    <span>{p.diff}</span>
                    <span>{p.solved} solved</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: DEVELOPER ANALYTICS & FINAL CTA */}
        <section className="py-24 relative overflow-hidden bg-grid-pattern">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Think. Code. Improve.
              </h2>
              <p className="text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
                Join ambitious engineers practicing data structures and algorithms with modern tooling, AI intelligence, and competitive spirit.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/practice/two-sum"
                className="flex items-center gap-2 px-7 py-4 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-glow-brand transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Coding Free</span>
              </Link>
              <Link
                href="/roadmap"
                className="px-7 py-4 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 font-medium text-sm border border-white/[0.1] transition-all"
              >
                View DSA Roadmap
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
