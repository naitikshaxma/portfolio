import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useSystemStore } from '@/app/store/useSystemStore'

export function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const gpuTier = useSystemStore((state) => state.gpuTier)

  // Determine count based on GPU Tier
  const count = useMemo(() => {
    if (gpuTier === 'low') return 300
    if (gpuTier === 'medium') return 800
    return 1500
  }, [gpuTier])

  const [positions, setPositions] = useState<Float32Array | null>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)

  useEffect(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15

      vel[i * 3] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    }
    velocitiesRef.current = vel

    // Defer state update to avoid cascading render lint warning
    Promise.resolve().then(() => {
      setPositions(pos)
    })
  }, [count])

  const { mouse, viewport } = useThree()

  useFrame(() => {
    if (!pointsRef.current || !positions || !velocitiesRef.current) return
    const geo = pointsRef.current.geometry
    const posArr = geo.attributes.position.array as Float32Array
    const vels = velocitiesRef.current

    const mx = (mouse.x * viewport.width) / 2
    const my = (mouse.y * viewport.height) / 2

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      posArr[idx] += vels[idx]
      posArr[idx + 1] += vels[idx + 1]
      posArr[idx + 2] += vels[idx + 2]

      if (Math.abs(posArr[idx]) > 8) vels[idx] *= -1
      if (Math.abs(posArr[idx + 1]) > 8) vels[idx + 1] *= -1
      if (Math.abs(posArr[idx + 2]) > 8) vels[idx + 2] *= -1

      const dx = posArr[idx] - mx
      const dy = posArr[idx + 1] - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 1.5) {
        const force = (1.5 - dist) * 0.015
        posArr[idx] += (dx / dist) * force
        posArr[idx + 1] += (dy / dist) * force
      }
    }
    geo.attributes.position.needsUpdate = true
  })

  if (!positions) return null

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00b4d8"
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  )
}
