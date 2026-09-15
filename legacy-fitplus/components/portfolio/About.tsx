'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Brain,
  Code2,
  Cpu,
  GraduationCap,
  Sparkles,
  Rocket,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

// Reusable Animated Counter component
interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  from = 0,
  to,
  duration = 1.6,
  suffix = '',
  prefix = '',
}) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(from + (to - from) * easeProgress);

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className="font-extrabold tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-40px' });

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-[#F8FAFC] border-y border-slate-200/80 relative overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.35] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-4">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full">
            Introduction
          </span>
        </div>

        {/* 2-Column Balanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
              About Me
            </h2>

            <div className="space-y-4 text-[16px] md:text-[17px] text-slate-600 leading-[1.7]">
              <p>
                I am a 2nd-year undergraduate student specializing in{' '}
                <strong className="text-slate-900 font-semibold">
                  Artificial Intelligence &amp; Machine Learning
                </strong>{' '}
                at Crescent Institute of Science and Technology. My engineering focus combines deep mathematical foundations with modern full-stack web engineering.
              </p>
              <p>
                I am passionate about solving real-world challenges through technology. Whether it&apos;s architecting intuitive web platforms with Next.js and TypeScript or developing intelligent AI models and data pipelines with Python, I thrive on turning complex requirements into clean, practical digital applications.
              </p>
              <p>
                I believe that continuous learning and disciplined problem solving are the hallmarks of a great engineer. I constantly experiment with cutting-edge tools, refine my software architecture skills, and build projects that deliver real user value.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Core Competencies &amp; Focus Areas
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Artificial Intelligence & ML',
                  'Full-Stack Web Development',
                  'Algorithmic Problem Solving',
                  'Learning New Technologies',
                  'Building Practical Projects',
                  'Clean Architecture & UX Craft',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80 text-sm text-slate-700 shadow-subtle-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-medium text-[13.5px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Statistics & Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Statistics Cards Grid with Animated Counters */}
            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stat 1: 2+ Years Learning & Building */}
              <div className="p-6 bg-white border border-slate-200 rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                  <AnimatedCounter to={2} suffix="+" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  Years Learning &amp; Building
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dedicated computer science, web software &amp; machine learning foundations.
                </p>
              </div>

              {/* Stat 2: Multiple Projects */}
              <div className="p-6 bg-white border border-slate-200 rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                  <AnimatedCounter to={10} suffix="+" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  Multiple Projects
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Engineered web applications, utilities, and algorithmic prototypes.
                </p>
              </div>

              {/* Stat 3: AI & ML Student */}
              <div className="p-6 bg-white border border-slate-200 rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                  <AnimatedCounter to={2} suffix="nd Year" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  AI &amp; ML Student
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Crescent Institute of Science and Technology B.Tech candidate.
                </p>
              </div>

              {/* Stat 4: Always Learning */}
              <div className="p-6 bg-white border border-slate-200 rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                  <AnimatedCounter to={100} suffix="%" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  Always Learning
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Constantly exploring modern frameworks, tools, and algorithms.
                </p>
              </div>
            </div>

            {/* Quick Education Callout Banner */}
            <div className="p-5 bg-white border border-slate-200/90 rounded-card shadow-subtle-sm flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    B.Tech in Artificial Intelligence &amp; Machine Learning
                  </h4>
                  <p className="text-xs text-slate-500">
                    Crescent Institute of Science and Technology • 2nd Year
                  </p>
                </div>
              </div>
              <a
                href="#education"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline shrink-0"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
