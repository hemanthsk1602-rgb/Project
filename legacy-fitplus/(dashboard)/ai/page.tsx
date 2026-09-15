'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, AlertTriangle, CornerDownLeft } from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';
import { aiService } from '@/services/ai.service';
import { AIMessage } from '@/ai/providers/types';

export default function AICorePage() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content:
        `Hello Alex! I am your **NEXUS AI Core**.\n\n` +
        `I continuously analyze your **DBMS exam countdown (4 days)**, your **₹800 monthly remaining budget**, and your **Push Day workout** to optimize your schedule.\n\n` +
        `How can I help you today? You can ask me to re-balance your study hours, adjust your workout, or audit your spending.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: AIMessage = { role: 'user', content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.sendChatMessage(updated);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.content,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `We encountered an issue processing your query: ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'Can I finish my DBMS assignment tonight?',
    'Reduce my workout duration for exam week',
    'How should I spend my remaining ₹800 budget?',
    'What SkillForge coding topic should I learn next?',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark shrink-0">
        <div className="flex items-center gap-3">
          <NexusOrb size="md" state={loading ? 'thinking' : 'idle'} />
          <div>
            <h1 className="font-heading font-extrabold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <span>NEXUS AI Core Assistant</span>
              <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-bold">
                Cross-Module
              </span>
            </h1>
            <p className="text-xs text-gray-500">
              Provider: {aiService.getProviderName()} {!aiService.isLive() && '(Demo Mode)'}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role !== 'user' && (
              <div className="shrink-0 pt-1">
                <NexusOrb size="sm" state="idle" />
              </div>
            )}

            <div
              className={`max-w-2xl p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-xs'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border border-gray-200/60 dark:border-gray-700/60 rounded-tl-xs'
              }`}
            >
              {m.content}
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                A
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <NexusOrb size="sm" state="thinking" />
            <span>NEXUS Assistant is reasoning across your schedule and tasks...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 shrink-0 no-scrollbar">
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p)}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-nexus-dark-card border border-gray-200 dark:border-gray-800 text-[11px] text-gray-600 dark:text-gray-300 hover:border-violet-400 whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSend}
        className="p-2 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask NEXUS about your exam schedule, workout, budget, or career..."
          className="flex-1 px-4 py-2.5 bg-transparent text-sm focus:outline-none text-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-btn bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

