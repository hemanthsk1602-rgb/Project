'use client';

import React, { useState } from 'react';
import {
  HeartPulse,
  Moon,
  Zap,
  Activity,
  BatteryCharging,
  ShieldCheck,
  Sparkles,
  Calendar,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { Button } from '@/components/ui/Button';

export default function RecoveryPage() {
  const { profile, recovery, updateRecoveryData } = useFitness();

  const [sleepHours, setSleepHours] = useState(recovery.sleepHours);
  const [sleepMinutes, setSleepMinutes] = useState(recovery.sleepMinutes);
  const [energyLevel, setEnergyLevel] = useState(recovery.energyLevel);
  const [sorenessLevel, setSorenessLevel] = useState(recovery.sorenessLevel);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveRecovery = () => {
    // Calculate new recovery score
    let score = 50;
    const totalSleepHours = sleepHours + sleepMinutes / 60;
    if (totalSleepHours >= 8) score += 30;
    else if (totalSleepHours >= 7) score += 25;
    else if (totalSleepHours >= 6) score += 15;
    else score += 5;

    if (energyLevel === 'Peak') score += 15;
    else if (energyLevel === 'Good') score += 12;
    else if (energyLevel === 'Moderate') score += 8;
    else score += 2;

    if (sorenessLevel === 'None') score += 10;
    else if (sorenessLevel === 'Low') score += 8;
    else if (sorenessLevel === 'Moderate') score += 4;
    else score -= 5;

    const clampedScore = Math.min(100, Math.max(20, score));

    let aiRecommendation = '';
    if (clampedScore >= 80) {
      aiRecommendation = `Your recovery is optimal (${clampedScore}/100). Central nervous system fatigue is low. You are cleared for high-intensity progressive overload today.`;
    } else if (clampedScore >= 60) {
      aiRecommendation = `Your recovery looks moderate (${clampedScore}/100). You're ready for a standard training session; consider an extra 1-2 minutes of mobility before primary lifts.`;
    } else {
      aiRecommendation = `Your recovery is strained (${clampedScore}/100). Prioritize an active recovery deload session or low-intensity mobility walk.`;
    }

    updateRecoveryData({
      score: clampedScore,
      sleepHours,
      sleepMinutes,
      energyLevel,
      sorenessLevel,
      aiRecommendation,
    });

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      {/* Header */}
      <TopHeader
        title="Recovery & Systemic Readiness"
        subtitle={`Monitoring autonomic recovery, sleep architecture, and muscular repair for ${profile.name}`}
      />

      {/* Top Banner: Circular Recovery Gauge & AI Verdict */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <CircularProgress
            value={recovery.score}
            max={100}
            size={150}
            strokeWidth={12}
            color="emerald"
            label="Recovery"
            sublabel={recovery.score >= 80 ? 'Optimal' : 'Moderate'}
          />
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Readiness Status
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {recovery.score >= 80 ? 'Primed for High Output' : 'Adequate Recovery'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md leading-relaxed">
              "{recovery.aiRecommendation}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Sleep</span>
            <span className="text-sm font-black text-white mt-0.5 block">
              {recovery.sleepHours}h {recovery.sleepMinutes}m
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Energy</span>
            <span className="text-sm font-black text-emerald-400 mt-0.5 block">
              {recovery.energyLevel}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Soreness</span>
            <span className="text-sm font-black text-cyan-400 mt-0.5 block">
              {recovery.sorenessLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Detailed Breakdown + Interactive Logger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recovery Metrics Deep Dive */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
          <h4 className="text-lg font-bold text-white">Biometric Indicators</h4>

          <div className="space-y-3.5">
            {/* Sleep Quality */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Sleep Duration & Rest</h5>
                  <span className="text-xs text-slate-400">Target: 8h 00m (7h 40m logged)</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                96% Target
              </span>
            </div>

            {/* HRV */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Heart Rate Variability (HRV)</h5>
                  <span className="text-xs text-slate-400">68 ms (Baseline: 62-72 ms)</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Optimal
              </span>
            </div>

            {/* Muscle Soreness Areas */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Reported Muscle Soreness</h5>
                  <span className="text-xs text-slate-400">
                    {recovery.sorenessAreas.join(', ')}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                Mild
              </span>
            </div>

            {/* Rest Days This Week */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Rest Days Taken This Week</h5>
                  <span className="text-xs text-slate-400">Active recovery and mobility</span>
                </div>
              </div>
              <span className="text-xs font-bold text-white bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                {recovery.restDaysThisWeek} Days
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Recovery Logger */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">Log Today's Recovery</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your daily sleep and subjective fatigue to adapt routines
                </p>
              </div>
              <Sliders className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-4">
              {/* Sleep Hours & Mins */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Last Night's Sleep: {sleepHours}h {sleepMinutes}m
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="4"
                    max="12"
                    step="1"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(Number(e.target.value))}
                    className="flex-1 accent-emerald-500"
                  />
                  <span className="text-xs text-slate-400 font-mono w-14 text-right">
                    {sleepHours} hrs
                  </span>
                </div>
              </div>

              {/* Energy Level */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Subjective Energy Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Low', 'Moderate', 'Good', 'Peak'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setEnergyLevel(lvl)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        energyLevel === lvl
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Muscle Soreness */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Muscle Soreness Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['None', 'Low', 'Moderate', 'High'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSorenessLevel(s)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        sorenessLevel === s
                          ? 'bg-cyan-500/15 border-cyan-500 text-cyan-400'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {saveToast && (
              <span className="text-xs text-emerald-400 font-semibold animate-in fade-in flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Recovery metrics updated!
              </span>
            )}
            <Button
              variant="primary"
              size="md"
              className="ml-auto"
              onClick={handleSaveRecovery}
            >
              Save & Recalculate Score
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

