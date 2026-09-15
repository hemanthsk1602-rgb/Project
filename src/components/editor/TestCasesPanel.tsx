'use client';

import React, { useState } from 'react';
import { ExecutionResult, Problem, TestCase } from '@/lib/types';
import { 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Clock, 
  Cpu, 
  AlertCircle, 
  ChevronUp, 
  ChevronDown,
  Plus,
  Play
} from 'lucide-react';

interface TestCasesPanelProps {
  problem: Problem;
  executionResult: ExecutionResult | null;
  isRunning: boolean;
  onRunCustom: (customInput: string) => void;
}

export function TestCasesPanel({
  problem,
  executionResult,
  isRunning,
  onRunCustom,
}: TestCasesPanelProps) {
  const [activeTab, setActiveTab] = useState<'cases' | 'output' | 'custom'>('cases');
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>('[4, 5, 6, 7]\n11');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const visibleCases = problem.testCases.filter((tc) => !tc.isHidden);
  const currentCase = visibleCases[selectedCaseIdx] || visibleCases[0];
  const caseResult = executionResult?.testCaseResults?.[selectedCaseIdx];

  return (
    <div className={`w-full bg-[#070A12] border-t border-white/[0.08] flex flex-col transition-all duration-150 ${
      isCollapsed ? 'h-9' : 'h-64 sm:h-72'
    }`}>
      {/* Panel Tabs Header */}
      <div className="h-9 px-3 bg-[#05080E] border-b border-white/[0.06] flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setActiveTab('cases'); setIsCollapsed(false); }}
            className={`px-3 py-1 text-xs font-medium rounded-t transition-colors ${
              activeTab === 'cases' && !isCollapsed
                ? 'text-white bg-[#070A12] border-t border-x border-white/[0.08]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Test Cases ({visibleCases.length})
          </button>

          <button
            onClick={() => { setActiveTab('custom'); setIsCollapsed(false); }}
            className={`px-3 py-1 text-xs font-medium rounded-t transition-colors ${
              activeTab === 'custom' && !isCollapsed
                ? 'text-white bg-[#070A12] border-t border-x border-white/[0.08]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Custom Input
          </button>

          <button
            onClick={() => { setActiveTab('output'); setIsCollapsed(false); }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-t transition-colors ${
              activeTab === 'output' && !isCollapsed
                ? 'text-white bg-[#070A12] border-t border-x border-white/[0.08]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Execution Logs</span>
            {executionResult && (
              <span
                className={`w-2 h-2 rounded-full ${
                  executionResult.status === 'Accepted' ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Demo Judge Badge */}
          <span className="hidden md:inline text-[10px] font-mono text-zinc-500 bg-white/[0.02] border border-white/[0.05] px-2 py-0.5 rounded">
            ⚡ Deterministic Sandbox Engine
          </span>

          {/* Collapse / Expand Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-zinc-400 hover:text-zinc-200 p-1"
            title={isCollapsed ? 'Expand Test Panel' : 'Collapse Test Panel'}
          >
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Panel Content (Visible when not collapsed) */}
      {!isCollapsed && (
        <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
          {/* Test Cases View */}
          {activeTab === 'cases' && (
            <div className="space-y-3">
              {/* Case Selector Pills */}
              <div className="flex items-center gap-2">
                {visibleCases.map((tc, idx) => {
                  const res = executionResult?.testCaseResults?.[idx];
                  return (
                    <button
                      key={tc.id}
                      onClick={() => setSelectedCaseIdx(idx)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors border ${
                        selectedCaseIdx === idx
                          ? 'bg-[#121B30] text-white border-brand-500/50'
                          : 'bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:bg-white/[0.06]'
                      }`}
                    >
                      {res ? (
                        res.passed ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-rose-400" />
                        )
                      ) : null}
                      <span>Case {idx + 1}</span>
                    </button>
                  );
                })}
              </div>

              {/* Execution Status Banner */}
              {executionResult && (
                <div
                  className={`p-2 rounded border flex items-center justify-between ${
                    executionResult.status === 'Accepted'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {executionResult.status === 'Accepted' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="font-bold">{executionResult.status}</span>
                    <span className="text-zinc-400 font-sans text-xs">
                      ({executionResult.totalPassed}/{executionResult.totalCases} cases passed)
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {executionResult.executionTimeMs}ms
                    </span>
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3" /> {executionResult.memoryMb} MB
                    </span>
                  </div>
                </div>
              )}

              {/* Current Case Details */}
              {currentCase && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
                      Input
                    </span>
                    <div className="p-2.5 rounded bg-[#0A0F1A] border border-white/[0.06] text-zinc-200 whitespace-pre">
                      {currentCase.input}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
                      Expected Output
                    </span>
                    <div className="p-2.5 rounded bg-[#0A0F1A] border border-white/[0.06] text-emerald-400 whitespace-pre">
                      {currentCase.expectedOutput}
                    </div>
                  </div>
                </div>
              )}

              {/* Actual Output if executed */}
              {caseResult && (
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
                    Actual Sandbox Output
                  </span>
                  <div
                    className={`p-2.5 rounded border whitespace-pre ${
                      caseResult.passed
                        ? 'bg-[#0A0F1A] border-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/5 border-rose-500/20 text-rose-300'
                    }`}
                  >
                    {caseResult.actualOutput}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Custom Input Tab */}
          {activeTab === 'custom' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
                  Custom Test Input
                </span>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded bg-[#0A0F1A] border border-white/[0.08] text-zinc-200 font-mono text-xs focus:outline-none focus:border-brand-500 resize-none"
                  placeholder="Enter custom problem input..."
                />
              </div>
              <button
                onClick={() => onRunCustom(customInput)}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold disabled:opacity-50 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Run Custom Test</span>
              </button>
            </div>
          )}

          {/* Execution Logs Tab */}
          {activeTab === 'output' && (
            <div className="space-y-2">
              <div className="p-3 rounded bg-[#04060A] border border-white/[0.07] text-zinc-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {executionResult ? (
                  <>
                    <div className="text-zinc-500">{'// CodeArena Execution Telemetry'}</div>
                    <div>Status: {executionResult.status}</div>
                    <div>Runtime: {executionResult.executionTimeMs} ms</div>
                    <div>Memory: {executionResult.memoryMb} MB</div>
                    <div className="mt-2 text-zinc-400">{executionResult.compileOutput}</div>
                  </>
                ) : (
                  <span className="text-zinc-600">
                    No run logs yet. Click "Run" or press Ctrl+Enter to execute test suite.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
