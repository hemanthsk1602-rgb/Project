'use client';

import React, { useState } from 'react';
import { AlertTriangle, Info, ExternalLink, X } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

export function DemoBanner() {
  const { isDemoMode, supabaseConnected } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (!isDemoMode || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-500 text-white dark:bg-amber-500/30 dark:text-amber-200">
          Demo Mode
        </span>
        <span className="truncate">
          Operating with pre-loaded development student profile & sample data. External live APIs (Supabase, Maps, AI) are currently unconfigured.
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 font-semibold underline hover:text-amber-900 dark:hover:text-amber-100"
        >
          <span>Connect Services</span>
          <ExternalLink className="w-3 h-3" />
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-amber-500/20 rounded transition-colors"
          aria-label="Dismiss demo banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

