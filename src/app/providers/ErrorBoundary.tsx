import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[System Crash Detected]:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-obsidian text-ice-white font-mono p-6">
          <div className="w-full max-w-2xl border border-red-500/20 bg-space-gray p-6 rounded-lg shadow-2xl">
            <div className="flex items-center gap-2 mb-4 text-red-500">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
              <h2 className="text-lg font-bold">SYSTEM_CRITICAL_FAILURE</h2>
            </div>
            <p className="text-slate-gray mb-4 text-sm">
              An unhandled exception occurred in the UI core thread. Telemetry logs captured:
            </p>
            <pre className="p-4 bg-black/60 rounded border border-white/5 text-xs text-red-400 overflow-x-auto mb-6">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-charcoal hover:bg-white/10 border border-white/10 rounded text-sm transition-all duration-200"
            >
              Re-calibrate System
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
