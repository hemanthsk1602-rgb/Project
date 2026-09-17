'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glare?: boolean;
}

export function Card3D({
  children,
  className = '',
  depth = 12,
  glare = true,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position in relative space (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-performance spring configuration for organic tilt feel
  const springConfig = { stiffness: 350, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [depth, -depth]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-depth, depth]), springConfig);

  // Glare coordinates (0% to 100%)
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="inline-block w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.015, z: 20 }}
        transition={{ duration: 0.2 }}
        className={`relative overflow-hidden transition-shadow duration-300 ${
          isHovered ? 'shadow-[0_20px_50px_rgba(99,102,241,0.18)] dark:shadow-[0_25px_60px_rgba(129,140,248,0.14)]' : ''
        } ${className}`}
      >
        {/* Dynamic Specular 3D Glare Sheen */}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[inherit]"
            style={{
              opacity: isHovered ? 0.35 : 0,
              background: `radial-gradient(600px circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.22), transparent 45%)`,
            }}
          />
        )}

        {/* Card Content with 3D Spatial Depth */}
        <div style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

