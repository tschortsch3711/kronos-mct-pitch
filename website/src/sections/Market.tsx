import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsapSetup'
import Reveal from '../components/Reveal'
import SplitHeading from '../components/SplitHeading'
import { splitTitle } from '../lib/text'
import { useLang } from '../i18n'
import { PRICE_MAP } from '../data/caseData'

const SCALE_MAX = 420 // k€

export default function Market() {
  const root = useRef<HTMLElement>(null)
  const { t, lang } = useLang()
  const c = t.market

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.pm-dot', {
        scrollTrigger: { trigger: '.pm-chart', start: 'top 74%' },
        x: -60, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
      })
      gsap.from('.pm-gap', {
        scrollTrigger: { trigger: '.pm-chart', start: 'top 74%' },
        scaleX: 0, transformOrigin: 'left center', opacity: 0, duration: 0.9, delay: 0.7, ease: 'power2.out',
      })
      gsap.from('.pm-eos', {
        scrollTrigger: { trigger: '.pm-chart', start: 'top 74%' },
        y: -34, opacity: 0, duration: 0.6, delay: 1.35, ease: 'back.out(1.8)',
      })
      ScrollTrigger.refresh()
    }, root)
    return () => ctx.revert()
  }, [lang])

  const x = (price: number) => `${(price / SCALE_MAX) * 100}%`

  return (
    <section id="market" ref={root} className="section" style={{ background: 'var(--bg-raise)' }} aria-labelledby="market-h">
      <div className="ghost-num" aria-hidden="true">04</div>
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal><p className="kicker">{c.kicker}</p></Reveal>
        <SplitHeading lines={splitTitle(c.title)} className="h-display" />
        <Reveal delay={110}><p className="lede">{c.lede}</p></Reveal>

        <div className="pm-scroll" style={{ marginTop: 64 }}>
          <div className="pm-chart" style={{ position: 'relative' }} role="img" aria-label={c.lede}>
            <div
              className="pm-gap"
              style={{
                position: 'absolute', top: -14, bottom: 30,
                left: x(25), width: `calc(${x(100)} - ${x(25)})`,
                background: 'linear-gradient(180deg, rgba(224,135,58,0.15), rgba(224,135,58,0.04))',
                border: '1px dashed rgba(224,135,58,0.55)', borderRadius: 12,
              }}
            >
              <span className="mono" style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.22em', color: 'var(--copper)', whiteSpace: 'nowrap' }}>
                {c.gapLabel}
              </span>
            </div>

            <div style={{ display: 'grid', gap: 13, paddingTop: 46 }}>
              {PRICE_MAP.map((m) => (
                <div key={m.name} className="pm-dot" style={{ position: 'relative', height: 26 }}>
                  <div style={{ position: 'absolute', left: 0, width: x(m.price), top: 12, height: 2, background: 'linear-gradient(90deg, transparent, var(--line))' }} aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute', left: x(m.price), top: 7, width: 12, height: 12, borderRadius: 99, transform: 'translateX(-6px)',
                      background: m.axis === '5-axis' ? 'var(--red)' : m.axis === 'subtractive' ? 'var(--faint)' : 'var(--teal)',
                    }}
                  />
                  <span style={{ position: 'absolute', left: `calc(${x(m.price)} + 14px)`, top: 0, fontSize: 13, color: 'var(--mute)', whiteSpace: 'nowrap' }}>
                    {m.name} <span className="mono" style={{ color: 'var(--faint)' }}>· {m.price < 100 ? `$${m.price}k` : `€${m.price}k`}</span>
                  </span>
                </div>
              ))}

              <div className="pm-eos" style={{ position: 'relative', height: 48, marginTop: 8 }}>
                <div style={{ position: 'absolute', left: x(65), transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 99, background: 'var(--copper)', boxShadow: '0 0 0 9px rgba(224,135,58,0.18), 0 0 24px rgba(224,135,58,0.5)' }} aria-hidden="true" />
                  <span className="mono" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--copper)', whiteSpace: 'nowrap' }}>
                    {c.eosMarker}
                  </span>
                </div>
              </div>
            </div>

            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: 8, marginTop: 12, fontSize: 11.5, color: 'var(--faint)' }} aria-hidden="true">
              <span>€0</span><span>€100k</span><span>€200k</span><span>€300k</span><span>€400k+</span>
            </div>
            <div style={{ display: 'flex', gap: 22, marginTop: 16, fontSize: 12.5, color: 'var(--mute)', flexWrap: 'wrap' }}>
              {([['var(--teal)', c.legend[0]], ['var(--red)', c.legend[1]], ['var(--faint)', c.legend[2]]] as const).map(([col, label]) => (
                <span key={label}><span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 99, background: col, marginRight: 7 }} />{label}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: 68 }}>
          {c.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 110}>
              <div className="card" style={{ height: '100%', ...(card.warn ? { borderColor: 'rgba(217,106,106,0.4)' } : {}) }}>
                <h3 style={{ fontSize: 17, marginBottom: 10, color: card.warn ? 'var(--red)' : 'var(--ink)' }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--mute)' }}>{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
