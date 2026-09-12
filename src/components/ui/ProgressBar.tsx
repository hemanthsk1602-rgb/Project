import React from 'react';

interface ProgressBarProps {
  value: number; // current value
  max: number; // max value
  label?: string;
  sublabel?: string;
  color?: 'lime' | 'emerald' | 'cyan' | 'orange' | 'purple' | 'blue';
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  sublabel,
  color = 'lime',
  showPercentage = false,
  height = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));

  const colorStyles = {
    lime: 'bg-[#D5FF3E] shadow-[0_0_12px_rgba(213,255,62,0.5)]',
    emerald: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
    cyan: 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]',
    orange: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
    purple: 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]',
    blue: 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]',
  }[color];

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  }[height];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage || sublabel) && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          {label && <span className="text-white/80">{label}</span>}
          {sublabel && <span className="text-white/50">{sublabel}</span>}
          {showPercentage && <span className="text-white font-bold">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5 ${heightClass}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorStyles}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
