'use client';

import React from 'react';

export function PerspectiveGrid3D() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10" aria-hidden="true">
      {/* 3D Horizon Grid Plane */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240%] h-[550px] opacity-25 dark:opacity-35"
        style={{
          perspective: '600px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            transform: 'rotateX(72deg) translateY(-20px)',
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1) 40%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1) 40%, transparent 95%)',
          }}
        />
      </div>

      {/* Atmospheric Horizon Glow */}
      <div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-t from-brand-500/20 via-indigo-500/10 to-transparent blur-3xl rounded-full"
      />
    </div>
  );
}

