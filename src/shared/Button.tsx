import { type ButtonHTMLAttributes, forwardRef, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useSystemStore } from '@/app/store/useSystemStore'
import { audioEngine } from '@/core/AudioEngine'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', isLoading = false, disabled, onMouseEnter, onClick, ...props }, ref) => {
    const setCursorHoveredTarget = useSystemStore((state) => state.setCursorHoveredTarget)

    const baseStyle = 'inline-flex items-center justify-center font-semibold tracking-wide rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#00b4d8] focus:ring-offset-2 focus:ring-offset-[#0d0f12] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'
    
    const variants = {
      primary: 'bg-[#00b4d8] text-[#0d0f12] shadow-[0_0_15px_rgba(0,180,216,0.3)] hover:shadow-[0_0_20px_rgba(0,180,216,0.5)] hover:bg-[#90e0ef]',
      secondary: 'bg-[#1b1e23] text-white hover:bg-[#252a32] border border-[#2b303c]',
      ghost: 'bg-transparent text-white hover:bg-[#1b1e23]/50',
      glass: 'backdrop-blur-md bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20',
      gradient: 'bg-gradient-to-r from-[#00b4d8] to-[#7209b7] text-white hover:opacity-95 hover:shadow-[0_0_15px_rgba(114,9,183,0.4)]'
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs uppercase tracking-wider',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base'
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setCursorHoveredTarget('button')
      audioEngine.playHover()
      onMouseEnter?.(e)
    }

    const handleMouseLeave = () => {
      setCursorHoveredTarget(null)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      audioEngine.playClick()
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyle, variants[variant], sizes[size], className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        data-cursor-lock="true"
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass'
  size?: 'sm' | 'md' | 'lg'
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, variant = 'ghost', size = 'md', onMouseEnter, onClick, ...props }, ref) => {
    const setCursorHoveredTarget = useSystemStore((state) => state.setCursorHoveredTarget)

    const baseStyle = 'inline-flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#00b4d8] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.95]'
    
    const variants = {
      primary: 'bg-[#00b4d8] text-[#0d0f12] hover:bg-[#90e0ef]',
      secondary: 'bg-[#1b1e23] text-white hover:bg-[#252a32] border border-[#2b303c]',
      ghost: 'bg-transparent text-white hover:bg-[#1b1e23]',
      glass: 'backdrop-blur-md bg-white/5 border border-white/10 text-white hover:bg-white/10'
    }

    const sizes = {
      sm: 'w-8 h-8 p-1.5 text-sm',
      md: 'w-10 h-10 p-2 text-base',
      lg: 'w-12 h-12 p-3 text-lg'
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setCursorHoveredTarget('button')
      audioEngine.playHover()
      onMouseEnter?.(e)
    }

    const handleMouseLeave = () => {
      setCursorHoveredTarget(null)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      audioEngine.playClick()
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyle, variants[variant], sizes[size], className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        data-cursor-lock="true"
        {...props}
      >
        {children}
      </button>
    )
  }
)
IconButton.displayName = 'IconButton'

export interface MagneticProps {
  children: React.ReactElement
  range?: number
}

export function Magnetic({ children, range = 45 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    if (Math.abs(distanceX) < range && Math.abs(distanceY) < range) {
      x.set(distanceX * 0.35)
      y.set(distanceY * 0.35)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}
