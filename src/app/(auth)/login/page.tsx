'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';
import { useAuth } from '@/lib/auth/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, enterDemoMode, isDemoMode } = useAuth();
  const [email, setEmail] = useState('alex.rivera@nexus.student');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn(email, password);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Signed in successfully');
        router.push('/dashboard');
      }
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    enterDemoMode();
    toast.success('Entered Demo Student Mode (Alex Rivera)');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-nexus-light-bg dark:bg-nexus-dark-bg flex items-center justify-center p-4 bg-nexus-grid">
      <div className="w-full max-w-md bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border rounded-card-lg p-6 sm:p-8 shadow-card dark:shadow-card-dark relative overflow-hidden">
        {/* Top Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-3">
            <NexusOrb size="md" state="idle" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-nexus-light-text dark:text-nexus-dark-text tracking-tight">
            Sign In to NEXUS
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Access your personalized student operating system
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <div className="mb-6 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <div className="text-left">
              <p className="text-xs font-bold text-violet-800 dark:text-violet-300">Quick Demo Session</p>
              <p className="text-[10px] text-violet-600 dark:text-violet-400">Pre-configured student profile</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="px-3 py-1.5 rounded-btn bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors"
          >
            Launch Demo
          </button>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Student Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full pl-9 pr-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-transparent text-sm text-nexus-light-text dark:text-nexus-dark-text focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-transparent text-sm text-nexus-light-text dark:text-nexus-dark-text focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-btn bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-button-primary transition-all duration-150 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          New to NEXUS?{' '}
          <Link href="/onboarding" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Complete Onboarding
          </Link>
        </div>
      </div>
    </div>
  );
}

