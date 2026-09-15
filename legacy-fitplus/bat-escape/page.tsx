'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Maximize2,
  Trophy,
  Gamepad2,
  Sparkles,
  Shield,
  Zap,
  Flame,
  Skull,
  Compass,
  RefreshCw,
} from 'lucide-react';

export default function BatEscapePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    if (!document.fullscreenElement) {
      iframeRef.current.requestFullscreen?.().catch((err) => {
        console.error('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.error('Exit fullscreen error:', err);
      });
      setIsFullscreen(false);
    }
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xl">🦇</span>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Bat Escape Arcade
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                v2.0 Progressive
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={reloadGame}
              title="Restart Game Instance"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reload</span>
            </button>

            <button
              onClick={toggleFullscreen}
              title="Fullscreen Mode"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 hover:bg-cyan-900/40 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Arcade Cabinet Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Game Canvas Screen Frame */}
        <div className="w-full max-w-[1000px] aspect-[16/10] bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-[0_0_50px_rgba(56,189,248,0.15)] overflow-hidden relative group">
          <iframe
            ref={iframeRef}
            src="/games/bat-escape/index.html"
            title="Bat Escape Game"
            className="w-full h-full border-0 block"
            allow="autoplay; fullscreen"
          />
        </div>

        {/* Quick Tips & System Overview */}
        <div className="w-full max-w-[1000px] mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {/* Card 1 */}
          <div className="bg-slate-900/60 border border-slate-800/70 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
              <Gamepad2 className="w-4 h-4" />
              <span>Multi-Platform Controls</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">Space</kbd>,{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">↑ Arrow</kbd>, or tap/click anywhere on the canvas to flap. Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">P</kbd> to pause.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/60 border border-slate-800/70 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Combos & Perfect Passes</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Graze close to obstacle edges for instant <b className="text-amber-300">"PERFECT!" (+10 pts)</b> bonuses. Chain consecutive rewards without getting hit to reach up to a <b className="text-amber-300">5x combo multiplier</b>!
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/60 border border-slate-800/70 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm mb-2">
              <Trophy className="w-4 h-4" />
              <span>Dynamic Difficulty & Bosses</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Progress through 6 biomes: Night Flight, Deep Forest, Haunted Castle, Dark Caves, Demon Realm, and Nightmare Mode. Survive boss fights at 200 & 500 points!
            </p>
          </div>
        </div>

        {/* Feature Matrix Details */}
        <section className="w-full max-w-[1000px] mt-8 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-cyan-400" />
            <span>Architecture & Game Engine Highlights</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Fairness Guarantee
              </div>
              <p className="text-slate-400">
                Mathematical trajectory validator guarantees every gap is physically reachable under the bat&apos;s climb and gravity curves.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <div className="font-semibold text-emerald-300 mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Web Audio Synthesizer
              </div>
              <p className="text-slate-400">
                Procedural 8-bit sound effects and dynamic adaptive chiptune music rendered directly via the Web Audio API with zero external audio files.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <div className="font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                Milestone Boss Battles
              </div>
              <p className="text-slate-400">
                Dynamic encounters with Gargoyle and Nightmare Overlord bosses featuring telegraphed attacks and survival rewards.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <div className="font-semibold text-purple-300 mb-1 flex items-center gap-1.5">
                <Skull className="w-3.5 h-3.5" />
                Save & Achievements
              </div>
              <p className="text-slate-400">
                Full client-side persistence tracks high scores, stats, best streaks, and 10 custom retro achievements.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        Bat Escape Arcade © 2026 Hemanth S. Built with HTML5 Canvas, Web Audio API & Next.js.
      </footer>
    </div>
  );
}

