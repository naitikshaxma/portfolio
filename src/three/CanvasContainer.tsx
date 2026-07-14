import { type ReactNode, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei'
import { useSystemStore } from '@/app/store/useSystemStore'

interface CanvasContainerProps {
  children: ReactNode
}

export default function CanvasContainer({ children }: CanvasContainerProps) {
  const setGPUTier = useSystemStore((state) => state.setGPUTier)

  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-obsidian overflow-hidden pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 2]} // Limit pixel ratio to max 2 for performance stability
          gl={{
            powerPreference: 'high-performance',
            antialias: true,
            alpha: true,
          }}
          eventSource={document.getElementById('root') || undefined}
          eventPrefix="client"
        >
          <PerformanceMonitor
            onDecline={() => setGPUTier('low')}
            onIncline={() => setGPUTier('high')}
          >
            {children}
          </PerformanceMonitor>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      </Suspense>
    </div>
  )
}
export {}
