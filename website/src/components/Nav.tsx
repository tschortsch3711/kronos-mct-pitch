import { useEffect, useRef } from 'react'

const LINKS = [
  ['#problem', 'Problem'],
  ['#technology', 'Technology'],
  ['#machine', 'The Machine'],
  ['#market', 'Market'],
  ['#customers', 'Customers'],
  ['#financials', 'Financials'],
  ['#invest', 'Investment'],
] as const

export default function Nav() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight)
      if (bar.current) bar.current.style.width = `${(p * 100).toFixed(2)}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand" aria-label="KRONOS Eos — back to top">
          KRONOS <em>EOS</em>
        </a>
        <nav aria-label="Sections">
          <ul className="nav-links">
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="nav-progress" ref={bar} aria-hidden="true" />
    </header>
  )
}
