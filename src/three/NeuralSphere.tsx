import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function NeuralSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const originalPosRef = useRef<THREE.BufferAttribute | null>(null)

  useEffect(() => {
    if (meshRef.current && lineRef.current) {
      // Sync line segments with mesh geometry reference to share buffers
      lineRef.current.geometry = meshRef.current.geometry
      originalPosRef.current = meshRef.current.geometry.attributes.position.clone() as THREE.BufferAttribute
    }
  }, [])

  const { mouse } = useThree()

  useFrame((state) => {
    if (!meshRef.current || !originalPosRef.current) return
    const time = state.clock.getElapsedTime()
    const geo = meshRef.current.geometry
    const pos = geo.attributes.position
    const orig = originalPosRef.current

    // Apply wave displacement to positions buffer
    for (let i = 0; i < pos.count; i++) {
      const x = orig.getX(i)
      const y = orig.getY(i)
      const z = orig.getZ(i)

      const wave = Math.sin(x * 1.5 + time * 1.5) * Math.cos(y * 1.5 + time * 1.5) * Math.sin(z * 1.5 + time * 1.5)
      const offset = 1 + wave * 0.12

      pos.setXYZ(i, x * offset, y * offset, z * offset)
    }
    pos.needsUpdate = true

    // Rotate meshes towards mouse input coordinates
    const targetX = mouse.y * 0.4
    const targetY = mouse.x * 0.4

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05)

    if (lineRef.current) {
      lineRef.current.rotation.x = meshRef.current.rotation.x
      lineRef.current.rotation.y = meshRef.current.rotation.y
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 3]} />
        <meshBasicMaterial
          color="#00b4d8"
          transparent
          opacity={0.06}
          wireframe
        />
      </mesh>
      
      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#00b4d8"
          transparent
          opacity={0.25}
        />
      </lineSegments>
    </group>
  )
}
