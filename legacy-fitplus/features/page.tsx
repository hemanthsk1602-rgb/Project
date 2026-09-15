'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Dumbbell,
  Wallet,
  CalendarCheck,
  Code2,
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';

export default function FeaturesPage() {
  const featureList = [
    {
      title: 'Study Hub & AI PDF Study Engine',
      desc: 'Upload course lecture notes and exam syllabi. Chunking and vector embeddings allow conversational notes Q&A and active recall quizzes.',
      icon: GraduationCap,
      color: 'text-blue-500',
    },
    {
      title: 'Adaptive Fitness & Health Balancing',
      desc: 'Workout generation spanning Gym, Calisthenics, and Home workouts that intelligently scale down during high-stress exam intervals.',
      icon: Dumbbell,
      color: 'text-emerald-500',
    },
    {
      title: 'Student Finance & Burn Rate Guard',
      desc: 'Real-time calculation of daily safe spending limits so students never unexpectedly deplete their allowances before month-end.',
      icon: Wallet,
      color: 'text-green-500',
    },
    {
      title: 'Linear-Inspired Productivity',
      desc: 'Keyboard-first task management, Pomodoro sprints, and habit tracking linked directly to academic milestones.',
      icon: CalendarCheck,
      color: 'text-amber-500',
    },
    {
      title: 'SkillForge Career Graph & Challenges',
      desc: 'Custom roadmaps for AI/ML, Full-Stack, Data Science, and DevOps with real code submission and career readiness scores.',
      icon: Code2,
      color: 'text-indigo-500',
    },
    {
      title: 'Campus & City Transit Navigation',
      desc: 'Provider-abstracted student travel calculating bus/train stops, walking durations, and ticket fare estimates.',
      icon: Compass,
      color: 'text-cyan-500',
    },
  ];

  return (
    <div className="min-h-screen bg-nexus-light-bg dark:bg-nexus-dark-bg text-nexus-light-text dark:text-nexus-dark-text p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <NexusOrb size="sm" state="idle" />
            <span className="font-heading font-extrabold text-base tracking-wider bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              NEXUS OS
            </span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-gray-900 dark:text-white">
            Comprehensive Feature Architecture
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            A deeply integrated software suite unifying all facets of undergraduate and graduate student success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark"
              >
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 w-fit mb-4">
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-button-primary transition-all"
          >
            <span>Open NEXUS Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

