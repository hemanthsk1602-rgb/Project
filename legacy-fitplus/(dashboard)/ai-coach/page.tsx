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
  Zap,
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
      text: `Hello ${profile.name}! I'm FitPlus AI, your intelligent fitness companion. I've analyzed your ${profile.trainingStyle} routine, your ${profile.streak}-day streak, and your current recovery readiness rating (${recovery.score}%). What aspect of your training, form, or nutrition can I optimize for you today?`,
      timestamp: 'Just now',
      suggestions: [
        "Create today's workout",
        'Improve my push-ups',
        'How should I train shoulders?',
        'Analyze my progress',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Create today's workout",
    'Improve my push-ups',
    'How should I train shoulders?',
    'Analyze my progress',
    'How much protein do I need?',
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
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      {/* Top Header */}
      <TopHeader
        title="FitPlus AI Coach"
        subtitle="Your intelligent fitness companion tuned to your biometrics and daily performance"
      />

      {/* Grid: Left is Weekly AI Report, Right is Interactive Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Weekly AI Report (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-[#D5FF3E]/15 text-[#D5FF3E] border border-[#D5FF3E]/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-outfit text-base font-bold text-white">Weekly AI Report</h3>
                <p className="text-[11px] text-white/50">{INITIAL_WEEKLY_REPORT.weekRange}</p>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">
                  Consistency
                </span>
                <span className="font-outfit text-xl font-extrabold text-white mt-0.5 block">
                  {INITIAL_WEEKLY_REPORT.consistencyScore}%
                </span>
                <span className="text-[10px] text-[#D5FF3E] font-medium">+12% vs last mo</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">
                  Strength
                </span>
                <span className="font-outfit text-xl font-extrabold text-cyan-400 mt-0.5 block">
                  +{INITIAL_WEEKLY_REPORT.strengthChange}%
                </span>
                <span className="text-[10px] text-white/40 font-medium">Compound power</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">
                  Nutrition
                </span>
                <span className="font-outfit text-xl font-extrabold text-[#D5FF3E] mt-0.5 block">
                  {INITIAL_WEEKLY_REPORT.nutritionScore}%
                </span>
                <span className="text-[10px] text-white/40 font-medium">Macro adherence</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">
                  Recovery
                </span>
                <span className="font-outfit text-xl font-extrabold text-amber-400 mt-0.5 block">
                  {INITIAL_WEEKLY_REPORT.recoveryScore}%
                </span>
                <span className="text-[10px] text-white/40 font-medium">7h 40m avg sleep</span>
              </div>
            </div>

            {/* AI Analysis Paragraph */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-xs text-white/80 leading-relaxed italic">
              &quot;{INITIAL_WEEKLY_REPORT.aiAnalysis}&quot;
            </div>

            {/* Next Week's Focus */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D5FF3E] block mb-2.5">
                Upcoming Focus Areas
              </span>
              <ul className="space-y-2 text-xs text-white/80">
                {INITIAL_WEEKLY_REPORT.focusAreas.map((focus, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D5FF3E] shrink-0 mt-0.5" />
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: AI Chat Interface (8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col h-[650px] p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden">
          {/* Chat Header */}
          <div className="pb-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D5FF3E] to-emerald-400 flex items-center justify-center text-black shadow-lg shadow-[#D5FF3E]/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-outfit text-sm font-bold text-white flex items-center gap-2">
                  <span>FitPlus AI Coach</span>
                  <span className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-pulse" />
                </h4>
                <p className="text-[11px] text-white/50">
                  Intelligent Biomechanical Engine • Connected to your logs
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
              className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 py-4 overflow-y-auto space-y-4 scrollbar-thin">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-[#D5FF3E]/15 text-[#D5FF3E] flex items-center justify-center shrink-0 border border-[#D5FF3E]/30">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-lg ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        isUser
                          ? 'bg-[#D5FF3E] text-black font-bold shadow-lg shadow-[#D5FF3E]/20 rounded-tr-none'
                          : 'bg-black/40 border border-white/10 text-white/90 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-white/40 mt-1 block px-2">
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/20 font-bold text-xs">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Realistic Typing Indicator Animation */}
            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-xl bg-[#D5FF3E]/15 text-[#D5FF3E] flex items-center justify-center shrink-0 border border-[#D5FF3E]/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-black/40 border border-white/10 px-4 py-3 rounded-2xl flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#D5FF3E] animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts Pills */}
          <div className="py-2.5 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-thin">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider shrink-0">
              Suggestions:
            </span>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="px-3.5 py-1 rounded-full bg-white/5 hover:bg-[#D5FF3E]/20 text-white/70 hover:text-[#D5FF3E] border border-white/10 text-xs whitespace-nowrap transition-colors"
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
            className="pt-3 border-t border-white/10 flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask anything about exercises, programming, recovery, or diet..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-5 py-3 rounded-full bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D5FF3E] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-5 py-3 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black font-extrabold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#D5FF3E]/20 hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
