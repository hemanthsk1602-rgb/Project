'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  User as UserIcon, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Zap, 
  Check, 
  Code2, 
  Sun, 
  Moon,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/problems';

  const { login, signup, loginWithOAuth, loginDemo, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Sign In Form State
  const [email, setEmail] = useState('hemanth@codearena.dev');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [preferredLang, setPreferredLang] = useState('cpp');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    const res = await login(email, password);
    if (res.success) {
      toast.success('Welcome back to CodeArena!', {
        description: 'Your developer session has been authenticated.',
      });
      router.push(redirectUrl);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !username || !signupEmail || !signupPassword) {
      toast.error('Please fill in all required fields');
      return;
    }
    const res = await signup({
      name: fullName,
      username,
      email: signupEmail,
      password: signupPassword,
      preferredLanguage: preferredLang,
    });
    if (res.success) {
      toast.success('Account created successfully!', {
        description: `Welcome aboard, @${username.replace('@', '')}!`,
      });
      router.push(redirectUrl);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    await loginWithOAuth(provider);
    toast.success(`Signed in with ${provider === 'github' ? 'GitHub' : 'Google'}!`);
    router.push(redirectUrl);
  };

  const handleDemoSignIn = () => {
    loginDemo();
    toast.success('Signed in as Demo User (@hemanth_dev)', {
      description: 'Level 24 • 87-day streak • 218 problems solved',
    });
    router.push(redirectUrl);
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col justify-between transition-colors">
      {/* Top Header */}
      <header className="w-full border-b border-white/[0.08] bg-[#090D16]/90 backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group select-none">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold font-mono text-xs group-hover:border-brand-500/60 transition-all">
            CA
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white font-mono text-sm">
              CODEARENA
            </span>
            <span className="text-[9px] text-zinc-500 font-mono tracking-widest -mt-0.5">
              AUTHENTICATION GATEWAY
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.04] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Authentication Grid */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Platform Showcase (Hidden on small screens) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-6 pr-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ENGINEERING WORKSTATION V2</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Train like a competitive programmer. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-200">
                Execute like a senior engineer.
              </span>
            </h1>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
              Unlock interactive algorithm sandboxes, 3-tier progressive hints, asymptotic Big-O AI code reviews, and live rated contest arenas.
            </p>

            {/* Live Telemetry Code Mockup */}
            <div className="rounded-xl bg-[#0B0F19] border border-white/[0.08] p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>runtime_telemetry.cpp</span>
                </span>
                <span className="text-emerald-400 font-medium">98.4% Percentile</span>
              </div>

              <div className="font-mono text-xs space-y-1 text-zinc-300">
                <div className="text-zinc-500">{'// Hash map lookup: O(1) constant time'}</div>
                <div><span className="text-brand-400">unordered_map</span>&lt;int, int&gt; lookup;</div>
                <div><span className="text-indigo-300">for</span> (int i = 0; i &lt; n; ++i) &#123;</div>
                <div className="pl-4 text-emerald-400">if (lookup.count(target - nums[i])) return true;</div>
                <div>&#125;</div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-brand-400" />
                  <span>AI Review: Optimal asymptotic bound \(O(n)\)</span>
                </span>
                <span className="font-mono text-zinc-500">14ms latency</span>
              </div>
            </div>

            {/* Verified Developer Quote */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-xs font-bold text-brand-300 font-mono">
                SR
              </div>
              <div className="text-xs">
                <div className="text-white font-medium">
                  &quot;The AI review transformed how I optimize graph algorithms.&quot;
                </div>
                <div className="text-zinc-500">
                  Staff Engineer @ Stripe • ICPC World Finalist
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="rounded-2xl bg-[#0B0F19] border border-white/[0.08] shadow-2xl p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {mode === 'signin' ? 'Sign in to Workstation' : 'Create Developer Account'}
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <Check className="w-3 h-3" />
                    <span>SSL Secured</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400">
                  {mode === 'signin'
                    ? 'Enter your credentials to access your problems & roadmap'
                    : 'Join thousands of engineers mastering data structures'}
                </p>
              </div>

              {/* Instant Demo Sign-In Shortcut */}
              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    ⚡
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Instant Demo Sign-In</div>
                    <div className="text-[11px] text-zinc-400">Evaluate immediately as @hemanth_dev</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-all shrink-0"
                >
                  Sign In
                </button>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuth('github')}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuth('google')}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-white transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-white/[0.08]" />
                <span className="bg-[#0B0F19] px-3 text-[11px] font-mono text-zinc-500 uppercase tracking-wider relative">
                  or email
                </span>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={`py-1.5 rounded-lg transition-all ${
                    mode === 'signin'
                      ? 'bg-brand-500 text-white shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`py-1.5 rounded-lg transition-all ${
                    mode === 'signup'
                      ? 'bg-brand-500 text-white shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Form Content */}
              {mode === 'signin' ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-zinc-300">
                        Password
                      </label>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toast.info('Password reset instructions sent to your email.');
                        }}
                        className="text-[11px] text-brand-400 hover:text-brand-300 transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-10 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-zinc-700 text-brand-500 focus:ring-0"
                      />
                      <span>Remember this device</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-all duration-150 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Sign In to Workstation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Handle
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="@adalove"
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="ada@computing.org"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Primary Language
                    </label>
                    <select
                      value={preferredLang}
                      onChange={(e) => setPreferredLang(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#090D16] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-brand-500 transition-colors"
                    >
                      <option value="cpp">C++ (Clang 17 / STL)</option>
                      <option value="python">Python 3.12</option>
                      <option value="java">Java 21 (OpenJDK)</option>
                      <option value="javascript">JavaScript / TypeScript</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow-brand transition-all duration-150 disabled:opacity-50 mt-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Create Developer Account</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Security guarantee */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Encrypted session • SOC2 Type II compliant sandbox</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-white/[0.06] py-4 text-center text-xs text-zinc-500">
        <span>© 2026 CodeArena Inc. Built for competitive engineers.</span>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center text-zinc-400 font-mono text-xs gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
          <span>Connecting to CodeArena Workstation...</span>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}

