import { useEffect, type ReactNode } from 'react'
import { useSystemStore } from '@/app/store/useSystemStore'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSystemStore((state) => state.theme)
  const setTheme = useSystemStore((state) => state.setTheme)

  useEffect(() => {
    // Sync initial theme alignment
    setTheme(theme)
  }, [theme, setTheme])

  return <>{children}</>
}
