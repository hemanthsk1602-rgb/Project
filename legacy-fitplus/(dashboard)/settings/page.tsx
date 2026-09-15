'use client';

import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Moon,
  Shield,
  Dumbbell,
  RefreshCw,
  User,
  Sliders,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  Volume2,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { TrainingStyle } from '@/lib/types';

export default function SettingsPage() {
  const { profile, updateTrainingStyle, regeneratePlan } = useFitness();

  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [restTimerSound, setRestTimerSound] = useState(true);

  // Style change prompt state
  const [pendingStyle, setPendingStyle] = useState<TrainingStyle | null>(null);
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInitiateStyleChange = (style: TrainingStyle) => {
    if (style === profile.trainingStyle) return;
    setPendingStyle(style);
    setShowRegenModal(true);
  };

  const handleConfirmRegeneration = () => {
    if (pendingStyle) {
      updateTrainingStyle(pendingStyle);
      setShowRegenModal(false);
      setPendingStyle(null);
      showToast(`Training preference changed to ${pendingStyle} and your workout plan was regenerated!`);
    }
  };

  const handleCancelRegeneration = () => {
    setShowRegenModal(false);
    setPendingStyle(null);
  };

  const handleResetDemoData = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto font-outfit">
      {/* Header */}
      <TopHeader
        title="Settings & Preferences"
        subtitle="Manage your application settings, notifications, training parameters, and privacy"
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-[#D5FF3E]/10 border border-[#D5FF3E]/30 text-[#D5FF3E] text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Section 1: Workout Preferences & Style Change */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-2xl bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/20">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Workout & Discipline Preferences</h3>
              <p className="text-xs text-slate-400">
                Choose how FitPlus programs your weekly split and exercises
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Current Training Discipline
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Gym', 'Calisthenics', 'Hybrid'] as TrainingStyle[]).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleInitiateStyleChange(style)}
                  className={`p-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    profile.trainingStyle === style
                      ? 'bg-[#D5FF3E] text-black border-[#D5FF3E] shadow-[0_0_20px_rgba(213,255,62,0.3)]'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="text-base">{style === 'Gym' ? '🏋️' : style === 'Calisthenics' ? '🤸' : '🔀'}</span>
                  <span>{style}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Units of Measurement */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Units & System Settings</h3>
              <p className="text-xs text-slate-400">Weight, distance, and height measurement formats</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-white block">Unit System</span>
              <span className="text-xs text-slate-400">
                {unitSystem === 'metric' ? 'Metric (kg, cm, Liters)' : 'Imperial (lbs, inches, fl oz)'}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => {
                  setUnitSystem('metric');
                  showToast('Units set to Metric (kg, cm)');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  unitSystem === 'metric'
                    ? 'bg-[#D5FF3E] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => {
                  setUnitSystem('imperial');
                  showToast('Units set to Imperial (lbs, in)');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  unitSystem === 'imperial'
                    ? 'bg-[#D5FF3E] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Imperial
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Notifications & Audio */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Notifications & Sound</h3>
              <p className="text-xs text-slate-400">Reminders, streak alerts, and rest timers</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <span className="text-sm font-bold text-white block">Workout Reminders</span>
              <span className="text-xs text-slate-400">Daily prompts to keep your workout streak active</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                notificationsEnabled ? 'bg-[#D5FF3E]' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full transition-transform ${
                  notificationsEnabled ? 'translate-x-6 bg-black' : 'translate-x-0 bg-white'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-white/5 pt-4">
            <div>
              <span className="text-sm font-bold text-white block">Rest Timer Sound Cues</span>
              <span className="text-xs text-slate-400">
                Audible chime when set rest countdown reaches 0s
              </span>
            </div>
            <button
              onClick={() => setRestTimerSound(!restTimerSound)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                restTimerSound ? 'bg-[#D5FF3E]' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full transition-transform ${
                  restTimerSound ? 'translate-x-6 bg-black' : 'translate-x-0 bg-white'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section 4: Account & Reset Demo Data */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Account & Data Management</h3>
              <p className="text-xs text-slate-400">Local storage synchronization and reset</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-sm font-bold text-white block">Reset Local Demo Storage</span>
              <span className="text-xs text-slate-400">
                Resets profile, nutrition, workouts, and achievements back to initial mock defaults
              </span>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={handleResetDemoData}
              icon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Reset Data
            </Button>
          </div>
        </div>
      </div>

      {/* Plan Regeneration Prompt Modal */}
      <Modal
        isOpen={showRegenModal}
        onClose={handleCancelRegeneration}
        title="Regenerate Workout Plan?"
        subtitle="You are updating your training preference"
        maxWidth="md"
      >
        <div className="space-y-5 text-center py-2 font-outfit">
          <div className="w-14 h-14 rounded-2xl bg-[#D5FF3E]/10 border border-[#D5FF3E]/20 text-[#D5FF3E] flex items-center justify-center mx-auto text-2xl shadow-[0_0_20px_rgba(213,255,62,0.15)]">
            <RefreshCw className="w-7 h-7 animate-spin-slow" />
          </div>

          <div>
            <h4 className="text-base font-bold text-white">
              Switching from {profile.trainingStyle} &rarr; {pendingStyle}
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              "Would you like FitPlus to regenerate your workout plan?"
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              This will re-calculate your 7-day schedule, exercise pool, and progression trees to match {pendingStyle}.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCancelRegeneration}
              className="flex-1 py-3 rounded-full bg-white/[0.05] hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors border border-white/10"
            >
              Cancel
            </button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleConfirmRegeneration}
            >
              Regenerate Plan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
