import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'

/** Vollbild-Hero: großes Wordmark, Leiterbahn-Animation, Scroll-Cue. */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { opacity: 0, y: 34, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.15 })
      const paths = gsap.utils.toArray<SVGPathElement>('.hero-trace path')
      paths.forEach((p, i) => {
        const len = p.getTotalLength()
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.6, delay: 0.5 + i * 0.22, ease: 'power2.inOut' }
        )
      })
      gsap.from('.hero-node', { scale: 0, transformOrigin: 'center', duration: 0.4, stagger: 0.18, delay: 1.4, ease: 'back.out(2)' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      id="top"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
    >
      {/* Leiterbahn-Hintergrund */}
      <svg
        className="hero-trace"
        aria-hidden="true"
        viewBox="0 0 600 700"
        style={{ position: 'absolute', right: '-4%', top: 0, height: '110%', opacity: 0.5, pointerEvents: 'none' }}
      >
        <g fill="none" stroke="var(--copper-dim)" strokeWidth="1.4">
          <path d="M 590 40 H 420 L 360 100 V 240 L 300 300 H 190" />
          <path d="M 600 180 H 470 L 430 220 V 380 L 370 440 H 260 V 560" />
          <path d="M 560 640 H 400 L 340 580 H 220" />
        </g>
        <g className="hero-nodes" fill="var(--copper)">
          <rect className="hero-node" x="185" y="295" width="10" height="10" />
          <rect className="hero-node" x="255" y="555" width="10" height="10" />
          <rect className="hero-node" x="215" y="575" width="10" height="10" />
        </g>
      </svg>

      <div className="wrap" style={{ position: 'relative' }}>
        <p className="hero-line tag copper" style={{ marginBottom: 28 }}>
          Investment Case · August 2026
        </p>
        <h1
          className="hero-line"
          style={{ fontSize: 'clamp(46px, 8.4vw, 108px)', letterSpacing: '0.02em', lineHeight: 1.02 }}
        >
          KRONOS
          <br />
          <span style={{ color: 'var(--copper)', letterSpacing: '0.14em' }}>EOS</span>
        </h1>
        <p className="hero-line lede" style={{ marginTop: 30, fontSize: 'clamp(18px, 2vw, 23px)', color: 'var(--ink)' }}>
          The dawn of accessible 3D-printed electronics.
        </p>
        <p className="hero-line lede" style={{ marginTop: 14 }}>
          A 25–100k € five-axis platform built on the proven technology of the category’s
          pioneer — aimed at the one price band every buyer can reach and no vendor serves.
        </p>
        <div className="hero-line" style={{ marginTop: 44, display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href="#invest"
            style={{
              background: 'var(--copper)', color: '#14100a', fontWeight: 700, padding: '13px 28px',
              borderRadius: 8, fontSize: 15,
            }}
          >
            Read the decision →
          </a>
          <a href="#problem" style={{ color: 'var(--mute)', fontSize: 14 }}>
            Or scroll — the story tells itself ↓
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)',
          color: 'var(--faint)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        }}
      >
        Scroll
      </div>
    </div>
  )
}
