import { type ReactNode, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface LayoutProps {
  children?: ReactNode
  className?: string
}

export const Container = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-12', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = 'Container'

interface SectionProps extends LayoutProps {
  id?: string
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn('py-12 md:py-20 lg:py-32', className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)
Section.displayName = 'Section'

interface GridProps extends LayoutProps {
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number }
  gap?: number
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, cols = 1, gap = 6, ...props }, ref) => {
    // Generate grid-cols classes dynamically to support Tailwind v4 compilation
    const colsClass = typeof cols === 'number'
      ? `grid-cols-${cols}`
      : cn(
          cols.sm && `sm:grid-cols-${cols.sm}`,
          cols.md && `md:grid-cols-${cols.md}`,
          cols.lg && `lg:grid-cols-${cols.lg}`,
          cols.xl && `xl:grid-cols-${cols.xl}`
        )

    const gapClass = `gap-${gap}`

    return (
      <div
        ref={ref}
        className={cn('grid', colsClass, gapClass, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Grid.displayName = 'Grid'

interface StackProps extends LayoutProps {
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  gap?: number
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, className, direction = 'col', align = 'stretch', justify = 'start', gap = 4, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          direction === 'row' ? 'flex-row' : 'flex-col',
          align === 'start' && 'items-start',
          align === 'center' && 'items-center',
          align === 'end' && 'items-end',
          align === 'stretch' && 'items-stretch',
          justify === 'start' && 'justify-start',
          justify === 'center' && 'justify-center',
          justify === 'end' && 'justify-end',
          justify === 'between' && 'justify-between',
          justify === 'around' && 'justify-around',
          `gap-${gap}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Stack.displayName = 'Stack'

interface SpacerProps {
  x?: number | string
  y?: number | string
}

export function Spacer({ x, y }: SpacerProps) {
  return (
    <div
      style={{
        width: x ? (typeof x === 'number' ? `${x}px` : x) : undefined,
        height: y ? (typeof y === 'number' ? `${y}px` : y) : undefined,
        display: x ? 'inline-block' : 'block',
        flexShrink: 0,
      }}
    />
  )
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-t border-charcoal my-4 w-full', className)} />
}

export const Surface = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bg-space-gray border border-charcoal rounded-xl p-6 shadow-lg', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Surface.displayName = 'Surface'

export const Flex = forwardRef<HTMLDivElement, LayoutProps & {
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  gap?: number
}>(
  ({ children, className, align = 'stretch', justify = 'start', wrap = 'nowrap', gap = 4, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          align === 'start' && 'items-start',
          align === 'center' && 'items-center',
          align === 'end' && 'items-end',
          align === 'baseline' && 'items-baseline',
          align === 'stretch' && 'items-stretch',
          justify === 'start' && 'justify-start',
          justify === 'center' && 'justify-center',
          justify === 'end' && 'justify-end',
          justify === 'between' && 'justify-between',
          justify === 'around' && 'justify-around',
          justify === 'evenly' && 'justify-evenly',
          wrap === 'wrap' && 'flex-wrap',
          wrap === 'nowrap' && 'flex-nowrap',
          wrap === 'wrap-reverse' && 'flex-wrap-reverse',
          `gap-${gap}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Flex.displayName = 'Flex'

export const Panel = forwardRef<HTMLDivElement, LayoutProps & {
  title?: string
}>(
  ({ children, className, title, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bg-[#11141a] border border-[#2b303c] rounded-xl overflow-hidden', className)}
        {...props}
      >
        {title && (
          <div className="bg-[#1b1e23] border-b border-[#2b303c] px-6 py-3 font-mono text-xs uppercase tracking-wider text-gray-400">
            {title}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    )
  }
)
Panel.displayName = 'Panel'

