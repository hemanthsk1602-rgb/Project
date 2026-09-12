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
  BedDouble,
  BrainCircuit,
  Flame,
  Gauge,
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
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto font-outfit">
      {/* Header */}
      <TopHeader
        title="Recovery & Systemic Readiness"
        subtitle={`Monitoring autonomic recovery, sleep architecture, and muscular repair for ${profile.name}`}
      />

      {/* Top Banner: Circular Recovery Gauge & AI Verdict */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/40 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#D5FF3E]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-7 text-center sm:text-left relative z-10">
          <CircularProgress
            value={recovery.score}
            max={100}
            size={160}
            strokeWidth={14}
            color="lime"
            label="Recovery"
            sublabel={recovery.score >= 80 ? 'Optimal' : recovery.score >= 60 ? 'Moderate' : 'Low'}
          />
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 text-[#D5FF3E] text-xs font-bold uppercase tracking-wider mb-2">
              <Gauge className="w-3.5 h-3.5" />
              <span>Readiness Status</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {recovery.score >= 80 ? 'Primed for High Output' : recovery.score >= 60 ? 'Adequate Systemic Recovery' : 'Deload & Restoration Advised'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg leading-relaxed bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
              "{recovery.aiRecommendation}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full md:w-auto relative z-10">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center min-w-[100px]">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Sleep</span>
            <span className="text-base font-black text-white mt-1 block">
              {recovery.sleepHours}h {recovery.sleepMinutes}m
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center min-w-[100px]">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Energy</span>
            <span className="text-base font-black text-[#D5FF3E] mt-1 block">
              {recovery.energyLevel}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center min-w-[100px]">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Soreness</span>
            <span className="text-base font-black text-cyan-400 mt-1 block">
              {recovery.sorenessLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Detailed Breakdown + Interactive Logger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recovery Metrics Deep Dive */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h4 className="text-lg font-bold text-white tracking-tight">Biometric Indicators</h4>
              <p className="text-xs text-slate-400 mt-0.5">Real-time physiological markers & recovery trends</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 flex items-center justify-center text-[#D5FF3E]">
              <BrainCircuit className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-3.5">
            {/* Sleep Quality */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Sleep Duration & Rest</h5>
                  <span className="text-xs text-slate-400">Target: 8h 00m ({sleepHours}h {sleepMinutes}m logged)</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#D5FF3E] bg-[#D5FF3E]/10 px-3 py-1 rounded-full border border-[#D5FF3E]/20">
                {Math.min(100, Math.round(((sleepHours + sleepMinutes / 60) / 8) * 100))}% Target
              </span>
            </div>

            {/* HRV */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/20">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Heart Rate Variability (HRV)</h5>
                  <span className="text-xs text-slate-400">68 ms (Baseline: 62-72 ms)</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#D5FF3E] bg-[#D5FF3E]/10 px-3 py-1 rounded-full border border-[#D5FF3E]/20">
                Optimal
              </span>
            </div>

            {/* Muscle Soreness Areas */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Reported Soreness Areas</h5>
                  <span className="text-xs text-slate-400">
                    {recovery.sorenessAreas.length > 0 ? recovery.sorenessAreas.join(', ') : 'None reported'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                {recovery.sorenessLevel}
              </span>
            </div>

            {/* Rest Days This Week */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Rest Days Taken This Week</h5>
                  <span className="text-xs text-slate-400">Scheduled active recovery & mobility</span>
                </div>
              </div>
              <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/10">
                {recovery.restDaysThisWeek} Days
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Recovery Logger */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl shadow-black/40">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight">Log Today's Recovery</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your daily sleep and subjective fatigue to adapt routines
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 flex items-center justify-center text-[#D5FF3E]">
                <Sliders className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-5">
              {/* Sleep Hours & Mins */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Last Night's Sleep
                  </label>
                  <span className="text-xs font-bold text-[#D5FF3E] font-mono bg-[#D5FF3E]/10 px-2 py-0.5 rounded-md border border-[#D5FF3E]/20">
                    {sleepHours}h {sleepMinutes}m
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="4"
                    max="12"
                    step="1"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(Number(e.target.value))}
                    className="flex-1 accent-[#D5FF3E] h-2 bg-white/10 rounded-lg cursor-pointer"
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
                      className={`py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                        energyLevel === lvl
                          ? 'bg-[#D5FF3E] border-[#D5FF3E] text-black shadow-[0_0_15px_rgba(213,255,62,0.3)]'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
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
                      className={`py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                        sorenessLevel === s
                          ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {saveToast && (
              <span className="text-xs text-[#D5FF3E] font-bold animate-in fade-in flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Recovery metrics updated!
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

