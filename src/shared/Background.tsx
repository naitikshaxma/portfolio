import { cn } from '@/utils/cn'

// 1. AnimatedGrid
export function AnimatedGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none",
        className
      )}
      style={{
        maskImage: 'radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)',
      }}
    />
  )
}

// 2. NoiseLayer (SVG fractal noise overlay)
export function NoiseLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}
    />
  )
}

// 3. AuroraGradient (Drifting dual-color ambient glow)
export function AuroraGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] rounded-full bg-[#00b4d8]/10 blur-[130px] animate-pulse"
        style={{ animationDuration: '10s' }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#7209b7]/10 blur-[130px] animate-pulse"
        style={{ animationDuration: '15s' }}
      />
    </div>
  )
}

// 4. MeshGradient (Complex multi-color gradient background)
export function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#3a0ca3]/15 blur-[150px]" />
      <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] rounded-full bg-[#4cc9f0]/10 blur-[120px]" />
      <div className="absolute top-[40%] right-[10%] w-[45%] h-[45%] rounded-full bg-[#7209b7]/15 blur-[160px]" />
    </div>
  )
}

// 5. RadialGlow
export function RadialGlow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,216,0.08)_0%,transparent_70%)] pointer-events-none",
        className
      )}
    />
  )
}
