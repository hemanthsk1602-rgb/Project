'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { TIMELINE_MILESTONES } from '@/data/portfolioData';

export const Journey: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="mb-3 inline-block">
            <span className="text-[13px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full">
              Timeline &amp; Evolution
            </span>
          </div>
          <h2 className="text-[34px] sm:text-[40px] md:text-[48px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
            My Journey
          </h2>
          <p className="text-[16px] md:text-[18px] text-slate-600 mt-2">
            A chronological progression of academic foundations, practical project development, and continuous self-improvement.
          </p>
        </div>

        {/* Minimalist Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-12 my-6">
          {TIMELINE_MILESTONES.map((milestone, index) => (
            <motion.div
              key={milestone.period + milestone.role}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              className="relative group"
            >
              {/* Circular timeline marker on the line */}
              <div className="absolute -left-[32px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-600 shadow-sm group-hover:scale-125 group-hover:bg-blue-600 transition-all duration-200" />

              {/* Milestone Card */}
              <div className="p-6 sm:p-7 bg-[#F8FAFC] border border-slate-200/90 rounded-card shadow-subtle-sm hover:shadow-card hover:bg-white hover:border-slate-300 transition-all duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 font-mono tracking-wide bg-blue-50 border border-blue-200/60 px-3 py-0.5 rounded-full">
                      {milestone.period}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      • {milestone.organization}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
                    {milestone.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {milestone.role}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {milestone.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200/60">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1 uppercase tracking-wider">
                    Skills:
                  </span>
                  {milestone.skillsLearned.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
