export type Theme = 'dark' | 'light'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
  github?: string
  image?: string
  role?: string
  year?: string
  featured?: boolean
}

export interface Skill {
  name: string
  category: string
  icon?: string
  proficiency?: number // 0-100 percentage
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  duration: string
  points: string[]
}

export interface NavRoute {
  name: string;
  path: string;
  icon?: string;
}

export interface SystemState {
  isLoaded: boolean
  isCommandMenuOpen: boolean
  activeSection: string
  gpuTier: 'low' | 'medium' | 'high' | null
  cursorHoveredTarget: string | null
  toasts: Toast[]
  theme: Theme
}
