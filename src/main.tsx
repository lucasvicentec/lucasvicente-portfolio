import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SplashPage from './components/SplashPage.tsx'

function Root() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  if (!showPortfolio) {
    return <SplashPage onEnterPortfolio={() => setShowPortfolio(true)} />
  }

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
