import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SplitHeading from '../components/SplitHeading'
import { splitTitle } from '../lib/text'
import { useLang } from '../i18n'

export default function Technology() {
  const { t } = useLang()
  const c = t.technology
  return (
    <section id="technology-s" className="section" style={{ background: 'var(--bg-raise)' }} aria-labelledby="tech-h">
      <div className="ghost-num" aria-hidden="true">02</div>
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal><p className="kicker">{c.kicker}</p></Reveal>
        <SplitHeading lines={splitTitle(c.title)} className="h-display" />
        <Reveal delay={110}><p className="lede">{c.lede}</p></Reveal>

        {/* Timeline */}
        <div style={{ marginTop: 64, borderLeft: '1px solid var(--line)' }}>
          {c.timeline.map((tl, i) => (
            <Reveal key={tl.year} delay={i * 80}>
              <div style={{ display: 'flex', gap: 26, padding: '17px 0 17px 30px', position: 'relative' }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute', left: -6, top: 28, width: 11, height: 11, borderRadius: 99,
                    background: tl.hot ? 'var(--copper)' : tl.green ? 'var(--green)' : 'var(--faint)',
                    boxShadow: tl.hot ? '0 0 14px rgba(224,135,58,0.7)' : undefined,
                  }}
                />
                <span className="mono" style={{ flex: 'none', width: 96, fontWeight: 700, fontSize: 15, color: tl.hot ? 'var(--copper)' : tl.green ? 'var(--green)' : 'var(--ink)' }}>
                  {tl.year}
                </span>
                <p style={{ color: 'var(--mute)', fontSize: 15.5 }}>{tl.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 60 }}>
          {c.stack.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 110}>
              <div className="card" style={{ height: '100%' }}>
                <h3 style={{ fontSize: 19, marginBottom: 12, color: 'var(--copper)' }}>{s.name}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--mute)' }}>{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div style={{ marginTop: 48, display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 15, color: 'var(--mute)', maxWidth: '62ch' }}>
              <strong style={{ color: 'var(--ink)' }}>{c.honestLabel}</strong> {c.honest}
            </p>
            <Link to="/technology" className="btn-ghost">{c.pageLink} <span aria-hidden="true">→</span></Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
