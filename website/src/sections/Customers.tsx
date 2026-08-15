import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import { SEGMENTS } from '../data/caseData'

const MAX = 2000

const WAVES = [
  { id: 1, label: 'Beachhead · Yr 1–2', color: 'var(--copper)' },
  { id: 2, label: 'Expansion · Yr 2–3', color: 'var(--teal)' },
  { id: 3, label: 'Expansion · Yr 3–5', color: 'var(--green)' },
]

export default function Customers() {
  return (
    <section id="customers" className="section" aria-labelledby="cust-h">
      <div className="wrap">
        <Reveal>
          <p className="kicker">05 · The Customer Universe</p>
          <h2 id="cust-h" className="h-display">
            ~10,000 organizations that could never buy a €250k machine
          </h2>
          <p className="lede">
            Counted bottom-up from association registers and rankings — 963 research-active EE
            universities, 76 Fraunhofer institutes, 1,100+ ZVEI members, 3,000+ European
            automotive suppliers, 38,000 medtech companies (90% SMEs) — filtered for relevance.
          </p>
        </Reveal>

        <div style={{ marginTop: 56, display: 'grid', gap: 14 }}>
          {SEGMENTS.map((s, i) => {
            const wave = WAVES.find((w) => w.id === s.wave)!
            return (
              <Reveal key={s.name} delay={i * 55}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 300px) 1fr 70px', gap: 16, alignItems: 'center' }}>
                  <span style={{ fontSize: 13.5, color: 'var(--mute)' }}>{s.name}</span>
                  <div style={{ background: 'var(--panel)', borderRadius: 5, height: 20, overflow: 'hidden' }} aria-hidden="true">
                    <div
                      style={{
                        width: `${(s.count / MAX) * 100}%`, height: '100%',
                        background: wave.color, opacity: 0.9,
                        borderRadius: 5,
                      }}
                    />
                  </div>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 700, textAlign: 'right' }}>
                    <CountUp value={s.count} />
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 22, flexWrap: 'wrap' }}>
          {WAVES.map((w) => (
            <span key={w.id} style={{ fontSize: 12.5, color: 'var(--mute)' }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: w.color, marginRight: 8 }} aria-hidden="true" />
              {w.label}
            </span>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="card" style={{ marginTop: 56, borderColor: 'rgba(224,135,58,0.5)', background: '#1e1a12' }}>
            <p className="tag copper" style={{ marginBottom: 16 }}>Beachhead — research labs & institutes, EU + NA</p>
            <div className="grid-2" style={{ gap: 30 }}>
              <p style={{ fontSize: 15, color: 'var(--mute)' }}>
                Tender-free below €100k, technically tolerant, and every published paper is a
                free reference — the exact playbook Voltera used to reach 5,000 units. KRONOS
                starts on home turf: the Nürnberg AME cluster, the OE-A community and a fresh
                LOPEC Start-up Award.
              </p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 10, fontSize: 14.5, color: 'var(--mute)' }}>
                {[
                  '“Publish the 3D structure the rival group can’t.”',
                  '“Iterate antenna designs the same day, not in 3-week loops.”',
                  '“Keep ITAR / IP-sensitive work in the building.”',
                  '“Train students on industry-relevant AME hardware.”',
                ].map((jtbd) => (
                  <li key={jtbd} style={{ paddingLeft: 20, position: 'relative' }}>
                    <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 8, width: 8, height: 8, background: 'var(--copper)' }} />
                    {jtbd}
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
