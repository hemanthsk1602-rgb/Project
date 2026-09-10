'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Flame,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { generateCoachResponse } from '@/lib/ai/coach';
import { ChatMessage } from '@/lib/types';
import { INITIAL_WEEKLY_REPORT } from '@/lib/data/initialData';

export default function AICoachPage() {
  const { profile, workoutPlan, recovery } = useFitness();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello ${profile.name}! I'm FitPlus AI, your personal athletic performance coach. I've analyzed your ${profile.trainingStyle} routine, your ${profile.streak}-day streak, and your current recovery rating (${recovery.score}/100). How can I assist your training or nutrition right now?`,
      timestamp: 'Just now',
      suggestions: [
        'What should I train today?',
        'How can I improve my pull-ups?',
        'How much protein should I eat?',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What should I train today?',
    'How can I improve my pull-ups?',
    'Why is my progress slowing down?',
    'Create a workout for me.',
    'How much protein should I eat?',
    'What should I do on a rest day?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate realistic AI thought process & streaming typing effect
    setTimeout(() => {
      const replyText = generateCoachResponse(text, {
        profile,
        recovery,
        workoutPlan,
      });

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      {/* Top Header */}
      <TopHeader
        title="FitPlus AI Coach"
        subtitle="Your personalized AI athletic mentor tuned to your biometrics and daily performance"
      />

      {/* Grid: Left is Weekly AI Report (Section 17), Right is Interactive Chat (Section 16) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Weekly AI Report (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Your Weekly AI Report</h3>
                <p className="text-[11px] text-slate-400">{INITIAL_WEEKLY_REPORT.weekRange}</p>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Consistency
                </span>
                <span className="text-xl font-black text-white mt-0.5 block">
                  {INITIAL_WEEKLY_REPORT.consistencyScore}%
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">+12% vs last mo</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Strength
                </span>
                <span className="text-xl font-black text-cyan-400 mt-0.5 block">
                  +{INITIAL_WEEKLY_REPORT.strengthChange}%
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Compound power</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Nutrition
                </span>
                <span className="text-xl font-black text-emerald-400 mt-0.5 block">
                  {INITIAL_WEEKLY_REPORT.nutritionScore}%
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Macro adherence</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Recovery
                </span>
                <span className="text-xl font-black text-amber-400 mt-0.5 block">
                  {INITIAL_WEEKLY_REPORT.recoveryScore}%
                </span>
                <span className="text-[10px] text-slate-400 font-medium">7h 40m avg sleep</span>
              </div>
            </div>

            {/* AI Analysis Paragraph */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
              "{INITIAL_WEEKLY_REPORT.aiAnalysis}"
            </div>

            {/* Next Week's Focus */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2.5">
                Next Week's Focus Areas
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                {INITIAL_WEEKLY_REPORT.focusAreas.map((focus, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: AI Chat Interface (8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col h-[650px] glass-card rounded-3xl border border-slate-800 overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-black shadow-md shadow-emerald-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Coach Titan</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[11px] text-slate-400">
                  FitPlus Intelligence • Connected to your biometrics
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setMessages([
                  {
                    id: 'msg-reset',
                    sender: 'assistant',
                    text: `Conversation restarted. Ready for today's briefing, ${profile.name}!`,
                    timestamp: 'Just now',
                  },
                ])
              }
              className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
              title="Clear Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-lg ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        isUser
                          ? 'bg-emerald-500 text-black font-medium shadow-md'
                          : 'bg-slate-900/80 border border-slate-800 text-slate-200'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block px-1">
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30 font-bold text-xs">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Realistic Typing Indicator Animation */}
            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900/80 border border-slate-800 px-4 py-3 rounded-2xl flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts Pills */}
          <div className="px-6 py-2 border-t border-slate-800/60 bg-slate-950/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
              Suggestions:
            </span>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700/60 text-xs whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 border-t border-slate-800/80 bg-slate-900/40 flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask anything about exercises, programming, recovery, or diet..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-500/20 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

