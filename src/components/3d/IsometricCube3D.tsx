'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface IsometricCube3DProps {
  color?: 'brand' | 'emerald' | 'amber' | 'rose' | 'cyan';
  size?: number;
}

export function IsometricCube3D({
  color = 'brand',
  size = 40,
}: IsometricCube3DProps) {
  const colorMap = {
    brand: {
      top: 'bg-brand-400',
      left: 'bg-brand-600',
      right: 'bg-brand-500',
      shadow: 'rgba(99, 102, 241, 0.4)',
    },
    emerald: {
      top: 'bg-emerald-400',
      left: 'bg-emerald-600',
      right: 'bg-emerald-500',
      shadow: 'rgba(16, 185, 129, 0.4)',
    },
    amber: {
      top: 'bg-amber-400',
      left: 'bg-amber-600',
      right: 'bg-amber-500',
      shadow: 'rgba(245, 158, 11, 0.4)',
    },
    rose: {
      top: 'bg-rose-400',
      left: 'bg-rose-600',
      right: 'bg-rose-500',
      shadow: 'rgba(244, 63, 94, 0.4)',
    },
    cyan: {
      top: 'bg-cyan-400',
      left: 'bg-cyan-600',
      right: 'bg-cyan-500',
      shadow: 'rgba(6, 182, 212, 0.4)',
    },
  };

  const scheme = colorMap[color];
  const halfSize = size / 2;

  return (
    <motion.div
      animate={{
        y: [0, -6, 0],
        rotateY: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        width: size,
        height: size,
        perspective: 600,
        transformStyle: 'preserve-3d',
      }}
      className="inline-block relative shrink-0"
    >
      <div
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-25deg) rotateY(45deg)',
        }}
        className="relative"
      >
        {/* Front Face */}
        <div
          style={{
            transform: `translateZ(${halfSize}px)`,
            boxShadow: `0 0 15px ${scheme.shadow}`,
          }}
          className={`absolute inset-0 ${scheme.left} opacity-90 border border-white/20 rounded-sm`}
        />
        {/* Back Face */}
        <div
          style={{
            transform: `rotateY(180deg) translateZ(${halfSize}px)`,
          }}
          className={`absolute inset-0 ${scheme.left} opacity-80 border border-white/20 rounded-sm`}
        />
        {/* Right Face */}
        <div
          style={{
            transform: `rotateY(90deg) translateZ(${halfSize}px)`,
          }}
          className={`absolute inset-0 ${scheme.right} opacity-95 border border-white/20 rounded-sm`}
        />
        {/* Left Face */}
        <div
          style={{
            transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
          }}
          className={`absolute inset-0 ${scheme.right} opacity-85 border border-white/20 rounded-sm`}
        />
        {/* Top Face */}
        <div
          style={{
            transform: `rotateX(90deg) translateZ(${halfSize}px)`,
          }}
          className={`absolute inset-0 ${scheme.top} opacity-100 border border-white/30 rounded-sm`}
        />
        {/* Bottom Face */}
        <div
          style={{
            transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
          }}
          className={`absolute inset-0 ${scheme.left} opacity-70 border border-white/10 rounded-sm`}
        />
      </div>
    </motion.div>
  );
}

