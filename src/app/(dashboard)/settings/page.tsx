'use client';

import React from 'react';
import { Settings, Moon, Bell, Database, Shield, Sliders } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useAuth } from '@/lib/auth/AuthContext';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { isDemoMode, supabaseConnected } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
          System Preferences
        </h1>
        <p className="text-xs text-gray-500">Configure theme, AI integration, and provider settings</p>
      </div>

      <div className="space-y-4">
        {/* Theme Settings */}
        <div className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Moon className="w-4 h-4 text-blue-500" />
            <span>Appearance & Theme</span>
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Select your preferred interface display mode.
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {(['dark', 'light', 'system'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                  theme === mode
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Integration Status */}
        <div className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
          <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-500" />
            <span>Database & Provider Status</span>
          </h3>
          <div className="space-y-3 mt-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Supabase Connection</span>
              <span className={`px-2 py-0.5 rounded font-bold ${supabaseConnected ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>
                {supabaseConnected ? 'Connected (Live RLS)' : 'Local Demo Mode'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <span className="font-semibold text-gray-700 dark:text-gray-300">AI LLM Provider</span>
              <span className="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                Development Mock Provider
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Maps & Transit Provider</span>
              <span className="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                Demo Transit Provider
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
