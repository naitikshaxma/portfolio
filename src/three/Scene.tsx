import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Scene() {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow base drift movement
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      {/* Dynamic star particles mesh */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, 1, 1, 1, -1, -1, -1]), 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#00F0FF" />
      </points>
    </>
  )
}
