import { create } from 'zustand'
import type { Theme, ToastType, SystemState } from '@/types'

interface SystemActions {
  setLoaded: (loaded: boolean) => void
  setCommandMenuOpen: (open: boolean) => void
  setActiveSection: (section: string) => void
  setGPUTier: (tier: 'low' | 'medium' | 'high') => void
  setCursorHoveredTarget: (target: string | null) => void
  addToast: (message: string, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

type SystemStore = SystemState & SystemActions

export const useSystemStore = create<SystemStore>((set) => ({
  // Core State
  isLoaded: false,
  isCommandMenuOpen: false,
  activeSection: 'hero',
  gpuTier: null,
  cursorHoveredTarget: null,
  toasts: [],
  theme: (localStorage.getItem('kronos-theme') as Theme) || 'dark',

  // Actions
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  setCommandMenuOpen: (open) => set({ isCommandMenuOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  setGPUTier: (tier) => set({ gpuTier: tier }),
  setCursorHoveredTarget: (target) => set({ cursorHoveredTarget: target }),
  
  addToast: (message, type, duration = 4000) => {
    const id = crypto.randomUUID()
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }))
    
    // Auto remove toast
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }))
    }, duration)
  },

  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id),
  })),

  setTheme: (theme) => {
    localStorage.setItem('kronos-theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    set({ theme })
  },

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('kronos-theme', nextTheme)
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme: nextTheme }
    })
  },
}))
