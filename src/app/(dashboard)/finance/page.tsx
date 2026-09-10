'use client';

import React from 'react';
import { Wallet, TrendingDown, AlertCircle, PieChart, ArrowUpRight, DollarSign } from 'lucide-react';
import { SEED_FINANCE } from '@/lib/data/nexus-seed';

export default function FinancePage() {
  const categories = Object.entries(SEED_FINANCE.categoryBreakdown);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-1">
          <Wallet className="w-4 h-4" />
          <span>Finance Hub</span>
          <span className="text-gray-400 font-normal">• Phase 6 Architecture Ready</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
          Student Budget & Spending
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Guard your monthly allowance, track daily burn rate, and control non-essential food orders.
        </p>
      </div>

      {/* Main Budget Card */}
      <div className="p-6 md:p-8 rounded-card-lg bg-green-50/70 dark:bg-green-950/30 border border-green-200/80 dark:border-green-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold text-green-700 dark:text-green-300">
              Remaining Monthly Balance
            </span>
            <h2 className="text-4xl font-heading font-extrabold text-green-600 dark:text-green-400 mt-1">
              ₹{SEED_FINANCE.remainingBudget}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
              Out of ₹{SEED_FINANCE.monthlyBudget} monthly budget • ₹{SEED_FINANCE.totalSpentThisMonth} spent so far
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-black/40 border border-green-200 dark:border-green-800/40 space-y-1 text-xs">
            <div className="flex justify-between gap-4 text-gray-600 dark:text-gray-300">
              <span>Days Remaining:</span>
              <span className="font-bold text-gray-900 dark:text-white">{SEED_FINANCE.daysRemainingInMonth} days</span>
            </div>
            <div className="flex justify-between gap-4 text-gray-600 dark:text-gray-300">
              <span>Safe Daily Spend:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{SEED_FINANCE.dailySafeSpendingLimit} / day</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all"
              style={{
                width: `${(SEED_FINANCE.totalSpentThisMonth / SEED_FINANCE.monthlyBudget) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-gray-500 mt-1.5 font-medium">
            <span>₹0 Spent</span>
            <span>93.3% Budget Consumed</span>
            <span>₹{SEED_FINANCE.monthlyBudget} Cap</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(([cat, amount]) => (
          <div
            key={cat}
            className="p-4 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{cat}</p>
              <p className="text-[11px] text-gray-400">
                {((amount / SEED_FINANCE.monthlyBudget) * 100).toFixed(1)}% of allowance
              </p>
            </div>
            <span className="font-heading font-bold text-sm text-gray-800 dark:text-gray-200">
              ₹{amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

