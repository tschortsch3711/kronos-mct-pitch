import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { useLang } from '../i18n'
import { SCENARIOS, type ScenarioKey } from '../data/caseData'

const BASE_ROWS = [
  { year: 2027, units: 12, revenue: '0.96', gm: '44%', ebitda: '−2.02' },
  { year: 2028, units: 35, revenue: '2.66', gm: '43%', ebitda: '−1.94' },
  { year: 2029, units: 75, revenue: '5.78', gm: '46%', ebitda: '−1.82' },
  { year: 2030, units: 130, revenue: '10.14', gm: '48%', ebitda: '−0.84' },
  { year: 2031, units: 200, revenue: '15.97', gm: '50%', ebitda: '+1.05' },
]

export default function FinancialsPage() {
  const { t, lang } = useLang()
  const p = t.pages.financials
  const c = t.financials

  return (
    <>
      <PageHero kicker={t.nav.financials} title={p.title} lede={p.lede} />

      <div className="wrap" style={{ padding: 'clamp(40px, 7vh, 90px) 0 clamp(70px, 10vh, 120px)' }}>
        {/* Szenarien-Karten */}
        <div className="grid-3">
          {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k, i) => {
            const s = SCENARIOS[k]
            const label = c.scenarios[k]
            const tone = k === 'conservative' ? 'var(--red)' : k === 'upside' ? 'var(--green)' : 'var(--copper)'
            return (
              <Reveal key={k} delay={i * 110}>
                <div className="card" style={{ height: '100%', borderColor: k === 'base' ? 'rgba(224,135,58,0.5)' : undefined }}>
                  <p className="mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: tone, marginBottom: 8 }}>{label.name}</p>
                  <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--mute)', marginBottom: 20 }}>{label.tagline}</p>
                  <dl>
                    {([
                      [c.rows[0], String(s.unitsCum)],
                      [c.rows[1], `€${s.revenue[4].toFixed(1)}M`],
                      [c.rows[2], `${s.ebitda[4] >= 0 ? '+' : '−'}€${Math.abs(s.ebitda[4]).toFixed(1)}M`],
                      [c.rows[3], s.breakEven === 'none' ? (lang === 'de' ? 'keiner' : 'none') : s.breakEven],
                      [c.rows[4], s.fundingNeed],
                      [c.rows[5], s.moicYr7],
                      [c.rows[6], s.irrYr7],
                    ] as const).map(([k2, v]) => (
                      <div key={k2} className="spec-row">
                        <dt style={{ fontSize: 13 }}>{k2}</dt>
                        <dd className="mono" style={{ fontSize: 13.5 }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p style={{ marginTop: 16, fontSize: 13, fontStyle: 'italic', color: tone }}>{label.verdict}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Base Case Jahr für Jahr */}
        <Reveal>
          <div style={{ marginTop: 'clamp(60px, 9vh, 100px)' }}>
            <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', marginBottom: 10 }}>{p.canonTitle}</h2>
            <p style={{ fontSize: 13.5, color: 'var(--faint)', marginBottom: 24 }}>{p.canonNote}</p>
            <div className="table-scroll card" style={{ padding: 10 }}>
              <table className="data-table">
                <thead>
                  <tr>{p.tableHead.map((h, i) => <th key={h} style={i > 0 ? { textAlign: 'right' } : undefined}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {BASE_ROWS.map((r) => (
                    <tr key={r.year}>
                      <td className="mono">{r.year}</td>
                      <td className="num">{r.units}</td>
                      <td className="num">€{r.revenue}M</td>
                      <td className="num">{r.gm}</td>
                      <td className="num" style={{ color: r.ebitda.startsWith('+') ? 'var(--green)' : 'var(--red)' }}>{r.ebitda}M</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Sensitivität */}
        <div className="grid-2" style={{ marginTop: 'clamp(60px, 9vh, 100px)', gap: 40, alignItems: 'start' }}>
          <Reveal>
            <div>
              <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', marginBottom: 10 }}>{p.sensTitle}</h2>
              <p style={{ fontSize: 14.5, color: 'var(--mute)' }}>{p.sensNote}</p>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className="card" style={{ padding: 10 }}>
              <table className="data-table">
                <tbody>
                  {p.sensRows.map((r) => (
                    <tr key={r.driver}>
                      <td>{r.driver}</td>
                      <td className="num" style={{ color: 'var(--copper)' }}>{r.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        {/* Returns */}
        <Reveal>
          <div className="card" style={{ marginTop: 'clamp(60px, 9vh, 100px)', borderColor: 'rgba(224,135,58,0.4)' }}>
            <h2 style={{ fontSize: 'clamp(20px, 2.3vw, 28px)', marginBottom: 12, color: 'var(--copper)' }}>{p.returnsTitle}</h2>
            <p style={{ fontSize: 15, color: 'var(--mute)', maxWidth: '84ch' }}>{p.returnsNote}</p>
            <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 70px)', marginTop: 28, flexWrap: 'wrap' }}>
              {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k) => (
                <div key={k}>
                  <div className="mono" style={{ fontSize: 'clamp(28px, 3.4vw, 46px)', fontWeight: 700, color: k === 'conservative' ? 'var(--red)' : k === 'upside' ? 'var(--green)' : 'var(--ink)' }}>
                    {SCENARIOS[k].moicYr7}
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--faint)' }}>{c.scenarios[k].name} · MOIC / {SCENARIOS[k].irrYr7} IRR</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ marginTop: 60, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/" className="btn-ghost">← {t.nav.story}</Link>
            <Link to="/research" className="btn-primary">{t.nav.research} →</Link>
          </div>
        </Reveal>
      </div>
    </>
  )
}
