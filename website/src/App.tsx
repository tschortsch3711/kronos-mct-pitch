import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import TechnologyPage from './pages/TechnologyPage'
import FinancialsPage from './pages/FinancialsPage'
import ResearchPage from './pages/ResearchPage'
import { useLang } from './i18n'
import { initSmoothScroll, scrollToTop, ScrollTrigger } from './lib/gsapSetup'

export default function App() {
  // Preloader nur einmal pro Browser-Session zeigen
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem('kronos-loaded') === '1')
  const location = useLocation()
  const { t } = useLang()

  const markLoaded = () => {
    sessionStorage.setItem('kronos-loaded', '1')
    setLoaded(true)
  }

  useEffect(() => {
    initSmoothScroll()
  }, [])

  // Bei Routenwechsel nach oben und ScrollTrigger neu vermessen
  useEffect(() => {
    if (!location.hash) scrollToTop(true)
    const timer = setTimeout(() => ScrollTrigger.refresh(), 250)
    return () => clearTimeout(timer)
  }, [location.pathname, location.hash])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      {!loaded && <Preloader onDone={markLoaded} />}
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/financials" element={<FinancialsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <p className="footer-brand" aria-hidden="true">
            KRONOS <em>EOS</em>
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <p>
              {t.footer.line1}
              <br />
              {t.footer.line2}
            </p>
            <p>
              <a href="https://github.com/tschortsch3711/kronos-mct-pitch">{t.footer.sources}</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
