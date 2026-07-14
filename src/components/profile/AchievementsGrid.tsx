import { CERTIFICATIONS } from '@/constants/profile'
import { SpotlightCard } from '@/shared/Card'

export function AchievementsGrid() {
  return (
    <div id="achievements" className="w-full text-white space-y-12 select-none">
      {/* Title */}
      <div className="space-y-3">
        <h2 className="text-display-md font-bold tracking-tight font-display">Credentials & Verification</h2>
        <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
          ACHIEVEMENTS // CERTIFICATIONS // VERIFICATIONS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Certifications Grid */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-[#2b303c]/40 pb-2">Microsoft Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <SpotlightCard key={cert.id} className="p-5 flex flex-col justify-between h-44">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#00b4d8]/20 border border-[#00b4d8]/40 rounded flex items-center justify-center">
                      <span className="text-[8px] text-[#00b4d8] font-bold">MS</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase">{cert.issuer}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight">{cert.title}</h4>
                  <div className="font-mono text-[9px] text-gray-400">
                    <div>ISSUED: {cert.date}</div>
                  </div>
                </div>
                
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[10px] font-mono text-[#00b4d8] hover:underline"
                >
                  VIEW CERTIFICATION ↗
                </a>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Right: Key Achievements */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-[#2b303c]/40 pb-2">Key Accomplishments</h3>
          <div className="bg-[#11141a]/60 border border-[#2b303c] rounded-xl p-6 space-y-5 shadow-xl">

            {/* IIT Delhi — highlighted prominently */}
            <div className="space-y-1 relative">
              <div className="absolute -top-1 -right-1">
                <span className="text-[8px] font-mono bg-[#00b4d8] text-black px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  FLAGSHIP
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#00b4d8] uppercase tracking-wider">FEBRUARY 2026</span>
              <h4 className="text-base font-bold text-white">🏆 Top 5 Finalist // IIT Delhi Sprint Hack 2026</h4>
              <p className="text-xs text-gray-400 leading-normal">
                Competed among nationwide participants at one of India's top university hackathons. Presented a production-ready AI application prototype to industry judges and startup mentors.
              </p>
              <ul className="list-disc pl-4 text-xs text-gray-400 space-y-1 pt-1">
                <li>Engineered real-time response flows under sprint time constraints.</li>
                <li>Delivered a live demo to a panel of industry specialists from top tech companies.</li>
              </ul>
            </div>

            <div className="space-y-1 border-t border-[#2b303c]/40 pt-4">
              <span className="text-[9px] font-mono text-[#00b4d8] uppercase tracking-wider">2026</span>
              <h4 className="text-sm font-bold text-white">Voice OS Bharat — Sub-1.5s Latency Achievement</h4>
              <p className="text-xs text-gray-400 leading-normal">
                Built a low-latency AI voice pipeline achieving sub-1.5 second end-to-end response across STT → RAG → TTS stages.
              </p>
            </div>

            <div className="space-y-1 border-t border-[#2b303c]/40 pt-4">
              <span className="text-[9px] font-mono text-[#00b4d8] uppercase tracking-wider">ONGOING</span>
              <h4 className="text-sm font-bold text-white">AWS AI for Bharat Hackathon — Idea Submission</h4>
              <p className="text-xs text-gray-400 leading-normal">
                Submitted Voice OS Bharat architecture for AWS AI for Bharat initiative to bridge digital accessibility gaps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export {}
