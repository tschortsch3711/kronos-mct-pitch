import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SplitHeading from '../components/SplitHeading'
import { splitTitle } from '../lib/text'
import { useLang } from '../i18n'
import { SCENARIOS, YEARS, type ScenarioKey } from '../data/caseData'

const W = 720
const H = 360
const PAD = { l: 46, r: 16, t: 18, b: 34 }
const Y_MIN = -4
const Y_MAX = 30

const sx = (i: number) => PAD.l + (i / (YEARS.length - 1)) * (W - PAD.l - PAD.r)
const sy = (v: number) => PAD.t + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD.t - PAD.b)

export default function Financials() {
  const [key, setKey] = useState<ScenarioKey>('base')
  const { t } = useLang()
  const c = t.financials
  const s = SCENARIOS[key]
  const label = c.scenarios[key]
  const barW = 52
  const linePoints = s.ebitda.map((v, i) => `${sx(i)},${sy(v)}`).join(' ')

  return (
    <section id="financials-s" className="section" aria-labelledby="fin-h">
      <div className="ghost-num" aria-hidden="true">07</div>
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal><p className="kicker">{c.kicker}</p></Reveal>
        <SplitHeading lines={splitTitle(c.title)} className="h-display" />
        <Reveal delay={110}><p className="lede">{c.lede}</p></Reveal>

        <Reveal delay={80}>
          <div style={{ display: 'flex', gap: 12, marginTop: 46, flexWrap: 'wrap', alignItems: 'center' }} role="tablist" aria-label={c.tabAria}>
            {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={key === k}
                className={`scenario-btn ${key === k ? 'active' : ''} ${k === 'conservative' ? 'red' : k === 'upside' ? 'green' : ''}`}
                onClick={() => setKey(k)}
              >
                {c.scenarios[k].name}
              </button>
            ))}
            <span style={{ fontSize: 13.5, color: 'var(--mute)', fontStyle: 'italic' }}>{label.tagline}</span>
          </div>
        </Reveal>

        <div className="fin-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.7fr) minmax(240px, 1fr)', gap: 38, marginTop: 36, alignItems: 'start' }}>
          <Reveal>
            <div className="card" style={{ padding: 18 }}>
              <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }} role="img"
                aria-label={`${label.name}: Revenue 2031 ${s.revenue[4]}M€, EBITDA 2031 ${s.ebitda[4]}M€`}>
                {[0, 10, 20, 30].map((g) => (
                  <g key={g}>
                    <line x1={PAD.l} x2={W - PAD.r} y1={sy(g)} y2={sy(g)} stroke="var(--line)" strokeWidth={g === 0 ? 1.5 : 0.75} strokeDasharray={g === 0 ? undefined : '4 6'} />
                    <text x={PAD.l - 8} y={sy(g) + 4} textAnchor="end" fontSize="11" fill="var(--faint)" fontFamily="var(--font-mono)">{g}</text>
                  </g>
                ))}
                {s.revenue.map((v, i) => (
                  <rect
                    key={YEARS[i]}
                    x={sx(i) - barW / 2}
                    y={sy(Math.max(0, v))}
                    width={barW}
                    height={Math.abs(sy(0) - sy(v))}
                    rx={5}
                    fill="var(--copper)"
                    opacity={0.88}
                    style={{ transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                ))}
                <polyline points={linePoints} fill="none" stroke="var(--green)" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" style={{ transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }} />
                {s.ebitda.map((v, i) => (
                  <circle key={i} cx={sx(i)} cy={sy(v)} r={5} fill="var(--green)" style={{ transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }} />
                ))}
                {YEARS.map((y, i) => (
                  <text key={y} x={sx(i)} y={H - 10} textAnchor="middle" fontSize="12" fill="var(--mute)" fontFamily="var(--font-mono)">{y}</text>
                ))}
                <text x={W - PAD.r} y={PAD.t} textAnchor="end" fontSize="11" fill="var(--faint)">{c.chartHint}</text>
              </svg>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <dl style={{ display: 'grid', gap: 0 }}>
              {([
                [c.rows[0], String(s.unitsCum)],
                [c.rows[1], `€${s.revenue[4].toFixed(1)}M`],
                [c.rows[2], `${s.ebitda[4] >= 0 ? '+' : '−'}€${Math.abs(s.ebitda[4]).toFixed(1)}M`],
                [c.rows[3], s.breakEven === 'none' ? (t.langName === 'DE' ? 'keiner' : 'none') : s.breakEven],
                [c.rows[4], s.fundingNeed],
                [c.rows[5], s.moicYr7],
                [c.rows[6], s.irrYr7],
              ] as const).map(([k2, v]) => (
                <div key={k2} className="spec-row">
                  <dt>{k2}</dt>
                  <dd className="mono">{v}</dd>
                </div>
              ))}
            </dl>
            <p style={{ marginTop: 18, fontSize: 14, fontStyle: 'italic', color: key === 'conservative' ? 'var(--red)' : key === 'upside' ? 'var(--green)' : 'var(--mute)' }}>
              {label.verdict}
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div style={{ marginTop: 44, display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 14.5, color: 'var(--mute)', maxWidth: '66ch' }}>{c.sensitivity}</p>
            <Link to="/financials" className="btn-ghost">{c.pageLink} <span aria-hidden="true">→</span></Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
