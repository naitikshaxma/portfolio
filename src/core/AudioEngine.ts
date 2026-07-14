class AudioEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.isMuted = localStorage.getItem('kronos_audio_muted') === 'true'
    }
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
  }

  setMute(muted: boolean) {
    this.isMuted = muted
    localStorage.setItem('kronos_audio_muted', String(muted))
  }

  getMuted() {
    return this.isMuted
  }

  playHover() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return
    const ctx = this.ctx
    
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.01, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.04)
  }

  playClick() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return
    const ctx = this.ctx

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(500, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08)

    gain.gain.setValueAtTime(0.03, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  }

  playBoot() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return
    const ctx = this.ctx

    const now = ctx.currentTime
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const gain = ctx.createGain()

    osc1.type = 'sawtooth'
    osc1.frequency.setValueAtTime(110, now) // A2
    osc1.frequency.exponentialRampToValueAtTime(220, now + 1.2) // A3

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(165, now) // E3
    osc2.frequency.exponentialRampToValueAtTime(330, now + 1.2) // E4

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(180, now)
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.8)
    filter.frequency.exponentialRampToValueAtTime(250, now + 1.8)

    gain.gain.setValueAtTime(0.05, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc1.start()
    osc2.start()
    osc1.stop(now + 2.0)
    osc2.stop(now + 2.0)
  }
}

export const audioEngine = new AudioEngine()
export {}
