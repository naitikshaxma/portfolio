import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility', () => {
  it('combines class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('resolves conflicting tailwind classes', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })

  it('skips conditional class values', () => {
    const isFalse = false
    expect(cn('p-4', isFalse && 'bg-red-500', undefined, 'text-white')).toBe('p-4 text-white')
  })
})
