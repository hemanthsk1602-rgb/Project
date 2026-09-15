'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Terminal,
  Layers,
  Code2,
  Mail,
  Github,
  Linkedin,
  X,
  Compass,
  Zap,
} from 'lucide-react';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Handle keyboard navigation shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open menu via parent
          const event = new CustomEvent('open-command-palette');
          window.dispatchEvent(event);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    { label: 'Jump to About Section', action: () => scrollToSection('#about'), icon: Compass, category: 'Navigation' },
    { label: 'Jump to Skills & Stack', action: () => scrollToSection('#skills'), icon: Code2, category: 'Navigation' },
    { label: 'Jump to Featured Projects', action: () => scrollToSection('#projects'), icon: Layers, category: 'Navigation' },
    { label: 'Launch FitPlus Live Demo', action: () => window.location.href = '/dashboard', icon: Zap, category: 'Projects' },
    { label: 'Jump to Learning Journey', action: () => scrollToSection('#journey'), icon: ArrowRight, category: 'Navigation' },
    { label: 'Jump to Education Credentials', action: () => scrollToSection('#education'), icon: Compass, category: 'Navigation' },
    { label: 'Jump to Contact Form', action: () => scrollToSection('#contact'), icon: Mail, category: 'Navigation' },
    { label: 'Copy Email Address', action: () => copyEmail(), icon: Mail, category: 'Actions' },
    { label: 'Open GitHub Profile', action: () => window.open('https://github.com', '_blank'), icon: Github, category: 'External' },
    { label: 'Open LinkedIn Profile', action: () => window.open('https://linkedin.com', '_blank'), icon: Linkedin, category: 'External' },
  ];

  const scrollToSection = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@hemanth.dev');
    onClose();
  };

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-white rounded-card shadow-2xl border border-slate-200 overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or jump to section..."
                className="w-full text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-72 overflow-y-auto p-2 divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium text-slate-800 group-hover:text-slate-900">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Footer Key Guide */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Navigation shortcut</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

