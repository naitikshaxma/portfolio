import { useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { isMobile } from '@/utils/viewport'
import { useSystemStore } from '@/app/store/useSystemStore'

interface CursorProviderProps {
  children: ReactNode
}

export function CursorProvider({ children }: CursorProviderProps) {
  const hoverTarget = useSystemStore((state) => state.cursorHoveredTarget)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const ringTargetX = useMotionValue(-100)
  const ringTargetY = useMotionValue(-100)

  const springConfig = { stiffness: 350, damping: 26, mass: 0.5 }
  const ringX = useSpring(ringTargetX, springConfig)
  const ringY = useSpring(ringTargetY, springConfig)

  useEffect(() => {
    if (isMobile()) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Check if hovering a locked element
      let target = e.target as HTMLElement | null
      let locked = false
      
      while (target && target !== document.documentElement) {
        if (target.hasAttribute('data-cursor-lock')) {
          const rect = target.getBoundingClientRect()
          ringTargetX.set(rect.left + rect.width / 2)
          ringTargetY.set(rect.top + rect.height / 2)
          locked = true
          break
        }
        target = target.parentElement
      }

      if (!locked) {
        ringTargetX.set(e.clientX)
        ringTargetY.set(e.clientY)
      }

      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY, ringTargetX, ringTargetY])

  const showCursor = !isMobile()

  return (
    <>
      {children}
      {showCursor && (
        <>
          {/* Inner Dot */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#00b4d8] rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            style={{ x: cursorX, y: cursorY }}
          />
          {/* Outer Ring */}
          <motion.div
            className="fixed top-0 left-0 rounded-full border border-white/20 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            style={{
              x: ringX,
              y: ringY,
              width: hoverTarget ? 48 : 24,
              height: hoverTarget ? 48 : 24,
            }}
            animate={{
              borderColor: hoverTarget ? '#00b4d8' : 'rgba(255,255,255,0.2)',
              backgroundColor: hoverTarget ? 'rgba(0, 180, 216, 0.05)' : 'rgba(255,255,255,0)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </>
      )}
    </>
  )
}
