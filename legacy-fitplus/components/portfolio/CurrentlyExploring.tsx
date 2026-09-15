'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Brain,
  Layers,
  Globe,
  Server,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { CURRENTLY_EXPLORING } from '@/data/portfolioData';

export const CurrentlyExploring: React.FC = () => {
  const getIcon = (iconName: string) => {
    const iconClass =
      'w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6';
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={`${iconClass} text-blue-600`} />;
      case 'Brain':
        return <Brain className={`${iconClass} text-purple-600`} />;
      case 'Layers':
        return <Layers className={`${iconClass} text-sky-600`} />;
      case 'Globe':
        return <Globe className={`${iconClass} text-indigo-600`} />;
      case 'Server':
        return <Server className={`${iconClass} text-emerald-600`} />;
      case 'Cpu':
        return <Cpu className={`${iconClass} text-amber-600`} />;
      default:
        return <Sparkles className={`${iconClass} text-blue-600`} />;
    }
  };

  return (
    <section id="learning" className="py-20 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="mb-3">
            <span className="text-[13px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full">
              Growth &amp; Expansion
            </span>
          </div>
          <h2 className="text-[34px] sm:text-[40px] md:text-[48px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
            Currently Exploring
          </h2>
          <p className="text-[16px] md:text-[18px] text-slate-600 mt-2 max-w-2xl">
            Emerging topics and engineering disciplines I am actively studying, implementing, and experimenting with.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CURRENTLY_EXPLORING.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: 'easeOut',
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 bg-white border border-slate-200 rounded-card shadow-subtle-sm hover:shadow-card hover:border-blue-200 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:bg-blue-50/50 group-hover:border-blue-200 transition-colors shadow-subtle-sm">
                    {getIcon(topic.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {topic.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {topic.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Status</span>
                <span className="font-semibold text-blue-600 flex items-center gap-1">
                  {topic.level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

