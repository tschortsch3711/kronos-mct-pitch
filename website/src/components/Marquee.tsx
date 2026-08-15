import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'

/** Endlos-Laufband; Scroll-Geschwindigkeit moduliert das Tempo leicht. */
export default function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    const half = el.scrollWidth / 2
    const tween = gsap.to(el, {
      x: reverse ? half : -half,
      duration: 26,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % half}px`,
      },
    })
    return () => {
      tween.kill()
    }
  }, [items, reverse])

  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={track}>
        {row.map((it, i) => (
          <span className="marquee-item" key={i}>
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}
