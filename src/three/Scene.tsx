import { Lighting } from './Lighting'
import { EnvironmentScene } from './EnvironmentScene'
import { PostProcessing } from './PostProcessing'
import { Particles } from './Particles'
import { NeuralSphere } from './NeuralSphere'

export default function Scene() {
  return (
    <>
      <Lighting />
      <EnvironmentScene />
      <PostProcessing />
      <Particles />
      <NeuralSphere />
    </>
  )
}
