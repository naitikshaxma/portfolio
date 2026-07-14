import { Stars } from '@react-three/drei'

export function EnvironmentScene() {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={2500}
        factor={4}
        saturation={0.6}
        fade
        speed={1.5}
      />
      <fog attach="fog" args={['#0d0f12', 5, 30]} />
    </>
  )
}
