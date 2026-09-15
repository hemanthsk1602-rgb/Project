'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Cpu, Code2, ArrowRight } from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-nexus-light-bg dark:bg-nexus-dark-bg text-nexus-light-text dark:text-nexus-dark-text p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <NexusOrb size="sm" state="idle" />
            <span className="font-heading font-extrabold text-base tracking-wider bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              NEXUS
            </span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-gray-900 dark:text-white">
            Our Mission
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            NEXUS — Your life. Your learning. Your future. Connected.
          </p>
        </div>

        <div className="p-8 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            University students are inundated with fractured software. One app for note-taking, another for gym logs, a third for bank statements, a fourth for LeetCode progress, and a fifth for city bus routes. None of these applications communicate with each other.
          </p>
          <p>
            When an exam is tomorrow, a student shouldn't have to manually reschedule their gym workout, scramble to check if they have enough money for mess meals, or reschedule a coding challenge. An operating system designed for human beings should understand these interdependent constraints.
          </p>
          <p>
            <strong>NEXUS</strong> is engineered from the ground up to synthesize this data securely using PostgreSQL Row-Level Security, strict provider isolation, and cross-module intelligence.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-button-primary transition-all"
          >
            <span>Explore NEXUS System</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

