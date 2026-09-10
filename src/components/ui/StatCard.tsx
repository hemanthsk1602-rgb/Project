import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subvalue?: string;
  icon: React.ReactNode;
  badge?: string;
  progressPercent?: number;
  accentColor?: 'emerald' | 'cyan' | 'orange' | 'purple' | 'blue';
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subvalue,
  icon,
  badge,
  progressPercent,
  accentColor = 'emerald',
  actionButton,
  onClick,
}) => {
  const accentClasses = {
    emerald: {
      border: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      bar: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
      badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    },
    cyan: {
      border: 'hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
      bar: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]',
      badge: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    },
    orange: {
      border: 'hover:border-orange-500/40',
      iconBg: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      bar: 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]',
      badge: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    },
    purple: {
      border: 'hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
      bar: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
      badge: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    },
    blue: {
      border: 'hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      bar: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
      badge: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    },
  }[accentColor];

  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 rounded-2xl transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      } ${accentClasses.border}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${accentClasses.iconBg}`}>{icon}</div>
        {badge && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${accentClasses.badge}`}>
            {badge}
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h4 className="text-2xl font-black text-white tracking-tight">{value}</h4>
          {subvalue && <span className="text-xs text-slate-400 font-normal">{subvalue}</span>}
        </div>
      </div>

      {progressPercent !== undefined && (
        <div className="mt-3.5">
          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${accentClasses.bar}`}
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>
      )}

      {actionButton && (
        <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              actionButton.onClick();
            }}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            {actionButton.label} &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

