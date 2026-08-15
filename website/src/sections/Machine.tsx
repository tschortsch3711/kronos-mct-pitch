import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { useLang } from '../i18n'

/**
 * Sticky Assembly-Sequenz: Die Maschine montiert sich beim Scrollen aus ihren
 * Modulen und druckt am Ende Leiterbahnen auf ein 3D-Teil. Danach: horizontale
 * Scroll-Galerie der drei Konfigurationen. (Abstraktion — keine realen CAD-Daten.)
 */
export default function Machine() {
  const root = useRef<HTMLElement>(null)
  const tiersRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(1)
  const { t, lang } = useLang()
  const m = t.machine

  // ---- Assembly-Pin
  useEffect(() => {
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      const traces = gsap.utils.toArray<SVGPathElement>('.print-trace')
      const encl = document.querySelector<SVGRectElement>('#g-enclosure rect')

      if (reduced) {
        gsap.set(['#g-base', '#g-frame', '#g-table', '#g-column', '#g-heads'], { x: 0, y: 0, opacity: 1 })
        gsap.set(['#g-enclosure', '#g-part'], { opacity: 1 })
        traces.forEach((p) => gsap.set(p, { strokeDasharray: 'none' }))
        gsap.set('.machine-label', { opacity: 1 })
        gsap.set('.machine-caption', { opacity: 1, position: 'relative' })
        return
      }

      gsap.set('#g-base', { y: 150, opacity: 0 })
      gsap.set('#g-frame', { y: -170, opacity: 0 })
      gsap.set('#g-table', { x: -240, opacity: 0 })
      gsap.set('#g-column', { x: 220, y: -90, opacity: 0 })
      gsap.set('#g-heads', { y: -240, opacity: 0 })
      gsap.set('#g-part', { opacity: 0 })
      if (encl) {
        const len = 2 * (740 + 470)
        gsap.set(encl, { strokeDasharray: len, strokeDashoffset: len })
      }
      traces.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: '.machine-stage',
          start: 'top top',
          end: '+=3000',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      })

      const cap = (i: number) => {
        tl.to('.machine-caption', { opacity: 0, y: -10, duration: 0.25 }, '<')
        tl.to(`.machine-caption[data-step="${i}"]`, { opacity: 1, y: 0, duration: 0.3 })
        tl.call(() => setStep(i))
      }

      tl.to('#g-base', { y: 0, opacity: 1, duration: 1 })
      tl.to('.machine-label[data-for="base"]', { opacity: 1, duration: 0.3 }, '-=0.3')
      cap(1)
      tl.to('#g-frame', { y: 0, opacity: 1, duration: 1 }, '+=0.2')
      tl.to('#g-table', { x: 0, opacity: 1, duration: 1 }, '+=0.1')
      tl.to('.machine-label[data-for="table"]', { opacity: 1, duration: 0.3 }, '-=0.3')
      cap(2)
      tl.to('#g-column', { x: 0, y: 0, opacity: 1, duration: 1 }, '+=0.2')
      tl.to('#g-heads', { y: 0, opacity: 1, duration: 1 }, '+=0.1')
      tl.to('.machine-label[data-for="heads"]', { opacity: 1, duration: 0.3 }, '-=0.3')
      cap(3)
      if (encl) tl.to(encl, { strokeDashoffset: 0, duration: 1.2 }, '+=0.2')
      tl.to('#g-part', { opacity: 1, duration: 0.5 }, '-=0.4')
      traces.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, duration: 0.8 }, i === 0 ? '+=0.1' : '-=0.5')
      })
      tl.to('.machine-label[data-for="part"]', { opacity: 1, duration: 0.3 }, '-=0.4')
      cap(4)
      tl.to({}, { duration: 0.6 })
    }, root)
    return () => ctx.revert()
  }, [lang])

  // ---- horizontale Tier-Galerie
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const track = tiersRef.current?.querySelector<HTMLDivElement>('.tiers-track')
      if (!track) return
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth)
      gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: tiersRef.current,
          start: 'top top',
          end: () => `+=${getDist() + 300}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, tiersRef)
    return () => ctx.revert()
  }, [lang])

  return (
    <section id="machine" ref={root} aria-labelledby="machine-h">
      <div className="machine-stage" style={{ background: 'var(--bg)' }}>
        <div className="machine-pin">
          <div className="wrap" style={{ width: '100%' }}>
            <div className="machine-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) minmax(320px, 1.6fr)', gap: 44, alignItems: 'center' }}>
              <div>
                <p className="kicker">{m.kicker}</p>
                <div className="machine-step" aria-hidden="true">
                  {m.stepLabel} <b>0{step}</b> / 04
                  <span style={{ flex: 1, height: 1, background: 'var(--line)', position: 'relative' }}>
                    <span style={{ position: 'absolute', inset: 0, transformOrigin: 'left', transform: `scaleX(${step / 4})`, background: 'var(--copper)', transition: 'transform 0.4s var(--ease-out)' }} />
                  </span>
                </div>
                <h2 id="machine-h" style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', marginBottom: 20 }}>
                  {m.title}
                </h2>
                <div style={{ position: 'relative', minHeight: 150 }}>
                  {m.captions.map((txt, i) => (
                    <p
                      key={i}
                      className="machine-caption"
                      data-step={i + 1}
                      style={{ position: 'absolute', inset: 0, fontSize: 16, color: 'var(--mute)', opacity: 0, maxWidth: '38ch' }}
                    >
                      {txt}
                    </p>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                  {m.tiers.map((tier) => (
                    <span key={tier.name} className="tag" style={tier.hot ? { color: 'var(--copper)', borderColor: 'rgba(224,135,58,0.5)' } : undefined}>
                      {tier.name} · {tier.price}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <svg viewBox="0 0 900 640" role="img" aria-label="Abstracted exploded view of the KRONOS Eos five-axis machine assembling itself" style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <g id="g-enclosure">
                    <rect x="80" y="90" width="740" height="470" rx="18" fill="none" stroke="var(--line)" strokeWidth="2.5" />
                  </g>
                  <g id="g-base">
                    <rect x="130" y="470" width="640" height="60" rx="8" fill="#151c28" stroke="var(--line)" />
                    <rect x="160" y="530" width="60" height="24" fill="#10151e" stroke="var(--line)" />
                    <rect x="680" y="530" width="60" height="24" fill="#10151e" stroke="var(--line)" />
                    <rect x="150" y="440" width="600" height="30" rx="4" fill="#1c2534" stroke="var(--line)" />
                  </g>
                  <g id="g-frame">
                    <rect x="170" y="150" width="46" height="300" rx="6" fill="#151c28" stroke="var(--line)" />
                    <rect x="684" y="150" width="46" height="300" rx="6" fill="#151c28" stroke="var(--line)" />
                    <rect x="170" y="150" width="560" height="52" rx="6" fill="#1c2534" stroke="var(--line)" />
                    <line x1="200" y1="176" x2="700" y2="176" stroke="var(--faint)" strokeWidth="1.5" strokeDasharray="7 7" />
                  </g>
                  <g id="g-table">
                    <path d="M 380 440 L 420 400 H 520 L 560 440 Z" fill="#1c2534" stroke="var(--line)" />
                    <ellipse cx="470" cy="400" rx="86" ry="20" fill="#233246" stroke="var(--line)" />
                    <ellipse cx="470" cy="392" rx="86" ry="20" fill="#151c28" stroke="var(--faint)" />
                    <path d="M 384 392 A 86 20 0 0 0 556 392" fill="none" stroke="var(--copper-dim)" strokeWidth="1.5" />
                  </g>
                  <g id="g-column">
                    <rect x="430" y="196" width="80" height="26" rx="4" fill="#233246" stroke="var(--line)" />
                    <rect x="452" y="220" width="36" height="70" rx="4" fill="#151c28" stroke="var(--line)" />
                  </g>
                  <g id="g-heads">
                    <rect x="436" y="290" width="30" height="52" rx="4" fill="#1c2534" stroke="var(--copper-dim)" />
                    <rect x="474" y="290" width="30" height="44" rx="4" fill="#1c2534" stroke="var(--line)" />
                    <path d="M 451 342 l 0 14" stroke="var(--copper)" strokeWidth="2.5" />
                    <path d="M 489 334 l 0 10" stroke="var(--teal)" strokeWidth="2.5" />
                  </g>
                  <g id="g-part">
                    <path d="M 430 392 A 40 26 0 0 1 510 392 Z" fill="#10151e" stroke="var(--faint)" />
                    <g fill="none" stroke="var(--copper)" strokeWidth="2.2" strokeLinecap="round">
                      <path className="print-trace" d="M 438 390 Q 452 362 470 360 Q 492 362 502 388" />
                      <path className="print-trace" d="M 447 391 Q 462 374 478 372 Q 492 374 496 390" />
                      <path className="print-trace" d="M 470 360 L 470 344" />
                    </g>
                    <rect x="466" y="338" width="8" height="7" fill="var(--copper)" />
                  </g>
                </svg>

                <div className="machine-label" data-for="base" style={{ left: '2%', bottom: '4%' }}>
                  <strong>{m.labels.base[0]}</strong>
                  {m.labels.base[1]}
                </div>
                <div className="machine-label" data-for="table" style={{ left: '6%', top: '44%' }}>
                  <strong>{m.labels.table[0]}</strong>
                  {m.labels.table[1]}
                </div>
                <div className="machine-label" data-for="heads" style={{ right: '2%', top: '26%' }}>
                  <strong>{m.labels.heads[0]}</strong>
                  {m.labels.heads[1]}
                </div>
                <div className="machine-label" data-for="part" style={{ right: '6%', bottom: '8%' }}>
                  <strong>{m.labels.part[0]}</strong>
                  {m.labels.part[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontale Konfigurations-Galerie */}
      <div ref={tiersRef} className="tiers-stage">
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40, padding: '60px 0' }}>
          <div className="wrap" style={{ width: '100%' }}>
            <p className="kicker" style={{ marginBottom: 0 }}>{m.kicker} · {m.tiers[0].name.split(' ')[0]} ONE — FIVE — MAX</p>
          </div>
          <div className="tiers-track">
            {m.tiers.map((tier, i) => (
              <article key={tier.name} className={`tier-card ${tier.hot ? 'hot' : ''}`}>
                <span className="tier-ghost" aria-hidden="true">{['01', '05', 'MX'][i]}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <h3 style={{ fontSize: 24, letterSpacing: '0.06em' }}>{tier.name}</h3>
                  <span className="mono" style={{ fontSize: 30, fontWeight: 700, color: tier.hot ? 'var(--copper)' : 'var(--teal)' }}>{tier.price}</span>
                </div>
                <p style={{ fontSize: 13.5, fontStyle: 'italic', color: tier.hot ? 'var(--copper)' : 'var(--mute)', margin: '8px 0 22px' }}>{tier.role}</p>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 11, position: 'relative' }}>
                  {tier.specs.map((sp) => (
                    <li key={sp} style={{ fontSize: 14.5, color: 'var(--mute)', paddingLeft: 20, position: 'relative' }}>
                      <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 9, width: 8, height: 8, background: 'var(--copper-dim)' }} />
                      {sp}
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: 22, fontSize: 12, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)' }}>{tier.audience}</p>
              </article>
            ))}
            {/* Abschlusskarte: Fence */}
            <article className="tier-card" style={{ display: 'flex', alignItems: 'center', background: 'var(--panel)' }}>
              <p style={{ fontSize: 15.5, color: 'var(--mute)', lineHeight: 1.7 }}>{m.fence}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
