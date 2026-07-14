import { AppRouter } from '@/router'
import { BootSequence } from '@/core/BootSequence'
import { CommandPalette } from '@/core/CommandPalette'

function App() {
  return (
    <>
      <BootSequence />
      <CommandPalette />
      <AppRouter />
    </>
  )
}

export default App
