import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/utils/cn'

// 1. Tooltip Component
export interface TooltipProps {
  content: string
  children: React.ReactElement
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [active, setActive] = React.useState(false)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-white bg-[#1b1e23] border border-[#2b303c] rounded pointer-events-none whitespace-nowrap shadow-xl',
              positions[position]
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// 2. Modal Component
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-[#11141a] border border-[#2b303c] rounded-xl p-6 shadow-2xl z-10"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-4 border-b border-[#2b303c] pb-3">
              {title && <h3 className="text-lg font-bold text-white font-mono">{title}</h3>}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// 3. Dialog Component (Confirmations)
export interface DialogProps extends ModalProps {
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  type?: 'info' | 'warning' | 'danger'
}

export function Dialog({ isOpen, onClose, onConfirm, title, children, confirmText = 'Confirm', cancelText = 'Cancel', type = 'info' }: DialogProps) {
  const colors = {
    info: 'bg-[#00b4d8] text-[#0d0f12] hover:bg-[#90e0ef]',
    warning: 'bg-amber-500 text-black hover:bg-amber-400',
    danger: 'bg-rose-600 text-white hover:bg-rose-500',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <div className="text-sm text-gray-300 leading-relaxed font-mono">{children}</div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-mono text-gray-400 bg-transparent hover:text-white rounded border border-[#2b303c]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={cn('px-4 py-2 text-sm font-mono font-bold rounded transition-colors', colors[type])}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

// 4. Alert Component
export interface AlertProps {
  type?: 'success' | 'warning' | 'error' | 'info'
  title?: string
  children: React.ReactNode
  className?: string
}

export function Alert({ type = 'info', title, children, className }: AlertProps) {
  const styles = {
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    error: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    info: 'bg-[#00b4d8]/10 border-[#00b4d8]/30 text-[#00b4d8]',
  }

  return (
    <div className={cn('border rounded-lg p-4 flex flex-col space-y-1', styles[type], className)} role="alert">
      {title && <h4 className="font-bold text-sm font-mono">{title}</h4>}
      <div className="text-xs leading-relaxed font-mono">{children}</div>
    </div>
  )
}

// 5. Progress Component
export function Progress({ value, max = 100, className }: { value: number; max?: number; className?: string }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('w-full h-1.5 bg-[#1b1e23] border border-[#2b303c] rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-gradient-to-r from-[#00b4d8] to-[#7209b7] transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

// 6. Skeleton Loader Component
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded bg-[#1b1e23]/60 border border-[#2b303c]/20', className)}
      {...props}
    />
  )
}

// 7. Spinner Component
export function Spinner({ className }: { className?: string }) {
  return (
    <svg className={cn('animate-spin h-5 w-5 text-[#00b4d8]', className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

// 8. LoadingOverlay Component
export function LoadingOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0f12]/80 backdrop-blur-md"
        >
          <Spinner className="h-10 w-10 mb-4" />
          <p className="text-xs font-mono tracking-widest uppercase text-gray-400 animate-pulse">Loading system...</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
