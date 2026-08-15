import Reveal from '../components/Reveal'
import { GATES } from '../data/caseData'

export default function Validation() {
  return (
    <section className="section" style={{ background: 'var(--bg-raise)' }} aria-labelledby="val-h">
      <div className="wrap">
        <Reveal>
          <p className="kicker">08 · The Validation Roadmap</p>
          <h2 id="val-h" className="h-display">
            €2.5M buys the truth before the factory
          </h2>
          <p className="lede">
            Six gates with hard kill criteria. Fail a gate, and the plan stops — an orderly
            retreat to licensing and project business, not a slow-motion write-off. Maximum at
            risk before series release: <strong style={{ color: 'var(--ink)' }}>€2.5M.</strong>
          </p>
        </Reveal>

        <ol style={{ listStyle: 'none', marginTop: 56, display: 'grid', gap: 0 }}>
          {GATES.map((g, i) => (
            <Reveal key={g.id} delay={i * 70} as="li">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 90px 1fr 1.4fr',
                  gap: 18,
                  alignItems: 'center',
                  padding: '17px 0',
                  borderBottom: '1px solid var(--line)',
                }}
                className="gate-row"
              >
                <span
                  className="mono"
                  style={{
                    width: 44, height: 44, borderRadius: 99, display: 'grid', placeItems: 'center',
                    fontWeight: 800, fontSize: 14,
                    background: i < 3 ? 'var(--copper)' : 'var(--panel)',
                    color: i < 3 ? '#14100a' : 'var(--mute)',
                    border: i < 3 ? 'none' : '1px solid var(--line)',
                  }}
                >
                  {g.id}
                </span>
                <span className="mono" style={{ fontSize: 13, color: 'var(--faint)' }}>{g.months}</span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{g.name}</span>
                <span style={{ fontSize: 13.5, color: 'var(--mute)' }}>{g.kill}</span>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="grid-3" style={{ marginTop: 54 }}>
          {[
            { t: 'Tranche 1 — €2.5M', d: 'Q4 2026 · funds G0–G4 through the pilot fleet. The only commitment requested today.', hot: true },
            { t: 'Tranche 2 — €4.5M', d: 'Q4 2027 · industrialization & launch. Unlocked by ≥10 LOIs, BOM ≤€26k, IP cleared.' },
            { t: 'Tranche 3 — €4–5M', d: 'Q1 2029 · scale & channel. Unlocked by ≥60 units sold, GM ≥42%, service <8%.' },
          ].map((tr, i) => (
            <Reveal key={tr.t} delay={i * 110}>
              <div className="card" style={tr.hot ? { borderColor: 'var(--copper)', background: '#1e1a12', height: '100%' } : { height: '100%' }}>
                <h3 style={{ fontSize: 17, marginBottom: 8, color: tr.hot ? 'var(--copper)' : 'var(--ink)' }}>{tr.t}</h3>
                <p style={{ fontSize: 14, color: 'var(--mute)' }}>{tr.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <p style={{ marginTop: 26, fontSize: 13.5, color: 'var(--faint)' }}>
            Plus €0.8–3.3M in grants (ZIM confidently applicable; EIC Accelerator as upside) and a
            ~€2M working-capital line once the order book exists — covering the €13.2M gross plan.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
