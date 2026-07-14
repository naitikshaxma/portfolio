import { useState } from 'react'
import { SKILLS } from '@/constants/profile'
import type { Skill } from '@/types/profile'

export function SkillsGrid() {
  const [activeSkill, setActiveSkill] = useState<Skill>(SKILLS[0])

  const categories = Array.from(new Set(SKILLS.map((s) => s.category)))

  return (
    <div id="skills" className="w-full text-white space-y-12 select-none">
      {/* Title */}
      <div className="space-y-3">
        <h2 className="text-display-md font-bold tracking-tight font-display">Technology Grid</h2>
        <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
          SYSTEM_UTILITIES // CAPABILITIES // TOOLKITS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Interactive Chips Grouped by Category */}
        <div className="md:col-span-8 space-y-6">
          {categories.map((cat) => {
            const catSkills = SKILLS.filter((s) => s.category === cat)
            return (
              <div key={cat} className="space-y-2">
                <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{cat}</h4>
                <div className="flex flex-wrap gap-2">
                  {catSkills.map((skill) => {
                    const isActive = activeSkill.name === skill.name
                    return (
                      <button
                        key={skill.name}
                        onMouseEnter={() => setActiveSkill(skill)}
                        onClick={() => setActiveSkill(skill)}
                        className={`px-3 py-2 rounded-lg font-mono text-xs transition-all duration-150 border ${
                          isActive
                            ? 'bg-[#00b4d8]/10 border-[#00b4d8] text-white shadow-[0_0_15px_rgba(0,180,216,0.2)]'
                            : 'border-[#2b303c] text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {skill.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side: Tech Radar Panel */}
        <div className="md:col-span-4">
          <div className="border border-[#2b303c] bg-[#11141a]/65 backdrop-blur-md rounded-xl p-6 font-mono text-xs text-gray-400 space-y-4 shadow-xl select-none">
            <div className="flex justify-between items-center pb-2 border-b border-[#2b303c]">
              <span className="font-bold text-[#00b4d8] tracking-widest text-[9px]">TECH TELEMETRY CORES</span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="space-y-4">
              {/* Name & description */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase">{activeSkill.name}</h4>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{activeSkill.details}</p>
              </div>

              {/* Stats */}
              <div className="space-y-2.5 text-[9px] uppercase border-t border-[#2b303c]/40 pt-3">
                <div className="flex justify-between">
                  <span>PRACTICE_YEARS:</span>
                  <span className="text-white font-bold">{activeSkill.years} YRS</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>CONFIDENCE_SCORE:</span>
                  <span className="text-[#00b4d8] font-bold">{activeSkill.confidence}%</span>
                </div>
                
                {/* Confidence visual slider */}
                <div className="h-1 bg-[#1b1e23] border border-[#2b303c] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00b4d8] transition-all duration-500"
                    style={{ width: `${activeSkill.confidence}%` }}
                  />
                </div>
              </div>

              {/* Projects used in */}
              <div className="space-y-1.5 border-t border-[#2b303c]/40 pt-3">
                <span className="text-[9px] text-gray-500 block uppercase">UTILISED_IN_SYSTEMS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.projects.map((proj) => (
                    <span
                      key={proj}
                      className="text-[9px] font-mono text-gray-400 bg-charcoal border border-[#2b303c] px-2 py-0.5 rounded"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export {}
