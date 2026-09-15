import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#070A12] text-zinc-400 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center text-white font-bold font-mono text-xs">
                CA
              </div>
              <span className="font-bold text-white font-mono tracking-tight text-sm">
                CODEARENA
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
              AI-powered algorithmic practice, deep code reviews, and competitive programming designed for high-performance software engineers.
            </p>
            <div className="text-[11px] text-zinc-600 font-mono">
              THINK. CODE. IMPROVE.
            </div>
          </div>

          {/* Product */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/problems" className="hover:text-white transition-colors">
                  Problem Explorer
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-white transition-colors">
                  DSA Skill Tree
                </Link>
              </li>
              <li>
                <Link href="/practice/two-sum" className="hover:text-white transition-colors">
                  Practice IDE
                </Link>
              </li>
              <li>
                <Link href="/arena" className="hover:text-white transition-colors">
                  Weekly Arena Contests
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-white transition-colors">
                  Global Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Intelligence */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
              AI Intelligence
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-review" className="hover:text-white transition-colors">
                  AI Code Reviewer
                </Link>
              </li>
              <li>
                <Link href="/ai-tutor" className="hover:text-white transition-colors">
                  Socratic AI Tutor
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white transition-colors">
                  Performance Analytics
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Developer Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
              Engineering
            </div>
            <ul className="space-y-2 text-zinc-500">
              <li>
                <a 
                  href="https://github.com/hemanthsk1602-rgb" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <span className="hover:text-zinc-300 cursor-pointer">
                  Judge0 & Sandbox Protocol
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-300 cursor-pointer">
                  Asymptotic Complexity Specs
                </span>
              </li>
              <li>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Systems Operational
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} CodeArena. Practice with purpose. Compete with confidence.
          </div>
          <div className="flex items-center gap-6">
            <span>Deterministic Demo Sandbox v1.0</span>
            <span>JetBrains Mono & Inter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

