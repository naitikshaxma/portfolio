import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/utils/cn'

// 1. Dock Item interface
export interface DockItem {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  href?: string
}

// 2. FloatingDock (macOS-inspired magnifying menu dock)
export function FloatingDock({ items, className }: { items: DockItem[]; className?: string }) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'flex h-16 items-end gap-4 rounded-2xl bg-white/5 border border-white/10 px-4 pb-3 backdrop-blur-md shadow-2xl pointer-events-auto',
        className
      )}
    >
      {items.map((item, idx) => (
        <DockIcon key={idx} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  )
}

function DockIcon({ mouseX, icon, label, onClick, href }: DockItem & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Dynamic width & height matching based on cursor distance
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40])
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40])

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 200, damping: 15 })
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 200, damping: 15 })

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className="relative flex items-center justify-center rounded-full bg-white/5 hover:bg-[#00b4d8]/20 border border-white/10 hover:border-[#00b4d8]/30 transition-colors text-white"
    >
      <span className="sr-only">{label}</span>
      {icon}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} title={label}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} title={label} className="focus:outline-none bg-transparent border-0 p-0 cursor-pointer">
      {content}
    </button>
  )
}

// 3. Hamburger Menu Icon (with animated lines)
export interface HamburgerProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export function Hamburger({ isOpen, onClick, className }: HamburgerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative h-10 w-10 flex flex-col justify-center items-center rounded-lg bg-transparent border border-white/10 hover:bg-white/5 transition-colors focus:outline-none',
        className
      )}
      aria-label="Toggle menu"
    >
      <span
        className={cn(
          'block absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out',
          isOpen ? 'rotate-45' : '-translate-y-1.5'
        )}
      />
      <span
        className={cn(
          'block absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out',
          isOpen && 'opacity-0'
        )}
      />
      <span
        className={cn(
          'block absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out',
          isOpen ? '-rotate-45' : 'translate-y-1.5'
        )}
      />
    </button>
  )
}

// 4. Breadcrumb Navigation
export interface BreadcrumbLink {
  label: string
  href?: string
}

export function Breadcrumb({ items, className }: { items: BreadcrumbLink[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-2 font-mono text-xs text-gray-500', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-700">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-300">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

// 5. Command Menu Trigger
export function CommandMenuTrigger({ onClick, className }: { onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center space-x-2 px-3 py-1.5 bg-[#1b1e23] border border-[#2b303c] rounded-lg text-xs font-mono text-gray-400 hover:text-white hover:border-[#00b4d8]/40 transition-all',
        className
      )}
    >
      <span>Search...</span>
      <span className="bg-[#0d0f12] px-1.5 py-0.5 rounded border border-[#2b303c] text-[10px]">
        ⌘K
      </span>
    </button>
  )
}
