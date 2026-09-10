'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { NexusOrb } from '@/components/ui/NexusOrb';
import { useAuth } from '@/lib/auth/AuthContext';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signUp(email, password, fullName);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Registration successful. Starting onboarding...');
        router.push('/onboarding');
      }
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexus-light-bg dark:bg-nexus-dark-bg flex items-center justify-center p-4 bg-nexus-grid">
      <div className="w-full max-w-md bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border rounded-card-lg p-6 sm:p-8 shadow-card dark:shadow-card-dark relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-3">
            <NexusOrb size="md" state="idle" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-nexus-light-text dark:text-nexus-dark-text tracking-tight">
            Create Student Account
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Join NEXUS — The AI Student Operating System
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full pl-9 pr-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-transparent text-sm text-nexus-light-text dark:text-nexus-dark-text focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

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
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">
              Choose Password
            </label>
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
            className="w-full mt-2 py-3 rounded-btn bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold text-sm shadow-button-primary transition-all duration-150 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creating Account...' : 'Continue to Onboarding'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

