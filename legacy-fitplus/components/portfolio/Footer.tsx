'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          {/* Brand & Role */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                H
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Hemanth
              </span>
            </Link>
            <p className="text-xs text-slate-500 mt-1">
              AI &amp; ML Student • Full-Stack Developer
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleScrollToTop(); }} className="hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-blue-600 transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-blue-600 transition-colors">
              Projects
            </a>
            <a href="#experience" className="hover:text-blue-600 transition-colors">
              Experience
            </a>
            <a href="#education" className="hover:text-blue-600 transition-colors">
              Education
            </a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200/50"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200/50"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@hemanth.dev"
              aria-label="Email"
              className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-slate-200/50"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleScrollToTop}
              aria-label="Back to top"
              className="p-2 ml-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Hemanth. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Designed with precision &amp; Next.js App Router
          </p>
        </div>
      </div>
    </footer>
  );
};

