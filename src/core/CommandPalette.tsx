import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/app/store/useSystemStore'
import { audioEngine } from '@/core/AudioEngine'

interface CommandItem {
  id: string
  label: string
  shortcut?: string
  action: () => void
}

export function CommandPalette() {
  const isOpen = useSystemStore((state) => state.isCommandMenuOpen)
  const setIsOpen = useSystemStore((state) => state.setCommandMenuOpen)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        audioEngine.playClick()
        setIsOpen(!isOpen)
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  return (
    <AnimatePresence>
      {isOpen && <CommandPaletteModal />}
    </AnimatePresence>
  )
}

function CommandPaletteModal() {
  const setIsOpen = useSystemStore((state) => state.setCommandMenuOpen)
  const toggleTheme = useSystemStore((state) => state.toggleTheme)
  const addToast = useSystemStore((state) => state.addToast)

  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isAudioMuted, setIsAudioMuted] = useState(audioEngine.getMuted())

  const inputRef = useRef<HTMLInputElement>(null)
  const itemsContainerRef = useRef<HTMLDivElement>(null)

  const commands: CommandItem[] = [
    {
      id: 'theme',
      label: 'Toggle Theme (Light / Dark)',
      shortcut: 'T',
      action: () => {
        toggleTheme()
        addToast('Theme toggled successfully', 'info')
      },
    },
    {
      id: 'audio',
      label: isAudioMuted ? 'Unmute System Audio' : 'Mute System Audio',
      shortcut: 'M',
      action: () => {
        const nextMute = !isAudioMuted
        audioEngine.setMute(nextMute)
        setIsAudioMuted(nextMute)
        addToast(nextMute ? 'Audio muted' : 'Audio unmuted', 'info')
      },
    },
    {
      id: 'section-hero',
      label: 'Scroll to Home / Top',
      shortcut: 'H',
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
    },
    {
      id: 'section-projects',
      label: 'Navigate to Projects',
      shortcut: 'P',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'section-skills',
      label: 'Navigate to Skills',
      shortcut: 'S',
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'section-contact',
      label: 'Navigate to Contact',
      shortcut: 'C',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
  ]

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      audioEngine.playHover()
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      audioEngine.playHover()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        audioEngine.playClick()
        filteredCommands[selectedIndex].action()
        setIsOpen(false)
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Dialog Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative w-full max-w-lg bg-[#0d0f12]/95 border border-[#2b303c] rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col"
      >
        {/* Input Header */}
        <div className="flex items-center border-b border-[#2b303c] px-4 py-3">
          <span className="text-gray-500 mr-3 text-sm">🔎</span>
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="w-full bg-transparent border-0 text-white placeholder-gray-500 font-mono text-sm focus:outline-none"
          />
          <span className="text-[10px] font-mono text-gray-500 border border-[#2b303c] px-1.5 py-0.5 rounded">
            ESC
          </span>
        </div>

        {/* Content List */}
        <div
          ref={itemsContainerRef}
          className="max-h-[300px] overflow-y-auto p-2 space-y-1 scrollbar-none"
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    audioEngine.playClick()
                    cmd.action()
                    setIsOpen(false)
                  }}
                  onMouseEnter={() => {
                    setSelectedIndex(index)
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#00b4d8]/10 border border-[#00b4d8]/30 text-white'
                      : 'border border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span className="font-mono text-xs font-semibold">{cmd.label}</span>
                  {cmd.shortcut && (
                    <span className="text-[10px] font-mono bg-charcoal border border-[#2b303c] px-1.5 py-0.5 rounded text-gray-400">
                      {cmd.shortcut}
                    </span>
                  )}
                </div>
              )
            })
          ) : (
            <div className="py-8 text-center text-xs font-mono text-gray-500">
              No commands matching your query.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
