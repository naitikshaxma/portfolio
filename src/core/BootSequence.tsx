import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/app/store/useSystemStore'
import { audioEngine } from '@/core/AudioEngine'

export function BootSequence() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [readyToEnter, setReadyToEnter] = useState(false)
  const [isBooted, setIsBooted] = useState(false)
  const setLoaded = useSystemStore((state) => state.setLoaded)

  useEffect(() => {
    // Detect system info
    const initDiagnostics = async () => {
      const newLogs: string[] = []
      newLogs.push('INITIALIZING KRONOS-01 OS...')
      await sleep(150)
      
      // WebGL check
      const canvas = document.createElement('canvas')
      const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
      if (gl) {
        newLogs.push('WEBGL: ENABLED (ACCELERATED)')
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          newLogs.push(`GPU: ${renderer.split(' ').slice(0, 3).join(' ')}`)
        }
      } else {
        newLogs.push('WEBGL: DISABLED (SOFTWARE FALLBACK)')
      }
      await sleep(200)

      // Memory check
      if ('deviceMemory' in navigator) {
        newLogs.push(`MEMORY: ${(navigator as Navigator & { deviceMemory?: number }).deviceMemory} GB RAM`)
      } else {
        newLogs.push('MEMORY: OK')
      }
      await sleep(150)

      // Connection/Network check
      if ('connection' in navigator) {
        const conn = (navigator as Navigator & { connection?: { rtt?: number; downlink?: number } }).connection
        if (conn) {
          newLogs.push(`NETWORK: RTT ~${conn.rtt}ms, Downlink: ${conn.downlink}Mbps`)
        }
      }
      await sleep(200)
      newLogs.push('SYSTEM DIAGNOSTICS: STABLE')
      newLogs.push('READY TO BOOT.')
      
      // Stream logs slowly
      for (const log of newLogs) {
        setLogs((prev) => [...prev, log])
        await sleep(120)
      }
    }

    initDiagnostics()

    // Loading progress simulation
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setReadyToEnter(true)
          return 100
        }
        return prev + Math.floor(Math.random() * 8) + 2
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  const handleEnter = () => {
    audioEngine.playBoot()
    setIsBooted(true)
    setTimeout(() => setLoaded(true), 800) // Trigger global loaded state
  }

  return (
    <AnimatePresence>
      {!isBooted && (
        <motion.div
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0d0f12] p-8 md:p-16 text-white overflow-hidden font-mono"
        >
          {/* Top panel */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-sm font-bold text-[#00b4d8] tracking-widest">KRONOS_OS v1.0.0</h1>
              <p className="text-[10px] text-gray-500 mt-1">SECURE CORE TERMINAL</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400">STATUS: INITIALIZING</span>
            </div>
          </div>

          {/* Center Logo/Diagnostics */}
          <div className="flex-1 flex flex-col justify-center items-center my-8">
            <div className="w-full max-w-lg space-y-6">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center mb-10"
              >
                <div className="text-4xl md:text-5xl font-extrabold tracking-[0.25em] text-white select-none">
                  KRONOS<span className="text-[#00b4d8]">.01</span>
                </div>
                <div className="h-0.5 w-16 bg-[#00b4d8] mt-2 animate-pulse" />
              </motion.div>

              {/* Log window */}
              <div className="h-36 overflow-y-auto bg-black/40 border border-[#2b303c] rounded p-4 text-[10px] text-gray-400 space-y-1.5 scrollbar-none select-none">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="text-[#00b4d8]">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Progress / Button */}
          <div className="w-full max-w-lg mx-auto h-20 flex flex-col justify-end">
            <AnimatePresence mode="wait">
              {!readyToEnter ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between text-xs text-gray-400 font-bold">
                    <span>LOADING SYSTEMS...</span>
                    <span>{Math.min(loadingProgress, 100)}%</span>
                  </div>
                  <div className="h-1 bg-[#1b1e23] border border-[#2b303c] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#00b4d8]"
                      style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="enter-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={handleEnter}
                    className="w-full py-4 text-xs font-bold uppercase tracking-widest text-[#0d0f12] bg-[#00b4d8] rounded hover:bg-[#90e0ef] shadow-[0_0_20px_rgba(0,180,216,0.3)] transition-all duration-300"
                  >
                    ENTER SYSTEM
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
