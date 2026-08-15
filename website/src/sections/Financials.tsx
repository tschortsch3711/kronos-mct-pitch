import { useState } from 'react'
import Reveal from '../components/Reveal'
import { SCENARIOS, YEARS, type ScenarioKey } from '../data/caseData'

const W = 720
const H = 360
const PAD = { l: 46, r: 16, t: 18, b: 34 }
const Y_MIN = -4
const Y_MAX = 30

const sx = (i: number) => PAD.l + (i / (YEARS.length - 1)) * (W - PAD.l - PAD.r)
const sy = (v: number) => PAD.t + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD.t - PAD.b)

/** Interaktiver 5-Jahres-Finanzchart mit Szenario-Umschalter (SVG, animiert via CSS-Transitions). */
export default function Financials() {
  const [key, setKey] = useState<ScenarioKey>('base')
  const s = SCENARIOS[key]
  const barW = 52

  const linePoints = s.ebitda.map((v, i) => `${sx(i)},${sy(v)}`).join(' ')

  return (
    <section id="financials" className="section" aria-labelledby="fin-h">
      <div className="wrap">
        <Reveal>
          <p className="kicker">07 · The Financial Case</p>
          <h2 id="fin-h" className="h-display">
            Three futures, honestly priced — including the one where you lose
          </h2>
          <p className="lede">
            Every scenario comes from the same formula-validated model. The Conservative case is
            not window dressing: it is the documented no-go the stage gates exist to catch.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div style={{ display: 'flex', gap: 12, marginTop: 44, flexWrap: 'wrap' }} role="tablist" aria-label="Scenario selector">
            {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={key === k}
                className={`scenario-btn ${key === k ? 'active' : ''} ${k === 'conservative' ? 'red' : k === 'upside' ? 'green' : ''}`}
                onClick={() => setKey(k)}
              >
                {SCENARIOS[k].name}
              </button>
            ))}
            <span style={{ alignSelf: 'center', fontSize: 13.5, color: 'var(--mute)', fontStyle: 'italic' }}>{s.tagline}</span>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.7fr) minmax(240px, 1fr)', gap: 36, marginTop: 34, alignItems: 'start' }} className="fin-grid">
          <Reveal>
            <div className="card" style={{ padding: 18 }}>
              <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }} role="img"
                aria-label={`Revenue bars and EBITDA line 2027 to 2031 for the ${s.name} scenario. Revenue 2031: ${s.revenue[4]} million euros. EBITDA 2031: ${s.ebitda[4]} million euros.`}>
                {/* gridlines */}
                {[0, 10, 20, 30].map((g) => (
                  <g key={g}>
                    <line x1={PAD.l} x2={W - PAD.r} y1={sy(g)} y2={sy(g)} stroke="var(--line)" strokeWidth={g === 0 ? 1.5 : 0.75} strokeDasharray={g === 0 ? undefined : '4 6'} />
                    <text x={PAD.l - 8} y={sy(g) + 4} textAnchor="end" fontSize="11" fill="var(--faint)" fontFamily="var(--font-mono)">{g}</text>
                  </g>
                ))}
                {/* revenue bars */}
                {s.revenue.map((v, i) => (
                  <rect
                    key={YEARS[i]}
                    x={sx(i) - barW / 2}
                    y={sy(Math.max(0, v))}
                    width={barW}
                    height={Math.abs(sy(0) - sy(v))}
                    rx={4}
                    fill="var(--copper)"
                    opacity={0.85}
                    style={{ transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                ))}
                {/* EBITDA line */}
                <polyline
                  points={linePoints}
                  fill="none"
                  stroke="var(--green)"
                  strokeWidth={3}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{ transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}
                />
                {s.ebitda.map((v, i) => (
                  <circle key={i} cx={sx(i)} cy={sy(v)} r={5} fill="var(--green)" style={{ transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }} />
                ))}
                {/* x labels */}
                {YEARS.map((y, i) => (
                  <text key={y} x={sx(i)} y={H - 10} textAnchor="middle" fontSize="12" fill="var(--mute)" fontFamily="var(--font-mono)">{y}</text>
                ))}
                <text x={W - PAD.r} y={PAD.t} textAnchor="end" fontSize="11" fill="var(--faint)">€M · bars = revenue · line = EBITDA</text>
              </svg>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <dl style={{ display: 'grid', gap: 0 }}>
              {[
                ['Units cumulative 2031', String(s.unitsCum)],
                ['Revenue 2031', `€${s.revenue[4].toFixed(1)}M`],
                ['EBITDA 2031', `${s.ebitda[4] >= 0 ? '+' : '−'}€${Math.abs(s.ebitda[4]).toFixed(1)}M`],
                ['EBITDA break-even', s.breakEven],
                ['Gross funding need', s.fundingNeed],
                ['MOIC · exit year 7', s.moicYr7],
                ['IRR · 7 years, tranched', s.irrYr7],
              ].map(([k2, v]) => (
                <div key={k2} className="spec-row">
                  <dt>{k2}</dt>
                  <dd className="mono">{v}</dd>
                </div>
              ))}
            </dl>
            <p style={{ marginTop: 18, fontSize: 14, fontStyle: 'italic', color: key === 'conservative' ? 'var(--red)' : key === 'upside' ? 'var(--green)' : 'var(--mute)' }}>
              {s.verdict}
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <p style={{ marginTop: 40, fontSize: 14.5, color: 'var(--mute)', maxWidth: '80ch' }}>
            Sensitivity: unit volume and machine COGS dominate; attach revenue decides margin
            quality from year 4. The plan survives a 15% price cut — it dies only if the band
            never expands. Which is exactly what the gates test before serious money moves.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
