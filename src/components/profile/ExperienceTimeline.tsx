import { TIMELINE_ITEMS, EDUCATION } from '@/constants/profile'

export function ExperienceTimeline() {
  return (
    <div id="experience" className="w-full text-white space-y-12 select-none">
      {/* Title */}
      <div className="space-y-3">
        <h2 className="text-display-md font-bold tracking-tight font-display">Telemetry Records</h2>
        <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
          EXPERIENCE // EDUCATION // TIMELINES
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Academic Records */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-[#2b303c]/40 pb-2">Academic Core</h3>
          
          <div className="bg-[#11141a]/60 border border-[#2b303c] rounded-xl p-6 space-y-4 shadow-xl">
            <div>
              <span className="text-[10px] font-mono text-[#00b4d8] uppercase tracking-wider">{EDUCATION.dateRange}</span>
              <h4 className="text-base font-bold text-white mt-1 leading-tight">{EDUCATION.institution}</h4>
              <p className="text-xs text-gray-400 mt-1">{EDUCATION.degree}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-mono py-3 border-t border-b border-[#2b303c]/40 uppercase text-gray-400">
              <div>SYS_CGPA:</div>
              <div className="text-white text-right font-bold">{EDUCATION.cgpa}</div>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-mono text-gray-500 block uppercase">RELEVANT_COURSEWORK:</span>
              <div className="flex flex-wrap gap-1.5">
                {EDUCATION.coursework.map((course) => (
                  <span
                    key={course}
                    className="text-[9px] font-mono text-gray-300 bg-[#1b1e23] border border-[#2b303c] px-2.5 py-1 rounded"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#2b303c]/40">
              <span className="text-[9px] font-mono text-gray-500 block uppercase">PRIOR_EDUCATION:</span>
              <ul className="list-disc pl-4 text-xs text-gray-400 space-y-1.5">
                {EDUCATION.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Milestones & Projects */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-[#2b303c]/40 pb-2">Key Milestones</h3>
          
          <div className="border-l border-[#2b303c] pl-6 space-y-8 ml-2">
            {TIMELINE_ITEMS.map((item) => (
              <div key={item.id} className="relative space-y-2">
                {/* Timeline dot */}
                <div className="absolute -left-[30px] top-1.5 h-2 w-2 rounded-full bg-[#00b4d8] shadow-[0_0_8px_rgba(0,180,216,0.5)]" />
                
                <div>
                  <span className="text-[9px] font-mono text-gray-500">{item.dateRange}</span>
                  <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                    <h4 className="text-base font-bold text-white leading-tight">{item.title}</h4>
                    <span className="text-[9px] font-mono text-[#00b4d8] uppercase tracking-wider">
                      @{item.company}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                
                <ul className="list-disc pl-4 text-xs text-gray-400 space-y-1">
                  {item.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export {}
