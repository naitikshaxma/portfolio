import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'

export function useModelLoader(url: string) {
  const [error, setError] = useState<Error | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    Promise.resolve().then(() => {
      try {
        useGLTF.preload(url)
        if (active) {
          setLoaded(true)
        }
      } catch (err) {
        if (active) {
          setError(err as Error)
        }
      }
    })
    return () => {
      active = false
    }
  }, [url])

  return { loaded, error }
}
