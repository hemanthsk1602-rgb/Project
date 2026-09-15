'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Copy,
  Check,
  Terminal,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    const codeSnippet = `const developer = {
  name: "${PERSONAL_INFO.displayName}",
  role: "${PERSONAL_INFO.role}",
  focus: "AI + Full-Stack",
  university: "Crescent Institute",
  status: "Open to opportunities"
};`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero sequential entrance variants (entire entrance completes in < 1 second)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white">
      {/* Extremely subtle background radial glow - low opacity blue/purple */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-blue-500/8 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Very subtle dot texture overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.45] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Narrative */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* 1. Status Badge */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-slate-700 shadow-subtle-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[13px] font-semibold tracking-wide text-slate-700">
                  {PERSONAL_INFO.status}
                </span>
              </div>
            </motion.div>

            {/* 2. Intro Subtitle */}
            <motion.div variants={itemVariants} className="mb-2">
              <span className="text-lg sm:text-xl font-medium text-slate-600 font-sans tracking-tight">
                {PERSONAL_INFO.intro}
              </span>
            </motion.div>

            {/* 3. Large Heading: HEMANTH */}
            <motion.h1
              variants={itemVariants}
              className="text-[48px] sm:text-[64px] lg:text-[76px] xl:text-[84px] font-extrabold text-slate-900 tracking-[-0.04em] leading-[1.02] mb-4"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            {/* 4. Subheading: Role & Discipline */}
            <motion.div variants={itemVariants} className="mb-5">
              <h2 className="text-[19px] sm:text-[23px] font-bold text-blue-600 tracking-tight leading-snug">
                {PERSONAL_INFO.role}
              </h2>
            </motion.div>

            {/* 5. Short Professional Description */}
            <motion.p
              variants={itemVariants}
              className="text-[16px] sm:text-[18px] font-normal text-slate-600 leading-[1.65] max-w-2xl mb-8"
            >
              {PERSONAL_INFO.subheadline}
            </motion.p>

            {/* 6. Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10"
            >
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-btn transition-all duration-200 shadow-button-primary hover:shadow-button-primary-hover hover:-translate-y-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <Zap className="w-4 h-4 fill-white text-white" />
                <span>Launch FitPlus Web App</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[15px] font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-btn transition-all duration-200 shadow-subtle-sm hover:border-slate-400 hover:-translate-y-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <span>Explore Projects</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[15px] font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-btn transition-all duration-200 shadow-subtle-sm hover:border-slate-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>Resume</span>
              </button>
            </motion.div>

            {/* 7. Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 pt-3 border-t border-slate-100 w-full"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
                Connect
              </span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5 border border-slate-200/60 shadow-subtle-sm"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 border border-slate-200/60 shadow-subtle-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Send Email"
                className="p-2.5 rounded-lg text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 hover:-translate-y-0.5 border border-slate-200/60 shadow-subtle-sm"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Developer Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 relative group">
              {/* Subtle ambient accent glow behind card */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-card-lg blur-sm -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Code Card Top Bar: 3 Window Dots & Title */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70 rounded-t-card">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Terminal className="w-3 h-3 text-slate-400" />
                  <span>developer.ts</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  aria-label="Copy code snippet"
                  className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded"
                >
                  {copiedCode ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Card Code Editor Content with Clean Syntax Highlighting */}
              <div className="p-6 font-mono text-[13.5px] leading-relaxed select-text overflow-x-auto text-slate-800">
                <div className="text-slate-400 text-xs italic mb-2 select-none">
                  {'// Portfolio identity definition'}
                </div>
                <div>
                  <span className="text-purple-600 font-semibold">const</span>{' '}
                  <span className="text-blue-600 font-semibold">developer</span>{' '}
                  <span className="text-slate-500">=</span>{' '}
                  <span className="text-slate-800">&#123;</span>
                </div>

                <div className="pl-6 space-y-1.5 my-1.5">
                  <div>
                    <span className="text-slate-700 font-medium">name</span>
                    <span className="text-slate-400">:</span>{' '}
                    <span className="text-emerald-700 font-normal">&quot;{PERSONAL_INFO.name}&quot;</span>
                    <span className="text-slate-400">,</span>
                  </div>

                  <div>
                    <span className="text-slate-700 font-medium">focus</span>
                    <span className="text-slate-400">:</span>{' '}
                    <span className="text-emerald-700 font-normal">&quot;AI + Software&quot;</span>
                    <span className="text-slate-400">,</span>
                  </div>

                  <div>
                    <span className="text-slate-700 font-medium">passion</span>
                    <span className="text-slate-400">:</span>{' '}
                    <span className="text-emerald-700 font-normal">&quot;Building&quot;</span>
                    <span className="text-slate-400">,</span>
                  </div>

                  <div>
                    <span className="text-slate-700 font-medium">mindset</span>
                    <span className="text-slate-400">:</span>{' '}
                    <span className="text-emerald-700 font-normal">&quot;Keep Learning&quot;</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-800">&#125;</span>
                  <span className="text-slate-500">;</span>
                  {/* Clean Animated Cursor */}
                  <span className="inline-block w-2 h-4 ml-1 bg-blue-600 align-middle animate-cursor-blink" />
                </div>
              </div>

              {/* Bottom Quick Indicator Tag */}
              <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 rounded-b-card flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Undergraduate @ Crescent Institute</span>
                </span>
                <span className="text-slate-600 font-mono text-[11px]">B.Tech AI &amp; ML</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator at Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hidden md:flex flex-col items-center justify-center mt-12 text-slate-400 cursor-pointer group"
        onClick={handleScrollToProjects}
      >
        <span className="text-[12px] font-medium tracking-wider uppercase mb-1 group-hover:text-slate-700 transition-colors">
          Explore Work
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-slate-400 group-hover:text-blue-600 transition-colors" />
      </motion.div>
    </section>
  );
};
