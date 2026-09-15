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
  ChevronRight, 
  X, 
  Sparkles,
  Layers,
  Flame
} from 'lucide-react';

export default function RoadmapPage() {
  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic | null>(DEMO_ROADMAP_TOPICS[1]);

  const stages = [
    { title: 'Foundations & Linear Structures', nodes: DEMO_ROADMAP_TOPICS.slice(0, 4) },
    { title: 'Searching & Monotonic Queues', nodes: DEMO_ROADMAP_TOPICS.slice(4, 6) },
    { title: 'Hierarchical & Graph Structures', nodes: DEMO_ROADMAP_TOPICS.slice(6, 9) },
    { title: 'Dynamic Programming & Optimization', nodes: DEMO_ROADMAP_TOPICS.slice(9, 12) },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono mb-2">
              <Map className="w-3 h-3" />
              <span>Interactive Skill Tree</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              DSA Engineering Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Follow a mathematically sound curriculum from Big-O foundations to multidimensional dynamic programming.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0C111C] border border-white/[0.08] px-4 py-2 rounded-xl text-xs font-mono">
            <div>
              <span className="text-zinc-500">Overall Mastery: </span>
              <span className="text-emerald-400 font-bold">58%</span>
            </div>
            <span className="text-zinc-600">•</span>
            <div>
              <span className="text-zinc-500">Completed: </span>
              <span className="text-white font-semibold">4 / 12 Modules</span>
            </div>
          </div>
        </div>

        {/* Skill Tree & Drawer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Center: Interactive Skill Tree DAG */}
          <div className="lg:col-span-8 space-y-8">
            {stages.map((stage, stageIdx) => (
              <div key={stage.title} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Phase 0{stageIdx + 1}
                  </span>
                  <div className="h-px flex-1 bg-white/[0.08]" />
                  <span className="text-xs text-zinc-500 font-mono">
                    {stage.title}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stage.nodes.map((topic) => {
                    const isSelected = selectedTopic?.id === topic.id;
                    const isCompleted = topic.status === 'completed';
                    const isInProgress = topic.status === 'in-progress';
                    const isLocked = topic.status === 'locked';

                    return (
                      <div
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic)}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-150 border relative select-none ${
                          isSelected
                            ? 'bg-[#101726] border-brand-500 ring-1 ring-brand-500/40 shadow-lg'
                            : isCompleted
                            ? 'bg-[#0A0F19] border-emerald-500/20 hover:border-emerald-500/40 hover:bg-[#0D1422]'
                            : isInProgress
                            ? 'bg-[#0B101C] border-brand-500/30 hover:border-brand-500/50 hover:bg-[#0E1524]'
                            : 'bg-white/[0.01] border-white/[0.05] opacity-60 hover:opacity-80'
                        }`}
                      >
                        {/* Node Status Badge */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                            {topic.category}
                          </span>
                          {isCompleted ? (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3" /> Mastered
                            </span>
                          ) : isInProgress ? (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                              In Progress
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded">
                              <Lock className="w-3 h-3" /> Locked
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-sm font-semibold text-white mb-1.5 font-sans">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                          {topic.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-3 pt-2.5 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-zinc-500" />
                            <span>{topic.estimatedHours} hrs</span>
                          </div>
                          <span>
                            {topic.solvedCount} / {topic.totalCount} Solved
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Topic Details & Curated Problem Drawer */}
          <div className="lg:col-span-4 sticky top-24">
            {selectedTopic ? (
              <div className="p-5 rounded-xl bg-[#0A0E18] border border-white/[0.08] space-y-5 shadow-2xl">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-brand-400">
                      Module Details
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
                  <h2 className="text-lg font-bold text-white font-sans">
                    {selectedTopic.title}
                  </h2>
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                    {selectedTopic.description}
                  </p>
                </div>

                {/* Prerequisites */}
                <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-xs">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                    Prerequisites
                  </span>
                  {selectedTopic.prerequisites.length === 0 ? (
                    <div className="text-zinc-500 text-[11px] italic">
                      None. Foundational entry module.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTopic.prerequisites.map((prereq) => (
                        <span
                          key={prereq}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-zinc-300 font-mono text-[11px]"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Curated Problem Collection */}
                <div className="space-y-2.5 pt-3 border-t border-white/[0.06]">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
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
                            <span className="text-zinc-200 group-hover:text-white capitalize font-medium">
                              {slug.replace(/-/g, ' ')}
                            </span>
                          </div>
                          <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-white" />
                        </Link>
                      ))
                    ) : (
                      <div className="p-3 rounded bg-white/[0.02] text-zinc-500 text-xs text-center">
                        Locked until previous prerequisites are mastered.
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <Link
                    href={`/problems?category=${encodeURIComponent(selectedTopic.category)}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-colors shadow-glow-brand"
                  >
                    <span>Browse All {selectedTopic.title} Problems</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] text-center text-xs text-zinc-500">
                Select any roadmap node on the skill tree to view prerequisites and practice problems.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

