import React from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: 'lime' | 'emerald' | 'cyan' | 'orange' | 'purple';
  label?: string;
  sublabel?: string;
  showValueText?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max,
  size = 140,
  strokeWidth = 10,
  color = 'lime',
  label,
  sublabel,
  showValueText = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorConfig = {
    lime: {
      stroke: '#D5FF3E',
      glow: 'drop-shadow(0 0 10px rgba(213, 255, 62, 0.6))',
      text: 'text-[#D5FF3E]',
    },
    emerald: {
      stroke: '#10B981',
      glow: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))',
      text: 'text-emerald-400',
    },
    cyan: {
      stroke: '#06B6D4',
      glow: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))',
      text: 'text-cyan-400',
    },
    orange: {
      stroke: '#F97316',
      glow: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))',
      text: 'text-amber-400',
    },
    purple: {
      stroke: '#A855F7',
      glow: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))',
      text: 'text-purple-400',
    },
  }[color];

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorConfig.stroke}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            filter: colorConfig.glow,
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        {showValueText && (
          <span className={`font-outfit text-2xl font-black tracking-tight ${colorConfig.text}`}>
            {value}
            <span className="text-xs text-white/50 font-normal ml-0.5">/{max}</span>
          </span>
        )}
        {label && <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider mt-0.5">{label}</span>}
        {sublabel && <span className="text-[10px] text-white/40">{sublabel}</span>}
      </div>
    </div>
  );
};
