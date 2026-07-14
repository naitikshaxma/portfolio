export const motionConfig = {
  springs: {
    snappy: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
    lazy: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 20,
      mass: 1.2,
    },
    hover: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
      mass: 0.5,
    },
  },
  timings: {
    fast: 0.18,
    base: 0.3,
    slow: 0.6,
  },
}
