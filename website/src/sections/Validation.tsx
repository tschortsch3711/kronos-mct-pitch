import Reveal from '../components/Reveal'
import SplitHeading from '../components/SplitHeading'
import { splitTitle } from '../lib/text'
import { useLang } from '../i18n'

export default function Validation() {
  const { t } = useLang()
  const c = t.validation
  return (
    <section id="validation" className="section" style={{ background: 'var(--bg-raise)' }} aria-labelledby="val-h">
      <div className="ghost-num" aria-hidden="true">08</div>
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal><p className="kicker">{c.kicker}</p></Reveal>
        <SplitHeading lines={splitTitle(c.title)} className="h-display" />
        <Reveal delay={110}><p className="lede">{c.lede}</p></Reveal>

        <ol style={{ listStyle: 'none', marginTop: 60, display: 'grid', gap: 0 }}>
          {c.gates.map((g, i) => (
            <Reveal key={g.id} delay={i * 65} as="li">
              <div className="gate-row">
                <span
                  className="mono"
                  style={{
                    width: 46, height: 46, borderRadius: 99, display: 'grid', placeItems: 'center',
                    fontWeight: 700, fontSize: 14,
                    background: i < 3 ? 'var(--copper)' : 'var(--panel)',
                    color: i < 3 ? '#14100a' : 'var(--mute)',
                    border: i < 3 ? 'none' : '1px solid var(--line)',
                    boxShadow: i < 3 ? '0 0 18px rgba(224,135,58,0.35)' : undefined,
                  }}
                >
                  {g.id}
                </span>
                <span className="mono" style={{ fontSize: 13, color: 'var(--faint)' }}>{g.months}</span>
                <span style={{ fontWeight: 700, fontSize: 17, fontFamily: 'var(--font-display)' }}>{g.name}</span>
                <span style={{ fontSize: 13.5, color: 'var(--mute)' }}>{g.kill}</span>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="grid-3" style={{ marginTop: 58 }}>
          {c.tranches.map((tr, i) => (
            <Reveal key={tr.title} delay={i * 110}>
              <div className="card" style={tr.hot ? { borderColor: 'var(--copper)', background: 'linear-gradient(160deg, #221a10, #171208)', height: '100%' } : { height: '100%' }}>
                <h3 style={{ fontSize: 18, marginBottom: 10, color: tr.hot ? 'var(--copper)' : 'var(--ink)' }}>{tr.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--mute)' }}>{tr.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <p style={{ marginTop: 28, fontSize: 13.5, color: 'var(--faint)' }}>{c.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
