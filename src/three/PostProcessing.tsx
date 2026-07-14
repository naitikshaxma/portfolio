import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import * as THREE from 'three'

export function PostProcessing() {
  const { gl, scene, camera, size } = useThree()

  const composer = useMemo(() => {
    const comp = new EffectComposer(gl)
    comp.addPass(new RenderPass(scene, camera))
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.4, // strength
      0.3, // radius
      0.8 // threshold
    )
    comp.addPass(bloomPass)
    return comp
  }, [gl, scene, camera, size])

  useEffect(() => {
    composer.setSize(size.width, size.height)
    return () => {
      composer.dispose()
    }
  }, [composer, size])

  useFrame(() => {
    composer.render()
  }, 1)

  return null
}
