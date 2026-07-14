import { Button } from '@/shared/Button'
import { trackEvent } from '@/utils/analytics'

export function ResumeCard() {
  const handleDownload = () => {
    trackEvent('resume_download', { version: 'v1.4.0' })
    window.open('/resume.pdf', '_blank')
  }

  return (
    <div className="border border-[#2b303c] bg-[#11141a]/65 backdrop-blur-md rounded-xl p-6 font-mono text-xs text-gray-400 space-y-4 shadow-xl select-none w-full max-w-sm">
      <div className="flex justify-between items-center pb-2 border-b border-[#2b303c]">
        <span className="font-bold text-[#00b4d8] tracking-widest text-[9px]">RESUME METADATA</span>
        <span className="text-[9px] text-gray-500">ACTIVE // LATEST</span>
      </div>
      
      <div className="space-y-2 text-[9px] uppercase">
        <div className="flex justify-between">
          <span>DOC_VERSION:</span>
          <span className="text-white">v1.4.0</span>
        </div>
        <div className="flex justify-between">
          <span>FILE_SIZE:</span>
          <span className="text-white">142 KB</span>
        </div>
        <div className="flex justify-between">
          <span>LAST_UPDATED:</span>
          <span className="text-white">JULY 2026</span>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        variant="glass"
        className="w-full py-2.5 text-[10px] tracking-wider uppercase font-semibold"
      >
        DOWNLOAD RESUME 🗎
      </Button>
    </div>
  )
}
export {}
