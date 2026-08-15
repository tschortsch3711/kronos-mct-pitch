import Reveal from '../components/Reveal'
import SplitHeading from '../components/SplitHeading'
import { splitTitle } from '../lib/text'
import { useLang } from '../i18n'

const STREAM_COLORS = ['var(--copper)', 'var(--teal)', 'var(--violet)', 'var(--green)', 'var(--gold)'] as const

export default function BusinessModel() {
  const { t } = useLang()
  const c = t.model
  return (
    <section id="model" className="section" style={{ background: 'var(--bg-raise)' }} aria-labelledby="bm-h">
      <div className="ghost-num" aria-hidden="true">06</div>
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal><p className="kicker">{c.kicker}</p></Reveal>
        <SplitHeading lines={splitTitle(c.title)} className="h-display" />
        <Reveal delay={110}><p className="lede">{c.lede}</p></Reveal>

        <Reveal delay={100}>
          <div style={{ marginTop: 58 }}>
            <div style={{ display: 'flex', height: 60, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)' }} role="img"
              aria-label={c.streams.map((s) => `${s.name} ${s.share}%`).join(', ')}>
              {c.streams.map((s, i) => (
                <div key={s.name} style={{ width: `${s.share}%`, background: STREAM_COLORS[i], opacity: 0.92 }} />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginTop: 24 }}>
              {c.streams.map((s, i) => (
                <div key={s.name}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: STREAM_COLORS[i], marginRight: 8 }} />
                    {s.name} <span className="mono" style={{ color: 'var(--mute)' }}>{s.share}%</span>
                  </p>
                  <p style={{ fontSize: 12.5, color: 'var(--faint)', marginTop: 4 }}>{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid-3" style={{ marginTop: 54 }}>
          {c.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 110}>
              <div className="card" style={{ height: '100%' }}>
                <h3 style={{ fontSize: 17, marginBottom: 10, color: 'var(--copper)' }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--mute)' }}>{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
