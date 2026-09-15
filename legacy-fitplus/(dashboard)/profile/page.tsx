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
  Activity,
  Zap,
  Award,
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
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto font-outfit">
      {/* Header */}
      <TopHeader
        title="Athlete Profile & Biometrics"
        subtitle="Manage your training attributes, goals, and customized routine architecture"
      />

      {/* Toast alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-[#D5FF3E]/10 border border-[#D5FF3E]/30 text-[#D5FF3E] text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Profile Hero Card */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/40 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#D5FF3E]/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative z-10">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#07090E] to-white/10 border-2 border-[#D5FF3E] flex items-center justify-center text-[#D5FF3E] font-black text-4xl shadow-xl shadow-[#D5FF3E]/20">
            {profile.name.charAt(0)}
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1.5">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{profile.name}</h2>
              <span className="px-3 py-1 rounded-full bg-[#D5FF3E]/15 text-[#D5FF3E] text-xs font-bold border border-[#D5FF3E]/30 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Level {profile.level}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Discipline: <strong className="text-[#D5FF3E]">{profile.trainingStyle}</strong> • Goal: <strong className="text-cyan-400">{profile.goal}</strong>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {profile.experience} Tier • {profile.activityLevel}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
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
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-5 text-center shadow-xl shadow-black/30 hover:border-white/20 transition-all">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Weight</span>
          <span className="text-2xl sm:text-3xl font-black text-white mt-1 block tracking-tight">{profile.weight} kg</span>
          <span className="text-[11px] text-[#D5FF3E] font-bold mt-0.5 block">+1.4kg lean mass</span>
        </div>

        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-5 text-center shadow-xl shadow-black/30 hover:border-white/20 transition-all">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Height</span>
          <span className="text-2xl sm:text-3xl font-black text-white mt-1 block tracking-tight">{profile.height} cm</span>
          <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">Standard stature</span>
        </div>

        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-5 text-center shadow-xl shadow-black/30 hover:border-white/20 transition-all">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Age</span>
          <span className="text-2xl sm:text-3xl font-black text-white mt-1 block tracking-tight">{profile.age} Years</span>
          <span className="text-[11px] text-[#D5FF3E] font-medium mt-0.5 block">Prime adaptation</span>
        </div>

        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-5 text-center shadow-xl shadow-black/30 hover:border-white/20 transition-all">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Frequency</span>
          <span className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1 block tracking-tight">
            {profile.daysPerWeek} Days / Wk
          </span>
          <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
            {profile.workoutDuration} min / session
          </span>
        </div>
      </div>

      {/* Quick Action Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Change Goal Card */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-2xl shadow-black/40 hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">Fitness Goal</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Currently set to <strong className="text-cyan-400">{profile.goal}</strong>. Changing your goal automatically adjusts volume distribution, load intensity, and rep tempos.
            </p>
          </div>

          <button
            onClick={() => setIsGoalModalOpen(true)}
            className="w-full py-3 rounded-full bg-white/[0.05] hover:bg-[#D5FF3E] hover:text-black text-slate-200 text-xs font-bold border border-white/10 hover:border-[#D5FF3E] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Change Fitness Goal</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Change Training Style Card */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-2xl shadow-black/40 hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-2xl bg-[#D5FF3E]/10 text-[#D5FF3E] border border-[#D5FF3E]/20">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">Training Discipline</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Currently set to <strong className="text-[#D5FF3E]">{profile.trainingStyle}</strong>. Switch between Gym Weightlifting, Calisthenics Mastery, or Hybrid Split anytime.
            </p>
          </div>

          <button
            onClick={() => setIsStyleModalOpen(true)}
            className="w-full py-3 rounded-full bg-white/[0.05] hover:bg-[#D5FF3E] hover:text-black text-slate-200 text-xs font-bold border border-white/10 hover:border-[#D5FF3E] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Change Training Discipline</span>
            <span>&rarr;</span>
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
        <div className="space-y-4 font-outfit">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D5FF3E]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Age</label>
              <input
                type="number"
                value={editForm.age}
                onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D5FF3E]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Height (cm)</label>
              <input
                type="number"
                value={editForm.height}
                onChange={(e) => setEditForm({ ...editForm, height: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D5FF3E]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Weight (kg)</label>
              <input
                type="number"
                value={editForm.weight}
                onChange={(e) => setEditForm({ ...editForm, weight: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D5FF3E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Days / Week</label>
              <select
                value={editForm.daysPerWeek}
                onChange={(e) => setEditForm({ ...editForm, daysPerWeek: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D5FF3E]"
              >
                {[3, 4, 5, 6, 7].map((d) => (
                  <option key={d} value={d}>
                    {d} Days / Week
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Duration</label>
              <select
                value={editForm.workoutDuration}
                onChange={(e) => setEditForm({ ...editForm, workoutDuration: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D5FF3E]"
              >
                {[20, 30, 45, 60, 75].map((d) => (
                  <option key={d} value={d}>
                    {d} Minutes
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-2.5">
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 rounded-full bg-white/[0.05] text-slate-400 hover:text-white text-xs font-bold border border-white/10 transition-colors"
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
        <div className="space-y-2.5 font-outfit">
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
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                profile.goal === g
                  ? 'bg-[#D5FF3E]/15 border-[#D5FF3E] text-[#D5FF3E] font-bold shadow-[0_0_15px_rgba(213,255,62,0.15)]'
                  : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:border-white/20'
              }`}
            >
              <span className="text-sm">{g}</span>
              {profile.goal === g && <CheckCircle2 className="w-5 h-5 text-[#D5FF3E]" />}
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
        <div className="space-y-3 font-outfit">
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
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                profile.trainingStyle === item.id
                  ? 'bg-[#D5FF3E]/15 border-[#D5FF3E] text-white font-bold shadow-[0_0_15px_rgba(213,255,62,0.15)]'
                  : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:border-white/20'
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
                <CheckCircle2 className="w-5 h-5 text-[#D5FF3E]" />
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
