import { VALUES } from '@/constants/profile'
import { SpotlightCard } from '@/shared/Card'

export function AboutSection() {
  return (
    <div id="about" className="w-full text-white space-y-12 select-none">
      {/* Narrative grid heading */}
      <div className="space-y-3">
        <h2 className="text-display-md font-bold tracking-tight font-display">Professional Narrative</h2>
        <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
          ABOUT // VALUES // ENGINEERING PHILOSOPHY
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Narrative text block */}
        <div className="lg:col-span-7 space-y-6 text-gray-400 text-sm md:text-base leading-relaxed">
          <p>
            I'm an AI/ML and Full Stack Developer with hands-on experience building scalable AI-powered applications — from multilingual voice assistants to NLP-driven recommendation systems. I'm passionate about low-latency AI systems, backend engineering, and solving real accessibility problems.
          </p>
          <p>
            My engineering philosophy is centered around performance, clean code structure, and impact at scale. I believe every AI system should be fast, explainable, and accessible. I'm constantly researching, building, and iterating to close the gap between research-grade AI and production-ready systems.
          </p>

          {/* Contact info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
            <div className="bg-[#11141a] border border-[#2b303c]/60 rounded-xl px-4 py-3 space-y-1">
              <span className="text-[9px] text-gray-500 block uppercase">EMAIL:</span>
              <a href="mailto:sharmanaitik8113@gmail.com" className="text-[#00b4d8] hover:underline select-text">
                sharmanaitik8113@gmail.com
              </a>
            </div>
            <div className="bg-[#11141a] border border-[#2b303c]/60 rounded-xl px-4 py-3 space-y-1">
              <span className="text-[9px] text-gray-500 block uppercase">PHONE:</span>
              <span className="text-white select-text">+91 7409643155</span>
            </div>
            <div className="bg-[#11141a] border border-[#2b303c]/60 rounded-xl px-4 py-3 space-y-1">
              <span className="text-[9px] text-gray-500 block uppercase">LOCATION:</span>
              <span className="text-white">Agra, India</span>
            </div>
            <div className="bg-[#11141a] border border-[#2b303c]/60 rounded-xl px-4 py-3 space-y-1">
              <span className="text-[9px] text-gray-500 block uppercase">STATUS:</span>
              <span className="text-green-400 font-bold">OPEN TO OPPORTUNITIES</span>
            </div>
          </div>

          <div className="p-4 bg-[#11141a] border border-[#2b303c]/40 rounded-xl max-w-lg">
            <span className="font-mono text-xs text-[#00b4d8] block mb-1">CAREER OBJECTIVE:</span>
            <span className="text-white font-semibold text-sm">
              AI/ML and Full Stack Developer with experience building scalable AI-powered applications using NLP, RAG pipelines, backend systems, and cloud technologies.
            </span>
          </div>
        </div>

        {/* Engineering values cards grid */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Core Principles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((val) => (
              <SpotlightCard key={val.title} className="p-5 flex flex-col justify-between h-40">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">{val.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-normal">{val.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export {}
