import { trackEvent } from '@/utils/analytics'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleBackToTop = () => {
    trackEvent('back_to_top_click')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full border-t border-[#2b303c]/30 bg-black/25 py-8 md:py-12 text-gray-500 font-mono text-xs select-none">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left copyright and build version */}
        <div className="space-y-1 text-center md:text-left">
          <div>© {currentYear} NAITIK SHARMA. ALL RIGHTS RESERVED.</div>
          <div className="text-[9px] text-gray-600">KRONOS-01 BUILD v1.4.0-RELEASE</div>
        </div>

        {/* Center: Tech stack tag */}
        <div className="text-[10px] text-gray-400 bg-charcoal border border-[#2b303c] px-3 py-1 rounded-full text-center">
          SYS_CORES: REACT 19 // VITE // THREE.JS
        </div>

        {/* Right: Back to top */}
        <button
          onClick={handleBackToTop}
          className="text-gray-400 hover:text-white transition-colors duration-150 uppercase tracking-widest text-[10px] font-bold"
        >
          BACK TO TOP ↑
        </button>

      </div>
    </footer>
  )
}
export {}
