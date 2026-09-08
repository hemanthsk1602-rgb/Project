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

  // Style change prompt state (Section 21 requirement)
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
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <TopHeader
        title="Settings & Preferences"
        subtitle="Manage your application settings, notifications, training parameters, and privacy"
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Section 1: Workout Preferences & Style Change (Section 21) */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Workout & Discipline Preferences</h3>
              <p className="text-xs text-slate-400">
                Choose how FitPlus programs your weekly split and exercises
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Current Training Discipline
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Gym', 'Calisthenics', 'Hybrid'] as TrainingStyle[]).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleInitiateStyleChange(style)}
                  className={`p-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    profile.trainingStyle === style
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{style === 'Gym' ? '🏋️' : style === 'Calisthenics' ? '🤸' : '🔀'}</span>
                  <span>{style}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Units of Measurement */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Units & System Settings</h3>
              <p className="text-xs text-slate-400">Weight, distance, and height formats</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-white block">Unit System</span>
              <span className="text-xs text-slate-400">
                {unitSystem === 'metric' ? 'Metric (kg, cm, Liters)' : 'Imperial (lbs, inches, fl oz)'}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setUnitSystem('metric');
                  showToast('Units set to Metric (kg, cm)');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  unitSystem === 'metric'
                    ? 'bg-emerald-500 text-black'
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  unitSystem === 'imperial'
                    ? 'bg-emerald-500 text-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Imperial
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Notifications & Audio */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Notifications & Sound</h3>
              <p className="text-xs text-slate-400">Reminders, streak alerts, and rest timers</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <span className="text-sm font-bold text-white block">Workout Reminders</span>
              <span className="text-xs text-slate-400">Daily prompts to keep your streak alive</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-slate-800/80 pt-3">
            <div>
              <span className="text-sm font-bold text-white block">Rest Timer Sound Cues</span>
              <span className="text-xs text-slate-400">
                Audible chime when set rest countdown reaches 0s
              </span>
            </div>
            <button
              onClick={() => setRestTimerSound(!restTimerSound)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                restTimerSound ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  restTimerSound ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section 4: Account & Reset Demo Data */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Account & Data Management</h3>
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

      {/* Plan Regeneration Prompt Modal (Section 21) */}
      <Modal
        isOpen={showRegenModal}
        onClose={handleCancelRegeneration}
        title="Regenerate Workout Plan?"
        subtitle="You are updating your training preference"
        maxWidth="md"
      >
        <div className="space-y-5 text-center py-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto text-2xl">
            <RefreshCw className="w-7 h-7" />
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
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
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

