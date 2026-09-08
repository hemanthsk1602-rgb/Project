'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Plus,
  TrendingDown,
  Calculator,
  Gamepad2,
  Receipt,
  RotateCcw,
  Check,
  ChevronRight,
  PieChart,
  Terminal,
  Mic,
  Volume2,
  Lock,
  Key,
  HelpCircle,
  ListTodo,
  Code2,
  Layers,
  Dumbbell,
  Bot,
  Utensils,
  HeartPulse,
  TrendingUp,
  ShieldCheck,
  Copy,
  Info,
} from 'lucide-react';
import { PYTHON_PROJECTS_LIST } from '@/data/portfolioData';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Web' | 'AI/ML' | 'Python'>('All');

  // =========================================================================
  // 1. FITPLUS STATE
  // =========================================================================
  const [workoutMode, setWorkoutMode] = useState<'gym' | 'calisthenics' | 'hybrid'>('gym');

  const fitPlusModes = {
    gym: {
      title: 'Upper Body Hypertrophy Split',
      split: 'Chest, Shoulders & Triceps Protocol',
      duration: '52 min',
      volume: '14,280 kg',
      exercises: [
        { name: 'Incline Dumbbell Press', sets: '4 sets × 8-10 reps', target: 'Upper Chest' },
        { name: 'Overhead Barbell Press', sets: '3 sets × 8 reps', target: 'Anterior Delts' },
        { name: 'Cable Lateral Raises', sets: '4 sets × 15 reps', target: 'Lateral Delts' },
      ],
      aiInsight:
        'Readiness Score 94% (Optimal). Progressive overload recommendation: +2.5kg on pressing compound sets today.',
    },
    calisthenics: {
      title: 'Bodyweight Mastery & Planche',
      split: 'Lever & Pull-Up Progression Protocol',
      duration: '45 min',
      volume: 'Bodyweight + 14kg',
      exercises: [
        { name: 'Weighted Pull-Ups', sets: '4 sets × 6 reps (+14kg)', target: 'Lats & Biceps' },
        { name: 'Strict Ring Dips', sets: '4 sets × 10 reps', target: 'Chest & Triceps' },
        { name: 'Tuck Front Lever Holds', sets: '5 sets × 12s isometric', target: 'Scapula & Core' },
      ],
      aiInsight:
        'Scapular stabilization verified strong. Recommended focus on 2s pause at top contraction.',
    },
    hybrid: {
      title: 'Hybrid Athletic Conditioning',
      split: 'Strength + Explosive Calisthenics',
      duration: '50 min',
      volume: '10,800 kg + Plyo',
      exercises: [
        { name: 'Barbell Back Squats', sets: '4 sets × 6 reps', target: 'Legs & Core' },
        { name: 'Explosive Muscle-Ups', sets: '4 sets × 5 reps', target: 'Upper Body Power' },
        { name: 'Kettlebell Swings', sets: '3 sets × 15 reps', target: 'Posterior Chain' },
      ],
      aiInsight:
        'Cardiovascular endurance matched with compound strength. Keep intra-set rest to 90 seconds.',
    },
  };

  const currentRoutine = fitPlusModes[workoutMode];

  // =========================================================================
  // 2. PROJECT JARVIS (AI VOICE ASSISTANT) STATE
  // =========================================================================
  const [jarvisActiveTab, setJarvisActiveTab] = useState<'simulator' | 'code'>('simulator');
  const [jarvisSpeaking, setJarvisSpeaking] = useState(false);
  const [jarvisOutput, setJarvisOutput] = useState<string>(
    'Hello sir. I am online and listening for your command.'
  );
  const [jarvisLastCommand, setJarvisLastCommand] = useState<string>('hello jarvis');

  const handleJarvisCommand = (command: string) => {
    setJarvisSpeaking(true);
    setJarvisLastCommand(command);

    if (command === 'time') {
      const timeStr = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setJarvisOutput(`Sir, the time is ${timeStr}. All system metrics nominal.`);
    } else if (command === 'date') {
      const dateStr = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setJarvisOutput(`Sir, today is ${dateStr}.`);
    } else if (command === 'youtube') {
      setJarvisOutput('Opening YouTube, sir... Launching browser pipeline.');
    } else if (command === 'vscode') {
      setJarvisOutput('Opening Visual Studio Code, sir. Launching developer environment.');
    } else if (command === 'search') {
      setJarvisOutput('Searching Google for "Quantum Computing & Neural Architectures"...');
    } else if (command === 'hello') {
      setJarvisOutput('Hello sir. How can I assist you with your projects today?');
    }

    setTimeout(() => {
      setJarvisSpeaking(false);
    }, 2400);
  };

  // =========================================================================
  // 3. PYTHON PROJECTS SUITE STATE
  // =========================================================================
  const [selectedPythonApp, setSelectedPythonApp] = useState<string>('password-generator');
  const [showPythonCodeModal, setShowPythonCodeModal] = useState(false);

  // App 1: Password Generator
  const [pwdLength, setPwdLength] = useState(14);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('k9#Xm2$vP!9qLw');
  const [pwdCopied, setPwdCopied] = useState(false);

  const generateNewPassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let res = '';
    for (let i = 0; i < pwdLength; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(res);
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setPwdCopied(true);
    setTimeout(() => setPwdCopied(false), 2000);
  };

  // App 2: Trivia Quiz
  const quizQuestions = [
    {
      q: 'Who is the GOAT of Cricket?',
      a: 'MS Dhoni',
      hints: 'Captain Cool, #7, 2011 World Cup Winning Six',
    },
    {
      q: 'What is 5 * 5?',
      a: '25',
      hints: 'Square of five',
    },
    {
      q: 'Which programming language powers AI, PyTorch & TensorFlow?',
      a: 'Python',
      hints: 'Created by Guido van Rossum',
    },
  ];
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizInput, setQuizInput] = useState('');
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentQ = quizQuestions[currentQuizIndex];
    if (quizInput.trim().toLowerCase() === currentQ.a.toLowerCase()) {
      setQuizScore((prev) => prev + 1);
      setQuizFeedback(`✅ Correct Answer! Your score is: ${quizScore + 1}`);
    } else {
      setQuizFeedback(`❌ Incorrect Answer. Correct answer was: ${currentQ.a}`);
    }
    setTimeout(() => {
      setQuizInput('');
      setQuizFeedback(null);
      setCurrentQuizIndex((prev) => (prev + 1) % quizQuestions.length);
    }, 2200);
  };

  // App 3: Rock Paper Scissors
  const [rpsResult, setRpsResult] = useState<string>('Choose your move to play against the computer!');
  const [rpsScore, setRpsScore] = useState({ wins: 0, ties: 0, losses: 0 });

  const playRps = (playerChoice: 'rock' | 'paper' | 'scissors') => {
    const choices: ('rock' | 'paper' | 'scissors')[] = ['rock', 'paper', 'scissors'];
    const compChoice = choices[Math.floor(Math.random() * choices.length)];

    if (playerChoice === compChoice) {
      setRpsResult(`🤝 It's a Tie! Both chose ${compChoice.toUpperCase()}.`);
      setRpsScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
    } else if (
      (playerChoice === 'rock' && compChoice === 'scissors') ||
      (playerChoice === 'paper' && compChoice === 'rock') ||
      (playerChoice === 'scissors' && compChoice === 'paper')
    ) {
      setRpsResult(`🎉 You Win! ${playerChoice.toUpperCase()} beats ${compChoice.toUpperCase()}.`);
      setRpsScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      setRpsResult(`🤖 Computer Wins! ${compChoice.toUpperCase()} beats ${playerChoice.toUpperCase()}.`);
      setRpsScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
    }
  };

  // App 4: CLI Expense Tracker
  const [cliExpenses, setCliExpenses] = useState([
    { item: 'Cloud GPU Instance', amount: 35 },
    { item: 'Python ML Handbook', amount: 24 },
    { item: 'Domain Registration', amount: 12 },
  ]);
  const [cliItemInput, setCliItemInput] = useState('');
  const [cliAmountInput, setCliAmountInput] = useState('');

  const handleAddCliExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliItemInput.trim() || !cliAmountInput) return;
    setCliExpenses([
      ...cliExpenses,
      { item: cliItemInput.trim(), amount: parseFloat(cliAmountInput) || 10 },
    ]);
    setCliItemInput('');
    setCliAmountInput('');
  };

  const cliTotal = cliExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  // App 5: Number Guessing
  const [secretNum, setSecretNum] = useState(42);
  const [guessInput, setGuessInput] = useState('');
  const [guessFeedback, setGuessFeedback] = useState('Guess a number between 1 and 100.');
  const [guessAttempts, setGuessAttempts] = useState(0);

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(guessInput, 10);
    if (isNaN(val)) return;
    setGuessAttempts((prev) => prev + 1);
    if (val === secretNum) {
      setGuessFeedback(`🎉 Congratulations! You guessed the number ${secretNum} in ${guessAttempts + 1} tries!`);
    } else if (val > secretNum) {
      setGuessFeedback(`📈 Your guess of ${val} is too high!`);
    } else {
      setGuessFeedback(`📉 Your guess of ${val} is too low!`);
    }
    setGuessInput('');
  };

  const resetGuessGame = () => {
    setSecretNum(Math.floor(Math.random() * 99) + 1);
    setGuessFeedback('Game reset! Guess a number between 1 and 100.');
    setGuessAttempts(0);
    setGuessInput('');
  };

  // App 6: Restaurant Menu Card
  const restaurantMenu = [
    { id: '1', name: 'Butter Chicken', price: 14.5 },
    { id: '2', name: 'Curd Rice', price: 7.0 },
    { id: '3', name: 'Grill Chicken', price: 12.0 },
    { id: '4', name: 'Mutton Curry', price: 16.0 },
    { id: '5', name: 'Beef Biriyani', price: 15.0 },
  ];
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('1');
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  const handlePlaceOrder = (id: string) => {
    setSelectedMenuItem(id);
    const item = restaurantMenu.find((m) => m.id === id);
    if (item) {
      setOrderNotification(`Order placed: You have ordered ${item.name}!`);
      setTimeout(() => setOrderNotification(null), 3000);
    }
  };

  // App 7: Arithmetic Calculator
  const [calcA, setCalcA] = useState('24');
  const [calcB, setCalcB] = useState('6');
  const [calcOp, setCalcOp] = useState<'+' | '-' | '*' | '/'>('*');
  const [calcResult, setCalcResult] = useState<string>('144');

  const evaluateMath = (op: '+' | '-' | '*' | '/') => {
    setCalcOp(op);
    const numA = parseFloat(calcA);
    const numB = parseFloat(calcB);
    if (isNaN(numA) || isNaN(numB)) {
      setCalcResult('Invalid number');
      return;
    }
    if (op === '+') setCalcResult(String(numA + numB));
    if (op === '-') setCalcResult(String(numA - numB));
    if (op === '*') setCalcResult(String(numA * numB));
    if (op === '/') {
      if (numB === 0) setCalcResult('Cannot divide by zero!');
      else setCalcResult(String(numA / numB));
    }
  };

  // App 8: To-Do Task List
  const [todoTasks, setTodoTasks] = useState<string[]>([
    'Study Artificial Neural Networks backprop',
    'Build FitPlus workout telemetry player',
    'Review Python data structures & Big-O',
  ]);
  const [newTodoInput, setNewTodoInput] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoInput.trim()) return;
    setTodoTasks([...todoTasks, newTodoInput.trim()]);
    setNewTodoInput('');
  };

  const handleRemoveTodo = (index: number) => {
    setTodoTasks(todoTasks.filter((_, i) => i !== index));
  };

  // =========================================================================
  // 4. WEB EXPENSE TRACKER STATE
  // =========================================================================
  const [webExpenses, setWebExpenses] = useState([
    { id: 1, name: 'Cloud Server Hosting', category: 'Dev', amount: 45, date: 'Today' },
    { id: 2, name: 'AI Research Bundle', category: 'Books', amount: 30, date: 'Yesterday' },
    { id: 3, name: 'Coffee & Coworking', category: 'Food', amount: 15, date: 'Mar 06' },
  ]);
  const [webExpenseForm, setWebExpenseForm] = useState({ name: '', amount: '', category: 'Dev' });
  const [webExpenseNotice, setWebExpenseNotice] = useState('');

  const handleAddWebExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webExpenseForm.name.trim() || !webExpenseForm.amount) return;
    const newExp = {
      id: Date.now(),
      name: webExpenseForm.name.trim(),
      category: webExpenseForm.category,
      amount: parseFloat(webExpenseForm.amount) || 20,
      date: 'Just now',
    };
    setWebExpenses([newExp, ...webExpenses.slice(0, 3)]);
    setWebExpenseForm({ name: '', amount: '', category: 'Dev' });
    setWebExpenseNotice('Expense added to live tracker!');
    setTimeout(() => setWebExpenseNotice(''), 3000);
  };

  const webExpenseTotal = webExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Active Python project details
  const currentPythonProject =
    PYTHON_PROJECTS_LIST.find((p) => p.id === selectedPythonApp) || PYTHON_PROJECTS_LIST[0];

  // Filtering helpers
  const showFitPlus = filter === 'All' || filter === 'Web' || filter === 'AI/ML';
  const showJarvis = filter === 'All' || filter === 'AI/ML' || filter === 'Python';
  const showPythonSuite = filter === 'All' || filter === 'Python';
  const showWebExpenseTracker = filter === 'All' || filter === 'Web';

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#F8FAFC] border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="mb-3">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full">
                Featured Engineering Portfolio
              </span>
            </div>
            <h2 className="text-[34px] sm:text-[40px] md:text-[48px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
              Projects &amp; Systems
            </h2>
            <p className="text-[16px] md:text-[18px] text-slate-600 mt-2 max-w-2xl">
              Full-stack web applications, AI desktop voice systems, and modular Python utilities built with production architecture.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-subtle-sm self-start md:self-auto overflow-x-auto">
            {(['All', 'Web', 'AI/ML', 'Python'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === cat
                    ? 'text-white bg-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS CONTAINER */}
        <div className="space-y-16">
          {/* =========================================================
              PROJECT 1: FITPLUS (FLAGSHIP FULL-STACK WEB APPLICATION)
          ========================================================== */}
          <AnimatePresence>
            {showFitPlus && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-slate-200/90 rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group relative"
              >
                {/* Subtle border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 rounded-card blur -z-10 opacity-75 group-hover:opacity-100 transition-opacity" />

                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Project Narrative & Specs */}
                  <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80">
                    <div>
                      {/* Badge Strip */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-full shadow-sm">
                          <Zap className="w-3 h-3 fill-white text-white" />
                          Flagship Web Application
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          Next.js 14 • AI Logic
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                        FitPlus — Smart Fitness Web App
                      </h3>
                      <p className="text-sm font-semibold text-emerald-600 mb-4">
                        AI-Powered Workout Architecture, Nutrition Tracker &amp; Recovery Engine
                      </p>

                      {/* Description */}
                      <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6">
                        FitPlus is a modern, responsive personal fitness application featuring Gym and Calisthenics mode selection, interactive exercise players, AI coaching advice, hydration tracking, and body metric analytics.
                      </p>

                      {/* Quick Module Navigation Strip */}
                      <div className="mb-6 p-3 bg-slate-50 border border-slate-200/90 rounded-xl">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                          Available Web App Modules
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                          >
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-semibold">Dashboard</span>
                          </Link>
                          <Link
                            href="/workout"
                            className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                          >
                            <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-semibold">Workout</span>
                          </Link>
                          <Link
                            href="/ai-coach"
                            className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                          >
                            <Bot className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-semibold">AI Coach</span>
                          </Link>
                          <Link
                            href="/nutrition"
                            className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                          >
                            <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-semibold">Nutrition</span>
                          </Link>
                          <Link
                            href="/progress"
                            className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                          >
                            <Flame className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-semibold">Progress</span>
                          </Link>
                          <Link
                            href="/recovery"
                            className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                          >
                            <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-semibold">Recovery</span>
                          </Link>
                        </div>
                      </div>

                      {/* Core Highlights */}
                      <div className="space-y-2 mb-6">
                        {[
                          'Dynamic routine switching between Gym, Calisthenics & Hybrid',
                          'AI-driven progressive overload recommendations and readiness scores',
                          'Macro tracking (Calories, Protein, Water) with visual progress rings',
                          'Persistent state management powered by React Context API',
                        ].map((feature) => (
                          <div key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies Stack */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Context API', 'Lucide Icons'].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100">
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-btn transition-all duration-200 shadow-button-primary hover:shadow-button-primary-hover hover:-translate-y-0.5"
                      >
                        <span>Launch FitPlus Web App</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/ai-coach"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-btn transition-all duration-200 shadow-subtle-sm hover:border-slate-400 hover:-translate-y-0.5"
                      >
                        <Bot className="w-4 h-4 text-emerald-600" />
                        <span>AI Coach View</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Live Interactive FitPlus UI Preview */}
                  <div className="lg:col-span-6 bg-[#0A0F1A] p-6 sm:p-8 text-slate-100 flex flex-col justify-between">
                    <div>
                      {/* Top App Header */}
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                          </div>
                          <span className="font-bold text-sm tracking-tight text-white font-mono">
                            FitPlus <span className="text-emerald-400">OS</span>
                          </span>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
                          {(['gym', 'calisthenics', 'hybrid'] as const).map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setWorkoutMode(mode)}
                              className={`px-2.5 py-1 text-[11px] font-semibold uppercase rounded transition-colors ${
                                workoutMode === mode
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Active Routine Details */}
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                            {currentRoutine.split}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {currentRoutine.duration} • {currentRoutine.volume}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-3">
                          {currentRoutine.title}
                        </h4>

                        <div className="space-y-2">
                          {currentRoutine.exercises.map((ex, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-[10px]">
                                  {idx + 1}
                                </span>
                                <span className="font-medium text-slate-200">{ex.name}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-mono text-slate-400 block">{ex.sets}</span>
                                <span className="text-[10px] text-emerald-400/80">{ex.target}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Coach Telemetry Box */}
                      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs">
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>AI Coach Telemetry Insight</span>
                        </div>
                        <p className="text-slate-300 text-[11.5px] leading-relaxed">
                          {currentRoutine.aiInsight}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Bottom Bar */}
                    <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Live In-Browser Session
                        </span>
                      </div>
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                      >
                        <span>Open Dashboard</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =========================================================
              PROJECT 2: PROJECT JARVIS (AI DESKTOP VOICE ASSISTANT)
          ========================================================== */}
          <AnimatePresence>
            {showJarvis && (
              <motion.div
                id="jarvis-simulator"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-slate-200/90 rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group relative"
              >
                {/* Subtle border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-card blur -z-10 opacity-75 group-hover:opacity-100 transition-opacity" />

                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Narrative */}
                  <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80">
                    <div>
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-600 text-white rounded-full shadow-sm">
                          <Mic className="w-3 h-3" />
                          AI Voice Desktop Assistant
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          Python • SpeechRecognition • pyttsx3
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                        Project JARVIS
                      </h3>
                      <p className="text-sm font-semibold text-blue-600 mb-4">
                        Speech-Controlled Autonomous Desktop Assistant
                      </p>

                      <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6">
                        An intelligent voice assistant created in Python. Project JARVIS calibrates for ambient noise, parses spoken user intent via Google Speech Recognition, responds with natural vocal speech synthesis via pyttsx3, and triggers OS-level desktop automations.
                      </p>

                      {/* Capabilities */}
                      <div className="space-y-2 mb-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Automations &amp; System Capabilities
                        </span>
                        {[
                          'Microphone ambient noise calibration for crystal-clear recognition',
                          'Natural Text-to-Speech (TTS) vocal engine via pyttsx3',
                          'Application automation: Launches VS Code and desktop tools',
                          'Web query pipeline: Automates Google search queries & YouTube playback',
                          'Real-time system time, date, and calendar voice inquiries',
                        ].map((cap) => (
                          <div key={cap} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {['Python 3', 'speech_recognition', 'pyttsx3 (TTS)', 'webbrowser', 'OS Automation'].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleJarvisCommand('hello')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-btn transition-all duration-200 shadow-subtle-sm hover:-translate-y-0.5"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Trigger Voice Query</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setJarvisActiveTab(jarvisActiveTab === 'code' ? 'simulator' : 'code')
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-btn transition-all duration-200 shadow-subtle-sm hover:border-slate-400 hover:-translate-y-0.5"
                      >
                        <Code2 className="w-4 h-4 text-blue-600" />
                        <span>{jarvisActiveTab === 'code' ? 'View Simulator' : 'View jarvis.py'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Live Voice Command Simulator / Code */}
                  <div className="lg:col-span-6 bg-[#090D16] p-6 sm:p-8 text-slate-100 flex flex-col justify-between">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-blue-400" />
                          </div>
                          <span className="font-mono text-xs font-semibold text-slate-300">
                            JARVIS Terminal Engine
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">
                            Online
                          </span>
                        </div>
                      </div>

                      {jarvisActiveTab === 'simulator' ? (
                        <div className="space-y-4">
                          {/* Animated Voice Waveform Banner */}
                          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center relative overflow-hidden">
                            <div className="flex items-center justify-center gap-1.5 h-12 mb-3">
                              {[24, 38, 18, 44, 28, 52, 34, 22, 40, 16, 36, 48, 20].map((h, i) => (
                                <motion.span
                                  key={i}
                                  animate={{
                                    height: jarvisSpeaking
                                      ? [12, h, Math.max(8, h * 0.4), h, 12]
                                      : [10, 16, 8, 14, 10],
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: jarvisSpeaking ? 0.6 : 1.8,
                                    delay: i * 0.05,
                                  }}
                                  className={`w-1.5 rounded-full transition-colors ${
                                    jarvisSpeaking ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50' : 'bg-slate-700'
                                  }`}
                                />
                              ))}
                            </div>

                            <div className="text-xs font-mono text-cyan-400 flex items-center justify-center gap-2">
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{jarvisSpeaking ? 'JARVIS is speaking...' : 'Listening on Microphone...'}</span>
                            </div>
                          </div>

                          {/* Speech Log */}
                          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
                            <div className="text-slate-500">
                              [INPUT RECOGNIZER]: <span className="text-slate-300">&quot;{jarvisLastCommand}&quot;</span>
                            </div>
                            <div className="pt-2 border-t border-slate-800 text-cyan-300 flex items-start gap-2">
                              <span className="text-blue-400 font-bold shrink-0">JARVIS:</span>
                              <p className="leading-relaxed">&quot;{jarvisOutput}&quot;</p>
                            </div>
                          </div>

                          {/* Interactive Voice Command Trigger Buttons */}
                          <div>
                            <span className="text-xs font-mono text-slate-400 block mb-2 font-bold">
                              Click a Voice Command Trigger:
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                { label: 'Time Request', cmd: 'time' },
                                { label: 'Date Request', cmd: 'date' },
                                { label: 'Open YouTube', cmd: 'youtube' },
                                { label: 'Open VS Code', cmd: 'vscode' },
                                { label: 'Web Search', cmd: 'search' },
                                { label: 'Say Hello', cmd: 'hello' },
                              ].map((btn) => (
                                <button
                                  key={btn.cmd}
                                  type="button"
                                  onClick={() => handleJarvisCommand(btn.cmd)}
                                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5 justify-center"
                                >
                                  <Mic className="w-3 h-3 text-cyan-400" />
                                  <span>{btn.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Python Source Viewer */
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono max-h-[320px] overflow-y-auto">
                          <pre className="text-slate-300 whitespace-pre leading-relaxed text-[11px]">
                            {PYTHON_PROJECTS_LIST[0]?.codeSnippet}
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* Bottom Status */}
                    <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>pyttsx3 Engine • Google Speech API</span>
                      <span className="text-cyan-400 font-semibold">Python Automation</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =========================================================
              PROJECT 3: PYTHON PROJECTS SUITE (8 INTERACTIVE APPS)
          ========================================================== */}
          <AnimatePresence>
            {showPythonSuite && (
              <motion.div
                id="python-suite"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-slate-200/90 rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group relative"
              >
                {/* Subtle border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-card blur -z-10 opacity-75 group-hover:opacity-100 transition-opacity" />

                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Projects Overview & App Selector */}
                  <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80">
                    <div>
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-purple-600 text-white rounded-full shadow-sm">
                          <Terminal className="w-3 h-3" />
                          Interactive Python Suite
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          8 Standalone Python Projects
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                        Python Software Suite
                      </h3>
                      <p className="text-sm font-semibold text-purple-600 mb-4">
                        Algorithms, Data Structures, Cryptography &amp; CLI Applications
                      </p>

                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        A collection of 8 Python applications written by Hemanth demonstrating algorithmic logic, random cryptographic generations, data structure management, and game systems.
                      </p>

                      {/* App Selector Grid */}
                      <div className="space-y-1.5 mb-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Select a Python Project to Test:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { id: 'password-generator', name: 'Password Gen', icon: Lock },
                            { id: 'quiz', name: 'Trivia Quiz', icon: HelpCircle },
                            { id: 'rock-paper-scissors', name: 'Rock Paper Scissors', icon: Gamepad2 },
                            { id: 'expense-tracker-cli', name: 'Expense CLI', icon: Receipt },
                            { id: 'number-guessing', name: 'Number Guess', icon: Gamepad2 },
                            { id: 'menu-card', name: 'Menu Card POS', icon: Utensils },
                            { id: 'calculator', name: 'Calculator', icon: Calculator },
                            { id: 'todo-list', name: 'To-Do List', icon: ListTodo },
                          ].map((item) => {
                            const Icon = item.icon;
                            const isSelected = selectedPythonApp === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedPythonApp(item.id)}
                                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                                  isSelected
                                    ? 'bg-purple-50 border-purple-300 text-purple-700 shadow-sm'
                                    : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                              >
                                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-600' : 'text-slate-400'}`} />
                                <span className="truncate">{item.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Selected Project Specs */}
                      <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200/70 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-purple-900">{currentPythonProject.name}</span>
                          <span className="font-mono text-[11px] text-purple-600 font-semibold">
                            {currentPythonProject.filename}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11.5px] leading-relaxed mb-2">
                          {currentPythonProject.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {currentPythonProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-white text-purple-700 font-mono text-[10px] border border-purple-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom buttons */}
                    <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowPythonCodeModal(!showPythonCodeModal)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-btn transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>{showPythonCodeModal ? 'Show Interactive Runner' : 'Inspect Python Code'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Interactive App Playground */}
                  <div className="lg:col-span-7 bg-[#0B101E] p-6 sm:p-8 text-slate-100 flex flex-col justify-between">
                    <div>
                      {/* Terminal Top Bar */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                          <Terminal className="w-3.5 h-3.5 text-purple-400" />
                          <span>python3 &quot;{currentPythonProject.filename}&quot;</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                          Interactive Runner
                        </span>
                      </div>

                      {/* If inspecting code */}
                      {showPythonCodeModal ? (
                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs max-h-[350px] overflow-y-auto">
                          <div className="flex items-center justify-between mb-2 text-slate-400 text-[11px] pb-2 border-b border-slate-800">
                            <span># Source Code: {currentPythonProject.filename}</span>
                            <span className="text-purple-400 font-bold">Python 3.11</span>
                          </div>
                          <pre className="text-purple-200 whitespace-pre leading-relaxed text-[11px]">
                            {currentPythonProject.codeSnippet}
                          </pre>
                        </div>
                      ) : (
                        /* INTERACTIVE SIMULATORS FOR EACH APP */
                        <div className="space-y-4">
                          {/* 1. PASSWORD GENERATOR */}
                          {selectedPythonApp === 'password-generator' && (
                            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-400 font-bold">
                                  Cryptographic Random Password Generator
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400">string.punctuation</span>
                              </div>

                              {/* Password Display Box */}
                              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                                <span className="font-mono text-base sm:text-lg text-emerald-400 tracking-wider font-bold truncate">
                                  {generatedPassword}
                                </span>
                                <button
                                  type="button"
                                  onClick={copyPasswordToClipboard}
                                  className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 inline-flex items-center gap-1 shrink-0 ml-2"
                                >
                                  {pwdCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{pwdCopied ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>

                              {/* Controls */}
                              <div className="space-y-3 text-xs">
                                <div>
                                  <div className="flex justify-between text-slate-400 mb-1">
                                    <span>Password Length:</span>
                                    <span className="font-mono text-purple-400 font-bold">{pwdLength} characters</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="6"
                                    max="32"
                                    value={pwdLength}
                                    onChange={(e) => setPwdLength(parseInt(e.target.value, 10))}
                                    className="w-full accent-purple-500 cursor-pointer"
                                  />
                                </div>

                                <div className="flex gap-4 text-slate-300">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={includeNumbers}
                                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                                      className="accent-purple-500"
                                    />
                                    <span>Digits (0-9)</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={includeSymbols}
                                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                                      className="accent-purple-500"
                                    />
                                    <span>Symbols (!@#$)</span>
                                  </label>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={generateNewPassword}
                                className="w-full py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm"
                              >
                                Generate New Password
                              </button>
                            </div>
                          )}

                          {/* 2. TRIVIA QUIZ */}
                          {selectedPythonApp === 'quiz' && (
                            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-400 font-bold">
                                  Trivia Quiz Engine (quize.py)
                                </span>
                                <span className="text-xs font-mono text-purple-400 font-bold">
                                  Score: {quizScore}
                                </span>
                              </div>

                              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800">
                                <span className="text-[11px] text-slate-400 font-mono block mb-1">
                                  Question {currentQuizIndex + 1} of {quizQuestions.length}:
                                </span>
                                <p className="text-sm font-semibold text-white">
                                  {quizQuestions[currentQuizIndex].q}
                                </p>
                                <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                                  Hint: {quizQuestions[currentQuizIndex].hints}
                                </span>
                              </div>

                              {quizFeedback && (
                                <div className="p-2.5 rounded bg-slate-900 text-xs font-mono text-slate-200 border border-slate-800">
                                  {quizFeedback}
                                </div>
                              )}

                              <form onSubmit={handleQuizSubmit} className="flex gap-2">
                                <input
                                  type="text"
                                  value={quizInput}
                                  onChange={(e) => setQuizInput(e.target.value)}
                                  placeholder="Type your answer here..."
                                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                                />
                                <button
                                  type="submit"
                                  className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          )}

                          {/* 3. ROCK PAPER SCISSORS */}
                          {selectedPythonApp === 'rock-paper-scissors' && (
                            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-400 font-bold">
                                  RPS Game vs. Random AI Opponent
                                </span>
                                <div className="flex items-center gap-2 font-mono text-[11px]">
                                  <span className="text-emerald-400">W: {rpsScore.wins}</span>
                                  <span className="text-slate-400">T: {rpsScore.ties}</span>
                                  <span className="text-rose-400">L: {rpsScore.losses}</span>
                                </div>
                              </div>

                              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 text-center font-mono text-xs">
                                <p className="text-slate-200">{rpsResult}</p>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                <button
                                  type="button"
                                  onClick={() => playRps('rock')}
                                  className="py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors"
                                >
                                  🪨 Rock
                                </button>
                                <button
                                  type="button"
                                  onClick={() => playRps('paper')}
                                  className="py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors"
                                >
                                  📄 Paper
                                </button>
                                <button
                                  type="button"
                                  onClick={() => playRps('scissors')}
                                  className="py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors"
                                >
                                  ✂️ Scissors
                                </button>
                              </div>
                            </div>
                          )}

                          {/* 4. EXPENSE TRACKER CLI */}
                          {selectedPythonApp === 'expense-tracker-cli' && (
                            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-400 font-bold">
                                  Python CLI Expense Logger
                                </span>
                                <span className="text-xs font-mono text-emerald-400 font-bold">
                                  Total: ${cliTotal.toFixed(2)}
                                </span>
                              </div>

                              <form onSubmit={handleAddCliExpense} className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Expense Item"
                                  value={cliItemInput}
                                  onChange={(e) => setCliItemInput(e.target.value)}
                                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                                />
                                <input
                                  type="number"
                                  placeholder="Amount ($)"
                                  value={cliAmountInput}
                                  onChange={(e) => setCliAmountInput(e.target.value)}
                                  className="w-24 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                                />
                                <button
                                  type="submit"
                                  className="px-3 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                >
                                  Add
                                </button>
                              </form>

                              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 max-h-36 overflow-y-auto space-y-1.5 text-xs font-mono">
                                {cliExpenses.map((exp, i) => (
                                  <div key={i} className="flex items-center justify-between text-slate-300">
                                    <span>&gt; {exp.item}</span>
                                    <span className="text-emerald-400 font-bold">${exp.amount.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 5. NUMBER GUESSING */}
                          {selectedPythonApp === 'number-guessing' && (
                            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-400 font-bold">
                                  Number Guessing Engine (1-100)
                                </span>
                                <button
                                  type="button"
                                  onClick={resetGuessGame}
                                  className="text-slate-400 hover:text-white inline-flex items-center gap-1 text-[11px] font-mono"
                                >
                                  <RotateCcw className="w-3 h-3" /> Reset
                                </button>
                              </div>

                              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs">
                                <p className="text-slate-300 mb-1">{guessFeedback}</p>
                                <span className="text-[11px] text-slate-500">
                                  Attempts logged: {guessAttempts}
                                </span>
                              </div>

                              <form onSubmit={handleGuessSubmit} className="flex gap-2">
                                <input
                                  type="number"
                                  value={guessInput}
                                  onChange={(e) => setGuessInput(e.target.value)}
                                  placeholder="Enter your guess (1-100)"
                                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                                />
                                <button
                                  type="submit"
                                  className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                >
                                  Submit Guess
                                </button>
                              </form>
                            </div>
                          )}

                          {/* 6. MENU CARD POS */}
                          {selectedPythonApp === 'menu-card' && (
                            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-400 font-bold">
                                  Restaurant Menu Card (Menu Card.py)
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400">Order System</span>
                              </div>

                              <div className="space-y-1.5">
                                {restaurantMenu.map((item) => (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handlePlaceOrder(item.id)}
                                    className={`w-full flex items-center justify-between p-2 rounded-lg border transition-colors text-xs ${
                                      selectedMenuItem === item.id
                                        ? 'bg-purple-950/50 border-purple-500/60 text-white'
                                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-purple-400 font-bold">{item.id}.</span>
                                      <span>{item.name}</span>
                                    </div>
                                    <span className="font-mono text-emerald-400 font-bold">${item.price.toFixed(2)}</span>
                                  </button>
                                ))}
                              </div>

                              {orderNotification && (
                                <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                                  {orderNotification}
                                </div>
                              )}
                            </div>
                          )}

                          {/* 7. ARITHMETIC CALCULATOR */}
                          {selectedPythonApp === 'calculator' && (
                            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-400 font-bold">
                                  Arithmetic Operator Engine (Calculator.py)
                                </span>
                                <span className="text-xs font-mono text-emerald-400 font-bold">
                                  Result: {calcResult}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[11px] text-slate-400 font-mono block mb-1">Number A:</label>
                                  <input
                                    type="number"
                                    value={calcA}
                                    onChange={(e) => setCalcA(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 font-mono block mb-1">Number B:</label>
                                  <input
                                    type="number"
                                    value={calcB}
                                    onChange={(e) => setCalcB(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-4 gap-2 pt-1">
                                {(['+', '-', '*', '/'] as const).map((op) => (
                                  <button
                                    key={op}
                                    type="button"
                                    onClick={() => evaluateMath(op)}
                                    className={`py-2 text-xs font-mono font-bold rounded-lg border transition-colors ${
                                      calcOp === op
                                        ? 'bg-purple-600 text-white border-purple-500'
                                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                                    }`}
                                  >
                                    {op}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 8. TO-DO LIST */}
                          {selectedPythonApp === 'todo-list' && (
                            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-400 font-bold">
                                  Task Queue &amp; To-Do List (To do list.py)
                                </span>
                                <span className="text-xs font-mono text-purple-400">
                                  {todoTasks.length} active tasks
                                </span>
                              </div>

                              <form onSubmit={handleAddTodo} className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Enter new task..."
                                  value={newTodoInput}
                                  onChange={(e) => setNewTodoInput(e.target.value)}
                                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                                />
                                <button
                                  type="submit"
                                  className="px-3.5 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                >
                                  Add
                                </button>
                              </form>

                              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                                {todoTasks.map((t, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                                  >
                                    <span>{idx + 1}. {t}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveTodo(idx)}
                                      className="text-slate-500 hover:text-rose-400 text-[10px]"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Status */}
                    <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Python 3.11+ • Clean Modular Code</span>
                      <span className="text-purple-400 font-semibold">Algorithms &amp; Utilities</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =========================================================
              PROJECT 4: WEB EXPENSE TRACKER
          ========================================================== */}
          <AnimatePresence>
            {showWebExpenseTracker && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-slate-200/90 rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Project Narrative */}
                  <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80">
                    <div>
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-full shadow-sm">
                          <PieChart className="w-3 h-3" />
                          Web Utility
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          JavaScript • LocalStorage
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                        Expense Tracker Web Application
                      </h3>
                      <p className="text-sm font-semibold text-emerald-600 mb-4">
                        Personal Expense Logging &amp; Budget Health System
                      </p>

                      <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6">
                        A clean and responsive personal expense management application that allows users to record daily expenditures, categorize spending (Food, Tech, Books, Bills), compute real-time balances, and monitor financial health.
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {[
                          'Add expense with custom title, numeric amount, and category',
                          'Categorization across Food, Dev, Books, and Utilities',
                          'Instant real-time balance calculations with running sums',
                          'Lightweight, zero-dependency browser state architecture',
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {['HTML', 'CSS', 'JavaScript', 'LocalStorage', 'Responsive UI'].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-btn transition-all duration-200 shadow-subtle-sm hover:-translate-y-0.5"
                      >
                        <span>Contact About Projects</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Interactive Web Expense Tracker Simulator */}
                  <div className="lg:col-span-6 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0">
                    <div>
                      {/* Header Strip */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                        <div>
                          <span className="text-xs font-mono text-slate-500 uppercase font-semibold">
                            Monthly Budget Summary
                          </span>
                          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            ${webExpenseTotal.toFixed(2)}{' '}
                            <span className="text-xs font-normal text-slate-500 font-sans">
                              logged this cycle
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                          Active State
                        </span>
                      </div>

                      {/* Interactive Add Expense Form inside Card */}
                      <form onSubmit={handleAddWebExpense} className="mb-5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-subtle-sm">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                          Add Expense (Live Simulation)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2.5">
                          <input
                            type="text"
                            placeholder="Title (e.g. Server)"
                            value={webExpenseForm.name}
                            onChange={(e) => setWebExpenseForm({ ...webExpenseForm, name: e.target.value })}
                            className="text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600 bg-slate-50 text-slate-900"
                          />
                          <input
                            type="number"
                            placeholder="Amount ($)"
                            value={webExpenseForm.amount}
                            onChange={(e) => setWebExpenseForm({ ...webExpenseForm, amount: e.target.value })}
                            className="text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600 bg-slate-50 text-slate-900"
                          />
                          <select
                            value={webExpenseForm.category}
                            onChange={(e) => setWebExpenseForm({ ...webExpenseForm, category: e.target.value })}
                            className="text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600 bg-slate-50 text-slate-700"
                          >
                            <option value="Dev">Dev / Tech</option>
                            <option value="Food">Food &amp; Dining</option>
                            <option value="Books">Books &amp; Study</option>
                            <option value="Bills">Bills</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-emerald-600 font-medium">
                            {webExpenseNotice}
                          </span>
                          <button
                            type="submit"
                            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors inline-flex items-center gap-1 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Expense</span>
                          </button>
                        </div>
                      </form>

                      {/* Recent Expense Transactions List */}
                      <div className="space-y-2 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Recent Transactions
                        </span>
                        {webExpenses.map((exp) => (
                          <div
                            key={exp.id}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-subtle-sm text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600">
                                {exp.category.slice(0, 3)}
                              </span>
                              <div>
                                <span className="font-semibold text-slate-900 block">
                                  {exp.name}
                                </span>
                                <span className="text-[10px] text-slate-400">{exp.date}</span>
                              </div>
                            </div>
                            <span className="font-mono font-bold text-slate-800">
                              -${exp.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer note */}
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <span>Responsive UI • Pure DOM manipulation</span>
                      <span className="font-mono text-[11px] text-emerald-700 font-semibold">
                        HTML, CSS, JavaScript
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
