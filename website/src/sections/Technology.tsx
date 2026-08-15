import Reveal from '../components/Reveal'

const TIMELINE = [
  { year: '2009–10', text: 'Neotech AMT pioneers 3D-printed electronics — world’s first 5-axis 3D-PE system' },
  { year: '2013', text: 'First mass-production install: printed 3D antennas, millions of parts per year' },
  { year: '2024', text: 'Neotech insolvency. KRONOS Mechatronics acquires the assets at distressed cost', hot: true },
  { year: '2025', text: 'Relaunch of Helios & Hyperion · APES partnership (North America) · productronica' },
  { year: '2026', text: 'LOPEC Start-up Award “Best Business Potential” · Aion-5X SDK published', green: true },
]

const STACK = [
  {
    name: 'Five-axis deposition',
    detail: '±5 µm platform accuracy, linear motors, piezo-jet · inkjet · dispensing · FFF in one workspace — electronics printed onto true 3D geometry.',
  },
  {
    name: 'Aion-5X software',
    detail: 'The real moat: 5-axis simultaneous CAM, collision simulation, camera calibration and AI vision inspection. ~15 years of work — already built, scales at zero marginal cost.',
  },
  {
    name: 'Process integration',
    detail: 'Plasma treatment, UV curing, milling and SMD placement modules in one machine: from CAD file to functional, populated 3D circuit.',
  },
  {
    name: 'Open ecosystem',
    detail: 'Public C++ SDK, PrusaSlicer front-end for polymer printing, curated material kits — engineered for a community, not a walled garden.',
  },
]

export default function Technology() {
  return (
    <section id="technology" className="section" style={{ background: 'var(--bg-raise)' }} aria-labelledby="tech-h">
      <div className="wrap">
        <Reveal>
          <p className="kicker">02 · The Technology</p>
          <h2 id="tech-h" className="h-display">
            Fifteen years of five-axis know-how, acquired for a fraction of its cost
          </h2>
          <p className="lede">
            KRONOS is not a newcomer with a prototype. It is the continuation of the company
            that invented this machine category — reborn in Nürnberg with the software, the
            process library and the people.
          </p>
        </Reveal>

        {/* timeline */}
        <div style={{ marginTop: 56, borderLeft: '1px solid var(--line)', paddingLeft: 0 }}>
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 90}>
              <div style={{ display: 'flex', gap: 24, padding: '16px 0 16px 28px', position: 'relative' }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute', left: -5, top: 26, width: 9, height: 9, borderRadius: 99,
                    background: t.hot ? 'var(--copper)' : t.green ? 'var(--green)' : 'var(--faint)',
                  }}
                />
                <span
                  className="mono"
                  style={{ flex: 'none', width: 92, fontWeight: 700, fontSize: 15, color: t.hot ? 'var(--copper)' : t.green ? 'var(--green)' : 'var(--ink)' }}
                >
                  {t.year}
                </span>
                <p style={{ color: 'var(--mute)', fontSize: 15.5 }}>{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 56 }}>
          {STACK.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 120}>
              <div className="card" style={{ height: '100%' }}>
                <h3 style={{ fontSize: 18, marginBottom: 10, color: 'var(--copper)' }}>{s.name}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--mute)' }}>{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p style={{ marginTop: 44, fontSize: 15, color: 'var(--mute)', maxWidth: '70ch' }}>
            <strong style={{ color: 'var(--ink)' }}>The honest gap:</strong> a ~6-person team,
            no verified sale since the relaunch, patent chain-of-title still to be confirmed.
            These are not footnotes — they are the first three items of the validation plan.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
