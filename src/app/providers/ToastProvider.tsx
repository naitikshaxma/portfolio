import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/app/store/useSystemStore'

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const toasts = useSystemStore((state) => state.toasts)
  const removeToast = useSystemStore((state) => state.removeToast)

  return (
    <>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
              className="pointer-events-auto flex items-center justify-between gap-4 p-4 rounded-lg bg-space-gray/80 backdrop-blur-md border border-white/5 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    toast.type === 'success'
                      ? 'bg-green-500'
                      : toast.type === 'error'
                      ? 'bg-red-500'
                      : toast.type === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-neon-blue'
                  }`}
                />
                <span className="text-sm font-mono tracking-tight text-ice-white">
                  {toast.message}
                </span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-gray hover:text-ice-white text-xs font-mono transition-colors"
              >
                DISMISS
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
