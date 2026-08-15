import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsapSetup'
import Reveal from '../components/Reveal'
import { PRICE_MAP } from '../data/caseData'

const SCALE_MAX = 420 // k€

/** Preisband-Landkarte: Wettbewerber gleiten auf ihre Preisposition, die Lücke leuchtet auf. */
export default function Market() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.pm-dot', {
        scrollTrigger: { trigger: '.pm-chart', start: 'top 72%' },
        x: -60, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
      })
      gsap.from('.pm-gap', {
        scrollTrigger: { trigger: '.pm-chart', start: 'top 72%' },
        scaleX: 0, transformOrigin: 'left center', opacity: 0, duration: 0.9, delay: 0.7, ease: 'power2.out',
      })
      gsap.from('.pm-eos', {
        scrollTrigger: { trigger: '.pm-chart', start: 'top 72%' },
        y: -34, opacity: 0, duration: 0.6, delay: 1.35, ease: 'back.out(1.8)',
      })
      ScrollTrigger.refresh()
    }, root)
    return () => ctx.revert()
  }, [])

  const x = (price: number) => `${(price / SCALE_MAX) * 100}%`

  return (
    <section id="market" ref={root} className="section" style={{ background: 'var(--bg-raise)' }} aria-labelledby="market-h">
      <div className="wrap">
        <Reveal>
          <p className="kicker">04 · The Market Gap</p>
          <h2 id="market-h" className="h-display">
            Between €60k and €150k, the map is empty
          </h2>
          <p className="lede">
            Below: every relevant electronics-printing machine, by price. Planar lab tools stop
            near $55k. Industrial five-axis systems start near €150–200k. The band in between —
            the only band procurement rules love — contains{' '}
            <strong style={{ color: 'var(--ink)' }}>no five-axis machine at all.</strong>
          </p>
        </Reveal>

        <div className="pm-scroll" style={{ marginTop: 60 }}>
        <div className="pm-chart" style={{ position: 'relative' }} role="img" aria-label="Price map of electronics printing machines from 5 to 400 thousand euros, showing an empty band between 25 and 100 thousand euros for five-axis systems">
          {/* Gap-Band */}
          <div
            className="pm-gap"
            style={{
              position: 'absolute', top: -14, bottom: 30,
              left: x(25), width: `calc(${x(100)} - ${x(25)})`,
              background: 'linear-gradient(180deg, rgba(224,135,58,0.14), rgba(224,135,58,0.04))',
              border: '1px dashed rgba(224,135,58,0.55)', borderRadius: 10,
            }}
          >
            <span style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', fontSize: 11.5, fontWeight: 800, letterSpacing: '0.24em', color: 'var(--copper)', whiteSpace: 'nowrap' }}>
              THE GAP · €25–100k
            </span>
          </div>

          <div style={{ display: 'grid', gap: 13, paddingTop: 44 }}>
            {PRICE_MAP.map((m) => (
              <div key={m.name} className="pm-dot" style={{ position: 'relative', height: 26 }}>
                <div
                  style={{
                    position: 'absolute', left: 0, width: x(m.price), top: 12, height: 2,
                    background: 'linear-gradient(90deg, transparent, var(--line))',
                  }}
                  aria-hidden="true"
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute', left: x(m.price), top: 7, width: 12, height: 12, borderRadius: 99,
                    transform: 'translateX(-6px)',
                    background: m.axis === '5-axis' ? 'var(--red)' : m.axis === 'subtractive' ? 'var(--faint)' : 'var(--teal)',
                  }}
                />
                <span style={{ position: 'absolute', left: `calc(${x(m.price)} + 14px)`, top: 0, fontSize: 13, color: 'var(--mute)', whiteSpace: 'nowrap' }}>
                  {m.name} <span className="mono" style={{ color: 'var(--faint)' }}>· {m.price < 100 ? `$${m.price}k` : `€${m.price}k`}</span>
                </span>
              </div>
            ))}

            {/* EOS marker inside gap */}
            <div className="pm-eos" style={{ position: 'relative', height: 46, marginTop: 8 }}>
              <div
                style={{
                  position: 'absolute', left: x(65), transform: 'translateX(-50%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}
              >
                <span style={{ width: 18, height: 18, borderRadius: 99, background: 'var(--copper)', boxShadow: '0 0 0 8px rgba(224,135,58,0.18)' }} aria-hidden="true" />
                <span style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--copper)', whiteSpace: 'nowrap' }}>
                  KRONOS EOS FIVE · €65k
                </span>
              </div>
            </div>
          </div>

          {/* axis */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: 8, marginTop: 12, fontSize: 11.5, color: 'var(--faint)' }} className="mono" aria-hidden="true">
            <span>€0</span><span>€100k</span><span>€200k</span><span>€300k</span><span>€400k+</span>
          </div>
          <div style={{ display: 'flex', gap: 22, marginTop: 16, fontSize: 12.5, color: 'var(--mute)', flexWrap: 'wrap' }}>
            <span><span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 99, background: 'var(--teal)', marginRight: 7 }} />planar (2–2.5 axis)</span>
            <span><span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 99, background: 'var(--red)', marginRight: 7 }} />five-axis / conformal</span>
            <span><span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 99, background: 'var(--faint)', marginRight: 7 }} />subtractive substitute</span>
          </div>
        </div>
        </div>

        <div className="grid-3" style={{ marginTop: 64 }}>
          <Reveal>
            <div className="card" style={{ height: '100%' }}>
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Why below €100k changes everything</h3>
              <p style={{ fontSize: 14, color: 'var(--mute)' }}>
                No EU tender (€221k), no DFG review (€200k), inside Germany’s new €100k
                direct-award limit and a single US faculty startup package. A board decision
                becomes a department decision.
              </p>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className="card" style={{ height: '100%' }}>
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Proof the band buys machines</h3>
              <p style={{ fontSize: 14, color: 'var(--mute)' }}>
                Voltera shipped 5,000+ units; LPKF’s benchtop prototyping segment turned
                €26.2M in 2024 with “thousands” installed; Formlabs sold 130,000+ printers
                after a 10x price cut.
              </p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="card" style={{ height: '100%', borderColor: 'rgba(217,106,106,0.4)' }}>
              <h3 style={{ fontSize: 16, marginBottom: 8, color: 'var(--red)' }}>The honest caveat</h3>
              <p style={{ fontSize: 14, color: 'var(--mute)' }}>
                An empty band can mean absent demand, not opportunity. Today’s AME machine
                market is ~€15–28M/yr. That is why demand is validated with hard LOI gates
                before industrialization — not assumed.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
