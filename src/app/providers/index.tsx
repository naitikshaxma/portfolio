import type { ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { ThemeProvider } from './ThemeProvider'
import { LenisProvider } from './LenisProvider'
import { MotionProvider } from './MotionProvider'
import { ToastProvider } from './ToastProvider'
import { CursorProvider } from './CursorProvider'

interface RootProviderProps {
  children: ReactNode
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LenisProvider>
          <MotionProvider>
            <ToastProvider>
              <CursorProvider>{children}</CursorProvider>
            </ToastProvider>
          </MotionProvider>
        </LenisProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
