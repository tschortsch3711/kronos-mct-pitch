import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useLang } from '../i18n'

/** Kurzer Lade-Intro: Zähler 0→100, Balken, dann Wipe nach oben. Nur beim ersten Seitenaufruf. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const { t } = useLang()

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone()
      return
    }
    const state = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => onDone(),
    })
    tl.to(state, {
      v: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(state.v)),
    })
    tl.to('.preloader-bar span', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
    tl.to(root.current, { yPercent: -100, duration: 0.75, ease: 'power3.inOut', delay: 0.15 })
    return () => {
      tl.kill()
    }
  }, [onDone])

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-count">{String(count).padStart(3, '0')}</div>
      <div className="preloader-bar">
        <span style={{ transform: 'scaleX(0)' }} />
      </div>
      <div className="preloader-line">{t.preloader.line}</div>
    </div>
  )
}
