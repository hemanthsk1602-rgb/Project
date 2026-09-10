'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';

export default function PricingPage() {
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
            Simple, Student-First Pricing
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Open access architecture designed to keep high-powered tooling accessible to every student.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="p-8 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-gray-400">Community Edition</span>
              <h3 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white mt-1">
                Student Free
              </h3>
              <p className="text-3xl font-heading font-black text-gray-900 dark:text-white mt-4">
                ₹0 <span className="text-xs font-normal text-gray-400">/ forever</span>
              </p>
              <ul className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Full access to all 6 life command modules</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Unlimited local task and habit management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Interactive SkillForge career trees</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Demo Mode AI Core evaluation</span>
                </li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="mt-8 block text-center py-3 rounded-btn bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="p-8 rounded-card bg-gradient-to-br from-violet-500/10 via-white to-blue-500/10 dark:from-violet-950/40 dark:via-nexus-dark-card dark:to-blue-950/20 border border-violet-400/80 dark:border-violet-700/60 shadow-xl flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-violet-600 text-white shadow-sm">
              Pro Scholar
            </span>
            <div>
              <span className="text-xs uppercase font-bold text-violet-600 dark:text-violet-400">Advanced AI</span>
              <h3 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white mt-1">
                NEXUS Cloud
              </h3>
              <p className="text-3xl font-heading font-black text-gray-900 dark:text-white mt-4">
                ₹199 <span className="text-xs font-normal text-gray-400">/ month</span>
              </p>
              <ul className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>Live multi-modal RAG note processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>Unlimited pgvector document chunking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>Live transit routing & Google Maps platform</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>Cross-device real-time Supabase sync</span>
                </li>
              </ul>
            </div>
            <Link
              href="/onboarding"
              className="mt-8 block text-center py-3 rounded-btn bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-button-primary transition-colors"
            >
              Start 14-Day Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

