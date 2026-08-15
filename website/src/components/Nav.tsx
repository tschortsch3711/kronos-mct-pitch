import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n'

export default function Nav() {
  const bar = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const { t, lang, setLang } = useLang()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const y = h.scrollTop
      const p = y / Math.max(1, h.scrollHeight - h.clientHeight)
      if (bar.current) bar.current.style.width = `${(p * 100).toFixed(2)}%`
      // Nav taucht beim Runterscrollen ab, beim Hochscrollen auf
      setHidden(y > 140 && y > lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const links = [
    ['/', t.nav.story],
    ['/technology', t.nav.technology],
    ['/financials', t.nav.financials],
    ['/research', t.nav.research],
  ] as const

  return (
    <header className={`nav ${hidden && !open ? 'nav-hidden' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-brand" aria-label="KRONOS Eos — home">
          KRONOS <em>EOS</em>
        </Link>
        <nav aria-label="Main">
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {links.map(([href, label]) => (
              <li key={href}>
                <NavLink to={href} end={href === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/#invest">{t.nav.decision}</Link>
            </li>
            <li>
              <button
                className="lang-btn"
                onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
                aria-label={t.nav.langSwitch}
                title={t.nav.langSwitch}
              >
                <span className={lang === 'en' ? 'on' : ''}>EN</span>
                <span style={{ opacity: 0.4, padding: '0 4px' }}>/</span>
                <span className={lang === 'de' ? 'on' : ''}>DE</span>
              </button>
            </li>
          </ul>
        </nav>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>
      <div className="nav-progress" ref={bar} aria-hidden="true" />
    </header>
  )
}
