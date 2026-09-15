'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { CodeLanguage, AIReviewResult } from '@/lib/types';
import { analyzeCodeLocally } from '@/lib/ai/review-engine';
import { 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  ExternalLink,
  Code2,
  RefreshCw,
  FileCode
} from 'lucide-react';
import { toast } from 'sonner';

export default function AIReviewPage() {
  const [language, setLanguage] = useState<CodeLanguage>('cpp');

  const samplePresets: Record<string, { lang: CodeLanguage; code: string; title: string }> = {
    bruteTwoSum: {
      lang: 'cpp',
      title: 'Quadratic Two Sum (Brute Force O(n²))',
      code: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Brute force nested traversal: O(n²) time
        for (int i = 0; i < nums.size(); ++i) {
            for (int j = i + 1; j < nums.size(); ++j) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};`,
    },
    linearWindow: {
      lang: 'cpp',
      title: 'Sliding Window (Optimal O(n))',
      code: `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); ++right) {
            if (seen.find(s[right]) != seen.end() && seen[s[right]] >= left) {
                left = seen[s[right]] + 1;
            }
            seen[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
    },
    pythonMissingEdgeCase: {
      lang: 'python',
      title: 'Python Unchecked Boundary Edge Cases',
      code: `class Solution:
    def trap(self, height: list[int]) -> int:
        # Missing length < 3 boundary check
        left, right = 0, len(height) - 1
        left_max, right_max = height[left], height[right]
        water = 0
        while left < right:
            if left_max < right_max:
                left += 1
                left_max = max(left_max, height[left])
                water += left_max - height[left]
            else:
                right -= 1
                right_max = max(right_max, height[right])
                water += right_max - height[right]
        return water`,
    },
  };

  const [code, setCode] = useState<string>(samplePresets.bruteTwoSum.code);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AIReviewResult | null>(() => 
    analyzeCodeLocally(samplePresets.bruteTwoSum.code, 'cpp')
  );
  const [copied, setCopied] = useState<boolean>(false);

  const handlePresetSelect = (presetKey: string) => {
    const p = samplePresets[presetKey];
    setLanguage(p.lang);
    setCode(p.code);
    setResult(analyzeCodeLocally(p.code, p.lang));
    toast.info(`Loaded preset: ${p.title}`);
  };

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    await new Promise((res) => setTimeout(res, 400));
    const res = analyzeCodeLocally(code, language);
    setResult(res);
    setAnalyzing(false);
    toast.success('Code intelligence analysis completed');
  };

  const handleCopyOptimized = () => {
    if (result?.optimizedCode) {
      navigator.clipboard.writeText(result.optimizedCode);
      setCopied(true);
      toast.success('Optimized code copied');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Workspace Title & Presets */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Algorithmic Code Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              AI Code Review & Optimization
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Deep static evaluation of Big-O complexity, missing edge case guards, and automatic $O(n)$ refactoring.
            </p>
          </div>

          {/* Quick Presets Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-zinc-500 font-mono text-[11px] whitespace-nowrap">Load Preset:</span>
            <button
              onClick={() => handlePresetSelect('bruteTwoSum')}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-300 whitespace-nowrap transition-colors"
            >
              O(n²) Brute Force
            </button>
            <button
              onClick={() => handlePresetSelect('linearWindow')}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-300 whitespace-nowrap transition-colors"
            >
              O(n) Optimal Window
            </button>
            <button
              onClick={() => handlePresetSelect('pythonMissingEdgeCase')}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-300 whitespace-nowrap transition-colors"
            >
              Python Edge Case
            </button>
          </div>
        </div>

        {/* Two-Column Workstation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Code Input & Editor */}
          <div className="lg:col-span-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] overflow-hidden shadow-xl flex flex-col h-[640px]">
            {/* Toolbar */}
            <div className="h-10 bg-[#070B13] border-b border-white/[0.08] px-4 flex items-center justify-between select-none shrink-0">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-brand-400" />
                <span className="text-xs font-semibold text-zinc-300 font-mono">
                  Source Implementation
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as CodeLanguage)}
                  className="bg-[#0D1424] border border-white/[0.08] text-xs font-mono text-zinc-300 px-2.5 py-1 rounded focus:outline-none"
                >
                  <option value="cpp">C++</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="javascript">JavaScript</option>
                </select>

                <button
                  onClick={handleRunAnalysis}
                  disabled={analyzing}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-colors disabled:opacity-50"
                >
                  <Sparkles className={`w-3 h-3 ${analyzing ? 'animate-spin' : ''}`} />
                  <span>{analyzing ? 'Analyzing...' : 'Run Review'}</span>
                </button>
              </div>
            </div>

            {/* Code Input Textarea */}
            <div className="flex-1 p-3 bg-[#060910] overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent font-mono text-xs text-zinc-200 resize-none focus:outline-none leading-relaxed"
                placeholder="Paste your algorithmic solution here for instant AI review..."
                spellCheck={false}
              />
            </div>

            {/* Input Status Bar */}
            <div className="h-8 bg-[#070B13] border-t border-white/[0.06] px-3 flex items-center justify-between text-[11px] text-zinc-500 font-mono shrink-0">
              <span>{code.split('\n').length} lines • {code.length} characters</span>
              <span>Ready for Review</span>
            </div>
          </div>

          {/* Right Column: AI Analysis & Optimization Output */}
          <div className="lg:col-span-6 rounded-xl bg-[#0A0E18] border border-white/[0.08] overflow-hidden shadow-xl flex flex-col h-[640px]">
            {/* Header */}
            <div className="h-10 bg-[#070B13] border-b border-white/[0.08] px-4 flex items-center justify-between select-none shrink-0">
              <span className="text-xs font-semibold text-zinc-300 font-mono">
                CodeArena Intelligence Report
              </span>
              {result && (
                <div className="flex items-center gap-2">
                  <Link
                    href="/practice/two-sum"
                    className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 font-medium"
                  >
                    <span>Open in IDE</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {result ? (
                <>
                  {/* Top Score & Verdict Card */}
                  <div className="p-4 rounded-xl bg-[#070B13] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                        Overall Engineering Score
                      </span>
                      <div className="text-3xl font-bold font-mono text-white flex items-baseline gap-1 mt-0.5">
                        <span>{result.score}</span>
                        <span className="text-xs text-zinc-500 font-normal">/ 100</span>
                      </div>
                      <div className="text-xs text-brand-400 font-medium mt-1">
                        {result.verdict}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-right font-mono text-xs">
                      <div className="text-zinc-400">
                        Correctness: <span className="text-white font-semibold">{result.correctnessScore}%</span>
                      </div>
                      <div className="text-zinc-400">
                        Edge Cases: <span className="text-white font-semibold">{result.edgeCasesScore}%</span>
                      </div>
                      <div className="text-zinc-400">
                        Readability: <span className="text-white font-semibold">{result.readabilityScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Asymptotic Complexity Transition */}
                  <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2 font-mono text-xs">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-sans">
                      Asymptotic Transition
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 rounded bg-[#070A12] border border-white/[0.04]">
                        <span className="text-[10px] text-zinc-500 block">Current Asymptotics</span>
                        <div className="text-amber-400 font-bold mt-1">
                          {result.currentComplexity.time} Time
                        </div>
                        <div className="text-zinc-400 text-[11px]">
                          {result.currentComplexity.space} Space
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#070A12] border border-emerald-500/20">
                        <span className="text-[10px] text-emerald-400 block">Target Benchmark</span>
                        <div className="text-emerald-400 font-bold mt-1">
                          {result.suggestedComplexity.time} Time
                        </div>
                        <div className="text-zinc-400 text-[11px]">
                          {result.suggestedComplexity.space} Space
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300 leading-relaxed">
                    {result.summary}
                  </div>

                  {/* Detected Bottlenecks & Issues */}
                  {result.issues.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                        Identified Bottlenecks ({result.issues.length})
                      </span>
                      {result.issues.map((issue, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-[#070B13] border border-white/[0.07] space-y-1 text-xs"
                        >
                          <div className="flex items-center gap-1.5 font-semibold text-rose-400">
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

                  {/* Strengths */}
                  {result.strengths.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                        Implementation Strengths
                      </span>
                      <div className="space-y-1">
                        {result.strengths.map((str, i) => (
                          <div key={i} className="flex items-start gap-2 text-zinc-300 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{str}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optimal Refactor */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                        Optimal Asymptotic Refactor
                      </span>
                      <button
                        onClick={handleCopyOptimized}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-xs text-zinc-300 transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy Solution'}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-[#04070D] border border-white/[0.07] overflow-x-auto font-mono text-[11px] text-zinc-300 max-h-56 whitespace-pre leading-relaxed">
                      {result.optimizedCode}
                    </div>

                    <p className="text-[11px] text-zinc-500 italic">
                      {result.optimizationRationale}
                    </p>
                  </div>
                </>
              ) : (
                <div className="py-20 text-center text-zinc-500 text-xs">
                  Click "Run Review" to generate full asymptotic evaluation.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

