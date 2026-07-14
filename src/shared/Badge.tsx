import React from 'react'
import { cn } from '@/utils/cn'

// 1. Standard Badge
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'info' | 'error' | 'tech'
}

export function Badge({ children, className, variant = 'info', ...props }: BadgeProps) {
  const baseStyle = 'inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider font-mono'
  
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/25',
    error: 'bg-rose-500/10 text-rose-400 border border-rose-500/25',
    info: 'bg-[#00b4d8]/10 text-[#00b4d8] border border-[#00b4d8]/25',
    tech: 'bg-[#1b1e23] text-gray-300 border border-[#2b303c] hover:border-[#00b4d8]/50 hover:text-white transition-colors duration-200'
  }

  return (
    <span className={cn(baseStyle, variants[variant], className)} {...props}>
      {children}
    </span>
  )
}

// 2. StatusBadge (with pulsing indicator)
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'online' | 'offline' | 'busy' | 'away'
  label?: string
}

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  const statusColors = {
    online: 'bg-emerald-500 shadow-emerald-500/50',
    offline: 'bg-gray-500 shadow-gray-500/50',
    busy: 'bg-rose-500 shadow-rose-500/50',
    away: 'bg-amber-500 shadow-amber-500/50'
  }

  return (
    <span className={cn('inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-[#1b1e23] border border-[#2b303c] text-xs font-mono text-gray-300', className)} {...props}>
      <span className="relative flex h-2 w-2">
        {status === 'online' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        <span className={cn('relative inline-flex rounded-full h-2 w-2 shadow-sm', statusColors[status])}></span>
      </span>
      <span>{label || status}</span>
    </span>
  )
}

// 3. AnimatedBadge (glowing bordered badge)
export function AnimatedBadge({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-gradient-to-r from-[#00b4d8] to-[#7209b7]',
        className
      )}
      {...props}
    >
      <span className="px-2 py-0.5 transition-all ease-in duration-75 bg-[#0d0f12] rounded-md group-hover:bg-opacity-0 text-white">
        {children}
      </span>
    </span>
  )
}
