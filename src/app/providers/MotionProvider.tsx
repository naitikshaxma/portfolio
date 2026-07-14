import type { ReactNode } from 'react'
import { MotionConfig, AnimatePresence } from 'framer-motion'
import { prefersReducedMotion } from '@/utils/viewport'

interface MotionProviderProps {
  children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  const reduceMotion = prefersReducedMotion()

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>
      <AnimatePresence mode="wait" initial={false}>
        {children}
      </AnimatePresence>
    </MotionConfig>
  )
}
