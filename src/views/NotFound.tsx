import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-obsidian text-ice-white font-sans p-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-display font-bold text-cyber-cyan mb-4">404</h1>
        <h2 className="text-xl font-mono mb-4 text-ice-white">ERROR: LINK_NODE_NOT_FOUND</h2>
        <p className="text-slate-gray mb-8">
          The requested system coordinates do not exist or have been decommissioned.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 bg-charcoal hover:bg-white/10 border border-white/10 rounded-md font-mono text-sm tracking-wide transition-all duration-200 text-ice-white"
        >
          Return to Core
        </Link>
      </div>
    </div>
  )
}
