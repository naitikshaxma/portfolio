import { SpotlightCard } from '@/shared/Card'
import { trackEvent } from '@/utils/analytics'

export function SocialsGrid() {
  const handleLinkClick = (platform: string) => {
    trackEvent('social_link_click', { platform })
  }

  const links = [
    {
      name: 'GitHub',
      desc: 'Browse source code, projects & contributions',
      url: 'https://github.com/naitikshaxma'
    },
    {
      name: 'LinkedIn',
      desc: 'Connect professionally',
      url: 'https://linkedin.com/in/naitik-sharma-92479230b'
    },
    {
      name: 'Voice OS Bharat',
      desc: 'View flagship project live demo',
      url: 'https://voice-os-bhaarat.vercel.app'
    }
  ]

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Connect Matrix</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick(link.name)}
            className="block"
          >
            <SpotlightCard className="p-5 flex flex-col justify-between h-36 hover:border-[#00b4d8]/40 transition-colors">
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase">{link.name}</h4>
                <p className="text-[10px] text-gray-400 leading-normal">{link.desc}</p>
              </div>
              <span className="text-[10px] font-mono text-[#00b4d8] uppercase tracking-wider">VISIT ↗</span>
            </SpotlightCard>
          </a>
        ))}
      </div>
    </div>
  )
}
export {}
