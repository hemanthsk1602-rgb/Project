'use client';

import React, { useState } from 'react';
import { AIReviewResult, CodeLanguage, Problem } from '@/lib/types';
import { analyzeCodeLocally } from '@/lib/ai/review-engine';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  Copy, 
  ArrowRight, 
  Check, 
  RotateCcw,
  Zap,
  HelpCircle,
  Bug
} from 'lucide-react';
import { toast } from 'sonner';

interface AIReviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: CodeLanguage;
  problem: Problem;
  onApplyCode: (optimizedCode: string) => void;
}

export function AIReviewDrawer({
  isOpen,
  onClose,
  code,
  language,
  problem,
  onApplyCode,
}: AIReviewDrawerProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<AIReviewResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRunAnalysis = async (mode = 'full') => {
    setLoading(true);
    // Simulate smart AI reasoning delay
    await new Promise((res) => setTimeout(res, 500));
    const result = analyzeCodeLocally(code, language, problem);
    setReviewResult(result);
    setLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Optimized code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (reviewResult?.optimizedCode) {
      onApplyCode(reviewResult.optimizedCode);
      toast.success('Optimized solution applied to editor');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full sm:w-96 md:w-[440px] bg-[#0A0E18] border-l border-white/[0.09] flex flex-col h-full shrink-0 select-text z-20 shadow-2xl animate-in slide-in-from-right duration-150">
      {/* Drawer Header */}
      <div className="h-12 px-4 border-b border-white/[0.08] bg-[#070B13] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-brand-500/20 text-brand-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white font-mono">
              CodeArena AI
            </span>
            <span className="text-[10px] text-zinc-400 block -mt-1 font-sans">
              Code Intelligence & Optimization
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-1 rounded hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
        {/* Quick Action Trigger Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
            Intelligence Actions
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleRunAnalysis('full')}
              disabled={loading}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-zinc-200 transition-colors text-left"
            >
              <Zap className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span className="truncate font-medium">Review Code</span>
            </button>

            <button
              onClick={() => handleRunAnalysis('bugs')}
              disabled={loading}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-zinc-200 transition-colors text-left"
            >
              <Bug className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate font-medium">Find Bugs</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-2 text-zinc-400">
            <Sparkles className="w-6 h-6 animate-spin text-brand-400" />
            <span className="font-mono text-xs">Analyzing asymptotic complexity...</span>
          </div>
        )}

        {/* Initial Empty State */}
        {!loading && !reviewResult && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center space-y-3 my-6">
            <Sparkles className="w-8 h-8 text-brand-400/60 mx-auto" />
            <p className="text-zinc-400 text-xs leading-relaxed">
              Run CodeArena AI to evaluate correctness, detect asymptotic bottlenecks, and view an optimal refactor.
            </p>
            <button
              onClick={() => handleRunAnalysis('full')}
              className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-colors shadow-glow-brand"
            >
              Start Code Review
            </button>
          </div>
        )}

        {/* Analysis Results */}
        {!loading && reviewResult && (
          <div className="space-y-4">
            {/* Score Card */}
            <div className="p-4 rounded-xl bg-[#070B13] border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                  Quality Score
                </span>
                <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-1">
                  <span>{reviewResult.score}</span>
                  <span className="text-xs text-zinc-500 font-normal">/ 100</span>
                </div>
                <div className="text-xs text-brand-400 font-medium mt-0.5">
                  {reviewResult.verdict}
                </div>
              </div>

              {/* Subscores */}
              <div className="space-y-1.5 text-right font-mono text-[11px]">
                <div className="text-zinc-400">
                  Correctness: <span className="text-zinc-200">{reviewResult.correctnessScore}%</span>
                </div>
                <div className="text-zinc-400">
                  Edge Cases: <span className="text-zinc-200">{reviewResult.edgeCasesScore}%</span>
                </div>
                <div className="text-zinc-400">
                  Readability: <span className="text-zinc-200">{reviewResult.readabilityScore}%</span>
                </div>
              </div>
            </div>

            {/* Complexity Transition */}
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2 font-mono text-xs">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-sans">
                Asymptotic Complexity Transition
              </span>
              <div className="flex items-center justify-between bg-[#04070D] p-2.5 rounded border border-white/[0.04]">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500">Current</span>
                  <div className="text-amber-400 font-semibold">
                    {reviewResult.currentComplexity.time} Time
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600" />
                <div className="space-y-0.5 text-right">
                  <span className="text-[10px] text-zinc-500">Suggested</span>
                  <div className="text-emerald-400 font-semibold">
                    {reviewResult.suggestedComplexity.time} Time
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-zinc-300 leading-relaxed text-xs">
              {reviewResult.summary}
            </div>

            {/* Strengths */}
            {reviewResult.strengths.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                  Strengths
                </span>
                <div className="space-y-1">
                  {reviewResult.strengths.map((str, i) => (
                    <div key={i} className="flex items-start gap-2 text-zinc-300 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Issues */}
            {reviewResult.issues.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                  Opportunities for Improvement
                </span>
                {reviewResult.issues.map((issue, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-[#070B13] border border-white/[0.07] space-y-1 text-xs"
                  >
                    <div className="flex items-center gap-1.5 font-medium text-rose-400">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{issue.message}</span>
                    </div>
                    <p className="text-zinc-400 pl-5 text-[11px] leading-relaxed">
                      {issue.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Optimized Code Snippet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                  Suggested Optimal Refactor
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(reviewResult.optimizedCode)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-zinc-400 hover:text-zinc-200 bg-white/[0.04]"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleApply}
                    className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-brand-300 hover:text-white bg-brand-500/20 hover:bg-brand-500/40 border border-brand-500/30"
                  >
                    <span>Apply</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#04070D] border border-white/[0.07] overflow-x-auto font-mono text-[11px] text-zinc-300 max-h-48 whitespace-pre">
                {reviewResult.optimizedCode}
              </div>

              <p className="text-[11px] text-zinc-500 italic">
                {reviewResult.optimizationRationale}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

