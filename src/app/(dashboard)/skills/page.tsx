'use client';

import React from 'react';
import { Code2, Award, GitBranch, Terminal, ExternalLink } from 'lucide-react';
import { SEED_SKILLFORGE } from '@/lib/data/nexus-seed';

export default function SkillsPage() {
  const treeNodes = [
    { name: 'Programming Fundamentals', level: 'Completed', status: 'done' },
    { name: 'Python & OOP Systems', level: 'Completed', status: 'done' },
    { name: 'Data Structures & Algorithms', level: 'In Progress (85%)', status: 'current' },
    { name: 'Vector Databases & RAG', level: 'In Progress (40%)', status: 'current' },
    { name: 'Distributed AI Inference', level: 'Locked', status: 'locked' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
          <Code2 className="w-4 h-4" />
          <span>SkillForge</span>
          <span className="text-gray-400 font-normal">• Phase 4 Architecture Ready</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
          Technical Skills & Career Roadmap
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Curated career paths, interactive skill graphs, coding challenges, and readiness scoring.
        </p>
      </div>

      {/* Career Readiness Banner */}
      <div className="p-6 rounded-card-lg bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400">
            Current Target Track
          </span>
          <h3 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white mt-0.5">
            {SEED_SKILLFORGE.activeCareerPath}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {SEED_SKILLFORGE.skillsLearnedCount} of {SEED_SKILLFORGE.totalRoadmapSkills} skills mastered • {SEED_SKILLFORGE.activeStreak} days coding streak
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-gray-400">Career Readiness</span>
            <p className="text-3xl font-heading font-extrabold text-indigo-600 dark:text-indigo-400">
              {SEED_SKILLFORGE.careerReadinessScore}%
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Skill Tree Preview */}
      <div className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
        <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-4">
          Roadmap Skill Tree Progression
        </h4>
        <div className="space-y-3">
          {treeNodes.map((node, idx) => (
            <div
              key={node.name}
              className={`p-3.5 rounded-xl border flex items-center justify-between ${
                node.status === 'done'
                  ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50'
                  : node.status === 'current'
                  ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700/60 font-semibold'
                  : 'bg-gray-50/50 dark:bg-gray-900/20 border-gray-200/50 text-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-sm text-gray-900 dark:text-gray-100">{node.name}</span>
              </div>
              <span className="text-xs font-mono text-gray-500">{node.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

