import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootProvider } from '@/app/providers'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </StrictMode>,
)
