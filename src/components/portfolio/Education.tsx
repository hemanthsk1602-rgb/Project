'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export const Education: React.FC = () => {
  const { education } = PERSONAL_INFO;

  return (
    <section id="education" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="mb-3">
            <span className="text-[13px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full">
              Academic Background
            </span>
          </div>
          <h2 className="text-[34px] sm:text-[40px] md:text-[48px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
            Education
          </h2>
          <p className="text-[16px] md:text-[18px] text-slate-600 mt-2 max-w-2xl">
            Undergraduate coursework structured around computational algorithms, data structures, and intelligent machine learning systems.
          </p>
        </div>

        {/* Education Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white border border-slate-200 rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                <GraduationCap className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50/80 px-2.5 py-0.5 rounded-full border border-blue-200/50">
                  {education.year}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  {education.institution}
                </h3>
                <p className="text-base font-semibold text-slate-700 mt-1">
                  {education.degree}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {education.timeline}
              </span>
              <span className="text-xs text-slate-600 mt-1.5 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-purple-600" /> Currently Enrolled
              </span>
            </div>
          </div>

          {/* Key Coursework and Focus Areas */}
          <div className="pt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-600" />
              Core Academic Coursework
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {education.focusAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-sm text-slate-800"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-[13.5px]">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
