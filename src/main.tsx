import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './lib/i18n'
import './index.css'
import App from './App'
import { useAppStore } from '@/stores/app-store'

function Bootstrap() {
  useEffect(() => {
    useAppStore.getState().initGuestProfile()
    useAppStore.getState().recalculateReadiness()
  }, [])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>,
)
