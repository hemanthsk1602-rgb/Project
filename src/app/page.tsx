'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Bot,
  Compass,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card3D } from '@/components/3d/Card3D';
import { PerspectiveGrid3D } from '@/components/3d/PerspectiveGrid3D';
import { IsometricCube3D } from '@/components/3d/IsometricCube3D';

const Hero3DScene = dynamic(() => import('@/components/3d/Hero3DScene').then(mod => mod.Hero3DScene), { ssr: false });
const AlgorithmGraph3D = dynamic(() => import('@/components/3d/AlgorithmGraph3D').then(mod => mod.AlgorithmGraph3D), { ssr: false });

export default function HomePage() {
  const [activeCodeLang, setActiveCodeLang] = useState<'cpp' | 'python'>('cpp');

  // Simulated code lines for realistic syntax highlighting with line numbers
  const codeCppLines = [
    { num: 1, text: '#include <vector>', color: 'text-purple-400' },
    { num: 2, text: '#include <unordered_map>', color: 'text-purple-400' },
    { num: 3, text: 'using namespace std;', color: 'text-zinc-500' },
    { num: 4, text: '', color: 'text-transparent' },
    { num: 5, text: 'class Solution {', color: 'text-zinc-300' },
    { num: 6, text: 'public:', color: 'text-amber-400' },
    { num: 7, text: '    vector<int> twoSum(vector<int>& nums, int target) {', color: 'text-zinc-200' },
    { num: 8, text: '        unordered_map<int, int> seen;', color: 'text-cyan-300' },
    { num: 9, text: '        for (int i = 0; i < nums.size(); ++i) {', color: 'text-purple-300' },
    { num: 10, text: '            int complement = target - nums[i];', color: 'text-zinc-300' },
    { num: 11, text: '            if (seen.count(complement)) return {seen[complement], i};', color: 'text-emerald-400' },
    { num: 12, text: '            seen[nums[i]] = i;', color: 'text-zinc-300' },
    { num: 13, text: '        }', color: 'text-zinc-400' },
    { num: 14, text: '        return {};', color: 'text-purple-300' },
    { num: 15, text: '    }', color: 'text-zinc-300' },
    { num: 16, text: '};', color: 'text-zinc-400' },
  ];

  const codePythonLines = [
    { num: 1, text: 'from typing import List', color: 'text-purple-400' },
    { num: 2, text: '', color: 'text-transparent' },
    { num: 3, text: 'class Solution:', color: 'text-zinc-300' },
    { num: 4, text: '    def twoSum(self, nums: List[int], target: int) -> List[int]:', color: 'text-zinc-200' },
    { num: 5, text: '        seen = {}', color: 'text-cyan-300' },
    { num: 6, text: '        for i, num in enumerate(nums):', color: 'text-purple-300' },
    { num: 7, text: '            diff = target - num', color: 'text-zinc-300' },
    { num: 8, text: '            if diff in seen:', color: 'text-emerald-400' },
    { num: 9, text: '                return [seen[diff], i]', color: 'text-emerald-300' },
    { num: 10, text: '            seen[num] = i', color: 'text-zinc-300' },
    { num: 11, text: '        return []', color: 'text-purple-300' },
  ];

  const currentLines = activeCodeLang === 'cpp' ? codeCppLines : codePythonLines;

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 selection:bg-brand-500/25 selection:text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 1: CINEMATIC HERO (Expanded Whitespace & Breathing Room)
           ========================================================================= */}
        <section className="relative pt-16 pb-28 lg:pt-24 lg:pb-36 border-b border-white/[0.06] overflow-hidden">
          {/* Hardware-Accelerated 3D WebGL Scene */}
          <Hero3DScene />

          {/* Animated Background Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern animate-grid-drift opacity-25 pointer-events-none" />

          {/* Subtle Ambient Radial Glow — Moving gently */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-brand-500/[0.08] blur-[140px] pointer-events-none rounded-full animate-glow-drift" />

          {/* Floating subtle data point chips */}
          <div className="hidden lg:block absolute top-20 right-16 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-[10px] font-mono text-brand-300 animate-float-slow select-none">
            {'// Optimal O(n) Asymptotics'}
          </div>
          <div className="hidden lg:block absolute bottom-24 left-10 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-zinc-500 animate-float-slow select-none [animation-delay:2s]">
            {'const lookup = new Map();'}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
              {/* Left Column: Headline & Action with Stagger Reveal */}
              <motion.div 
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-8"
              >
                {/* 3D Interactive Product Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-zinc-300 text-xs font-mono shadow-sm">
                  <IsometricCube3D size={16} color="brand" />
                  <span>Developer Practice & 3D Intelligence</span>
                </div>

                {/* Main Headline with Smooth Line Reveal */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
                    MASTER YOUR <br />
                    PROBLEM <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-700 dark:from-zinc-100 dark:via-brand-200 dark:to-indigo-300">
                      SOLVING.
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-zinc-400 max-w-lg font-normal leading-relaxed pt-1">
                    Practice with purpose. Improve with intelligence. Code in a distraction-free VS Code-inspired environment with progressive AI hints, Big-O reviews, and competitive rounds.
                  </p>
                </div>

                {/* Primary vs Secondary CTAs with Micro-Interactions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/practice/two-sum"
                      className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs tracking-wide shadow-glow-brand transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>START CODING</span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/problems"
                      className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-transparent hover:bg-white/[0.04] text-zinc-300 font-medium text-xs tracking-wide border border-white/[0.12] transition-colors"
                    >
                      <span>EXPLORE PROBLEMS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </Link>
                  </motion.div>
                </div>

                {/* Trust & Metric Pill */}
                <div className="pt-6 border-t border-white/[0.06] flex items-center gap-6 text-xs text-zinc-500 font-mono">
                  <div>
                    <span className="text-zinc-200 font-semibold font-mono">1,400+</span> Problems
                  </div>
                  <span className="text-zinc-700">•</span>
                  <div>
                    <span className="text-zinc-200 font-semibold font-mono">Shift + Alt + F</span> Formatter
                  </div>
                  <span className="text-zinc-700">•</span>
                  <div>
                    <span className="text-zinc-200 font-semibold font-mono">O(n)</span> Asymptotics
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Refined Hero Code Editor Window with 3D Spatial Physics */}
              <motion.div 
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <Card3D depth={8} glare={true}>
                  <div className="rounded-xl bg-[#080C14] border border-white/[0.1] shadow-2xl overflow-hidden hover:border-white/[0.16] transition-colors">
                    {/* Editor Window Bar */}
                    <div className="h-10 bg-[#060910] border-b border-white/[0.07] px-4 flex items-center justify-between select-none">
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                        </div>
                        <span className="text-xs text-zinc-400 font-mono ml-2 font-medium">
                          two-sum.{activeCodeLang === 'cpp' ? 'cpp' : 'py'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActiveCodeLang('cpp')}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                            activeCodeLang === 'cpp'
                              ? 'bg-brand-500 text-white font-medium shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-300 dark:hover:text-zinc-200'
                          }`}
                        >
                          C++20
                        </button>
                        <button
                          onClick={() => setActiveCodeLang('python')}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                            activeCodeLang === 'python'
                              ? 'bg-brand-500 text-white font-medium shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-300 dark:hover:text-zinc-200'
                          }`}
                        >
                          Python 3.12
                        </button>
                      </div>
                    </div>

                    {/* Code Editor Body with Progressive Reveal */}
                    <div className="p-4 font-mono text-[12px] bg-[#080C14] leading-relaxed overflow-x-auto min-h-[320px]">
                      <div className="space-y-0.5">
                        {currentLines.map((line, idx) => (
                          <motion.div 
                            key={`${activeCodeLang}-${line.num}`}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.3) }}
                            className="flex items-baseline gap-4 hover:bg-white/[0.03] px-1 rounded transition-colors group"
                          >
                            <span className="w-6 text-right text-zinc-600 text-[11px] select-none shrink-0 font-mono group-hover:text-zinc-400">
                              {line.num}
                            </span>
                            <span className={`whitespace-pre ${line.color}`}>
                              {line.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Subtle Blinking Cursor */}
                      <div className="flex items-center gap-4 px-1 mt-1">
                        <span className="w-6 text-right text-zinc-600 text-[11px] font-mono select-none">
                          {currentLines.length + 1}
                        </span>
                        <span className="inline-block w-1.5 h-4 bg-brand-400 animate-pulse" />
                      </div>
                    </div>

                    {/* Micro Status Bar */}
                    <div className="h-7 bg-[#05080E] border-t border-white/[0.06] px-3.5 flex items-center justify-between text-[11px] text-zinc-500 font-mono select-none">
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          All 4 Test Cases Passed
                        </span>
                        <span className="text-zinc-600">|</span>
                        <span>Runtime: 4ms</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-600">
                        <span>Shift + Alt + F</span>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: PROBLEM SOLVING WORKFLOW (Horizontal Pipeline Progression)
           ========================================================================= */}
        <section className="py-24 border-b border-white/[0.06] bg-[#070A12]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold">
                The Engineering Method
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Horizontal Problem Solving Loop
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                A disciplined progression from concept intuition to algorithmic verification.
              </p>
            </div>

            {/* Horizontal Step Pipeline */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { step: '01', title: 'LEARN', desc: 'Socratic DSA Roadmaps', tag: 'Intuition' },
                { step: '02', title: 'PRACTICE', desc: '1,400+ Curated Problems', tag: 'Curriculum' },
                { step: '03', title: 'CODE', desc: 'Monaco & JetBrains Mono', tag: 'IDE' },
                { step: '04', title: 'TEST', desc: 'Assertion Telemetry', tag: 'Telemetry' },
                { step: '05', title: 'SUBMIT', desc: 'Deterministic Sandbox', tag: 'Judge' },
                { step: '06', title: 'REVIEW', desc: 'Asymptotic Intelligence', tag: 'Big-O' },
                { step: '07', title: 'IMPROVE', desc: 'Refactor O(n²) to O(n)', tag: 'Mastery' },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-500/30 hover:bg-white/[0.03] transition-all flex flex-col justify-between min-h-[130px] group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                      <span className="font-semibold text-zinc-400 group-hover:text-brand-400 transition-colors">
                        {item.step}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.03] text-zinc-500">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-white tracking-wide font-mono">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug mt-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: PROFESSIONAL CODING ENVIRONMENT (IDE Composition)
           ========================================================================= */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold">
                  Purpose-Built IDE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  A High-Density Developer Coding Workspace
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Engineered with Monaco, standard keyboard shortcuts (`Shift+Alt+F`), and zero clutter.
                </p>
              </div>

              <Link
                href="/practice/two-sum"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-colors self-start shrink-0"
              >
                <span>Launch Practice Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Realistic IDE Workbench Composition Preview */}
            <div className="rounded-2xl bg-[#080C14] border border-white/[0.1] shadow-2xl overflow-hidden">
              {/* Top IDE Toolbar */}
              <div className="h-10 bg-[#060910] border-b border-white/[0.07] px-4 flex items-center justify-between text-xs select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-zinc-300 font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-brand-400" />
                    <span>Two Sum</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                      Easy
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04]">C++ (Clang 17)</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04]">Shift + Alt + F (Format)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    Submit (Ctrl+↵)
                  </span>
                </div>
              </div>

              {/* Multi-pane IDE layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[340px] text-xs font-mono">
                {/* File / Problem Statement Left Bar */}
                <div className="md:col-span-4 p-4 border-r border-white/[0.07] bg-[#070A12] space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-sans font-semibold">
                      Problem Brief
                    </span>
                    <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                      Given an array of integers <code className="text-zinc-200">nums</code> and an integer <code className="text-zinc-200">target</code>, return indices of the two numbers such that they add up to target.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-white/[0.05]">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-sans font-semibold">
                      Optimal Asymptotics
                    </span>
                    <div className="flex items-center gap-4 text-zinc-300">
                      <span>Time: <strong className="text-emerald-400">O(n)</strong></span>
                      <span>Space: <strong className="text-emerald-400">O(n)</strong></span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-white/[0.05]">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-sans font-semibold">
                      Progressive Hints Available
                    </span>
                    <div className="text-[11px] text-zinc-400 font-sans">
                      Hint 1: Visited element tracking • Hint 2: Hash map lookup
                    </div>
                  </div>
                </div>

                {/* Code Canvas & Bottom Test Cases */}
                <div className="md:col-span-8 flex flex-col bg-[#080C14]">
                  <div className="flex-1 p-4 text-[12px] text-zinc-300 leading-relaxed font-mono">
                    <div className="text-zinc-500">{'// Optimal Single-Pass Hash Map Implementation'}</div>
                    <div className="text-purple-300 mt-1">vector&lt;int&gt; twoSum(vector&lt;int&gt;&amp; nums, int target) &#123;</div>
                    <div className="text-zinc-300 pl-4">unordered_map&lt;int, int&gt; lookup;</div>
                    <div className="text-purple-300 pl-4">for (int i = 0; i &lt; nums.size(); ++i) &#123;</div>
                    <div className="text-zinc-300 pl-8">int comp = target - nums[i];</div>
                    <div className="text-emerald-400 pl-8">if (lookup.count(comp)) return &#123;lookup[comp], i&#125;;</div>
                    <div className="text-zinc-300 pl-8">lookup[nums[i]] = i;</div>
                    <div className="text-purple-300 pl-4">&#125;</div>
                    <div className="text-purple-300 pl-4">return &#123;&#125;;</div>
                    <div className="text-purple-300">&#125;</div>
                  </div>

                  {/* Bottom Test Panel */}
                  <div className="border-t border-white/[0.07] bg-[#05080E] p-3 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verdict: Accepted (4/4 Cases)
                      </span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-400">Runtime: 4ms • Memory: 11.4 MB</span>
                    </div>
                    <span className="text-zinc-600 font-mono">Deterministic Sandbox</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: AI INTELLIGENCE WORKSPACE (Direct Asymptotic Comparison)
           ========================================================================= */}
        <section className="py-24 border-b border-white/[0.06] bg-[#070A12]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold">
                Intelligence Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Asymptotic Code Review & Socratic Tutoring
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Evaluate Big-O bottlenecks, detect missing edge case guards, and receive progressive hints without spoiling complete code.
              </p>
            </div>

            {/* AI Review Structure (Not generic cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left: Code Review Checklist & Scorecard */}
              <div className="lg:col-span-5 p-6 rounded-xl bg-[#080C14] border border-white/[0.08] space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                      Code Review Scorecard
                    </span>
                    <span className="text-2xl font-bold font-mono text-white">
                      88 <span className="text-xs font-normal text-zinc-500">/ 100</span>
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-zinc-300">Correctness & Invariants</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5" /> 95%
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-zinc-300">Boundary & Edge Cases</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5" /> 90%
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-amber-500/20">
                      <span className="text-zinc-300">Time Complexity Bottleneck</span>
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" /> O(n²) → O(n)
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-zinc-300">Code Readability & Style</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5" /> 92%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href="/ai-review"
                    className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                  >
                    <span>Open AI Review Workstation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/ai-tutor"
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Try Socratic Tutor →
                  </Link>
                </div>
              </div>

              {/* Right: Asymptotic Transition & Rationale Box */}
              <div className="lg:col-span-7 p-6 rounded-xl bg-[#080C14] border border-white/[0.08] space-y-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                    Complexity Transition Analysis
                  </div>

                  {/* Transition Compare */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-4">
                    <div className="p-3.5 rounded-lg bg-[#05080E] border border-white/[0.06]">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                        Detected Asymptotics
                      </span>
                      <div className="text-amber-400 font-bold text-sm mt-1">
                        O(n²) Quadratic Time
                      </div>
                      <div className="text-zinc-500 text-[11px] mt-0.5">
                        Nested loop element search
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#05080E] border border-emerald-500/30">
                      <span className="text-[10px] text-emerald-400 uppercase tracking-wider block">
                        Suggested Target
                      </span>
                      <div className="text-emerald-400 font-bold text-sm mt-1">
                        O(n) Linear Time
                      </div>
                      <div className="text-zinc-400 text-[11px] mt-0.5">
                        Associative Hash Table caching
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300 leading-relaxed font-sans">
                    <strong>Algorithmic Rationale:</strong> A hash map caches visited elements in a single forward pass. Lookups for the target complement take O(1) amortized time instead of repeating linear scans over previously traversed subarrays.
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">CodeArena AI Model v2.4</span>
                  <Link
                    href="/practice/two-sum"
                    className="px-3.5 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 font-sans text-xs transition-colors"
                  >
                    Apply Optimization in IDE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: DSA ROADMAP (Interactive Skill Tree Preview)
           ========================================================================= */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold">
                  Structured Skill Tree
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Master Data Structures Systematically
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Never grind randomly. Follow verified mathematical prerequisites from Big-O fundamentals to multidimensional dynamic programming.
                </p>
              </div>

              <Link
                href="/roadmap"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-200 text-xs font-medium transition-colors self-start shrink-0"
              >
                <span>Open Full Interactive Tree</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tree Branch Visual Preview */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#080C14] border border-white/[0.08] overflow-x-auto">
              <div className="flex items-center justify-between gap-4 min-w-[700px] text-xs font-mono select-none">
                {/* Node 1 */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1 shrink-0 w-44">
                  <div className="text-[10px] text-emerald-400 font-semibold uppercase">Phase 1 • Core</div>
                  <div className="font-bold text-white text-xs">Complexity & Big-O</div>
                  <div className="text-[10px] text-zinc-400">12/12 Solved ✓</div>
                </div>

                <div className="h-px flex-1 bg-emerald-500/40" />

                {/* Node 2 */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1 shrink-0 w-44">
                  <div className="text-[10px] text-emerald-400 font-semibold uppercase">Phase 2 • Linear</div>
                  <div className="font-bold text-white text-xs">Two Pointers & Window</div>
                  <div className="text-[10px] text-zinc-400">24/26 Solved ✓</div>
                </div>

                <div className="h-px flex-1 bg-brand-500/40" />

                {/* Node 3 */}
                <div className="p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/40 text-center space-y-1 shrink-0 w-44">
                  <div className="text-[10px] text-brand-400 font-semibold uppercase">Phase 3 • Trees</div>
                  <div className="font-bold text-white text-xs">Binary Trees & BST</div>
                  <div className="text-[10px] text-zinc-400">16/30 In Progress</div>
                </div>

                <div className="h-px flex-1 bg-white/10" />

                {/* Node 4 */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1 shrink-0 w-44 opacity-60">
                  <div className="text-[10px] text-zinc-500 font-semibold uppercase">Phase 4 • DP</div>
                  <div className="font-bold text-zinc-300 text-xs">Dynamic Programming</div>
                  <div className="text-[10px] text-zinc-500">Locked Prerequisite</div>
                </div>
              </div>
            </div>

            {/* Interactive 3D Spatial Data Structure Graph */}
            <div className="pt-4">
              <AlgorithmGraph3D />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: COMPETITIVE ARENA (Live Contest Composition)
           ========================================================================= */}
        <section className="py-24 border-b border-white/[0.06] bg-[#070A12]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>WEEKLY ARENA #42</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Real-Time Competitive Rounds
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Practice under real time pressure with penalty rules, ratings, and live participant standings.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start">
                <div className="px-3.5 py-1.5 rounded-lg bg-[#0B0F19] border border-white/[0.08] text-xs font-mono text-zinc-300">
                  Time Left: <strong className="text-rose-400">02 : 14 : 36</strong>
                </div>
                <Link
                  href="/arena"
                  className="px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-colors"
                >
                  Enter Contest
                </Link>
              </div>
            </div>

            {/* Problem Set Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'A', title: 'Subarray Complement', pts: 100, solved: '2,940', diff: 'Easy' },
                { label: 'B', title: 'Minimal Window Bounds', pts: 250, solved: '1,824', diff: 'Medium' },
                { label: 'C', title: 'Denomination Partitioning', pts: 500, solved: '840', diff: 'Medium' },
                { label: 'D', title: 'Multi-Elevation Hydro', pts: 750, solved: '312', diff: 'Hard' },
              ].map((prob) => (
                <div
                  key={prob.label}
                  className="p-4 rounded-xl bg-[#090D16] border border-white/[0.08] hover:border-white/[0.14] transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="w-6 h-6 rounded bg-white/[0.05] flex items-center justify-center font-bold text-white">
                      {prob.label}
                    </span>
                    <span className="text-brand-400 font-semibold">{prob.pts} pts</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200 truncate">
                      {prob.title}
                    </h4>
                    <div className="text-[11px] text-zinc-500 font-mono mt-1">
                      {prob.diff} • {prob.solved} solves
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: DEVELOPER ANALYTICS (Clean Data Composition)
           ========================================================================= */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold">
                  Performance Telemetry
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Objective Growth Telemetry
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Track accuracy, solve times, topic mastery distributions, and receive tailored 7-day practice sprints.
                </p>
              </div>

              <Link
                href="/analytics"
                className="flex items-center gap-2 text-xs font-semibold text-brand-400 hover:text-brand-300"
              >
                <span>View Full Performance Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3D Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <Card3D depth={8} glare={true}>
                <div className="p-5 rounded-xl bg-[#080C14] border border-white/[0.08] space-y-1 h-full">
                  <span className="text-zinc-500 text-[11px]">Total Solved</span>
                  <div className="text-2xl font-bold text-white">428</div>
                  <div className="text-zinc-500 text-[10px]">Top 6% on platform</div>
                </div>
              </Card3D>

              <Card3D depth={8} glare={true}>
                <div className="p-5 rounded-xl bg-[#080C14] border border-white/[0.08] space-y-1 h-full">
                  <span className="text-zinc-500 text-[11px]">First-Pass Accuracy</span>
                  <div className="text-2xl font-bold text-emerald-400">73.4%</div>
                  <div className="text-zinc-500 text-[10px]">Deterministic test pass</div>
                </div>
              </Card3D>

              <Card3D depth={8} glare={true}>
                <div className="p-5 rounded-xl bg-[#080C14] border border-white/[0.08] space-y-1 h-full">
                  <span className="text-zinc-500 text-[11px]">Average Solve Time</span>
                  <div className="text-2xl font-bold text-brand-400">18.5m</div>
                  <div className="text-zinc-500 text-[10px]">Medium problem pace</div>
                </div>
              </Card3D>

              <Card3D depth={8} glare={true}>
                <div className="p-5 rounded-xl bg-[#080C14] border border-white/[0.08] space-y-1 h-full">
                  <span className="text-zinc-500 text-[11px]">Active Streak</span>
                  <div className="text-2xl font-bold text-amber-400">87 Days</div>
                  <div className="text-zinc-500 text-[10px]">Consecutive practice</div>
                </div>
              </Card3D>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FINAL MINIMAL CTA (3D Perspective Horizon & Floating Geometry)
           ========================================================================= */}
        <section className="py-28 text-center relative overflow-hidden">
          {/* 3D Infinite Perspective Grid */}
          <PerspectiveGrid3D />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            {/* Floating 3D Geometric Crystal */}
            <div className="flex justify-center mb-1">
              <IsometricCube3D size={44} color="brand" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Think. Code. Improve.
            </h2>
            <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
              Practice with purpose. Compete with confidence. Step into a distraction-free coding environment designed for serious developers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/practice/two-sum"
                className="flex items-center gap-2 px-7 py-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs tracking-wide shadow-glow-brand transition-all duration-150 hover:-translate-y-0.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>START CODING NOW</span>
              </Link>
              <Link
                href="/roadmap"
                className="px-6 py-3.5 rounded-lg bg-transparent hover:bg-white/[0.04] text-zinc-300 text-xs font-medium border border-white/[0.12] transition-colors"
              >
                VIEW DSA ROADMAP
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
