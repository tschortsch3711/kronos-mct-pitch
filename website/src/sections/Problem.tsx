import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'

export default function Problem() {
  return (
    <section id="problem" className="section" aria-labelledby="problem-h">
      <div className="wrap">
        <Reveal>
          <p className="kicker">01 · The Problem</p>
          <h2 id="problem-h" className="h-display">
            Brilliant technology, trapped in a €200k+ project business
          </h2>
          <p className="lede">
            Printing electronics onto 3D surfaces — antennas on housings, sensors on freeform
            parts — is a proven capability. But every machine that can do it costs €150–500k,
            sells by quotation, and needs an application project per deal. The result:
          </p>
        </Reveal>

        <div className="grid-3" style={{ marginTop: 54 }}>
          <Reveal delay={0}>
            <div>
              <div className="stat-value">
                <CountUp value={190} prefix="~" />
              </div>
              <p className="stat-label">AME machines sold per year, worldwide, across all vendors — counted bottom-up</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="stat-value">
                €<CountUp value={28} />M
              </div>
              <p className="stat-label">total annual machine market — smaller than a single mid-size Mittelstand firm</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div>
              <div className="stat-value">
                <CountUp value={80} suffix="%" />
              </div>
              <p className="stat-label">of placements are one-off, grant-funded research buys that never reorder</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div
            className="card"
            style={{ marginTop: 60, borderColor: 'rgba(217,106,106,0.4)', background: '#1a1616' }}
          >
            <p className="tag red" style={{ marginBottom: 20 }}>2024–2026 · the category cleared itself out</p>
            <div className="grid-3">
              <div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>Neotech AMT</h3>
                <p style={{ fontSize: 14, color: 'var(--mute)' }}>
                  The 5-axis pioneer — insolvent July 2024 after ~20 years and ~50 systems.
                  Its assets became KRONOS.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>Nano Dimension</h3>
                <p style={{ fontSize: 14, color: 'var(--mute)' }}>
                  Raised ~$1.5B, sold ~51 DragonFly systems, exited AME in April 2026 for
                  $2M upfront. The market leader left at scrap value.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>J.A.M.E.S GmbH</h3>
                <p style={{ fontSize: 14, color: 'var(--mute)' }}>
                  The Hensoldt-backed AME community platform — liquidated August 2025.
                  The ecosystem lost its anchor.
                </p>
              </div>
            </div>
            <p style={{ marginTop: 24, fontSize: 15.5, color: 'var(--ink)' }}>
              <strong>The diagnosis:</strong>{' '}
              <span style={{ color: 'var(--mute)' }}>
                everyone sold project machines to a research niche. Nobody productized the
                technology for the budgets that actually buy lab equipment.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
