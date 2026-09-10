'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type AIOrbState = 'idle' | 'thinking' | 'speaking' | 'alert';

interface NexusOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  state?: AIOrbState;
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeMap = {
  sm: { outer: 'w-8 h-8', core: 'w-4 h-4', glow: 'w-10 h-10' },
  md: { outer: 'w-12 h-12', core: 'w-6 h-6', glow: 'w-16 h-16' },
  lg: { outer: 'w-24 h-24', core: 'w-12 h-12', glow: 'w-32 h-32' },
  xl: { outer: 'w-40 h-40', core: 'w-20 h-20', glow: 'w-56 h-56' },
};

export function NexusOrb({
  size = 'md',
  state = 'idle',
  showBadge = false,
  className = '',
  onClick,
}: NexusOrbProps) {
  const { outer, core, glow } = sizeMap[size];

  // Dynamic animation speeds and colors based on state
  const rotationDuration = state === 'thinking' ? 4 : state === 'speaking' ? 7 : 18;
  const pulseScale = state === 'thinking' ? [1, 1.18, 1] : state === 'alert' ? [1, 1.25, 0.95, 1] : [1, 1.08, 1];
  const pulseDuration = state === 'thinking' ? 1.4 : state === 'alert' ? 1.0 : 4;

  const glowColor =
    state === 'alert'
      ? 'from-amber-500/40 via-red-500/20 to-transparent'
      : state === 'speaking'
      ? 'from-violet-500/50 via-cyan-500/25 to-transparent'
      : 'from-violet-600/45 via-indigo-600/25 to-transparent';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group ${className}`}
    >
      {/* Outer ambient glow halo */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{
          duration: pulseDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute rounded-full bg-gradient-radial ${glowColor} blur-xl pointer-events-none ${glow}`}
      />

      {/* Ring 1: Outer counter-clockwise rotating orbital */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: rotationDuration * 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`absolute rounded-full border border-violet-500/30 border-dashed ${outer}`}
      />

      {/* Ring 2: Primary clockwise rotating gradient shell */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`relative rounded-full p-[1px] bg-gradient-to-tr from-violet-600 via-indigo-400 to-cyan-400 shadow-ai-glow ${outer}`}
      >
        <div className="w-full h-full rounded-full bg-nexus-dark-bg/80 dark:bg-[#0B0F19]/90 backdrop-blur-md flex items-center justify-center overflow-hidden">
          {/* Internal energetic swirl */}
          <motion.div
            animate={{
              scale: pulseScale,
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: pulseDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full rounded-full opacity-60 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500 via-fuchsia-500 to-indigo-900 filter blur-xs"
          />
        </div>
      </motion.div>

      {/* Central Pulsing AI Core */}
      <motion.div
        animate={{
          scale: pulseScale,
        }}
        transition={{
          duration: pulseDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute rounded-full bg-gradient-to-br from-white via-violet-200 to-violet-500 shadow-lg shadow-violet-500/50 ${core}`}
      />

      {/* Optional State Badge */}
      {showBadge && (
        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-600 border border-white/40" />
        </span>
      )}
    </div>
  );
}

