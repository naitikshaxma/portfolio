import { useRef } from 'react'
import * as THREE from 'three'

export function Lighting() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null)

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={dirLightRef}
        position={[5, 10, 5]}
        intensity={1.0}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.4} color="#00b4d8" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.0}
        color="#7209b7"
      />
    </>
  )
}
