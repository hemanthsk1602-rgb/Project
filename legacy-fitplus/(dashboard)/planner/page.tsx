'use client';

import React, { useState } from 'react';
import { CalendarCheck, Plus, CheckCircle2, Circle, Clock, Flame, Play } from 'lucide-react';
import { SEED_TASKS, SEED_HABITS } from '@/lib/data/nexus-seed';

export default function PlannerPage() {
  const [tasks, setTasks] = useState(SEED_TASKS);
  const [habits, setHabits] = useState(SEED_HABITS);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <CalendarCheck className="w-4 h-4" />
            <span>Productivity Hub</span>
            <span className="text-gray-400 font-normal">• Phase 2 Target Module</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
            Tasks, Habits & Pomodoro
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            Linear-style task tracking designed for intense academic schedules.
          </p>
        </div>
      </div>

      {/* Task List */}
      <div className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">
            Active Tasks ({tasks.filter((t) => t.status !== 'completed').length} Pending)
          </h3>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => {
            const isDone = task.status === 'completed';
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isDone
                    ? 'bg-gray-50/50 dark:bg-gray-900/30 border-gray-200/40 opacity-60'
                    : 'border-gray-200 dark:border-gray-700/60 hover:border-amber-400'
                }`}
              >
                <button className="mt-0.5 text-gray-400">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDone ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                  {task.priority}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

