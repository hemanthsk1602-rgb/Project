'use client';

import React from 'react';
import { Bell, GraduationCap, Dumbbell, Wallet, CalendarCheck, CheckCheck } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 'notif-1',
      title: 'DBMS Exam Approaching in 4 Days',
      message: 'NEXUS suggests dedicating 45 minutes of revision before tonight\'s workout.',
      module: 'Study',
      time: '10 mins ago',
      unread: true,
      icon: GraduationCap,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30',
    },
    {
      id: 'notif-2',
      title: 'Workout Shortened by 15 Minutes',
      message: 'Push day routine adjusted from 50m to 35m to preserve evening study stamina.',
      module: 'Fitness',
      time: '1 hour ago',
      unread: true,
      icon: Dumbbell,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30',
    },
    {
      id: 'notif-3',
      title: 'Monthly Budget Health Warning',
      message: '₹800 remaining with 8 days to month end. Recommended safe daily spend: ₹100.',
      module: 'Finance',
      time: '4 hours ago',
      unread: false,
      icon: Wallet,
      color: 'text-green-500 bg-green-50 dark:bg-green-900/30',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
            System Notifications
          </h1>
          <p className="text-xs text-gray-500">Cross-module reminders and deadline alerts</p>
        </div>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
          <CheckCheck className="w-4 h-4" />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`p-4 rounded-card border transition-all flex items-start gap-4 ${
                n.unread
                  ? 'bg-white dark:bg-nexus-dark-card border-blue-200 dark:border-blue-900/60 shadow-sm'
                  : 'bg-white/60 dark:bg-nexus-dark-card/60 border-gray-200/60 dark:border-gray-800/60'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${n.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{n.title}</h4>
                  <span className="text-[11px] text-gray-400">{n.time}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

