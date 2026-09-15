'use client';

import React, { useState } from 'react';
import { Problem, Submission } from '@/lib/types';
import { 
  FileText, 
  Lightbulb, 
  History, 
  Clock, 
  Cpu, 
  Copy, 
  Check, 
  CheckCircle2, 
  XCircle,
  Tag
} from 'lucide-react';
import { ProgressiveHints } from './ProgressiveHints';
import { toast } from 'sonner';

interface ProblemStatementProps {
  problem: Problem;
  submissions: Submission[];
}

export function ProblemStatement({ problem, submissions }: ProblemStatementProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'hints' | 'submissions'>('description');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success('Example input copied to clipboard');
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const diffColor =
    problem.difficulty === 'Easy'
      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
      : problem.difficulty === 'Medium'
      ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
      : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

  return (
    <div className="h-full w-full flex flex-col bg-[#0A0E18] border-r border-white/[0.08] overflow-hidden select-text">
      {/* Pane Tabs Header */}
      <div className="flex items-center border-b border-white/[0.08] bg-[#070B13] px-2 shrink-0">
        <button
          onClick={() => setActiveTab('description')}
          className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'description'
              ? 'border-brand-500 text-white bg-white/[0.03]'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Description</span>
        </button>

        <button
          onClick={() => setActiveTab('hints')}
          className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'hints'
              ? 'border-brand-500 text-white bg-white/[0.03]'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Hints</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 font-mono">
            {problem.hints.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'submissions'
              ? 'border-brand-500 text-white bg-white/[0.03]'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Submissions</span>
          {submissions.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-400 font-mono">
              {submissions.length}
            </span>
          )}
        </button>
      </div>

      {/* Pane Body */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'description' && (
          <div className="p-5 space-y-6">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded border font-mono ${diffColor}`}>
                  {problem.difficulty}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {problem.category}
                </span>
                <span className="text-xs text-zinc-500">•</span>
                <span className="text-xs text-zinc-500 font-mono">
                  Acceptance: {problem.acceptanceRate}
                </span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                {problem.title}
              </h1>

              {/* Optimal Target Benchmarks */}
              <div className="mt-3 flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-400" />
                  <span>Time: <span className="text-zinc-200 font-semibold">{problem.timeComplexityOptimal}</span></span>
                </div>
                <span className="text-zinc-600">|</span>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-brand-400" />
                  <span>Space: <span className="text-zinc-200 font-semibold">{problem.spaceComplexityOptimal}</span></span>
                </div>
              </div>
            </div>

            {/* Problem Body */}
            <div className="text-sm text-zinc-300 leading-relaxed space-y-3 font-sans">
              {problem.description.split('\n\n').map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Examples */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                Examples
              </h3>
              {problem.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-[#070B13] border border-white/[0.07] p-3.5 space-y-2 text-xs font-mono"
                >
                  <div className="flex items-center justify-between text-zinc-400 border-b border-white/[0.05] pb-1.5">
                    <span className="font-semibold text-zinc-300">Example {idx + 1}</span>
                    <button
                      onClick={() => handleCopy(ex.input, idx)}
                      className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Input</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div>
                    <span className="text-zinc-500">Input: </span>
                    <span className="text-zinc-200">{ex.input}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Output: </span>
                    <span className="text-emerald-400 font-semibold">{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div className="text-zinc-400 font-sans text-xs pt-1 border-t border-white/[0.04]">
                      <span className="font-mono text-zinc-500">Explanation: </span>
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                Constraints
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-400">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-zinc-500" />
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-400 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hints' && <ProgressiveHints problem={problem} />}

        {activeTab === 'submissions' && (
          <div className="p-4 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono mb-2">
              Submission History
            </h3>
            {submissions.length === 0 ? (
              <div className="py-12 text-center text-xs text-zinc-500">
                No submissions yet for this problem. Write your code and click Submit.
              </div>
            ) : (
              submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3 rounded-lg bg-[#070B13] border border-white/[0.06] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    {sub.status === 'Accepted' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <div>
                      <div
                        className={`font-semibold font-mono ${
                          sub.status === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {sub.status}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        {sub.language.toUpperCase()} • {sub.submittedAt}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-zinc-400 font-mono text-[11px]">
                    <div>{sub.runtimeMs} ms</div>
                    <div className="text-zinc-500">{sub.memoryMb} MB</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

