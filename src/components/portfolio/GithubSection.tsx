'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, GitPullRequest, GitFork, ArrowUpRight, Terminal } from 'lucide-react';

export const GithubSection: React.FC = () => {
  // Generate 52 weeks x 7 days heatmap grid matrix
  // Use realistic distribution of contribution shades
  const weeks = 40; // 40 weeks displayed cleanly across screens
  const days = 7;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  // Realistic seed distribution for student developer activity
  const getActivityLevel = (weekIndex: number, dayIndex: number): number => {
    // Generate deterministic pattern based on index
    const seed = (weekIndex * 7 + dayIndex * 13) % 17;
    if (seed < 5) return 0; // inactive
    if (seed < 10) return 1; // light
    if (seed < 14) return 2; // medium
    if (seed < 16) return 3; // high
    return 4; // very high
  };

  const getColorClass = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-slate-100 border-slate-200/50';
      case 1:
        return 'bg-blue-100 border-blue-200';
      case 2:
        return 'bg-blue-300 border-blue-400';
      case 3:
        return 'bg-blue-500 border-blue-600';
      case 4:
        return 'bg-blue-600 border-blue-700';
      default:
        return 'bg-slate-100 border-slate-200/50';
    }
  };

  return (
    <section className="py-20 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="mb-3">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full">
                Engineering Activity
              </span>
            </div>
            <h2 className="text-[34px] sm:text-[40px] md:text-[48px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
              Code. Build. Learn.
            </h2>
            <p className="text-[16px] md:text-[18px] text-slate-600 mt-2 max-w-2xl">
              Consistent project iterations, problem solving, and continuous experimentation across modern code repositories.
            </p>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-btn transition-all duration-150 shadow-subtle-sm hover:border-slate-400 self-start md:self-auto group"
          >
            <Github className="w-4 h-4 text-slate-900" />
            <span>View My GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
          </a>
        </div>

        {/* GitHub Activity Matrix Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="p-6 sm:p-8 bg-[#F8FAFC] border border-slate-200 rounded-card shadow-card"
        >
          {/* Header Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Daily Coding Cadence
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Contributions &amp; Commits across Repositories
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-subtle-sm">
                <GitCommit className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold text-slate-800">Active Repositories</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-subtle-sm">
                <Terminal className="w-3.5 h-3.5 text-purple-600" />
                <span className="font-semibold text-slate-800">TypeScript &amp; Python</span>
              </div>
            </div>
          </div>

          {/* Activity Heatmap Grid Container */}
          <div className="overflow-x-auto pb-2">
            {/* Month Labels */}
            <div className="flex text-[11px] text-slate-400 font-mono mb-2 pl-6 min-w-[700px] justify-between">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>

            {/* Grid Days & Cells */}
            <div className="flex gap-1.5 min-w-[700px]">
              {/* Day of Week Labels */}
              <div className="flex flex-col justify-between text-[9px] text-slate-400 font-mono pr-2 py-0.5 select-none">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Columns for weeks */}
              {Array.from({ length: weeks }).map((_, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-1.5">
                  {Array.from({ length: days }).map((_, dIndex) => {
                    const level = getActivityLevel(wIndex, dIndex);
                    return (
                      <div
                        key={dIndex}
                        className={`w-3 h-3 rounded-[3px] border ${getColorClass(
                          level
                        )} transition-transform duration-100 hover:scale-125 cursor-pointer`}
                        title={`Activity level: ${level}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-200 text-xs text-slate-500">
            <span className="font-mono text-[11px]">
              Continuous project commits &amp; algorithm experiments
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">Less</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 border border-slate-200" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-100 border border-blue-200" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-300 border border-blue-400" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-500 border border-blue-600" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-600 border border-blue-700" />
              <span className="text-[11px] text-slate-400">More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
