'use client';

import React from 'react';
import { GraduationCap, BookOpen, Clock, Calendar, CheckCircle, FileText } from 'lucide-react';
import { SEED_SUBJECTS, SEED_EXAMS, SEED_ASSIGNMENTS } from '@/lib/data/nexus-seed';

export default function StudyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Study Hub</span>
            <span className="text-gray-400 font-normal">• Phase 3 Architecture Ready</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
            Academic Management & Notes
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            Track subjects, upcoming exams, attendance quotas, and study materials.
          </p>
        </div>
      </div>

      {/* Approaching Exams Banner */}
      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <div>
            <p className="text-sm font-bold text-blue-900 dark:text-blue-200">
              Next Critical Assessment: {SEED_EXAMS[0].title}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Countdown: {SEED_EXAMS[0].daysRemaining} days remaining • Total Marks: {SEED_EXAMS[0].totalMarks}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white self-start md:self-auto">
          High Priority
        </span>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SEED_SUBJECTS.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {sub.code}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {sub.currentAttendancePercentage}% Attendance
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">
                {sub.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {sub.topicsCompleted} of {sub.totalTopics} Topics Completed
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${sub.progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
              <span>Next: {sub.nextExamDate}</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {sub.studyMinutesThisWeek}m this week
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

