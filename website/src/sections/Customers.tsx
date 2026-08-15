import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import SplitHeading from '../components/SplitHeading'
import { splitTitle } from '../lib/text'
import { useLang } from '../i18n'

const MAX = 2000
const WAVE_COLORS = ['var(--copper)', 'var(--teal)', 'var(--green)'] as const

export default function Customers() {
  const { t } = useLang()
  const c = t.customers
  return (
    <section id="customers" className="section" aria-labelledby="cust-h">
      <div className="ghost-num" aria-hidden="true">05</div>
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal><p className="kicker">{c.kicker}</p></Reveal>
        <SplitHeading lines={splitTitle(c.title)} className="h-display" />
        <Reveal delay={110}><p className="lede">{c.lede}</p></Reveal>

        <div style={{ marginTop: 60, display: 'grid', gap: 14 }}>
          {c.segments.map((s, i) => (
            <Reveal key={s.name} delay={i * 50}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 300px) 1fr 70px', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 13.5, color: 'var(--mute)' }}>{s.name}</span>
                <div style={{ background: 'var(--panel)', borderRadius: 6, height: 22, overflow: 'hidden' }} aria-hidden="true">
                  <div style={{ width: `${(s.count / MAX) * 100}%`, height: '100%', background: WAVE_COLORS[s.wave - 1], opacity: 0.9, borderRadius: 6 }} />
                </div>
                <span className="mono" style={{ fontSize: 14, fontWeight: 700, textAlign: 'right' }}>
                  <CountUp value={s.count} />
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 24, flexWrap: 'wrap' }}>
          {c.waves.map((w, i) => (
            <span key={w} style={{ fontSize: 12.5, color: 'var(--mute)' }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: WAVE_COLORS[i], marginRight: 8 }} aria-hidden="true" />
              {w}
            </span>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="card" style={{ marginTop: 60, borderColor: 'rgba(224,135,58,0.5)', background: 'linear-gradient(160deg, #221a10, #171208)' }}>
            <p className="tag copper" style={{ marginBottom: 20 }}>{c.beachheadTag}</p>
            <div className="grid-2" style={{ gap: 32 }}>
              <p style={{ fontSize: 15.5, color: 'var(--mute)' }}>{c.beachheadText}</p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 12, fontSize: 14.5, color: 'var(--mute)' }}>
                {c.jtbd.map((j) => (
                  <li key={j} style={{ paddingLeft: 22, position: 'relative' }}>
                    <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 8, width: 9, height: 9, background: 'var(--copper)' }} />
                    {j}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
