import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useSystemStore } from '@/app/store/useSystemStore'
import { Container, Section } from '@/shared/Layout'
import { Button, Magnetic } from '@/shared/Button'
import { AnimatedGrid, NoiseLayer, AuroraGradient, RadialGlow } from '@/shared/Background'
import CanvasContainer from '@/three/CanvasContainer'
import Scene from '@/three/Scene'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { AboutSection } from '@/components/profile/AboutSection'
import { SkillsGrid } from '@/components/profile/SkillsGrid'
import { ExperienceTimeline } from '@/components/profile/ExperienceTimeline'
import { AchievementsGrid } from '@/components/profile/AchievementsGrid'
import { ContactSection } from '@/components/contact/ContactSection'
import { ResumeCard } from '@/components/contact/ResumeCard'
import { SocialsGrid } from '@/components/contact/SocialsGrid'
import { Footer } from '@/components/layout/Footer'

// 1. Rotating Headline Subcomponent
const words = ['Building AI Voice Pipelines', 'Crafting RAG Systems', 'Engineering the Future']

function RotatingHeadline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-12 md:h-16 overflow-hidden relative flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-xl md:text-3xl font-extrabold bg-gradient-to-r from-[#00b4d8] via-[#90e0ef] to-[#7209b7] bg-clip-text text-transparent font-display"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// 2. CountUp Animator Subcomponent
function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const start = 0
    const end = value
    const duration = 1500
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      const current = Math.floor(ease * (end - start) + start)
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref} className="font-display text-3xl font-extrabold text-white">
      {count}
      {suffix}
    </span>
  )
}

// 3. Telemetry Panel Subcomponent
function TelemetryPanel() {
  const [time, setTime] = useState('')
  const gpuTier = useSystemStore((state) => state.gpuTier)
  const theme = useSystemStore((state) => state.theme)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      aria-label="System telemetry metrics"
      className="border border-[#2b303c] bg-[#11141a]/65 backdrop-blur-md rounded-xl p-5 font-mono text-xs text-gray-400 space-y-3.5 shadow-xl w-full max-w-sm select-none"
    >
      <div className="flex justify-between items-center pb-2 border-b border-[#2b303c]">
        <span className="font-bold text-[#00b4d8] tracking-widest text-[9px]">KRONOS OS TELEMETRY</span>
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-2 text-[9px] uppercase">
        <div>SYS_TIME:</div>
        <div className="text-white text-right">{time}</div>
        <div>SYS_THEME:</div>
        <div className="text-white text-right">{theme}</div>
        <div>SYS_GPU_TIER:</div>
        <div className="text-white text-right">{gpuTier || 'DETECTING...'}</div>
        <div>SYS_LOCATION:</div>
        <div className="text-white text-right font-semibold">INDIA</div>
        <div>SYS_STATUS:</div>
        <div className="text-white text-right text-green-400 font-bold">OPERATIONAL</div>
      </div>
    </div>
  )
}

// 4. Scroll Indicator Subcomponent
function ScrollIndicator() {
  const handleScrollDown = () => {
    const target = document.getElementById('projects')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-10 cursor-pointer" onClick={handleScrollDown}>
      <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">SCROLL ENGINE</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-5 h-8 rounded-full border border-gray-600 flex justify-center p-1"
      >
        <div className="w-1 h-1.5 bg-[#00b4d8] rounded-full" />
      </motion.div>
    </div>
  )
}

// Main Landing Component
export default function Landing() {
  return (
    <div className="relative min-h-screen w-full bg-obsidian text-ice-white overflow-hidden flex flex-col justify-center">
      {/* Background Layers */}
      <AnimatedGrid />
      <AuroraGradient />
      <RadialGlow />
      <NoiseLayer />

      <Container>
        <Section className="py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[75vh]">
            
            {/* Left Content Area */}
            <div className="md:col-span-7 flex flex-col space-y-6 md:space-y-8 z-10">
              {/* Identity tag */}
              <div className="inline-flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b4d8] animate-ping" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-gray-400 uppercase">
                  KRONOS-01 // IDENTITY VERIFIED
                </span>
              </div>

              {/* Title & Headline */}
              <div className="space-y-2">
                <h1 className="text-display-xl font-bold tracking-tight text-white leading-none">
                  Naitik Sharma
                </h1>
                <RotatingHeadline />
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed">
                AI/ML and Full Stack Developer building scalable AI voice pipelines, RAG retrieval systems, and intelligent real-world applications. Top 5 at IIT Delhi Sprint Hack 2026.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 items-center">
                <Magnetic>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    View Projects
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button
                    variant="glass"
                    size="md"
                    onClick={() => window.open('/resume.pdf', '_blank')}
                  >
                    Download Resume
                  </Button>
                </Magnetic>
              </div>

              {/* Statistics Panel */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl pt-4 border-t border-[#2b303c]/40">
                <div className="flex flex-col">
                  <CountUp value={4} suffix="+" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase mt-1">Projects</span>
                </div>
                <div className="flex flex-col">
                  <CountUp value={8} suffix="+" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase mt-1">Skills</span>
                </div>
                <div className="flex flex-col">
                  <CountUp value={2} suffix="" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase mt-1">MS Certs</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-3xl font-extrabold text-white">Top 5</span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase mt-1">IIT Delhi</span>
                </div>
              </div>

              {/* Telemetry Panel */}
              <TelemetryPanel />
            </div>

            {/* Right 3D Visualizer Area */}
            <div className="md:col-span-5 h-[350px] md:h-[550px] relative w-full flex items-center justify-center">
              <div className="absolute w-[90%] h-[90%] border border-[#2b303c]/40 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm shadow-inner flex items-center justify-center">
                <CanvasContainer>
                  <Scene />
                </CanvasContainer>
                {/* Visual grid frame border accents */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-gray-600">R3F_RENDER_PLANE</div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-gray-600">LOD: ACTIVE</div>
              </div>
            </div>

          </div>
        </Section>
        <Section className="py-12 md:py-24 border-t border-[#2b303c]/20">
          <ProjectGrid />
        </Section>
        <Section className="py-12 md:py-24 border-t border-[#2b303c]/20">
          <AboutSection />
        </Section>
        <Section className="py-12 md:py-24 border-t border-[#2b303c]/20">
          <SkillsGrid />
        </Section>
        <Section className="py-12 md:py-24 border-t border-[#2b303c]/20">
          <ExperienceTimeline />
        </Section>
        <Section className="py-12 md:py-24 border-t border-[#2b303c]/20">
          <AchievementsGrid />
        </Section>
        <Section className="py-12 md:py-24 border-t border-[#2b303c]/20">
          <ContactSection />
        </Section>
        <Section className="py-12 md:py-24 border-t border-[#2b303c]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <ResumeCard />
            </div>
            <div className="lg:col-span-8">
              <SocialsGrid />
            </div>
          </div>
        </Section>
      </Container>
      <Footer />

      {/* Floating scroll indicator */}
      <ScrollIndicator />
    </div>
  )
}
