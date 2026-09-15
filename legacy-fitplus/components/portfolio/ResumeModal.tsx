'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Download,
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Code2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-10 overflow-hidden my-auto"
          >
            {/* Header Control Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hemanth — Curriculum Vitae
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-blue-600" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
                  aria-label="Close resume preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Resume Sheet */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-slate-800">
              {/* Header Profile */}
              <div className="border-b border-slate-200 pb-6">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  HEMANTH
                </h1>
                <p className="text-base font-semibold text-blue-600 mt-1">
                  AI &amp; ML Student | Full-Stack Developer | Problem Solver
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-2xl">
                  Passionate undergraduate specializing in Artificial Intelligence &amp; Machine Learning with hands-on full-stack development experience in Next.js, TypeScript, and Python. Driven to engineer practical, human-centered software.
                </p>
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-600">
                  <span>Chennai, India</span>
                  <span>•</span>
                  <a href="mailto:contact@hemanth.dev" className="text-blue-600 hover:underline">
                    contact@hemanth.dev
                  </a>
                  <span>•</span>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    github.com
                  </a>
                  <span>•</span>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    linkedin.com
                  </a>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600" /> Education
                </h2>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      Crescent Institute of Science and Technology
                    </h3>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      2024 — 2028 (2nd Year)
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-700">
                    B.Tech / Undergraduate — Artificial Intelligence &amp; Machine Learning
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Coursework: Data Structures &amp; Algorithms, Machine Learning Foundations, Artificial Intelligence, Database Management Systems, Discrete Mathematics.
                  </p>
                </div>
              </div>

              {/* Technical Skills Matrix */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-purple-600" /> Technical Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">Programming Languages</span>
                    <span className="text-slate-600">Python, JavaScript (ES6+), TypeScript, C/C++</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">Frontend Development</span>
                    <span className="text-slate-600">HTML5, CSS3, React, Next.js (App Router), Tailwind CSS</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">Backend &amp; Databases</span>
                    <span className="text-slate-600">Node.js, Express, MongoDB, MySQL, REST APIs</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">AI, ML &amp; Tools</span>
                    <span className="text-slate-600">Machine Learning, Data Analysis, Git, GitHub, VS Code, Figma</span>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-600" /> Featured Projects
                </h2>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-[13px]">
                        FitPlus — AI-Powered Fitness Platform
                      </span>
                      <span className="text-[11px] font-mono text-blue-600 font-semibold">
                        Next.js, TypeScript, Tailwind, AI
                      </span>
                    </div>
                    <p className="text-slate-600 mb-1.5">
                      Intelligent workout companion generating personalized splits for Gym &amp; Calisthenics modes with recovery scoring, interactive player, and progressive overload recommendations.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-[13px]">
                        Smart Expense Tracker
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                        HTML, CSS, JavaScript
                      </span>
                    </div>
                    <p className="text-slate-600 mb-1.5">
                      Responsive financial tracking application with categorized spending charts, budget threshold alerts, and instant local storage synchronization.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-[13px]">
                        Python Mini Projects Suite
                      </span>
                      <span className="text-[11px] font-mono text-purple-600 font-semibold">
                        Python, OOP, Data Structures
                      </span>
                    </div>
                    <p className="text-slate-600">
                      Scientific calculator with arithmetic parsing, AI-hinted binary search guessing game, and an automated restaurant menu ordering and billing application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

