'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Sparkles, Zap } from 'lucide-react';
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
        toast.success('Registration successful! Launching onboarding wizard...');
        router.push('/onboarding');
      }
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-outfit">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D5FF3E]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80 relative z-10">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D5FF3E] flex items-center justify-center shadow-[0_0_25px_rgba(213,255,62,0.4)]">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>
          </div>
          <h1 className="font-extrabold text-2xl text-white tracking-tight">
            Create Athlete Account
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Join <span className="text-[#D5FF3E] font-bold">FITPLUS</span> — The AI Fitness Engine
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-white/10 bg-white/[0.02] text-sm text-white focus:outline-none focus:border-[#D5FF3E] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Athlete Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@fitplus.ai"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-white/10 bg-white/[0.02] text-sm text-white focus:outline-none focus:border-[#D5FF3E] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
              Choose Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-white/10 bg-white/[0.02] text-sm text-white focus:outline-none focus:border-[#D5FF3E] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-full bg-[#D5FF3E] hover:bg-[#c4f035] text-black font-black text-sm shadow-[0_0_25px_rgba(213,255,62,0.3)] hover:shadow-[0_0_35px_rgba(213,255,62,0.5)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account...' : 'Continue to Onboarding'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-[#D5FF3E] font-bold hover:underline">
            Sign In &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

