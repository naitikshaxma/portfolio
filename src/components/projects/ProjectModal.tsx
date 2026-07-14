import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/types/project'
import { ArchitectureVisualizer } from './ArchitectureVisualizer'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Lock body scroll and save original style
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    
    // Focus Trap mechanism
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements?.[0] as HTMLElement
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    window.addEventListener('keydown', handleTab)
    firstElement?.focus()

    return () => {
      // Restore scroll style
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keydown', handleTab)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Card Box */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-4xl bg-[#0d0f12]/95 border border-[#2b303c] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col my-8 max-h-[90vh]"
      >
        {/* Header Title Close */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#2b303c] bg-black/20">
          <div>
            <h3 className="text-xl font-bold text-white font-display">{project.title}</h3>
            <p className="text-xs text-[#00b4d8] font-mono mt-0.5">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-500 hover:text-white transition-colors p-2 text-lg font-bold font-mono border border-transparent hover:border-[#2b303c] rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Details Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
          {/* Feature Header Banner */}
          {project.image && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#2b303c]">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-transparent to-transparent" />
            </div>
          )}

          {/* Quick Core Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#11141a] border border-[#2b303c] rounded-xl font-mono text-xs">
            <div>
              <span className="text-gray-500 block">STATUS:</span>
              <span className="text-green-400 font-bold uppercase">{project.status}</span>
            </div>
            <div>
              <span className="text-gray-500 block">DIFFICULTY:</span>
              <span className="text-white font-bold uppercase">{project.difficulty}</span>
            </div>
            <div>
              <span className="text-gray-500 block">DURATION:</span>
              <span className="text-white font-bold uppercase">{project.duration}</span>
            </div>
            {project.metrics.slice(0, 1).map((m) => (
              <div key={m.label}>
                <span className="text-gray-500 block uppercase">{m.label}:</span>
                <span className="text-[#00b4d8] font-bold uppercase">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Problem & Solution case analyses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">PROBLEM STATEMENT</h4>
              <p className="text-gray-300">{project.problem}</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">SOLUTION ARCHITECTURE</h4>
              <p className="text-gray-300">{project.solution}</p>
            </div>
          </div>

          {/* Custom SVG Architecture Visualizer Node Flow */}
          <ArchitectureVisualizer projectId={project.id} />

          {/* Features Capabilities and Tech details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">KEY CAPABILITIES</h4>
              <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">TECHNOLOGY CATEGORIES</h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-[#90e0ef] bg-[#00b4d8]/10 border border-[#00b4d8]/20 px-2.5 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical challenges and optimizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-red-400 uppercase tracking-widest font-semibold">TECHNICAL CHALLENGES</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-1.5">
                {project.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-green-400 uppercase tracking-widest font-semibold">PERFORMANCE OPTIMIZATIONS</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-1.5">
                {project.optimizations.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Development Milestones */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">MILESTONES & RELEASES</h4>
            <div className="border-l border-[#2b303c] pl-4 space-y-4 ml-2">
              {project.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-[#00b4d8]" />
                  <span className="text-[10px] font-mono text-gray-500">{item.date}</span>
                  <h5 className="text-sm font-semibold text-white mt-0.5">{item.title}</h5>
                  <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Repository/Deployment links */}
          <div className="flex gap-4 pt-4 border-t border-[#2b303c]/40">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-[#00b4d8] text-[#0d0f12] hover:bg-[#90e0ef] transition-colors"
              >
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider border border-[#2b303c] text-white hover:bg-white/5 transition-colors"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
export {}
