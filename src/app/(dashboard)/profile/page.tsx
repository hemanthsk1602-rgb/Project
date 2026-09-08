'use client';

import React, { useState } from 'react';
import {
  User,
  Settings,
  Dumbbell,
  Target,
  Flame,
  Sparkles,
  Calendar,
  Clock,
  Scale,
  RefreshCw,
  Edit3,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import { useFitness } from '@/lib/context/FitnessContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { TrainingStyle, FitnessGoal } from '@/lib/types';

export default function ProfilePage() {
  const { profile, updateProfile, updateTrainingStyle, updateGoal, regeneratePlan } = useFitness();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit profile form state
  const [editForm, setEditForm] = useState({
    name: profile.name,
    age: profile.age,
    height: profile.height,
    weight: profile.weight,
    daysPerWeek: profile.daysPerWeek,
    workoutDuration: profile.workoutDuration,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditProfileOpen(false);
    showToast('Profile updated successfully!');
  };

  const handleSelectGoal = (goal: FitnessGoal) => {
    updateGoal(goal);
    setIsGoalModalOpen(false);
    showToast(`Goal updated to ${goal} & routine recalibrated!`);
  };

  const handleSelectStyle = (style: TrainingStyle) => {
    updateTrainingStyle(style);
    setIsStyleModalOpen(false);
    showToast(`Training style switched to ${style} & routine synthesized!`);
  };

  const handleRegenerate = () => {
    regeneratePlan();
    showToast('Workout plan regenerated with fresh variation!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
      <TopHeader
        title="Athlete Profile & Biometrics"
        subtitle="Manage your training attributes, goals, and customized routine architecture"
      />

      {/* Toast alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Profile Hero Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-emerald-400 to-emerald-500 flex items-center justify-center text-black font-black text-4xl shadow-xl shadow-emerald-500/20 border-2 border-slate-800">
            {profile.name.charAt(0)}
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-2xl sm:text-3xl font-black text-white">{profile.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Level {profile.level}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Discipline: <strong className="text-emerald-400">{profile.trainingStyle}</strong> • Goal: <strong className="text-cyan-400">{profile.goal}</strong>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {profile.experience} Tier • {profile.activityLevel}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setEditForm({
                name: profile.name,
                age: profile.age,
                height: profile.height,
                weight: profile.weight,
                daysPerWeek: profile.daysPerWeek,
                workoutDuration: profile.workoutDuration,
              });
              setIsEditProfileOpen(true);
            }}
            icon={<Edit3 className="w-4 h-4" />}
          >
            Edit Profile
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={handleRegenerate}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Regenerate Plan
          </Button>
        </div>
      </div>

      {/* Biometrics & Training Attributes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-400 block uppercase">Weight</span>
          <span className="text-2xl font-black text-white mt-1 block">{profile.weight} kg</span>
          <span className="text-[11px] text-emerald-400 font-medium">+1.4kg lean mass</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-400 block uppercase">Height</span>
          <span className="text-2xl font-black text-white mt-1 block">{profile.height} cm</span>
          <span className="text-[11px] text-slate-400 font-medium">Standard stature</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-400 block uppercase">Age</span>
          <span className="text-2xl font-black text-white mt-1 block">{profile.age} Years</span>
          <span className="text-[11px] text-slate-400 font-medium">Prime adaptation</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-400 block uppercase">Frequency</span>
          <span className="text-2xl font-black text-cyan-400 mt-1 block">
            {profile.daysPerWeek} Days / Wk
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {profile.workoutDuration} min / session
          </span>
        </div>
      </div>

      {/* Quick Action Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Change Goal Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Fitness Goal</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Currently set to <strong className="text-cyan-400">{profile.goal}</strong>. Changing your goal adjusts volume distribution and rep tempos.
            </p>
          </div>
          <button
            onClick={() => setIsGoalModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
          >
            Change Goal &rarr;
          </button>
        </div>

        {/* Change Training Style Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Training Discipline</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Currently set to <strong className="text-emerald-400">{profile.trainingStyle}</strong>. Switch between Gym, Calisthenics, or Hybrid anytime.
            </p>
          </div>
          <button
            onClick={() => setIsStyleModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
          >
            Change Training Style &rarr;
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edit Profile Attributes"
        subtitle="Update your biometrics and workout parameters"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
              <input
                type="number"
                value={editForm.age}
                onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Height (cm)</label>
              <input
                type="number"
                value={editForm.height}
                onChange={(e) => setEditForm({ ...editForm, height: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={editForm.weight}
                onChange={(e) => setEditForm({ ...editForm, weight: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Days / Week</label>
              <select
                value={editForm.daysPerWeek}
                onChange={(e) => setEditForm({ ...editForm, daysPerWeek: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
              >
                {[3, 4, 5, 6, 7].map((d) => (
                  <option key={d} value={d}>
                    {d} Days / Week
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Duration</label>
              <select
                value={editForm.workoutDuration}
                onChange={(e) => setEditForm({ ...editForm, workoutDuration: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
              >
                {[20, 30, 45, 60, 75].map((d) => (
                  <option key={d} value={d}>
                    {d} Minutes
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <Button variant="primary" size="md" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Change Goal Modal */}
      <Modal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        title="Select New Fitness Goal"
        subtitle="FitPlus will adapt your training plan immediately"
        maxWidth="md"
      >
        <div className="space-y-2.5">
          {(
            [
              'Build Muscle',
              'Lose Fat',
              'Build Strength',
              'Improve Fitness',
              'Calisthenics Skills',
              'General Fitness',
            ] as FitnessGoal[]
          ).map((g) => (
            <div
              key={g}
              onClick={() => handleSelectGoal(g)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                profile.goal === g
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span className="text-sm">{g}</span>
              {profile.goal === g && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </div>
          ))}
        </div>
      </Modal>

      {/* Change Training Style Modal */}
      <Modal
        isOpen={isStyleModalOpen}
        onClose={() => setIsStyleModalOpen(false)}
        title="Choose Training Style"
        subtitle="Select your preferred discipline to rebuild your split"
        maxWidth="md"
      >
        <div className="space-y-3">
          {[
            {
              id: 'Gym',
              icon: '🏋️',
              title: 'Gym Weightlifting',
              desc: 'Barbell, Dumbbell & Machine overload',
            },
            {
              id: 'Calisthenics',
              icon: '🤸',
              title: 'Calisthenics Mastery',
              desc: 'Bodyweight strength, levers and skill trees',
            },
            {
              id: 'Hybrid',
              icon: '🔀',
              title: 'Hybrid Split',
              desc: 'Alternating gym strength and bodyweight agility',
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectStyle(item.id as TrainingStyle)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                profile.trainingStyle === item.id
                  ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h5 className="text-sm font-bold text-white">{item.title}</h5>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </div>
              {profile.trainingStyle === item.id && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

