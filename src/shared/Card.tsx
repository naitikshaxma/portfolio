import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/utils/cn'

// 1. Base GlassCard
export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean
}
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverEffect = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl transition-all duration-300',
          hoverEffect && 'hover:bg-white/10 hover:border-white/20 hover:shadow-cyan-500/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = 'GlassCard'

// 2. ProjectCard
export interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image?: string
  link?: string
  onClick?: () => void
  className?: string
}
export function ProjectCard({ title, description, tags, image, link, onClick, className }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group cursor-pointer rounded-xl border border-[#2b303c] bg-[#11141a] overflow-hidden transition-all duration-300 hover:border-[#00b4d8] hover:shadow-lg hover:shadow-[#00b4d8]/10',
        className
      )}
    >
      {image && (
        <div className="relative aspect-video w-full overflow-hidden bg-charcoal">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-[#00b4d8] bg-[#00b4d8]/10 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00b4d8] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4">
          {description}
        </p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-mono text-[#00b4d8] hover:underline"
          >
            View Project ↗
          </a>
        )}
      </div>
    </div>
  )
}

// 3. StatCard
export interface StatCardProps {
  value: string
  label: string
  icon?: React.ReactNode
  className?: string
}
export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div className={cn('bg-[#11141a] border border-[#2b303c] rounded-xl p-6 text-center relative overflow-hidden', className)}>
      {icon && <div className="text-[#00b4d8] text-2xl mb-3 flex justify-center">{icon}</div>}
      <div className="text-4xl font-extrabold text-white tracking-tight mb-1">{value}</div>
      <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">{label}</div>
    </div>
  )
}

// 4. FeatureCard
export interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}
export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <div className={cn('group bg-[#11141a] border border-[#2b303c] rounded-xl p-6 hover:border-[#00b4d8]/50 transition-all duration-300', className)}>
      <div className="w-12 h-12 rounded-lg bg-[#00b4d8]/10 flex items-center justify-center text-[#00b4d8] mb-4 group-hover:bg-[#00b4d8] group-hover:text-[#0d0f12] transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}

// 5. TimelineCard
export interface TimelineCardProps {
  date: string
  title: string
  subtitle: string
  description: string
  className?: string
}
export function TimelineCard({ date, title, subtitle, description, className }: TimelineCardProps) {
  return (
    <div className={cn('relative pl-8 border-l-2 border-[#2b303c] hover:border-[#00b4d8] transition-colors py-4', className)}>
      <div className="absolute w-4 h-4 rounded-full bg-[#11141a] border-2 border-[#2b303c] group-hover:border-[#00b4d8] -left-[9px] top-5 transition-colors" />
      <span className="text-xs font-mono text-[#00b4d8] tracking-widest mb-1 block uppercase">{date}</span>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <h4 className="text-sm text-gray-400 mb-2 font-medium">{subtitle}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}

// 6. FloatingCard
export function FloatingCard({ children, className, duration = 4 }: { children: React.ReactNode; className?: string; duration?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 7. SpotlightCard
export function SpotlightCard({ children, className, glowColor = 'rgba(0, 180, 216, 0.15)' }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative rounded-xl border border-[#2b303c] bg-[#11141a]/85 p-6 transition-colors hover:border-[#00b4d8]/40 overflow-hidden',
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// 8. InteractiveCard (combining 3D tilt & hover effects)
export function InteractiveCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(y, springConfig)
  const rotateY = useSpring(x, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const offsetRefX = (clientX - centerX) / (width / 2)
    const offsetRefY = (clientY - centerY) / (height / 2)

    // Set rotation degrees
    x.set(offsetRefX * 15) // Max 15 degrees y-rotation
    y.set(-offsetRefY * 15) // Max 15 degrees x-rotation
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'rounded-xl border border-[#2b303c] bg-[#11141a] p-6 shadow-xl transition-shadow duration-300 hover:shadow-cyan-500/5',
        className
      )}
    >
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  )
}
