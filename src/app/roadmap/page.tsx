'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_ROADMAP_TOPICS } from '@/data/demo/roadmap';
import { RoadmapTopic } from '@/lib/types';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  Map, 
  CheckCircle2, 
  Lock, 
  Clock, 
  ArrowRight, 
  Code2, 
  ChevronDown, 
  Sparkles,
  GitBranch,
  Layers,
  Flame,
  Check
} from 'lucide-react';

export default function RoadmapPage() {
  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic>(DEMO_ROADMAP_TOPICS[1]);
  const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree');

  // Interactive DAG Nodes arranged in logical dependency order
  const dagNodes = [
    {
      id: 'node-1',
      topic: DEMO_ROADMAP_TOPICS[0], // Complexity & Big-O
      branch: 'center',
    },
    {
      id: 'node-2',
      topic: DEMO_ROADMAP_TOPICS[1], // Arrays & Two Pointers
      branch: 'center',
    },
    {
      id: 'node-3',
      topic: DEMO_ROADMAP_TOPICS[2], // Sliding Window
      branch: 'center',
    },
    {
      id: 'node-4',
      topic: DEMO_ROADMAP_TOPICS[3], // Linked Lists
      branch: 'center',
    },
    {
      id: 'branch-split',
      isFork: true,
      left: DEMO_ROADMAP_TOPICS[4], // Stacks & Monotonic Queues
      right: DEMO_ROADMAP_TOPICS[5], // Binary Search
    },
    {
      id: 'node-7',
      topic: DEMO_ROADMAP_TOPICS[6], // Binary Trees & BST
      branch: 'center',
    },
    {
      id: 'node-8',
      topic: DEMO_ROADMAP_TOPICS[7], // Heaps
      branch: 'center',
    },
    {
      id: 'node-9',
      topic: DEMO_ROADMAP_TOPICS[8], // Graphs & Traversals
      branch: 'center',
    },
    {
      id: 'node-10',
      topic: DEMO_ROADMAP_TOPICS[9], // Dynamic Programming
      branch: 'center',
    },
    {
      id: 'branch-split-advanced',
      isFork: true,
      left: DEMO_ROADMAP_TOPICS[10], // Advanced Graphs & Flow
      right: DEMO_ROADMAP_TOPICS[11], // Advanced DP
    },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 text-xs font-mono mb-2">
              <GitBranch className="w-3 h-3 text-brand-400" />
              <span>Interactive Skill Tree</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              DSA Curriculum Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Structured algorithmic mastery DAG. Track prerequisites, problem completion, and asymptotic intuition.
            </p>
          </div>

          {/* View Toggle & Metrics */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#0C111C] border border-white/[0.08] p-1 rounded-xl text-xs font-mono">
              <button
                onClick={() => setViewMode('tree')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'tree' ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tree DAG
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Module Grid
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-[#0C111C] border border-white/[0.08] px-3.5 py-2 rounded-xl text-xs font-mono">
              <span className="text-zinc-500">Progress:</span>
              <span className="text-emerald-400 font-bold">4 / 12 Modules</span>
            </div>
          </div>
        </div>

        {/* Roadmap Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skill Tree Visualization */}
          <div className="lg:col-span-8">
            {viewMode === 'tree' ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#080C14] border border-white/[0.08] shadow-2xl flex flex-col items-center">
                {/* START Node */}
                <div className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.1] text-[11px] font-mono font-bold text-zinc-400 tracking-wider">
                  START • FOUNDATIONS
                </div>

                {/* Connecting Line */}
                <div className="w-px h-6 bg-emerald-500/40" />

                {/* Sequential DAG Flow */}
                <div className="w-full max-w-xl space-y-4 flex flex-col items-center">
                  {dagNodes.map((item, idx) => {
                    if (item.isFork && item.left && item.right) {
                      const isLeftSelected = selectedTopic.id === item.left.id;
                      const isRightSelected = selectedTopic.id === item.right.id;

                      return (
                        <div key={item.id} className="w-full flex flex-col items-center">
                          {/* Split SVG Branch */}
                          <div className="w-full h-8 flex justify-center items-center">
                            <div className="w-48 h-px bg-white/10 relative">
                              <div className="absolute left-0 -top-2 w-px h-4 bg-white/10" />
                              <div className="absolute right-0 -top-2 w-px h-4 bg-white/10" />
                              <div className="absolute left-1/2 -top-2 w-px h-2 bg-white/10 -translate-x-1/2" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 w-full">
                            {/* Left Branch */}
                            <button
                              onClick={() => setSelectedTopic(item.left)}
                              className={`p-3.5 rounded-xl border text-left transition-all ${
                                isLeftSelected
                                  ? 'bg-[#101726] border-brand-500 ring-1 ring-brand-500/40 shadow-lg'
                                  : item.left.status === 'completed'
                                  ? 'bg-[#090E18] border-emerald-500/30 hover:border-emerald-500/50'
                                  : item.left.status === 'in-progress'
                                  ? 'bg-[#0A0F1D] border-brand-500/30 hover:border-brand-500/50'
                                  : 'bg-white/[0.01] border-white/[0.05] opacity-50'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                                <span>{item.left.category}</span>
                                {item.left.status === 'completed' ? (
                                  <span className="text-emerald-400 font-semibold">✓</span>
                                ) : item.left.status === 'in-progress' ? (
                                  <span className="text-brand-400 font-semibold">•</span>
                                ) : (
                                  <span>🔒</span>
                                )}
                              </div>
                              <div className="font-semibold text-xs text-white truncate font-mono">
                                {item.left.title}
                              </div>
                              <div className="text-[10px] text-zinc-400 font-mono mt-1">
                                {item.left.solvedCount}/{item.left.totalCount} Solved
                              </div>
                            </button>

                            {/* Right Branch */}
                            <button
                              onClick={() => setSelectedTopic(item.right)}
                              className={`p-3.5 rounded-xl border text-left transition-all ${
                                isRightSelected
                                  ? 'bg-[#101726] border-brand-500 ring-1 ring-brand-500/40 shadow-lg'
                                  : item.right.status === 'completed'
                                  ? 'bg-[#090E18] border-emerald-500/30 hover:border-emerald-500/50'
                                  : item.right.status === 'in-progress'
                                  ? 'bg-[#0A0F1D] border-brand-500/30 hover:border-brand-500/50'
                                  : 'bg-white/[0.01] border-white/[0.05] opacity-50'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                                <span>{item.right.category}</span>
                                {item.right.status === 'completed' ? (
                                  <span className="text-emerald-400 font-semibold">✓</span>
                                ) : item.right.status === 'in-progress' ? (
                                  <span className="text-brand-400 font-semibold">•</span>
                                ) : (
                                  <span>🔒</span>
                                )}
                              </div>
                              <div className="font-semibold text-xs text-white truncate font-mono">
                                {item.right.title}
                              </div>
                              <div className="text-[10px] text-zinc-400 font-mono mt-1">
                                {item.right.solvedCount}/{item.right.totalCount} Solved
                              </div>
                            </button>
                          </div>

                          {/* Join back */}
                          <div className="w-full h-8 flex justify-center items-center">
                            <div className="w-48 h-px bg-white/10 relative">
                              <div className="absolute left-0 -bottom-2 w-px h-4 bg-white/10" />
                              <div className="absolute right-0 -bottom-2 w-px h-4 bg-white/10" />
                              <div className="absolute left-1/2 -bottom-2 w-px h-2 bg-white/10 -translate-x-1/2" />
                            </div>
                          </div>
                        </div>
                      );
                    }

                    if (!item.topic) return null;
                    const isSelected = selectedTopic.id === item.topic.id;
                    const isCompleted = item.topic.status === 'completed';
                    const isInProgress = item.topic.status === 'in-progress';

                    return (
                      <div key={item.id} className="w-full flex flex-col items-center">
                        <button
                          onClick={() => setSelectedTopic(item.topic!)}
                          className={`w-full sm:w-96 p-4 rounded-xl border text-left transition-all relative ${
                            isSelected
                              ? 'bg-[#101726] border-brand-500 ring-1 ring-brand-500/40 shadow-xl'
                              : isCompleted
                              ? 'bg-[#090E18] border-emerald-500/30 hover:border-emerald-500/50'
                              : isInProgress
                              ? 'bg-[#0A0F1D] border-brand-500/30 hover:border-brand-500/50'
                              : 'bg-white/[0.01] border-white/[0.05] opacity-50 hover:opacity-75'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                            <span className="uppercase tracking-wider">{item.topic.category}</span>
                            {isCompleted ? (
                              <span className="flex items-center gap-1 text-emerald-400 font-mono">
                                <CheckCircle2 className="w-3 h-3" /> Mastered
                              </span>
                            ) : isInProgress ? (
                              <span className="flex items-center gap-1 text-brand-400 font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                                In Progress
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-zinc-500 font-mono">
                                <Lock className="w-3 h-3" /> Locked
                              </span>
                            )}
                          </div>

                          <div className="text-sm font-semibold text-white font-mono">
                            {item.topic.title}
                          </div>

                          <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                            <span>{item.topic.estimatedHours} hrs study</span>
                            <span>{item.topic.solvedCount} / {item.topic.totalCount} Solved</span>
                          </div>
                        </button>

                        {/* Connector down to next */}
                        {idx < dagNodes.length - 1 && (
                          <div className="w-px h-5 bg-white/10" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Connector to Master */}
                <div className="w-px h-6 bg-white/10 mt-1" />

                {/* MASTER Node */}
                <div className="px-5 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-mono font-bold text-brand-300 tracking-wider">
                  🏆 DSA MASTER REACHED
                </div>
              </div>
            ) : (
              /* Module Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEMO_ROADMAP_TOPICS.map((topic) => {
                  const isSelected = selectedTopic.id === topic.id;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-[#101726] border-brand-500 ring-1 ring-brand-500/40'
                          : 'bg-[#080C14] border-white/[0.08] hover:border-white/[0.14]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1.5">
                        <span className="uppercase">{topic.category}</span>
                        <span>{topic.status}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Selected Module Details & Problems Drawer */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-6 rounded-2xl bg-[#080C14] border border-white/[0.09] space-y-6 shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-400 font-semibold">
                    Curriculum Module
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border capitalize ${
                      selectedTopic.status === 'completed'
                        ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                        : selectedTopic.status === 'in-progress'
                        ? 'text-brand-400 border-brand-500/30 bg-brand-500/10'
                        : 'text-zinc-500 border-zinc-700 bg-zinc-800'
                    }`}
                  >
                    {selectedTopic.status}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white font-mono">
                  {selectedTopic.title}
                </h2>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed font-sans">
                  {selectedTopic.description}
                </p>
              </div>

              {/* Prerequisites */}
              <div className="space-y-1.5 pt-4 border-t border-white/[0.06] text-xs font-mono">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">
                  Prerequisites
                </span>
                {selectedTopic.prerequisites.length === 0 ? (
                  <div className="text-zinc-500 text-[11px] italic">
                    Foundational entry module (No dependencies)
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTopic.prerequisites.map((prereq) => (
                      <span
                        key={prereq}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-300 text-[11px]"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Associated Problems */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider font-mono block">
                  Curated Practice Problems
                </span>
                <div className="space-y-1.5">
                  {selectedTopic.problemSlugs.length > 0 ? (
                    selectedTopic.problemSlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/practice/${slug}`}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] transition-colors group text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-brand-400" />
                          <span className="text-zinc-200 group-hover:text-white capitalize font-mono text-xs">
                            {slug.replace(/-/g, ' ')}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-white" />
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 rounded bg-white/[0.02] text-zinc-500 text-xs text-center font-mono">
                      Module locked until prerequisites pass.
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href={`/problems?category=${encodeURIComponent(selectedTopic.category)}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-colors shadow-glow-brand"
                >
                  <span>Practice {selectedTopic.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
