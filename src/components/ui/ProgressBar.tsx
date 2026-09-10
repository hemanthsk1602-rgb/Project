import React from 'react';

interface ProgressBarProps {
  value: number; // current value
  max: number; // max value
  label?: string;
  sublabel?: string;
  color?: 'emerald' | 'cyan' | 'orange' | 'purple' | 'blue';
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  sublabel,
  color = 'emerald',
  showPercentage = false,
  height = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));

  const colorStyles = {
    emerald: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
    cyan: 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]',
    orange: 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]',
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
          {label && <span className="text-slate-300">{label}</span>}
          {sublabel && <span className="text-slate-400">{sublabel}</span>}
          {showPercentage && <span className="text-slate-200 font-semibold">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/40 ${heightClass}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorStyles}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

