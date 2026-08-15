import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsapSetup'
import { TIERS } from '../data/caseData'

/**
 * Sticky Assembly-Sequenz: Beim Scrollen fügt sich eine abstrahierte
 * 5-Achs-Maschine aus ihren Modulen zusammen und druckt am Ende
 * Leiterbahnen auf ein 3D-Teil. (Abstraktion — keine realen CAD-Daten.)
 */
export default function Machine() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      const traces = gsap.utils.toArray<SVGPathElement>('.print-trace')
      const encl = document.querySelector<SVGRectElement>('#g-enclosure rect')

      if (reduced) {
        // statisch: fertig montierter Zustand
        gsap.set(['#g-base', '#g-frame', '#g-table', '#g-column', '#g-heads'], { x: 0, y: 0, opacity: 1 })
        gsap.set('#g-enclosure', { opacity: 1 })
        gsap.set('#g-part', { opacity: 1 })
        traces.forEach((p) => gsap.set(p, { strokeDasharray: 'none' }))
        gsap.set('.machine-label', { opacity: 1 })
        gsap.set('.machine-caption', { opacity: 1, position: 'relative' })
        return
      }

      // Explodierter Ausgangszustand
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
          end: '+=2800',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      })

      const cap = (i: number) => {
        tl.to('.machine-caption', { opacity: 0, y: -10, duration: 0.25 }, '<')
        tl.to(`.machine-caption[data-step="${i}"]`, { opacity: 1, y: 0, duration: 0.3 })
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
      tl.to({}, { duration: 0.6 }) // Ausklang
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="machine" ref={root} aria-labelledby="machine-h">
      <div className="machine-stage" style={{ background: 'var(--bg)' }}>
        <div className="machine-pin">
          <div className="wrap" style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) minmax(320px, 1.6fr)', gap: 40, alignItems: 'center' }} className="machine-grid">
              <div>
                <p className="kicker">03 · The Machine</p>
                <h2 id="machine-h" style={{ fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 18 }}>
                  One platform.
                  <br />
                  Three configurations.
                </h2>
                <div style={{ position: 'relative', minHeight: 150 }}>
                  {[
                    'A compact, rigid machine base — engineered down to a lab footprint, not up to a factory one.',
                    'The five-axis heart: rotary-tilt table under a stiff portal. Software compensation replaces over-engineered iron.',
                    'Two toolheads — piezo-jet and micro-dispensing — plus UV curing. Precision where deposition needs it: ±15 µm.',
                    'And then it prints: conductive traces onto true 3D geometry. From CAD to a functional, populated part — same day.',
                  ].map((t, i) => (
                    <p
                      key={i}
                      className="machine-caption"
                      data-step={i + 1}
                      style={{
                        position: 'absolute', inset: 0, fontSize: 16, color: 'var(--mute)',
                        opacity: 0, maxWidth: '38ch',
                      }}
                    >
                      {t}
                    </p>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                  {TIERS.map((t) => (
                    <span key={t.name} className="tag" style={t.hot ? { color: 'var(--copper)', borderColor: 'rgba(224,135,58,0.5)' } : undefined}>
                      {t.name} · {t.price}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <svg viewBox="0 0 900 640" role="img" aria-label="Abstracted exploded view of the KRONOS Eos five-axis machine assembling itself" style={{ width: '100%', height: 'auto', display: 'block' }}>
                  {/* Umhausung (wird als Kontur gezeichnet) */}
                  <g id="g-enclosure">
                    <rect x="80" y="90" width="740" height="470" rx="18" fill="none" stroke="var(--line)" strokeWidth="2.5" />
                  </g>

                  {/* Basis */}
                  <g id="g-base">
                    <rect x="130" y="470" width="640" height="60" rx="8" fill="#1a2432" stroke="var(--line)" />
                    <rect x="160" y="530" width="60" height="24" fill="#131a24" stroke="var(--line)" />
                    <rect x="680" y="530" width="60" height="24" fill="#131a24" stroke="var(--line)" />
                    <rect x="150" y="440" width="600" height="30" rx="4" fill="#20293a" stroke="var(--line)" />
                  </g>

                  {/* Portal */}
                  <g id="g-frame">
                    <rect x="170" y="150" width="46" height="300" rx="6" fill="#1a2432" stroke="var(--line)" />
                    <rect x="684" y="150" width="46" height="300" rx="6" fill="#1a2432" stroke="var(--line)" />
                    <rect x="170" y="150" width="560" height="52" rx="6" fill="#20293a" stroke="var(--line)" />
                    <line x1="200" y1="176" x2="700" y2="176" stroke="var(--faint)" strokeWidth="1.5" strokeDasharray="7 7" />
                  </g>

                  {/* Dreh-Schwenk-Tisch */}
                  <g id="g-table">
                    <path d="M 380 440 L 420 400 H 520 L 560 440 Z" fill="#20293a" stroke="var(--line)" />
                    <ellipse cx="470" cy="400" rx="86" ry="20" fill="#26344a" stroke="var(--line)" />
                    <ellipse cx="470" cy="392" rx="86" ry="20" fill="#1a2432" stroke="var(--faint)" />
                    <path d="M 384 392 A 86 20 0 0 0 556 392" fill="none" stroke="var(--copper-dim)" strokeWidth="1.5" />
                  </g>

                  {/* Z-Schlitten */}
                  <g id="g-column">
                    <rect x="430" y="196" width="80" height="26" rx="4" fill="#26344a" stroke="var(--line)" />
                    <rect x="452" y="220" width="36" height="70" rx="4" fill="#1a2432" stroke="var(--line)" />
                  </g>

                  {/* Werkzeugköpfe */}
                  <g id="g-heads">
                    <rect x="436" y="290" width="30" height="52" rx="4" fill="#20293a" stroke="var(--copper-dim)" />
                    <rect x="474" y="290" width="30" height="44" rx="4" fill="#20293a" stroke="var(--line)" />
                    <path d="M 451 342 l 0 14" stroke="var(--copper)" strokeWidth="2.5" />
                    <path d="M 489 334 l 0 10" stroke="var(--teal)" strokeWidth="2.5" />
                  </g>

                  {/* Bauteil mit gedruckten Leiterbahnen */}
                  <g id="g-part">
                    <path d="M 430 392 A 40 26 0 0 1 510 392 Z" fill="#131a24" stroke="var(--faint)" />
                    <g fill="none" stroke="var(--copper)" strokeWidth="2.2" strokeLinecap="round">
                      <path className="print-trace" d="M 438 390 Q 452 362 470 360 Q 492 362 502 388" />
                      <path className="print-trace" d="M 447 391 Q 462 374 478 372 Q 492 374 496 390" />
                      <path className="print-trace" d="M 470 360 L 470 344" />
                    </g>
                    <rect x="466" y="338" width="8" height="7" fill="var(--copper)" />
                  </g>
                </svg>

                {/* Spec-Labels */}
                <div className="machine-label" data-for="base" style={{ left: '2%', bottom: '4%' }}>
                  <strong>Compact base</strong>
                  Lab footprint · standard 230 V · self-service install
                </div>
                <div className="machine-label" data-for="table" style={{ left: '6%', top: '44%' }}>
                  <strong>B/C rotary-tilt</strong>
                  True 5-axis kinematics — the capability nothing under €150k offers
                </div>
                <div className="machine-label" data-for="heads" style={{ right: '2%', top: '26%' }}>
                  <strong>Dual toolheads</strong>
                  Piezo-jet + dispensing · UV cure · vision-calibrated
                </div>
                <div className="machine-label" data-for="part" style={{ right: '6%', bottom: '8%' }}>
                  <strong>Printed 3D circuit</strong>
                  Conductive traces on freeform geometry · Aion-5X toolpaths
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Konfigurationen unter der Bühne */}
      <div className="wrap" style={{ padding: 'clamp(60px, 9vh, 110px) 0 clamp(80px, 12vh, 140px)' }}>
        <div className="grid-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className="card"
              style={t.hot ? { borderColor: 'var(--copper)', background: '#1e1a12' } : undefined}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: 19, letterSpacing: '0.06em' }}>{t.name}</h3>
                <span className="mono" style={{ fontSize: 22, fontWeight: 750, color: t.hot ? 'var(--copper)' : 'var(--teal)' }}>{t.price}</span>
              </div>
              <p style={{ fontSize: 13, fontStyle: 'italic', color: t.hot ? 'var(--copper)' : 'var(--mute)', margin: '6px 0 16px' }}>{t.role}</p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 8 }}>
                {t.specs.map((sp) => (
                  <li key={sp} style={{ fontSize: 14, color: 'var(--mute)', paddingLeft: 18, position: 'relative' }}>
                    <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 9, width: 7, height: 7, background: 'var(--copper-dim)' }} />
                    {sp}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 16, fontSize: 12.5, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.for}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 28, fontSize: 14, color: 'var(--mute)', maxWidth: '76ch' }}>
          One chassis, one certification, one spare-parts pool — configurations differ by axis
          unlock, toolheads and software tier. Build volume, throughput and material breadth stay
          with the industrial Helios/Hyperion line: <em>the fence against self-cannibalization.</em>
        </p>
      </div>
    </section>
  )
}
