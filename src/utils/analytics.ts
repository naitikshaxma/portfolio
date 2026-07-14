export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | null | undefined>
) {
  // In development, log events to console for debug review
  if (import.meta.env.DEV) {
    console.log(`[ANALYTICS_EVENT] name="${eventName}" params=`, params)
  }

  // Google Analytics trigger point (if window.gtag is available)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    try {
      const g = (window as Window & { gtag?: (type: string, name: string, data?: typeof params) => void }).gtag
      if (g) {
        g('event', eventName, params)
      }
    } catch (err) {
      console.warn('Analytics tracking error:', err)
    }
  }

  // Vercel Analytics trigger point (if window.va is available)
  if (typeof window !== 'undefined' && 'va' in window) {
    try {
      const v = (window as Window & { va?: (type: string, name: string, data?: typeof params) => void }).va
      if (v) {
        v('event', eventName, params)
      }
    } catch (err) {
      console.warn('Vercel Analytics error:', err)
    }
  }
}
