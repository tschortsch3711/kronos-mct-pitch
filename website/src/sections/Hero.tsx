import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useLang } from '../i18n'
import SplitHeading from '../components/SplitHeading'
import Marquee from '../components/Marquee'

export default function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // Intro
      gsap.from('.hero-fade', { opacity: 0, y: 26, duration: 0.9, stagger: 0.14, ease: 'power3.out', delay: 0.25 })
      // Leiterbahnen zeichnen
      gsap.utils.toArray<SVGPathElement>('.hero-trace path').forEach((p, i) => {
        const len = p.getTotalLength()
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.7, delay: 0.6 + i * 0.25, ease: 'power2.inOut' }
        )
      })
      gsap.from('.hero-node', { scale: 0, transformOrigin: 'center', duration: 0.45, stagger: 0.16, delay: 1.6, ease: 'back.out(2.2)' })
      // Parallax beim Wegscrollen
      gsap.to('.hero-content', {
        yPercent: -14,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-orb', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [t])

  return (
    <div ref={root} id="top">
      <div style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb hero-orb" style={{ width: '52vw', height: '52vw', right: '-14vw', top: '-10vw' }} aria-hidden="true" />

        {/* Leiterbahn-Backdrop */}
        <svg
          className="hero-trace"
          aria-hidden="true"
          viewBox="0 0 600 700"
          style={{ position: 'absolute', right: '-3%', top: 0, height: '112%', opacity: 0.55, pointerEvents: 'none' }}
        >
          <g fill="none" stroke="var(--copper-dim)" strokeWidth="1.4">
            <path d="M 590 40 H 420 L 360 100 V 240 L 300 300 H 190" />
            <path d="M 600 180 H 470 L 430 220 V 380 L 370 440 H 260 V 560" />
            <path d="M 560 640 H 400 L 340 580 H 220" />
            <path d="M 600 480 H 520 L 480 520 V 620" />
          </g>
          <g fill="var(--copper)">
            <rect className="hero-node" x="185" y="295" width="10" height="10" />
            <rect className="hero-node" x="255" y="555" width="10" height="10" />
            <rect className="hero-node" x="215" y="575" width="10" height="10" />
            <rect className="hero-node" x="475" y="615" width="10" height="10" />
          </g>
        </svg>

        <div className="wrap hero-content" style={{ position: 'relative', paddingTop: 80, paddingBottom: 60 }}>
          <p className="hero-fade tag copper" style={{ marginBottom: 30 }}>{t.hero.tag}</p>
          <p className="hero-fade mono" style={{ color: 'var(--copper)', letterSpacing: '0.5em', fontSize: 13, fontWeight: 700, marginBottom: 18 }}>
            {t.hero.tagline}
          </p>
          <SplitHeading
            as="h1"
            lines={[t.hero.titleA, t.hero.titleB, t.hero.titleC]}
            style={{
              fontSize: 'clamp(42px, 8.6vw, 118px)',
              letterSpacing: '-0.015em',
              lineHeight: 0.98,
            }}
            className="hero-title"
          />
          <p className="hero-fade lede" style={{ marginTop: 34, maxWidth: '56ch' }}>{t.hero.sub}</p>
          <div className="hero-fade" style={{ marginTop: 46, display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#invest" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('invest')?.scrollIntoView({ behavior: 'smooth' }) }}>
              {t.hero.ctaPrimary} <span aria-hidden="true">→</span>
            </a>
            <span style={{ color: 'var(--faint)', fontSize: 13.5 }}>{t.hero.ctaScroll} ↓</span>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', color: 'var(--faint)', fontSize: 10.5, letterSpacing: '0.34em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
        >
          SCROLL
        </div>
      </div>
      <Marquee items={t.hero.marquee} />
    </div>
  )
}

