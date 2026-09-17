'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { AITutorMessage } from '@/lib/types';
import { generateTutorResponse } from '@/lib/ai/tutor-engine';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  HelpCircle, 
  Code2, 
  ArrowRight, 
  CheckCircle2,
  ListFilter,
  Check,
  Copy
} from 'lucide-react';

export default function AITutorPage() {
  const topics = [
    {
      id: 'two-pointers',
      title: 'Two Pointers Convergence',
      skill: 'Linear Array Invariants',
      goal: 'Master inward pointer convergence and 3Sum reduction',
      problemSlug: 'two-sum',
    },
    {
      id: 'sliding-window',
      title: 'Dynamic Sliding Window',
      skill: 'Substring Optimization',
      goal: 'Eliminate nested loops using last-seen character indices',
      problemSlug: 'longest-substring-without-repeating-characters',
    },
    {
      id: 'monotonic-stack',
      title: 'Monotonic Stacks',
      skill: 'Next Greater Element',
      goal: 'Achieve O(n) boundary detection for elevation & histogram problems',
      problemSlug: 'trapping-rain-water',
    },
    {
      id: 'tree-dfs',
      title: 'Binary Tree Post-Order DFS',
      skill: 'Tree Path Sums',
      goal: 'Bottom-up branch contribution computation with negative pruning',
      problemSlug: 'binary-tree-maximum-path-sum',
    },
    {
      id: 'dp-tabulation',
      title: 'DP: Memoization to Tabulation',
      skill: 'Optimal Substructure',
      goal: 'Convert top-down call stack recursion into iterative bottom-up array state',
      problemSlug: 'coin-change',
    },
    {
      id: 'topological-sort',
      title: 'Topological Sort (Kahn\'s Algorithm)',
      skill: 'Graph Dependency Resolution',
      goal: 'Detect cycles and order prerequisites using in-degree BFS',
      problemSlug: 'course-schedule',
    },
  ];

  const [currentTopicIdx, setCurrentTopicIdx] = useState(1);
  const currentTopic = topics[currentTopicIdx];

  const [messages, setMessages] = useState<AITutorMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      timestamp: '10:00 AM',
      content: `Welcome to the **CodeArena Socratic Tutor**.

We are currently exploring **${currentTopic.title}**.

The core invariant of sliding window is that both the left and right pointers **only move forward monotonically**. Because each element enters the window at most once and leaves at most once, the total operations across the entire array are strictly bounded by $2n$ — yielding an optimal **$O(n)$** runtime.

How would you like to proceed?`,
      codeSnippet: `// Standard Dynamic Sliding Window Template
int left = 0, bestResult = 0;
for (int right = 0; right < n; ++right) {
    // 1. Include nums[right] in current window
    updateState(nums[right]);

    // 2. Shrink window while invariant is violated
    while (windowIsInvalid()) {
        removeState(nums[left++]);
    }

    // 3. Current window [left, right] is now guaranteed valid
    bestResult = max(bestResult, right - left + 1);
}`,
      followUpSuggestions: [
        'Explain the invariant in detail',
        'Give a concrete step-by-step example',
        'Quiz me on sliding window',
        'What edge cases break this pattern?',
      ],
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: AITutorMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    setTimeout(() => {
      const response = generateTutorResponse(
        textToSend,
        {
          topic: currentTopic.title,
          difficulty: 'Medium',
        },
        messages
      );
      setMessages((prev) => [...prev, response]);
      setLoading(false);
    }, 450);
  };

  const handleTopicChange = (idx: number) => {
    setCurrentTopicIdx(idx);
    const selected = topics[idx];
    setMessages([
      {
        id: `topic-${Date.now()}`,
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Switched topic to **${selected.title}**.

**Current Skill Focus:** ${selected.skill}  
**Learning Goal:** ${selected.goal}

Let's develop your intuition. Where would you like to begin?`,
        followUpSuggestions: [
          'Explain the core concept',
          'Give me an example walkthrough',
          'Quiz me on this topic',
        ],
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 flex flex-col">
        {/* Workspace Top Goal Header */}
        <div className="p-4 rounded-xl bg-[#0B101C] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                Active Topic
              </span>
              <h1 className="text-base font-bold text-white font-mono">
                {currentTopic.title}
              </h1>
            </div>
            <div className="text-xs text-zinc-400 font-sans flex items-center gap-3">
              <span><strong>Skill:</strong> {currentTopic.skill}</span>
              <span className="text-zinc-600">•</span>
              <span><strong>Goal:</strong> {currentTopic.goal}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/practice/${currentTopic.problemSlug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Practice Associated Problem</span>
            </Link>
          </div>
        </div>

        {/* Workstation Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[580px]">
          {/* Left Column: Topic Navigator */}
          <div className="lg:col-span-4 rounded-xl bg-[#0A0E18] border border-white/[0.08] p-4 flex flex-col space-y-3 shrink-0">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-xs font-semibold text-zinc-300 font-mono">
              <div className="flex items-center gap-1.5">
                <ListFilter className="w-4 h-4 text-brand-400" />
                <span>Learning Modules</span>
              </div>
              <span className="text-zinc-500 text-[11px]">{topics.length} topics</span>
            </div>

            <div className="space-y-1.5 flex-1 overflow-y-auto">
              {topics.map((t, idx) => {
                const isActive = currentTopicIdx === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTopicChange(idx)}
                    className={`w-full p-3 rounded-lg text-left transition-all border ${
                      isActive
                        ? 'bg-[#101726] border-brand-500/40 text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className={isActive ? 'text-brand-300 font-semibold' : ''}>
                        {t.title}
                      </span>
                      {isActive && <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-1 truncate">
                      {t.skill}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/[0.06] text-[11px] text-zinc-500 font-mono">
              💡 CodeArena Socratic Method: Learning through guided questions & invariants.
            </div>
          </div>

          {/* Right Column: Interactive Conversational Area */}
          <div className="lg:col-span-8 rounded-xl bg-[#0A0E18] border border-white/[0.08] flex flex-col overflow-hidden shadow-xl">
            {/* Messages Thread */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-xl p-4 text-xs leading-relaxed space-y-3 ${
                      msg.role === 'user'
                        ? 'bg-brand-600 text-white font-sans'
                        : 'bg-[#060910] border border-white/[0.07] text-zinc-300 font-sans'
                    }`}
                  >
                    <div className="space-y-2 whitespace-pre-wrap">
                      {msg.content}
                    </div>

                    {msg.codeSnippet && (
                      <div className="p-3 rounded-lg bg-[#030508] border border-white/[0.08] font-mono text-[11px] text-zinc-200 overflow-x-auto relative group">
                        <pre>
                          <code>{msg.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                      <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono block">
                          Suggested Inquiries
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.followUpSuggestions.map((sug, i) => (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              key={i}
                              onClick={() => handleSendMessage(sug)}
                              className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-[11px] border border-white/[0.06] transition-colors"
                            >
                              {sug}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-xs text-zinc-400"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1.5 p-3 rounded-xl bg-[#060910] border border-white/[0.07]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" />
                    <span className="font-mono text-[11px] text-zinc-500 ml-2">Structuring Socratic guidance...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Socratic Action Prompt Chips */}
            <div className="px-4 py-2 bg-[#070B13] border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto text-xs font-mono">
              <button
                onClick={() => handleSendMessage(`Explain the foundational intuition of ${currentTopic.title}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-300 whitespace-nowrap transition-colors"
              >
                <BookOpen className="w-3 h-3 text-brand-400" />
                <span>Explain Concept</span>
              </button>

              <button
                onClick={() => handleSendMessage(`Walk me through a step-by-step example of ${currentTopic.title}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-300 whitespace-nowrap transition-colors"
              >
                <Lightbulb className="w-3 h-3 text-amber-400" />
                <span>Give Example</span>
              </button>

              <button
                onClick={() => handleSendMessage(`Give me a hint for implementing ${currentTopic.title}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-300 whitespace-nowrap transition-colors"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Give Hint</span>
              </button>

              <button
                onClick={() => handleSendMessage(`Quiz me with a competitive programming puzzle on ${currentTopic.title}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-300 whitespace-nowrap transition-colors"
              >
                <HelpCircle className="w-3 h-3 text-emerald-400" />
                <span>Quiz Me</span>
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#05080E] border-t border-white/[0.08] flex items-center gap-2">
              <input
                type="text"
                placeholder={`Ask the CodeArena Socratic Tutor about ${currentTopic.title}...`}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputPrompt);
                }}
                className="flex-1 bg-[#090D16] border border-white/[0.08] focus:border-brand-500 rounded-lg px-4 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage(inputPrompt)}
                disabled={loading || !inputPrompt.trim()}
                className="p-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white disabled:opacity-40 transition-colors shadow-glow-brand"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

