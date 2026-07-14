import { useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { isMobile } from '@/utils/viewport'
import { useSystemStore } from '@/app/store/useSystemStore'

interface CursorProviderProps {
  children: ReactNode
}

export function CursorProvider({ children }: CursorProviderProps) {
  const hoverTarget = useSystemStore((state) => state.cursorHoveredTarget)

  // Custom cursor position motion variables
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring settings for the outer ring lag effect
  const springConfig = { stiffness: 400, damping: 28, mass: 0.6 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (isMobile()) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      // Set global document variables for background spotlights and dynamic shadows
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [cursorX, cursorY])

  const showCursor = !isMobile()

  return (
    <>
      {children}
      {showCursor && (
        <>
          {/* Inner Cyan Dot */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyber-cyan rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            style={{ x: cursorX, y: cursorY }}
          />
          {/* Outer Interactive Ring */}
          <motion.div
            className="fixed top-0 left-0 rounded-full border border-white/20 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            style={{
              x: ringX,
              y: ringY,
              width: hoverTarget ? 48 : 24,
              height: hoverTarget ? 48 : 24,
            }}
            animate={{
              borderColor: hoverTarget ? '#00F0FF' : 'rgba(255,255,255,0.2)',
              backgroundColor: hoverTarget ? 'rgba(0, 240, 255, 0.05)' : 'rgba(255,255,255,0)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </>
      )}
    </>
  )
}
