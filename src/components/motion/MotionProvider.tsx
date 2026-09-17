'use client';

import React from 'react';
import { MotionConfig } from 'framer-motion';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </MotionConfig>
  );
}

