'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCode2,
  FileCode,
  Braces,
  Cpu,
  Layout,
  Palette,
  Layers,
  Globe,
  Sparkles,
  Server,
  Zap,
  Database,
  Table,
  Terminal,
  Brain,
  BarChart3,
  Bot,
  GitBranch,
  Github,
  AppWindow,
  Figma,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '@/data/portfolioData';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getIcon = (iconName: string) => {
    const iconProps = "w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5";
    switch (iconName) {
      case 'FileCode2':
        return <FileCode2 className={`${iconProps} text-blue-600`} />;
      case 'Braces':
        return <Braces className={`${iconProps} text-amber-600`} />;
      case 'FileCode':
        return <FileCode className={`${iconProps} text-blue-700`} />;
      case 'Cpu':
        return <Cpu className={`${iconProps} text-indigo-600`} />;
      case 'Layout':
        return <Layout className={`${iconProps} text-orange-600`} />;
      case 'Palette':
        return <Palette className={`${iconProps} text-cyan-600`} />;
      case 'Layers':
        return <Layers className={`${iconProps} text-sky-600`} />;
      case 'Globe':
        return <Globe className={`${iconProps} text-slate-900`} />;
      case 'Sparkles':
        return <Sparkles className={`${iconProps} text-teal-600`} />;
      case 'Server':
        return <Server className={`${iconProps} text-emerald-600`} />;
      case 'Zap':
        return <Zap className={`${iconProps} text-amber-500`} />;
      case 'Database':
        return <Database className={`${iconProps} text-green-600`} />;
      case 'Table':
        return <Table className={`${iconProps} text-blue-800`} />;
      case 'Terminal':
        return <Terminal className={`${iconProps} text-blue-600`} />;
      case 'Brain':
        return <Brain className={`${iconProps} text-purple-600`} />;
      case 'BarChart3':
        return <BarChart3 className={`${iconProps} text-emerald-600`} />;
      case 'Bot':
        return <Bot className={`${iconProps} text-violet-600`} />;
      case 'GitBranch':
        return <GitBranch className={`${iconProps} text-orange-600`} />;
      case 'Github':
        return <Github className={`${iconProps} text-slate-900`} />;
      case 'AppWindow':
        return <AppWindow className={`${iconProps} text-blue-600`} />;
      case 'Figma':
        return <Figma className={`${iconProps} text-rose-500`} />;
      default:
        return <Terminal className={`${iconProps} text-slate-700`} />;
    }
  };

  const filteredCategories =
    activeTab === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="mb-3">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full">
                Technical Expertise
              </span>
            </div>
            <h2 className="text-[34px] sm:text-[40px] md:text-[48px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
              Skills &amp; Technologies
            </h2>
            <p className="text-[16px] md:text-[18px] text-slate-600 mt-2 max-w-2xl">
              Strictly vetted tools and technologies applied across software engineering, web development, and AI implementations.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/70 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-subtle-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-white text-slate-900 shadow-subtle-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Categories Display */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400 font-mono">
                  {category.skills.length} technologies
                </span>
              </div>

              {/* Grid of Skill Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.04,
                      ease: 'easeOut',
                    }}
                    className="p-5 bg-white border border-slate-200 rounded-card shadow-subtle-sm hover:shadow-card hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:bg-white group-hover:border-blue-200 transition-colors shadow-subtle-sm">
                          {getIcon(skill.iconName)}
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 tracking-wide border border-slate-200/50">
                          {skill.category}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
