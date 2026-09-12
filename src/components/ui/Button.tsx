'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D5FF3E] focus:ring-offset-2 focus:ring-offset-[#07090E] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.97]';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-xs sm:text-sm gap-2',
    lg: 'px-8 py-3.5 text-sm sm:text-base gap-2.5 font-extrabold',
  };

  const variantStyles = {
    primary:
      'bg-[#D5FF3E] hover:bg-[#c4f035] text-black shadow-lg shadow-[#D5FF3E]/20 hover:shadow-[#D5FF3E]/40',
    secondary:
      'bg-white/10 hover:bg-white/15 text-white border border-white/20',
    outline:
      'bg-transparent hover:bg-white/10 text-white border border-white/20',
    ghost:
      'bg-transparent hover:bg-white/5 text-white/70 hover:text-white border border-transparent',
    danger:
      'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
